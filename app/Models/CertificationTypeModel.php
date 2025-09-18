<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class CertificationTypeModel extends Model
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

    function jqgrid_certification_type($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * from ref_certification_type";

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

    function get_data_certification_type_by_id($id)
    {
        $sql = "select * from ref_certification_type where certification_type_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_certification_type($data)
    {
        $builder = $this->db->table('ref_certification_type');
        $builder->insert($data);
    }

    public function update_certification_type($data, $id)
    {
        $builder = $this->db->table('ref_certification_type');
        $builder->where('certification_type_id', $id);
        $builder->update($data);
    }

    public function delete_certification_type($id)
    {
        $builder = $this->db->table('ref_certification_type');
        $builder->where('certification_type_id', $id);
        $builder->delete();
    }

    public function get_select($table)
    {
        switch ($table) {
            case "ref_province":
                $sql = "select province_id id, province_name name from ref_province order by province_name";
                break;
            case "ref_district":
                $sql = "select district_id id, district_name name from ref_district order by district_name";
                break;
            case "ref_subdistrict":
                $sql = "select subdistrict_id id, subdistrict_name name from ref_subdistrict order by subdistrict_name";
                break;
            case "ref_village":
                $sql = "select village_id id, village_name name from ref_village order by village_name";
                break;
            default:
                $sql = "select province_id id, province_name name from ref_province order by province_name";
                break;
        }
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_child($table, $id)
    {

        switch ($table) {
            case "ref_province":
                $sql = "select district_id id, district_name name from ref_district where province_id=? order by district_name";
                break;
            case "ref_district":
                $sql = "select subdistrict_id id, subdistrict_name name from ref_subdistrict where district_id=? order by subdistrict_name";
                break;
            case "ref_subdistrict":
                $sql = "select village_id id, village_name name from ref_village  where subdistrict_id=? order by village_name";
                break;
                // case "ref_village":
                //     $sql = "select village_id id, village_name name from ref_village  where district_id=?";
                //     break;
            default:
                $sql = "select province_id id, province_name name from ref_province";
                break;
        }
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }
}
