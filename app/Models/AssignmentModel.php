<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class AssignmentModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Assignment
     * Hakim
     * 2022-11-19
     */

    function jqgrid_assignment($status, $tipe_keyword = '', $keyword = '', $sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select 
                a.certification_id,
                a.certification_number,
                a.apply_date,
                f.full_name,
                a.createdAt,
                a.updatedAt,
                b.code_description	level_auditor,
                fhd_scope(a.certification_id) scope_code                
                from certification a
                left join users f on a.user_id=f.id 
                left join lsp_master_code b on b.code_value=a.level_auditor and b.code_type='level_auditor'
                where a.certification_id not in ( Select certification_id from invoice where (status='1' or status ='0') ) 
                and a.certification_number<>''";

        if ($status == '1') {
            $sql .= " and a.certification_id not in ( select certification_id from assignment) ";
        } else {
            $sql .= " and a.certification_id in ( select certification_id from assignment where fhd_total_score(certification_id)=0) ";
        }


        if ($keyword != "") {
            $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    public function insert_assignment($data)
    {
        $builder = $this->db->table('assignment');
        $builder->insert($data);
    }

    public function insert_assignmentd_to($data)
    {
        $builder = $this->db->table('assignmentd_to');
        $builder->insertBatch($data);
    }

    public function insert_assignmentd_score($data)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->insertBatch($data);
    }

    public function insert_assignmentd_scope($data)
    {
        $builder = $this->db->table('assignmentd_scope');
        $builder->insertBatch($data);
    }

    public function insert_assignmentd_fieldcode($data)
    {
        $builder = $this->db->table('assignmentd_fieldcode');
        $builder->insertBatch($data);
    }

    public function delete_assignment($id)
    {
        $builder = $this->db->table('assignment');
        $builder->where('certification_id', $id);
        $builder->delete();
    }

    public function update_certification_status($data, $id)
    {
        $this->db->table('certification')->where('certification_id', $id)->update($data);
    }

    public function get_scopes($certification_id)
    {
        $sql = "select * from certificationd_scope where certification_id=?";
        $query = $this->db->query($sql, $certification_id);
        return $query->getResultArray();
    }

    public function get_field_codes($certification_id)
    {
        $sql = "select * from certificationd_fieldcode where certification_id=?";
        $query = $this->db->query($sql, $certification_id);
        return $query->getResultArray();
    }

    public function get_email($committee)
    {
        $sql = "select email from users where id=?";
        $query = $this->db->query($sql, $committee)->getRow();
        return $query->email;
    }

    public function get_certificant_name($certification_id)
    {
        $sql = "select full_name from users a
                left join certification b on a.id=b.user_id
                where b.certification_id=?";
        $query = $this->db->query($sql, $certification_id)->getRow();
        return $query->full_name;
    }
    
    public function get_scope_code($certification_id)
    {
        $sql = "select scope_code from ref_scope a
                left join certification b on a.scope_id=b.scope_id
                where b.certification_id=?";
        $query = $this->db->query($sql, $certification_id)->getRow();
        return $query->scope_code;
    }


    public function get_po_number($assignment_id, $committee_id)
    {
        $sql = "select * from assignmentd_po where assignment_id=? and committee_id=?";
        $query = $this->db->query($sql, array($assignment_id, $committee_id))->getRow();
        return $query->po_number;
    }

    public function get_committee_name($committee_id)
    {
        $sql = "select full_name from users where id=? ";
        $query = $this->db->query($sql, array($committee_id))->getRow();
        return $query->full_name;
    }

    public function get_data_assignment($certification_id)
    {
        $sql = "select a.committee_id,c.user_id,d.po_number,e.full_name committee_name, f.full_name certificant_name, e.email  FROM assignmentd_to a 
            LEFT JOIN assignment b on a.assignment_id=b.assignment_id
            left JOIN certification c on c.certification_id=b.certification_id
            left join assignmentd_po d on d.assignment_id=a.assignment_id AND d.committee_id=a.committee_id
            left JOIN users e on e.id=a.committee_id
            left JOIN users f on c.user_id=f.id
            WHERE b.certification_id=?";
        $query = $this->db->query($sql, $certification_id);
        return $query->getResult();
    }

    /**
     * Commitee Over Due
     * Hakim Desyanto
     * 2023-07-10
     */

    function jqgrid_committee_over_due($status, $tipe_keyword = '', $keyword = '', $sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select a.*, d.full_name committee_name, f.full_name certificant_name,    b.assignment_date,b.fisnish_date, (b.fisnish_date - curdate()) balance 
                
                from assignmentd_to a
                left join assignment b on a.assignment_id=b.assignment_id
                left join assignmentd_score c on a.assignment_id=c.assignment_id and a.committee_id=c.committee_id 
                left join users d on a.committee_id=d.id
                left join certification e on e.certification_id=b.certification_id
                left join users f on f.id=e.user_id
                where c.status='0' ";

        if ($keyword != "") {
            $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by b.fisnish_date asc";



        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }
}
