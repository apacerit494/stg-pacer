public function sendCertificate($id)
{
    $reportModel = new \App\Models\ReportModel();
    $data['data'] = $reportModel->get_data_certification($id);
    $data['data2'] = $reportModel->get_field_code($id);

    try {
        ob_start();
        $content = view('Pdf/certificate', $data);

        // Generate PDF
        $html2pdf = new \Spipu\Html2Pdf\Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
        $html2pdf->pdf->SetDisplayMode('fullpage');
        $html2pdf->writeHTML($content);

        // Simpan file PDF ke folder
        $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
        if (!is_dir($folder)) {
            mkdir($folder, 0777, true); // buat folder jika belum ada
        }

        $fileName = 'Certificate_' . date('YmdHis') . '_' . $data['data']['certification_number'] . '.pdf';
        $filePath = $folder . $fileName;
        $html2pdf->output($filePath, 'F');

        // Konfigurasi email
        $email = \Config\Services::email();
        $email->clear(true);
        $email->setFrom('your-email@example.com', 'LSP PACER');
        $email->setTo('hakim.desyanto@pacer.co.id');
        $email->setSubject('Certificate - ' . $data['data']['full_name'] . ' - ' . $data['data']['certification_number']);
        $email->setMessage('Need your electronic sign');
        $email->attach($filePath);

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