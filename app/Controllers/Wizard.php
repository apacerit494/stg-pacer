<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\AssignmentModel;
use \App\Models\BaseModel;

class Assignment extends BaseController
{
    protected $AssignmentModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->AssignmentModel = new AssignmentModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Assignment
     * Hakim
     * 2022-11-19
     */
    public function index()
    {
        $data['title'] = 'Assignment';
        $data['menu'] = $this->generate_menu('/Assignment/index');
        $data['committees'] = $this->BaseModel->get_committees();
        $data['committee_certifications'] = $this->BaseModel->get_committee_certifications();

        return view('Assignment/Main', $data);
    }

    public function jqgrid_assignment()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'gl_account_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $status = isset($_REQUEST['status']) ? $_REQUEST['status'] : '';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->AssignmentModel->jqgrid_assignment($status, $tipe_keyword, $keyword, '', '', '', '',);

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

        $result = $this->AssignmentModel->jqgrid_assignment($status, $tipe_keyword, $keyword, $sidx, $sord, $limit_rows, $start,);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['certification_id'] = $row['certification_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['certification_id'],
                $row['certification_number'],
                $row['apply_date'],
                $row['full_name'],
                // $row['description'],
                //$row['cost'],
                $row['level_auditor'],
                $row['createdAt'],
                $row['updatedAt']
                //$row['level'],
                //$row['university'],
                //$row['major'],
                //$row['start_date_education'],
                //$row['end_date_education'],
                //$row['certificate_number'],
                //$row['accreditation_status'],
                //$row['doc_path_education'],
                //$row['company_name'],
                //$row['departement_id'],
                // $row['position'],
                // $row['start_date_experience'],
                // $row['end_date_experience'],
                // $row['doc_path_experience'],
                // $row['company_addres'],
                // $row['company_phone'],
                // $row['contact_person'],
                // $row['start_date_audit_experience'],
                // $row['end_date_audit_experience'],
                // $row['doc_audit_plan_path'],
                // $row['doc_work_order_path'],
                // $row['provider_name'],
                // $row['start_date_training'],
                // $row['end_date_training'],
                // $row['training_topic'],
                // $row['relation_status'],
                // $row['doc_path_training']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    public function proses_assignment()
    {
        $user_id = user_id();
        $status1 = $this->request->getVar('status1');
        $committee1 = $this->request->getVar('committee1');
        $committee2 = $this->request->getVar('committee2');
        $committee3 = $this->request->getVar('committee3');
        $start_date = $this->request->getVar('start_date');
        $end_date = $this->request->getVar('end_date');
        $note = $this->request->getVar('note');
        $createdAt = date('Y-m-d H:i:s');

        $certification_id = $this->request->getVar('certification_id');

        $data1 = array();
        $data2 = array();
        $data3 = array();
        $assignment_id = $this->get_uuid();

        /** $status1==add */
        if ($status1 == '1') {
            for ($i = 0; $i < count($certification_id); $i++) {

                /** insert to table assignment */
                $assignment_id = $this->get_uuid();

                $data1[] = array(
                    'assignment_id' => $assignment_id,
                    'certification_id' => $certification_id[$i],
                    'from_id' => $user_id,
                    'assignment_date' => $start_date,
                    'fisnish_date' => $end_date,
                    'note' => $note,
                    'createdAt' => $createdAt
                );

                /** insert to table assignmentd_to */
                $data2[] = array(
                    'assignment_id' => $assignment_id,
                    'committee_id' => $committee1,
                );

                $data2[] = array(
                    'assignment_id' => $assignment_id,
                    'committee_id' => $committee2,
                );

                $data2[] = array(
                    'assignment_id' => $assignment_id,
                    'committee_id' => $committee3,
                );

                /** insert to table assignmentd_score by trigger */

                // $data3[] = array(
                //     'assignment_id' => $assignment_id,
                //     'committee_id' => $committee1,
                // );

                // $data3[] = array(
                //     'assignment_id' => $assignment_id,
                //     'committee_id' => $committee2,
                // );

                // $data3[] = array(
                //     'assignment_id' => $assignment_id,
                //     'committee_id' => $committee3,
                // );

                /** update certification_status */
                $data4 = array(
                    'status' => '1'
                );

                $this->db->transBegin();
                $this->AssignmentModel->update_certification_status($data4, $certification_id[$i]);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transRollback();
                    $return = array('success' => false);
                }
            }

            $this->db->transBegin();
            $this->AssignmentModel->insert_assignment($data1);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            $this->db->transBegin();
            $this->AssignmentModel->insert_assignmentd_to($data2);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            // $this->db->transBegin();
            // $this->AssignmentModel->insert_assignmentd_score($data3);
            // if ($this->db->transStatus() == true) {
            //     $this->db->transCommit();
            //     $return = array('success' => true);
            // } else {
            //     $this->db->transRollback();
            //     $return = array('success' => false);
            // }
        } else {

            /** delete dulu data di assignment */
            for ($i = 0; $i < count($certification_id); $i++) {
                $this->db->transBegin();
                $this->AssignmentModel->delete_assignment($certification_id[$i]);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transRollback();
                    $return = array('success' => false);
                }

                $data4 = array(
                    'status' => '0'
                );
                $this->db->transBegin();
                $this->AssignmentModel->update_certification_status($data4, $certification_id[$i]);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transRollback();
                    $return = array('success' => false);
                }
            }

            for ($i = 0; $i < count($certification_id); $i++) {

                $assignment_id = $this->get_uuid();

                /** insert to table assignment */
                $data1[] = array(
                    'assignment_id' => $assignment_id,
                    'certification_id' => $certification_id[$i],
                    'from_id' => $user_id,
                    'assignment_date' => $start_date,
                    'fisnish_date' => $end_date,
                    'note' => $note,
                    'createdAt' => $createdAt
                );


                /** insert to table assignmentd_to */
                $data2[] = array(
                    'assignment_id' => $assignment_id,
                    'committee_id' => $committee1,
                );

                $data2[] = array(
                    'assignment_id' => $assignment_id,
                    'committee_id' => $committee2,
                );

                $data2[] = array(
                    'assignment_id' => $assignment_id,
                    'committee_id' => $committee3,
                );

                /** insert to table assignmentd_score */
                // $data3[] = array(
                //     'assignment_id' => $assignment_id,
                //     'committee_id' => $committee1,
                // );

                // $data3[] = array(
                //     'assignment_id' => $assignment_id,
                //     'committee_id' => $committee2,
                // );

                // $data3[] = array(
                //     'assignment_id' => $assignment_id,
                //     'committee_id' => $committee3,
                // );
            }

            $this->db->transBegin();
            $this->AssignmentModel->insert_assignment($data1);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            $this->db->transBegin();
            $this->AssignmentModel->insert_assignmentd_to($data2);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            // $this->db->transBegin();
            // $this->AssignmentModel->insert_assignmentd_score($data3);
            // if ($this->db->transStatus() == true) {
            //     $this->db->transCommit();
            //     $return = array('success' => true);
            // } else {
            //     $this->db->transRollback();
            //     $return = array('success' => false);
            // }
        }


        return json_encode($return);
    }

    public function delete_assignment()
    {
        $certification_id = $this->request->getVar('certification_id');
        for ($i = 0; $i < count($certification_id); $i++) {
            $this->db->transBegin();
            $this->AssignmentModel->delete_assignment($certification_id[$i]);
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
}
