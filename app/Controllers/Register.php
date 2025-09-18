<?php

namespace App\Controllers;

use App\Models\RegisterModel;
use App\Models\CertificationModel;
use App\Models\CertificantModel;
use App\Models\BaseModel;
use PhpParser\Node\Stmt\TryCatch;

class Register extends BaseController
{
    protected $RegisterModel;
    protected $CertificationModel;
    protected $CertificantModel;
    protected $BaseModel;
    protected $db;

    public function __construct()
    {
        $this->RegisterModel = new RegisterModel();
        $this->CertificationModel = new CertificationModel();
        $this->CertificantModel = new CertificantModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    public function index()
    {
        $data['title'] = 'Register';
        $user_id = user_id();
        // dd($user_id);
        $province_id = user()->province_id;
        $district_id = user()->district_id;
        $subdistrict_id = user()->subdistrict_id;

        $data['menu'] = $this->generate_menu('/Register/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        $data['scopes'] = $this->BaseModel->get_scopes();
        $data['field_codes'] = $this->BaseModel->get_field_codes();
        $data['certification_types'] = $this->BaseModel->get_certification_types();
        $data['perans'] = $this->BaseModel->get_perans();
        $data['level_auditors'] = $this->BaseModel->get_select_master_code('level_auditor');
        $data['levels'] = $this->BaseModel->get_select_master_code('level');
        $data['accreditation_statuss'] = $this->BaseModel->get_select_master_code('accreditation_status');
        $data['departement_ids'] = $this->BaseModel->get_select_master_code('departement_id');
        $data['relation_statuss'] = $this->BaseModel->get_select_master_code('relation_status');
        $data['departement_ids'] = $this->BaseModel->get_select_master_code('departement_id');
        $data['provinces'] = $this->BaseModel->get_provinces();
        $isFreeze = $this->BaseModel->get_freeze($user_id);
        if ($province_id <> "") {
            $data['districts'] = $this->BaseModel->get_districts($province_id);
        } else {
            $data['districts'] = array(); //$this->BaseModel->get_districts($province_id);
        }
        if ($district_id <> "") {
            $data['subdistricts'] = $this->BaseModel->get_subdistricts($district_id);
        } else {
            $data['subdistricts'] = array(); //$this->BaseModel->get_subdistricts($district_id);
        }
        $data['villages'] = array(); //$this->BaseModel->get_villages($subdistrict_id);
        $data['user_types'] = $this->BaseModel->get_user_types();
        $data['users'] = $this->RegisterModel->get_data_users($user_id);
        $data['educations'] = $this->RegisterModel->get_data_educations($user_id);
        $data['experiences'] = $this->RegisterModel->get_data_experiences($user_id);
        $data['audits'] = $this->RegisterModel->get_data_audit_experiences($user_id);
        $data['trainings'] = $this->RegisterModel->get_data_trainings($user_id);
        $data['status'] = $this->CertificantModel->check_status_certification_by_id($user_id);
        
        if ($isFreeze == 0) {
            return view('Register/Register', $data);
        } else {
            return view('Register/Freeze',$data);    
        }
    }

    function edit_personal()
    {

        $id = user_id();
        $date = date('YmdHis');
        $full_name = strtoupper($this->request->getVar('full_name'));
        $birth_place = $this->request->getVar('birth_place');
        $birth_date = $this->request->getVar('birth_date');
        $gender = $this->request->getVar('gender');
        $address = $this->request->getVar('address');
        $province_id = $this->request->getVar('province_id');
        $district_id = $this->request->getVar('district_id');
        $subdistrict_id = $this->request->getVar('subdistrict_id');
        $village_id = $this->request->getVar('village_id');
        $mobile_phone = $this->request->getVar('mobile_phone');
        $phone = $this->request->getVar('phone');
        $idcard_number = $this->request->getVar('idcard_number');
        $text_preview = $this->request->getVar('text_preview');
        $updatedAt = date('Y-m-d H:i:s');
        $bValid = true;
        try {
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/' . $id;
            $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_idcard_path']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['doc_idcard_path']['tmp_name'], $folderName);
            $doc_idcard_path = '/assets/User/Doc_path/' . $id . '/' . $date . ' ' . basename($_FILES['doc_idcard_path']['name']);

            $file_exists = true;

            $data = array(
                'full_name' => $full_name,
                'birth_place' => $birth_place,
                'birth_date' => $birth_date,
                'gender' => $gender,
                'address' => $address,
                'province_id' => $province_id,
                'district_id' => $district_id,
                'subdistrict_id' => $subdistrict_id,
                'village_id' => $village_id,
                'mobile_phone' => $mobile_phone,
                'phone' => $phone,
                'idcard_number' => $idcard_number,
                'doc_idcard_path' => $doc_idcard_path,
                'updated_at' => $updatedAt
            );
            $bValid = true;
        } catch (\Exception $e) {
            $return=array('success'=>false,'error'=>'ada errornya :<br>' .$e);
            return json_encode($return);
            $file_exists = false;
            if ($text_preview == '' || $text_preview == null) {
                $bValid = false;
            } else {
                $data = array(
                    'full_name' => $full_name,
                    'birth_place' => $birth_place,
                    'birth_date' => $birth_date,
                    'gender' => $gender,
                    'address' => $address,
                    'province_id' => $province_id,
                    'district_id' => $district_id,
                    'subdistrict_id' => $subdistrict_id,
                    'village_id' => $village_id,
                    'mobile_phone' => $mobile_phone,
                    'phone' => $phone,
                    'idcard_number' => $idcard_number,
                    'updated_at' => $updatedAt
                );
                $bValid = true;
            }
        }

        if ($bValid == true) {

            $this->db->transbegin();
            $this->RegisterModel->update_personal($data, $id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false, 'error' => 'Gagal konek ke database!');
            }
        } else {
            $return = array('success' => false, 'error' => 'Silahkan input KTP terlebih dahulu!');
        }

        echo json_encode($return);
    }

    public function add_education($jumlah_education)
    {

        /** insert into education */
        $user_id = user_id();
        $date = date('YmdHis');
        $id = $this->request->getvar('id_' . $jumlah_education);
        $level = $this->request->getVar('level_' . $jumlah_education);
        $university = $this->request->getVar('university_' . $jumlah_education);
        $major = $this->request->getVar('major_' . $jumlah_education);
        $start_date = $this->request->getVar('start_date_education_' . $jumlah_education);
        $end_date = $this->request->getVar('end_date_education_' . $jumlah_education);
        $certificate_number = $this->request->getVar('certificate_number_' . $jumlah_education);
        $accreditation_status = $this->request->getVar('accreditation_status_' . $jumlah_education);
        //$text_doc_path_education = $this->request->getFile('doc_path_education_' . $jumlah_education);
        $text_doc_path_education = $this->request->getVar('text_doc_path_education__' . $jumlah_education);

        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_education($jumlah_education)) {
            $validation = \Config\Services::validation();
            $level = ($level == "") ? "1" : "0";
            $university = $university == "" ? "1" : "0";
            $major = $major == "" ? "1" : "0";
            $start_date_education = $start_date == "" ? "1" : "0";
            $end_date_education = $end_date == "" ? "1" : "0";
            $certificate_number = $certificate_number == "" ? "1" : "0";
            $accreditation_status = $accreditation_status == "" ? "1" : "0";
            $text_doc_path_education = $text_doc_path_education == "" ? "1" : "0";
            //$msg = "lengkapi dulu ya";

            $return = array(
                'success' => false,
                'level' => $level,
                'university' => $university,
                'major' => $major,
                'start_date_education' => $start_date_education,
                'end_date_education' => $end_date_education,
                'certificate_number' => $certificate_number,
                'accreditation_status' => $accreditation_status,
                'text_doc_path_education' => $text_doc_path_education,
                'msg' => 'Lengkapi terlebih dahulu datanya'

            );
        } else {
            if ($id == '' or $id == null) {
                $education_id =  $this->get_uuid();
            } else {
                $education_id = $id;
            }
            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Education/Doc_path/' . $user_id . '/';
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_path_education_' . $jumlah_education]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_path_education_' . $jumlah_education]['tmp_name'], $folderName);
                $doc_path = '/assets/Education/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_path_education_' . $jumlah_education]['name']);
                $data = array(
                    'education_id' =>  $education_id,
                    //'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'level' =>   $level,
                    'university' =>  $university,
                    'major' => $major,
                    'start_date' =>  $start_date,
                    'end_date' => $end_date,
                    'certificate_number' => $certificate_number,
                    'accreditation_status' => $accreditation_status,
                    'doc_path' => $doc_path,
                    'createdAt' => $createdAt
                );
            } catch (\Exception $e) {
                $data = array(
                    'education_id' =>  $education_id,
                    //'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'level' =>   $level,
                    'university' =>  $university,
                    'major' => $major,
                    'start_date' =>  $start_date,
                    'end_date' => $end_date,
                    'certificate_number' => $certificate_number,
                    'accreditation_status' => $accreditation_status,
                    // 'doc_path' => $doc_path,
                    'createdAt' => $createdAt
                );
            }
            $check_scoring = $this->RegisterModel->check_scoring(user_id());
            if ((intval($check_scoring) % 4) > 0) {
                $return = array('success' => false, 'msg' => 'Anda masih memiliki pengajuan yang masih dalam proses penilaian!');
            } else {
                
                //check apakah sudah pernah disertifikasi atau belum
                //jika sudah maka kirim notifikasi ke sekretariat bahwa sertifant berikut melakukan penambahan data
                $check_certification =$this->RegisterModel->check_certification($user_id);
                if ($check_certification>0) {
                    /** insert into notification */
                    $this->db->query("call insert_notification(?,?,?)", array(1, 'New Data', 'new_data'));
                }
                
                
                $this->db->transbegin();
                ($id == '') ? $this->RegisterModel->insert_education($data) : $this->RegisterModel->update_education($data, $id);
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return =  ($id == '') ? array('success' => true, 'save' => 'New', 'id' => $education_id) : array('success' => true, 'save' => 'Edit');
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
        }
        return json_encode($return);
    }

    public function delete_education()
    {
        $id = $this->request->getVar('id');
        $this->db->transBegin();
        $this->RegisterModel->delete_education($id);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function validasi_education($jumlah_education)
    {

        if (!$this->validate([
            'level_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'university_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'major_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'start_date_education_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'end_date_education_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'certificate_number_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'accreditation_status_' . $jumlah_education => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'text_doc_path_education_' . $jumlah_education => [
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

    public function add_experience($jumlah_experience)
    {
        $user_id = user_id();
        $date = date('YmdHis');
        $id = $this->request->getvar('id_' . $jumlah_experience);
        if ($id == '' or $id == null) {
            $experience_id =  $this->get_uuid();
        } else {
            $experience_id = $id;
        }
        $company_name = $this->request->getVar('company_name_' . $jumlah_experience);
        $company_addres = $this->request->getVar('company_addres_' . $jumlah_experience);
        $departement_id = $this->request->getVar('departement_id_' . $jumlah_experience);
        $position = $this->request->getVar('position_' . $jumlah_experience);
        $start_date_experience = $this->request->getVar('start_date_experience_' . $jumlah_experience);
        $end_date_experience = $this->request->getVar('end_date_experience_' . $jumlah_experience);
        $text_doc_path_experience = $this->request->getVar('text_doc_path_experience_' . $jumlah_experience);
        $createdAt = date('Y-m-d H:i:s');

        $check_end_date = isset($_REQUEST['check_until_now_' . $jumlah_experience]) ? '1' : '0';

        if (!$this->validasi_experience($jumlah_experience)) {
            $validation = \Config\Services::validation();
            $company_name = ($company_name == "") ? "1" : "0";
            $company_addres = ($company_addres == "") ? "1" : "0";
            $departement_id = $departement_id == "" ? "1" : "0";
            $position = $position == "" ? "1" : "0";
            $start_date_experience = $start_date_experience == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'company_name' => $company_name,
                'company_addres' => $company_addres,
                'departement_id' => $departement_id,
                'position' => $position,
                'start_date_experience' => $start_date_experience,
                'msg' => 'Lengkapi terlebih dahulu datanya'
            );
        } else {

            if ($check_end_date == '0') {
                if (!$this->validasi_experience2($jumlah_experience)) {
                    $validation = \Config\Services::validation();
                    $end_date_experience = $end_date_experience == "" ? "1" : "0";
                    $text_doc_path_experience = $text_doc_path_experience == "" ? "1" : "0";
                    $return = array(
                        'success' => false,
                        'end_date_experience' => $end_date_experience,
                        'text_doc_path_experience' => $text_doc_path_experience,
                        'msg' => 'Lengkapi terlebih dahulu datanya'
                    );
                } else {
                    /** insert into experience */
                    try {
                        $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Experience/Doc_path/' . $user_id;
                        $folderName = $folder . '/' .  $date . ' ' . basename($_FILES['doc_path_experience_' . $jumlah_experience]['name']);
                        if (!file_exists($folder)) {
                            mkdir($folder, 0755, true);
                        }
                        move_uploaded_file($_FILES['doc_path_experience_' . $jumlah_experience]['tmp_name'], $folderName);
                        $doc_path = '/assets/Experience/Doc_path/' . $user_id . '/' .  $date . ' ' . basename($_FILES['doc_path_experience_' . $jumlah_experience]['name']);
                        $data = array(
                            'experience_id' =>  $experience_id,
                            'user_id' => $user_id,
                            'company_name' => $company_name,
                            'company_addres' => $company_addres,
                            'departement_id' =>  $departement_id,
                            'position' =>  $position,
                            'start_date' =>  $start_date_experience,
                            'end_date' =>  $end_date_experience,
                            'until_now' => $check_end_date,
                            'doc_path' => $doc_path,
                            'createdAt' =>  $createdAt
                        );
                    } catch (\Exception $e) {
                        $data = array(
                            'experience_id' =>  $experience_id,
                            'user_id' => $user_id,
                            'company_name' => $company_name,
                            'company_addres' => $company_addres,
                            'departement_id' =>  $departement_id,
                            'position' =>  $position,
                            'start_date' =>  $start_date_experience,
                            'end_date' =>  $end_date_experience,
                            'until_now' => $check_end_date,
                            'createdAt' =>  $createdAt
                        );
                    }
                    $check_scoring = $this->RegisterModel->check_scoring(user_id());
                    if ((intval($check_scoring) % 4) > 0) {
                        $return = array('success' => false, 'msg' => 'Anda masih memiliki pengajuan yang masih dalam proses penilaian!');
                    } else {
                        $this->db->transbegin();
                        
                        //check apakah sudah pernah disertifikasi atau belum
                        //jika sudah maka kirim notifikasi ke sekretariat bahwa sertifant berikut melakukan penambahan data
                        $check_certification =$this->RegisterModel->check_certification($user_id);
                        if ($check_certification>0) {
                            /** insert into notification */
                            $this->db->query("call insert_notification(?,?,?)", array(1, 'New Data', 'new_data'));
                        }
               
                        ($id == '') ? $this->RegisterModel->insert_experience($data) : $this->RegisterModel->update_experience($data, $id);
                        if ($this->db->transstatus() === true) {
                            $this->db->transcommit();
                            $return =  ($id == '') ? array('success' => true, 'save' => 'New', 'id' => $experience_id) : array('success' => true, 'save' => 'Edit');
                        } else {
                            $this->db->transrollback();
                            $return = array('success' => false);
                        }
                    }
                }
            } else {
                /** insert into experience */
                $data = array(
                    'experience_id' =>  $experience_id,
                    'user_id' => $user_id,
                    'company_name' => $company_name,
                    'company_addres' => $company_addres,
                    'departement_id' =>  $departement_id,
                    'position' =>  $position,
                    'start_date' =>  $start_date_experience,
                    'end_date' =>  '0000-00-00',
                    'until_now' => $check_end_date,
                    'doc_path' => '',
                    'createdAt' =>  $createdAt
                );


                $this->db->transbegin();
               
                //check apakah sudah pernah disertifikasi atau belum
                //jika sudah maka kirim notifikasi ke sekretariat bahwa sertifant berikut melakukan penambahan data
                $check_certification =$this->RegisterModel->check_certification($user_id);
                if ($check_certification>0) {
                    /** insert into notification */
                    $this->db->query("call insert_notification(?,?,?)", array(1, 'New Data', 'new_data'));
                }
               
                ($id == '') ? $this->RegisterModel->insert_experience($data) : $this->RegisterModel->update_experience($data, $id);
               
               
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return =  ($id == '') ? array('success' => true, 'save' => 'New', 'id' => $experience_id) : array('success' => true, 'save' => 'Edit');
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
        }
        return json_encode($return);
    }

    public function delete_experience()
    {
        $id = $this->request->getVar('id');
        $this->db->transBegin();
        $this->RegisterModel->delete_experience($id);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function validasi_experience($jumlah_experience)
    {

        if (!$this->validate([
            'company_name_' . $jumlah_experience => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'company_addres_' . $jumlah_experience => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'departement_id_' . $jumlah_experience => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'position_' . $jumlah_experience => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'start_date_experience_' . $jumlah_experience => [
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

    public function validasi_experience2($jumlah_experience)
    {

        if (!$this->validate([
            'end_date_experience_' . $jumlah_experience => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'text_doc_path_experience_' . $jumlah_experience => [
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

    public function add_audit_experience($jumlah_audit)
    {
        $user_id = user_id();
        $date = date('YmdHis');
        $id = $this->request->getvar('id_' . $jumlah_audit);
        if ($id == '' or $id == null) {
            $audit_experience_id =  $this->get_uuid();
            $save = 'New';
        } else {
            $audit_experience_id = $id;
            $save = 'Old';
        }
        $company_name = $this->request->getVar('company_name_' . $jumlah_audit);
        $company_addres = $this->request->getVar('company_addres_' . $jumlah_audit);
        $company_phone = $this->request->getVar('company_phone_' . $jumlah_audit);
        $contact_person = $this->request->getVar('contact_person_' . $jumlah_audit);
        $start_date_audit_experience = $this->request->getVar('start_date_audit_experience_' . $jumlah_audit);
        $end_date_audit_experience = $this->request->getVar('end_date_audit_experience_' . $jumlah_audit);
        $role_id = $this->request->getVar('role_id_' . $jumlah_audit);
        $scope_id = $this->request->getVar('scope_id_' . $jumlah_audit);
        $createdAt = date('Y-m-d H:i:s');
        $doc_audit = $this->request->getVar('doc_audit_plan_path_' . $jumlah_audit);
        $doc_work = $this->request->getVar('doc_work_order_path_' . $jumlah_audit);
        $try1 = true;
        $try2 = true;

        if (!$this->validasi_audit($jumlah_audit)) {
            $validation = \Config\Services::validation();
            $company_name = ($company_name == "") ? "1" : "0";
            $company_addres = ($company_addres == "") ? "1" : "0";
            $company_phone = $company_phone == "" ? "1" : "0";
            $contact_person = $contact_person == "" ? "1" : "0";
            $start_date_audit_experience = $start_date_audit_experience == "" ? "1" : "0";
            $end_date_audit_experience = $end_date_audit_experience == "" ? "1" : "0";
            $role_id = $role_id == "" ? "1" : "0";
            $scope_id = $scope_id == "" ? "1" : "0";
            $doc_audit = $doc_audit == "" ? "1" : "0";
            $doc_work = $doc_work == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'company_name' => $company_name,
                'company_addres' => $company_addres,
                'company_phone' => $company_phone,
                'contact_person' => $contact_person,
                'start_date_audit_experience' => $start_date_audit_experience,
                'end_date_audit_experience' => $end_date_audit_experience,
                'role_id' => $role_id,
                'scope_id' => $scope_id,
                'doc_audit' => $doc_audit,
                'doc_work' => $doc_work,
                'msg' => 'Lengkapi terlebih dahulu datanya'
            );
        } else {
            /** insert into audit experience */

            try {
                $try1 = true;
                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Audit_Experience/Doc_path/' . $user_id;
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_audit_plan_path_' . $jumlah_audit]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_audit_plan_path_' . $jumlah_audit]['tmp_name'], $folderName);
                $doc_audit_plan_path = '/assets/Audit_Experience/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_audit_plan_path_' . $jumlah_audit]['name']);
            } catch (\Exception $e) {
                $try1 = false;
            }

            try {
                $try2 = true;
                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Audit_Experience/Doc_path/' . $user_id;
                $folderName2 = $folder . '/' . $date . ' ' . basename($_FILES['doc_work_order_path_' . $jumlah_audit]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_work_order_path_' . $jumlah_audit]['tmp_name'], $folderName2);
                $doc_work_order_path = '/assets/Audit_Experience/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_work_order_path_' . $jumlah_audit]['name']);
            } catch (\Exception $e) {
                $try2 = false;
            }


            if ($try1 == false && $try2 == false) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    'user_id' => $user_id,
                    'company_name' =>  $company_name,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'role_id' => $role_id,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    'createdAt' =>  $createdAt
                );
            } else if ($try1 == true && $try2 == false) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    'user_id' => $user_id,
                    'company_name' =>  $company_name,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'role_id' => $role_id,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    'doc_audit_plan_path' => $doc_audit_plan_path,
                    'createdAt' =>  $createdAt
                );
            } else if ($try1 == false && $try2 == true) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    'user_id' => $user_id,
                    'company_name' =>  $company_name,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'role_id' => $role_id,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    'doc_work_order_path' => $doc_work_order_path,
                    'createdAt' =>  $createdAt
                );
            } else if ($try1 == true && $try2 == true) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    'user_id' => $user_id,
                    'company_name' =>  $company_name,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'role_id' => $role_id,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    'doc_audit_plan_path' => $doc_audit_plan_path,
                    'doc_work_order_path' => $doc_work_order_path,
                    'createdAt' =>  $createdAt
                );
            }
            $check_scoring = $this->RegisterModel->check_scoring(user_id());
            if ((intval($check_scoring) % 4) > 0) {
                $return = array('success' => false, 'msg' => 'Anda masih memiliki pengajuan yang masih dalam proses penilaian!');
            } else {
                $this->db->transbegin();
                
                //check apakah sudah pernah disertifikasi atau belum
                //jika sudah maka kirim notifikasi ke sekretariat bahwa sertifant berikut melakukan penambahan data
                $check_certification =$this->RegisterModel->check_certification($user_id);
                if ($check_certification>0) {
                    /** insert into notification */
                    $this->db->query("call insert_notification(?,?,?)", array(1, 'New Data', 'new_data'));
                }
               
                ($id == '') ? $this->RegisterModel->insert_audit_experience($data) : $this->RegisterModel->update_audit_experience($data, $id);


                /** insert into audit_experienced_scope */
                $scope_id = $this->request->getVar('scope_id_' . $jumlah_audit);
                $scope_detail = count($scope_id);

                if ($id <> '') {
                    $this->db->table('audit_experienced_scope')->where('audit_experience_id', $id)->delete();
                }

                for ($i = 0; $i < $scope_detail; $i++) {
                    $data = array(
                        'audit_experience_id' => $audit_experience_id,
                        'scope_id' => $scope_id[$i]
                    );

                    $this->db->table('audit_experienced_scope')->insert($data);
                }

                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true, 'save' => $save, 'id2' => $audit_experience_id, 'id' => $try1);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
        }
        return json_encode($return);
    }

    public function delete_audit()
    {
        $id = $this->request->getVar('id');
        $this->db->transBegin();
        $this->RegisterModel->delete_audit($id);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function validasi_audit($jumlah_audit)
    {

        if (!$this->validate([
            'company_name_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ], 'company_addres_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'company_phone_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'contact_person_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'start_date_audit_experience_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'end_date_audit_experience_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'role_id_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'scope_id_' . $jumlah_audit => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ]
            // ,
            // 'doc_audit_plan_path_' . $jumlah_audit => [
            //     'rules' => 'uploaded[file_upload]|mime_in[file_upload,image/jpg,image/jpeg,image/png,application/pdf,image/*]',
            //     'errors' => [
            //          'uploaded' => 'Pilih berkas untuk diunggah.',
            //         'mime_in' => 'Format berkas tidak valid. Hanya file JPG, JPEG, PNG, atau PDF yang diizinkan.'
            //     ]
            // ],
            // 'doc_work_order_path_' . $jumlah_audit => [
            //     'rules' => 'uploaded[file_upload]|mime_in[file_upload,image/jpg,image/jpeg,image/png,application/pdf,image/*]',
            //     'errors' => [
            //          'uploaded' => 'Pilih berkas untuk diunggah.',
            //         'mime_in' => 'Format berkas tidak valid. Hanya file JPG, JPEG, PNG, atau PDF yang diizinkan.'
            //     ]
            // ]
            //'file_upload' => [
                //'rules' => 'uploaded[file_upload]|mime_in[file_upload,image/jpg,image/jpeg,image/png,application/pdf,image/*]|max_size[file_upload,1024]',
             //   'errors' => [
               //     'uploaded' => 'Pilih berkas untuk diunggah.',
                 //   'mime_in' => 'Format berkas tidak valid. Hanya file JPG, JPEG, atau PNG yang diizinkan.',
                   // 'max_size' => 'Ukuran berkas terlalu besar. Maksimal 1MB.'
                //]
            //]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    public function add_training($jumlah_training)
    {
        $user_id = user_id();
        $date = date('YmdHis');
        $id = $this->request->getvar('id_' . $jumlah_training);
        if ($id == '' or $id == null) {
            $training_id =  $this->get_uuid();
        } else {
            $training_id = $id;
        }
        $provider_name = $this->request->getVar('provider_name_' . $jumlah_training);
        $start_date_training = $this->request->getVar('start_date_training_' . $jumlah_training);
        $end_date_training = $this->request->getVar('end_date_training_' . $jumlah_training);
        $training_topic = $this->request->getVar('training_topic_' . $jumlah_training);
        $relation_status = $this->request->getVar('relation_status_' . $jumlah_training);
        $text_doc_path_training = $this->request->getVar('text_doc_path_training_' . $jumlah_training);
        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_training($jumlah_training)) {
            $validation = \Config\Services::validation();
            $provider_name = ($provider_name == "") ? "1" : "0";
            $start_date_training = $start_date_training == "" ? "1" : "0";
            $end_date_training = $end_date_training == "" ? "1" : "0";
            $relation_status = $relation_status == "" ? "1" : "0";
            $training_topic = $training_topic == "" ? "1" : "0";
            $text_doc_path_training = $text_doc_path_training == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'provider_name' => $provider_name,
                'start_date_training' => $start_date_training,
                'end_date_training' => $end_date_training,
                'relation_status' => $relation_status,
                'training_topic' => $training_topic,
                'text_doc_path_training' => $text_doc_path_training,
                'msg' => 'Lengkapi terlebih dahulu datanya'
            );
        } else {
            /** insert into training */
            try {
                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Training/Doc_path/' . $user_id;
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_path_training_' . $jumlah_training]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_path_training_' . $jumlah_training]['tmp_name'], $folderName);
                $doc_path = '/assets/Training/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_path_training_' . $jumlah_training]['name']);
                $data = array(
                    'training_id' =>  $training_id,
                    //'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'provider_name' => $provider_name,
                    'start_date' =>  $start_date_training,
                    'end_date' =>  $end_date_training,
                    'training_topic' =>  $training_topic,
                    'relation_status' =>  $relation_status,
                    'doc_path' => $doc_path,
                    'createdAt' => $createdAt
                );
            } catch (\Exception $e) {
                $data = array(
                    'training_id' =>  $training_id,
                    //'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'provider_name' => $provider_name,
                    'start_date' =>  $start_date_training,
                    'end_date' =>  $end_date_training,
                    'training_topic' =>  $training_topic,
                    'relation_status' =>  $relation_status,
                    //'doc_path' => $doc_path,
                    'createdAt' => $createdAt
                );
            }
            $check_scoring = $this->RegisterModel->check_scoring(user_id());
            if ((intval($check_scoring) % 4) > 0) {
                $return = array('success' => false, 'msg' => 'Anda masih memiliki pengajuan yang masih dalam proses penilaian!');
            } else {


                $this->db->transbegin();
                
                //check apakah sudah pernah disertifikasi atau belum
                //jika sudah maka kirim notifikasi ke sekretariat bahwa sertifant berikut melakukan penambahan data
                $check_certification =$this->RegisterModel->check_certification($user_id);
                if ($check_certification>0) {
                    /** insert into notification */
                    $this->db->query("call insert_notification(?,?,?)", array(1, 'New Data', 'new_data'));
                }
               
                ($id == '') ? $this->RegisterModel->insert_training($data) : $this->RegisterModel->update_training($data, $id);
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return =  ($id == '') ? array('success' => true, 'save' => 'New', 'id' => $training_id) : array('success' => true, 'save' => 'Edit');
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
        }
        return json_encode($return);
    }

    public function delete_training()
    {
        $id = $this->request->getVar('id');
        $this->db->transStatus();
        $this->RegisterModel->delete_training($id);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function validasi_training($jumlah_training)
    {

        if (!$this->validate([
            'provider_name_' . $jumlah_training => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'start_date_training_' . $jumlah_training => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'end_date_training_' . $jumlah_training => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'training_topic_' . $jumlah_training => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'relation_status_' . $jumlah_training => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'text_doc_path_training_' . $jumlah_training => [
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

    public function add_register()
    {
        if (!$this->validasi_data()) {
            $validation = \Config\Services::validation();

            session()->setFlashdata('validation', $validation);
            session()->setFlashdata('pesan', 'Data gagal disimpan. Silahkan isi data dengan lengkap!');

            return redirect()->to('/Register')->withInput();
        } else {
            if ($this->request->getVar('user_password') != $this->request->getVar('confirm_password')) {
                session()->setFlashdata('pesan2', 'Data gagal disimpan. Password dan Konfirm Password tidak sama');

                return redirect()->to('/Register')->withInput();
            } else {

                $user_id = $this->get_uuid();
                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Education/Doc_path/New';
                $date = date('YmdHis');
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_idcard_path']['name']);
                $file_type = $_FILES['doc_idcard_path']['type'];
                $file_name = $date . ' ' . basename($_FILES['doc_idcard_path']['name']);
                if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
                    if (!file_exists($folder)) {
                        mkdir($folder, 0755, true);
                    }
                    move_uploaded_file($_FILES['doc_idcard_path']['tmp_name'], $folderName);
                } else {
                    $msg = 'Hanya Boleh upload PDF, JPEG GIF';
                    $success = false;
                    session()->setFlashdata('pesan', 'Hanya Boleh upload PDF, JPEG GIF');
                    session()->setFlashdata('success', $success);
                    return redirect()->to("/Certification/main");
                }

                $data = array(
                    "user_id" => $user_id,
                    "full_name" => $this->request->getVar('full_name'),
                    "birth_place" => $this->request->getVar('birth_place'),
                    "birth_date" => $this->request->getVar('birth_date'),
                    "gender" => $this->request->getVar('gender'),
                    "address" => $this->request->getVar('address'),
                    "province_id" => $this->request->getVar('province_id'),
                    "district_id" => $this->request->getVar('district_id'),
                    "subdistrict_id" => $this->request->getVar('subdistrict_id'),
                    "village_id" => $this->request->getVar('village_id'),
                    "email" => $this->request->getVar('email'),
                    "mobile_phone" => $this->request->getVar('mobile_phone'),
                    "phone" => $this->request->getVar('phone'),
                    "user_type_id" => $this->request->getVar('user_type_id'),
                    "idcard_number" => $this->request->getVar('idcard_number'),
                    "doc_idcard_path" => $folderName,
                    "user_type_id" => '5',
                    "user_name" => $this->request->getVar('user_name'),
                    "user_password" => md5($this->request->getVar('user_password')),
                    "createdAt" => date('Y-m-d H:i:s')
                );
                $this->db->transStatus();
                $this->RegisterModel->insertUser($data);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                } else {
                    $this->db->transRollback();
                }


                /** insert data invoice */

                $invoice_id = $this->get_uuid();
                $invoice_number = date('YmdHis');
                $invoice_date = date('Y-m-d');
                $certification_id = 'Register';

                $cost = $this->CertificationModel->get_cost('1');
                $total_invoice = $cost['cost'];
                $currency = 'IDR';
                $price = $total_invoice / 1.11;
                $note = 'Register';
                $vat = $total_invoice - $price;
                $taxnum = date('HisYmd');;
                $createdAt = date('Y-m-d H:i:s');
                $data = array(
                    "invoice_id" => $invoice_id,
                    "invoice_number" => $invoice_number,
                    "invoice_date" => $invoice_date,
                    "certification_id" => $certification_id,
                    "user_id" => $user_id,
                    "currency" => $currency,
                    "note" => $note,
                    "taxnum" => $taxnum,
                    "vat" => $vat,
                    "price" => $price,
                    "total_invoice" => $total_invoice,
                    "createdAt" => $createdAt
                );

                $this->db->transStatus();
                $this->RegisterModel->insert_invoice($data);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                } else {
                    $this->db->transRollback();
                }


                // $id = $this->RegisterModel->insert_invoice($data);

                session()->setFlashdata('success', true);
                session()->setFlashdata('pesan', 'Data berhasil disimpan');

                return redirect()->to("/Login/index");
            }
        }
    }

    public function get_data_education_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->RegisterModel->get_data_education_by_id($id);
        return json_encode($data);
    }

    public function get_data_experience_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->RegisterModel->get_data_experience_by_id($id);
        return json_encode($data);
    }

    public function get_data_audit_experience_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->RegisterModel->get_data_audit_experience_by_id($id);
        return json_encode($data);
    }

    public function get_data_training_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->RegisterModel->get_data_training_by_id($id);
        return json_encode($data);
    }

    public function get_scopes()
    {
        $data = $this->BaseModel->get_scopes();
        return json_encode($data);
    }

    public function get_perans()
    {
        $data = $this->BaseModel->get_perans();
        return json_encode($data);
    }
}
