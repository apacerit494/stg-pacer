<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class CertificantModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * User
     * Hakim
     * 2022-11-15
     */

    function jqgrid_user($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT a.*,b.province_name,c.district_name,d.subdistrict_name,e.village_name,
                f.role_name, case when (
                    SELECT COUNT(*)
                    FROM certification
                    WHERE a.id = certification.user_id
                ) =0 THEN 'New User' ELSE 'Certificant' END keterangan 
                from users a
                left join ref_province b on a.province_id=b.province_id
                left join ref_district c on c.district_id=a.district_id
                left join ref_subdistrict d on a.subdistrict_id=d.subdistrict_id
                left join ref_village e on a.village_id=e.village_id
                left join lsp_user_role f on a.user_type_id=f.role_id
                
                Where a.user_type_id='5'";

        if ($keyword != "") {
            $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        //$sql .= " order by 2,3 asc $limit ";
        $sql .= " $order $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    public function insert_personal($data)
    {
        $this->db->table('users')->insert($data);
    }

    function get_data_user_by_id($id)
    {
        $sql = "select * from users where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    public function check_status_certification_by_id_asli($id)
    {
        $sql = "select count(*) jml from certification where user_id=? ";
        $query = $this->db->query($sql, $id);
        $row = $query->getRowArray();
        if ($row['jml'] > 0) {
            $sql = "select user_id,status,max(createdAt) from certification where user_id=?";
            $query = $this->db->query($sql, $id);
            $row = $query->getRowArray();

            $status = $row['status'];
        } else {
            $status = "0";
        }
        return $status;
    }

    public function check_status_certification_by_id($id)
    {
        $sql = "select count(*) jml from certification where user_id=? and status in ('2')";
        $query = $this->db->query($sql, $id);
        $row = $query->getRowArray();
        return $row['jml'];
    }

    function get_data_education_by_id($id)
    {
        $sql = "select * from education where user_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getResultArray();
    }

    function get_data_experience_by_id($id)
    {
        $sql = "select * from experience where user_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getResultArray();
    }

    function get_data_audit_experience_by_id($id)
    {
        $sql = "select * from audit_experience where user_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getResultArray();
    }

    function get_data_training_by_id($id)
    {
        $sql = "select * from training where user_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getResultArray();
    }

    function insert_user($data)
    {
        $builder = $this->db->table('users');
        $builder->insert($data);
    }

    public function update_user($data, $id)
    {
        $builder = $this->db->table('users');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function check_certification($id)
    {
        $sql = "select count(*) jml from certification where user_id=? and status<>'0'";
        $query = $this->db->query($sql, array($id));
        $row = $query->getRowarray();
        return $row['jml'];
    }

    public function delete_user($id)
    {
        $builder = $this->db->table('users');
        $builder->where('id', $id);
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
            case "ref_certification_type":
                $sql = "select certification_type_id  id, description name,cost from ref_certification_type order by certification_type_id";
                break;
            case "users":
                $sql = "select id, full_name name from users order by full_name";
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

    public function get_id($email)
    {
        $sql = "select id from users where email=?";
        $query = $this->db->query($sql, $email);
        $row = $query->getRow();
        return $row->id;
    }
    
     public function check_scoring($user_id)
    {
        $sql = "SELECT sum(a.status) jumlah FROM assignmentd_score a
                left join assignment b on a.assignment_id=b.assignment_id
                left join certification c on c.certification_id=b.certification_id
                where c.user_id=?";
        $query = $this->db->query($sql, array($user_id))->getRow();
        return $query->jumlah;
    }
}
