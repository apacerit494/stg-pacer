<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class MasterCodeModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Master Code
     * Hakim
     * 2022-11-25
     */

    function jqgrid_master_code($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * from lsp_master_code";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 2,4 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function get_data_master_code_by_id($id)
    {
        $sql = "select * from lsp_master_code where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_master_code($data)
    {
        $builder = $this->db->table('lsp_master_code');
        $builder->insert($data);
    }

    public function update_master_code($data, $id)
    {
        $builder = $this->db->table('lsp_master_code');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_master_code($id)
    {
        $builder = $this->db->table('lsp_master_code');
        $builder->where('id', $id);
        $builder->delete();
    }
}
