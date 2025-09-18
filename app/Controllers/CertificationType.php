<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\CertificationTypeModel;
use \App\Models\BaseModel;

class CertificationType extends BaseController
{
    protected $CertificationTypeModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->CertificationTypeModel = new CertificationTypeModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Certification Type
     * Hakim
     * 2022-11-16
     */
    public function index()
    {

        $data['title'] = 'Certification Type';
        $data['menu'] = $this->generate_menu('/CertificationType/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        return view('Master/Certification_type/Main', $data);
    }

    public function jqgrid_certification_type()
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

        $result = $this->CertificationTypeModel->jqgrid_certification_type('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->CertificationTypeModel->jqgrid_certification_type($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['certification_type_id'] = $row['certification_type_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['certification_type_id'],
                $row['description'],
                $row['cost']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_certification_type()
    {
        $description = $this->request->getVar('description');
        $cost = $this->request->getVar('cost');


        $data = array(
            'description' => $description,
            'cost' => $cost
        );

        $this->db->transbegin();
        $this->CertificationTypeModel->insert_certification_type($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_data_certification_type_by_id()
    {
        $id = $this->request->getVar('certification_type_id');
        $data = $this->CertificationTypeModel->get_data_certification_type_by_id($id);
        echo json_encode($data);
    }

    function edit_certification_type()
    {
        $id = $this->request->getVar('id');
        $description = $this->request->getVar('description');
        $cost = $this->request->getVar('cost');


        $data = array(
            'description' => $description,
            'cost' => $cost
        );

        $this->db->transbegin();
        $this->CertificationTypeModel->update_certification_type($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_certification_type()
    {
        $id = $this->request->getVar('certification_type_id');

        $this->db->transbegin();
        $this->CertificationTypeModel->delete_certification_type($id);
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
