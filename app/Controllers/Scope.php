<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\ScopeModel;
use \App\Models\BaseModel;

class Scope extends BaseController
{
    protected $ScopeModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->ScopeModel = new ScopeModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Field Code
     * Hakim
     * 2022-11-16
     */
    public function index()
    {
        $data['title'] = 'Scope';
        $data['menu'] = $this->generate_menu('/Scope/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Master/Scope/Main', $data);
    }

    public function jqgrid_scope()
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

        $result = $this->ScopeModel->jqgrid_scope('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->ScopeModel->jqgrid_scope($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['scope_id'] = $row['scope_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['scope_id'],
                $row['scope_code'],
                $row['scope_description']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_scope()
    {
        $scope_code = $this->request->getVar('scope_code');
        $scope_description = $this->request->getVar('scope_description');

        $data = array(
            'scope_code' => $scope_code,
            'scope_description' => $scope_description
        );

        $this->db->transbegin();
        $this->ScopeModel->insert_scope($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_data_scope_by_id()
    {
        $id = $this->request->getVar('scope_id');
        $data = $this->ScopeModel->get_data_scope_by_id($id);
        echo json_encode($data);
    }

    function edit_scope()
    {
        $id = $this->request->getVar('id');
        $scope_code = $this->request->getVar('scope_code');
        $scope_description = $this->request->getVar('scope_description');

        $data = array(
            'scope_code' => $scope_code,
            'scope_description' => $scope_description
        );

        $this->db->transbegin();
        $this->ScopeModel->update_scope($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_scope()
    {
        $id = $this->request->getVar('scope_id');

        $this->db->transbegin();
        $this->ScopeModel->delete_scope($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }
}
