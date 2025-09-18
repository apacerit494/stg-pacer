<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\ProfileModel;
use \App\Models\BaseModel;
use Config\Images;
//use Intervention\Image\ImageManagerStatic as Image;
use Intervention\Image\ImageManagerStatic as Image;

class Profile extends BaseController
{
    protected $ProfileModel;
    protected $BaseModel;
    protected $db;

    public function __construct()
    {
        $this->ProfileModel = new ProfileModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    /**
     * Profile
     * Hakim
     * 2022-11-19
     */

    public function index()
    {
        $data['title'] = 'Profile';
        $data['menu'] = $this->generate_menu('/Profile/index');
        $data['committees'] = $this->BaseModel->get_committees();
        $data['committee_certifications'] = $this->BaseModel->get_committee_certifications();
        $data['user'] = $this->ProfileModel->get_user(user_id());
        $data['educations'] = $this->ProfileModel->get_educations(user_id());
        $data['experiences'] = $this->ProfileModel->get_experiences(user_id());
        $data['audits'] = $this->ProfileModel->get_audit_experiences(user_id());
        $data['trainings'] = $this->ProfileModel->get_trainings(user_id());
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        return view('Profile', $data);
    }

    public function ambil_profil($user_id)
    {
        $data['title'] = 'Profile';
        $data['menu'] = $this->generate_menu('/ScoringFinal/index');
        $data['committees'] = $this->BaseModel->get_committees();
        $data['committee_certifications'] = $this->BaseModel->get_committee_certifications();
        $data['user'] = $this->ProfileModel->get_user($user_id);
        $data['educations'] = $this->ProfileModel->get_educations($user_id);
        $data['experiences'] = $this->ProfileModel->get_experiences($user_id);
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['audits'] = $this->ProfileModel->get_audit_experiences($user_id);
        $audits = $this->ProfileModel->get_audit_experiences($user_id);
        $data['trainings'] = $this->ProfileModel->get_trainings($user_id);
        $scopes = array();
        foreach ($audits as $audit) :
            $scopes1 = $this->ProfileModel->get_scopes($audit['audit_experience_id']);
            $html = "";
            $no = 1;
            foreach ($scopes1 as $scope) :
                if ($no == 1) {
                    $html .=  '<tr>';
                    $html .=  '    <td>Scope&nbsp </td>';
                    $html .=  '    <td> :  </td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $scope['scope_description'] . ' </td>';
                    $html .=  '</tr>';
                } else {
                    $html .=  '<tr>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $scope['scope_description'] . ' </td>';
                    $html .=  '</tr>';
                }
                $no++;
            endforeach;
            $scopes[] = $html;
        endforeach;
        $data['scopes'] = $scopes;

        $roles = array();
        foreach ($audits as $audit) :
            $roles1 = $this->ProfileModel->get_roles($audit['audit_experience_id']);
            $html = "";
            $no = 1;
            foreach ($roles1 as $role) :
                if ($no == 1) {
                    $html .=  '<tr>';
                    $html .=  '    <td>Peran&nbsp </td>';
                    $html .=  '    <td> :  </td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $role['role_name'] . ' </td>';
                    $html .=  '</tr>';
                } else {
                    $html .=  '<tr>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $role['role_name'] . ' </td>';
                    $html .=  '</tr>';
                }
                $no++;
            endforeach;
            $roles[] = $html;
        endforeach;
        $data['roles'] = $roles;
        $data['certifications'] = $this->ProfileModel->get_certifications($user_id);
        $certifications = $this->ProfileModel->get_certifications($user_id);
        $types = array();
        foreach ($certifications as $certification) :
            $types1 = $this->ProfileModel->get_types($certification['certification_id']);
            $html = "";
            $no = 1;
            foreach ($types1 as $type) :
                if ($no == 1) {
                    $html .=  '<tr>';
                    $html .=  '    <td>Certification Type&nbsp </td>';
                    $html .=  '    <td> : </td>';
                    $html .=  '    <td> &nbsp' .   $no . '. ' . $type['description'] . ' </td>';
                    $html .=  '</tr>';
                } else {
                    $html .=  '<tr>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td>:</td>';
                    $html .=  '    <td>  &nbsp ' .  $no . '. ' . $type['description'] . ' </td>';
                    //$html .=  '<td style> :&nbsp' . $no . '. ' . $type['description'] . '</td>';
                    $html .=  '</tr>';
                }
                $no++;
            endforeach;
            $types[] = $html;
        endforeach;
        $data['types'] = $types;
        return view('Profile_certificant', $data);
    }

    public function my_profile()
    {
        $data['title'] = 'Profile';
        $user_id = user_id();
        $data['menu'] = $this->generate_menu('/Profile/my_profile');
        $data['committees'] = $this->BaseModel->get_committees();
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['committee_certifications'] = $this->BaseModel->get_committee_certifications();
        $data['user'] = $this->ProfileModel->get_user($user_id);
        $data['educations'] = $this->ProfileModel->get_educations($user_id);
        $data['experiences'] = $this->ProfileModel->get_experiences($user_id);
        $data['audits'] = $this->ProfileModel->get_audit_experiences($user_id);
        $audits = $this->ProfileModel->get_audit_experiences($user_id);
        $data['trainings'] = $this->ProfileModel->get_trainings($user_id);
        $scopes = array();
        foreach ($audits as $audit) :
            $scopes1 = $this->ProfileModel->get_scopes($audit['audit_experience_id']);
            $html = "";
            $no = 1;
            foreach ($scopes1 as $scope) :
                if ($no == 1) {
                    $html .=  '<tr>';
                    $html .=  '    <td>Scope&nbsp </td>';
                    $html .=  '    <td> :  </td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $scope['scope_description'] . ' </td>';
                    $html .=  '</tr>';
                } else {
                    $html .=  '<tr>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $scope['scope_description'] . ' </td>';
                    $html .=  '</tr>';
                }
                $no++;
            endforeach;
            $scopes[] = $html;
        endforeach;
        $data['scopes'] = $scopes;

        $roles = array();
        foreach ($audits as $audit) :
            $roles1 = $this->ProfileModel->get_roles($audit['audit_experience_id']);
            $html = "";
            $no = 1;
            foreach ($roles1 as $role) :
                if ($no == 1) {
                    $html .=  '<tr>';
                    $html .=  '    <td>Peran&nbsp </td>';
                    $html .=  '    <td> :  </td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $role['role_name'] . ' </td>';
                    $html .=  '</tr>';
                } else {
                    $html .=  '<tr>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $role['role_name'] . ' </td>';
                    $html .=  '</tr>';
                }
                $no++;
            endforeach;
            $roles[] = $html;
        endforeach;
        $data['roles'] = $roles;
        $data['certifications'] = $this->ProfileModel->get_certifications($user_id);
        $certifications = $this->ProfileModel->get_certifications($user_id);
        $types = array();
        foreach ($certifications as $certification) :
            $types1 = $this->ProfileModel->get_types($certification['certification_id']);
            $html = "";
            $no = 1;
            $jumtyp = count($types1);
            foreach ($types1 as $type) :
                if ($no == 1) {
                    $html .=  '<tr>';
                    $html .=  '    <td>Certification Type&nbsp </td>';
                    $html .=  '    <td> : </td>';
                    $html .=  '    <td> &nbsp' .  $no . '. ' . $type['description'] . ' </td>';
                    $html .=  '</tr>';
                } else {
                    $html .=  '<tr>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td></td>';
                    $html .=  '    <td>  &nbsp ' . $no . '. ' . $type['description'] . ' </td>';
                    $html .=  '</tr>';
                }
                $no++;
            endforeach;
            $types[] = $html;
        endforeach;
        $data['types'] = $types;
        return view('Profile', $data);
    }

    public function add_profile_picture()
    {
        $user_id = user_id();
        $date = date('YmdHis');

        //batas
        if ($file = $this->request->getFile('userImage')) {
            if ($file->isValid() && !$file->hasMoved()) {

                // Get file name and extension
                $filename = $file->getName();
                $ext = $file->getClientExtension();

                // Get random file name
                $newName = $file->getRandomName();

                // Store file in public/uploads/ folder
                $upload_location = $_SERVER["DOCUMENT_ROOT"] . '/assets/Personal/Profile_picture/';
                $file->move($upload_location, $newName);

                // File path to display preview
                $filepath = base_url() . "/uploads/" . $newName;

                // Resize image
                $resize_location =  $_SERVER["DOCUMENT_ROOT"] . '/assets/Personal/Profile_picture/';
                if (!is_dir($resize_location)) {
                    mkdir($resize_location, 0777, TRUE);
                }


                $image = \Config\Services::image();
                $image->withFile($upload_location . $newName)
                    ->resize(0, 120, true, 'height')
                    ->save($resize_location . $newName);

                $profile_picture = '/assets/Personal/Profile_picture/' . $newName;


                $data = array(
                    'profile_picture' => $profile_picture
                );

                $this->db->transBegin();
                $this->db->table('users')->where('id', $user_id)->update($data);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                    $this->session->set('profile_picture',  $profile_picture);
                    $return = array('success' => true);
                } else {
                    $this->db->transRollback();
                    $return = array('success' => false);
                }

                // Set Session
                session()->setFlashdata('message', 'File uploaded successfully.');
                session()->setFlashdata('alert-class', 'alert-success');
            } else {
                // Set Session
                session()->setFlashdata('message', 'File not uploaded.');
                session()->setFlashdata('alert-class', 'alert-danger');
            }
        } else {
            // Set Session
            session()->setFlashdata('message', 'File not uploaded.');
            session()->setFlashdata('alert-class', 'alert-danger');
        }
        // batas

        // $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Personal/Profile_picture/' . $user_id;
        // $folderName = $folder . '/' . $date . ' ' . basename($_FILES['userImage']['name']);
        // if (!file_exists($folder)) {
        //     mkdir($folder, 0755, true);
        // }
        // move_uploaded_file($_FILES['userImage']['tmp_name'], $folderName);

        // $profile_picture = '/assets/Personal/Profile_picture/' . $user_id . '/' . $date  . ' ' . basename($_FILES['userImage']['name']);

        // $data = array(
        //     'profile_picture' => $profile_picture
        // );

        // $this->db->transBegin();
        // $this->db->table('users')->where('id', $user_id)->update($data);
        // if ($this->db->transStatus() == true) {
        //     $this->db->transCommit();
        //     $this->session->set('profile_picture',  $profile_picture);
        //     $return = array('success' => true);
        // } else {
        //     $this->db->transRollback();
        //     $return = array('success' => false);
        // }

        //return json_encode($return);

        return redirect()->to('/Profile/my_profile');
    }
}
