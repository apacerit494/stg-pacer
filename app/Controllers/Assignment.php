<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\AssignmentModel;
use \App\Models\ScoringModel;
use \App\Models\BaseModel;
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

class Assignment extends BaseController
{
    protected $AssignmentModel;
    protected $ScoringModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->AssignmentModel = new AssignmentModel();
        $this->ScoringModel = new ScoringModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Assignment
     * Hakim
     * 2022-11-19
     */
    public function index()
    {
        $data['title'] = 'Assignment';
        $data['menu'] = $this->generate_menu('/Assignment/index');
        $data['committees'] = $this->BaseModel->get_committees();
        $data['committee_certifications'] = $this->BaseModel->get_committee_certifications();
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Assignment/Main', $data);
    }

    public function jqgrid_assignment()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'gl_account_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $status = isset($_REQUEST['status']) ? $_REQUEST['status'] : '';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->AssignmentModel->jqgrid_assignment($status, $tipe_keyword, $keyword, '', '', '', '',);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->AssignmentModel->jqgrid_assignment($status, $tipe_keyword, $keyword, $sidx, $sord, $limit_rows, $start,);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['certification_id'] = $row['certification_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['certification_id'],
                $row['certification_number'],
                $row['apply_date'],
                $row['full_name'],
                // $row['description'],
                $row['level_auditor'],
                $row['scope_code'],
                $row['createdAt'],
                $row['updatedAt']
                //$row['level'],
                //$row['university'],
                //$row['major'],
                //$row['start_date_education'],
                //$row['end_date_education'],
                //$row['certificate_number'],
                //$row['accreditation_status'],
                //$row['doc_path_education'],
                //$row['company_name'],
                //$row['departement_id'],
                // $row['position'],
                // $row['start_date_experience'],
                // $row['end_date_experience'],
                // $row['doc_path_experience'],
                // $row['company_addres'],
                // $row['company_phone'],
                // $row['contact_person'],
                // $row['start_date_audit_experience'],
                // $row['end_date_audit_experience'],
                // $row['doc_audit_plan_path'],
                // $row['doc_work_order_path'],
                // $row['provider_name'],
                // $row['start_date_training'],
                // $row['end_date_training'],
                // $row['training_topic'],
                // $row['relation_status'],
                // $row['doc_path_training']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    public function proses_assignment()
    {
        $user_id = user_id();
        $committee1 = $this->request->getVar('committee1');
        $committee2 = $this->request->getVar('committee2');
        $committee3 = $this->request->getVar('committee3');
        $penguji_ujian = $this->request->getVar('penguji_ujian');
        $start_date = $this->request->getVar('start_date');
        $end_date = $this->request->getVar('end_date');
        $note = $this->request->getVar('note');
        $createdAt = date('Y-m-d H:i:s');

        $msg = "";
        $committee1 == "" ? $msg .= "- Isi Komite 1 <br>" : $msg .= $msg;
        $committee2 == "" ? $msg .= "- Isi Komite 2 <br>" : $msg .= $msg;
        $committee3 == "" ? $msg .= "- Isi Komite Sertifikasi <br>" : $msg .= $msg;
        $start_date == "" ? $msg .= "- Isi Start Date <br>" : $msg .= $msg;
        $end_date == "" ? $msg .= "- Isi End Date <br>" : $msg .= $msg;
        $committee1 == $committee2 ? $msg .= "- Kommite 1 & 2 tidak boleh sama <br>" : $msg .= $msg;

        $certification_id = $this->request->getVar('certification_id');
        if ($msg <> "") {
            $return = array('success' => false, 'error' => $msg);
        } else {
            $email_committee1 = $this->AssignmentModel->get_email($committee1);
            $email_committee2 = $this->AssignmentModel->get_email($committee2);
            $email_committee3 = $this->AssignmentModel->get_email($committee3);

            $data5 = array();
            $certificant_name = "";
            /** $status1==add */
            for ($i = 0; $i < count($certification_id); $i++) {

                /** insert to table assignment */
                $assignment_id = $this->get_uuid();

                $data1 = array(
                    'assignment_id' => $assignment_id,
                    'certification_id' => $certification_id[$i],
                    'from_id' => $user_id,
                    'assignment_date' => $start_date,
                    'fisnish_date' => $end_date,
                    'note' => $note,
                    'createdAt' => $createdAt
                );

                $this->db->transBegin();
                $this->AssignmentModel->insert_assignment($data1);
                /** update status certification menjadi assignmented */
                $this->db->query('call update_status_certification(?,?)', array($certification_id[$i], '2'));

                /** isi assignmentd_fieldcode */
                $field_codes = $this->AssignmentModel->get_field_codes($certification_id[$i]);
                foreach ($field_codes as $field_code) {
                    $data5[] = array(
                        'assignment_id' => $assignment_id,
                        'committee_id' => $committee1,
                        'fieldcode_id' => $field_code['fieldcode_id'],
                        'scope_id' => $field_code['scope_id']
                    );

                    $data5[] = array(
                        'assignment_id' => $assignment_id,
                        'committee_id' => $committee2,
                        'fieldcode_id' => $field_code['fieldcode_id'],
                        'scope_id' => $field_code['scope_id']
                    );

                    $data5[] = array(
                        'assignment_id' => $assignment_id,
                        'committee_id' => $committee3,
                        'fieldcode_id' => $field_code['fieldcode_id'],
                        'scope_id' => $field_code['scope_id']
                    );
                }


                /** insert into assignmentd_to */
                $this->db->query('call insert_assignmentd_to(?,?,?,?,?,?)', array($assignment_id, $committee1, $committee2, $committee3,  $user_id,$penguji_ujian));
                $this->db->query("call insert_notification(?,?,?)", array($committee1, 'New Assignment', 'assignment'));
                $this->db->query("call insert_notification(?,?,?)", array($committee2, 'New Assignment', 'assignment'));

                /** update status tabel education, experience, audit_experience, dan training */
                // $sql = "Call update_biodata(?)";
                // $this->db->query($sql, $certification_id[$i]);

                /** ambil nama-nama certificant untuk info ke committee */
                $certificant = $this->AssignmentModel->get_certificant_name($certification_id[$i]);
                $certificant_name .= '- ' . $certificant . '<br>';
                
                $scope_code=$this->AssignmentModel->get_scope_code($certification_id[$i]);

                $po_number1 = $this->AssignmentModel->get_po_number($assignment_id, $committee1);
                $po_number2 = $this->AssignmentModel->get_po_number($assignment_id, $committee1);
                $po_number3 = $this->AssignmentModel->get_po_number($assignment_id, $committee1);


                $this->send_email_purchase_order($committee1, $certificant, $email_committee1, $po_number1,$scope_code);
                $this->send_email_purchase_order($committee2, $certificant, $email_committee2, $po_number2,$scope_code);
                $this->send_email_purchase_order($committee3, $certificant, $email_committee3, $po_number3,$scope_code);
            }

            $this->AssignmentModel->insert_assignmentd_fieldcode($data5);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false, 'error' => 'Failed to connect database2');
            }

