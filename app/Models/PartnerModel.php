<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class PartnerModel extends Model
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

    function jqgrid_partner($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * from partner";

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

    public function insert_partner($data)
    {
        $this->db->table('partner')->insert($data);
    }

    public function update_partner($data, $id)
    {
        $builder = $this->db->table('partner');
        $builder->where('partner_id', $id);
        $builder->update($data);
    }

    public function delete_partner($id)
    {
        $builder = $this->db->table('partner');
        $builder->where('partner_id', $id);
        $builder->delete();
    }

    function get_data_partner_by_id($id)
    {
        $sql = "select * from partner where partner_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }
}
