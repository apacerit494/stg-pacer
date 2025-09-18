<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\ScoringFinalModel;
use \App\Models\CertificationModel;
use \App\Models\BaseModel;
use \App\Models\InvoiceModel;
use \App\Models\ReportModel;
use HTML5;

use CodeIgniter\Controller;
use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;


class CronJobController extends Controller
{
    protected $ScoringFinalModel;
    protected $CertificationModel;
    protected $ReportModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->ScoringFinalModel = new ScoringFinalModel();
        $this->CertificationModel = new CertificationModel();
        $this->ReportModel = new ReportModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    public function sendCertificate($id)
    {
        $reportModel = new \App\Models\ReportModel();
        $data['data'] = $reportModel->get_data_certification($id);
        $data['data2'] = $reportModel->get_field_code($id);
        
        try {
            ob_start();
            $content = view('Pdf/certificate', $data);
             $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
             $html2pdf->pdf->SetDisplayMode('fullpage');
             $html2pdf->writeHTML($content);
             $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
             $file = 'Certificate ' . date('YmdHis') .$data['data']['certification_number'] .'.pdf';
             $html2pdf->output($folder . $file, 'F');
            $email = \Config\Services::email();
            $email->clear(true);
            $email->setTo('amaryadhi@pacer.co.id');
            //$email->setTo('hakim.desyanto@gmail.com');
          	//$email->setTo('deckie79@gmail.com');
          	//$email->setTo('testing@pacer.co.id');
          	//$email->setTo('hakim.desyanto@pacer.co.id');
          	//$email->setTo('amaryadhi@pacer.co.id');
          	$email->setFrom('noreply@pacer.co.id', 'LSP PACER');
            $email->setSubject('Certificate ' . ' - ' . $data['data']['full_name'] . ' - ' . $data['data']['certification_number']);
            //$email->setSubject('Coba');
			$email->setMessage('Need your electronic sign');
            $email->attach($folder . $file);
            //$email->send();
          
        //   	if ($email->send()) {
        //     // Return response JSON jika sukses
        //     return $this->response->setJSON([
        //         'status' => 'success',
        //         'message' => 'Certificate berhasil dikirim.',
        //         'full_name' => $data['data']['full_name']
        //     ]);
        // } else {
        //     return $this->response->setJSON([
        //         'status' => 'error',
        //         'message' => 'Gagal mengirim email.'
        //     ]);
        // }

		if ($email->send()) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Certificate berhasil dikirim ke:deki ' ,
                'full_name' => 'deki'
            ]);
        } else {
            // Jika gagal, ambil pesan error dari debugger
          // console.log($errorMessage);
           $errorMessage = $email->printDebugger(['headers', 'subject', 'body']);
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Gagal mengirim email. Penyebab: ' . $errorMessage
            ]);
          
        }
        } catch (Html2PdfException $e) {
           // $html2pdf->clean();
            // $formatter = new ExceptionFormatter($e);
            // echo $formatter->getHtmlMessage();
          
        //   return $this->response->setJSON([
        //     'status' => 'error',
        //     'message' => $formatter->getHtmlMessage()
        // ]);
        }
    }
  
  	public function sendCertificate2($id)
{
    $reportModel = new \App\Models\ReportModel();
    $data['data'] = $reportModel->get_data_certification($id);
    $data['data2'] = $reportModel->get_field_code($id);

    try {
        ob_start();
        $content = view('Pdf/certificate', $data);

        // Membuat instance Html2Pdf
        $html2pdf = new \Spipu\Html2Pdf\Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
        $html2pdf->pdf->SetDisplayMode('fullpage');

        // Menulis konten HTML ke PDF
        $html2pdf->writeHTML($content);

        // Nama file PDF
        $fileName = 'Certificate_' . date('YmdHis') . '_' . $data['data']['certification_number'] . '.pdf';

        // Set header agar browser tahu ini PDF
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . $fileName . '"');
        header('Cache-Control: private, max-age=0, must-revalidate');
        header('Pragma: public');

        // Output ke browser (inline di tab baru)
        $html2pdf->output($fileName, 'I');

    } catch (\Spipu\Html2Pdf\Exception\Html2PdfException $e) {
        if (isset($html2pdf)) {
            $html2pdf->clean();
        }
        $formatter = new \Spipu\Html2Pdf\Exception\ExceptionFormatter($e);
        echo $formatter->getHtmlMessage();
    }
}
  
  public function sendCertificate3($id)
{
    $reportModel = new \App\Models\ReportModel();
    $data['data'] = $reportModel->get_data_certification($id);
    $data['data2'] = $reportModel->get_field_code($id);

    try {
        ob_start();
       // $content = view('Pdf/certificate', $data);

        // Generate PDF
        //$html2pdf = new \Spipu\Html2Pdf\Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
        //$html2pdf->pdf->SetDisplayMode('fullpage');
        //$html2pdf->writeHTML($content);

        // Simpan file PDF ke folder
        // $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
        // if (!is_dir($folder)) {
        //     mkdir($folder, 0777, true); // buat folder jika belum ada
        // }

        // $fileName = 'Certificate_' . date('YmdHis') . '_' . $data['data']['certification_number'] . '.pdf';
        // $filePath = $folder . $fileName;
        // $html2pdf->output($filePath, 'F');

        // Konfigurasi email
        $email = \Config\Services::email();
        $email->clear(true);
        $email->setFrom('your-email@example.com', 'LSP PACER');
        $email->setTo('hakim.desyanto@pacer.co.id');
        $email->setSubject('Certificate - ' . $data['data']['full_name'] . ' - ' . $data['data']['certification_number']);
        $email->setMessage('Need your electronic sign');
        //$email->attach($filePath);

        // Cek apakah berhasil mengirim
        if ($email->send()) {
            return $this->response->setJSON([
                'status' => 'success',
                'message' => 'Certificate berhasil dikirim ke: ' . $data['data']['full_name'],
                'full_name' => $data['data']['full_name']
            ]);
        } else {
            // Jika gagal, ambil pesan error dari debugger
          // console.log($errorMessage);
           $errorMessage = $email->printDebugger(['headers', 'subject', 'body']);
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Gagal mengirim email. Penyebab: ' . $errorMessage
            ]);
          
        }
    } catch (\Spipu\Html2Pdf\Exception\Html2PdfException $e) {
        if (isset($html2pdf)) {
            $html2pdf->clean();
        }
        $formatter = new \Spipu\Html2Pdf\Exception\ExceptionFormatter($e);
        return $this->response->setJSON([
            'status' => 'error',
            'message' => 'Gagal membuat PDF. Penyebab: ' . $formatter->getHtmlMessage()
        ]);
    }
}


}
