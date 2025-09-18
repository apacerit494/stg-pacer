<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\PartnerModel;
use \App\Models\RegisterModel;
use \App\Models\BaseModel;

use Config\Services;
use Myth\Auth\Models\UserModel;
use Myth\Auth\Entities\User;

class Partner extends BaseController
{
    protected $PartnerModel;
    protected $RegisterModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->PartnerModel = new PartnerModel();
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
        $data['title'] = 'Partner';
        $data['menu'] = $this->generate_menu('/Partner/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Partner/Main', $data);
    }

    public function jqgrid_partner()
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

        $result = $this->PartnerModel->jqgrid_partner('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->PartnerModel->jqgrid_partner($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['partner_id'] = $row['partner_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['partner_id'],
                $row['partner_name'],
                $row['contract_start_date'],
                $row['contract_end_date'],
                $row['relation_status'] == '1' ? 'Active' : 'Non Active',
                $row['address'],
                $row['website'],
                $row['phone'],
                $row['fax'],
                $row['contact_person'],
                $row['hp']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_partner()
    {

        $partner_name = $this->request->getVar('partner_name');
        $contract_start_date = $this->request->getVar('contract_start_date');
        $contract_end_date = $this->request->getVar('contract_end_date');
        $relation_status = $this->request->getVar('relation_status');
        $address = $this->request->getVar('address');
        $website = $this->request->getVar('website');
        $phone = $this->request->getVar('phone');
        $fax = $this->request->getVar('fax');
        $contact_person = $this->request->getVar('contact_person');
        $hp = $this->request->getVar('hp');

        $data = array(
            'partner_name' => $partner_name,
            'contract_start_date' => $contract_start_date,
            'contract_end_date' => $contract_end_date,
            'relation_status' => $relation_status,
            'address' => $address,
            'website' => $website,
            'phone' => $phone,
            'fax' => $fax,
            'contact_person' => $contact_person,
            'hp' => $hp
        );

        $this->db->transbegin();
        $this->PartnerModel->insert_partner($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function edit_partner()
    {

        $id = $this->request->getVar('id');
        $partner_name = $this->request->getVar('partner_name');
        $contract_start_date = $this->request->getVar('contract_start_date');
        $contract_end_date = $this->request->getVar('contract_end_date');
        $relation_status = $this->request->getVar('relation_status');
        $address = $this->request->getVar('address');
        $website = $this->request->getVar('website');
        $phone = $this->request->getVar('phone');
        $fax = $this->request->getVar('fax');
        $contact_person = $this->request->getVar('contact_person');
        $hp = $this->request->getVar('hp');

        $data = array(
            'partner_name' => $partner_name,
            'contract_start_date' => $contract_start_date,
            'contract_end_date' => $contract_end_date,
            'relation_status' => $relation_status,
            'address' => $address,
            'website' => $website,
            'phone' => $phone,
            'fax' => $fax,
            'contact_person' => $contact_person,
            'hp' => $hp
        );

        $this->db->transbegin();
        $this->PartnerModel->update_partner($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    public function delete_partner()
    {
        $id = $this->request->getVar('id');
        $this->db->transBegin();
        $this->PartnerModel->delete_partner($id);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function get_data_partner_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->PartnerModel->get_data_partner_by_id($id);
        return json_encode($data);
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
}
