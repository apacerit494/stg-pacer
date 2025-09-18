<?php

namespace App\Controllers;

use \App\Models\BaseModel;

class Notification extends BaseController
{
    protected $BaseModel;
    protected $db;

    public function __construct()
    {
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    public function personal_invoice($id)
    {
        $this->db->query("call update_notification($id)");
        return redirect()->to('Invoice/personal_invoice');
    }

    public function ticket($id)
    {
        $this->db->query("call update_notification($id)");
        return redirect()->to('Ticket/index');
    }

    public function payment_invoice($id)
    {
        $this->db->query("call update_notification($id)");
        return redirect()->to('Invoice/index');
    }

    public function assignment($id)
    {
        $this->db->query("call update_notification($id)");
        if (user()->user_type_id == '3') {
            return redirect()->to('Scoring/index');
        } else {
            return redirect()->to('ScoringFinal/index');
        }
    }

    public function certification($id)
    {
        $this->db->query("call update_notification($id)");
        return redirect()->to('Certification/index');
    }

    public function asessment($id)
    {
        $this->db->query("call update_notification($id)");
        return redirect()->to('ScoringFinal/index');
    }

    public function get_notifications()
    {
        $user_id = user_id();
        $data = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return json_encode($data);
    }
}
