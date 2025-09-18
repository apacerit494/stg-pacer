<?php

namespace App\Controllers;


use CodeIgniter\Controller;
use CodeIgniter\HTTP\Request;
use App\Models\BaseModel;
use App\Models\ReportModel;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Excel extends BaseController
{
    protected $ReportModel;
    protected $Report;
    protected $db;

    public function __construct()
    {
        //  parent::__construct(true);
        //  $this->ReportModel = new ReportModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }





    /**
     * DOWNLOAD FORMAT DATA ANGGARAN LABA RUGI
     * HAKIM
     * 27-08-2022
     */

    public function download_format_upload_data_anggaran()
    {

        /** ambil data parsingan */
        $report_no = $this->request->getVar('report_no2');
        $fund_type_child = $this->request->getVar('fund_type_child2');
        $jenis_laporan = $this->request->getVar('jenis_laporan2');
        $periode_tahun = $this->request->getVar('periode_tahun');

        //  $periode_bulan = $this->request->getVar('periode_bulan');
        //$periode_bulan1 = $this->getMonth($this->request->getVar('periode_bulan'));


        if ($report_no == "All") {
            $report_no1 = "All Report Number";
        } else {
            $report_no1 = $report_no;
        }

        if ($fund_type_child == "All") {
            $fund_type_child1 = "All Fund";
        } else {
            $fund_type_child1 = $fund_type_child;
        }

        // if ($jenis_laporan == '' || $report_no == "") {
        //     $return = array('success' => false, 'error' => 'Mohon pilih jenis laporan dan nomor laporan terlebih dahulu');
        // } else {
        //     $return = array('success' => true);
        //     echo json_encode($return);

        /** ambil data dari database */
        $datas = $this->ReportModel->download_template_data_anggaran($report_no);

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $spreadsheet->setActiveSheetIndex(0);


        /** macam format baik border maupun font */
        $borderAll = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,

                ],
            ],
        ];

        $fontBold = [
            'font' => [
                'bold' => true,
            ],
        ];

        $borderKananKiri = [
            'borders' => [
                'left' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
                'right' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                ],
            ],
        ];

        $borderBawah = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,

                ],
            ],
        ];

        $borderBawahDouble = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_DOUBLE,

                ],
            ],
        ];

        $borderAtas = [
            'borders' => [
                'top' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,

                ],
            ],
        ];


        /** header */
        if ($jenis_laporan == '1') {
            /** Jika jenis laporan = Neraca */
            $spreadsheet->setActiveSheetIndex(0)->setCellValue('A1', 'PT AJS AMANAHJIWA GIRI ARTHA');
            $spreadsheet->setActiveSheetIndex(0)->setCellValue('A2', 'DATA ANGGARAN NERACA');
        } else {
            /** Jika jenis laporan = Laba Rugi */
            $spreadsheet->setActiveSheetIndex(0)->setCellValue('A1', 'PT AJS AMANAHJIWA GIRI ARTHA');
            if ($fund_type_child1 == 'DPRS') {
                $spreadsheet->setActiveSheetIndex(0)->setCellValue('A2', 'DATA ANGGARAN LABA RUGI');
            } elseif ($fund_type_child1 == 'TBRU') {
                $spreadsheet->setActiveSheetIndex(0)->setCellValue('A2', 'DATA ANGGARAN SURPLUS DEFISIT UNDERWRITING DANA TABARRU');
            } else {
                $spreadsheet->setActiveSheetIndex(0)->setCellValue('A2', 'DATA ANGGARAN SURPLUS DEFISIT DANA INVESTASI PESERTA');
            }
        }

        $spreadsheet->setActiveSheetIndex(0)->setCellValue('A3', 'TAHUN');

        $spreadsheet->getActiveSheet()->mergeCells('A4:A5');
        $spreadsheet->getActiveSheet()->getStyle('A4')->getAlignment()->setHorizontal('center');
        $spreadsheet->getActiveSheet()->getStyle('A4')->getAlignment()->setVertical('center');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('A4', 'No ');
        $sheet->getStyle('A4')->applyFromArray($borderKananKiri);

        $spreadsheet->getActiveSheet()->mergeCells('B4:B5');
        $spreadsheet->getActiveSheet()->getStyle('B4')->getAlignment()->setHorizontal('center');
        $spreadsheet->getActiveSheet()->getStyle('B4')->getAlignment()->setVertical('center');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('B4', 'Keterangan');
        $sheet->getStyle('B4')->applyFromArray($borderKananKiri);

        $spreadsheet->getActiveSheet()->mergeCells('C4:N4');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('C4', 'ANGGARAN');
        $spreadsheet->getActiveSheet()->getStyle('C4')->getAlignment()->setHorizontal('center');
        $sheet->getStyle('C4')->applyFromArray($borderKananKiri);

        $spreadsheet->getActiveSheet()->mergeCells('O4:Z4');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('O4', 'REALISASI');
        $spreadsheet->getActiveSheet()->getStyle('O4')->getAlignment()->setHorizontal('center');
        $sheet->getStyle('O4:Z4')->applyFromArray($borderKananKiri);


        $spreadsheet->setActiveSheetIndex(0)->setCellValue('C5', 'Jan');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('D5', 'Feb');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('E5', 'Mar');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('F5', 'Apr');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('G5', 'Mei');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('H5', 'Jun');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('I5', 'Jul');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('J5', 'Agt');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('K5', 'Sep');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('L5', 'Okt');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('M5', 'Nop');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('N5', 'Des');

        $spreadsheet->getActiveSheet()->mergeCells('O4:Z4');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('O4', 'REALISASI');
        $spreadsheet->getActiveSheet()->getStyle('O4')->getAlignment()->setHorizontal('center');

        $spreadsheet->setActiveSheetIndex(0)->setCellValue('O5', 'Jan');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('P5', 'Feb');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('Q5', 'Mar');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('R5', 'Apr');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('S5', 'Mei');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('T5', 'Jun');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('U5', 'Jul');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('V5', 'Agt');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('W5', 'Sep');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('X5', 'Okt');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('Y5', 'Nop');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('Z5', 'Des');

        $spreadsheet->setActiveSheetIndex(0)->setCellValue('A6', '1');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('B6', '2');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('C6', '3');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('D6', '4');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('E6', '5');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('F6', '6');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('G6', '7');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('H6', '8');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('I6', '9');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('J6', '10');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('K6', '11');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('L6', '12');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('M6', '13');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('N6', '14');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('O6', '15');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('P6', '16');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('Q6', '17');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('R6', '18');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('S6', '19');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('T6', '20');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('U6', '21');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('V6', '22');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('W6', '23');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('X6', '24');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('Y6', '25');
        $spreadsheet->setActiveSheetIndex(0)->setCellValue('Z6', '26');

        $spreadsheet->getActiveSheet()->getStyle('A4:Z6')->getAlignment()->setHorizontal('center');
        $num = 1;
        $baris = 7;

        $sheet->getStyle('A1:Z5')->applyFromArray($fontBold);
        $sheet->getStyle('A4:Z4')->applyFromArray($borderAtas);
        $sheet->getStyle('A5:Z5')->applyFromArray($borderAtas);
        $sheet->getStyle('A5:A6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('B5:B6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('C5:C6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('D5:D6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('E5:E6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('F5:F6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('G5:G6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('H5:H6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('I5:I6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('J5:J6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('K5:K6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('L5:L6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('M5:M6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('N5:N6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('O5:O6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('P5:P6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('Q5:Q6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('R5:R6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('S5:S6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('T5:T6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('U5:U6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('V5:V6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('W5:W6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('X5:X6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('Y5:Y6')->applyFromArray($borderKananKiri);
        $sheet->getStyle('Z5:Z6')->applyFromArray($borderKananKiri);

        $sheet->getStyle('A5:Z5')->applyFromArray($borderBawah);
        $sheet->getStyle('A6:Z6')->applyFromArray($borderBawah);

        //$sheet->getStyle('C6:F6')->applyFromArray($borderBawah);

        foreach ($datas as $data) {

            /** data dari database */
            $spreadsheet->setActiveSheetIndex(0)->setCellValue('A' . $baris, $data['seq_no']);
            $spreadsheet->setActiveSheetIndex(0)->setCellValue('B' . $baris, $data['description']);

            /** format border kanan kiri tiap barisnya */
            $sheet->getStyle('A' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('B' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('C' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('D' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('E' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('F' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('G' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('H' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('I' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('J' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('K' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('L' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('M' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('N' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('O' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('P' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('Q' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('R' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('S' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('T' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('U' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('V' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('W' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('X' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('Y' . $baris)->applyFromArray($borderKananKiri);
            $sheet->getStyle('Z' . $baris)->applyFromArray($borderKananKiri);

            /** selain kolom kode akun maka lebarnya dibuat otomatis menyesuaikan isi kolom */
            $spreadsheet->getActiveSheet()->getColumnDimension('B')->setAutoSize(TRUE);

            if ($data['row_flag'] == '3' || $data['row_flag'] == '4') {
                $spreadsheet->getActiveSheet()->getStyle('C' . $baris . ':Z' . $baris)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB('808080');
                $sheet->getStyle('C' . $baris  . ':Z' . $baris)->applyFromArray($borderAll);
            }

            $baris++;
            $num++;
        }

        /** baris terakhir dibuat border all dan bawahnya dibuat double */
        $sheet->getStyle('A' . $baris - 1 . ':Z' . $baris - 1)->applyFromArray($borderAll);
        $sheet->getStyle('A' . $baris - 1 . ':Z' . $baris - 1)->applyFromArray($borderBawahDouble);

        // tulis dalam format .xlsx
        $writer = new Xlsx($spreadsheet);
        $fileName = 'Template Data Anggaran ' . $report_no . '-' . $periode_tahun;

        // Redirect hasil generate xlsx ke web client
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename=' . $fileName . '.xlsx');
        header('Cache-Control: max-age=0');

        $writer->save('php://output');
        // }
        // echo json_encode($return);
    }
}
