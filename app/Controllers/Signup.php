<?php

namespace App\Controllers;

use App\Models\SignupModel;
use App\Models\CertificationModel;
use App\Models\BaseModel;

class Signup extends BaseController
{
    protected $SignupModel;
    protected $CertificationModel;
    protected $BaseModel;
    protected $db;

    public function __construct()
    {
        $this->SignupModel = new SignupModel();
        $this->CertificationModel = new CertificationModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    public function index()
    {


        // $data["breadcrumbs"] = ['Register'];
        // $data["icon"] = "bx-user-circle";
        // $data["no"]     = 0;
        // return view('Signup', $data);

        if (session()->getFlashdata('validation')) {
            $validation = session()->getFlashdata('validation');
        } else {
            $validation = \Config\Services::validation();
        }

        $data = [
            "title" => "Sign Up",
            "breadcrumbs" => ['Sign Up'],
            "icon" => "bx-user-circle",
            "no" => 0,
            "pesan" => session()->getFlashdata('pesan'),
            "success" => session()->getFlashdata('success'),
            "validation" => $validation
        ];
        return view('Signup', $data);
    }

    public function add_signup()
    {
        if (!$this->validasi_data()) {
            $validation = \Config\Services::validation();

            session()->setFlashdata('validation', $validation);
            session()->setFlashdata('pesan', 'Data gagal disimpan. Silahkan isi data dengan lengkap!');

            return redirect()->to('/Signup')->withInput();
        } else {
            if ($this->request->getVar('user_password') != $this->request->getVar('confirm_password')) {
                session()->setFlashdata('pesan', 'Data gagal disimpan. Password dan Konfirm Password tidak sama');

                return redirect()->to('/Signup')->withInput();
            } else {
                $check_email = $this->SignupModel->check_email($this->request->getVar('email'));
                if ($check_email > 0) {
                    session()->setFlashdata('pesan', 'Data gagal disimpan. Email sudah terdaftar');

                    return redirect()->to('/Signup')->withInput();
                } else {

                    $user_id = $this->get_uuid();

                    $data = array(
                        "user_id" => $user_id,
                        "full_name" => $this->request->getVar('full_name'),
                        "email" => $this->request->getVar('email'),
                        "user_type_id" => '5',
                        "user_password" => md5($this->request->getVar('user_password')),
                        "createdAt" => date('Y-m-d H:i:s')
                    );
                    $this->db->transStatus();
                    $this->SignupModel->insert_signup($data);
                    if ($this->db->transStatus() == true) {
                        $this->db->transCommit();
                    } else {
                        $this->db->transRollback();
                    }

                    session()->setFlashdata('success', true);
                    session()->setFlashdata('pesan', 'Data berhasil disimpan');

                    return redirect()->to("/Login/index");
                }
            }
        }
    }

    public function validasi_data()
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
