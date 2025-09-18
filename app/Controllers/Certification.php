<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\CertificationModel;
use \App\Models\BaseModel;
use \App\Models\CertificantModel;
use PhpParser\Node\Stmt\TryCatch;

class Certification extends BaseController
{
    protected $CertificationModel;
    protected $BaseModel;
    protected $CertificantModel;
    protected $db;

    public function __construct()
    {
        $this->CertificationModel = new CertificationModel();
        $this->BaseModel = new BaseModel();
        $this->CertificantModel = new CertificantModel();
        $this->db = db_connect();
    }


    /**
     * Certification
     * Hakim
     * 2022-11-16
     */
    public function index()
    {
        $data['title'] = 'Certification';
        $data['menu'] = $this->generate_menu('/Certification/index');
        $data['scopes'] = $this->BaseModel->get_scopes();
        $data['users'] = $this->BaseModel->get_users();
        $data['field_codes'] = $this->BaseModel->get_field_codes();
        $data['certification_types'] = $this->BaseModel->get_certification_types();
        $data['perans'] = $this->BaseModel->get_perans();
        $data['level_auditors'] = $this->BaseModel->get_select_master_code('level_auditor');
        $data['levels'] = $this->BaseModel->get_select_master_code('level');
        $data['accreditation_statuss'] = $this->BaseModel->get_select_master_code('accreditation_status');
        $data['departement_ids'] = $this->BaseModel->get_select_master_code('departement_id');
        $data['relation_statuss'] = $this->BaseModel->get_select_master_code('relation_status');
        $data['departement_ids'] = $this->BaseModel->get_select_master_code('departement_id');
        $data['full_name'] = user()->full_name;
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Certification/Main', $data);
    }

