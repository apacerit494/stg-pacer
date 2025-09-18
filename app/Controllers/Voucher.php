<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\VoucherModel;
use \App\Models\RegisterModel;
use \App\Models\BaseModel;

use Config\Services;
use Myth\Auth\Models\UserModel;
use Myth\Auth\Entities\User;

class Voucher extends BaseController
{
    protected $VoucherModel;
    protected $RegisterModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->VoucherModel = new VoucherModel();
        $this->RegisterModel = new RegisterModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Voucher Discount
     * Hakim Desyanto
     * 2023-03-17
     */
    public function index()
    {
        $data['title'] = 'Voucher Discount';
        $data['menu'] = $this->generate_menu('/Voucher/index');
        $data['partners'] = $this->VoucherModel->get_partners();
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Voucher/Main', $data);
    }

    public function jqgrid_voucher()
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

        $result = $this->VoucherModel->jqgrid_voucher('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->VoucherModel->jqgrid_voucher($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['voucher_id'] = $row['voucher_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['voucher_id'],
                $row['voucher_code'],
                $row['voucher_date'],
                $row['start_date'],
                $row['expired_date'],
                // $row['active_status'] == '1' ? 'Active' : 'Non Active',
                //   $row['voucher_type'],
                $row['partner_name'],
                $row['unlimited'] == '1' ? 'Yes' : 'No',
                $row['qouta'],
                $row['ordered'],
                $row['discount']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_voucher()
    {

        $voucher_code = $this->request->getVar('voucher_code');
        $voucher_date = date('Y-m-d');
        $partner_id = $this->request->getVar('partner_id');
        $discount = $this->request->getVar('discount');
        $unlimited = isset($_REQUEST['unlimited']) ? '1' : '0';
        $start_date = ($unlimited == '0') ?  $this->request->getVar('start_date') : "";
        $expired_date = ($unlimited == '0') ?  $this->request->getVar('expired_date') : "";
        $qouta = ($unlimited == '0') ?  $this->request->getVar('qouta') : 0;

        $data = array(
            'voucher_code' => $voucher_code,
            'voucher_date' => $voucher_date,
            'start_date' => $start_date,
            'expired_date' => $expired_date,
            'partner_id' => $partner_id,
            'unlimited' => $unlimited,
            'qouta' => $qouta,
            'discount' => $discount
        );

        $this->db->transbegin();
        $this->VoucherModel->insert_voucher($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function edit_voucher()
    {

        $id = $this->request->getVar('id');
        $voucher_code = $this->request->getVar('voucher_code');
        $voucher_date = date('Y-m-d');
        $partner_id = $this->request->getVar('partner_id');
        $discount = $this->request->getVar('discount');
        $unlimited = isset($_REQUEST['unlimited1']) ? '1' : '0';
        $start_date = ($unlimited == '0') ?  $this->request->getVar('start_date') : "";
        $expired_date = ($unlimited == '0') ?  $this->request->getVar('expired_date') : "";
        $qouta = ($unlimited == '0') ?  $this->request->getVar('qouta') : 0;

        $data = array(
            'voucher_code' => $voucher_code,
            'voucher_date' => $voucher_date,
            'start_date' => $start_date,
            'expired_date' => $expired_date,
            'partner_id' => $partner_id,
            'unlimited' => $unlimited,
            'qouta' => $qouta,
            'discount' => $discount
        );

        $this->db->transbegin();
        $this->VoucherModel->update_voucher($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    public function delete_voucher()
    {
        $id = $this->request->getVar('voucher_id');
        $this->db->transBegin();
        $this->VoucherModel->delete_voucher($id);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function get_data_voucher_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->VoucherModel->get_data_voucher_by_id($id);
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
