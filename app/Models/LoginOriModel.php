<?php

namespace App\Models;

use CodeIgniter\Model;

class LoginOriModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function authentication($username, $password, $salt)
    {
        $password = md5($password);
        $sql = "select * from users where email = ? and user_password = ? ";
        $query = $this->db->query($sql, array($username, $password));
        return $query->getRowarray();
    }

    public function authentication_awal()
    {
        if (!$this->validate([
            'username' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Nama user harus diisi'
                ]
            ],
            'password' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Password harus diisi'
                ]
            ]
        ])) {
            $validation = \Config\Services::validation();

            session()->setFlashdata('validation', $validation);
            session()->setFlashdata('pesan', 'Silahkan masukkan user dan password!');

            return redirect()->to('/')->withInput();
        } else {
            if ($this->request->getVar('jenis') == 1) {
                if ($this->g_db->isgetdata("kn_user", "username='" . $this->request->getVar('username') . "' AND password='" . md5($this->request->getVar('password')) . "'")) {
                    $session = session();
                    $user_id = $this->g_db->getdata("kn_user", "user_id", "username='" . $this->request->getVar('username') . "' AND password='" . md5($this->request->getVar('password')) . "'");
                    $session->set('logged', true);
                    $session->set('user_id', $user_id);
                    $session->set('user_type', 1);
                    $session->set('user_logged', $this->request->getVar('user'));

                    return redirect()->to('/home');
                } else {
                    session()->setFlashdata('pesan', 'User atau password tidak ditemukan');
                    return redirect()->to('/login/index')->withInput();
                }
            } else {
                if ($this->g_db->isgetdata("huser", "role_id=1"  . "' AND password='" . md5($this->request->getVar('password')) . "'")) {
                    $session = session();
                    $user_id = $this->g_db->getdata("huser", "username", "password='" . $this->request->getVar('username') . "' AND password='" . md5($this->request->getVar('password')) . "'");
                    $session->set('logged', true);
                    $session->set('user_id', $user_id);
                    $session->set('user_type', 0);
                    $session->set('user_logged', $this->request->getVar('username'));

                    return redirect()->to('/home' . $user_id);
                } else {
                    session()->setFlashdata('pesan', 'User atau password tidak ditemukan');
                    return redirect()->to('/')->withInput();
                }
            }
        }
    }

    public function unauthen()
    {
        $session = session();
        $session->destroy();

        return redirect()->to('/');
    }
}