            $this->run_pusher();
            $this->run_pusher_assignment();


            /** kirim email pemberitahuan ke committe penguji dan sertifikasi */

            // $email = \Config\Services::email();
            // $email->setTo(array($email_committee1, $email_committee2, $email_committee3));
            // $email->clear(true);

            // $email->setTo('hakim.desyanto@gmail.com');
            // $email->setFrom($this->secretariat_email, 'LSP PACER');
            // $email->setSubject('Penugasan penilaian kepada certificant');
            // $email->setMessage(
            //     ' Kepada Team Komite, <br><br>
            //     Mohon untuk segera memberikan penilaian kepada certificant berikut ini : <br><br>' . $certificant_name . '<br><br><br>
            //     Terimakasih, <br>
            //     Sekretariat Pacer.'
            // );
            // $email->send();

            /** kirim email pdf ke masing-masing komite */
        }
        // $return = array('success' => true);
        return json_encode($return);
    }

    public function delete_assignment()
    {
        $certification_id = $this->request->getVar('certification_id');
        for ($i = 0; $i < count($certification_id); $i++) {
            $datas = $this->AssignmentModel->get_data_assignment($certification_id[$i]);

            foreach ($datas as $data) :

                $this->send_email_cancelation_purchase_order($data->committee_name, $data->certificant_name, $data->email, $data->po_number);

            endforeach;


            $this->db->transBegin();
            $this->db->query('call phd_delete_assignment(?,?)', array($certification_id[$i], user_id()));
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }
        }

        return json_encode($return);
    }


    public function send_email_purchase_order($committee, $certificant, $email_commitee, $po_number,$scope_code)
    //public function send_email_purchase_order()
    {
        setlocale(LC_ALL, 'id_ID');
        $kop = "assets/images/kop_surat.png";
        $committee_name = $this->AssignmentModel->get_committee_name($committee);
        $content = '';
        $content .= '<style type="text/css">
       
        table{
            margin: 5px;
            padding: 0;
        }
        table.body{
            /*margin: 20px 20px 20px 50px;*/
                margin: 20px 20px 20px 0px;
            padding: 0;
        }
        tr{
            padding: 0;
            margin: 5px;
        }
        td{
            vertical-align: top;
            line-height: 18px;
        }
        td.header{
            padding: 0 0 0 20px;
            margin: 0;
            width: 580px;
        }
        table {
            width: 700px;
        }
        table.padding5 td{
            padding: 5px;
        }
        table.paddingbot3 td{
           padding: 0 0 3px 0;
        }
        table.table{
            padding-left: 10px;
        }
        h1,h2,h3,h4{
            margin:3px 0;
            padding:0;
            text-align: center;
        }
        .font14{
            font-size:14px;
            line-height: 18px;
        }
        .font16{
            font-size:16px;
            line-height: 18px;
        }
        .justify{
            text-align: justify;
        }
        .center{
            text-align: center;
        }
        ul{
            padding-top:0px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:0px;
            margin-top:0px;
            margin-left:0px;
            margin-right:0px;
            margin-bottom:0px;
            }
        ul li{
            padding-top:0px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:0px;
            margin-top:0px;
            margin-left:0px;
            margin-right:0px;
            margin-bottom:0px;
            }
        #ttd{
            font-size:12px;
        } 
        
        #footer {
           margin: 0 !important;
           position:absolute;
           bottom:0;
           width:100%;
           text-align: left;  
           font-size: 9px;
           
        }
        
        
        #container1 {
            position: relative;
            width: 700px;
            padding-top: 100
            
        }
        
        #container2 {    
            position: absolute;
            top: 0px;
            left: 0px;
        }

        .table-detail{
            border-left: solid 1px #000;
            border-bottom: solid 1px #000;
            padding: 0;
            margin: 1px;
        }

        .table-detail thead tr th {
            border-top: solid 1px #000;
            border-right: solid 1px #000;
            border-bottom: solid 1px #000;
            text-align:center;
            vertical-align:middle;
            height:15px;
        }        

        .table-detail tbody tr td{
            border-right: solid 1px #000;
            border-bottom: solid 1px #000;
            text-align:center;
            vertical-align:middle;
            height:15px;
            padding-left: 5px;
            padding-right: 5px;
        }
        
        </style>
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->
        <page backleft="10mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px">
            <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->        
            <div id="container1">
                <div id="container2">
                    <!-- START title  -->
                    <div class="title"> 
                        <table>
                            <tr>
                                <td style="width:700px;text-align:center;">
                                    <img style="width:500px;height:80px;valign:top" src="' . $kop  . '"/>
                                </td>
                            </tr>
                        </table> 
                        <hr style="width:75%;text-align:center;">
                        <table cellspacing="0" cellpadding="0" border="0">
                            
                            <tr>
                                <td colspan="3"><h1>Purchase Order</h1></td>
                            </tr>
                            <tr>
                                <td colspan="3" style="height:15px;"></td>
                            </tr>
                            
                            <tr style="margin-bottom:10px">    
                                <td style="width:100px">From</td>
                                <td style="width:10px">:</td>
                                <td style="width:590px">PT SERTIFIKASI KARIR PROFESIONAL</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>Address</td>
                                <td>:</td>
                                <td>JL. GEREJA NO 9 </td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td></td>
                                <td></td>
                                <td>KELURAHAN PALEDANG KECAMATAN BOGOR TENGAH</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td></td>
                                <td></td>
                                <td>BOGOR 16122</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>To</td>
                                <td>:</td>
                                <td>' . $committee_name . '</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>PO Number </td>
                                <td>:</td>
                                <td>' . $po_number . '</td>
                            </tr>
                            <tr style="margin-bottom:5px">    
                                <td>Date</td>
                                <td>:</td>
                                <td>' . date('d-m-Y') . '</td>
                            </tr>
                        </table>
                    </div>
                    <!-- END title -->
                    <br>
                    <br>
                    <!-- START body -->
                    <div class="body">
                        <table  class="table-detail"  cellspacing="" cellpadding="0"  align="left">
                            <thead>
                                <tr>
                                    <th style="width:50px">No</th>
                                    <th style="width:350px">Certificant</th>
                                    <th style="width:100px">Fee/Person</th>
                                    <th style="width:100px">Pph23</th>
                                    <th style="width:100px">Total (Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td style="text-align:left">' . $certificant . '</td>
                                    <td style="text-align:right">50.000</td>
                                    <td style="text-align:right">1.000</td>
                                    <td style="text-align:right">49.000</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Grand Total</td>
                                    <td style="text-align:right">49.000</td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <br>
                        <table>
                            <tr>
                                <td style="width:500px"></td>
                                <td style="font-weight:bold; font-size:14px">Bogor, ' . date('d F Y') . '</td>
                            </tr>
                        </table>
                        <br>
                        <br>
                        <br>
                        <br>
                        <table>
                        <tr>
                            <td style="width:500px"></td>
                            <td style="font-weight:bold; font-size:14px"><u>' . user()->full_name . '</u></td>
                        </tr>
                        <tr>
                            <td style="width:500px"></td>
                            <td style="font-weight:bold; font-size:12px">Sekretariat</td>
                        </tr>
                    </table>
                    </div> <!-- END body -->                    
                </div> <!-- END Container2 -->
            </div> <!-- END Container1 -->
        </page>  <!-- END PAGE -->';


        // dd($content);

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $folder = "";
            $file = "";
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
            $file = 'Purchase Order ' . date('YmdHis') . '.pdf';
            $html2pdf->output($folder . $file, 'F');

            $email = "";
            $email = \Config\Services::email();
            $email->clear(true);
            //$email->setTo('hakim.desyanto@gmail.com');
            $email->setTo($email_commitee);
            $email->setFrom($this->secretariat_email, 'LSP PACER');
            $email->setSubject('Penugasan penilaian kepada certificant');
            $email->setMessage(' Kepada Team Komite, <br><br>
                 Mohon untuk segera memberikan penilaian kepada certificant berikut ini : <br><br>' . $certificant . '<br><br><br>
                 Terimakasih, <br>
                 Sekretariat Pacer. <br><br><br>
                 Dengan membalas email ini Saya yang menyatakan bawah saya Menyetujui/tidak menyetujui untuk melakukan evaluasi terhadap nama pemohon yang ditugaskan kepada saya dan menyatakan bahwa saya tidak pernah/pernah * memberikan pelatihan kepada pemohon dibawah ini  : <br><br>
                        1. Nama Pemohon/Sertifikan : ' .$certificant .'<br> 
                        2. Lingkup Sertifikasi yang dinilai : ' .$scope_code .' <br><br>
                         
                         
                Yang menyatakan, <br><br><br>
 
 
 
                (' .$committee_name .')');
            $email->attach($folder . $file);
            $email->send();
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }

        // try {
        //     $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
        //     $html2pdf->pdf->SetDisplayMode('fullpage');

        //     ob_start();
        //     // include '../../../Views/Admin/Pdf/Deposit_report.php';

        //     //$content = ob_get_contents();

        //     $html2pdf->writeHTML($content);
        //     //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
        //     $html2pdf->output('Purchase Order.pdf', 'D');
        // } catch (Html2PdfException $e) {
        //     $html2pdf->clean();

        //     $formatter = new ExceptionFormatter($e);
        //     echo $formatter->getHtmlMessage();
        // }
    }

    public function send_email_cancelation_purchase_order($committee, $certificant, $email_commitee, $po_number)
    //public function send_email_purchase_order()
    {
        setlocale(LC_ALL, 'id_ID');
        $kop = "assets/images/kop_surat.png";
        $committee_name = $committee;
        $content = '<style type="text/css">
       
        table{
            margin: 5px;
            padding: 0;
        }
        table.body{
            /*margin: 20px 20px 20px 50px;*/
                margin: 20px 20px 20px 0px;
            padding: 0;
        }
        tr{
            padding: 0;
            margin: 5px;
        }
        td{
            vertical-align: top;
            line-height: 18px;
        }
        td.header{
            padding: 0 0 0 20px;
            margin: 0;
            width: 580px;
        }
        table {
            width: 700px;
        }
        table.padding5 td{
            padding: 5px;
        }
        table.paddingbot3 td{
           padding: 0 0 3px 0;
        }
        table.table{
            padding-left: 10px;
        }
        h1,h2,h3,h4{
            margin:3px 0;
            padding:0;
            text-align: center;
        }
        .font14{
            font-size:14px;
            line-height: 18px;
        }
        .font16{
            font-size:16px;
            line-height: 18px;
        }
        .justify{
            text-align: justify;
        }
        .center{
            text-align: center;
        }
        ul{
            padding-top:0px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:0px;
            margin-top:0px;
            margin-left:0px;
            margin-right:0px;
            margin-bottom:0px;
            }
        ul li{
            padding-top:0px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:0px;
            margin-top:0px;
            margin-left:0px;
            margin-right:0px;
            margin-bottom:0px;
            }
        #ttd{
            font-size:12px;
        } 
        
        #footer {
           margin: 0 !important;
           position:absolute;
           bottom:0;
           width:100%;
           text-align: left;  
           font-size: 9px;
           
        }
        
        
        #container1 {
            position: relative;
            width: 700px;
            padding-top: 100
            
        }
        
        #container2 {    
            position: absolute;
            top: 0px;
            left: 0px;
        }

        .table-detail{
            border-left: solid 1px #000;
            border-bottom: solid 1px #000;
            padding: 0;
            margin: 1px;
        }

        .table-detail thead tr th {
            border-top: solid 1px #000;
            border-right: solid 1px #000;
            border-bottom: solid 1px #000;
            text-align:center;
            vertical-align:middle;
            height:15px;
        }        

        .table-detail tbody tr td{
            border-right: solid 1px #000;
            border-bottom: solid 1px #000;
            text-align:center;
            vertical-align:middle;
            height:15px;
            padding-left: 5px;
            padding-right: 5px;
        }
        
        </style>
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->
        <page backleft="10mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px">
            <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->        
            <div id="container1">
                <div id="container2">
                    <!-- START title  -->
                    <div class="title"> 
                        <table>
                            <tr>
                                <td style="width:700px;text-align:center;">
                                    <img style="width:500px;height:80px;valign:top" src="' . $kop  . '"/>
                                </td>
                            </tr>
                        </table> 
                        <hr style="width:75%;text-align:center;">
                        <table cellspacing="0" cellpadding="0" border="0">
                            
                            <tr>
                                <td colspan="3"><h1>Purchase Order Cancellation</h1></td>
                            </tr>
                            <tr>
                                <td colspan="3" style="height:15px;"></td>
                            </tr>
                            
                            <tr style="margin-bottom:10px">    
                                <td style="width:100px">From</td>
                                <td style="width:10px">:</td>
                                <td style="width:590px">PT SERTIFIKASI KARIR PROFESIONAL</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>Address</td>
                                <td>:</td>
                                <td>JL. GEREJA NO 9 </td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td></td>
                                <td></td>
                                <td>KELURAHAN PALEDANG KECAMATAN BOGOR TENGAH</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td></td>
                                <td></td>
                                <td>BOGOR 16122</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>To</td>
                                <td>:</td>
                                <td>' . $committee_name . '</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>PO Number </td>
                                <td>:</td>
                                <td>' . $po_number . '</td>
                            </tr>
                            <tr style="margin-bottom:5px">    
                                <td>Date</td>
                                <td>:</td>
                                <td>' . date('d-m-Y') . '</td>
                            </tr>
                        </table>
                    </div>
                    <!-- END title -->
                    <br>
                    <br>
                    <!-- START body -->
                    <div class="body">
                        <table  class="table-detail"  cellspacing="" cellpadding="0"  align="left">
                            <thead>
                                <tr>
                                    <th style="width:50px">No</th>
                                    <th style="width:350px">Certificant</th>
                                    <th style="width:100px">Fee/Person</th>
                                    <th style="width:100px">Pph23</th>
                                    <th style="width:100px">Total (Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td style="text-align:left">' . $certificant . '</td>
                                    <td style="text-align:right">- 50.000</td>
                                    <td style="text-align:right">- 1.000</td>
                                    <td style="text-align:right">- 49.000</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Grand Total</td>
                                    <td style="text-align:right">- 49.000</td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <br>
                        <table>
                            <tr>
                                <td style="width:500px"></td>
                                <td style="font-weight:bold; font-size:14px">Bogor, ' . date('d F Y') . '</td>
                            </tr>
                        </table>
                        <br>
                        <br>
                        <br>
                        <br>
                        <table>
                        <tr>
                            <td style="width:500px"></td>
                            <td style="font-weight:bold; font-size:14px"><u>' . user()->full_name . '</u></td>
                        </tr>
                        <tr>
                            <td style="width:500px"></td>
                            <td style="font-weight:bold; font-size:12px">Sekretariat</td>
                        </tr>
                    </table>
                    </div> <!-- END body -->                    
                </div> <!-- END Container2 -->
            </div> <!-- END Container1 -->
        </page>  <!-- END PAGE -->';


        // dd($content);

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $folder = "";
            $file = "";
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
            $file = 'Purchase Order Cancellation' . date('YmdHis') . '.pdf';
            $html2pdf->output($folder . $file, 'F');

            $email = "";
            $email = \Config\Services::email();
            $email->clear(true);
            //  $email->setTo('hakim.desyanto@gmail.com');
            $email->setTo($email_commitee);
            $email->setFrom($this->secretariat_email, 'LSP PACER');
            $email->setSubject('Pembatalan Penugasan penilaian kepada certificant');
            $email->setMessage('Kepada Team Komite, <br><br>
                 Berikut kami sampaikan pembatalan penugasan penilaian kepada certificant berikut ini : <br><br>' . $certificant . '<br><br><br>
                 Terimakasih, <br>
                 Sekretariat Pacer.');
            $email->attach($folder . $file);
            $email->send();
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Assignment */

    /**
     * Commitee Over Due
     * Hakim Desyanto
     * 2023-07-10
     */

    public function committee_over_due()
    {
        $data['title'] = 'Committee Over Due';
        $data['menu'] = $this->generate_menu('/Assignment/committee_over_due');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        $data['committees'] = $this->ScoringModel->get_committees();


        return view('Committee_over_due/Main', $data);
    }

    public function jqgrid_committee_over_due()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'gl_account_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $status = isset($_REQUEST['status']) ? $_REQUEST['status'] : '';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->AssignmentModel->jqgrid_committee_over_due($status, $tipe_keyword, $keyword, '', '', '', '',);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->AssignmentModel->jqgrid_committee_over_due($status, $tipe_keyword, $keyword, $sidx, $sord, $limit_rows, $start,);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['assignment_id'],
                $row['committee_id'],
                $row['committee_name'],
                $row['certificant_name'],
                $row['assignment_date'],
                $row['fisnish_date'],
                $row['balance']

            );
            $i++;
        }

        echo json_encode($responce);
    }
}
