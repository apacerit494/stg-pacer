<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\FieldCodeModel;
use \App\Models\BaseModel;

class FieldCode extends BaseController
{
    protected $FieldCodeModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->FieldCodeModel = new FieldCodeModel();
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
        $data['title'] = 'Field Code';
        $data['menu'] = $this->generate_menu('/FieldCode/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        return view('Master/Field_code/Main', $data);
    }

    public function jqgrid_field_code()
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

        $result = $this->FieldCodeModel->jqgrid_field_code('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->FieldCodeModel->jqgrid_field_code($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['fieldcode_id'] = $row['fieldcode_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['fieldcode_id'],
                $row['fieldcode_code'],
                $row['fieldcode_description']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_field_code()
    {
        $fieldcode_code = $this->request->getVar('fieldcode_code');
        $fieldcode_description = $this->request->getVar('fieldcode_description');


        $data = array(
            'fieldcode_code' => $fieldcode_code,
            'fieldcode_description' => $fieldcode_description
        );

        $this->db->transbegin();
        $this->FieldCodeModel->insert_field_code($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_data_field_code_by_id()
    {
        $id = $this->request->getVar('fieldcode_id');
        $data = $this->FieldCodeModel->get_data_field_code_by_id($id);
        echo json_encode($data);
    }

    function edit_field_code()
    {
        $id = $this->request->getVar('id');
        $fieldcode_code = $this->request->getVar('fieldcode_code');
        $fieldcode_description = $this->request->getVar('fieldcode_description');

        $data = array(
            'fieldcode_code' => $fieldcode_code,
            'fieldcode_description' => $fieldcode_description
        );

        $this->db->transbegin();
        $this->FieldCodeModel->update_field_code($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_field_code()
    {
        $id = $this->request->getVar('fieldcode_id');

        $this->db->transbegin();
        $this->FieldCodeModel->delete_field_code($id);
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
