<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\UserModel;
use \App\Models\RegisterModel;
use \App\Models\BaseModel;
//use chillerlan\QRCode\QRCode;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelLow;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Writer\ValidationException;

class User extends BaseController
{
    protected $UserModel;
    protected $RegisterModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->UserModel = new UserModel();
        $this->RegisterModel = new RegisterModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * User
     * Hakim
     * 2022-11-15
     */
    public function index()
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        $data['title'] = 'User';
        $data["breadcrumbs"] = ['Pengelolaan User', 'User'];
        $data["icon"] = "bx-user-circle";
        $data["no"]     = 0;
        $data['provinces'] = $this->BaseModel->get_provinces();
        $data['user_types'] = $this->BaseModel->get_user_types();
        $data['menu'] = $this->generate_menu('/User/index');

        //$data['title'] = 'Register';
        //$data['menu'] = $this->generate_menu('/Register/index');
        $data['scopes'] = $this->BaseModel->get_scopes();
        $data['field_codes'] = $this->BaseModel->get_field_codes();
        $data['certification_types'] = $this->BaseModel->get_certification_types();
        $data['perans'] = $this->BaseModel->get_perans();
        $data['level_auditors'] = $this->BaseModel->get_select_master_code('level_auditor');
        $data['genders'] = $this->BaseModel->get_select_master_code('gender');
        $data['levels'] = $this->BaseModel->get_select_master_code('level');
        $data['accreditation_statuss'] = $this->BaseModel->get_select_master_code('accreditation_status');
        $data['departement_ids'] = $this->BaseModel->get_select_master_code('departement_id');
        $data['relation_statuss'] = $this->BaseModel->get_select_master_code('relation_status');
        $data['departement_ids'] = $this->BaseModel->get_select_master_code('departement_id');
        $data['provinces'] = $this->BaseModel->get_provinces();
        $data['districts'] = $this->BaseModel->get_districts('aflkahdfldkf');
        $data['subdistricts'] = $this->BaseModel->get_subdistricts('lahfkhakfa');
        $data['villages'] = $this->BaseModel->get_villages('bakfdbasfasf');
        $data['user_types'] = $this->BaseModel->get_user_types();
        $data['users'] = $this->RegisterModel->get_data_users('naksdfklsd');
        $data['educations'] = $this->RegisterModel->get_data_educations('alkdshfklafdds');
        $data['experiences'] = $this->RegisterModel->get_data_experiences('alkdshfklafdds');
        $data['audits'] = $this->RegisterModel->get_data_audit_experiences('alkdshfklafdds');
        $data['trainings'] = $this->RegisterModel->get_data_trainings('alkdshfklafdds');
        return view('User/Main', $data);
    }

    public function jqgrid_user()
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

        $result = $this->UserModel->jqgrid_user('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->UserModel->jqgrid_user($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['user_id'] = $row['user_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['user_id'],
                $row['full_name'],
                $row['birth_place'],
                $row['birth_date'],
                $row['gender'],
                $row['address'],
                $row['province_name'],
                $row['district_name'],
                $row['subdistrict_name'],
                $row['village_name'],
                $row['email'],
                $row['mobile_phone'],
                $row['phone'],
                $row['role_name'],
                $row['idcard_number'],
                $row['doc_idcard_path'],
                // $row['user_name'],
                // $row['user_password'],
                $row['createdAt'],
                $row['updatedAt']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function edit_personal()
    {

        $id = $this->request->getVar('user_id');
        if ($id == "") {
            $user_id = $this->get_uuid();
        } else {
            $user_id = $id;
        }
        $full_name = $this->request->getVar('full_name');
        $address = $this->request->getVar('address');
        $email = $this->request->getVar('email');

        $birth_place = $this->request->getVar('birth_place');
        $birth_date = $this->request->getVar('birth_date');
        $gender = $this->request->getVar('gender');
        $province_id = $this->request->getVar('province_id');
        $district_id = $this->request->getVar('district_id');
        $subdistrict_id = $this->request->getVar('subdistrict_id');
        $village_id = $this->request->getVar('village_id');
        $mobile_phone = $this->request->getVar('mobile_phone');
        $phone = $this->request->getVar('phone');
        $idcard_number = $this->request->getVar('idcard_number');
        $doc_idcard_path = $this->request->getVar('doc_idcard_path');
        $old_password = $this->request->getVar('old_password');
        $new_password = ($this->request->getVar('user_password'));
        $confirm_password = ($this->request->getVar('confirm_password'));
        $check_password = isset($_REQUEST['check_password']) ? '1' : '0';
        $valid = true;
        if ($check_password == '1') {
            if ($new_password == "" || $confirm_password == "") {
                $valid = false;
            } else {
                $password = md5($new_password);
            }
        } else {
            $password =  $old_password;
        }

        if ($id == "") {
            if ($new_password == "" || $confirm_password == "") {
                $valid = false;
            } else {
                $password = md5($new_password);
            }
        }

        if ($valid == true) {

            $updatedAt = date('Y-m-d H:i:s');
            try {
                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/' . $id;
                $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['doc_idcard_path']['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_idcard_path']['tmp_name'], $folderName);
                $doc_idcard_path = '/assets/User/Doc_path/' . $id . '/' . date('YmdHis') . ' ' . basename($_FILES['doc_idcard_path']['name']);
                $file_exists = true;
                $data = array(
                    'user_id' => $user_id,
                    'full_name' => $full_name,
                    'birth_place' => $birth_place,
                    'birth_date' => $birth_date,
                    'gender' => $gender,
                    'address' => $address,
                    'email' => $email,
                    'province_id' => $province_id,
                    'district_id' => $district_id,
                    'subdistrict_id' => $subdistrict_id,
                    'village_id' => $village_id,
                    'mobile_phone' => $mobile_phone,
                    'phone' => $phone,
                    'user_password' => $password,
                    'idcard_number' => $idcard_number,
                    'doc_idcard_path' => $doc_idcard_path,
                    $id == "" ? 'createdAt' : 'updatedAt' => $updatedAt
                );
            } catch (\Exception $e) {
                $file_exists = false;
                $data = array(
                    'user_id' => $user_id,
                    'full_name' => $full_name,
                    'birth_place' => $birth_place,
                    'birth_date' => $birth_date,
                    'gender' => $gender,
                    'address' => $address,
                    'email' => $email,
                    'province_id' => $province_id,
                    'district_id' => $district_id,
                    'subdistrict_id' => $subdistrict_id,
                    'village_id' => $village_id,
                    'mobile_phone' => $mobile_phone,
                    'phone' => $phone,
                    'user_password' => $password,
                    'idcard_number' => $idcard_number,
                    $id == "" ? 'createdAt' : 'updatedAt' => $updatedAt
                );
            }

            $this->db->transbegin();
            $id == "" ? $this->UserModel->insert_personal($data, $user_id) : $this->RegisterModel->update_personal($data, $user_id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true, 'user_id' => $user_id, 'old_password' => $password, 'baru' => $id == '' ? 'baru' : 'lama');
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        } else {
            $return = array('success' => false, 'msg' => 'Silahkan isi dulu password dan confirm password');
        }

        echo json_encode($return);
    }

    public function validasi_personal()
    {
        if (!$this->validate([
            'full_name' => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'email' => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'user_password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Password harus diisi'
                ]
            ],
            'confirm_password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Konfirm password harus diisi'
                ]
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    public function add_education($jumlah_education)
    {
        /** insert into education */
        $user_id = $this->request->getvar('user_id_' . $jumlah_education);
        $date = date('YmdHis');
        $level = $this->request->getVar('level_' . $jumlah_education);
        $university = $this->request->getVar('university_' . $jumlah_education);
        $major = $this->request->getVar('major_' . $jumlah_education);
        $start_date = $this->request->getVar('start_date_education_' . $jumlah_education);
        $end_date = $this->request->getVar('end_date_education_' . $jumlah_education);
        $certificate_number = $this->request->getVar('certificate_number_' . $jumlah_education);
        $accreditation_status = $this->request->getVar('accreditation_status_' . $jumlah_education);
        $createdAt = date('Y-m-d H:i:s');

        $id = $this->request->getvar('id_' . $jumlah_education);
        if ($id == '' or $id == null) {
            $education_id =  $this->get_uuid();
        } else {
            $education_id = $id;
        }

        if (!$this->validasi_education($jumlah_education)) {
            $validation = \Config\Services::validation();
            $level = ($level == "") ? "1" : "0";
            $university = $university == "" ? "1" : "0";
            $major = $major == "" ? "1" : "0";
            $start_date_education = $start_date == "" ? "1" : "0";
            $end_date_education = $end_date == "" ? "1" : "0";
            $certificate_number = $certificate_number == "" ? "1" : "0";
            $accreditation_status = $accreditation_status == "" ? "1" : "0";
            // $doc_path_education = $doc_path_education == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'level' => $level,
                'university' => $university,
                'major' => $major,
                'start_date_education' => $start_date_education,
                'end_date_education' => $end_date_education,
                'certificate_number' => $certificate_number,
                'accreditation_status' => $accreditation_status,
                //   'doc_path_education' => $doc_path_education,
                'msg' => 'Lengkapi terlebih dahulu datanya'

            );
        } else {
            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Education/Doc_path/' . $user_id;
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_path_education_' . $jumlah_education]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_path_education_' . $jumlah_education]['tmp_name'], $folderName);


                $doc_path = '/assets/Education/Doc_path/' . $user_id . '/' . $date  . ' ' . basename($_FILES['doc_path_education_' . $jumlah_education]['name']);

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
                    //  'doc_path' => $doc_path,
                    'createdAt' => $createdAt
                );
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
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }


    public function add_experience($jumlah_experience)
    {
        $user_id = $this->request->getvar('user_id_' . $jumlah_experience);
        $date = date('YmdHis');
        $id = $this->request->getvar('id_' . $jumlah_experience);
        if ($id == '' or $id == null) {
            $experience_id =  $this->get_uuid();
        } else {
            $experience_id = $id;
        }
        $company_name = $this->request->getVar('company_name_' . $jumlah_experience);
        $departement_id = $this->request->getVar('departement_id_' . $jumlah_experience);
        $position = $this->request->getVar('position_' . $jumlah_experience);
        $start_date_experience = $this->request->getVar('start_date_experience_' . $jumlah_experience);
        $end_date_experience = $this->request->getVar('end_date_experience_' . $jumlah_experience);
        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_experience($jumlah_experience)) {
            $validation = \Config\Services::validation();
            $company_name = ($company_name == "") ? "1" : "0";
            $departement_id = $departement_id == "" ? "1" : "0";
            $position = $position == "" ? "1" : "0";
            $start_date_experience = $start_date_experience == "" ? "1" : "0";
            $end_date_experience = $end_date_experience == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'company_name' => $company_name,
                'departement_id' => $departement_id,
                'position' => $position,
                'start_date_experience' => $start_date_experience,
                'end_date_experience' => $end_date_experience,
                'msg' => 'Lengkapi terlebih dahulu datanya'
            );
        } else {
            /** insert into experience */
            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Experience/Doc_path/' . $user_id;
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_path_experience_' . $jumlah_experience]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_path_experience_' . $jumlah_experience]['tmp_name'], $folderName);
                $doc_path = '/assets/Experience/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_path_experience_' . $jumlah_experience]['name']);

                $data = array(
                    'experience_id' =>  $experience_id,
                    //  'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'company_name' => $company_name,
                    'departement_id' =>  $departement_id,
                    'position' =>  $position,
                    'start_date' =>  $start_date_experience,
                    'end_date' =>  $end_date_experience,
                    'doc_path' => $doc_path,
                    'createdAt' =>  $createdAt
                );
            } catch (\Exception $e) {
                $data = array(
                    'experience_id' =>  $experience_id,
                    //  'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'company_name' => $company_name,
                    'departement_id' =>  $departement_id,
                    'position' =>  $position,
                    'start_date' =>  $start_date_experience,
                    'end_date' =>  $end_date_experience,
                    // 'doc_path' => $doc_path,
                    'createdAt' =>  $createdAt
                );
            }

            $this->db->transbegin();
            ($id == '') ? $this->RegisterModel->insert_experience($data) : $this->RegisterModel->update_experience($data, $id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return =  ($id == '') ? array('success' => true, 'save' => 'New', 'id' => $experience_id) : array('success' => true, 'save' => 'Edit');
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
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
            ],
            'end_date_experience_' . $jumlah_experience => [
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
        $user_id = $this->request->getvar('user_id_' . $jumlah_audit);
        $date = date('YmdHis');
        $id = $this->request->getvar('id_' . $jumlah_audit);
        if ($id == '' or $id == null) {
            $audit_experience_id =  $this->get_uuid();
        } else {
            $audit_experience_id = $id;
        }
        $company_addres = $this->request->getVar('company_addres_' . $jumlah_audit);
        $company_phone = $this->request->getVar('company_phone_' . $jumlah_audit);
        $contact_person = $this->request->getVar('contact_person_' . $jumlah_audit);
        $start_date_audit_experience = $this->request->getVar('start_date_audit_experience_' . $jumlah_audit);
        $end_date_audit_experience = $this->request->getVar('end_date_audit_experience_' . $jumlah_audit);
        $role_id = $this->request->getVar('role_id_' . $jumlah_audit);
        $scope_id = $this->request->getVar('scope_id_' . $jumlah_audit);

        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_audit($jumlah_audit)) {
            $validation = \Config\Services::validation();
            $company_addres = ($company_addres == "") ? "1" : "0";
            $company_phone = $company_phone == "" ? "1" : "0";
            $contact_person = $contact_person == "" ? "1" : "0";
            $start_date_audit_experience = $start_date_audit_experience == "" ? "1" : "0";
            $end_date_audit_experience = $end_date_audit_experience == "" ? "1" : "0";
            $role_id = $role_id == "" ? "1" : "0";
            $scope_id = $scope_id == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'company_addres' => $company_addres,
                'company_phone' => $company_phone,
                'contact_person' => $contact_person,
                'start_date_audit_experience' => $start_date_audit_experience,
                'end_date_audit_experience' => $end_date_audit_experience,
                'role_id' => $role_id,
                'scope_id' => $scope_id,
                'msg' => 'Lengkapi terlebih dahulu datanya'
            );
        } else {
            /** insert into audit experience */

            $try1 = false;
            $try2 = false;
            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Audit_Experience/Doc_path/' . $user_id;
                $folderName = $folder . '/' . $date . ' ' . basename($_FILES['doc_audit_plan_path_' . $jumlah_audit]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_audit_plan_path_' . $jumlah_audit]['tmp_name'], $folderName);
                $doc_audit_plan_path = '/assets/Audit_Experience/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_audit_plan_path_' . $jumlah_audit]['name']);
                $try1 = true;
            } catch (\Exception $e) {
                $try1 = false;
            }

            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Audit_Experience/Doc_path/' . $user_id;
                $folderName2 = $folder . '/' . $date . ' ' . basename($_FILES['doc_work_order_path_' . $jumlah_audit]['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['doc_work_order_path_' . $jumlah_audit]['tmp_name'], $folderName2);
                $doc_work_order_path = '/assets/Audit_Experience/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['doc_work_order_path_' . $jumlah_audit]['name']);
                $try2 = true;
            } catch (\Exception $e) {
                $try2 = false;
            }

            if ($try1 == false && $try2 == false) {

                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    // 'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    // 'doc_audit_plan_path' => $doc_audit_plan_path,
                    //'doc_work_order_path' => $doc_work_order_path,
                    'createdAt' =>  $createdAt
                );
            } else if ($try1 == true && $try2 == false) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    // 'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    'doc_audit_plan_path' => $doc_audit_plan_path,
                    //'doc_work_order_path' => $doc_work_order_path,
                    'createdAt' =>  $createdAt
                );
            } else if ($try1 == false && $try2 == true) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    // 'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    // 'doc_audit_plan_path' => $doc_audit_plan_path,
                    'doc_work_order_path' => $doc_work_order_path,
                    'createdAt' =>  $createdAt
                );
            } else if ($try1 == true && $try2 == true) {
                $data = array(
                    'audit_experience_id' => $audit_experience_id,
                    // 'certification_id' => $certification_id,
                    'user_id' => $user_id,
                    'company_addres' =>  $company_addres,
                    'company_phone' =>  $company_phone,
                    'contact_person' =>  $contact_person,
                    'start_date' =>  $start_date_audit_experience,
                    'end_date' =>   $end_date_audit_experience,
                    'doc_audit_plan_path' => $doc_audit_plan_path,
                    'doc_work_order_path' => $doc_work_order_path,
                    'createdAt' =>  $createdAt
                );
            }

            $this->db->transbegin();
            ($id == '') ? $this->RegisterModel->insert_audit_experience($data) : $this->RegisterModel->update_audit_experience($data, $id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }

            /** insert into audit_experienced_role */
            $role_id = $this->request->getVar('role_id_' . $jumlah_audit);
            $role_detail = count($role_id);
            if ($id <> '') {
                $this->db->transbegin();
                $this->db->table('audit_experienced_role')->where('audit_experience_id', $id)->delete();
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }

            if ($role_detail > 0) {

                for ($i = 0; $i < $role_detail; $i++) {
                    $data = array(
                        'audit_experience_id' => $audit_experience_id,
                        'role_id' => $role_id[$i]
                    );
                    $this->db->transbegin();
                    $this->db->table('audit_experienced_role')->insert($data);
                    if ($this->db->transstatus() === true) {
                        $this->db->transcommit();
                        $return = array('success' => true);
                    } else {
                        $this->db->transrollback();
                        $return = array('success' => false);
                    }
                }
            }


            /** insert into audit_experienced_scope */
            $scope_id = $this->request->getVar('scope_id_' . $jumlah_audit);
            $scope_detail = count($scope_id);

            if ($id <> '') {
                $this->db->transbegin();
                $this->db->table('audit_experienced_scope')->where('audit_experience_id', $id)->delete();
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            }
            if ($scope_detail > 0) {

                for ($i = 0; $i < $scope_detail; $i++) {
                    $data = array(
                        'audit_experience_id' => $audit_experience_id,
                        'scope_id' => $scope_id[$i]
                    );

                    $this->db->transbegin();
                    $this->db->table('audit_experienced_scope')->insert($data);
                    if ($this->db->transstatus() === true) {
                        $this->db->transcommit();
                        $return = array('success' => true);
                    } else {
                        $this->db->transrollback();
                        $return = array('success' => false);
                    }
                }
            }
        }

        return json_encode($return);
    }

    public function validasi_audit_experience($jumlah_audit)
    {
        if (!$this->validate([
            'company_addres_' . $jumlah_audit => [
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

    public function validasi_audit($jumlah_audit)
    {

        if (!$this->validate([
            'company_addres_' . $jumlah_audit => [
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
        ])) {
            return false;
        } else {
            return true;
        }
    }

    public function delete_audit($id)
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

    public function add_training($jumlah_training)
    {
        /** insert into training */
        $user_id = $this->request->getvar('user_id_' . $jumlah_training);
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
        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_training($jumlah_training)) {
            $validation = \Config\Services::validation();
            $provider_name = ($provider_name == "") ? "1" : "0";
            $start_date_training = $start_date_training == "" ? "1" : "0";
            $end_date_training = $end_date_training == "" ? "1" : "0";
            $relation_status = $relation_status == "" ? "1" : "0";
            $training_topic = $training_topic == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'provider_name' => $provider_name,
                'start_date_training' => $start_date_training,
                'end_date_training' => $end_date_training,
                'relation_status' => $relation_status,
                'training_topic' => $training_topic,
                'msg' => 'Lengkapi terlebih dahulu datanya'
            );
        } else {
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
                    // 'doc_path' => $doc_path,
                    'createdAt' => $createdAt
                );
            }

            $this->db->transbegin();
            ($id == '') ? $this->RegisterModel->insert_training($data) : $this->RegisterModel->update_training($data, $id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return =  ($id == '') ? array('success' => true, 'save' => 'New', 'id' => $training_id) : array('success' => true, 'save' => 'Edit');
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
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
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    function add_user()
    {

        $check = $this->check_validasi();
        if ($check['success'] == false) {
            $return = array('success' => false, 'msg' => $check['msg']);
        } else {

            $user_id = $this->get_uuid();
            $full_name = $this->request->getVar('full_name');
            $birth_place = $this->request->getVar('birth_place');
            $birth_date = $this->request->getVar('birth_date');
            $gender = $this->request->getVar('gender');
            $address = $this->request->getVar('address');
            $province_id = $this->request->getVar('province_id');
            $district_id = $this->request->getVar('district_id');
            $subdistrict_id = $this->request->getVar('subdistrict_id');
            $village_id = $this->request->getVar('village_id');
            $email = $this->request->getVar('email');
            $mobile_phone = $this->request->getVar('mobile_phone');
            $phone = $this->request->getVar('phone');
            $user_type_id = $this->request->getVar('user_type_id');
            $idcard_number = $this->request->getVar('idcard_number');
            $doc_idcard_path = $this->request->getVar('doc_idcard_path');
            // $user_name = $this->request->getVar('user_name');
            $user_password = md5($this->request->getVar('user_password'));
            $note = $this->request->getVar('note');
            $createdAt = date('Y-m-d H:i:s');

            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/' . $user_id;
            $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['doc_idcard_path']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['doc_idcard_path']['tmp_name'], $folderName);

            $data = array(
                'user_id' =>  $user_id,
                'full_name' => $full_name,
                'birth_place' => $birth_place,
                'birth_date' => $birth_date,
                'gender' => $gender,
                'address' => $address,
                'province_id' => $province_id,
                'district_id' => $district_id,
                'subdistrict_id' => $subdistrict_id,
                'village_id' => $village_id,
                'email' => $email,
                'mobile_phone' => $mobile_phone,
                'phone' => $phone,
                'user_type_id' => $user_type_id,
                'idcard_number' => $idcard_number,
                'doc_idcard_path' => $folderName,
                //'user_name' => $user_name,
                'user_password' => $user_password,
                'note' => $note,
                'createdAt' => $createdAt

            );

            $this->db->transbegin();
            $this->UserModel->insert_user($data);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        }
        echo json_encode($return);
    }

    function get_data_user_by_id()
    {
        $id = $this->request->getVar('user_id');
        $data = $this->UserModel->get_data_user_by_id($id);
        echo json_encode($data);
    }

    public function check_status_certification_by_id()
    {
        $id = $this->request->getVar('user_id');
        $data = $this->UserModel->check_status_certification_by_id($id);
        if ($data == "0") {
            $return = array('success' => true);
        } else if ($data == "1") {
            $return = array('success' => false, 'msg' => 'Data tidak bisa diedit karna dalam pengajuan sertifikasi');
        } else if ($data == "2") {
            $return = array('success' => false, 'msg' => 'Data tidak bisa diedit karna dalam proses penilaian sertifikasi');
        } else if ($data == "3") {
            $return = array('success' => true);
        }
        echo json_encode($return);
    }

    function get_data_education_by_id()
    {
        $id = $this->request->getVar('user_id');
        $data = $this->UserModel->get_data_education_by_id($id);
        echo json_encode($data);
    }

    public function get_data_experience_by_id()
    {
        $id = $this->request->getVar('user_id');
        $data = $this->UserModel->get_data_experience_by_id($id);
        echo json_encode($data);
    }

    public function get_data_audit_experience_by_id()
    {
        $id = $this->request->getVar('user_id');
        $data = $this->UserModel->get_data_audit_experience_by_id($id);
        echo json_encode($data);
    }

    public function get_data_training_by_id()
    {
        $id = $this->request->getVar('user_id');
        $data = $this->UserModel->get_data_training_by_id($id);
        echo json_encode($data);
    }

    function edit_user()
    {
        $check = $this->check_validasi();
        if ($check['success'] == false) {
            $return = array('success' => false, 'msg' => $check['msg']);
        } else {
            $id = $this->request->getVar('id');
            $full_name = $this->request->getVar('full_name');
            $birth_place = $this->request->getVar('birth_place');
            $birth_date = $this->request->getVar('birth_date');
            $gender = $this->request->getVar('gender');
            $address = $this->request->getVar('address');
            $province_id = $this->request->getVar('province_id');
            $district_id = $this->request->getVar('district_id');
            $subdistrict_id = $this->request->getVar('subdistrict_id');
            $village_id = $this->request->getVar('village_id');
            $email = $this->request->getVar('email');
            $mobile_phone = $this->request->getVar('mobile_phone');
            $phone = $this->request->getVar('phone');
            $user_type_id =  $this->request->getVar('user_type_id');
            $idcard_number = $this->request->getVar('idcard_number');
            $doc_idcard_path = $this->request->getVar('doc_idcard_path');
            $user_name = $this->request->getVar('user_name');
            $user_password = md5($this->request->getVar('user_password'));
            $note = $this->request->getVar('note');
            $updatedAt = date('Y-m-d H:i:s');

            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Doc_path/' . $id;
            $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['doc_idcard_path']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['doc_idcard_path']['tmp_name'], $folderName);

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
                'email' => $email,
                'mobile_phone' => $mobile_phone,
                'phone' => $phone,
                'user_type_id' => $user_type_id,
                'idcard_number' => $idcard_number,
                'doc_idcard_path' => $folderName,
                'user_name' => $user_name,
                'user_password' => $user_password,
                'note' => $note,
                'updatedAt' => $updatedAt

            );
            $this->db->transbegin();
            $this->UserModel->update_user($data, $id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        }
        echo json_encode($return);
    }

    function delete_user()
    {
        $id = $this->request->getVar('id');
        $check = $this->UserModel->check_certification($id);
        if ($check > 0) {
            $return = array('success' => false, 'msg' => "Data tidak bisa dihapus karna sudah ada pengajuan sertifikasi!");
        } else {
            $this->db->transbegin();
            $this->UserModel->delete_user($id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        }
        echo json_encode($return);
    }

    public function check_validasi()
    {
        $msg = "";
        $file_type = $_FILES['doc_idcard_path']['type'];
        if ($file_type == "application/pdf" || $file_type == "image/gif" || $file_type == "image/jpeg") {
        } else {
            $msg = "- Please Check Document ID Card<br>";
        }

        $user_password = $this->request->getVar('user_password');
        $confirm_password = $this->request->getVar('confirm_password');
        if ($user_password != $confirm_password) {
            $msg .= "- User Password <> Confirm Password";
        }

        if ($msg == "") {
            $return = array('success' => true);
        } else {
            $return = array('success' => false, 'msg' => 'Error : <br>' . $msg);
        }
        return $return;
    }

    public function get_select()
    {
        $table = $this->request->getVar('stable');
        $data = $this->UserModel->get_select($table);
        return json_encode($data);
    }

    public function get_child()
    {
        $table = $this->request->getVar('stable');
        $id = $this->request->getVar('sid');
        $data = $this->UserModel->get_child($table, $id);
        return json_encode($data);
    }

    /**
     * Users | Upload User
     * Hakim
     * 2022-11-24
     */
    public function upload_user()
    {
        $data['title'] = 'Upload User';
        $data["breadcrumbs"] = ['Pengelolaan User', 'Upload User'];
        $data["icon"] = "bx-user-circle";
        $data["no"]     = 0;
        $data['menu'] = $this->generate_menu('/User/upload_user');
        return view('User/Upload_user', $data);
    }

    public function jqgrid_upload_user()
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

        $result = $this->UserModel->jqgrid_user('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->UserModel->jqgrid_user($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['user_id'] = $row['user_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['user_id'],
                $row['full_name'],
                $row['birth_place'],
                $row['birth_date'],
                $row['gender'],
                $row['address'],
                $row['province_name'],
                $row['district_name'],
                $row['subdistrict_name'],
                $row['village_name'],
                $row['email'],
                $row['mobile_phone'],
                $row['phone'],
                $row['role_name'],
                $row['idcard_number'],
                $row['doc_idcard_path'],
                $row['user_name'],
                $row['user_password'],
                $row['createdAt'],
                $row['updatedAt']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    public function proses_upload_user()
    {
        $validation = \Config\Services::validation();
        $valid = $this->validate(
            [
                'userfile' => [
                    'label' => 'Data File',
                    'rules' => 'uploaded[userfile]|ext_in[userfile,xls,xlsx]',
                    'errors' => [
                        'uploaded' => '{field} wajib diisi',
                        'ext_in' => '{field} harus ekstensi xls & xlsx'
                    ]
                ]
            ]
        );

        if (!$valid) {
            $pesan = [
                'pesan' => $validation->getError('userfile')
            ];
            $this->session->setFlashdata($pesan);
            //    return redirect()->to('/Accounting/upload_data_anggaran');
            $return = array('success' => false,  'status' => '0', 'error' => $this->session->getFlashdata('pesan'));
        } else {
            $file_excel = $this->request->getFile('userfile');
            $ext = $file_excel->getClientExtension();
            if ($ext == 'xls') {
                $render = new \PhpOffice\PhpSpreadsheet\Reader\Xls();
            } else {
                $render = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
            }

            //  $spreadsheet = $render->load($file_excel);
            //   $data = $spreadsheet->getActiveSheet(0)->toArray();
            //$data = $spreadsheet->getSheetByName("Main")->toArray();
            // $jumlah_error = 0;
            // $baris = 0;
            // $msg = "";
            // foreach ($data as $x => $row) {

            //     if ($x <= 0) {
            //         $baris++;
            //         continue;
            //     }

            //     /** check kolom C s/d N
            //      * apakah formanya numeric atau bukan
            //      * jika kosong maka nilanya true, jika isi 
            //      * maka dicheck data tersebut numeric atau bukan
            //      */

            //     ($row[0] != "" ? $check_numeric1 = is_numeric($row[0]) : $check_numeric1 = true);
            //     ($row[1] != "" ? $check_numeric2 = is_numeric($row[1]) : $check_numeric2 = true);
            //     ($row[3] != "" ? $check_numeric3 = is_numeric($row[3]) : $check_numeric3 = true);
            //     ($row[5] != "" ? $check_numeric4 = is_numeric($row[5]) : $check_numeric4 = true);

            //     if (
            //         $check_numeric1 == false || $check_numeric2 == false || $check_numeric3 == false
            //         || $check_numeric4 == false
            //     ) {
            //         $jumlah_error++;
            //         $msg .= " - " . $baris;
            //     }
            //     $baris++;
            // }

            /** check data napakah nomor report sudah terdaftar atau belum */
            // $check_report_no = $this->AccountingModel->check_report_no($report_no);
            // if ($check_report_no == true) {
            //     $return = array('success' => false, 'status' => '1', 'error' => 'Template laporan ' . $report_no . ' sudah terdaftar');
            // } else {
            //     /** jika tidak ada errror maka proses dilanjutkan

            // if ($jumlah_error == 0) {
            $spreadsheet = $render->load($file_excel);
            //     $data = $spreadsheet->getSheetByName("Main")->toArray();
            $data = $spreadsheet->getActiveSheet(0)->toArray();

            $jumlahsukses = 0;
            $datasimpan = array();
            foreach ($data as $x => $row) {
                if ($x <= 0) {
                    continue;
                }

                $id = $this->get_uuid();
                $full_name = $row[0];
                $birth_place = $row[1];
                $birth_date = $row[2];
                $gender = $row[3];
                $address = $row[4];
                $province_id = $row[5];
                $district_id = $row[6];
                $subdistrict_id = $row[7];
                $village_id = $row[8];
                $email = $row[9];
                $mobile_phone = $row[10];
                $phone = $row[11];
                $idcard_number = $row[12];
                $user_name = $row[13];
                $user_password = md5($row[14]);
                $createdAt = date('Y-m-d H:i:s');

                $datasimpan[] = [
                    'user_id' => $id,
                    'full_name' => $full_name,
                    'birth_place' => $birth_place,
                    'birth_date' => $birth_date,
                    'gender' => $gender,
                    'address' => $address,
                    'province_id' => $province_id,
                    'district_id ' => $district_id,
                    'subdistrict_id' => $subdistrict_id,
                    'village_id' => $village_id,
                    'email' => $email,
                    'mobile_phone' => $mobile_phone,
                    'phone' => $phone,
                    'user_type_id' => '5',
                    'idcard_number' => $idcard_number,
                    'user_name' => $user_name,
                    'user_password' => $user_password,
                    'createdAt' => $createdAt
                ];

                $jumlahsukses++;
            }
            $this->db->transBegin();
            $this->db->table('user')->insertBatch($datasimpan);
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false, 'error' => 'Failed to Connect into Databases');
            }
            // } else {
            //     /** jika ada error maka proses dihentikan dan munculkan pesan error */
            //     $return = array('success' => false, 'error' => 'Format data kolom A,B,D dan Kolom F harus Numeric!<br> ' . $msg);
            // }
            // }
        }
        echo json_encode($return);
    }
    /** end of Upload User */
}