    public function jqgrid_certification()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'gl_account_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->CertificationModel->jqgrid_certification('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->CertificationModel->jqgrid_certification($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['certification_id'] = $row['certification_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['certification_id'],
                $row['full_name'],
                $row['certification_number'],
                $row['apply_date'],
                //$row['description'],
                //$row['cost'],
                $row['level_auditor_pengajuan'],
                $row['hasil_akhir']=='Pass' ? $row['level_auditor_approved'] : "",
                $row['scope_code'],
                $row['status'],
                $row['status'],
                $row['hasil_akhir'],
                $row['start_date'] . ' - ' . $row['end_date'],
                $row['updatedAt'],
                $row['surat_persetujuan'],
                $row['surat_persetujuan'],
                ''
                //$row['level_desc'],
                //$row['university'],
                //$row['major'],
                //$row['start_date_education'],
                //$row['end_date_education'],
                //$row['certificate_number'],
                //$row['accreditation_status_desc'],
                //$row['doc_path_education'],
                //$row['experience_id'],
                //$row['company_name'],
                //$row['departement_id_desc'],
                //$row['position'],
                //$row['start_date_experience'],
                //$row['end_date_experience'],
                //$row['doc_path_experience'],
                // $row['audit_experience_id'],
                //$row['company_addres'],
                //$row['company_phone'],
                //$row['contact_person'],
                //$row['start_date_audit_experience'],
                //$row['end_date_audit_experience'],
                //$row['doc_audit_plan_path'],
                //$row['doc_work_order_path'],
                // $row['training_id '],
                //$row['provider_name'],
                //$row['start_date_training'],
                //$row['end_date_training'],
                //$row['training_topic'],
                //$row['relation_status_desc'],
                //$row['doc_path_training']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    public function add_certification()
    {
        if (!$this->validasi_add_certification()) {
            $validation = \Config\Services::validation();
            $return = array('success' => false, 'msg' => " Pilih minimal satu kode bidang");
        } else {
            $user_id = $this->request->getVar('user_id');
            $certification_id = $this->get_uuid();

            /** check pengajuan sertifikasi */
            $msg = "";
            $check_certification = $this->CertificationModel->check_certification($user_id);
            if ($check_certification >= 2) {
                $msg .= " - Anda masih memiliki pengajuan sertifikasi yang masih dalam proses <br>";
            }
            $certification_type_id = $this->request->getVar('certification_type_id');
            $scope_id = $this->request->getVar('scope_id');
            $fieldcode_id = $this->request->getVar('field_code_id');

            if (count($fieldcode_id) > 4) {
                $msg .= " - Kode bidang yang dipilih maksimal 4 <br>";
            }

            if ($certification_type_id == '2') {
                $check_scope = $this->CertificationModel->check_scope($scope_id, $user_id, "");
                if ($check_scope > 0) {
                    $msg .= " - Andah sudah pernah mengajukan sertifikasi untuk scope ini <br>";
                }
            }

            if ($msg <> "") {
                $return = array('success' => false, 'msg' => $msg);
            } else {


                /** insert into certification */
                // $certification_number = $this->request->getVar('certification_number');
                //$certification_number = date('YmdHis');
                $apply_date = date('Y-m-d H:i:s');
                $leve_auditor = $this->request->getVar('level_auditor');
                $createdAt = date('Y-m-d H:i:s');
                $data = [
                    'certification_id' => $certification_id,
                    // 'certification_number' => $certification_number,
                    'apply_date' => $apply_date,
                    'user_id' => $user_id,
                    'certification_type_id' => $certification_type_id,
                    'level_auditor' => $leve_auditor,
                    'level_auditor_pengajuan' => $leve_auditor,
                    'createdAt' => $createdAt,
                    'scope_id' => $scope_id
                ];

                $this->db->transbegin();
                $this->CertificationModel->insert_pengajuan_sertifikasi($data);

                /** insert into certification_fieldcode */
                $fc_detail = count($fieldcode_id);

                for ($j = 0; $j < $fc_detail; $j++) {
                    $data = array(
                        'certification_id' => $certification_id,
                        'scope_id' => $scope_id,
                        'fieldcode_id' => $fieldcode_id[$j]
                    );

                    $this->CertificationModel->insert_pengajuan_sertifikasi_fieldcode($data);
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

    public function submit_certification()
    {
        $id = $this->request->getVar('id');

        if (!$this->validasi_add_certification()) {
            $validation = \Config\Services::validation();
            $return = array('success' => false, 'msg' => " Pilih minimal satu kode bidang 1");
        } else {
            // } else if (($id <> "") && (!$this->validasi_edit_certification())) {
            //     $validation = \Config\Services::validation();
            //     $return = array('success' => false, 'msg' => " Pilih minimal satu kode bidang 2" . $id);
            // } else {
            $certification_number = $this->request->getVar('certification_number');
            $user_id = $this->request->getVar('user_id');
            $scope_id = $this->request->getVar('scope_id');
            $fieldcode_id = $this->request->getVar('field_code_id');
            $certification_type_id = $this->request->getVar('certification_type_id');
            $cost = $this->request->getVar('cost');
            $level_auditor = $this->request->getVar('level_auditor');
            $level_auditor_pengajuan = $this->request->getVar('level_auditor');
            $check_invoice = $this->CertificationModel->check_invoice($user_id);
            $certification_id = $id == "" ? $this->get_uuid() : $id;
            

            $msg = "";
            /** check pengajuan sertifikasi */
            $check_certification = $this->CertificationModel->check_certification($user_id);
            if ($check_certification >= 2) {
                $msg .= " - Anda masih memiliki pengajuan sertifikasi yang masih dalam proses <br>";
            }

            if (count($fieldcode_id) == 0) {
                $msg .= " - Pilih minimal satu kode bidang <br>";
            }

            $certification_type_id = $this->request->getVar('certification_type_id');

            if ($certification_type_id == '2') {
                $check_scope = $this->CertificationModel->check_scope($scope_id, $user_id, $id);
                if ($check_scope > 0) {
                    $msg .= " - Andah sudah pernah mengajukan sertifikasi untuk scope ini <br>";
                }
            }
            
            $biodata = $this->db->query('select fhd_check_biodata(?) jml', array(user_id()))->getRow()->jml;
            if ($biodata == 0) {
                $msg .= " - Anda belum mengisi biodata <br>";
            }

            if ($msg <> "") {
                $return = array('success' => false, 'msg' => $msg);
            } else {
                $get_last_invoice = $this->CertificationModel->get_last_invoice(date('Y'), date('m'));
                if ($get_last_invoice == null || $get_last_invoice == "") {
                    $invoice_number = date('Ym') . "0001";
                } else {
                    $invoice_number = $get_last_invoice['invoice_number'] + 1;
                }

                /** insert into certification */
                //$certification_number = $this->request->getVar('certification_number');
                $certification_number = date('YmdHis');
                $apply_date = date('Y-m-d H:i:s');
                //  $leve_auditor = $this->request->getVar('level_auditor');
                $createdAt = date('Y-m-d H:i:s');

                $data = [
                    'certification_id' => $certification_id,
                    'certification_number' => $certification_number,
                    'apply_date' => $apply_date,
                    'user_id' => $user_id,
                    'certification_type_id' => $certification_type_id,
                    'level_auditor' => $level_auditor,
                    'level_auditor_pengajuan' => $level_auditor,
                    'status' => '1',
                    'scope_id' => $scope_id,
                    ($id == "") ? 'createdAt' :  'UpdatedAt' => $createdAt
                ];

                $this->db->transbegin();
                if ($id == "") {
                    $this->CertificationModel->insert_pengajuan_sertifikasi($data);
                } else {
                    $this->CertificationModel->update_pengajuan_sertifikasi($data, $certification_id);
                    /** delete from  certification_fieldcode*/
                    $sql = "call delete_detail(?)";
                    $this->db->query($sql, $certification_id);
                }

                /** insert into certification_fieldcode */
                $fc_detail = count($fieldcode_id);

                for ($j = 0; $j < $fc_detail; $j++) {
                    $data = array(
                        'certification_id' => $certification_id,
                        'scope_id' => $scope_id,
                        'fieldcode_id' => $fieldcode_id[$j]
                    );

                    $this->CertificationModel->insert_pengajuan_sertifikasi_fieldcode($data);
                }


                /** insert data invoice */
                /** insert data invoice */

                /**
                 * 1. Register          --> tidak ditampilkan dalam pilihan
                 * 2. Awal
                 * 3. Perpanjangan --> langsung ditagihkan di awal
                 * 4. Kenaikan Level --> Langsung ditagihkan termasuk biaya ujian
                 * 5. Tambah Scope      --> tidak ditampilkan dalam pilihan
                 * 6. Ujian
                 * 7. Perpanjangan Dan Kenaikan Level ->> langsung ditagihkan
                 * 8. Tambah Kode Bidang 
                 */
                $get_last_invoice = $this->CertificationModel->get_last_invoice(date('Y'), date('m'));
                if ($get_last_invoice == null || $get_last_invoice == "") {
                    $invoice_number = date('Ym') . "0001";
                } else {
                    $invoice_number = $get_last_invoice['invoice_number'] + 1;
                }

                $invoice_id = $this->get_uuid();
                $invoice_date = date('Y-m-d');

                $this->db->transStatus();

                if ($certification_type_id == '2') {
                    $certification_type = $this->CertificationModel->get_certification_type('1');
                    /** input invoice utama */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'invoice_number' => $invoice_number,
                        'invoice_date' => $invoice_date,
                        'certification_id' => $certification_id,
                        'currency' => $currency,
                        'taxnum' => $taxnum,
                        'user_id' => $user_id,
                        'createdAt' => $createdAt
                    );
                    $this->CertificationModel->insert_invoice($data);


                    /** input invoice kedua */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'qty' => 1,
                        'note' => $note,
                        'vat' => $vat,
                        'price' => $price,
                        'total_invoice' => $total_invoice
                    );

                    $this->CertificationModel->insert_invoice_detail($data);
                } else if ($certification_type_id == '3') {
                    $certification_type = $this->CertificationModel->get_certification_type('3');
                    /** input invoice utama */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'invoice_number' => $invoice_number,
                        'invoice_date' => $invoice_date,
                        'certification_id' => $certification_id,
                        'currency' => $currency,
                        'taxnum' => $taxnum,
                        'user_id' => $user_id,
                        'createdAt' => $createdAt
                    );
                    $this->CertificationModel->insert_invoice($data);


                    /** input invoice kedua */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'qty' => 1,
                        'note' => $note,
                        'vat' => $vat,
                        'price' => $price,
                        'total_invoice' => $total_invoice
                    );

                    $this->CertificationModel->insert_invoice_detail($data);
                } else if ($certification_type_id == '4') {
                    $certification_type = $this->CertificationModel->get_certification_type('4');
                    /** input invoice utama */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'invoice_number' => $invoice_number,
                        'invoice_date' => $invoice_date,
                        'certification_id' => $certification_id,
                        'currency' => $currency,
                        'taxnum' => $taxnum,
                        'user_id' => $user_id,
                        'createdAt' => $createdAt
                    );
                    $this->CertificationModel->insert_invoice($data);


                    /** input invoice kedua */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'qty' => 1,
                        'note' => $note,
                        'vat' => $vat,
                        'price' => $price,
                        'total_invoice' => $total_invoice
                    );

                    $this->CertificationModel->insert_invoice_detail($data);

                    $certification_type = $this->CertificationModel->get_certification_type('6');
                    /** input invoice kedua */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'qty' => 1,
                        'note' => $note,
                        'vat' => $vat,
                        'price' => $price,
                        'total_invoice' => $total_invoice
                    );
                    $this->CertificationModel->insert_invoice_detail($data);
                } else if ($certification_type_id == '7') {
                    $certification_type = $this->CertificationModel->get_certification_type('7');
                    /** input invoice utama */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'invoice_number' => $invoice_number,
                        'invoice_date' => $invoice_date,
                        'certification_id' => $certification_id,
                        'currency' => $currency,
                        'taxnum' => $taxnum,
                        'user_id' => $user_id,
                        'createdAt' => $createdAt
                    );
                    $this->CertificationModel->insert_invoice($data);


                    /** input invoice kedua */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'qty' => 1,
                        'note' => $note,
                        'vat' => $vat,
                        'price' => $price,
                        'total_invoice' => $total_invoice
                    );
                    $this->CertificationModel->insert_invoice_detail($data);
                } else if ($certification_type_id == '8') {
                    $certification_type = $this->CertificationModel->get_certification_type('8');
                    /** input invoice utama */
                    $total_invoice = $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'invoice_number' => $invoice_number,
                        'invoice_date' => $invoice_date,
                        'certification_id' => $certification_id,
                        'currency' => $currency,
                        'taxnum' => $taxnum,
                        'user_id' => $user_id,
                        'createdAt' => $createdAt
                    );
                    $this->CertificationModel->insert_invoice($data);


