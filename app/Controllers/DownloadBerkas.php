<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\DownloadBerkasModel;
use \App\Models\BaseModel;

class DownloadBerkas extends BaseController
{
    protected $DownloadBerkasModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->DownloadBerkasModel = new DownloadBerkasModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Download Berkas | Certification Card & Certificate
     * Hakim Desyanto
     * 2023-05-29
     */
    public function certification_card_certificate()
    {
        $data['title'] = 'Certification Card & Certificate';
        $data['menu'] = $this->generate_menu('/DownloadBerkas/certification_card_certificate');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Download_berkas/Certification_card_certificate/Main', $data);
    }

    public function jqgrid_certification_card_certificate()
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

        $result = $this->DownloadBerkasModel->jqgrid_certification_card_certificate('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->DownloadBerkasModel->jqgrid_certification_card_certificate($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['certification_id'] = $row['certification_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['certification_id'],
                $row['user_id'],
                $row['full_name'],
                $row['certification_number'],
                $row['sk_number'],
                $row['certification_card_path'],
                $row['certification_certificate_path'],
                $row['status_id'],
                $row['status_id']


            );
            $i++;
        }

        echo json_encode($responce);
    }

    function upload_certification_card_certification()
    {
        $certification_id = $this->request->getVar('certification_id');
        $date = date('YmdHis');
        
        // try {
        //     $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/berkas/';
        //     $folderName = $folder . '/' . $date . ' ' . basename($_FILES['certification_certificate_path']['name']);
        //     if (!file_exists($folder)) {
        //         mkdir($folder, 0755, true);
        //     }
        //     move_uploaded_file($_FILES['certification_certificate_path']['tmp_name'], $folderName);
        //     $certification_certificate_path = '/assets/berkas/' . $date . ' ' . basename($_FILES['certification_certificate_path']['name']);
        //     $file_exists = true;
        // } catch (\Exception $e) {
        //     $file_exists = false;
        //     $certification_certificate_path = '';
        // }
        
        try {
                 /** insert into certification */
                 $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/berkas';
                
                 $extension = pathinfo($_FILES["certification_certificate_path"]["name"], PATHINFO_EXTENSION);
    
                // // Buat nama file acak
                 $randomName = uniqid().'.'.$extension;
                
                // // Tentukan lokasi penyimpanan file yang baru
                 $targetFile = $folder ."/" .$randomName;
                
                 if (!file_exists($folder)) {
                     mkdir($folder, 0755, true);
                 }
                 // Pindahkan file yang diunggah ke lokasi penyimpanan yang baru
                 move_uploaded_file($_FILES["certification_certificate_path"]["tmp_name"], $targetFile);
                
                $certification_certificate_path = '/assets/berkas/' . $randomName;
                
            } catch (\Exception $e) {
                $file_exists = false;
                $certification_certificate_path = '';
                
            }
            

        if ( $certification_certificate_path == '') {
            $return = array('success' => false, 'msg' => "Mohon dipilih terlebih dahulu filenya");
        } else {
            // if ($certification_certificate_path <> "" && $certification_card_path <> "") {
            //     $data = array(
            //         'certification_card_path' => $certification_card_path,
            //         'certification_certificate_path' => $certification_certificate_path
            //     );
            //     $msg = 'Data Certification Card & Certificate berhasil diupload';
            // } elseif ($certification_certificate_path == "" && $certification_card_path <> "") {
            
                $data = array(
                    'certification_certificate_path' => $certification_certificate_path
                );
                $msg = 'Data Certification Certificat berhasil diupload';
            // } elseif ($certification_certificate_path <> "" && $certification_card_path == "") {
            //     $data = array(
            //         'certification_certificate_path' => $certification_certificate_path
            //     );
            //     $msg = 'Data Certification Certificate berhasil diupload';
            // }
            $this->db->transbegin();
            $this->DownloadBerkasModel->update_certification_card_certificate($data, $certification_id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true, 'msg' => $msg);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        }
        echo json_encode($return);
    }

    function get_data_certification_card_certificate_by_id()
    {
        $id = $this->request->getVar('fieldcode_id');
        $data = $this->DownloadBerkasModel->get_data_certification_card_certificate_by_id($id);
        echo json_encode($data);
    }

    function edit_certification_card_certificate()
    {
        $id = $this->request->getVar('id');
        $fieldcode_code = $this->request->getVar('fieldcode_code');
        $fieldcode_description = $this->request->getVar('fieldcode_description');

        $data = array(
            'fieldcode_code' => $fieldcode_code,
            'fieldcode_description' => $fieldcode_description
        );

        $this->db->transbegin();
        $this->DownloadBerkasModel->update_certification_card_certificate($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_certification_card_certificate()
    {
        $id = $this->request->getVar('fieldcode_id');

        $this->db->transbegin();
        $this->DownloadBerkasModel->delete_certification_card_certificate($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }
    /** end of Download Berkas | Certification Card & Certificate */

    /**
     * Download Berkas | Skema Sertfikasi
     * Hakim Desyanto
     * 2023-07-02
     */
    public function skema_sertifikasi()
    {
        $data['title'] = 'Skema Sertifikasi';
        $data['menu'] = $this->generate_menu('/DownloadBerkas/skema_sertifikasi');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        return view('Download_berkas/Skema_sertifikasi/Main', $data);
    }

    public function jqgrid_skema_sertifikasi()
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

        $result = $this->DownloadBerkasModel->jqgrid_skema_sertifikasi('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->DownloadBerkasModel->jqgrid_skema_sertifikasi($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['description'],
                $row['path'],
                $row['createdAt'],
                $row['updatedAt'],
                ''
                
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function get_data_skema_sertifikasi_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->DownloadBerkasModel->get_data_skema_sertifikasi_by_id($id);
        echo json_encode($data);
    }

    function add_skema_sertifikasi()
    {
        $description = $this->request->getVar('description');
        $text_path = $this->request->getVar('text_path');
        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_skema_sertifikasi()) {
            $validation = \Config\Services::validation();
            $description = ($description == "") ? "1" : "0";
            $text_path = $text_path == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'description' => $description,
                'text_path' => $text_path,
                'error' => 'Lengkapi terlebih dahulu datanya'

            );
        } else {

            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/berkas/';
                $folderName = $folder . '/' . basename($_FILES['path']['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['path']['tmp_name'], $folderName);
                $path = '/assets/berkas/' . basename($_FILES['path']['name']);
                $data = array(
                    'description' =>  $description,
                    'path' => $path,
                    'createdAt' => $createdAt
                );
            } catch (\Exception $e) {
            }

            $this->db->transbegin();
            $this->DownloadBerkasModel->insert_skema_sertifikasi($data);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return =  array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false, 'msg' => 'Gagal konek ke database');
            }
        }
        return json_encode($return);
    }

    function edit_skema_sertifikasi()
    {
        $id = $this->request->getVar('id');
        $description = $this->request->getVar('description');
        $text_path = $this->request->getVar('text_path');
        $createdAt = date('Y-m-d H:i:s');

        if (!$this->validasi_skema_sertifikasi()) {
            $validation = \Config\Services::validation();
            $description = ($description == "") ? "1" : "0";
            $text_path = $text_path == "" ? "1" : "0";

            $return = array(
                'success' => false,
                'description' => $description,
                'text_path' => $text_path,
                'error' => 'Lengkapi terlebih dahulu datanya'

            );
        } else {

            try {

                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/berkas/';
                $folderName = $folder . '/' . basename($_FILES['path']['name']);
                if (!file_exists($folder)) {
                    mkdir($folder, 0755, true);
                }
                move_uploaded_file($_FILES['path']['tmp_name'], $folderName);
                $path = '/assets/berkas/' . basename($_FILES['path']['name']);
                $data = array(
                    'description' =>  $description,
                    'path' => $path,
                    'updatedAt' => $createdAt
                );
            } catch (\Exception $e) {
                $data = array(
                    'description' =>  $description,
                    'updatedAt' => $createdAt
                );
            }

            $this->db->transbegin();
            $this->DownloadBerkasModel->update_skema_sertifikasi($data, $id);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return =  array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false, 'error' => 'Gagal konek ke database');
            }
        }
        return json_encode($return);
    }

    public function validasi_skema_sertifikasi()
    {

        if (!$this->validate([
            'description' => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'text_path'  => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ]
        ])) {
            return false;
        } else {
            return true;
        }
    }

    public function delete_skema_sertifikasi()
    {
        $id = $this->request->getVar('id');
        $this->db->transbegin();
        $this->DownloadBerkasModel->delete_skema_sertifikasi($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false, 'error' => 'Gagal Konek ke database');
        }

        return json_encode($return);
    }


    /** end of Skema Sertifikasi */
}
