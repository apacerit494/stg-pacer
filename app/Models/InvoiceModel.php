<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class InvoiceModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Invoice
     * Hakim
     * 2022-11-25
     */

    function jqgrid_invoice($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();
        $user_type = user()->user_type_id;
        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT a.*, total_vat(a.invoice_id) total_vat ,total_invoice(a.invoice_id) total_invoice, total_price(a.invoice_id) total_price, 
                total_discount_nominal(a.invoice_id) total_discount_nominal, total_discount_percentage(a.invoice_id) total_discount_percentage,b.full_name from invoice a
        left join users b on a.user_id=b.id";

        if ($user_type == '5') {
            $sql .= " where a.user_id=?";
            $param[] = $user_id;

            if ($keyword != "") {
                $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
                $keyword     = strtolower($keyword);
                $keyword     = strtoupper($keyword);
                $param[]     = '%' . $keyword . '%';
            }
        } else {
            if ($keyword != "") {
                $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
                $keyword     = strtolower($keyword);
                $keyword     = strtoupper($keyword);
                $param[]     = '%' . $keyword . '%';
            }
        }


        $sql .= " order by invoice_number desc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function subgrid_invoice($sidx = '', $sord = '', $limit_rows = '', $start = '', $rowid = '', $user_id = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * 
                FROM invoiced_product 
                ";


        // $sql .= " order by report_no,seq_no asc $limit ";

        $query = $this->db->query($sql, array($rowid, $user_id));

        return $query->getResultArray();
    }

    function get_data_invoice_by_id($id)
    {
        $sql = "select a.*,total_vat(a.invoice_id) vat, total_price(a.invoice_id) price, 
        total_invoice(a.invoice_id) total_invoice, total_discount_nominal(a.invoice_id) discount_nominal, 
        total_discount_percentage(a.invoice_id) discount_percentage, b.full_name from invoice a 
        left join users b on a.user_id=b.id where invoice_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    public function get_total_invoice($invoice_number)
    {
        $sql = "select sum(total_invoice) total_invoice from invoice where invoice_number=?";
        $query = $this->db->query($sql, $invoice_number);
        return $query->getRowArray();
    }

    public function update_invoice($data, $id)
    {
        $builder = $this->db->table('invoice');
        $builder->where('invoice_id', $id);
        $builder->update($data);
    }

    public function verification_invoice($data, $invoice_number)
    {
        $builder = $this->db->table('invoice');
        $builder->where('invoice_number', $invoice_number);
        $builder->update($data);
    }

    public function proses_payment($data, $invoice_number)
    {
        $builder = $this->db->table('invoice');
        $builder->where('invoice_number', $invoice_number);
        $builder->update($data);
    }

    public function get_data_invoices($user_id)
    {
        $sql = "select a.*,total_vat(a.invoice_id) total_vat,total_invoice(a.invoice_id) total_invoice, 
                total_price(a.invoice_id) total_price, total_discount_percentage(a.invoice_id) discount,
                total_discount_nominal(a.invoice_id) discount_nominal,b.certification_number 
                from invoice a
                left join certification b on a.certification_id=b.certification_id 
                where a.user_id=? and a.status='0'";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_data_invoices_cetak($invoice_number)
    {
        $sql = "select a.*,total_vat(a.invoice_id) total_vat,total_invoice(a.invoice_id) total_invoice, 
                total_price(a.invoice_id) total_price, total_discount_percentage(a.invoice_id) discount,
                total_discount_nominal(a.invoice_id) discount_nominal,b.certification_number 
                from invoice a
                left join certification b on a.certification_id=b.certification_id 
                where a.invoice_number=? ";
        $query = $this->db->query($sql, $invoice_number);
        return $query->getRowArray();
    }

    public function get_data_invoices_detail($invoice_id)
    {
        $sql = "select * from invoiced_product where invoice_id=?";
        $query = $this->db->query($sql, $invoice_id);
        return $query->getResultArray();
    }


    public function get_data_certification($user_id)
    {
        $sql = "select * from certification where user_id=? and status='1'";
        $query = $this->db->query($sql, $user_id);
        return $query->getRowArray();
    }

    public function get_data_user($user_id)
    {
        $sql = "select a.*,b.province_name,c.district_name,d.subdistrict_name,e.village_name
                 from users a 
                 left join ref_province b on a.province_id=b.province_id
                 left join ref_district c on a.district_id=c.district_id
                 left join ref_subdistrict d on a.subdistrict_id=d.subdistrict_id
                 left join ref_village e on a.village_id=e.village_id
                 where a.id=? ";
        $query = $this->db->query($sql, $user_id);
        return $query->getRowArray();
    }

    public function get_user_id($invoice_number)
    {
        $sql = "select user_id from invoice where invoice_number=? limit 1";
        $query = $this->db->query($sql, $invoice_number)->getRow();
        return  $query->user_id;
    }

    public function get_certification_number($user_id)
    {
        $sql = "select certification_id,certification_number from certification where user_id=? order by 1 asc";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_invoice_number()
    {
        $sql = "select max(convert(invoice_number, UNSIGNED ))+1  new_invoice_number,count(*) jml from invoice  where extract(year from invoice_date)=year(curdate())
        and extract(month from invoice_date)=month(curdate()) ;";
        $query = $this->db->query($sql)->getRow();
        if ($query->jml == 0) {
            $invoice_number = date('Ym') . '0001';
        } else {
            $invoice_number = $query->new_invoice_number;
        }
        return  $invoice_number;
    }

    public function insert_invoice($data)
    {
        $this->db->table('invoice')->insert($data);
    }

    public function insert_invoiced_product($data)
    {
        $this->db->table('invoiced_product')->insert($data);
    }
}
