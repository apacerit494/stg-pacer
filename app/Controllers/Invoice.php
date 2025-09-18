<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\InvoiceModel;
use \App\Models\BaseModel;

class Invoice extends BaseController
{
    protected $InvoiceModel;
    protected $BaseModel;
    protected $db;


    public function __construct()
    {
        $this->InvoiceModel = new InvoiceModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    /**
     * Invoice
     * Hakim
     * 2022-11-25
     */
    public function index()
    {
        $data['title'] = 'Invoice';
        $data['menu'] = $this->generate_menu('/Invoice/index');
        $data['notifications'] = $this->BaseModel->get_notifications(user()->user_type_id == '2' ? '0' : user_id());
        $data['certificants'] = $this->BaseModel->get_certificants();
        return view('Invoice/Main', $data);
    }

    public function jqgrid_invoice()
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

        $result = $this->InvoiceModel->jqgrid_invoice('', '', '', '', $tipe_keyword, $keyword);

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

        $result = $this->InvoiceModel->jqgrid_invoice($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['invoice_id'] = $row['invoice_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['invoice_id'],
                '',
                $row['invoice_number'],
                $row['invoice_date'],
                // $row['note'],
                $row['certification_id'],
                $row['full_name'],
                $row['currency'],
                $row['total_discount_percentage'],
                $row['total_discount_nominal'],
                //$row['note'],
                $row['taxnum'],
                $row['total_price'],
                $row['total_vat'],
                $row['total_invoice'],
                $row['bank_name'],
                $row['account_no'],
                $row['account_name'],
                $row['payment_date'],
                $row['payment_slip'],
                $row['status'],
                $row['status'],
                $row['createdAt'],
                $row['updatedAt']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    public function subgrid_invoice()
    {

        $rowid = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
        $responce = $this->InvoiceModel->subgrid_invoice('', '', '', '', $rowid);

        echo json_encode($responce);
    }


    function get_data_invoice_by_id()
    {
        $id = $this->request->getVar('invoice_id');
        $data = $this->InvoiceModel->get_data_invoice_by_id($id);
        echo json_encode($data);
    }

    function get_total_invoice()
    {
        $invoice_number = $this->request->getVar('invoice_number');
        $data = $this->InvoiceModel->get_total_invoice($invoice_number);
        return json_encode($data);
    }

    function add_invoice()
    {
        $user_id = $this->request->getVar('user_id');
        $certification_id = $this->request->getVar('certification_id');
        $invoice_id = $this->get_uuid();
        $discount_percentage =  $this->RupiahToNumeric($this->request->getVar('discount_percentage'));

        $discount_nominal = $this->RupiahToNumeric($this->request->getVar('discount_nominal'));
        $note = $this->request->getVar('note');
        $vat = $this->RupiahToNumeric($this->request->getVar('vat'));
        $price = $this->RupiahToNumeric($this->request->getVar('price'));
        $total_invoice = $this->RupiahToNumeric($this->request->getVar('total_invoice'));
        $invoice_number = $this->InvoiceModel->get_invoice_number();
        $invoice_date = $this->request->getVar('invoice_date');
        $taxnum = date('HisYmd');
        $createdAt = date('Y-m-d H:i:s');

        $data1 = array(
            'invoice_id' => $invoice_id,
            'invoice_number' => $invoice_number,
            'invoice_date' => $invoice_date,
            'certification_id' => $certification_id,
            'currency' => 'IDR',
            'taxnum' => $taxnum,
            'user_id' => $user_id,
            'createdAt' => $createdAt
        );

        $this->db->transBegin();
        $this->InvoiceModel->insert_invoice($data1);

        $data2 = array(
            'invoice_id' => $invoice_id,
            'qty' => 1,
            'discount_percentage' => $discount_percentage,
            'discount_nominal' => $discount_nominal,
            'note' => $note,
            'vat' => $vat,
            'price' => $price,
            'total_invoice' => $total_invoice
        );

        $this->InvoiceModel->insert_invoiced_product($data2);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }

        return json_encode($return);
    }

    function edit_invoice()
    {
        $id = $this->request->getVar('id');
        $discount_percentage = $this->request->getVar('discount_percentage');

        $sql = "select update_discount_invoice(?,?)";
        $this->db->transbegin();
        $this->db->query($sql, array($id, $discount_percentage));
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    public function verification_invoice()
    {
        $invoice_number = $this->request->getVar('invoice_number');
        $user_id = $this->InvoiceModel->get_user_id($invoice_number);
        $data = array(
            'status' => '2'
        );
        $this->db->transBegin();
        $this->InvoiceModel->verification_invoice($data, $invoice_number);
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $this->db->query("call insert_notification(?,?,?)", array($user_id, 'Invoice has been verified', 'personal_invoice'));
            $this->run_pusher();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        return json_encode($return);
    }

    public function proses_payment()
    {
        $invoice_number = $this->request->getVar('invoice_number');
        $bank_name = $this->request->getVar('bank_name');
        $account_no = $this->request->getVar('account_no');
        $account_name = $this->request->getVar('account_name');
        $payment_date = $this->request->getVar('payment_date');
        $updatedAt = date('Y-m-d');
        $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Payment_slip/';
        $folderName = $folder . '/' . date('YmdHis') . ' ' . basename($_FILES['payment_slip']['name']);

        if (!file_exists($folder)) {
            mkdir($folder, 0755, true);
        }
        move_uploaded_file($_FILES['payment_slip']['tmp_name'], $folderName);

        $data = array(
            'bank_name' => $bank_name,
            'account_no' => $account_no,
            'account_name' => $account_name,
            'payment_date' => $payment_date,
            'payment_slip' => $folderName,
            'status' => '1',
            'updatedAt' => $updatedAt

        );

        //dd($invoice_number);

        $this->db->transBegin();
        $this->InvoiceModel->proses_payment($data, $invoice_number);
        $this->db->query("call insert_notification(?,?,?)", array(user_id(), 'New Invoice Payment', 'payment_invoice'));
        if ($this->db->transStatus() == true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }

        //return redirect()->to('/Invoice/personal_invoice')->withInput();
        return json_encode($return);
    }

    public function get_certification_number()
    {
        $user_id = $this->request->getVar('user_id');
        $data = $this->InvoiceModel->get_certification_number($user_id);
        return json_encode($data);
    }
    /** end of Invoice */


    /** 
     * Personal Invoice
     * Hakim
     * 2022-12-21
     */

    public function personal_invoice()
    {
        $id = $this->request->getVar('id');
        $data['title'] = "Personal Invoice";
        $invoices = $this->InvoiceModel->get_data_invoices(user_id());
        $data['menu'] = $this->generate_menu('/Invoice/personal_invoice');
        // $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());

        if (count($invoices) < 1) {
            return view('Personal_invoice/No_invoice', $data);
        } else {
            $total_invoice = 0;
            $htmlku = array();
            foreach ($invoices as $invoice) :
                //$total_invoice = $total_invoice + $invoice['total_invoice'];
                $invoices_detail = $this->InvoiceModel->get_data_invoices_detail($invoice['invoice_id']);
                $html = "";

                foreach ($invoices_detail  as $invoice_detail) {
                    $html .= '<tr>';
                    $html .= '    <td>' . $invoice_detail['qty']  . '</td>';
                    $html .= '    <td>' . $invoice_detail['note'] . '</td>';
                    $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['price'], 0, ',', '.') . '</td>';
                    $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['discount_nominal'], 0, ',', '.') . '</td>';
                    $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['vat'], 0, ',', '.') . '</td>';
                    $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['total_invoice'], 0, ',', '.') . '</td>';
                    $html .= '</tr>';
                }
                $htmlku[] = $html;

            endforeach;
            $data['invoices'] = $invoices;
            $data['total_invoice'] = $total_invoice;
            $data['certification'] = $this->InvoiceModel->get_data_certification(user_id());
            $data['htmlku'] = $htmlku;
            $data['user'] = $this->InvoiceModel->get_data_user(user_id());
            return view('Personal_invoice/Main', $data);
        }
    }

    public function personal_invoice_notif($id)
    {
        $sql = "call update_notification(?)";
        $this->db->query($sql, $id);
        return redirect()->to('/Invoice/personal_invoice');
    }

    public function cetak_invoice($invoice_number)
    {

        // batas
        $data['title'] = "Personal Invoice";
        $invoices = $this->InvoiceModel->get_data_invoices_cetak($invoice_number);
        $data['menu'] = $this->generate_menu('/Invoice/personal_invoice');


        $total_invoice = 0;
        $htmlku = array();
        $invoices_detail = $this->InvoiceModel->get_data_invoices_detail($invoices['invoice_id']);
        $html = "";

        foreach ($invoices_detail  as $invoice_detail) {
            $html .= '<tr>';
            $html .= '    <td>' . $invoice_detail['qty']  . '</td>';
            $html .= '    <td>' . $invoice_detail['note'] . '</td>';
            $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['price'], 0, ',', '.') . '</td>';
            $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['discount_nominal'], 0, ',', '.') . '</td>';
            $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['vat'], 0, ',', '.') . '</td>';
            $html .= '    <td style="text-align: right;">' . number_format($invoice_detail['total_invoice'], 0, ',', '.') . '</td>';
            $html .= '</tr>';
        }
        $htmlku = $html;


        $data['invoices'] = $invoices;
        $data['total_invoice'] = $total_invoice;
        $data['certification'] = $this->InvoiceModel->get_data_certification(user_id());
        $data['htmlku'] = $htmlku;
        $data['user'] = $this->InvoiceModel->get_data_user(user_id());



        return view('Personal_invoice/Invoice_print', $data);
    }

    public function proses_payment_personal_invoice($i)
    {
        $invoice_number = $this->request->getVar('invoice_number_' . $i);
        $bank_name = $this->request->getVar('bank_name_' . $i);
        $account_no = $this->request->getVar('account_no_' . $i);
        $account_name = $this->request->getVar('account_name_' . $i);
        $payment_date = $this->request->getVar('payment_date_' . $i);
        $updatedAt = date('Y-m-d');
        $kurdate = date('YmdHis');
            
        if (!$this->validasi_payment($i)) {
            $validation = \Config\Services::validation();
            $bank_name = ($bank_name == "") ? "1" : "0";
            $account_no = $account_no == "" ? "1" : "0";
            $account_name = $account_name == "" ? "1" : "0";
            $payment_date = $payment_date == "" ? "1" : "0";
            try {
                $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Payment_slip/';
                $folderName = $folder . '/' . $kurdate . ' ' . basename($_FILES['payment_slip_' . $i]['name']);


                $payment_slip = "0";
            } catch (\Exception $e) {
                $payment_slip = "1";
            }

            $return = array(
                'success' => false,
                'bank_name' => $bank_name,
                'account_no' => $account_no,
                'account_name' => $account_name,
                'payment_date' => $payment_date,
                'payment_slip' => $payment_slip,
                'msg' => 'Lengkapi terlebih dahulu datanya'

            );
        } else {

            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Payment_slip/';
            $folderName = $folder . '/' . $kurdate   . ' ' . basename($_FILES['payment_slip_' . $i]['name']);

            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['payment_slip_' . $i]['tmp_name'], $folderName);

            $payment_slip1 = '/assets/User/Payment_slip/'   . $kurdate   . ' ' . basename($_FILES['payment_slip_' . $i]['name']);
            //  dd(base_url() . $payment_slip1);
            $data = array(
                'bank_name' => $bank_name,
                'account_no' => $account_no,
                'account_name' => $account_name,
                'payment_date' => $payment_date,
                'payment_slip' => $payment_slip1,
                'status' => '1',
                'updatedAt' => $updatedAt

            );

            $this->db->transBegin();
            $this->InvoiceModel->proses_payment($data, $invoice_number);
            $this->db->query("call insert_notification(?,?,?)", array(0, 'New Invoice Payment', 'payment_invoice'));

            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }

            $this->run_pusher();

            // $folder1 = $_SERVER["DOCUMENT_ROOT"] . '/assets/User/Surat/';
            // $file = 'Surat Penetapan ' . date('YmdHis') . '.pdf';

            $email = \Config\Services::email();
            $email->setTo('sekretariat@pacer.co.id');
            // $email->setTo('hakim.desyanto@pacer.co.id');
            $email->setFrom($this->notif_email, 'LSP PACER ( No-Reply)');
            $email->setSubject('Invoice' . ' - ' . user()->full_name . ' - ' . $invoice_number);
            $email->setMessage('Bukti pembayaran invoice');
            $email->attach($_SERVER["DOCUMENT_ROOT"] . $payment_slip1);
            $email->send();
        }

        //return redirect()->to('/Invoice/personal_invoice');
        return json_encode($return);
    }

    public function validasi_payment($jumlah_payment)
    {
        if (!$this->validate([
            'bank_name_' . $jumlah_payment => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'account_no_' . $jumlah_payment => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'account_name_' . $jumlah_payment => [
                'rules' => 'required',
                'errors' => [
                    'required' => '{field} harus diisi'
                ]
            ],
            'payment_date_' . $jumlah_payment => [
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
    /** end of Personal Invoice */
}
