<?php

namespace App\Controllers;

use App\Models\HomeModel;
use App\Models\SlideModel;
use App\Models\NewsModel;
use \App\Models\SettingsModel;
use \App\Models\CertificationModel;
use \App\Models\FieldCodeModel;

class Home extends BaseController
{
    protected $HomeModel;
    protected $SlideModel;
    protected $NewsModel;
    protected $CertificationModel;
    protected $FieldCodeModel;
    protected $alert;
    protected $SettingsModel;
    protected $email_pacer = "sekretariat@pacer.co.id";
    
    public function __construct()
    {
        $this->HomeModel = new HomeModel();
        $this->SlideModel = new SlideModel();
        $this->NewsModel = new NewsModel();
        $this->CertificationModel = new CertificationModel();
        $this->FieldCodeModel = new FieldCodeModel();
        $this->SettingsModel = new SettingsModel();
    }

    public function index()
    {

        $data["slides"] = $this->SlideModel->slide_list();
        $data["newses"] = $this->NewsModel->news_list();
        $data['about'] = $this->SettingsModel->get_about();

        return view('Home/index', $data);
    }
    
    public function news($id)
    {
        $data['news'] = $this->NewsModel->get_data_news_by_id($id);
        return view('Home/news', $data);
    }
    
    public function send_message()
    {
        // $email = \Config\Services::email();
        // $email->clear(true);
        // $email->setTo($this->email_pacer, 'LSP PACER');
        // $email->setFrom($this->request->getVar('email'),$this->request->getVar('name'));
        // $email->setSubject($this->request->getVar('subject'));
        // $email->setMessage($this->request->getVar('message'));
        // $email->send();
    
        $email = \Config\Services::email();
        $email->clear(true);
        $email->setTo($this->email_pacer, 'LSP PACER');
        $email->setFrom($this->request->getVar('email'), $this->request->getVar('name'));
        $email->setSubject($this->request->getVar('subject'));
        $email->setMessage($this->request->getVar('message'));
        
        if ($email->send()) {
            $return="OK";
            
        } else {
            $return="Email gagal dikirim";
        }
        return $return;
        
    }
    
    public function directory()
    {
        $auditors = $this->CertificationModel->get_certification_assesmented();
        $data['auditors'] = [];
        foreach($auditors as $auditor){
            $fieldcodes = $this->CertificationModel->get_certification_fieldcode2($auditor['certification_id']);
            $fc = '';
            foreach($fieldcodes as $fieldcode){
                $field = $this->FieldCodeModel->get_data_field_code_by_id2($fieldcode);
                foreach($field as $v => $i){
                  $fc = $fc. (($fc!=='')?', ':'') .'<abbr title="'.$field['fieldcode_description'].'">'.$field['fieldcode_code'].'</abbr>';
                  break;
                }
            }
            $a = [
            'full_name' => $auditor['full_name'],
            'certification_id' => $auditor['certification_id'],
            'certification_number' => $auditor['certification_number'],
            'scope_code' => '<abbr title="'.$auditor['scope_description'].'">'.$auditor['scope_code'].'</abbr>',
            'scope_description' => $auditor['scope_description'],
            'level_auditor' => $auditor['level_auditor'],
            'start_date' => $auditor['start_date'],
            'end_date' => $auditor['end_date'],
            'field_code' =>$fc
            ];
            
            array_push($data['auditors'],$a);
            $data['fieldcode'][$auditor['certification_id']] = $fc;
        }
        
        $auditors2 = $this->CertificationModel->get_certification_assesmented2();
        $data['auditors2'] = [];
        foreach($auditors2 as $auditor){
            $fieldcodes = $this->CertificationModel->get_certification_fieldcode2($auditor['certification_id']);
            $fc = '';
            foreach($fieldcodes as $fieldcode){
                $field = $this->FieldCodeModel->get_data_field_code_by_id2($fieldcode);
                foreach($field as $v => $i){
                  $fc = $fc. (($fc!=='')?', ':'') .'<abbr title="'.$field['fieldcode_description'].'">'.$field['fieldcode_code'].'</abbr>';
                  break;
                }
            }
            $a = [
            'full_name' => $auditor['full_name'],
            'certification_id' => $auditor['certification_id'],
            'certification_number' => $auditor['certification_number'],
            'scope_code' => '<abbr title="'.$auditor['scope_description'].'">'.$auditor['scope_code'].'</abbr>',
            'scope_description' => $auditor['scope_description'],
            'level_auditor' => $auditor['level_auditor'],
            'start_date' => $auditor['start_date'],
            'end_date' => $auditor['end_date'],
            'field_code' =>$fc
            ];
            
            array_push($data['auditors2'],$a);
            $data['fieldcode'][$auditor['certification_id']] = $fc;
        }
        
        $auditors3 = $this->CertificationModel->get_certification_assesmented3();
        $data['auditors3'] = [];
        foreach($auditors3 as $auditor){
            $fieldcodes = $this->CertificationModel->get_certification_fieldcode2($auditor['certification_id']);
            $fc = '';
            foreach($fieldcodes as $fieldcode){
                $field = $this->FieldCodeModel->get_data_field_code_by_id2($fieldcode);
                foreach($field as $v => $i){
                  $fc = $fc. (($fc!=='')?', ':'') .'<abbr title="'.$field['fieldcode_description'].'">'.$field['fieldcode_code'].'</abbr>';
                  break;
                }
            }
            $a = [
            'full_name' => $auditor['full_name'],
            'certification_id' => $auditor['certification_id'],
            'certification_number' => $auditor['certification_number'],
            'scope_code' => '<abbr title="'.$auditor['scope_description'].'">'.$auditor['scope_code'].'</abbr>',
            'scope_description' => $auditor['scope_description'],
            'level_auditor' => $auditor['level_auditor'],
            'start_date' => $auditor['start_date'],
            'end_date' => $auditor['end_date'],
            'field_code' =>$fc
            ];
            
            array_push($data['auditors3'],$a);
            $data['fieldcode'][$auditor['certification_id']] = $fc;
        }
        
        return view('Home/directory', $data);
    }

