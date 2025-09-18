<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\ReportModel;
use \App\Models\BaseModel;
use App\Models\InhouseModel;

use HTML5;

//require_once dirname(__FILE__) . '/../vendor/autoload.php';
//require_once base_url() . '/vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

class Pdf extends BaseController
{
    protected $ReportModel;
    protected $BaseModel;
    protected $InhouseModel;
    protected $db;


    public function __construct()
    {
        $this->ReportModel = new ReportModel();
        $this->BaseModel = new BaseModel();
        $this->InhouseModel = new InhouseModel();
        $this->db = db_connect();
    }

    public function deposit_report($periode1, $periode2)
    {
        if ($periode1 == '-') {
            $periode1 = '';
        }
        if ($periode2 == '-') {
            $periode2 = '';
        }

        $sql = "SELECT
        a.id,
        b.fund_group_name,
        c.bank_name,
        a.account_number,
        a.open_date,
        a.last_due_date,
        a.next_due_date,
        a.profit_return_rasio,
        a.last_yield,
        a.return_last_due_date,
        a.return_next_due_date,
        a.amount,
        a.deposit_term,
        a.payment_return_mode,
        a.account_for_return,
        a.aro_flag,
        a.profit_sharing_flag,
        a.break_date,
        a.maturity_date,
        a.status,
        a.created_stamp
        FROM inv_deposit_account a
        LEFT JOIN inv_fund_group b ON a.fund_group_code=b.fund_group_code
        LEFT JOIN inv_master_bank c ON a.bank_code=c.bank_code
        WHERE a.status in('0','1','2','3','4','5')";
        $param = array();
        if ($periode1 != "" && $periode2 != "") {
            $sql .= " and a.open_date between ? and ?";
            $param[] = $periode1;
            $param[] = $periode2;
        }

        $sql .= " order by a.open_date ";
        $query = $this->db->query($sql, $param);

        $datas = $query->getResultArray();
        // batas model
        if ($periode1 == "") {
            $v_periode1 = '-';
        } else {
            $v_periode1 = date('d/m/Y', strtotime($periode1));
        }
        if ($periode2 == "") {
            $v_periode2 = '-';
        } else {
            $v_periode2 = date('d/m/Y', strtotime($periode2));
        }
        // set variable untuk view
        $data['periode1'] = $v_periode1;
        $data['periode2'] = $v_periode2;
        $data['datas'] = $datas;

        $content = '
        <style type="text/css">
        .title {
            font-size: 15px;
            /*font-weight:bold;*/
            text-align: center;
            padding-bottom: 20px;
            /*border-bottom:solid 1px #000;*/
        }

        .body {
            padding-top: 20px;
        }

        .footer {
            font-size: 10px;
            font-weight: bold;
            text-align: center;
        }

        .table {
            border-left: solid 1px #000;
            border-right: solid 1px #000;
            padding: 0;
            margin: 0;
        }

        .table thead tr th {
            border-top: solid 1px #000;
            border-bottom: solid 1px #000;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding: 5px 10px;
        }

        .table tbody tr td {
            border-bottom: solid 1px #000;
            padding: 3px;
        }

        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }

        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }

        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }

        .border-right {
            border-right: solid 1px #000;
        }
        </style> 
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->';

        $content .= '<page backbottom="15" backtop="10" backleft="5" backright="5">

        <!-- START PAGE FOOTER -->
        <page_footer>
            <div class="footer">([[page_cu]])</div>
        </page_footer>
        <!-- END PAGE FOOTER -->

        <!-- START title  -->
        <div class="title">
            <strong>Deposit - Report</strong> <br><br>
            <span style="font-size:11px;">
                Periode : ';

        if ($periode1 == "" && $periode2 == "") {
            $periode = 'ALL';
        } else {
            $periode = $periode1 .  ' s.d ' . $periode2;
        }

        $content .= $periode;
        $content .= '</span>
        </div>';

        $content .= '<div class="body">

            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
            START table header
            - width="" = width otomatis
            -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="" class="border-right">Fund</th>
                        <th width="" class="border-right">Bank Name</th>
                        <th width="" class="border-right">Account Number</th>
                        <th width="" class="border-right">Nominal</th>
                        <th width="" class="border-right">Open Date</th>
                        <th width="" class="border-right">Flag ARO</th>
                        <th width="" class="border-right">Break Date</th>
                        <th width="" class="border-right">Maturity Date</th>
                        <th width="10">Status</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
            START table body
            #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
            #class text-left = rata kiri (note: class text-left untuk format text biasa)
            #class text-right = rata kanan (note: class text-right untuk format currency)
            #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
            -->
                <tbody> ';

        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :

            switch ($data['status']) {
                case '0':
                    $status = 'UnVerified';
                    break;
                case '1':
                    $status = 'Verified';
                    break;
                case '2':
                    $status = 'UnVerified Break';
                    break;
                case '3':
                    $status = 'UnVerified Maturity';
                    break;
                case '4':
                    $status = 'Break';
                    break;
                case '5':
                    $status = 'Maturity';
                    break;

                default:
                    $status = '-';
                    break;
            }

            switch ($data['aro_flag']) {
                case '0':
                    $aro_flag = 'Non ARO';
                    break;
                case '1':
                    $aro_flag = 'ARO';
                    break;

                default:
                    $aro_flag = '-';
                    break;
            }

            $break_date = ($data['break_date'] == "") ? "-" : date('d/m/Y', strtotime($data['break_date']));
            $maturity_date = ($data['maturity_date'] == "") ? "-" : date('d/m/Y', strtotime($data['maturity_date']));

            $content .= '<tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-left">' . $data['fund_group_name'] . '</td>
                        <td class="border-right text-left" style="width:90px;white-space:normal;">' . $data['bank_name'] . '</td>
                        <td class="border-right text-left">' . $data['account_number'] . '</td>
                        <td class="border-right text-right">' . number_format($data['amount'], 0, ',', '.') . '</td>
                        <td class="border-right text-center">' . date('d/m/Y', strtotime($data['open_date'])) . '</td>
                        <td class="border-right text-center">' . $aro_flag . '</td>
                        <td class="border-right text-center">' . $break_date . '</td>
                        <td class="border-right text-center">' . $maturity_date . '</td>
                        <td class="text-center" style="width:30px;white-space:normal;">' . $status . '</td>
                    </tr>';

            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '</tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->

        </page>';
        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('DEPOSIT REPORT.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }

    /** Transaction | Current Account | Current Account Input
     * Hakim
     * 2022-10-14
     */

    public function export_report_current_account()
    {

        $sql = "select a.id,a.fund_group_code,a.bank_code,a.branch_name,a.account_number,a.open_date,a.balance,
				b.fund_group_name,c.bank_name
				from inv_current_account a
				left join inv_fund_group b on a.fund_group_code=b.fund_group_code
				left join inv_master_bank c on a.bank_code=c.bank_code
				";
        $query = $this->db->query($sql);

        $datas = $query->getResultArray();

        $content = '<style type="text/css">
                        .title {
                            font-size: 15px;
                            /*font-weight:bold;*/
                            text-align: center;
                            padding-bottom: 20px;
                            /*border-bottom:solid 1px #000;*/
                        }

                        .body {
                            padding-top: 20px;
                        }

                        .footer {
                            font-size: 10px;
                            font-weight: bold;
                            text-align: center;
                        }

                        .table {
                            border-left: solid 1px #000;
                            border-right: solid 1px #000;
                            padding: 0;
                            margin: 0;
                        }

                        .table thead tr th {
                            border-top: solid 1px #000;
                            border-bottom: solid 1px #000;
                            font-size: 10px;
                            font-weight: bold;
                            text-align: center;
                            padding: 5px 10px;
                        }

                        .table tbody tr td {
                            border-bottom: solid 1px #000;
                            padding: 3px;
                        }

                        .text-left {
                            font-size: 9px;
                            text-align: left;
                            white-space: normal;
                        }

                        .text-right {
                            font-size: 9px;
                            text-align: right;
                            white-space: normal;
                        }

                        .text-center {
                            font-size: 9px;
                            text-align: center;
                            white-space: normal;
                        }

                        .border-right {
                            border-right: solid 1px #000;
                        }
                    </style> 
                    <!-- END PAGE STYLE -->

                    <!-- START PAGE -->';
        $content .= '<page backbottom="15" backtop="10" backleft="5" backright="5">

                        <!-- START PAGE FOOTER -->
                        <page_footer>
                            <div class="footer">([[page_cu]])</div>
                        </page_footer>
                        <!-- END PAGE FOOTER -->

                        <!-- START title  -->
                        <div class="title">
                            <strong>CURRENT ACCOUNT</strong> <br><br>
                            
                        </div>';

        $content .= '<div class="body">

                        <!-- START table data -->
                        <table class="table" cellspacing="0" cellpadding="0" align="center">
                            <!--
                        START table header
                        - width="" = width otomatis
                        -->
                            <thead>
                                <tr>
                                    <th width="" class="border-right">NO</th>
                                    <th width="" class="border-right">FUND CODE</th>
                                    <th width="" class="border-right">FUND NAME</th>
                                    <th width="" class="border-right">BANK CODE</th>
                                    <th width="" class="border-right">BANK NAME</th>
                                    <th width="" class="border-right">BRANCH NAME</th>
                                    <th width="" class="border-right">ACCOUNT NUMBER</th>
                                    <th width="" class="border-right">OPEN DATE</th>
                                    <th width="" class="border-right">BALANCE</th>
                                </tr>
                            </thead>
                            <!-- END table header -->
                            <!--
                        START table body
                        #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                        #class text-left = rata kiri (note: class text-left untuk format text biasa)
                        #class text-right = rata kanan (note: class text-right untuk format currency)
                        #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                        -->
                            <tbody> ';

        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :


            $break_date = ($data['open_date'] == "") ? "-" : date('d/m/Y', strtotime($data['open_date']));

            $content .= '<tr>
					<td class="border-right text-center">' . $nomor . '</td>
					<td class="border-right text-left">' . $data['fund_group_code'] . '</td>
					<td class="border-right text-left" style="width:90px;white-space:normal;">' . $data['fund_group_name'] . '</td>
					<td class="border-right text-left">' . $data['bank_code'] . '</td>
					<td class="border-right text-left">' . $data['bank_name'] . '</td>
					<td class="border-right text-left">' . $data['branch_name'] . '</td>
					<td class="border-right text-left">' . $data['account_number'] . '</td>
					<td class="border-right text-center">' . date('d/m/Y', strtotime($data['open_date'])) . '</td>
					<td class="border-right text-right">' . number_format($data['balance'], 0, ',', '.') . '</td>
					
				</tr>';

            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '</tbody>
                            <!-- END table body -->
                        </table>
                        <!-- END table data -->
                    </div>
                    <!-- END body -->

                </page>';
        try {
            $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('CURRENT ACCOUNT ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }

    /** Transaction | Time Deposit | Deposit Placement
     * Hakim
     * 2022-10-14
     */

    public function surat_deposit_placement($id)
    {
        // ambil data untuk ditampilkan di pdf
        $data = $this->ReportModel->surat_deposit_placement($id);

        /** jika no surat masih kosong maka buatkan nomor surat */
        if ($data['no_surat_placement'] == Null) {
            $no_surat_terakhir = $this->get_no_surat_terakhir();
            if ($no_surat_terakhir == Null) {
                $no_surat = '1';
            } else {
                $no_surat = ((int)substr($no_surat_terakhir, 0, 3)) + 1;
            }
            switch (substr($data['tgl_surat_placement'], 5, 2)) {
                case "01":
                    $month = "I";
                    break;
                case "02":
                    $month = "II";
                    break;
                case "03":
                    $month = "III";
                    break;
                case "04":
                    $month = "IV";
                    break;
                case "05":
                    $month = "V";
                    break;
                case "06":
                    $month = "VI";
                    break;
                case "07":
                    $month = "VII";
                    break;
                case "08":
                    $month = "VIII";
                    break;
                case "09":
                    $month = "IX";
                    break;
                case "10":
                    $month = "X";
                    break;
                case "11":
                    $month = "XI";
                    break;
                case "12":
                    $month = "XII";
                    break;
            }

            $year = substr($data['tgl_surat_placement'], 0, 4);

            if (strlen($no_surat) == 1) {
                $no_surat = '00' . $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            } elseif (strlen($no_surat) == 2) {
                $no_surat = '0' . $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            } else {
                $no_surat = $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            }

            /** update no_surat_placement di inv_deposit_account*/
            $this->db->transBegin();
            $this->db->query('update inv_deposit_account set no_surat_placement=? where id=?', array($no_surat, $id));
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
            } else {
                $this->db->transRollback();
            }

            /** insert data baru ke inv_master_surat*/
            $uuid = $this->BaseModel->get_uuid();
            $data = array(
                'id' => $uuid,
                'no_surat' => $no_surat,
                'perihal' => 'INSTRUKSI PENEMPATAN DEPOSITO',
                'created_date' => date("Y-m-d H:i:s")
            );

            $this->db->transBegin();
            $this->ReportModel->insert_master_surat($data);
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
            } else {
                $this->db->transRollback();
            }
            $data = $this->ReportModel->surat_deposit_placement($id);
        }

        $pejabat1 = $this->get_master_code_row('SURAT', 'DEP_OPEN_1');
        $pejabat2 = $this->get_master_code_row('SURAT', 'DEP_OPEN_2');

        $company = $this->get_company();
        if ($data['deposito_account_name'] == "") {
            $data1 = "-";
        } else {
            $data1 = $data['deposito_account_name'];
        }

        $jatuh_tempo = date('d-m-Y', strtotime($data['maturity_date']));
        if ($data['aro_flag'] == 'ARO') $jatuh_tempo = 'ARO';

        $data2 = number_format($data['amount'], 0, ',', '.') . ',-';
        $data3 = '( '  . $this->terbilang($data['amount']) . ' Rupiah )';

        $open_date = ($data['open_date'] == "") ? "-" : $data['open_date'];

        $bank_name =  ($data['bank_name'] == "") ? "-" : $data['bank_name'];
        $account_name = ($data['account_name'] == "") ? "-" : $data['account_name'];
        $account_for_return = ($data['account_for_return'] == "") ? "-" : $data['account_for_return'];

        $background = base_url("assets/admin/layout/images/logo.png");
        $daun = "assets/admin/layout/images/watermark_daun.jpg";
        $kop = "assets/admin/layout/images/amanahgitha.jpg";
        $footer = "assets/admin/layout/images/footer_aga_2.png";

        $content = '<style type="text/css">
        table{
            margin: 0;
            padding: 0;
        }
        table.body{
            /*margin: 20px 20px 20px 50px;*/
                margin: 20px 20px 20px 0px;
            padding: 0;
        }
        tr{
            padding: 0;
            margin: 0;
        }
        td{
            vertical-align: top;
            line-height: 18px;
        }
        td.header{
            padding: 0 0 0 20px;
            margin: 0;
            width: 580px;
        }
        table {
            width: 700px;
        }
        table.padding5 td{
            padding: 5px;
        }
        table.paddingbot3 td{
            padding: 0 0 3px 0;
        }
        table.table{
            padding-left: 10px;
        }
        h1,h2,h3,h4{
            margin:3px 0;
            padding:0;
            text-align: center;
        }
        .font14{
            font-size:14px;
            line-height: 18px;
        }
        .font16{
            font-size:16px;
            line-height: 18px;
        }
        .justify{
            text-align: justify;
        }
        .center{
            text-align: center;
        }
        ul{
            padding-top:0px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:0px;
            margin-top:0px;
            margin-left:0px;
            margin-right:0px;
            margin-bottom:0px;
            }
        ul li{
            padding-top:0px;
            padding-left:0px;
            padding-right:0px;
            padding-bottom:0px;
            margin-top:0px;
            margin-left:0px;
            margin-right:0px;
            margin-bottom:0px;
            }
        #ttd{
            font-size:12px;
        } 
        
        #footer {
           margin: 0 !important;
           position:absolute;
           bottom:0;
           width:100%;
           text-align: left;  
           font-size: 9px;
           
        }
        
        
        #container1 {
            position: relative;
            width: 900px;
            padding-top: 100
            
        }
        
        #container2 {    
            position: absolute;
            top: 0px;
            left: 0px;
        }
        
        </style>
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->
        <page backleft="17mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px">
            <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->        
            <div id="container1">
                <img style="width:400px;height:900px;top:200; right: 50;margin-left:200;overflow:hidden; "  src="' . $daun . '"/>
                <div id="container2">
                    <!-- START title  -->
                    <div class="title">                
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td colspan="4" style="width:600px;>
                                    <img style="width:190px;height:50px;valign:top" src="' . $kop  . '"/>
                                </td>
                            </tr>
                            <tr>    
                                <td colspan="2" style="width:600px;>
                                    <p>
                                    Jakarta, ' . date('d M Y', strtotime($data['tgl_surat_placement'])) . '<br>
                                    No : ' .  $data['no_surat_placement'] . '
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"  style="width:600px;>
                                    <p>
                                    <br>
                                    Kepada<br>
                                    ' . $data['deposito_bank_name'] . ' - ' . $data['branch_name'] . '<br>
                                    ' . $data['address'] . '<br>
                                    ' . $data['urban_village'] . ' ' . $data['sub_district'] . ' ' . $data['pos_code'] . '<br>
                                    Indonesia <br>
                                    Telp : ' . $data['telephone_no'] . '
                                    </p>                                
                                    <p> UP : ' . $data['title'] . ' ' . $data['contact_person'] . '( ' . $data['mobile_phone'] . ' )</p>

                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- END title -->

                    <!-- START body -->
                    <div class="body">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:600px;">
                                    <p style="text-align:center;font-weight:bold;">
                                        HAL : INSTRUKSI PENEMPATAN DEPOSITO
                                    </p>
                                    
                                    Assalamu' . "'" . 'alaikum Warahmatullah Wabarakatuh.                                                           
                                    <p>Semoga Allah SWT senantiasa melimpahkan rahmat, taufik, dan hidayah-Nya kepada kita semua dalam menjalankan 
                                        <br>aktivitas sehari-hari.
                                    </p>
                                    Dengan ini kami mohon agar dilakukan penempatan deposito mudharabah sebagai berikut:
                                    <p>
                                        <table cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width:120px;"> <strong>Atas Nama</strong></td>
                                                <td><strong>: ' . $data1  . '</strong></td>
                                            </tr>                                       
                                            <tr>
                                                <td><strong>Jangka Waktu</strong></td>
                                                <td><strong>: ' . $data['deposit_term']  . ' Bulan (' . $data['open_date'] . ' s.d. ' . $data['next_due_date'] . ')</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Nominal</strong> </td>
                                                <td><strong>: Rp ' . $data2 . ' e.r. ' . $data['last_yield'] . '% </strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong></strong> </td>
                                                <td><strong>  ' . $data3 . '</strong></td>
                                            </tr>
                                        </table>                                        
                                        <p>
                                            Untuk dana deposito mohon dapat didebet dari rekening kami dan bagi hasil deposito harap ditransfer ke rekening sebagai berikut:
                                        </p>                                    
                                        <table cellspacing="0" cellpadding="0" border="0">                                   
                                            <tr >
                                                <td >Nama Bank</td>
                                                <td >: ' . $bank_name . ' - ' . $data['branch_name'] . '</td>       
                                            </tr>
                                            <tr>
                                                <td style="width:120px;">Atas Nama</td>
                                                <td>: ' . $account_name . '</td>
                                            </tr>
                                            <tr>
                                                <td>No. Rekening</td>
                                                <td>: ' . $account_for_return . '</td>                          
                                            </tr>
                                        </table>
                                    </p>
                                    <p>Demikian disampaikan. Atas perhatian dan kerjasamanya kami sampaikan terima kasih.</p>
                                    <p>Wassalamu' . "'" . 'alaikum Warahmatullah Wabarakatuh.<br>
                                    <strong>' . $company['company_name'] . '</strong></p>
                                </td>
                            </tr>
                        </table>
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:400px;height:150px;"> &nbsp; </td>
                                <td style="width:300px;height:150px;"> &nbsp; </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>' . @$pejabat1['code_value'] . '</strong><br>' . @$pejabat1['code_description'] . '
                                </td>
                                <td>
                                    <strong>' . @$pejabat2['code_value'] . '</strong><br>' . @$pejabat2['code_description'] . '
                                </td>
                            </tr>
                        </table>                    
                        <table>
                            <tr>
                                <td colspan="0">&nbsp;                                    
                                    <br>
                                    <br>
                                    <br>
                                    <br>
                                    <br>                        
                                </td>
                            </tr>
                            <tr>
                                <td colspan="0">
                                    <p style="font-weight: bold;font-size:10px;margin: 0 !important;text-align:left;"> PT. AJS AMANAHJIWA GIRI ARTHA</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="0">
                                    <p style="font-size:10px;margin: 0 !important;text-align:justify;">CROWN PALACE, Jl. Prof. Dr. Soepomo No.231 Blok A-3, Tebet, Jakarta Selatan, 12870,Tlp.(021) 29406315 (hunting) | Fax (021) 29406316</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="0">
                                    <img style="width:100%;height:15px;" src="' . $footer . '"/>
                                </td>
                            </tr>
                        </table>
                    </div> <!-- END body -->                    
                </div> <!-- END Container2 -->
            </div> <!-- END Container1 -->
        </page>  <!-- END PAGE -->';


        //dd($content);

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Surat Penempatan Deposito ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end fo Deposit Placement */

    /** Transaction | Time Deposit | Deposit Break
     * Hakim
     * 2022-10-14
     */

    public function surat_deposit_break($id)
    {

        $data = $this->ReportModel->surat_deposit_break($id);

        /** jika no surat masih kosong maka buatkan nomor surat */
        if ($data['no_surat_break'] == Null) {
            $no_surat_terakhir = $this->get_no_surat_terakhir();
            if ($no_surat_terakhir == Null) {
                $no_surat = '1';
            } else {
                $no_surat = ((int)substr($no_surat_terakhir, 0, 3)) + 1;
            }
            switch (substr($data['tgl_surat_break'], 5, 2)) {
                case "01":
                    $month = "I";
                    break;
                case "02":
                    $month = "II";
                    break;
                case "03":
                    $month = "III";
                    break;
                case "04":
                    $month = "IV";
                    break;
                case "05":
                    $month = "V";
                    break;
                case "06":
                    $month = "VI";
                    break;
                case "07":
                    $month = "VII";
                    break;
                case "08":
                    $month = "VIII";
                    break;
                case "09":
                    $month = "IX";
                    break;
                case "10":
                    $month = "X";
                    break;
                case "11":
                    $month = "XI";
                    break;
                case "12":
                    $month = "XII";
                    break;
            }

            $year = substr($data['tgl_surat_break'], 0, 4);

            if (strlen($no_surat) == 1) {
                $no_surat = '00' . $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            } elseif (strlen($no_surat) == 2) {
                $no_surat = '0' . $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            } else {
                $no_surat = $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            }

            //  dd($no_surat);

            /** update no_surat_placement di inv_deposit_account*/
            $this->db->transBegin();
            $this->db->query('update inv_deposit_account set no_surat_break=? where id=?', array($no_surat, $id));
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
            } else {
                $this->db->transRollback();
            }

            /** insert data baru ke inv_master_surat*/
            $uuid = $this->BaseModel->get_uuid();
            $data = array(
                'id' => $uuid,
                'no_surat' => $no_surat,
                'perihal' => 'DEPOSITO JATUH TEMPO',
                'created_date' => date("Y-m-d H:i:s")
            );

            $this->db->transBegin();
            $this->ReportModel->insert_master_surat($data);
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
            } else {
                $this->db->transRollback();
            }
            $data = $this->ReportModel->surat_deposit_break($id);
        }


        $pejabat1 = $this->get_master_code_row('SURAT', 'DEP_BREAK_1');
        $pejabat2 = $this->get_master_code_row('SURAT', 'DEP_BREAK_2');
        $company = $this->get_company();
        // set variable untuk view
        $data['data'] = $data;
        $data['pejabat1'] = $pejabat1;
        $data['pejabat2'] = $pejabat2;
        $data['company'] = $company;

        switch ($data['deposit_term_flag']) {
            case 'D':
                $deposit_term_flag = 'Hari';
                break;
            case 'M':
                $deposit_term_flag = 'Bulan';
                break;

            default:
                $deposit_term_flag = '';
                break;
        }

        $jatuh_tempo = date('d-m-Y', strtotime($data['next_due_date']));
        if ($data['aro_flag'] == 'ARO') $jatuh_tempo = 'ARO';

        if ($data['principal_bank_name'] == "") {
            $principal_bank_name = "-";
        } else {
            $principal_bank_name = $data['principal_bank_name'];
        }

        if ($data['principal_account_name'] == "") {
            $principal_account_name = "-";
        } else {
            $principal_account_name = $data['principal_account_name'];
        }

        if ($data['principal_account_number'] == "") {
            $principal_account_number = "-";
        } else {
            $principal_account_number = $data['principal_account_number'];
        }



        $daun = "assets/admin/layout/images/watermark_daun.jpg";
        $kop = "assets/admin/layout/images/amanahgitha.jpg";
        $footer = "assets/admin/layout/images/footer_aga_2.png";

        $content = '<!-- START PAGE STYLE -->
        <style type="text/css">
        .title {
            font-size: 12px;
            padding-bottom:20px;
            line-height: 18px;
        }
        .body {
            <!-- padding-top: 20px; -->
            font-size: 12px;
            line-height: 18px;

           
        }
        td {
            padding: 4px 5px;
        }
        .table {
            border-left: solid 1px #555;
            border-right: solid 1px #555;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #555;
            border-bottom: solid 1px #555;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #555;
        }
        .text-left {
            font-size: 10px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 10px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 10px;
            text-align: center;
            white-space: normal;
        }
        .border-left {
            border-left: solid 1px #555;
        }
        .border-right {
            border-right: solid 1px #555;
        }

        #container1 {
            position: relative;
            width: 900px;
            padding-top: 100
            
        }

        #container2 {    
            position: absolute;
            top: 0px;
            left: 0px;
        }

        #footer {
            margin: 0 !important;
            position:absolute;
            bottom:0;
            width:100%;
            text-align: left;  
            font-size: 9px;
            
            }
        </style>
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->
        <!-- <page backbottom="15" backtop="30" backleft="15" backright="15"> -->
        <page backleft="17mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px">                    
            <div id="container1">
                <img style="width:400px;height:900px;top:200; right: 50;margin-left:200;overflow:hidden; "  src="' . $daun . '"/>
                <div id="container2">
                    <!-- START title  -->
                    <div class="title">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:600px;">
                                    <img style="width:190px;height:50px;valign:top" src="' . $kop  . '"/>
                                </td>
                            </tr>
                            <tr>    
                                <td style="width:600px;">
                                    <p>
                                    Jakarta, ' . date('d M Y', strtotime($data['tgl_surat_break'])) . '<br>
                                    No : ' .  $data['no_surat_break'] . '
                                    </p>
                                </td>
                            </tr>                    
                            <tr>
                                <td style="width:600px;">
                                    <p>
                                    <br>
                                    Kepada<br>
                                    ' . $data['deposito_bank_name'] . ' - ' . $data['branch_name'] . '<br>
                                    ' . $data['address'] . '<br>
                                    ' . $data['urban_village'] . ' ' . $data['sub_district'] . ' ' . $data['pos_code'] . '<br>
                                    Indonesia <br>
                                    Telp : ' . $data['telephone_no'] . '<br><br>
                                    Up. ' . $data['title'] . ' ' . $data['contact_person'] . ' ( ' . $data['mobile_phone'] . ' )
                                    </p>
                                    <p style="text-align:center;font-weight:bold;">
                                        HAL : PENCAIRAN DEPOSITO
                                    </p>                                                                      
                                </td>
                            </tr> 
                        </table>
                    </div> <!-- END title -->                    

                    <!-- START body -->
                    <div class="body">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:600px;">      
                                    Assalamu' . "'" . 'alaikum Warahmatullahi Wabarakatuh
                                    <p style="text-align: justify;">
                                        Semoga Allah SWT senantiasa melimpahkan rahmat, taufik, dan hidayah-Nya kepada kita semua dalam menjalankan aktivitas sehari-hari.
                                        <br>
                                        <br>
                                    Dengan ini kami informasikan bahwa deposito ' . $data['principal_account_name'] . ' berikut ini tidak akan diperpanjang dan akan dicairkan pada tanggal 08 Oktober 2014:
                                    </p>
                                    <p>
                                        <table class="table" cellspacing="0" cellpadding="0" border="0">
                                            <thead>
                                                <tr>
                                                    <th valign="middle" class="border-left border-right">No. Bilyet</th>
                                                    <th valign="middle" class="border-right">No. Deposito</th>
                                                    <th valign="middle" class="border-right">Nominal</th>
                                                    <th valign="middle" class="border-right">Tanggal<br>Penempatan</th>
                                                    <th valign="middle" class="border-right">Jangka<br>Waktu</th>
                                                    <th valign="middle" class="border-right">Tanggal<br>Jatuh Tempo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="width:80px;" class="border-left border-right text-center">' . $data['bilyet_number'] . '</td>
                                                    <td style="width:80px;" class="border-right text-center">' . $data['deposito_account_number'] . '</td>
                                                    <td style="width:100px;" class="border-right text-right">Rp .' . number_format($data['amount'], 0, ',', '.') . ',-</td>
                                                    <td style="width:80px;" class="border-right text-center">' . date('d-m-Y', strtotime($data['open_date'])) . '</td>
                                                    <td style="width:70px;" class="border-right text-center">' . $data['deposit_term'] . ' ' . $deposit_term_flag . '</td>
                                                    <td style="width:80px;" class="border-right text-center">' . $jatuh_tempo . '</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </p>
                                    Selanjutnya mohon agar dana hasil pencairan dapat ditransfer ke rekening sebagai berikut:
                                    <p>
                                        <table cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td>Nama Bank</td>
                                                <td>: ' . $principal_bank_name . ' - ' . $data['branch_name'] . '</td>
                                            </tr>
                                            <tr>
                                                <td style="width:120px;">Nama Rekening</td>
                                                <td>: ' . $principal_account_name . '</td>
        
                                        </tr>
                                        <tr>
                                            <td>Nomor Rekening</td>
                                            <td>: ' . $principal_account_number . '</td>
                                        </tr>
                                        </table>
                                    </p>
                                    <p>Demikian disampaikan. Atas perhatian dan kerjasamanya yang baik kami sampaikan terima kasih.</p>
                                    <p>Wassalamu' . "'" . 'alaikum Warahmatullahi Wabarakatuh<br>
                                    <strong>' . $company['company_name'] . '</strong></p>
                                </td>
                            </tr>
                        </table>
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:400px;height:50px;"> &nbsp; </td>
                                <td style="width:300px;height:50px;"> &nbsp; </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>' . @$pejabat1['code_value'] . '</strong><br>' . @$pejabat1['code_description'] . '
                                </td>
                                <td>
                                    <strong>' . @$pejabat2['code_value'] . '</strong><br>' . @$pejabat2['code_description'] . '
                                </td>
                            </tr>
                        </table>          
                        <table>
                            <tr>
                                <td colspan="0">&nbsp;                                    
                                    <br>
                                    <br>                        
                                    <br>                        
                                                     
                                </td>
                            </tr>
                            <tr>
                                <td colspan="0">
                                    <p style="font-weight: bold;font-size:10px;margin: 0 !important;text-align:left;"> PT. AJS AMANAHJIWA GIRI ARTHA</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="0">
                                    <p style="font-size:10px;margin: 0 !important;text-align:justify;">CROWN PALACE, Jl. Prof. Dr. Soepomo No.231 Blok A-3, Tebet, Jakarta Selatan, 12870,Tlp.(021) 29406315 (hunting) | Fax (021) 29406316</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="0">
                                    <img style="width:100%;height:15px;" src="' . $footer . '"/>
                                </td>
                            </tr>
                        </table>                
                    </div><!-- END BODY -->
                </div><!-- END Container1 -->
            </div><!-- END Container2 -->
        </page><!-- END PAGE -->';

        // dd($content);

        //try {
        $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
        $html2pdf->pdf->SetDisplayMode('fullpage');

        ob_start();
        // include '../../../Views/Admin/Pdf/Deposit_report.php';

        //$content = ob_get_contents();

        $html2pdf->writeHTML($content);
        //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
        $html2pdf->output('Surat Deposit Break' . date('YmdHis') . '.pdf', 'D');
        // } catch (Html2PdfException $e) {
        //     $html2pdf->clean();

        //     $formatter = new ExceptionFormatter($e);
        //     echo $formatter->getHtmlMessage();
        // }
    }
    /** end of Deposit Break */

    /** Transaction | Current Account |  TRansaction Input
     * Hakim
     * 2022-10-17
     */

    public function export_report_current_account_transaction($periode1, $periode2)
    {
        //        $datas = $this->ReportModel->export_report_current_account_transaction($periode1, $periode2);
        if ($periode1 == '--' || $periode1 == '--') {
            $datas = $this->InhouseModel->jqgrid_current_account_transaction('', '', '', '', '', '');
        } else {
            $datas = $this->InhouseModel->jqgrid_current_account_transaction('', '', '', '', $periode1, $periode2);
        }

        // dd($datas);

        // set variable untuk view
        $data['datas'] = $datas;

        $content = '<!-- START PAGE STYLE -->
        <style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>
        <!-- END PAGE STYLE -->
        
        <!-- START PAGE -->
        <page backbottom="15" backtop="10" backleft="10" backright="10">
        
        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->
        
        <!-- START title  -->
        <div class="title">
        Current Account Transaction <br>
        Periode : ' . $periode1 . ' s/d ' . $periode2
            . '</div>
        <!-- END title -->
        
        <!-- START body -->
        <div class="body">
        
            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="" class="border-right">ACCOUNT NUMBER</th>
                        <th width="" class="border-right">TRANSACTION DATE</th>
                        <th width="" class="border-right">TRANSACTION CODE</th>
                        <th class="border-right" style="width:200px">TRANSACTION NAME</th>
                        <th width="" class="border-right">REFERENCE</th>
                        <th width="" class="border-right">DEBIT CREDIT FLAG</th>
                        <th width="" class="border-right">AMOUNT</th>
                        <th width="" class="border-right">BALANCE</th>
                        <th width="" class="border-right">STATUS</th>
                    </tr>
                </thead>
        
                
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->
                <tbody>';
        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :

            // get desc of bank_type
            switch ($data['debit_credit_flag']) {
                case 'D':
                    $debit_credit_flag = 'Debet';
                    break;
                case 'C':
                    $debit_credit_flag = 'Credit';
                    break;
                default:
                    $debit_credit_flag = '  -';
                    break;
            }

            switch ($data['status']) {
                case '0':
                    $status = 'Unverified';
                    break;
                case '1':
                    $status = 'Verified';
                    break;
                default:
                    $status = '  -';
                    break;
            }



            $content .= '<tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-left">'  . $data['account_number'] . '</td>
                        <td class="border-right text-center">' . date('d/m/Y', strtotime($data['transaction_date'])) . '</td>
                        <td class="border-right text-center">' . $data['transaction_code_original'] . '</td>
                        <td  class="border-right text-left" style="width:200px">' . $data['description'] . '</td>
                        <td class="border-right text-left">' . $data['reference'] . '</td>
                        <td class="border-right text-center">' . $debit_credit_flag . '</td>
                        <td class="border-right text-right">' . number_format($data['amount'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . $data['balance'] . '</td>
                        <td class="border-right text-left">' . $status . '</td>
                    
                    </tr>';

            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '</tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->
        
        </page>
        <!-- END PAGE -->';
        // START pdf
        $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
        $html2pdf->pdf->SetDisplayMode('fullpage');

        ob_start();

        $html2pdf->writeHTML($content);
        $html2pdf->output('Report Current Account Transaction' . date('YmdHis') . '.pdf', 'D');
    }

    /** 
     * Transaction | Accounting | Journal Verify
     * Hakim Desyanto
     * 2023-01-18
     */
    function print_journal_voucher_batch2()
    {
        $vno = $this->request->getVar('vno');
        if (isset($vno)) {
            $arr_vno = json_decode($vno, true);

            $datas = $this->ReportModel->get_journal_transaction_by_vouchers_no($arr_vno);
            $company = $this->ReportModel->get_company_data();
            $company_logo = $company['company_logo'];
            $officer2 = $company['officer2'];
            $occupation2 = $company['occupation2'];
            $signature2 = $company['signature2'];
            $officer3 = $company['officer3'];
            $occupation3 = $company['occupation3'];
            $signature3 = $company['signature3'];
            // echo "<pre>";
            // print_r($arr_vno);
            // print_r($datas);
            // die(); 
            if (count($datas) == 0) {
                //show_404();
            } else {
                // START pdf
                ob_start();
                if (count($datas) > 0) {
                    for ($i = 0; $i < count($datas); $i++) {
                        $data['data'] = $datas[$i];
                        $data['company_logo'] = $company_logo;
                        $data['officer2'] = $officer2;
                        $data['occupation2'] = $occupation2;
                        $data['signature2'] = $signature2;
                        $data['officer3'] = $officer3;
                        $data['occupation3'] = $occupation3;
                        $data['signature3'] = $signature3;
                        $data['detail'] = $this->ReportModel->get_journal_transaction_by_voucher_no($datas[$i]['voucher_no']);
                        //$this->load->view('Admin/Pdf/Journal_voucher', $data);
                    }
                }

                view('Admin/Pdf/Journal_voucher', $data);
                //$content = ob_get_clean();

                try {
                    $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
                    $html2pdf->pdf->SetDisplayMode('fullpage');

                    //  ob_start();
                    // include '../../../Views/Admin/Pdf/Deposit_report.php';

                    $content = ob_get_contents();


                    $html2pdf->writeHTML($content);
                    //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
                    $html2pdf->output('Journal Verify ' . date('YmdHis') . '.pdf', 'D');
                } catch (Html2PdfException $e) {
                    $html2pdf->clean();

                    $formatter = new ExceptionFormatter($e);
                    echo $formatter->getHtmlMessage();
                    // echo $e;
                    // exit;
                }


                // try {
                //     $filename = 'REPORT.pdf';
                //     $html2pdf = new HTML2PDF('P', 'A4', 'fr', true, 'UTF-8', 5);
                //     $html2pdf->pdf->SetDisplayMode('fullpage');
                //     $html2pdf->writeHTML($content, isset($_GET['vuehtml']));
                //     $html2pdf->Output($filename);
                // } catch (\HTML2PDF_exception $e) {
                //     echo $e;
                //     exit;
                // }
            }
        } else {
            show_404();
        }
    }

    function print_journal_voucher_batch1()
    {
        $vno = $this->request->getVar('vno');
        // if (isset($vno)) {
        $arr_vno = json_decode($vno, true);

        $datas = $this->ReportModel->get_journal_transaction_by_vouchers_no($arr_vno);
        $company = $this->ReportModel->get_company_data();
        $company_logo = $company['company_logo'];
        $officer2 = $company['officer2'];
        $occupation2 = $company['occupation2'];
        $signature2 = $company['signature2'];
        $officer3 = $company['officer3'];
        $occupation3 = $company['occupation3'];
        $signature3 = $company['signature3'];
        // echo "<pre>";
        // print_r($arr_vno);
        // print_r($datas);
        // die(); 
        // if (count($datas) == 0) {
        //     //show_404();
        // } else {
        // START pdf
        //ob_start();
        // if (count($datas) > 0) {
        //     for ($i = 0; $i < count($datas); $i++) {

        //         $data = $datas[$i];
        //         $company_logo = $company_logo;
        //         $officer2 = $officer2;
        //         $occupation2 = $occupation2;
        //         $signature2 = $signature2;
        //         $officer3 = $officer3;
        //         $occupation3 = $occupation3;
        //         $signature3 = $signature3;
        //         $detail = $this->ReportModel->get_journal_transaction_by_voucher_no($datas[$i]['voucher_no']);
        //     }
        // }
        //return view('Admin/Pdf/Journal_voucher', $data);
        $content = "";
        $content .= '<style>';
        $content .= '    page {
                        font-size: 12px;
                    }

                    .table {
                        border-left: solid 1px #ccc;
                        border-right: solid 1px #ccc;
                        padding: 0;
                        margin: 0;
                    }

                    .table thead tr th {
                        border-top: solid 1px #ccc;
                        border-bottom: solid 1px #ccc;
                        font-size: 10px;
                        font-weight: bold;
                        text-align: center;
                        padding: 5px 10px;
                    }

                    .table tbody tr td {
                        border-bottom: solid 1px #ccc;
                        padding: 3px;
                        font-size: 10px;
                    }

                    .text-left {
                        font-size: 9px;
                        text-align: left;
                        white-space: normal;
                    }

                    .text-right {
                        font-size: 9px;
                        text-align: right;
                        white-space: normal;
                    }

                    .text-center {
                        font-size: 9px;
                        text-align: center;
                        white-space: normal;
                    }

                    .border-left {
                        border-left: solid 1px #ccc;
                    }

                    .border-right {
                        border-right: solid 1px #ccc;
                    }

                    .text-bold {
                        font-weight: bold;
                    }';
        $content .= '</style>';

        $content .= '<page backbottom="15" backtop="10" backleft="4" backright="0">
                    <div>
                        <img src="' . base_url() . '/assets/admin/img/cp-logo/' . $company_logo . '" height="60">
                        <h4 style="width:700px;text-align:center;">JURNAL MEMORIAL VOUCHER</h4>
                        <br />
                        <table cellspacing="5" cellpadding="0" border="0">
                            <tr>
                                <td width="150">Voucher Number</td>
                                <td width="10">:</td>
                                <td width="580">' . $datas[0]['voucher_no'] . '</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>
                                    <div style="width:700px;text-align:justify;">' . $datas[0]['description'] . '</div>
                                </td>
                            </tr>
                            <tr>
                                <td>Transaction Date</td>
                                <td>:</td>
                                <td>
                                    <div style="width:700px;text-align:justify;">' . date('d-m-Y', strtotime($datas[0]['voucher_date'])) . '</div>
                                </td>
                            </tr>
                        </table>

                        <br />

                        <table cellspacing="0" cellpadding="0" border="0" class="table">
                            <thead>
                                <tr>
                                    <th valign="mid" class="border-left border-right" align="center">NO</th>
                                    <th valign="mid" class="border-right" align="center" width="100">ACCOUNT CODE</th>
                                    <th valign="mid" class="border-right" align="center" width="280">ACCOUNT NAME</th>
                                    <th valign="mid" class="border-right" align="center" width="62">DEBIT</th>
                                    <th valign="mid" class="border-right" align="center" width="62">CREDIT</th>
                                </tr>
                            </thead>
                            <tbody>';
        $no = 1;
        $totalDebit = 0;
        $totalCredit = 0;
        if (count($datas) > 0) {

            for ($i = 0; $i < count($datas); $i++) {

                $data = $datas[$i];
                $detail = $this->ReportModel->get_journal_transaction_by_voucher_no($datas[$i]['voucher_no']);

                foreach ($detail as $dt) :
                    $debit = ($dt['debit_credit_flag'] == 'D') ? $dt['orig_amount'] : 0;
                    $credit = ($dt['debit_credit_flag'] == 'C') ? $dt['orig_amount'] : 0;

                    $content .= '                    <tr>';
                    $content .= '                        <td style="vertical-align:middle;text-align:center;" class="border-left border-right" align="center">' . $no . '</td>';
                    $content .= '                        <td style="vertical-align:middle;text-align:center;" class="border-right" align="center">' . $dt['gl_account_no'] . '</td>
                                        <td class="border-right">
                                            <div style="width:320px;text-align:justify;">' . $dt['description'] . '</div>
                                        </td>
                                        <td style="vertical-align:middle;text-align:right;" class="border-right">' . number_format($debit, 2, ',', '.') . '</td>
                                        <td style="vertical-align:middle;text-align:right;" class="border-right">' . number_format($credit, 2, ',', '.') . '</td>
                                    </tr>';

                    $totalDebit += $debit;
                    $totalCredit += $credit;
                    $no++;
                endforeach;
            }
        }
        $content .= '                <tr>
                                    <td class="border-right border-left text-bold" align="right" colspan="3">Total : </td>
                                    <td class="border-right text-bold" align="right">' . number_format($totalDebit, 2, ',', '.') . '</td>
                                    <td class="border-right text-bold" align="right">' . number_format($totalCredit, 2, ',', '.') . '</td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <br />

                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td></td>
                                <td></td>
                                <td align="center">Jakarta , ' . date('d-m-Y') . '<br></td>
                            </tr>
                            <tr>
                                <td align="center" width="300">Disiapkan Oleh,</td>
                                <td width="100"> &nbsp; </td>
                                <td align="center" width="300">Disetujui Oleh,</td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <br />';
        if ($signature2 != "") {
            $content .= '                                <img src="' . base_url() . '/assets/admin/img/cp-signature/' . $signature2 . '" width="100">';
        } else {
            $content .= '                            <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />';
        }
        $content .= '                        <br />
                                </td>
                                <td align="center"> &nbsp; </td>
                                <td align="center">
                                    <br />';
        if ($signature3 != "") {
            $content .= '                                <img src="' . base_url() . '/assets/admin/img/cp-signature/' . $signature3 . '" width="100">';
        } else {
            $content .= '                                <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />';
        }
        $content .= '                            <br />
                                </td>
                            </tr>
                            <tr>
                                <td align="center"> ( ' . $officer2 . ' ) </td>
                                <td></td>
                                <td align="center"> ( ' . $officer3 . ' ) </td>
                            </tr>
                        </table>
                    </div>
                </page>';

        //dd($content);
        //return view('Admin/Pdf/coba');

        try {
            $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Journal Verify ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }

    function print_journal_voucher_batch()
    {
        $vno = $this->request->getVar('vno');
        // if (isset($vno)) {
        $arr_vno = json_decode($vno, true);

        $datas = $this->ReportModel->get_journal_transaction_by_vouchers_no($arr_vno);
        $company = $this->ReportModel->get_company_data();
        $company_logo = $company['company_logo'];
        $officer2 = $company['officer2'];
        $occupation2 = $company['occupation2'];
        $signature2 = $company['signature2'];
        $officer3 = $company['officer3'];
        $occupation3 = $company['occupation3'];
        $signature3 = $company['signature3'];


        // $logo = base_url("assets/admin/img/cp-logo/'  . $company_logo '");
        $logo = "assets/admin/img/cp-logo/"  . $company_logo;
        $sign1 = "assets/admin/img/cp-signature/"  . $signature2;
        $sign2 = "assets/admin/img/cp-signature/"  . $signature3;
        $content = "";
        $content .= '<style>';
        $content .= '    page {
                        font-size: 12px;
                    }

                    .table {
                        border-left: solid 1px #ccc;
                        border-right: solid 1px #ccc;
                        padding: 0;
                        margin: 0;
                    }

                    .table thead tr th {
                        border-top: solid 1px #ccc;
                        border-bottom: solid 1px #ccc;
                        font-size: 10px;
                        font-weight: bold;
                        text-align: center;
                        padding: 5px 10px;
                    }

                    .table tbody tr td {
                        border-bottom: solid 1px #ccc;
                        padding: 3px;
                        font-size: 10px;
                    }

                    .text-left {
                        font-size: 9px;
                        text-align: left;
                        white-space: normal;
                    }

                    .text-right {
                        font-size: 9px;
                        text-align: right;
                        white-space: normal;
                    }

                    .text-center {
                        font-size: 9px;
                        text-align: center;
                        white-space: normal;
                    }

                    .border-left {
                        border-left: solid 1px #ccc;
                    }

                    .border-right {
                        border-right: solid 1px #ccc;
                    }

                    .text-bold {
                        font-weight: bold;
                    }';
        $content .= '</style>';

        $content .= '<page backbottom="15" backtop="10" backleft="4" backright="0">
                    <div>
                        <img src="' . $logo . '" height="60">
                        <h4 style="width:700px;text-align:center;">JURNAL MEMORIAL VOUCHER</h4>
                        <br />
                        <table cellspacing="5" cellpadding="0" border="0">
                            <tr>
                                <td width="150">Voucher Number</td>
                                <td width="10">:</td>
                                <td width="580">' . $datas[0]['voucher_no'] . '</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>
                                    <div style="width:700px;text-align:justify;">' . $datas[0]['description'] . '</div>
                                </td>
                            </tr>
                            <tr>
                                <td>Transaction Date</td>
                                <td>:</td>
                                <td>
                                    <div style="width:700px;text-align:justify;">' . date('d-m-Y', strtotime($datas[0]['voucher_date'])) . '</div>
                                </td>
                            </tr>
                        </table>

                        <br />

                        <table cellspacing="0" cellpadding="0" border="0" class="table">
                            <thead>
                                <tr>
                                    <th valign="mid" class="border-left border-right" align="center">NO</th>
                                    <th valign="mid" class="border-right" align="center" width="100">ACCOUNT CODE</th>
                                    <th valign="mid" class="border-right" align="center" width="280">ACCOUNT NAME</th>
                                    <th valign="mid" class="border-right" align="center" width="62">DEBIT</th>
                                    <th valign="mid" class="border-right" align="center" width="62">CREDIT</th>
                                </tr>
                            </thead>
                            <tbody>';
        $no = 1;
        $totalDebit = 0;
        $totalCredit = 0;
        if (count($datas) > 0) {

            for ($i = 0; $i < count($datas); $i++) {

                $data = $datas[$i];
                $detail = $this->ReportModel->get_journal_transaction_by_voucher_no($datas[$i]['voucher_no']);

                foreach ($detail as $dt) :
                    $debit = ($dt['debit_credit_flag'] == 'D') ? $dt['orig_amount'] : 0;
                    $credit = ($dt['debit_credit_flag'] == 'C') ? $dt['orig_amount'] : 0;

                    $content .= '                    <tr>';
                    $content .= '                        <td style="vertical-align:middle;text-align:center;" class="border-left border-right" align="center">' . $no . '</td>';
                    $content .= '                        <td style="vertical-align:middle;text-align:center;" class="border-right" align="center">' . $dt['gl_account_no'] . '</td>
                                        <td class="border-right">
                                            <div style="width:320px;text-align:justify;">' . $dt['description'] . '</div>
                                        </td>
                                        <td style="vertical-align:middle;text-align:right;" class="border-right">' . number_format($debit, 2, ',', '.') . '</td>
                                        <td style="vertical-align:middle;text-align:right;" class="border-right">' . number_format($credit, 2, ',', '.') . '</td>
                                    </tr>';

                    $totalDebit += $debit;
                    $totalCredit += $credit;
                    $no++;
                endforeach;
            }
        }
        $content .= '                <tr>
                                    <td class="border-right border-left text-bold" align="right" colspan="3">Total : </td>
                                    <td class="border-right text-bold" align="right">' . number_format($totalDebit, 2, ',', '.') . '</td>
                                    <td class="border-right text-bold" align="right">' . number_format($totalCredit, 2, ',', '.') . '</td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <br />

                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td></td>
                                <td></td>
                                <td align="center">Jakarta , ' . date('d-m-Y') . '<br></td>
                            </tr>
                            <tr>
                                <td align="center" width="300">Disiapkan Oleh,</td>
                                <td width="100"> &nbsp; </td>
                                <td align="center" width="300">Disetujui Oleh,</td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <br />';
        if ($signature2 != "") {
            $content .= '                                <img src="' . $sign1 . '" width="100">';
        } else {
            $content .= '                            <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />';
        }
        $content .= '                        <br />
                                </td>
                                <td align="center"> &nbsp; </td>
                                <td align="center">
                                    <br />';
        if ($signature3 != "") {
            $content .= '                                <img src="' . $sign2 . '" width="100">';
        } else {
            $content .= '                                <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />';
        }
        $content .= '                            <br />
                                </td>
                            </tr>
                            <tr>
                                <td align="center"> ( ' . $officer2 . ' ) </td>
                                <td></td>
                                <td align="center"> ( ' . $officer3 . ' ) </td>
                            </tr>
                        </table>
                    </div>
                </page>';

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Journal Verify ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Journal Verify */

    /**
     * Report | Portofolio Statement | Current Account Portfolio
     * Hakim Desyanto
     * 2023-01-24
     */
    function report_cash_portofolio($valuation_date, $fund_code, $bank_name)
    {
        $valuation_date = ($valuation_date == "-") ? '' : $valuation_date;
        $fund_code = ($fund_code == "-") ? '' : $fund_code;
        $bank_name = ($bank_name == "-") ? '' : $bank_name;

        if ($valuation_date != "") {
            $valuation_date = $this->DatepickerToEn($valuation_date);
        }

        $datas = $this->ReportModel->jqgrid_report_cash_portofolio('', '', '', '', $valuation_date, $fund_code, $bank_name);

        $content = "";
        $content .= '<style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>
        <!-- END PAGE STYLE -->
        
        <!-- START PAGE -->
        <page backbottom="15" backtop="10" backleft="10" backright="10">
        
        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->
        
        <!-- START title  -->
        <div class="title">
        Cash Portofolio
        </div>
        <!-- END title -->
        
        <!-- START body -->
        <div class="body">
        
            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="100" class="border-right">FUND GROUP CODE</th>
                        <th width="" class="border-right">ACCOUNT NUMBER</th>
                        <th width="" class="border-right">AMOUNT</th>
                        <th width="" class="border-right">BANK NAME</th>
                        <th width="" class="border-right">BRANCH NAME</th>
                        <th width="" class="border-right">BANK TYPE</th>
                        <th width="" class="border-right">SHARIA FLAG</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->
                <tbody>';

        // untuk penomoran
        $nomor = 1;
        foreach ($datas as $data) :

            // START looping data
            // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf


            $content .= '            <tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-left">' . $data['fund_group_code'] . '</td>
                        <td class="border-right text-left">' . $data['account_number'] . '</td>
                        <td class="border-right text-right">' . number_format($data['amount'], 0, ',', '.') . '</td>
                        <td class="border-right text-left">' . $data['bank_name'] . '</td>
                        <td class="border-right text-left">' . $data['branch_name'] . '</td>
                        <td class="border-right text-left">' . $data['bank_type'] . '</td>
                        <td class="border-right text-left">' . $data['sharia_flag'] . '</td>
                    </tr>';

            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '        </tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->
        
        </page>
        <!-- END PAGE -->';

        try {
            $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Current Account Portofolio - ' . $fund_code . ' - ' . $bank_name . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Current Account Portfolio */

    /**
     * Report | Portofolio Statement | Time Deposit Portfolio
     * Hakim Desyanto
     * 2023-01-25
     */
    function report_deposito_portofolio($valuation_date, $fund_code, $bank_name)
    {
        // $valuation_date = $this->request->getVar('valuation_date');
        // $fund_code = $this->request->getVar('fund_code');
        // $bank_name = $this->request->getVar('bank_name');

        $valuation_date = ($valuation_date == "-") ? '' : $valuation_date;
        $fund_code = ($fund_code == "-") ? '' : $fund_code;
        $bank_name = ($bank_name == "-") ? '' : $bank_name;

        if ($valuation_date != "") {
            $valuation_date = $this->DatepickerToEn($valuation_date);
        }

        $datas = $this->ReportModel->jqgrid_report_deposito_portofolio('', '', '', '', $valuation_date, $fund_code, $bank_name);

        $content = "";
        $content .= '<!-- START PAGE STYLE -->
        <style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
            vertical-align: bottom;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
            vertical-align: bottom;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>';

        $content .= '<page backbottom="15" backtop="10" backleft="5" backright="10">

        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->

        <!-- START title  -->
        <div class="title">
        Deposito Portofolio
        </div>
        <!-- END title -->

        <!-- START body -->
        <div class="body">

            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="30" class="border-right">FUND<br>CODE</th>
                        <th width="" class="border-right">ACCOUNT NUMBER</th>
                        <th width="" class="border-right">AMOUNT</th>
                        <th width="" class="border-right">DUE RETURN</th>
                        <th width="40" class="border-right">PAID<br>RETURN</th>
                        <th width="100" class="border-right">BANK NAME</th>
                        <th width="" class="border-right">BRANCH NAME</th>
                        <th width="" class="border-right">BANK TYPE</th>
                        <th width="" class="border-right">SHARIA FLAG</th>
                        <th width="" class="border-right">BREAK DATE</th>
                        <th width="50	" class="border-right">MATURITY DATE</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->';
        $content .= '        <tbody>';

        // untuk penomoran
        $nomor = 1;
        foreach ($datas as $data) :

            // START looping data
            // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf


            $content .= '            <tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-left">' . $data['fund_group_code'] . '</td>
                        <td class="border-right text-left">' . $data['account_number'] . '</td>
                        <td class="border-right text-right">' . number_format($data['amount'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['due_return'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['paid_return'], 0, ',', '.') . '</td>
                        <td class="border-right text-left"><div  style="white-spacing:normal;width:150px;">' . $data['bank_name'] . '</div></td>
                        <td class="border-right text-left">' . $data['branch_name'] . '</td>
                        <td class="border-right text-left">' . $data['bank_type'] . '</td>
                        <td class="border-right text-left">' . $data['sharia_flag'] . '</td>
                        <td class="border-right text-center">' . $data['break_date'] . '</td>
                        <td class="border-right text-center">' . $data['maturity_date'] . '</td>
                        </tr>';

            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '        </tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->

        </page>
        <!-- END PAGE -->';

        try {
            $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Time Deposit Portofolio - ' . $fund_code . ' - ' . $bank_name . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Time Deposit Portfolio */

    /**
     * Report | Portofolio Statement |Bond Portfolio
     * Hakim Desyanto
     * 2023-01-25
     */
    function report_bond_portofolio($fund, $emiten)
    {

        $fund = ($fund == '-') ? '' : $fund;
        $emiten = ($emiten == '-') ? '' : $emiten;
        $datas = $this->ReportModel->jqgrid_report_bond_portofolio('', '', '', '', $fund, $emiten);

        $content = "";
        $content .= '<!-- START PAGE STYLE -->
        <style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>
        <!-- END PAGE STYLE -->
        
        <!-- START PAGE -->
        <page backbottom="15" backtop="10" backleft="10" backright="10">
        
        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->
        
        <!-- START title  -->
        <div class="title">
        Bond Portofolio
        </div>
        <!-- END title -->
        
        <!-- START body -->
        <div class="body">
        
            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="" class="border-right">FUND GROUP</th>
                        <th width="" class="border-right">EMITEN</th>
                        <th width="" class="border-right">CLASIFICATION</th>
                        <th width="" class="border-right">BROKER</th>
                        <th width="" class="border-right">TOTAL BUY</th>
                        <th width="" class="border-right">TOTAL SELL</th>
                        <th width="" class="border-right">AVAILABLE</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->
                <tbody>';
        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :

            // get desc of bank_type


            $content .= '            <tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-center">' . $data['fund_group_name'] . '</td>
                        <td class="border-right text-left">' . $data['emiten'] . '</td>
                        <td class="border-right text-center">' . $data['classification'] . '</td>
                        <td class="border-right text-left">' . $data['broker'] . '</td>
                        <td class="border-right text-right">' . number_format($data['total_buy'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['total_sell'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['available'], 0, ',', '.') . '</td>
                    </tr>';




            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '        </tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->
        
        </page>
        <!-- END PAGE -->';

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Bond Portofolio - ' . $fund . ' - ' . $emiten . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Bond Portfolio */

    /**
     * Report | Portofolio Statement |Bond Portfolio
     * Hakim Desyanto
     * 2023-01-25
     */
    function report_mf_portofolio($fund, $emiten)
    {

        $fund = ($fund == '-') ? '' : $fund;
        $emiten = ($emiten == '-') ? '' : $emiten;
        $datas = $this->ReportModel->jqgrid_report_mf_portofolio('', '', '', '', $fund, $emiten);

        $content = "";
        $content .= '<!-- START PAGE STYLE -->
        <style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
            vertical-align: bottom;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>
        <!-- END PAGE STYLE -->

        <!-- START PAGE -->
        <page backbottom="15" backtop="10" backleft="10" backright="10">

        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->

        <!-- START title  -->
        <div class="title">
        Mutual Fund Portofolio
        </div>
        <!-- END title -->

        <!-- START body -->
        <div class="body">

            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="" class="border-right">FUND GROUP</th>
                        <th width="100" class="border-right">FUND MANAGER</th>
                        <th width="" class="border-right">CLASIFICATION</th>
                        <!-- <th width="" class="border-right">BROKER</th> -->
                        <th width="" class="border-right">TOTAL BUY</th>
                        <th width="" class="border-right">TOTAL SELL</th>
                        <th width="" class="border-right">AVAILABLE</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->
                <tbody>';

        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :

            // get desc of bank_type


            $content .= '            <tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-center">' . $data['fund_group_name'] . '</td>
                        <td class="border-right text-left"><div style="white-space:normal;width:230px;">' . $data['fm_name'] . '</div></td>
                        <td class="border-right text-center">' . $data['classification'] . '</td>
                     
                        <td class="border-right text-right">' . number_format($data['total_buy'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['total_sell'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['available'], 0, ',', '.') . '</td>
                    </tr>';




            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '        </tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->

        </page>
        <!-- END PAGE -->';

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Mutual Fund Portofolio - ' . $fund . ' - ' . $emiten . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Mutual Fund Portfolio */

    /**
     * Report | Portofolio Statement |Bond Portfolio
     * Hakim Desyanto
     * 2023-01-25
     */
    function stock_portofolio($fund, $emiten)
    {

        $fund = ($fund == '-') ? '' : $fund;
        $emiten = ($emiten == '-') ? '' : $emiten;
        $datas = $this->ReportModel->jqgrid_stock_portofolio('', '', '', '', $fund, $emiten);

        $content = "";
        $content .= '<style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>
        <!-- END PAGE STYLE -->
        
        <!-- START PAGE -->
        <page backbottom="15" backtop="10" backleft="10" backright="10">
        
        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->
        
        <!-- START title  -->
        <div class="title">
        STOCK PORTOFOLIO
        </div>
        <!-- END title -->
        
        <!-- START body -->
        <div class="body">
        
            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="" class="border-right">FUND GROUP</th>
                        <th width="" class="border-right">EMITEN</th>
                        <th width="" class="border-right">CLASIFICATION</th>
                        <th width="" class="border-right">BROKER</th>
                        <th width="" class="border-right">TOTAL BUY</th>
                        <th width="" class="border-right">TOTAL SELL</th>
                        <th width="" class="border-right">AVAILABLE</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->
                <tbody>';
        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :

            // get desc of bank_type

            $content .= '            <tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-center">' . $data['fund_group_name'] . '</td>
                        <td class="border-right text-left">' . $data['emiten'] . '</td>
                        <td class="border-right text-center">' . $data['classification'] . '</td>
                        <td class="border-right text-left">' . $data['broker'] . '</td>
                        <td class="border-right text-right">' . number_format($data['total_buy'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['total_sell'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['available'], 0, ',', '.') . '</td>
                    </tr>';




            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '        </tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->
        
        </page>
        <!-- END PAGE -->';

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Stock Portofolio - ' . $fund . ' - ' .  $emiten . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of Mutual Fund Portfolio */

    /**
     * Report | Portofolio Statement |Bond Portfolio
     * Hakim Desyanto
     * 2023-01-25
     */
    function report_etf_portofolio($fund, $emiten)
    {

        $fund = ($fund == '-') ? '' : $fund;
        $emiten = ($emiten == '-') ? '' : $emiten;
        $datas = $this->ReportModel->jqgrid_report_etf_portofolio('', '', '', '', $fund, $emiten);

        $content = "";
        $content .= '<style type="text/css">
        .title {
            font-size: 15px;
            font-weight:bold;
            text-align:center;
            padding-bottom:20px;
            border-bottom:solid 1px #aaa;
        }
        .body {
            padding-top: 20px;
        }
        .footer {
            font-size: 10px;
            font-weight:bold;
            text-align:center;
        }
        .table {
            border-left: solid 1px #ccc;
            border-right: solid 1px #ccc;
            padding:0;
            margin:0;
        }
        .table thead tr th {
            border-top: solid 1px #ccc;
            border-bottom: solid 1px #ccc;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            padding:5px 10px;
        }
        .table tbody tr td {
            border-bottom: solid 1px #ccc;
            padding: 3px;
        }
        .text-left {
            font-size: 9px;
            text-align: left;
            white-space: normal;
        }
        .text-right {
            font-size: 9px;
            text-align: right;
            white-space: normal;
        }
        .text-center {
            font-size: 9px;
            text-align: center;
            white-space: normal;
        }
        .border-right {
            border-right: solid 1px #ccc;
        }
        </style>
        <!-- END PAGE STYLE -->
        
        <!-- START PAGE -->
        <page backbottom="15" backtop="10" backleft="10" backright="10">
        
        <!-- START PAGE FOOTER -->
        <page_footer><div class="footer">([[page_cu]])</div></page_footer>
        <!-- END PAGE FOOTER -->
        
        <!-- START title  -->
        <div class="title">
        ETF Portofolio
        </div>
        <!-- END title -->
        
        <!-- START body -->
        <div class="body">
        
            <!-- START table data -->
            <table class="table" cellspacing="0" cellpadding="0" align="center">
                <!--
                START table header
                - width="" = width otomatis
                -->
                <thead>
                    <tr>
                        <th width="" class="border-right">NO</th>
                        <th width="" class="border-right">FUND GROUP</th>
                        <th width="" class="border-right">EMITEN</th>
                        <th width="" class="border-right">CLASIFICATION</th>
                        <th width="" class="border-right">BROKER</th>
                        <th width="" class="border-right">TOTAL BUY</th>
                        <th width="" class="border-right">TOTAL SELL</th>
                        <th width="" class="border-right">AVAILABLE</th>
                    </tr>
                </thead>
                <!-- END table header -->
                <!--
                START table body
                #class text-center = rata tengah (note: class text-center untuk kode dan semacamnya)
                #class text-left = rata kiri (note: class text-left untuk format text biasa)
                #class text-right = rata kanan (note: class text-right untuk format currency)
                #class border-right = buat border dikanan (note: gunakan border-right disemua tag <td....>  kecuali <td....> terakhir)
                -->
                <tbody>';

        // untuk penomoran
        $nomor = 1;

        // START looping data
        // $datas adalah variable yg dikirimkan pada variable yang ada di controller pdf
        foreach ($datas as $data) :

            // get desc of bank_type


            $content .= '            <tr>
                        <td class="border-right text-center">' . $nomor . '</td>
                        <td class="border-right text-center">' . $data['fund_group_name'] . '</td>
                        <td class="border-right text-left">' . $data['emiten'] . '</td>
                        <td class="border-right text-center">' . $data['classification'] . '</td>
                        <td class="border-right text-left">' . $data['broker'] . '</td>
                        <td class="border-right text-right">' . number_format($data['total_buy'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['total_sell'], 0, ',', '.') . '</td>
                        <td class="border-right text-right">' . number_format($data['available'], 0, ',', '.') . '</td>
                    </tr>';




            $nomor++; // add nomor
        endforeach;
        // END looping data

        $content .= '        </tbody>
                <!-- END table body -->
            </table>
            <!-- END table data -->
        </div>
        <!-- END body -->
        
        </page>
        <!-- END PAGE -->';

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('ETF Portofolio - ' . $fund . ' - ' .  $emiten . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    /** end of ETF Portfolio */

    /** 
     * Transaction | Bond | Print Letter
     * Hakim Desyanto
     * 2023-02-27
     */
    public function surat_bond_transaction($id, $sell_buy_flag)
    {
        // ambil data untuk ditampilkan di pdf
        $data = $this->ReportModel->surat_bond_transaction($id, $sell_buy_flag);

        /** jika no surat masih kosong maka buatkan nomor surat */
        if ($data['no_surat'] == Null) {
            $no_surat_terakhir = $this->get_no_surat_terakhir();
            if ($no_surat_terakhir == Null) {
                $no_surat = '1';
            } else {
                $no_surat = ((int)substr($no_surat_terakhir, 0, 3)) + 1;
            }
            switch (substr($data['tgl_surat'], 5, 2)) {
                case "01":
                    $month = "I";
                    break;
                case "02":
                    $month = "II";
                    break;
                case "03":
                    $month = "III";
                    break;
                case "04":
                    $month = "IV";
                    break;
                case "05":
                    $month = "V";
                    break;
                case "06":
                    $month = "VI";
                    break;
                case "07":
                    $month = "VII";
                    break;
                case "08":
                    $month = "VIII";
                    break;
                case "09":
                    $month = "IX";
                    break;
                case "10":
                    $month = "X";
                    break;
                case "11":
                    $month = "XI";
                    break;
                case "12":
                    $month = "XII";
                    break;
            }

            $year = substr($data['tgl_surat'], 0, 4);

            if (strlen($no_surat) == 1) {
                $no_surat = '00' . $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            } elseif (strlen($no_surat) == 2) {
                $no_surat = '0' . $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            } else {
                $no_surat = $no_surat . '/AGA-DIR-INV/' . $month . '/' . $year;
            }

            /** update no_surat_placement di inv_deposit_account*/
            $this->db->transBegin();
            if ($sell_buy_flag == 'S') {
                $this->db->query('update inv_bond_transaction_sell set no_surat=? where id=?', array($no_surat, $id));
            } else {
                $this->db->query('update inv_bond_transaction_buy set no_surat=? where id=?', array($no_surat, $id));
            }
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
            } else {
                $this->db->transRollback();
            }


            /** insert data baru ke inv_master_surat*/
            $uuid = $this->BaseModel->get_uuid();
            $data = array(
                'id' => $uuid,
                'no_surat' => $no_surat,
                'perihal' => 'INSTRUKSI PEMBELIAN SUKUK',
                'created_date' => date("Y-m-d H:i:s")
            );

            $this->db->transBegin();
            $this->ReportModel->insert_master_surat($data);
            if ($this->db->transStatus() === true) {
                $this->db->transCommit();
            } else {
                $this->db->transRollback();
            }
            $data = $this->ReportModel->surat_bond_transaction($id, $sell_buy_flag);
        }

        $pejabat1 = $this->get_master_code_row('SURAT', 'DEP_OPEN_1');
        $pejabat2 = $this->get_master_code_row('SURAT', 'DEP_OPEN_2');

        $company = $this->get_company();
        if ($data['bond_code'] == "") {
            $data1 = "-";
        } else {
            $data1 = $data['bond_code'];
        }

        $jatuh_tempo = date('d-m-Y', strtotime($data['tgl_surat']));
        if ($data['bond_code'] == 'ARO') $jatuh_tempo = 'ARO';

        $data2 = number_format($data['par_amount'], 0, ',', '.') . ',-';
        $data3 = '( '  . $this->terbilang($data['par_amount']) . ' Rupiah )';

        $open_date = ($data['tgl_surat'] == "") ? "-" : $data['tgl_surat'];

        $bank_name =  ($data['bond_code'] == "") ? "-" : $data['bond_code'];
        $account_name = ($data['bond_code'] == "") ? "-" : $data['bond_code'];
        $account_for_return = ($data['bond_code'] == "") ? "-" : $data['bond_code'];

        $background = base_url("assets/admin/layout/images/logo.png");
        $daun = "assets/admin/layout/images/watermark_daun.jpg";
        $kop = "assets/admin/layout/images/amanahgitha.jpg";
        $footer = "assets/admin/layout/images/footer_aga_2.png";

        $type = $data['sell_buy_flag'] == 'B' ? 'BUY' : 'SELL';
        if ($sell_buy_flag == 'S') {
            $data4 = "Dana tersebut mohon untuk ditransfer ke rekening kami sebagai berikut:";
            $perihal = "HAL : INSTRUKSI PENJUALAN SUKUK";
            $custodyan = ' <table cellspacing="0" cellpadding="0" border="0">                                   
            <tr >
                <td >No. Rek. Kustodian</td>
                <td >: ' . $bank_name . ' - ' . $data['bond_code'] . '</td>       
            </tr>
            <tr>
                <td style="width:120px;">C-Best</td>
                <td>: ' . $account_name . '</td>
            </tr>
            <tr>
                <td>Nama Rekening</td>
                <td>: ' . $account_for_return . '</td>                          
            </tr>            
        </table>';
        } else {
            $data4 = "Dana tersebut akan kami transfer ke rekening sebagai berikut:";
            $perihal = "HAL : INSTRUKSI PEMBELIAN SUKUK SERI";
            $custodyan = '';
        }

        if ($data['maturity_date'] == null || $data['maturity_date'] == '') {
            $maturity_date = $data['maturity_date'];
        } else {
            $maturity_date = date('d-m-Y', strtotime($data['maturity_date']));
        }


        $content = '<style type="text/css">
          table{
              margin: 0;
              padding: 0;
          }
          table.body{
              /*margin: 20px 20px 20px 50px;*/
                  margin: 20px 20px 20px 0px;
              padding: 0;
          }
          tr{
              padding: 0;
              margin: 0;
          }
          td{
              vertical-align: top;
              line-height: 18px;
          }
          td.header{
              padding: 0 0 0 20px;
              margin: 0;
              width: 580px;
          }
          table {
              width: 700px;
          }
          table.padding5 td{
              padding: 5px;
          }
          table.paddingbot3 td{
              padding: 0 0 3px 0;
          }
          table.table{
              padding-left: 10px;
          }
          h1,h2,h3,h4{
              margin:3px 0;
              padding:0;
              text-align: center;
          }
          .font14{
              font-size:14px;
              line-height: 18px;
          }
          .font16{
              font-size:16px;
              line-height: 18px;
          }
          .justify{
              text-align: justify;
          }
          .center{
              text-align: center;
          }
          ul{
              padding-top:0px;
              padding-left:0px;
              padding-right:0px;
              padding-bottom:0px;
              margin-top:0px;
              margin-left:0px;
              margin-right:0px;
              margin-bottom:0px;
              }
          ul li{
              padding-top:0px;
              padding-left:0px;
              padding-right:0px;
              padding-bottom:0px;
              margin-top:0px;
              margin-left:0px;
              margin-right:0px;
              margin-bottom:0px;
              }
          #ttd{
              font-size:12px;
          } 
          
          #footer {
             margin: 0 !important;
             position:absolute;
             bottom:0;
             width:100%;
             text-align: left;  
             font-size: 9px;             
          }         
          
          #container1 {
              position: relative;
              width: 900px;
              padding-top: 100              
          }
          
          #container2 {    
              position: absolute;
              top: 0px;
              left: 0px;
          }
          
          </style>
          <!-- END PAGE STYLE -->
  
          <!-- START PAGE -->
          <page backleft="17mm" backtop="10mm" backright="15mm" style="font-size:12px;line-height:18px">
              <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->        
              <div id="container1">
                  <img style="width:400px;height:900px;top:200; right: 50;margin-left:200;overflow:hidden; "  src="' . $daun . '"/>
                  <div id="container2">
                      <!-- START title  -->
                      <div class="title">                
                          <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                  <td colspan="4" style="width:600px;>
                                      <img style="width:190px;height:50px;valign:top" src="' . $kop  . '"/>
                                  </td>
                              </tr>
                              <tr>    
                                  <td colspan="2" style="width:600px;>
                                      <p>
                                      Jakarta, ' . date('d M Y', strtotime($data['tgl_surat'])) . '<br>
                                      No : ' .  $data['no_surat'] . '
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="2"  style="width:600px;>
                                      <p>
                                      <br>
                                      Kepada Yth.,<br>
                                      ' . $data['broker_name'] . '<br>
                                      ' . $data['bond_code'] . '<br>
                                      ' . $data['bond_code'] . ' ' . $data['bond_code'] . ' ' . $data['bond_code'] . '<br>
                                      Indonesia <br>
                                      Telp : ' . $data['bond_code'] . '
                                      </p>                                
                                      <p> UP : ' . $data['bond_code'] . ' ' . $data['bond_code'] . '( ' . $data['bond_code'] . ' )</p>
  
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <!-- END title -->
  
                      <!-- START body -->
                      <div class="body">
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:600px;">
                                      <p style="text-align:center;font-weight:bold;">'
            . $perihal
            . '</p>'
            . $custodyan


            . '<p>Assalamu' . "'" . 'alaikum Warahmatullah Wabarakatuh.</p>                                                           
                                      Semoga Allah SWT senantiasa melimpahkan rahmat, taufik, dan hidayah-Nya kepada kita semua dalam menjalankan aktivitas sehari-hari.
                                      
                                      <p>Dengan ini agar bank custodian dapat melakukan transaksi keuangan dengan rincian sebagia berikut:</p>
                                </td>
                            </tr>
                        </table>
                       
                        <p>
                        <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                  <td style="width:600px;">
                                          <table cellspacing="0" cellpadding="0" border="0">
                                              <tr>
                                                  <td style="width:120px;"> <strong>Type of Transaction</strong></td>
                                                  <td><strong>: ' .  $type . '</strong></td>
                                              </tr>                                       
                                              <tr>
                                                  <td><strong>Securities Name</strong></td>
                                                  <td><strong>: ' . $data['issuer']  . '</strong></td>
                                              </tr>
                                              <tr>
                                                  <td><strong>Imbal Hasil</strong> </td>
                                                  <td><strong>: ' . $data['coupon']  . ' % </strong></td>
                                              </tr>
                                              <tr>
                                                  <td><strong>Rating</strong> </td>
                                                  <td><strong>: ' . $data['rating'] . '</strong></td>
                                              </tr>
                                              <tr>
                                                <td><strong>Maturity Date</strong> </td>
                                                <td><strong>: ' . $maturity_date . '</strong></td>
                                              </tr>
                                              <tr>
                                                <td><strong>Trade Date</strong> </td>
                                                <td><strong>: ' . date('d-m-Y', strtotime($data['trade_date'])) . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Settlement Date</strong> </td>
                                                <td><strong>: ' .  date('d-m-Y', strtotime($data['settlement_date'])) . '</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Price</strong> </td>
                                                <td><strong>: ' . $data['price'] . ' %</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Nominal Value</strong> </td>
                                                <td><strong>: Rp. ' . number_format($data['par_amount'], 0, ',', '.') . ',-</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Settlement Amount</strong> </td>
                                                <td><strong>: Rp. ' . number_format($data['settlement_amount'], 0, ',', '.') . ',-</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Counterparty	</strong> </td>
                                                <td><strong>: ' . $data['broker_name']  . '</strong></td>
                                            </tr>
                                           
                                          </table>                                        
                                          <p>'
            . $data4
            . '</p>                                    
                                          <table cellspacing="0" cellpadding="0" border="0">                                   
                                              <tr >
                                                  <td >Nama Bank</td>
                                                  <td >: ' . $bank_name . ' - ' . $data['bond_code'] . '</td>       
                                              </tr>
                                              <tr>
                                                  <td style="width:120px;">Nama Rekening</td>
                                                  <td>: ' . $account_name . '</td>
                                              </tr>
                                              <tr>
                                                  <td>Nomor Rekening</td>
                                                  <td>: ' . $account_for_return . '</td>                          
                                              </tr>
                                              <tr>
                                                <td>Nominal</td>
                                                <td>: ' . $account_for_return . '</td>                          
                                            </tr>
                                          </table>
                                      
                                      <p>Untuk informasi lebih lanjut dapat menghubungi kami di nomor telepon 021-29406315 ext. 107 dengan sdri. Setriana</p>
                                      <p>Demikian kami sampaikan. Atas perhatian dan kerjasamanya kami sampaikan terima kasih.</p>
                                      <p>Wassalamu' . "'" . 'alaikum Warahmatullah Wabarakatuh.<br>
                                      <strong>' . $company['company_name'] . '</strong></p>
                                  </td>
                              </tr>
                          </table>
                          </p>
                          <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                  <td style="width:400px;height:20px;"> &nbsp; </td>
                                  <td style="width:300px;height:20px;"> &nbsp; </td>
                              </tr>
                              <tr>
                                  <td>
                                      <strong>' . @$pejabat1['code_value'] . '</strong><br>' . @$pejabat1['code_description'] . '
                                  </td>
                                  <td>
                                      <strong>' . @$pejabat2['code_value'] . '</strong><br>' . @$pejabat2['code_description'] . '
                                  </td>
                              </tr>
                          </table>                    
                          <table>
                              <tr>
                                  <td colspan="0">&nbsp;                                    
                                                      
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="0">
                                      <p style="font-weight: bold;font-size:10px;margin: 0 !important;text-align:left;"> PT. AJS AMANAHJIWA GIRI ARTHA</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="0">
                                      <p style="font-size:10px;margin: 0 !important;text-align:justify;">CROWN PALACE, Jl. Prof. Dr. Soepomo No.231 Blok A-3, Tebet, Jakarta Selatan, 12870,Tlp.(021) 29406315 (hunting) | Fax (021) 29406316</p>
                                  </td>
                              </tr>
                              <tr>
                                  <td colspan="0">
                                      <img style="width:100%;height:15px;" src="' . $footer . '"/>
                                  </td>
                              </tr>
                          </table>
                      </div> <!-- END body -->                    
                  </div> <!-- END Container2 -->
              </div> <!-- END Container1 -->
          </page>  <!-- END PAGE -->';


        //dd($content);

        try {
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Surat Penempatan Deposito ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
}
