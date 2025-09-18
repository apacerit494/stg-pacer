<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ScopeModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Scope
     * Hakim
     * 2022-11-16
     */

    function jqgrid_scope($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * from ref_scope";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function get_data_scope_by_id($id)
    {
        $sql = "select * from ref_scope where scope_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_scope($data)
    {
        $builder = $this->db->table('ref_scope');
        $builder->insert($data);
    }

    public function update_scope($data, $id)
    {
        $builder = $this->db->table('ref_scope');
        $builder->where('scope_id', $id);
        $builder->update($data);
    }

    public function delete_scope($id)
    {
        $builder = $this->db->table('ref_scope');
        $builder->where('scope_id', $id);
        $builder->delete();
    }
}
