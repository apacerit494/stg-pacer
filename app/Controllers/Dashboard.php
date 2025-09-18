<?php

namespace App\Controllers;

use \App\Models\BaseModel;

class Dashboard extends BaseController
{
    protected $BaseModel;
    protected $db;

    public function __construct()
    {
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    public function utama()
    {
        $cek = $this->BaseModel->get_user(user_id());

        //if ($cek == true) {

        /** status login dibuat true dan kemudian update session */
        $cek['is_logged_in'] = true;
        $this->session->set($cek);
        //}

        switch (user()->user_type_id) {
            case '0';
                return redirect()->to('Dashboard');
                break;
            case '1';
                return redirect()->to('Dashboard');
                break;
            case '2';
                return redirect()->to('/Assignment/index');
                break;
            case '3';
                return redirect()->to('Scoring');
                break;
            case '4';
                return redirect()->to('ScoringFinal');
                break;
            case '5';
                return redirect()->to('/Certification/time_line');
                break;
        }
    }

    public function index()
    {


        $menu = $this->generate_menu('/Dashboard/index');

        $data = [
            "title" => "Dashboard",
            "breadcrumbs" => [],
            "icon" => "bx-home-alt",
              "total_certificant" => $this->BaseModel->get_total_certificants(),
            "total_new_certification" => $this->BaseModel->get_total_new_certifications(),
            "total_extension_certification" => $this->BaseModel->get_total_extension_certifications(),
            "auditor_tidak_perpanjang" => $this->BaseModel->get_total_auditor_tidak_perpanjang(),
         
            "menu" =>  $menu,
                  "notifications" => $this->BaseModel->get_notifications((user()->user_type_id == '2' || user()->user_type_id == '1')  ? '0' : user_id())


        ];
        return view('Dashboard/Index', $data);
    }
}
