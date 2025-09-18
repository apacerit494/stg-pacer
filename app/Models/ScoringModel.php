<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ScoringModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Scoring
     * Hakim
     * 2022-11-23
     */

    function jqgrid_scoring($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '', $id = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_type = user()->user_type_id;

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";
        $param = array();
        $sql = "SELECT a.id,
                a.assignment_id,
                a.committee_id,
                e.full_name committee,
                b.certification_id,
                b.from_id,
                f.full_name Secretariat,
                b.assignment_date,
                b.fisnish_date,
                b.note,
                c.certification_number,
                c.apply_date,
                c.user_id,
                c.certification_type_id,
                c.level_auditor,
                d.full_name Certificant,
                g.education_score,
                g.training_score,
                g.audit_experience_score,
                g.experience_score,
                g.written_exam_score,
                g.pratical_exam_score,
                g.observation_score,
                g.note,
                g.committee_score,
                g.status,
                h.code_description level_auditor_komplit
                from assignmentd_to a
                left join assignment b on b.assignment_id=a.assignment_id
                left join certification c on c.certification_id=b.certification_id
                left join users d on c.user_id=d.id
                left join users e on e.id=a.committee_id
                left join users f on f.id=b.from_id
                left join assignmentd_score g on g.assignment_id=a.assignment_id ";

        switch ($user_type) {
            case "3":
                $sql .= " and g.committee_id=?   left join lsp_master_code h on g.level_auditor = h.code_value and h.code_type='level_auditor'    where a.committee_id=?";
                $param[] = $id;
                $param[] = $id;
                break;
            case "4":
                $sql .= " and g.committee_id=?   left join lsp_master_code h on g.level_auditor = h.code_value and h.code_type='level_auditor'    where a.committee_id=?";
                $param[] = $id;
                $param[] = $id;
                break;
            case "5":
                $sql .= " and g.committee_id=?   left join lsp_master_code h on g.level_auditor = h.code_value and h.code_type='level_auditor'    where a.committee_id=?";
                $param[] = $id;
                $param[] = $id;
                break;
            case "1":
                $sql .= " and g.committee_id=a.committee_id  left join lsp_master_code h on g.level_auditor = h.code_value and h.code_type='level_auditor'  ";
                break;
            case "2":
                $sql .= " and g.committee_id=a.committee_id   left join lsp_master_code h on g.level_auditor = h.code_value and h.code_type='level_auditor' ";
                break;
        }

        // $sql .= "";


        if ($keyword != "") {
            switch ($user_type) {
                case "1":
                    $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
                    break;
                case "2":
                    $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
                    break;
                case "3":
                    $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
                    break;
                case "4":
                    $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
                    break;
                case "5":
                    $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
                    break;
            }

            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function get_data_scoring_by_id($id, $committee_id)
    {
        // $sql = "select * from assignmentd_score where assignment_id=? and committee_id=?";
        $sql = "select a.*,b.certification_id,c.user_id,d.full_name ,c.certification_number,
                e.scope_code, f.penguji_ujian 
                from assignmentd_score a 
                left join assignment b on a.assignment_id=b.assignment_id
                left join certification c on c.certification_id=b.certification_id
                left join users d on d.id=c.user_id
                left join ref_scope e on c.scope_id=e.scope_id
                left join assignmentd_to f on a.assignment_id=f.assignment_id and a.committee_id=f.committee_id
                where a.assignment_id=? and a.committee_id=?";
        $query = $this->db->query($sql, array($id, $committee_id));
        return $query->getRowarray();
    }

    function insert_scoring($data)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->insert($data);
    }

    public function update_scoring($data, $assignment_id, $user_id)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->where('assignment_id', $assignment_id);
        $builder->where('committee_id', $user_id);
        $builder->update($data);
    }


    public function verification_score($data, $assignment_id, $committee_id)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->where('assignment_id', $assignment_id);
        $builder->where('committee_id', $committee_id);
        $builder->update($data);
    }

    public function check_score($assignment_id, $committee_id)
    {
        $sql = "select count(assignment_id) jumlah from assignmentd_score where assignment_id=? and committee_id=?";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        $row = $query->getRowArray();
        return $row['jumlah'];
    }

    public function get_data_assignmentd_scope($assignment_id, $committee_id)
    {
        $sql = "select a.*,b.scope_code  from assignmentd_scope a 
                left join ref_scope b on a.scope_id=b.scope_id 
                where a.assignment_id=? and a.committee_id=?
                order by a.scope_id";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        return $query->getResultArray();
    }

    public function get_data_assignmentd_fieldcode($assignment_id, $scope_id, $committee_id)
    {
        $sql = "select a.*,b.fieldcode_code,b.fieldcode_description from assignmentd_fieldcode a 
                left join ref_fieldcode b on a.fieldcode_id=b.fieldcode_id 
                where a.assignment_id=? and a.committee_id=? 
                order by a.scope_id,a.fieldcode_id";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        return $query->getResultArray();
    }

    public function check_complete($assignment_id)
    {
        $sql = "select count(*) jml from assignmentd_score where assignment_id=? and status='1'";
        $query = $this->db->query($sql, $assignment_id)->getRow();
        return $query->jml;
    }

    public function get_committee_certifications($assignment_id)
    {
        $sql = "select a.committee_id from assignmentd_score a
                left join users b on a.committee_id = b.id
                where a.assignment_id=? and b.user_type_id='4'";
        $query = $this->db->query($sql, $assignment_id)->getRow();
        return $query->committee_id;
    }

    public function get_secretariat($assignment_id)
    {
        $sql = "select from_id from assignment where assignment_id=?";
        $query = $this->db->query($sql, array($assignment_id));
        return $query->getRow();
    }

    public function get_committees()
    {
        $sql = "select * from users where user_type_id='3' or user_type_id='4' order by full_name";
        $query = $this->db->query($sql);
        return $query->getResult();
    }

    public function re_assignment($data, $id)
    {
        $this->db->table('assignmentd_to')->where('id', $id)->update($data);
    }

    public function update_assignment($data, $assignment_id)
    {
        $this->db->table('assignment')->where('assignment_id', $assignment_id)->update($data);
    }


    public function get_data_assignment_baru($assignmentd_to_id)
    {
        $sql = "select a.committee_id,c.user_id,d.po_number,e.full_name committee_name, f.full_name certificant_name, e.email  
            FROM assignmentd_to a 
            LEFT JOIN assignment b on a.assignment_id=b.assignment_id
            left JOIN certification c on c.certification_id=b.certification_id
            left join assignmentd_po d on d.assignment_id=a.assignment_id AND d.committee_id=a.committee_id
            left JOIN users e on e.id=a.committee_id
            left JOIN users f on c.user_id=f.id
            WHERE a.id=?";
        $query = $this->db->query($sql, $assignmentd_to_id);
        return $query->getRow();
    }

    public function get_data_assignment_lama($id, $committee_id)
    {
        $sql = "            
        select max(a.committee_id),c.user_id,d.po_number,e.full_name  committee_name, f.full_name certificant_name, e.email 
        from assignmentd_po a 
         LEFT JOIN assignment b on a.assignment_id=b.assignment_id
                    left JOIN certification c on c.certification_id=b.certification_id
                    left join assignmentd_po d on d.assignment_id=a.assignment_id AND d.committee_id=a.committee_id
                    left JOIN users e on e.id=a.committee_id
                    left JOIN users f on c.user_id=f.id
                    WHERE a.assignment_id=(select assignment_id FROM assignmentd_to where id=?) and a.committee_id=? and a.status='2';";
        $query = $this->db->query($sql, array($id, $committee_id));
        return $query->getRow();
    }

    public function check_komite($assignment_id, $id, $committee_id)
    {
        $sql = "select count(*) jumlah from assignmentd_to where assignment_id=? and committee_id=? and id<>?";
        $query = $this->db->query($sql, array($assignment_id, $committee_id, $id));
        return $query->getRow()->jumlah;
    }

    public function get_certification_id($assignment_id)
    {
        $sql = "select certification_id from assignment where assignment_id=?";
        $query = $this->db->query($sql, array($assignment_id))->getRow();
        return $query->certification_id;
    }
    
    public function get_data_certficant_and_commitee($assignment_id,$commitee_id)
    {
        $sql="select a.full_name certificant_name,e.full_name committee_name  
                from users a
                left join certification b on a.id = b.user_id
                left join assignment c on c.certification_id=b.certification_id
                left join assignmentd_to d on d.assignment_id=c.assignment_id
                left join users e on e.id=d.committee_id
                where c.assignment_id=? and d.committee_id=?
                order by a.full_name";
        $query = $this->db->query($sql, array($assignment_id,$commitee_id));
        return $query->getRow();
        
    }
}
