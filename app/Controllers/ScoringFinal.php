<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\ScoringFinalModel;
use \App\Models\CertificationModel;
use \App\Models\BaseModel;
use \App\Models\InvoiceModel;
use \App\Models\ReportModel;
use HTML5;
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

class ScoringFinal extends BaseController
{
    protected $ScoringFinalModel;
    protected $CertificationModel;
    protected $ReportModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->ScoringFinalModel = new ScoringFinalModel();
        $this->CertificationModel = new CertificationModel();
        $this->ReportModel = new ReportModel();
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
        $data['title'] = 'Scoring Final';
        $data['menu'] = $this->generate_menu('/ScoringFinal/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        $data['level_auditors'] = $this->BaseModel->get_select_master_code('level_auditor');
        return view('Scoring_final/Main', $data);
    }

    public function jqgrid_scoring_final()
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

        $result = $this->ScoringFinalModel->jqgrid_scoring_final('', '', '', '', $tipe_keyword, $keyword, $id);

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

        $result = $this->ScoringFinalModel->jqgrid_scoring_final($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword, $id);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['assignment_id'] = $row['assignment_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['assignment_id'],
                $row['committee_id'],
                $row['user_id'],
                $row['Certificant'],
                $row['status'],
                $row['level_auditor_komplit'],
                $row['scope_final'],
                $row['education_score'] + $row['training_score'] +  $row['audit_experience_score'] + $row['experience_score'] + $row['written_exam_score'] + $row['pratical_exam_score'] + $row['observation_score'],
                $row['Secretariat'],
                $row['committee'],
                $row['education_score'],
                $row['training_score'],
                $row['audit_experience_score'],
                $row['experience_score'],
                $row['written_exam_score'],
                $row['pratical_exam_score'],
                $row['observation_score'],
                $row['committee_score'],
                $row['note'],
                $row['status']

            );
            $i++;
        }

        echo json_encode($responce);
    }

    public function subgrid_scoring()
    {

        $rowid = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
        $responce = $this->ScoringFinalModel->subgrid_scoring('', '', '', '', $rowid);

        echo json_encode($responce);
    }

    function get_data_scoring_final_by_id()
    {
        $id = $this->request->getVar('assignment_id');
        $user_id = $this->request->getVar('user_id');
        if (user()->user_type_id == '1' || user()->user_type_id == '2') {
            $committee_id = 'admin';
        } else {
            $committee_id = user_id();
        }
        $data = $this->ScoringFinalModel->get_data_scoring_final_by_id($id, $committee_id, $user_id);
        echo json_encode($data);
    }

    public function get_data_scoring_committe_by_id()
    {
        $id = $this->request->getVar('assignment_id');
        $user_id = $this->request->getVar('user_id');
        $committee_id = user_id();

        $data = $this->ScoringFinalModel->get_data_scoring_committe_by_id($id, $user_id);
        echo json_encode($data);
    }

    function edit_scoring_final()
    {
        $assignment_id = $this->request->getVar('id');
        $committee_id1 = $this->request->getVar('committee_id1');
        $committee_id2 = $this->request->getVar('committee_id2');
        $committee_id3 = $this->request->getVar('committee_id3');
        $committee_score1 = $this->request->getVar('committee_score1');
        $committee_score2 = $this->request->getVar('committee_score2');
        $committee_score3 = $this->request->getVar('committee_score3');
        $user_id = user_id();
        $education_score = $this->request->getVar('education_score3');
        $training_score = $this->request->getVar('training_score3');
        $audit_experience_score = $this->request->getVar('audit_experience_score3');
        $experience_score = $this->request->getVar('experience_score3');
        $written_exam_score = $this->request->getVar('written_exam_score3');
        $pratical_exam_score = $this->request->getVar('pratical_exam_score3');
        $observation_score = $this->request->getVar('observation_score3');
        $scope_score = $this->request->getVar('scope_score3');
        $level_auditor = $this->request->getVar('level_auditor3');
        $note = $this->request->getVar('note3');
        $jumlah_scope = intval($this->request->getvar('jumlah_scope'));
        //  $jumlah_fieldcode = intval($this->request->getvar('jumlah_fieldcode'));

        if (user()->user_type_id == '1' || user()->user_type_id == '2') {
            $data1 = array(
                'committee_score' => $committee_score1
            );
            $this->db->transbegin();
            $this->ScoringFinalModel->update_committee_score($data1, $assignment_id, $committee_id1);

            $data2 = array(
                'committee_score' => $committee_score2
            );
            $this->ScoringFinalModel->update_committee_score($data2, $assignment_id, $committee_id2);

            $data3 = array(
                'committee_score' => $committee_score3,
                'note' => $note
            );
            $this->ScoringFinalModel->update_committee_score($data3, $assignment_id, $committee_id3);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        } else {
            $total_score = intval($education_score) + intval($training_score) + intval($audit_experience_score) + intval($experience_score)
                + intval($written_exam_score) + intval($pratical_exam_score) + intval($observation_score);
            if ($total_score == 0) {
                $return = array('success' => false, 'error' => 'Anda belum memberi nilai!');
            } else {
                $data = array(
                    'education_score' => $education_score,
                    'training_score' => $training_score,
                    'audit_experience_score' => $audit_experience_score,
                    'experience_score' => $experience_score,
                    'written_exam_score' => $written_exam_score,
                    'pratical_exam_score' => $pratical_exam_score,
                    'observation_score' => $observation_score,
                    'scope_score' => $scope_score,
                    'level_auditor' => $level_auditor,
                    'note' => $note,
                );
                
                try {
                        $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/';
                        $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['written_exam_path3']['name']);
                        if (!file_exists($folder)) {
                            mkdir($folder, 0755, true);
                        }
                        move_uploaded_file($_FILES['written_exam_path3']['tmp_name'], $folderName);
                        $written_exam_path = '/assets/User/Doc_path/' . date('YmdHis') . ' ' . basename($_FILES['written_exam_path3']['name']);
                        $data['written_exam_path']=$written_exam_path;
                        
                
                        $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/';
                        $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['practical_exam_path3']['name']);
                        if (!file_exists($folder)) {
                            mkdir($folder, 0755, true);
                        }
                        move_uploaded_file($_FILES['practical_exam_path3']['tmp_name'], $folderName);
                        $practical_exam_path = '/assets/User/Doc_path/' . date('YmdHis') . ' ' . basename($_FILES['practical_exam_path3']['name']);
                        $data['practical_exam_path']=$practical_exam_path;
                    
                        $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/';
                        $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['observation_path3']['name']);
                        if (!file_exists($folder)) {
                            mkdir($folder, 0755, true);
                        }
                        move_uploaded_file($_FILES['observation_path3']['tmp_name'], $folderName);
                        $observation_path = '/assets/User/Doc_path/' . date('YmdHis') . ' ' . basename($_FILES['observation_path3']['name']);
                        $data['observation_path']=$observation_path;
                    
                } catch (\Exception $e) {
                    
                }
            
                $this->db->transbegin();
                $this->ScoringFinalModel->update_scoring_final($data, $assignment_id, $user_id);

                /** insert fieldcode */
                $fieldcode_score = $this->request->getvar('fieldcode_score3');
                $fieldcode_id = $this->request->getvar('fieldcode_id1');
                for ($j = 0; $j < count($fieldcode_id); $j++) {
                    $data = array(
                        'score' => $fieldcode_score[$j]
                    );
                    $this->db->table('assignmentd_fieldcode')->where('assignment_id', $assignment_id)->where('committee_id', $user_id)->where('fieldcode_id', $fieldcode_id[$j])->update($data);
                }
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
        }
        echo json_encode($return);
    }

    function verification_score_final()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $user_id = user_id();
        $education_score = $this->request->getVar('education_score');
        $experience_score = $this->request->getVar('experience_score');
        $audit_experience_score = $this->request->getVar('audit_experience_score');
        $training_score = $this->request->getVar('training_score');

        $data = array(
            'status' => '1'
        );

        $this->db->transbegin();
        $this->ScoringFinalModel->verification_score_final($data, $assignment_id, $user_id);

        $certification_id = $this->ScoringFinalModel->get_certification_id($assignment_id);

        /** update score Education */
        $data = array(
            'score' => $education_score
        );

        $this->db->table('education')->where('certification_id', $certification_id)->update($data);

        /** update score Experience */
        $data = array(
            'score' => $experience_score
        );

        $this->db->table('experience')->where('certification_id', $certification_id)->update($data);

        /** update score audit_experience */
        $data = array(
            'score' => $audit_experience_score
        );

        $this->db->table('audit_experience')->where('certification_id', $certification_id)->update($data);

        /** update score training */
        $data = array(
            'score' => $training_score
        );

        $this->db->table('training')->where('certification_id', $certification_id)->update($data);
        $this->db->query("call insert_notification(?,?,?)", array(0, 'New Asessment', 'asessment'));

        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $this->run_pusher();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function verification_secretariat()
    {
        //  dd($this->notif_email);
          
        $assignment_id = $this->request->getVar('assignment_id');
        $committee_id = $this->request->getVar('committee_id');
        $remarks = $this->request->getVar('remarks');
        $certification_id = $this->ScoringFinalModel->get_certification_id($assignment_id);
        $email_name = $this->ScoringFinalModel->get_email($certification_id);
        $user_id = $this->CertificationModel->get_user_id($assignment_id);
        $certificant = $this->ScoringFinalModel->get_certificant($assignment_id);
        $email_komite_sertifikasi = $this->ScoringFinalModel->get_email_certification_committee($committee_id);
        if ($remarks == 'Y') {
            $sk_number = $this->ScoringFinalModel->get_sk_number($assignment_id, $committee_id);


            /** update status po */
            $data = array(
                'status' => '1',
                'updated_by' => user_id(),
                'updatedAt' => date('Y-m-d H:i:s')
            );

            $this->db->table('assignmentd_po')->where('assignment_id', $assignment_id)->where('status', '0')->update($data);


            /** kirim email invoice dari komite ke pacer */
            $datas = $this->ScoringFinalModel->get_data_invoice($assignment_id);
            foreach ($datas as $data) :

               $this->send_email_invoice($data->committee_name, $data->certificant_name, $data->po_number, $data->invoice_number, $data->bank_name, $data->account_number, $data->account_name);
               
            endforeach;

            $lulus = $this->ScoringFinalModel->get_lulus($assignment_id, $committee_id);

            if ($lulus == 0) {
                /** kirim email pemberitahuan ke certificant */
                $email = \Config\Services::email();
                $email->clear(true);
                $email->setTo($email_name->email);
                $email->setFrom($this->notif_email, 'LSP PACER');
                $email->setSubject('Sertifikasi ' . $email_name->certification_number);
                $email->setMessage('Kepada Yth Bapak/Ibu ' . $certificant . '<br><br>
                    Proses sertifikasi Bapak/Ibu telah selesai dilakukan tapi belum memenuhi persyaratan skema sertifikasi, silahkan lakukan pengajuan ulang! <br><br>
                    Terimakasih,<br><br>
                    Sekretariat');
                $email->send();
            } else {

                $this->db->query("call insert_notification(?,?,?)", array($user_id, 'New Invoice', 'personal_invoice'));
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true, 'sk_number' => $sk_number);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }

                /** kirim email pdf ke kepala LSP */
                $this->surat_penetapan($sk_number);
                
                 /** kirim email pdf ke kepala LSP */
                $this->send_email_certificate($certification_id);
        

                /** kirim email pemberitahuan ke certificant */
                $email = \Config\Services::email();
                $email->clear(true);
                $email->setTo($email_name->email);
                $email->setFrom($this->notif_email, 'LSP PACER');
                $email->setSubject('Sertifikasi ' . $email_name->certification_number);
                $email->setMessage('Nomor sertifikasi anda telah selesai dinilai, silahkan lakukan pembayaran agar anda bisa mendapatkan hasil sertifikasinya');
                $email->send();
            }
        } else {
            /** kembalikan status assignmentd_score agar komite sertifikasi bisa revisi score nya */
            $data = array(
                'status' => '0'
            );
            $this->db->transbegin();
            $this->ScoringFinalModel->verification_score_final($data, $assignment_id, $committee_id);
            $this->db->query("call insert_notification(?,?,?)", array($committee_id, 'New Revisi Asessment', 'asessment'));
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }

            /** kirim email pemberitahuan ke komite untuk revisi nilainya */

            $email = \Config\Services::email();
            $email->clear(true);
            //$email->setTo('hakim.desyanto@gmail.com');
            $email->setTo($email_komite_sertifikasi);
            $email->setFrom($this->notif_email, 'KOMITE LSP PACER');
            $email->setSubject('Revisi Nilai Certificant');
            $email->setMessage(' Kepada Yth Komite Sertifikasi, <br><br>
                 Mohon untuk merevisi penilaian untuk certificant ini : <br><br>' . $certificant . '<br><br><br>
                 Terimakasih, <br>
                 Sekretariat.');
            $email->send();
        }
        $this->run_pusher();
               
        echo json_encode($return);
    }

    public function get_data_assignmentd_scope()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $return = $this->ScoringFinalModel->get_data_assignmentd_scope($assignment_id);
        return json_encode($return);
    }

    public function get_data_assignmentd_fieldcode()
    {
        $assignment_id = $this->request->getVar('assignment_id');
        $scope_id = $this->request->getVar('scope_id');
        $return = $this->ScoringFinalModel->get_data_assignmentd_fieldcode($assignment_id, $scope_id);
        return json_encode($return);
    }

    public function surat_penetapan($sk_number)
    {
        // ambil data untuk ditampilkan di pdf
        //$sk_number
        $data = $this->ScoringFinalModel->surat_penetapan($sk_number);
        $bidangs = $this->ScoringFinalModel->get_bidangs($data['certification_id']);
        /** jika no surat masih kosong maka buatkan nomor surat */



        // $background = base_url("assets/admin/layout/images/logo.png");
        // $daun = "assets/admin/layout/images/watermark_daun.jpg";
        $kop = "assets/images/kop_surat.png";
        // $footer = "assets/admin/layout/images/footer_aga_2.png";
        $data1 = "contoh";
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
            width: 900px;
            padding-top: 100
            
        }
        
        #container2 {    
            position: absolute;
            top: 0px;
            left: 0px;
        }
        
        </style>
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->
        <page backleft="17mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px">
            <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->        
            <div id="container1">
                <div id="container2">
                    <!-- START title  -->
                    <div class="title">                
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td colspan="8" style="width:600px;>
                                    <img style="width:500px;height:80px;valign:top" src="' . $kop  . '"/>
                                </td>
                            </tr>
                            <tr>    
                                <td colspan="2" style="width:600px;>
                                <br>
                                <br>
                                    <p style="text-align:center;font-weight:bold;">
                                    SURAT PENETAPAN <br>
                                    NOMOR : ' . $data['no_surat'] . '
                                    </p>
                            </td>
                            </tr>
                            <tr>
                                <td colspan="2"  style="width:600px;>
                                    <p>
                                    <br>
                                    Sesuai dengan hasil rekomendasi dari Tim Panel maka Kepala LSP PACER menetapkan sertifikasi profesi auditor kepada :<br>
                                    </p>
                                  
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- END title -->

                    <!-- START body -->
                    <div class="body">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:600px;">                                    
                                        <table cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width:200px;"> <strong>1. Nama</strong></td>
                                                <td><strong>: ' . $data['full_name']  . '</strong></td>
                                            </tr>                                       
                                            <tr>
                                                <td><strong>2. Tempat/Tanggal lahir </strong></td>
                                                <td><strong>: ' . $data['birth_place'] . '/' . date('d-m-Y', strtotime($data['birth_date'])) . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>3. Alamat</strong> </td>
                                                <td><strong>: ' . $data['address'] . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>4. Nomor Sertifikasi</strong> </td>
                                                <td><strong>: ' . $data['certification_number'] . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>5. Lingkup sertifikasi </strong> </td>
                                                <td><strong>: ' . $data['scope_code'] . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>6. Tingkatan / Level</strong> </td>
                                                <td><strong>: ' . $data['code_description'] . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>7. Kode Bidang Industri/Jasa</strong> </td>
                                                 <td>:';

        $content .=                                        '</td>
                                            </tr>';
        $no = 1;
        $urut = "";
        foreach ($bidangs as $bidang) :
            switch ($no) {
                case "1":
                    $urut = 'A';
                    break;
                case "2":
                    $urut = 'B';
                    break;
                case "3":
                    $urut = 'C';
                    break;
                case "4":
                    $urut = 'D';
                    break;
                default:
                    $urut = $no;
                    break;
            }
            $content .= '<tr><td colspan="2"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' . $urut . '. ' . $bidang['fieldcode_code'] . ' - ' . $bidang['fieldcode_description'] . '</strong></td></tr>';
            $no++;
        endforeach;
        $content .= '<tr>
                                                <td><strong>8. Total Angka Kredit</strong> </td>
                                                <td><strong>: ' . $data['score'] . '</strong></td>
                                            </tr>
                                            <br>
                                            <tr>
                                                <td><strong>9. Tanggal Sertifikasi Awal</strong> </td>
                                                <td><strong>: ' . date('d M Y') . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>10. Masa Sertifikasi</strong> </td>
                                                <td><strong>: ' . date('d M Y') . ' s/d ' . date('d M Y', strtotime("+3 years")) . '</strong></td>
                                            </tr>
                                        </table>                                        
                                        <p>
                                        Surat ketetapan ini berlaku sejak ditanda – tangani dan jika ada kesalahan dikemudian hari maka surat keputusan ini dapat direvisi atau dibatalkan.
                                        </p>                                    
                                        
                                   
                                </td>
                            </tr>
                        </table>
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>

                                <td  style="width:600px;text-align:center;font-weight:bold;">
                                <br>
                                <br>

                                <p>
                                Kepala LSP PACER <br>
                                </p>

                                <br>
                                    <br>
                                    <br>
                                    <p style="text-align:center;font-weight:bold;">
                                    tte <br>
                                    </p>    
                                     <br>   

                                    <p style="text-align:center;font-weight:bold;">
                                    (Adhi Maryadhi PS) <br>
                                    </p>    
                                </td>
                           </tr>
                        </table>                    
                        <table>
                            <tr>
                                <td colspan="0">&nbsp;                                    
                                                         
                                </td>
                            </tr>
                           
                           
                        </table>
                    </div> <!-- END body -->                    
                </div> <!-- END Container2 -->
            </div> <!-- END Container1 -->
        </page>  <!-- END PAGE -->';


        //dd($content);

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
            $file = 'Surat Penetapan ' . date('YmdHis') . '.pdf';
            $html2pdf->output($folder . $file, 'F');

            $email = \Config\Services::email();
            $email->clear(true);
            $email->setTo('amaryadhi@pacer.co.id');
            $email->setFrom($this->notif_email, 'LSP PACER');
            $email->setSubject('Surat penetapan' . ' - ' . $data['full_name'] . ' - ' . $data['certification_number']);
            $email->setMessage('Need your electronic sign');
            $email->attach($folder . $file);
            $email->send();
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }

    public function send_email_invoice($committee_name, $certificant, $po_number, $invoice_number, $bank_name, $account_number, $account_name)
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
                        <table cellspacing="0" cellpadding="0" border="0">
                            
                            <tr>
                                <td colspan="3"><h1>INVOICE</h1></td>
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
                                <td>Attention</td>
                                <td>:</td>
                                <td>Finance Dept</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>Invoice Number </td>
                                <td>:</td>
                                <td>' . $invoice_number . '</td>
                            </tr>
                            <tr style="margin-bottom:5px">    
                                <td>Date</td>
                                <td>:</td>
                                <td>' . date('d-m-Y') . '</td>
                            </tr>
                            <tr style="margin-bottom:10px">    
                                <td>PO Number </td>
                                <td>:</td>
                                <td>' . $po_number . '</td>
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
                                <td>
                                    <table>
                                        <tr>
                                            <td><u>Please transfer to :</u></td>
                                        </tr>
                                        <tr>
                                            <td>Bank Name</td>
                                            <td>:</td>
                                            <td style="height:15px;">' . $bank_name . '</td>
                                        </tr>
                                        <tr>
                                            <td>Account Number</td>
                                            <td>:</td>
                                            <td style="height:15px;">' . $account_number . '</td>
                                        </tr>
                                        <tr>
                                            <td>Account Name</td>
                                            <td>:</td>
                                            <td style="height:15px;">' . $account_name . '</td>
                                        </tr>               
                                    </table>
                                </td>
                                <td>
                                    <table>
                                        <tr>
                                            <td style="width:300px"></td>
                                            <td style="font-weight:bold; font-size:14px"><u>' . $committee_name . '</u></td>
                                        </tr>
                                        <tr>
                                            <td style="width:300px"></td>
                                            <td style="font-weight:bold; font-size:12px">Komite</td>
                                        </tr>
                                    </table>
                                </td>
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
            $file = 'Invoice ' . date('YmdHis') . '.pdf';
            $html2pdf->output($folder . $file, 'F');

            $email = "";
            $email = \Config\Services::email();
            $email->clear(true);
            
            $email->setTo('sekretariat@pacer.co.id');
            $email->setFrom($this->notif_email, 'KOMITE LSP PACER');
            $email->setSubject('Invoice Penilaian');
            $email->setMessage(' Kepada Finance Dep, <br><br>
                 Mohon untuk segera membayarkan invoice penilaian atas nama certificant berikut ini : <br><br>' . $certificant . '<br><br><br>
                 Terimakasih, <br>
                 Komite.');
            $email->attach($folder . $file);
            $email->send();
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    
    public function send_email_certificate($id)
    {
        $data['data'] = $this->ReportModel->get_data_certification($id);
        $data['data2'] = $this->ReportModel->get_field_code($id);
        try {

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';
            $content = view('Pdf/certificate', $data);
            $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
             $file = 'Certificate ' . date('YmdHis') .$data['data']['certification_number'] .'.pdf';
           
            //$html2pdf->output('Certificate ' . date('YmdHis') . '.pdf', 'F');
            $html2pdf->output($folder . $file, 'F');
            $email = \Config\Services::email();
            $email->clear(true);
            $email->setTo('amaryadhi@pacer.co.id');
            $email->setFrom($this->notif_email, 'LSP PACER');
            $email->setSubject('Certificate ' . ' - ' . $data['data']['full_name'] . ' - ' . $data['data']['certification_number']);
            $email->setMessage('Need your electronic sign');
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
        //     $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
        //     $file = 'Surat Penetapan ' . date('YmdHis') . '.pdf';
        //     $html2pdf->output($folder . $file, 'F');

        //     $email = \Config\Services::email();
        //     $email->clear(true);
        //     $email->setTo('amaryadhi@pacer.co.id');
        //     $email->setFrom($this->notif_email, 'LSP PACER');
        //     $email->setSubject('Surat penetapan' . ' - ' . $data['full_name'] . ' - ' . $data['certification_number']);
        //     $email->setMessage('Need your electronic sign');
        //     $email->attach($folder . $file);
        //     $email->send();
        // } catch (Html2PdfException $e) {
        //     $html2pdf->clean();

        //     $formatter = new ExceptionFormatter($e);
        //     echo $formatter->getHtmlMessage();
        // }
    }
}