                    /** input invoice kedua */
                    $total_invoice = $fc_detail * $certification_type['cost'];
                    $currency = 'IDR';
                    $price = $total_invoice / 1.11;
                    $note =  $certification_type['description'];;
                    $vat = $total_invoice - $price;
                    $taxnum = date('HisYmd');;
                    $createdAt = date('Y-m-d H:i:s');
                    $data = array(
                        'invoice_id' => $invoice_id,
                        'qty' => 1,
                        'note' => $note,
                        'vat' => $vat,
                        'price' => $price,
                        'total_invoice' => $total_invoice
                    );
                    $this->CertificationModel->insert_invoice_detail($data);
                }

                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transRollback();
                    $return = array('success' => false);
                }
            }
        }
        echo json_encode($return);
    }

    public function edit_certification()
    {
        if (!$this->validasi_edit_certification()) {
            $validation = \Config\Services::validation();
            $return = array('success' => false, 'msg' => " Pilih minimal satu kode bidang");
        } else {
            $user_id = $this->request->getvar('user_id2');
            $id = $this->request->getvar('id');

            $certification_type_id = $this->request->getVar('certification_type_id');
            $scope_id = $this->request->getVar('scope_id');
            $fieldcode_id = $this->request->getVar('field_code_id2');
            //$certification_id = $this->get_uuid();

            $msg = "";
            if (count($fieldcode_id) > 4) {
                $msg .= " - Kode bidang yang dipilih maksimal 4 <br>";
            }

            if ($certification_type_id == '2') {
                $check_scope = $this->CertificationModel->check_scope($scope_id, $user_id, $id);
                if ($check_scope > 0) {
                    $msg .= " - Andah sudah pernah mengajukan sertifikasi untuk scope ini <br>";
                }
            }
            // else {
            //     for ($fc = 0; $fc < count($fieldcode_id); $fc++) {
            //         $check_fieldcode = $this->CertificationModel->check_fieldcode($scope_id, $fieldcode_id[$fc], $user_id);
            //         if ($check_fieldcode > 0) {
            //             $msg .= " - Andah sudah pernah mengajukan sertifikasi untuk Kode Bidang ini <br>";
            //         }
            //     }
            // }

            if ($msg <> "") {
                $return = array('success' => false, 'msg' => $msg);
            } else {

                /** insert into certification */
                $certification_id = $id;
                $apply_date = date('Y-m-d H:i:s');
                $leve_auditor = $this->request->getVar('level_auditor');
                $updatedAt = date('Y-m-d H:i:s');
                $data = [
                    'certification_id' => $certification_id,
                    'apply_date' => $apply_date,
                    'user_id' => $user_id,
                    'certification_type_id' => $certification_type_id,
                    'level_auditor' => $leve_auditor,
                    'level_auditor_pengajuan' => $leve_auditor,
                    'scope_id' => $scope_id,
                    'updatedAt' => $updatedAt
                ];

                $this->db->transbegin();
                $this->CertificationModel->update_pengajuan_sertifikasi($data, $certification_id);

                /** delete from  certification_fieldcode*/
                $sql = "call delete_detail(?)";
                $this->db->query($sql, $certification_id);

                /** insert into certification_fieldcode */
                $fc_detail = count($fieldcode_id);

                for ($j = 0; $j < $fc_detail; $j++) {
                    $data = array(
                        'certification_id' => $certification_id,
                        'scope_id' => $scope_id,
                        'fieldcode_id' => $fieldcode_id[$j]
                    );

                    $this->CertificationModel->insert_pengajuan_sertifikasi_fieldcode($data);
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

    public function validasi_edit_certification()
    {

        if (!$this->validate([
            'field_code_id2'  => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    function get_data_certification_by_id()
    {
        $id = $this->request->getVar('certification_id');
        $data = $this->CertificationModel->get_data_certification_by_id($id);
        echo json_encode($data);
    }

    function delete_certification()
    {
        $id = $this->request->getVar('certification_id');

        $this->db->transbegin();
        $this->CertificationModel->delete_certification($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    public function get_cost()
    {
        $certification_type_id = $this->request->getVar('certification_type_id');
        $cost = 0;
        for ($i = 0; $i < count($certification_type_id); $i++) {
            $data = $this->CertificationModel->get_cost($certification_type_id);
            $cost = $cost + $data;
        }
        $return = array('success' => true, 'cost' => $cost);

        return json_encode($return);
    }

    public function get_cost_multi()
    {
        $certification_type_id = $this->request->getVar('certification_type_id');
        $field_code = count($this->request->getvar('field_code_id'));
        $voucher_code = $this->request->getVar('voucher_code');
        if ($voucher_code != "") {
            $discount = $this->CertificationModel->get_discount($voucher_code);
        }
        if ($certification_type_id == '4') {
            $criteria = " certification_type_id in ('4','6')";
        } else {
            $criteria = " certification_type_id='" . $certification_type_id . "'";
        }

        $data = $this->CertificationModel->get_cost_multi($criteria);
        $cost_fieldcode = $this->CertificationModel->get_cost_fieldcode();
        $cost = $data['cost'] + ($cost_fieldcode['cost'] * ($field_code - 1));
        if ($voucher_code != "" and intval($discount['discount']) > 0) {
            $cost = $cost * (100 - intval($discount['discount'])) / 100;
        }
        $data = array('success' => true, 'cost' => $cost);


        return json_encode($data);
    }

    public function getdatatoarray()
    {
        $table = $this->request->getVar('table');
        $field = $this->request->getVar('field');
        $param = $this->request->getVar('param');
        //$criteria = $this->request->getvar('criteria');
        $data = $this->BaseModel->getdatatoarray($table, $field, $param);
        return json_encode($data);
    }

    public function getdatatoarray2()
    {
        $table = $this->request->getVar('table');
        $field1 = $this->request->getVar('field1');
        $field2 = $this->request->getVar('field2');
        $data = $this->BaseModel->getdatatoarray2($table, $field1, $field2);
        return json_encode($data);
    }

    public function getdatatoarray21()
    {
        $scope_id = $this->request->getVar('scope_id');
        $data = $this->BaseModel->getdatatoarray21($scope_id);
        return json_encode($data);
    }

    public function check_doc()
    {
        $msg = "";

        /** doc education */
        $file_type = $_FILES['doc_path_education']['type'];
        if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
        } else {
            $msg .= "- Education document format<br>";
        }

        /** doc experience */
        $file_type = $_FILES['doc_path_experience']['type'];
        if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
        } else {
            $msg .= "- Experience document format<br>";
        }

        /** doc audit experience */
        $file_type = $_FILES['doc_work_order_path']['type'];
        if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
        } else {
            $msg .= "- Work Order document format<br>";
        }

        $file_type = $_FILES['doc_audit_plan_path']['type'];
        if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
        } else {
            $msg .= "- Audit Plan document format<br>";
        }

        /** doc audit experience */
        $file_type = $_FILES['doc_path_training']['type'];
        if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
        } else {
            $msg .= "- Training document format";
        }

        if ($msg == "") {
            $return = array('success' => true);
        } else {
            $silahkan = " Please Check : <br>";
            $silahkan .= $msg;
            $return = array('success' => false, 'msg' => $silahkan);
        }

        return $return;
    }

    public function check_invoice()
    {
        $user_id = user_id();
        $data = $this->CertificationModel->check_invoice($user_id);
        return json_encode($data);
    }

    public function get_data_comment_by_id()
    {
        $id = $this->request->getVar('certification_id');
        $data = $this->CertificationModel->get_data_comment_by_id($id);
        return json_encode($data);
    }

    public function add_comment()
    {
        $certification_id = $this->request->getVar('certification_id');
        if ($certification_id == "") {
            $return = array('success' => false, 'error' => 'Anda belum memiliki nomor Sertifikasi, silahkan isi form pengajuan Sertifikasi terlebih dahulu');
        } else {

            $user_id = user_id();
            $comment_date = date('Y-m-d H:i:s');
            $comment = $this->request->getVar('comment');

            $data = array(
                'certification_id' => $certification_id,
                'user_id' => $user_id,
                'comment_date' => $comment_date,
                'comment' => $comment
            );

            $this->db->transBegin();
            $this->CertificationModel->insert_comment($data);
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

    public function get_field_code()
    {
        $scope_id = $this->request->getVar('scope_id');
        $data = $this->CertificationModel->get_field_code($scope_id);
        return json_encode($data);
    }

    public function get_field_code_select()
    {
        $certification_id = $this->request->getVar('certification_id');
        $scope_id = $this->request->getVar('scope_id');
        $data = $this->CertificationModel->get_field_code_select($certification_id, $scope_id);
        return json_encode($data);
    }

    public function get_scopes_by_certification_id()
    {
        $certification_id = $this->request->getVar('certification_id');
        $data = $this->CertificationModel->get_scopes_by_certification_id($certification_id);
        return json_encode($data);
    }

    public function get_fieldcode_by_certification_id()
    {
        $certification_id = $this->request->getVar('certification_id');
        $scope_id = $this->request->getVar('scope_id');
        $data = $this->CertificationModel->get_fieldcode_by_certification_id($certification_id, $scope_id);
        return json_encode($data);
    }

    public function get_fieldcodes()
    {
        $scope_id = $this->request->getVar('scope_id');
        $data = $this->BaseModel->get_field_codes($scope_id);
        return json_encode($data);
    }

    public function get_scopes()
    {
        $data = $this->BaseModel->get_scopes();
        return json_encode($data);
    }
    
    

    /** 
     * Pengajuan Sertifikasi
     * Hakim Desyanto
     * 2022-12-09
     */

    public function pengajuan_sertifikasi()
    {
        $data['title'] = 'Pengajuan Sertifikasi';
        $data['scopes'] = $this->BaseModel->get_scopes();
        $data['field_codes'] = $this->BaseModel->get_field_codes();
        $data['certification_types'] = $this->BaseModel->get_certification_types();
        $data['level_auditors'] = $this->BaseModel->get_select_master_code('level_auditor');
        $data['educations'] = $this->CertificationModel->get_data_educations(user_id());
        $data['experiences'] = $this->CertificationModel->get_data_experiences(user_id());
        $data['audit_experiences'] = $this->CertificationModel->get_data_audit_experiences(user_id());
        $data['trainings'] = $this->CertificationModel->get_data_trainings(user_id());
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        $certifications = $this->CertificationModel->get_data_certifications(user_id());
        $data['certifications'] = $certifications;
        $user_ida = user_id() . 'a';
        $comment_id = $this->CertificationModel->get_comment_id($user_ida);
        // if (count($certifications) > 0) {
        //     $certification_id = $certifications[0]['certification_id'];
        //     $data['comments'] = $this->CertificationModel->get_coments($certification_id);
        // }
        $data['comment_id'] = $comment_id;
        $data['comments'] = $this->CertificationModel->get_coments($comment_id);
        $certification_proses = $this->CertificationModel->get_certification_proses(user_id());
        $data['jum_proses'] =  $certification_proses;
        $data['status'] = $this->CertificantModel->check_status_certification_by_id(user_id());
        //$data['cost'] = $this->CertificationModel->get_cost($test);
        $data['users'] = $this->CertificationModel->get_data_users();
        $data['menu'] = $this->generate_menu('/Certification/pengajuan_sertifikasi');
        return view('Pengajuan_sertifikasi/Main', $data);
    }

    public function add_pengajuan_sertifikasi($jumlah_pengajuan_sertifikasi)
    {
        $user_id = user_id();
        $id = $this->request->getvar('id_' . $jumlah_pengajuan_sertifikasi);
        ($id == "") ?  $certification_id = $this->get_uuid() :  $certification_id = $id;
        $date = date('YmdHis');
        $fieldcode_id = $this->request->getVar('fieldcode_id_' . $jumlah_pengajuan_sertifikasi);
        $certification_type_id = $this->request->getVar('certification_type_id_' . $jumlah_pengajuan_sertifikasi);
        $voucher_code = $this->request->getVar('voucher_code_' . $jumlah_pengajuan_sertifikasi);
        $scope_id = $this->request->getVar('scope_id_' . $jumlah_pengajuan_sertifikasi);
        $level_auditor = $this->request->getVar('level_auditor_' . $jumlah_pengajuan_sertifikasi);

        if (!$this->validasi_pengajuan_sertifikasi($jumlah_pengajuan_sertifikasi)) {
            $validation = \Config\Services::validation();
            $fieldcode_id = ($fieldcode_id == "") ? "1" : "0";
            $certification_type_id = $certification_type_id == "" ? "1" : "0";
            $scope_id = $scope_id == "" ? "1" : "0";
            $level_auditor = $level_auditor == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'fieldcode_id' => $fieldcode_id,
                'certification_type_id' => $certification_type_id,
                'scope_id' => $scope_id,
                'voucher_code' => $voucher_code,
                'level_auditor' => $level_auditor,
                'level_auditor_pengajuan' => $level_auditor,
                'msg' => 'Lengkapi terlebih dahulu datanya'

            );
        } else {
            $msg = "";

            /**check jumlah bidang */
            $fieldcode_id = $this->request->getVar('fieldcode_id_' . $jumlah_pengajuan_sertifikasi);
            $fc_detail = count($fieldcode_id);
            if ($fc_detail > 4) {
                $msg .= " - Maksimal Bidang yang bisa dipilih hanya 4 saja <br>";
            }

              if ($certification_type_id == '2') {
                $check_scope =  ($id == "") ?  $this->CertificationModel->check_scope($scope_id, $user_id, "") : $this->CertificationModel->check_scope($scope_id, $user_id, $id);
                if ($check_scope > 0) {
                    $check_scope2 =  $this->CertificationModel->check_scope2($scope_id, $user_id);
                    if ($check_scope2 > 0) {
                        $msg .= " - Andah sudah pernah mengajukan sertifikasi untuk scope ini <br>";
                    }
                }
            }



            if ($msg <> "") {
                $return = array('success' => false, 'msg' => $msg);
            } else {

                $get_last_invoice = $this->CertificationModel->get_last_invoice(date('Y'), date('m'));
                if ($get_last_invoice == null || $get_last_invoice == "") {
                    $invoice_number = date('Ym') . "0001";
                } else {
                    $invoice_number = $get_last_invoice['invoice_number'] + 1;
                }


                /** insert into certification */
                //$certification_number = $this->request->getVar('certification_number');
               // $last_number=$this->CertificationModel->get_last_certification_number();
                
                //$certification_number = date('Ymd') ."0" .$scope_id ."0" .$level_auditor .$last_number;

                $apply_date = date('Y-m-d H:i:s');
                $createdAt = date('Y-m-d H:i:s');
                
                $data = [
                    'voucher_code' => $voucher_code,
                    'scope_id' => $scope_id,
                    'apply_date' => $apply_date,
                    'user_id' => $user_id,
                    'certification_type_id' => $certification_type_id,
                    'level_auditor' => $level_auditor,
                    'level_auditor_pengajuan' => $level_auditor,
                    ($id == "") ? 'createdAt'  : 'updatedAt' => $createdAt
                ];
            
                if ($id == "") {
                    $data['certification_id'] = $certification_id;
                }
                
                try {
                     /** insert into certification */
                     $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/surat_persetujuan';
                    
                     $extension = pathinfo($_FILES["surat_persetujuan_" . $jumlah_pengajuan_sertifikasi]["name"], PATHINFO_EXTENSION);
        
                    // // Buat nama file acak
                     $randomName = uniqid().'.'.$extension;
                    
                    // // Tentukan lokasi penyimpanan file yang baru
                     $targetFile = $folder ."/" .$randomName;
                    
                     if (!file_exists($folder)) {
                         mkdir($folder, 0755, true);
                     }
                     // Pindahkan file yang diunggah ke lokasi penyimpanan yang baru
                     move_uploaded_file($_FILES["surat_persetujuan_" . $jumlah_pengajuan_sertifikasi]["tmp_name"], $targetFile);
                    
                    $doc_path = '/assets/User/surat_persetujuan/' . $randomName;
                    $data['surat_persetujuan'] = $doc_path;
                    
                } catch (\Exception $e) {
                    
                }
                
                
                $this->db->transbegin();
                ($id == "") ? $this->CertificationModel->insert_pengajuan_sertifikasi($data) : $this->CertificationModel->update_pengajuan_sertifikasi($data, $certification_id);

                /** insert into certificationd_fieldcode */
                $fieldcode_id = $this->request->getVar('fieldcode_id_' . $jumlah_pengajuan_sertifikasi);
                $fc_detail = count($fieldcode_id);

                for ($i = 0; $i < $fc_detail; $i++) {
                    $data = array(
                        'certification_id' => $certification_id,
                        'scope_id' => $scope_id,
                        'fieldcode_id' => $fieldcode_id[$i]
                    );

                    $this->CertificationModel->insert_pengajuan_sertifikasi_fieldcode($data);
                }

                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true, 'save' =>  'New', 'id' => $certification_id, 'jml' => $jumlah_pengajuan_sertifikasi);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
        }
        echo json_encode($return);

        // return redirect()->to('/Certification/pengajuan_sertifikasi');
    }

    public function submit_pengajuan_sertifikasi($jumlah_pengajuan_sertifikasi)
    {
        $id = $this->request->getVar('id');
        //$certification_number = $this->request->getVar('certification_number');
        $user_id = $this->request->getVar('user_id');
        $scope_id = $this->request->getVar('scope_id');
        $fieldcode_id = $this->request->getVar('field_code_id');
        
        $certification_type_id = $this->request->getVar('certification_type_id');
        $voucher_code = $this->request->getVar('voucher_code');
        $level_auditor = $this->request->getVar('level_auditor');
        $text_surat_persetujuan = $this->request->getVar('text_surat_persetujuan');
        $data_ke = $this->request->getVar('data_ke');
        //$certification_id = $id == "" ? $this->get_uuid() : $id;

        
        $date = date('YmdHis');

        $msg = "";

        /** check jumlah bidang yang dipilih */
         $array = json_decode($fieldcode_id);
        $fc_detail = count($array);
        if ($fc_detail > 4) {
            $msg .= " - Maksimal Bidang yang bisa dipilih hanya 4 saja <br>";
        }

        if ($certification_type_id == '2') {
            $check_scope =  ($id == "") ?  $this->CertificationModel->check_scope($scope_id, $user_id, "") : $this->CertificationModel->check_scope($scope_id, $user_id, $id);
            if ($check_scope > 0) {
                $check_scope2 =  $this->CertificationModel->check_scope2($scope_id, $user_id);
                if ($check_scope2 > 0) {
                    $msg .= " - Andah sudah pernah mengajukan sertifikasi untuk scope ini <br>";
                }
            }
        }
        
        $biodata = $this->db->query('select fhd_check_biodata(?) jml', array(user_id()))->getRow()->jml;
        if ($biodata == 0) {
            $msg .= " - Anda belum mengisi biodata <br>";
        }
        
        

        if ($msg <> "") {
            $return = array('success' => false, 'msg' => $msg);
        } else {
            
            if ($id == "") {
                $certification_id = $this->get_uuid();
            } else {
                $certification_id = $id;
                $text_surat_pengajuan=$this->CertificationModel->get_data_detail($id);
                $this->db->table('certification')->where('certification_id', $certification_id)->delete();
            }
            
            $last_number=$this->CertificationModel->get_last_certification_number();
                
            $certification_number = date('Ymd') ."0" .$scope_id ."0" .$level_auditor .$last_number;

            $apply_date = date('Y-m-d H:i:s');
            $createdAt = date('Y-m-d H:i:s');
                
                    
            $data = [
                'certification_id' => $certification_id,
                'certification_number' => $certification_number,
                'apply_date' => $apply_date,
                'scope_id' => $scope_id,
                'user_id' => $user_id,
                'certification_type_id' => $certification_type_id,
                'level_auditor' => $level_auditor,
                'level_auditor_pengajuan' => $level_auditor,
                'voucher_code' => $voucher_code,
                'status' => '1',
                ($id == "") ? 'createdAt' :  'UpdatedAt' => $createdAt
            ];
            
            try {
                 /** insert into certification */
                 $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/surat_persetujuan';
                
                 $extension = pathinfo($_FILES["surat_persetujuan"]["name"], PATHINFO_EXTENSION);
    
                // // Buat nama file acak
                 $randomName = uniqid().'.'.$extension;
                
                // // Tentukan lokasi penyimpanan file yang baru
                 $targetFile = $folder ."/" .$randomName;
                
                 if (!file_exists($folder)) {
                     mkdir($folder, 0755, true);
                 }
                 // Pindahkan file yang diunggah ke lokasi penyimpanan yang baru
                 move_uploaded_file($_FILES["surat_persetujuan"]["tmp_name"], $targetFile);
                
                $doc_path = '/assets/User/surat_persetujuan/' . $randomName;
                $data['surat_persetujuan'] = $doc_path;
                
            } catch (\Exception $e) {
                $data['surat_persetujuan'] = $text_surat_pengajuan->surat_pengajuan ;
                
            }
            $this->db->transbegin();
            //if ($id == "") {
                $this->CertificationModel->insert_pengajuan_sertifikasi($data);
            //} else {
          //      $this->CertificationModel->update_pengajuan_sertifikasi($data, $certification_id);
        //    }

            /** insert into notification */
            $this->db->query("call insert_notification(?,?,?)", array(0, 'New Certification', 'certification'));


            /** insert into certificationd_fieldcode */
            $fieldcode_id = $this->request->getVar('field_code_id');
            
            
            $fc_detail = count($array);

            // for ($i = 0; $i < $fc_detail; $i++) {
            //     $data = array(
            //         'certification_id' => $certification_id,
            //         'scope_id' => $scope_id,
            //         'fieldcode_id' => $fieldcode_id[$i]
            //     );

            //     $this->CertificationModel->insert_pengajuan_sertifikasi_fieldcode($data);
            // }
            
            foreach ($array as $value) {
                // Lakukan sesuatu dengan masing-masing nilai
                $data = array(
                    'certification_id' => $certification_id,
                    'scope_id' => $scope_id,
                    'fieldcode_id' => $value
                );

                $this->CertificationModel->insert_pengajuan_sertifikasi_fieldcode($data);
               // echo "Nilai: " . $value . "<br>";
            }


            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            /** insert data invoice */

            /**
             * 1. Register          --> tidak ditampilkan dalam pilihan
             * 2. Awal
             * 3. Perpanjangan --> langsung ditagihkan di awal
             * 4. Kenaikan Level --> Langsung ditagihkan termasuk biaya ujian
             * 5. Tambah Scope      --> tidak ditampilkan dalam pilihan
             * 6. Ujian
             * 7. Perpanjangan Dan Kenaikan Level ->> langsung ditagihkan
             * 8. Tambah Kode Bidang 
             */

            $this->db->transBegin();
            $this->db->query("call phd_invoice_awal (?,?)", array($certification_id, user_id()));
            $this->db->query("call insert_notification(?,?,?)", array(user_id(), 'New Invoice', 'personal_invoice'));
            
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            
            
                //kirim email surat persetujuan
                // $email_name = $this->ScoringFinalModel->get_email($certification_id);
    
                // $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/surat/';
                // $file = 'Surat Persetujuan.docx';
                
                // $email = \Config\Services::email();
                // $email->clear(true);
                // $email->setTo($email_name->email);
                // $email->setFrom($this->notif_email, 'LSP PACER');
                // $email->setSubject('Surat Persetujuan');
                // $email->setMessage(' Kepada Bapak/Ibu , <br><br>
                //  Mohon untuk segera mengisi dan menandatangai surat persetujuan terlampir <br><br><br><br><br>
                //  Terimakasih, <br>
                //  Sekretariat.');
                // $email->attach($folder . $file);
                // $email->send();
        
                
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            $this->run_pusher();
            $this->run_pusher_certification();
        }

        echo json_encode($return);
    }

    public function validasi_pengajuan_sertifikasi($jumlah_pengajuan_sertifikasi)
    {

        if (!$this->validate([
            'fieldcode_id_' . $jumlah_pengajuan_sertifikasi  => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'scope_id_' . $jumlah_pengajuan_sertifikasi   => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'certification_type_id_' . $jumlah_pengajuan_sertifikasi   => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'level_auditor_' . $jumlah_pengajuan_sertifikasi   => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    public function validasi_add_certification()
    {

        if (!$this->validate([
            'field_code_id'  => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    public function get_certification_types()
    {
        $data = $this->BaseModel->get_certification_types();
        return json_encode($data);
    }

    public function check_discount()
    {
        $voucher_code = $this->request->getVar('voucher_code');
        $data = $this->CertificationModel->get_discount($voucher_code);
        return json_encode($data);
    }

    /** Timeline Sertifikasi */
    public function time_line()
    {
        $data['title'] = 'Timeline Sertifikasi';
        $data['menu'] = $this->generate_menu('/Certification/time_line');
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());

        return view('Timeline', $data);
    }
}
