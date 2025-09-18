<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\TicketModel;
use \App\Models\BaseModel;

class Ticket extends BaseController
{
    protected $TicketModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->TicketModel = new TicketModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Ticket
     * Hakim
     * 2023-01-12
     */

    public function index()
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());

        $data['title'] = 'Ticket';
        $data['priorities'] = $this->TicketModel->get_priorities();
        $data['statuss'] = $this->TicketModel->get_statuss();
        $data['users'] = $this->TicketModel->get_users();
        $data['menu'] = $this->generate_menu('/Ticket/index');
        return view('Ticket/Main', $data);
    }



    public function jqgrid_ticket()
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

        $result = $this->TicketModel->jqgrid_ticket('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->TicketModel->jqgrid_ticket($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['ticket_id'] = $row['ticket_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['ticket_id'],
                $row['ticket_num'],
                $row['full_name'],
                $row['ticket_subject'],
                $row['ticket_date'],
                $row['description'],
                $row['priority'],
                $row['priority_desc'],
                $row['user_id'],
                $row['status'],
                $row['status_desc'],
                $row['attachment'],
                $row['ticket_closeddate'],
                $row['created_at'],
                $row['updated_at']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_ticket()
    {
        $ticket_id = $this->get_uuid();
        $date = ('YmdHis');
        $ticket_num = date('YmdHis');
        $ticket_subject = $this->request->getVar('ticket_subject');
        $ticket_date = date('Y-m-d');
        $description = $this->request->getVar('description');
        $priority = $this->request->getVar('priority');
        if (user()->user_type_id == '5' || user()->user_type_id == '4' || user()->user_type_id == '3') {
            $user_id = user_id();
        } else {
            $user_id = $this->request->getVar('user_id');
        }
        // $user_id = (user()->user_type_id == '5') ? user_id() : $this->request->getVar('user_id');
        $status = $this->request->getVar('status');
        //$attachment = $this->request->getVar('attachment');
        $created_at = date('Y-m-d H:i:s');

        try {

            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Ticket/Doc_path/' . $user_id;
            $folderName = $folder . '/' . $date . ' ' . basename($_FILES['attachment']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['attachment']['tmp_name'], $folderName);
            $attachment = '/assets/Ticket/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['attachment']['name']);
            $data = array(
                'ticket_id' => $ticket_id,
                'ticket_num' => $ticket_num,
                'ticket_subject' => $ticket_subject,
                'ticket_date' => $ticket_date,
                'description' => $description,
                'priority' => $priority,
                'user_id' => $user_id,
                'status' => $status,
                'attachment' => $attachment,
                'created_at' => $created_at
            );
        } catch (\Exception $e) {
            $data = array(
                'ticket_id' => $ticket_id,
                'ticket_num' => $ticket_num,
                'ticket_subject' => $ticket_subject,
                'ticket_date' => $ticket_date,
                'description' => $description,
                'priority' => $priority,
                'user_id' => $user_id,
                'status' => $status,
                'created_at' => $created_at
            );
        }

        $this->db->transbegin();
        $this->TicketModel->insert_ticket($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $this->db->query("call insert_notification(?,?,?)", array(0, 'New Ticket', 'ticket'));
            $this->run_pusher();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_data_ticket_by_id()
    {
        $id = $this->request->getVar('ticket_id');
        $data = $this->TicketModel->get_data_ticket_by_id($id);
        echo json_encode($data);
    }

    function edit_ticket()
    {
        $id = $this->request->getVar('id');
        $date = date('YmdHis');
        $ticket_num = $this->request->getVar('ticket_num');
        $ticket_subject = $this->request->getVar('ticket_subject');
        $ticket_date = date('Y-m-d');
        $description = $this->request->getVar('description');
        $priority = $this->request->getVar('priority');
        //$user_id = $this->request->getVar('user_id2');

        if (user()->user_type_id == '5' || user()->user_type_id == '4' || user()->user_type_id == '3') {
            $user_id = user_id();
        } else {
            $user_id = $this->request->getVar('user_id2');
        }
        //$user_id = (user()->user_type_id == '5') ? user_id() : $this->request->getVar('user_id2');
        $status = $this->request->getVar('status');
        //   $attachment = $this->request->getVar('attachment');
        $ticket_closeddate =   ($status == '3') ? date('Y-m-d') : $this->request->getVar('ticket_closeddate');
        $updated_at = date('Y-m-d H:i:s');
        try {

            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Ticket/Doc_path/' . $user_id;
            $folderName = $folder . '/' . $date . ' ' . basename($_FILES['attachment']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['attachment']['tmp_name'], $folderName);
            $attachment = '/assets/Ticket/Doc_path/' . $user_id . '/' . $date . ' ' . basename($_FILES['attachment']['name']);
            $data = array(
                'ticket_num' => $ticket_num,
                'ticket_subject' => $ticket_subject,
                //'ticket_date' => $ticket_date,
                'description' => $description,
                'priority' => $priority,
                'user_id' => $user_id,
                'status' => $status,
                'attachment' => $attachment,
                'ticket_closeddate' => $ticket_closeddate,
                'updated_at' => $updated_at
            );
        } catch (\Exception $e) {
            $data = array(
                'ticket_num' => $ticket_num,
                'ticket_subject' => $ticket_subject,
                // 'ticket_date' => $ticket_date,
                'description' => $description,
                'priority' => $priority,
                'user_id' => $user_id,
                'status' => $status,
                'ticket_closeddate' => $ticket_closeddate,
                'updated_at' => $updated_at
            );
        }


        $this->db->transbegin();
        $this->TicketModel->update_ticket($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_ticket()
    {
        $id = $this->request->getVar('ticket_id');

        $this->db->transbegin();
        $this->TicketModel->delete_ticket($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    public function add_comment()
    {
        $ticket_id = $this->request->getVar('ticket_id');
        $comment = $this->request->getVar('comment');
        if ($comment <> "") {

            $ticket = $this->TicketModel->check_status($ticket_id);
            if ($ticket->status == '3') {
                $return = array('success' => false, 'error' => 'Masalah anda sudah terselesaikan, silahkan buat ticket baru jika ada kendala');
            } else {
                $user_id = user_id();
                $comment_date = date('Y-m-d H:i:s');
                $comment = $this->request->getVar('comment');

                $data = array(
                    'ticket_id' => $ticket_id,
                    'user_id' => $user_id,
                    'comment_date' => $comment_date,
                    'comment' => $comment
                );
                $this->db->transBegin();
                $this->TicketModel->insert_comment($data);
                if ($this->db->transStatus() == true) {
                    $this->db->transCommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transRollback();
                    $return = array('success' => false);
                }

                if (user()->user_type_id == '1' || user()->user_type_id == '2') {
                    // $email = \Config\Services::email();
                    // $email->setTo($ticket->email);
                    // $email->setFrom($this->notif_email, 'LSP PACER');
                    // $email->setSubject('Ticket ' . $ticket->ticket_num);
                    // $email->setMessage($comment);
                    //$email->send();
                    $this->db->query("call insert_notification(?,?,?)", array($ticket->user_id, 'New comment', 'ticket'));
                } else {
                    $this->db->query("call insert_notification(?,?,?)", array(0, 'New comment', 'ticket'));
                }
                $this->run_pusher();
                $this->run_pusher_comment($comment);
            }
        } else {
            $return = array('success' => false, 'error' => 'Isi dulu commentnya');
        }



        return json_encode($return);
    }



    public function get_data_comment_by_id()
    {
        $id = $this->request->getVar('ticket_id');
        $data = $this->TicketModel->get_data_comment_by_id($id);
        return json_encode($data);
    }
    /** end of Ticket */

    /**
     * Pengajuan Ticket
     * Hakim Desyanto
     * 2023-01-12
     */

    public function pengajuan_ticket()
    {
        $data['title'] = 'Ticket';
        $data['priorities'] = $this->TicketModel->get_priorities();
        $data['statuss'] = $this->TicketModel->get_statuss();
        //$data['users'] = $this->TicketModel->get_users();
        $tickets = $this->TicketModel->get_tickets();
        $data['tickets'] = $tickets;
        if (count($tickets) > 0) {
            $ticket_id = $tickets[0]['ticket_id'];
            $data['comments'] = $this->TicketModel->get_coments($ticket_id);
        }
        $data['menu'] = $this->generate_menu('/Ticket/index');
        return view('Pengajuan_ticket/Main', $data);
    }

    function add_pengajuan_ticket()
    {
        $id = $this->request->getVar('id');
        $date = date('YmdHis');
        $ticket_id = $id == "" ? $this->get_uuid() : $id;
        $ticket_number = $id == "" ? date('YmdHis') : $this->request->getVar('ticket_num');
        $ticket_subject = $this->request->getVar('ticket_subject');
        $ticket_date = date('Y-m-d');
        $description = $this->request->getVar('description');
        $priority = $this->request->getVar('priority');
        $user_id = user_id();
        $created_at = date('Y-m-d H:i:s');

        $status = '1';
        // $attachment = $this->request->getVar('attachment');
        try {

            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/Ticket/Doc_path/' . $id;
            $folderName = $folder . '/' . $date . ' ' . basename($_FILES['attachment']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['attachment']['tmp_name'], $folderName);
            $attachment = '/assets/Ticket/Doc_path/' . $id . '/' . $date . ' ' . basename($_FILES['attachment']['name']);
            $data = array(
                'ticket_id' => $ticket_id,
                'ticket_num' => $ticket_number,
                'ticket_subject' => $ticket_subject,
                'ticket_date' => $ticket_date,
                'description' => $description,
                'priority' => $priority,
                'user_id' => $user_id,
                'status' => $status,
                'attachment' => $attachment,
                $id == "" ? 'created_at' : 'updated_at' => $created_at
            );
        } catch (\Exception $e) {

            $data = array(
                'ticket_id' => $ticket_id,
                'ticket_num' => $ticket_number,
                'ticket_subject' => $ticket_subject,
                'ticket_date' => $ticket_date,
                'description' => $description,
                'priority' => $priority,
                'user_id' => $user_id,
                'status' => $status,
                $id == "" ? 'created_at' : 'updated_at' => $created_at
            );
        }

        $this->db->transbegin();
        ($id == "") ? $this->TicketModel->insert_ticket($data) : $this->TicketModel->update_ticket($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true, 'ticket_number' => $ticket_number);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }
}
