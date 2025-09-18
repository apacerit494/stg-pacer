<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use App\Models\LoginOriModel;
use App\Models\BaseModel;

class LoginOri extends BaseController
{
    protected $LoginModel;
    protected $BaseModel;
    protected $salt_key = 'Peh@HaY74turn#elL';
    protected $db;
    public function __construct()
    {
        $this->LoginModel = new LoginOriModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    public function index()
    {
        if (session()->getFlashdata('validation')) {
            $validation = session()->getFlashdata('validation');
        } else {
            $validation = \Config\Services::validation();
        }

        $data = [
            "title" => "Login",
            "pesan" => session()->getFlashdata('pesan'),
            "success" => session()->getFlashdata('success'),
            "validation" => $validation
        ];
        return view('Login', $data);
    }

    public function authentication()
    {
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');
        $last_visited_stamp = date("Y-m-d H:i:s");

        $cek = $this->LoginModel->authentication($username, $password, $this->_salt);

        if ($cek == true) {

            /** status login dibuat true dan kemudian update session */
            $cek['is_logged_in'] = true;
            $this->session->set($cek);
            if ($cek['profile_picture'] == "0") {
                $this->session->set('profile_picture',  "kosong");
            }
            switch (session('user_type_id')) {
                case '1';
                    $this->generate_menu('/Dashboard/index');
                    return redirect()->to('Dashboard');
                    break;
                case '2';
                    $this->generate_menu('/Assignment/index');
                    return redirect()->to('/Assignment/index');
                    break;
                case '3';
                    $this->generate_menu('/Scoring/index');
                    return redirect()->to('Scoring');
                    break;
                case '4';
                    $this->generate_menu('/ScoringFinal/index');
                    return redirect()->to('ScoringFinal');
                    break;
                case '5';
                    $this->generate_menu('/Certification/time_line');
                    return redirect()->to('/Certification/time_line');
                    break;
            }
        } else {
            session()->setFlashdata('pesan', 'User atau password tidak ditemukan');
            return redirect()->to('/Login/index')->withInput();
        }
    }

    public function log_out()
    {
        $session = session();
        $session->destroy();

        return redirect()->to('/');
    }
}
