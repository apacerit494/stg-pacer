<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class FieldCodeModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Certification Type
     * Hakim
     * 2022-11-16
     */

    function jqgrid_field_code($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * from ref_fieldcode";

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

    function get_data_field_code_by_id($id)
    {
        $sql = "select * from ref_fieldcode where fieldcode_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }
    
    function get_data_field_code_by_id2($id)
    {
        $sql = "select fieldcode_code,fieldcode_description from ref_fieldcode where fieldcode_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_field_code($data)
    {
        $builder = $this->db->table('ref_fieldcode');
        $builder->insert($data);
    }

    public function update_field_code($data, $id)
    {
        $builder = $this->db->table('ref_fieldcode');
        $builder->where('fieldcode_id', $id);
        $builder->update($data);
    }

    public function delete_field_code($id)
    {
        $builder = $this->db->table('ref_fieldcode');
        $builder->where('fieldcode_id', $id);
        $builder->delete();
    }
}
