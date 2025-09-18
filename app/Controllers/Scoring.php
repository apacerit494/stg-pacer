<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\ScoringModel;
use \App\Models\BaseModel;
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

class Scoring extends BaseController
{
    protected $ScoringModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->ScoringModel = new ScoringModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Scoring
     * Hakim
     * 2022-11-23
     */
    public function index()
    {
        $data['title'] = 'Scoring';
        $data['menu'] = $this->generate_menu('/Scoring/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        $data['level_auditors'] = $this->BaseModel->get_select_master_code('level_auditor');
        $data['committees'] = $this->ScoringModel->get_committees();


        //$data['districts'] = $this->BaseModel->get_districts();
        return view('Scoring/Main', $data);
    }

    public function jqgrid_scoring()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'gl_account_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';
        $id = user_id();
        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->ScoringModel->jqgrid_scoring('', '', '', '', $tipe_keyword, $keyword, $id);

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

        $result = $this->ScoringModel->jqgrid_scoring($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword, $id);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['assignment_id'],
                $row['Certificant'],
                $row['committee'],
                $row['status'],
                $row['Secretariat'],
                $row['committee_id'],
                $row['education_score'],
                $row['training_score'],
                $row['audit_experience_score'],
                $row['experience_score'],
                $row['written_exam_score'],
                $row['pratical_exam_score'],
                $row['observation_score'],
                $row['committee_score'],
                $row['education_score'] + $row['training_score'] +  $row['audit_experience_score'] + $row['experience_score'] + $row['written_exam_score'] + $row['pratical_exam_score'] + $row['observation_score'],
                $row['level_auditor_komplit'],
                $row['note'],
                $row['status'],
                $row['assignment_date'],
                $row['fisnish_date']

            );
            $i++;
        }

        echo json_encode($responce);
    }

    function get_data_scoring_by_id()
    {
        $id = $this->request->getVar('assignment_id');
        $committee_id = $this->request->getVar('committee_id');
        //echo ($id .'-' .$committee_id);
        //die;
        //$committee_id = user_id();
        $data = $this->ScoringModel->get_data_scoring_by_id($id, $committee_id);
        echo json_encode($data);
    }

    function edit_scoring()
    {
        $assignment_id = $this->request->getVar('id');
        $user_id = user_id();
        $education_score = $this->request->getVar('education_score');
        $training_score = $this->request->getVar('training_score');
        $audit_experience_score = $this->request->getVar('audit_experience_score');
        $experience_score = $this->request->getVar('experience_score');
        $written_exam_score = $this->request->getVar('written_exam_score');
        $practical_exam_score = $this->request->getVar('pratical_exam_score');
        $observation_score = $this->request->getVar('observation_score');
        $scope_score = $this->request->getVar('scope_score');
        $note = $this->request->getVar('note');
        $level_auditor = $this->request->getVar('level_auditor');
        $jumlah_scope = intval($this->request->getvar('jumlah_scope'));

        $total_score = intval($education_score) + intval($training_score) + intval($audit_experience_score) + intval($experience_score)
            + intval($written_exam_score) + intval($practical_exam_score) + intval($observation_score);
        if ($total_score == 0) {
            $return = array('success' => false, 'error' => 'Anda belum memberi nilai!');
        } else {

            $data = array(
                'education_score' => $education_score,
                'training_score' => $training_score,
                'audit_experience_score' => $audit_experience_score,
                'experience_score' => $experience_score,
                'written_exam_score' => $written_exam_score,
                'pratical_exam_score' => $practical_exam_score,
                'scope_score' => $scope_score,
                'note' => $note,
                'level_auditor' => $level_auditor,
                'observation_score' => $observation_score
            );
            
            try {
                if (intval($written_exam_score)>0) {
                    $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/';
                    $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['written_exam_path']['name']);
                    if (!file_exists($folder)) {
                        mkdir($folder, 0755, true);
                    }
                    move_uploaded_file($_FILES['written_exam_path']['tmp_name'], $folderName);
                    $written_exam_path = '/assets/User/Doc_path/' . date('YmdHis') . ' ' . basename($_FILES['written_exam_path']['name']);
                    $data['written_exam_path']=$written_exam_path;
                    
                }
           
                if (intval($practical_exam_score)>0) {
                    $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/';
                    $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['practical_exam_path']['name']);
                    if (!file_exists($folder)) {
                        mkdir($folder, 0755, true);
                    }
                    move_uploaded_file($_FILES['practical_exam_path']['tmp_name'], $folderName);
                    $practical_exam_path = '/assets/User/Doc_path/' . date('YmdHis') . ' ' . basename($_FILES['practical_exam_path']['name']);
                    $data['practical_exam_path']=$practical_exam_path;
                }
                
                 if (intval($observation_score)>0) {
                    $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/';
                    $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['observation_path']['name']);
                    if (!file_exists($folder)) {
                        mkdir($folder, 0755, true);
                    }
                    move_uploaded_file($_FILES['observation_path']['tmp_name'], $folderName);
                    $observation_path = '/assets/User/Doc_path/' . date('YmdHis') . ' ' . basename($_FILES['observation_path']['name']);
                    $data['observation_path']=$observation_path;
                }
                
            } catch (\Exception $e) {
                
            }
          

            $this->db->transbegin();

            $this->ScoringModel->update_scoring($data, $assignment_id, $user_id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }

            $fieldcode_score = $this->request->getvar('fieldcode_score');
            $fieldcode_id = $this->request->getvar('fieldcode_id');

            for ($k = 0; $k < count($fieldcode_id); $k++) {
                $data = array(
                    'score' => $fieldcode_score[$k]
                );
                $this->db->transBegin();
                $this->db->table('assignmentd_fieldcode')->where('assignment_id', $assignment_id)->where('committee_id', $user_id)->where('fieldcode_id', $fieldcode_id[$k])->update($data);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                } else {
                    $this->db->transRollback();
                }
            }
            
           $get_data=$this->ScoringModel->get_data_certficant_and_commitee($assignment_id,$user_id);
            
            /** kirim email pemberitahuan ke certificant */
            $email = \Config\Services::email();
            $email->clear(true);
            $email->setTo('sekretariat@pacer.co.id');
            $email->setFrom($this->notif_email, 'LSP PACER');
            $email->setSubject('Catatan dari Komite');
            $email->setMessage('Kepada Yth Bapak/Ibu Sekretariat <br><br>
                Berikut catatan untuk sertifikan atas nama : ' .$get_data->certificant_name .' <br>
                ' .$note .' <br><br>
                Terimakasih,<br><br>' .$get_data->committee_name );
            $email->send();
            
        }


        echo json_encode($return);
    }

    function verification_score()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $committee_id = user_id();
        $data = array(
            'status' => '1'
        );

        $this->db->transbegin();
        $this->ScoringModel->verification_score($data, $assignment_id, $committee_id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        /** update status tabel education, experience, audit_experience, dan training */
        $certification_id = $this->ScoringModel->get_certification_id($assignment_id);
        $sql = "Call update_biodata(?)";
        $this->db->query($sql, $certification_id);



        $check = $this->ScoringModel->check_complete($assignment_id);
        if ($check == 2) {
            $committee_certification = $this->ScoringModel->get_committee_certifications($assignment_id);
            $this->db->query("call insert_notification(?,?,?)", array($committee_certification, 'New Assignment', 'asessment'));
            $this->run_pusher();
        }
        echo json_encode($return);
    }

    function reject_assignment()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $secretariat = $this->ScoringModel->get_secretariat($assignment_id);

        $this->db->transbegin();
        $this->db->query("call phd_rejected_assignment(?)", array($assignment_id));
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
            $this->db->query("call insert_notification(?,?,?)", array($secretariat->from_id, 'Reject Assignment', 'assignment'));
            $this->run_pusher();
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    public function get_data_assignmentd_scope()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $return = $this->ScoringModel->get_data_assignmentd_scope($assignment_id, user_id());
        return json_encode($return);
    }

    public function get_data_assignmentd_fieldcode()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $scope_id = $this->request->getVar('scope_id');
        $return = $this->ScoringModel->get_data_assignmentd_fieldcode($assignment_id, $scope_id, user_id());
        return json_encode($return);
    }

    public function re_assignment()
    {
        $id = $this->request->getVar('id');
        $committee_lama = $this->request->getVar('committee_lama');
        $committee = $this->request->getVar('committee');
        $start_date = $this->request->getVar('start_date');
        $end_date = $this->request->getVar('end_date');
        $note = $this->request->getVar('note');
        $assignment_id = $this->request->getVar('assignment_id');
        /** check dulu apakah ada komite yang sama */
        $check_komite = $this->ScoringModel->check_komite($assignment_id, $id, $committee);

        if ($check_komite == 0) {

            /** edit tabel assignmentd_to */
            $data = array(
                'committee_id' => $committee,
                'updated_by' => user_id(),
                'updatedAt' => date('Y-m-d H:i:s')
            );
            $this->db->transBegin();
            $this->ScoringModel->re_assignment($data, $id);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false, 'error' => 'Failed to connect database');
            }

            /** edit tabel assignment */
            $data = array(
                'fisnish_date' => $end_date,
                'note' => $note,
                'updatedAt' => date('Y-m-d H:i:s')
            );
            $this->db->transBegin();
            $this->ScoringModel->update_assignment($data, $assignment_id);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false, 'error' => 'Failed to connect database');
            }

            $data1 = $this->ScoringModel->get_data_assignment_lama($id, $committee_lama);

            /** kirim email po cancellation ke commitee lama */
            $this->send_email_cancelation_purchase_order($data1->committee_name, $data1->certificant_name, $data1->email, $data1->po_number);

            /** kirim email po ke commitee pengganti */
            $data2 = $this->ScoringModel->get_data_assignment_baru($id);
            $this->send_email_purchase_order($data2->committee_name, $data2->certificant_name, $data2->email, $data2->po_number);
        } else {
            $return = array('success' => false, 'error' => 'Komite sudah terdaftar untuk certificant ini, silahkan ganti komite!');
        }

        return json_encode($return);
    }

    public function send_email_purchase_order($committee_name, $certificant, $email_commitee, $po_number)
    //public function send_email_purchase_order()
    {
        setlocale(LC_ALL, 'id_ID');
        $kop = "assets/images/kop_surat.png";
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
            $email->setFrom($this->notif_email, 'LSP PACER');
            $email->setSubject('Penugasan penilaian kepada certificant');
            $email->setMessage(' Kepada Team Komite, <br><br>
                 Mohon untuk segera memberikan penilaian kepada certificant berikut ini : <br><br>' . $certificant . '<br><br><br>
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

    public function send_email_cancelation_purchase_order($committee_name, $certificant, $email_commitee, $po_number)
    //public function send_email_purchase_order()
    {
        setlocale(LC_ALL, 'id_ID');
        $kop = "assets/images/kop_surat.png";
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
            // $email->setTo('hakim.desyanto@gmail.com');
            $email->setTo($email_commitee);
            $email->setFrom($this->notif_email, 'LSP PACER');
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
}