    public function register()
    {
        if (!$this->validate([
            'gnama' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Nama Lengkap wajib diisi'
                ]
            ],
            'gnotelp' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Nomor telpon wajib diisi'
                ]
            ],
            'gnoktp' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Nomor KTP wajib diisi'
                ]
            ],
            'guser' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'User wajib diisi'
                ]
            ],
            'gpassword' => [
                'rules' => 'required',
                'errors' => [
                    'required' => 'Password wajib diisi'
                ]
            ]
        ])) {
            $validation = \Config\Services::validation();

            session()->setFlashdata('validation', $validation);
            session()->setFlashdata('pesan', 'Data gagal disimpan. Silahkan isi data dengan lengkap!');
            $this->alert = 'danger';

            return redirect()->to('/')->withInput()->with('alert', $this->alert);
        } else {
            if ($this->request->getVar('gpassword') == $this->request->getVar('gkpassword')) {
                if (!$this->db->isgetdata("pelamar", "user_login='" . $this->request->getVar('guser') . "'")) {
                    $data = [
                        "no_daftar" => $this->request->getVar('gnodaftar'),
                        "nm_pelamar" => $this->request->getVar('gnama'),
                        "alamat" => $this->request->getVar('galamat'),
                        "no_telp" => $this->request->getVar('gnotelp'),
                        "no_ktp" => $this->request->getVar('gnoktp'),
                        "email" => $this->request->getVar('gemail'),
                        "jenis_kelamin" => $this->request->getVar('gjeniskelamin'),
                        "status_kawin" => $this->request->getVar('gstatuskawin'),
                        "pendidikan" => $this->request->getVar('gpendidikan'),
                        "jurusan" => $this->request->getVar('gjurusan'),
                        "universitas" => $this->request->getVar('guniversitas'),
                        "pengalaman" => $this->request->getVar('gpengalaman'),
                        "posisi_id" => $this->request->getVar('gposisi'),
                        "tmp_lahir" => $this->request->getVar('gtmplahir'),
                        "tgl_lahir" => ($this->request->getVar('gtgllahir') != '') ? date('Y/m/d', strtotime($this->request->getVar('gtgllahir'))) : 'NULL',
                        "user_login" => $this->request->getVar('guser'),
                        "password" => md5($this->request->getVar('gpassword')),
                        "tgl_buat" => date('Y/m/d H:i:s'),
                        "tgl_koreksi" => date('Y/m/d H:i:s'),
                    ];

                    session()->setFlashdata('pesan', 'Data berhasil disimpan');
                    $this->alert = 'success';

                    $id = $this->HomeModel->insertRegistrasi($data);
                    $this->HomeModel->updateNoRegistrasi('no_daftar', array('nilai' => $this->HomeModel->getNoRegistrasi('no_daftar')));
                    return redirect()->to("/")->with('alert', $this->alert);
                } else {
                    session()->setFlashdata('pesan', 'Data gagal disimpan. Nama user sudah digunakan.');
                    $this->alert = 'danger';
                    return redirect()->to("/")->withInput()->with('alert', $this->alert);
                }
            } else {
                session()->setFlashdata('pesan', 'Data gagal disimpan. Password dan Konfirm Password tidak sama.');
                $this->alert = 'danger';
                return redirect()->to("/")->withInput()->with('alert', $this->alert);
            }
        }
    }
}
