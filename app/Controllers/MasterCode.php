<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\MasterCodeModel;
use \App\Models\BaseModel;

class MasterCode extends BaseController
{
    protected $MasterCodeModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->MasterCodeModel = new MasterCodeModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Setting | Master Code 
     * Hakim
     * 2022-11-25
     */
    public function index()
    {
        $data['title'] = 'Master Code';
        $data['menu'] = $this->generate_menu('/MasterCode/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Settings/Master_code/Main', $data);
    }

    public function jqgrid_master_code()
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

        $result = $this->MasterCodeModel->jqgrid_master_code('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->MasterCodeModel->jqgrid_master_code($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['code_type'],
                $row['code_type_detail'],
                $row['code_value'],
                $row['code_description']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_master_code()
    {
        $id = $this->get_uuid();
        $code_type = $this->request->getVar('code_type');
        $code_type_detail = $this->request->getVar('code_type_detail');
        $code_value = $this->request->getVar('code_value');
        $code_description = $this->request->getVar('code_description');

        $data = array(
            'id' => $id,
            'code_type' => $code_type,
            'code_type_detail' => $code_type_detail,
            'code_value' => $code_value,
            'code_description' => $code_description
        );

        $this->db->transbegin();
        $this->MasterCodeModel->insert_master_code($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_data_master_code_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->MasterCodeModel->get_data_master_code_by_id($id);
        echo json_encode($data);
    }

    function edit_master_code()
    {
        $id = $this->request->getVar('id');
        $code_type = $this->request->getVar('code_type');
        $code_type_detail = $this->request->getVar('code_type_detail');
        $code_value = $this->request->getVar('code_value');
        $code_description = $this->request->getVar('code_description');

        $data = array(
            'code_type' => $code_type,
            'code_type_detail' => $code_type_detail,
            'code_value' => $code_value,
            'code_description' => $code_description
        );

        $this->db->transbegin();
        $this->MasterCodeModel->update_master_code($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_master_code()
    {
        $id = $this->request->getVar('id');

        $this->db->transbegin();
        $this->MasterCodeModel->delete_master_code($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    public function get_select_master_code()
    {
        $code_type = $this->request->getVar('code_type');
        $data = $this->BaseModel->get_select_master_code($code_type);
        return json_encode($data);
    }
}
