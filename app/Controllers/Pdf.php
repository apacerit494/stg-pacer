<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\InvoiceModel;
use \App\Models\BaseModel;
use \App\Models\ReportModel;
use HTML5;

use Spipu\Html2Pdf\Html2Pdf;
use Spipu\Html2Pdf\Exception\Html2PdfException;
use Spipu\Html2Pdf\Exception\ExceptionFormatter;

class Pdf extends BaseController
{
    protected $InvoiceModel;
    protected $BaseModel;
    protected $db;
    protected $ReportModel;


    public function __construct()
    {
        $this->InvoiceModel = new InvoiceModel();
        $this->BaseModel = new BaseModel();
        $this->ReportModel = new ReportModel();
        $this->db = db_connect();
    }

    public function pdf_invoice()
    {

        $invoices = $this->InvoiceModel->get_data_invoices(user_id());
        $total_invoice = 0;
        foreach ($invoices as $invoice) :
            $total_invoice = $total_invoice + $invoice['total_invoice'];
        endforeach;
        $certification = $this->InvoiceModel->get_data_certification(user_id());
        $user = $this->InvoiceModel->get_data_user(user_id());

        $content = "";
        $content .= '<page backbottom="15" backtop="10" backleft="5" backright="5">';
        $content .= '<body>';
        $content .= '    <div class="wrapper">';
        $content .= '        <!-- Main content -->';
        $content .= '        <div class="invoice">';
        $content .= '            <!-- info row -->';
        $content .= '            <div class="row invoice-info">';
        $content .= '                <div class="col-sm-4 invoice-col">';
        $content .= '                    From';
        $content .= '                    <address>';
        $content .= '                        <strong>LSP PACER</strong><br>';
        $content .= '                        Jl. Gereja No. 9<br>';
        $content .= '                        Paledang - Bogor<br>';
        $content .= '                        Phone: (0251) 8340450<br>';
        $content .= '                        Email: amaryadhi@pacer.co.id';
        $content .= '                    </address>';
        $content .= '                </div>';
        $content .= '                <!-- /.col -->';
        $content .= '                <div class="col-sm-4 invoice-col">';
        $content .= '                    To';
        $content .= '                    <address>';
        $content .= '                        <strong>' . $user["full_name"] . '</strong><br>';
        $content .= '                        ' . $user["address"] . '<br>';
        $content .= '                        ' . $user["district_name"] . '<br>';
        $content .= '                        ' . $user["mobile_phone"] . '<br>';
        $content .= '                        ' . $user["email"];
        $content .= '                    </address>';
        $content .= '                </div>';
        $content .= '                <!-- /.col -->';
        $content .= '                <div class="col-sm-4 invoice-col">';
        $content .= '                    <b>No Invoice : ' . $invoices[0]["invoice_number"]  . '</b><br>';
        $content .= '                    <br>';
        $content .= '                    <b>Certification Number : ' . $certification['certification_number']  . '</b> <br>';
        $content .= '                    <b>Payment Due: ' . $invoices[0]['invoice_date']  . '</b> <br>';
        $content .= '                    <b>Account: 20202020202020</b>';
        $content .= '                </div>';
        $content .= '                <!-- /.col -->';
        $content .= '            </div>';
        $content .= '            <!-- /.row -->';
        $content .= '            <!-- Table row -->';
        $content .= '            <div class="row">';
        $content .= '                <div class="col-12 table-responsive">';
        $content .= '                    <table class="table table-striped">';
        $content .= '                        <thead>';
        $content .= '                            <tr>';
        $content .= '                                <th>Qty</th>';
        $content .= '                                <th>Product</th>';
        $content .= '                                <th>Price</th>';
        $content .= '                                <th>VAT</th>';
        $content .= '                                <th>Subtotal</th>';
        $content .= '                            </tr>';
        $content .= '                        </thead>';
        $content .= '                        <tbody>';
        $no = 1;
        $ubtotal = 0;
        $tax = 0;
        $total = 0;
        foreach ($invoices as $invoice) :;
            $content .= '                                <tr>';
            $content .= '                                    <td>' . $no . '</td>';
            $content .= '                                    <td>' . $invoice["note"] . '</td>';
            $content .= '                                    <td>' . $invoice["price"] . '</td>';
            $content .= '                                    <td>' . $invoice["vat"] . '</td>';
            $content .= '                                    <td>' . $invoice["total_invoice"] . '</td>';
            $content .= '                                </tr>';
            $ubtotal  = $ubtotal + $invoice['price'];
            $tax  = $tax + $invoice['vat'];
            $total  = $total + $invoice['total_invoice'];
            $no++;
        endforeach;
        $content .= '                        </tbody>';
        $content .= '                    </table>';
        $content .= '                </div>';
        $content .= '                <!-- /.col -->';
        $content .= '            </div>';
        $content .= '            <!-- /.row -->';
        $content .= '            <div class="row">';
        $content .= '                <!-- accepted payments column -->';
        $content .= '                <div class="col-6">';
        $content .= '                    <p class="lead">Payment Methods:</p>';
        $content .= '                    <img src="' . base_url() . '/dist/img/credit/visa.png alt="Visa">';
        $content .= '                    <img src="' . base_url() . '/dist/img/credit/mastercard.png" alt="Mastercard">';
        $content .= '                    <img src="' . base_url() . '/dist/img/credit/american-express.png" alt="American Express">';
        $content .= '                    <img src="' . base_url() . '/dist/img/credit/paypal2.png" alt="Paypal">';
        $content .= '                    <p class="text-muted well well-sm shadow-none" style="margin-top: 10px;">';
        $content .= '                        Segera konfirmasi jika sudah melakukan pembayaran';
        $content .= '                    </p>';
        $content .= '                </div>';
        $content .= '                <!-- /.col -->';
        $content .= '                <div class="col-6">';
        $content .= '                    <p class="lead">Amount Due 2/22/2014</p>';
        $content .= '                    <div class="table-responsive">';
        $content .= '                        <table class="table">';
        $content .= '                            <tr>';
        $content .= '                                <th style="width:50%">Total Price:</th>';
        $content .= '                                <td>' . $ubtotal . '</td>';
        $content .= '                            </tr>';
        $content .= '                            <tr>';
        $content .= '                                <th>Tax (11%)</th>';
        $content .= '                                <td>' . $tax . '</td>';
        $content .= '                            </tr>';
        $content .= '                            <tr>';
        $content .= '                                <th>Total Invoice:</th>';
        $content .= '                                <td>' . $total . '</td>';
        $content .= '                            </tr>';
        $content .= '                        </table>';
        $content .= '                    </div>';
        $content .= '                </div>';
        $content .= '                <!-- /.col -->';
        $content .= '            </div>';
        $content .= '            <!-- /.row -->';
        $content .= '        </div>';
        $content .= '        <!-- /.content -->';
        $content .= '    </div>';
        $content .= '    <!-- ./wrapper -->';
        $content .= '    <!-- Page specific script -->';
        $content .= '</body>';
        $content .= '</page>';
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

    /** 
     * Surat Penetapan
     * Hakim Desyanto
     * 2023-03-15
     */

    public function surat_penetapan($id)
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
    
        public function print_card($id)
    {
        $content = '<!DOCTYPE html>
        <html>
        <head>
            <style>
            .outer {
                width: 100px;
                height: 100px;
                border: 1px solid black;
                margin-left: 50px;
                overflow: hidden;
                border-radius: 50% !important;
        
            }
        
            .inner1 {
                width: 100%;
                height: 100%;
                background-image: linear-gradient(#FF9933, white, green);
                border: 1px solid black;
            }
            </style>
        </head>
        <body>
            <div class="circle-image"></div>
            <div class="outer">
            <div class="inner1">
    
            </div>
        </div>
        </body>
        </html>';
        
        $data['data'] = $this->ReportModel->get_data_certification($id);
        $data['data2'] = $this->ReportModel->get_field_code($id);
      
        try {

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';
            $content = view('Pdf/card',$data);
            $html2pdf = new Html2Pdf('P', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('ID Card ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
    
     public function print_certificate($id)
    {
        $data['data'] = $this->ReportModel->get_data_certification($id);
        $data['data2'] = $this->ReportModel->get_field_code($id);
        try {

            ob_start();
            // include '../../../Views/Admin/Pdf/Deposit_report.php';
            $content = view('Pdf/certificate', $data);
            $html2pdf = new Html2Pdf('L', 'A4', 'fr', true, 'UTF-8', array(0, 0, 0, 0));
            $html2pdf->pdf->SetDisplayMode('fullpage');

            //$content = ob_get_contents();

            $html2pdf->writeHTML($content);
            //$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2, null, '10mm');
            $html2pdf->output('Certificate ' . date('YmdHis') . '.pdf', 'D');
        } catch (Html2PdfException $e) {
            $html2pdf->clean();

            $formatter = new ExceptionFormatter($e);
            echo $formatter->getHtmlMessage();
        }
    }
}
