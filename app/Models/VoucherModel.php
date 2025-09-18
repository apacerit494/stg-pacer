<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class VoucherModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Partner
     * Hakim Desyanto
     * 2023-03-15
     */

    function jqgrid_voucher($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT a.*,b.partner_name from voucher a
                left join partner b on a.partner_id=b.partner_id";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    public function insert_voucher($data)
    {
        $this->db->table('voucher')->insert($data);
    }

    public function update_voucher($data, $id)
    {
        $builder = $this->db->table('voucher');
        $builder->where('voucher_id', $id);
        $builder->update($data);
    }

    public function delete_voucher($id)
    {
        $builder = $this->db->table('voucher');
        $builder->where('voucher_id', $id);
        $builder->delete();
    }

    function get_data_voucher_by_id($id)
    {
        $sql = "select * from voucher where voucher_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    public function get_partners()
    {
        $sql = "select * from partner order by partner_name";
        $query = $this->db->query($sql);
        return $query->getResult();
    }
}
