<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ScoringFinalModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Scoring FInal
     * Hakim
     * 2022-11-23
     */

    function jqgrid_scoring_final($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '', $id = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_type = user()->user_type_id;

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";
        $param = array();
        $sql = "SELECT a.assignment_id,
        a.committee_id,
        h.scope_score,
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
        d.id,
        d.full_name Certificant,
        h.education_score,
        h.training_score,
        h.audit_experience_score,
        h.experience_score,
        h.written_exam_score,
        h.pratical_exam_score,
        h.observation_score,
        h.note,
        h.committee_score,
        h.status,
        i.code_description level_auditor_komplit,
        (CASE WHEN h.scope_score='Y' THEN CONCAT(j.scope_code, ' : PASS') ELSE   CONCAT(j.scope_code, ' : FAIL') END) scope_final
       
        from assignmentd_to a
        left join assignment b on b.assignment_id=a.assignment_id
        left join certification c on c.certification_id=b.certification_id
        left join users d on c.user_id=d.id 
        left join users e on e.id=a.committee_id 
        left join users f on f.id=b.from_id
        left join (SELECT assignment_id, count(status) AS status2 FROM assignmentd_score where status='1' or status='2' GROUP BY assignment_id)  g on g.assignment_id=a.assignment_id
        left join ref_scope j on j.scope_id = c.scope_id 
       left join assignmentd_score h on  h.assignment_id=a.assignment_id ";
        
        switch ($user_type) {
            case "3":
                $sql .= "  and h.committee_id=?   left join lsp_master_code i on h.level_auditor = i.code_value and i.code_type='level_auditor'    where a.committee_id=? and g.status2>=2";
                $param[] = $id;
                $param[] = $id;
                break;
            case "4":
                $sql .= "  and h.committee_id=?  left join lsp_master_code i on h.level_auditor = i.code_value and i.code_type='level_auditor'  where a.committee_id=? and g.status2>=2";
                $param[] = $id;
                $param[] = $id;
                break;
            case "5":
                $sql .= "  and h.committee_id=?  left join lsp_master_code i on h.level_auditor = i.code_value and i.code_type='level_auditor'  where a.committee_id=? and g.status2>=2";
                $param[] = $id;
                $param[] = $id;
                break;
            case "1":
                $sql .= " and h.committee_id=a.committee_id    left join lsp_master_code i on h.level_auditor = i.code_value and i.code_type='level_auditor' where  g.status2>=3  and e.user_type_id='4'";
                break;
            case "2":
                $sql .= " and h.committee_id=a.committee_id    left join lsp_master_code i on h.level_auditor = i.code_value and i.code_type='level_auditor' where  g.status2>=3  and e.user_type_id='4'   ";
                break;
        }


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

    function subgrid_scoring($sidx = '', $sord = '', $limit_rows = '', $start = '', $rowid = '', $user_id = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT a.assignment_id,
                b.full_name,
                a.education_score,
                a.training_score,
                a.audit_experience_score,
                a.experience_score,
                a.written_exam_score,
                a.pratical_exam_score,
                a.observation_score,
                a.scope_score,
                c.code_description level_auditor,
                a.note,
                a.status 
                FROM assignmentd_score a 
                left join users b on a.committee_id =b.id 
                left join lsp_master_code c on c.code_value=a.level_auditor and c.code_type='level_auditor'
                where assignment_id=? and committee_id<>? and b.user_type_id<>'4' order by committee_id";


        // $sql .= " order by report_no,seq_no asc $limit ";

        $query = $this->db->query($sql, array($rowid, $user_id));

        return $query->getResultArray();
    }

    function get_data_scoring_final_by_id($id, $committee_id, $user_id)
    {
        //$sql = "select * from assignmentd_score where assignment_id=? and committee_id=?";

        $sql = "select a.*,b.certification_id,c.user_id,d.full_name ,c.certification_number,e.full_name committee_name,
        f.scope_code, g.penguji_ujian  
        from assignmentd_score a 
        left join assignment b on a.assignment_id=b.assignment_id
        left join certification c on c.certification_id=b.certification_id
        left join users d on d.id=c.user_id
        left join users e on e.id=a.committee_id
        left join ref_scope f on f.scope_id=c.scope_id
        left join assignmentd_to g on a.assignment_id=g.assignment_id and a.committee_id=g.committee_id
        where a.assignment_id=? and c.user_id=? and e.user_type_id='4'";
        
        $param = array();
        $param[] = $id;
        $param[] = $user_id;

        if ($committee_id != 'admin') {
            $sql .= " and a.committee_id=? ";
            $param[] = $committee_id;
        }
        $query = $this->db->query($sql, $param);
        return $query->getRowarray();
    }

    function get_data_scoring_committe_by_id($id, $user_id)
    {
        $sql = "select a.*,b.certification_id,c.user_id,d.full_name ,c.certification_number,e.full_name committee_name, f.penguji_ujian 
            from assignmentd_score a 
            left join assignment b on a.assignment_id=b.assignment_id
            left join certification c on c.certification_id=b.certification_id
            left join users d on d.id=c.user_id
            left join users e on e.id=a.committee_id
            left join assignmentd_to f on a.assignment_id=f.assignment_id and a.committee_id=f.committee_id
            where a.assignment_id=? and e.user_type_id='3' and c.user_id=? order by a.committee_id";
        $query = $this->db->query($sql, array($id,  $user_id));
        return $query->getResultArray();
    }

    public function update_scoring_final($data, $assignment_id, $user_id)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->where('assignment_id', $assignment_id);
        $builder->where('committee_id', $user_id);
        $builder->update($data);
    }

    public function update_committee_score($data, $assignment_id, $committee_id)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->where('assignment_id', $assignment_id);
        $builder->where('committee_id', $committee_id);
        $builder->update($data);
    }

    public function verification_score_final($data, $assignment_id, $committee_id)
    {
        $builder = $this->db->table('assignmentd_score');
        $builder->where('assignment_id', $assignment_id);
        $builder->where('committee_id', $committee_id);
        $builder->update($data);
    }


    public function check_score_final($assignment_id, $committee_id)
    {
        $sql = "select count(assignment_id) jumlah from assignmentd_score where assignment_id=? and committee_id=?";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        $row = $query->getRowArray();
        return $row['jumlah'];
    }

    public function get_certification_id($id)
    {
        $sql = "select * from assignment where assignment_id=? limit 1";
        $query = $this->db->query($sql, $id);
        $row = $query->getRowArray();
        return $row['certification_id'];
    }

    public function get_email($certificant_id)
    {
        $sql = "select a.user_id,a.certification_number,b.* from certification a 
                left join users b on a.user_id=b.id 
                where a.certification_id=? limit 1";
        $query = $this->db->query($sql, $certificant_id);
        return $query->getRow();
    }

    public function check_last_sk_number()
    {
        $sql = "select last_sk_number from sk_number";
        $query = $this->db->query($sql);
        $row = $query->getRowArray();
        return $row['last_sk_number'];
    }

    public function get_certification_scope($assignment_id, $committee_id)
    {
        $sql = "select count(*) jml from assignmentd_score where assignment_id=? and committee_id=? and scope_score='Y'";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        $row = $query->getRowArray();
        return $row['jml'];
    }

    public function get_scope_id($assignment_id)
    {
        $sql = "select scope_id from certification where certification_id = (select certification_id from assignment where assignment_id=?)";
        $query = $this->db->query($sql, $assignment_id);
        $row = $query->getRowArray();
        return $row['scope_id'];
    }

    public function update_sk_number($certification_id, $data)
    {
        $this->db->table('certification')->where('certification_id', $certification_id)->update($data);
    }

    public function update_last_sk_number($data)
    {
        $this->db->table('sk_number')->where('id', '1')->update($data);
    }

    public function get_data_assignmentd_scope($assignment_id)
    {
        $sql = "select a.*,b.scope_code,c.user_type_id  from assignmentd_scope a 
                left join ref_scope b on a.scope_id=b.scope_id 
                left join users c on c.id=a.committee_id
                where a.assignment_id=?  order by  a.scope_id,c.user_type_id,a.committee_id";
        $query = $this->db->query($sql, array($assignment_id));
        return $query->getResultArray();
    }

    public function get_data_assignmentd_fieldcode($assignment_id, $scope_id)
    {
        // $sql = "select a.*,b.fieldcode_code from assignmentd_fieldcode a 
        //         left join ref_fieldcode b on a.fieldcode_id=b.fieldcode_id 
        //         where a.assignment_id=? and a.committee_id=?";

        $sql = "select a.*,b.fieldcode_code,b.fieldcode_description,c.user_type_id  from assignmentd_fieldcode a 
                left join ref_fieldcode b on a.fieldcode_id=b.fieldcode_id 
                left join users c on c.id=a.committee_id
                where a.assignment_id=? order by  a.scope_id,a.fieldcode_id,c.user_type_id,a.committee_id";
        $query = $this->db->query($sql, array($assignment_id));
        return $query->getResultArray();
    }

    public function get_certification_type_id($certification_id)
    {
        $sql = "Select * from certification where certification_id=?";
        $query = $this->db->query($sql, $certification_id);
        $row = $query->getRow();
        return $row->certification_type_id;
    }

    public function get_fieldcode_ok($assignment_id, $committee_id)
    {
        $sql = "select count(*) jml from assignmentd_fieldcode where assignment_id=? and committee_id=? and score='Y'";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        $row = $query->getRow();
        return $row->jml;
    }

    public function insert_invoice($data)
    {
        $this->db->table('invoice')->insert($data);
    }

    public function insert_invoice_detail($data)
    {
        $this->db->table('invoiced_product')->insertBatch($data);
    }

    public function get_sk_number($assignment_id, $committee_id)
    {
        $sql = "select fhd_sk_number(?,?) sk_number";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        $row = $query->getRow();
        return $row->sk_number;
    }

    public function surat_penetapan($sk_number)
    {
        $sql = "select a.*,b.full_name,b.birth_date,b.birth_place, b.address, c.scope_code,d.code_description,fhd_no_surat_penetapan(1) no_surat,
                fhd_angka_kredit(a.certification_id) score 
                from certification a 
                left join users b on a.user_id=b.id 
                left join ref_scope c on c.scope_id=a.scope_id
                left join lsp_master_code d on d.code_value=a.level_auditor and d.code_type='level_auditor' 
                where a.sk_number=?";
        $query = $this->db->query($sql, $sk_number);
        return $query->getRowArray();
    }

    public function get_bidangs($certification_id)
    {
        $sql = "select a.*,e.fieldcode_code,e.fieldcode_description from assignmentd_fieldcode a 
                left join assignment b on a.assignment_id=b.assignment_id
                left join certification c on c.certification_id=b.certification_id
                left join users d on a.committee_id=d.id
                left join ref_fieldcode e on e.fieldcode_id=a.fieldcode_id
                where c.certification_id=? and a.score='Y' and d.user_type_id='4'";
        $query = $this->db->query($sql, $certification_id);
        return $query->getResultArray();
    }

    public function get_data_invoice($assignment_id)
    {
        $sql = " SELECT a.invoice_number,b.full_name committee_name, e.full_name certificant_name,b.email,b.bank_name,
                b.account_number,b.account_name, f.po_number 
                from assignmentd_invoice a 
                left JOIN users b on b.id=a.committee_id
                left join assignment c on c.assignment_id=a.assignment_id
                left join certification d on d.certification_id=c.certification_id
                left join users e on e.id=d.user_id
                left join assignmentd_po f on f.assignment_id=a.assignment_id and f.committee_id=a.committee_id and f.status='1' 
                WHERE a.assignment_id=? and a.status='0'";
        $query = $this->db->query($sql, array($assignment_id));
        return $query->getResult();
    }

    public function get_lulus($assignment_id, $committee_id)
    {
        $sql = " SELECT COUNT(scope_score) as jml FROM assignmentd_score WHERE assignment_id=? 
                and committee_id=? and scope_score='Y'";
        $query = $this->db->query($sql, array($assignment_id, $committee_id))->getRow();
        return $query->jml;
    }

    public function get_certificant($assignment_id)
    {
        $sql = "select b.full_name nama_lengkap from certification a 
                left join users b on a.user_id=b.id
                where certification_id=(select certification_id from assignment WHERE assignment_id=?) ";
        $query = $this->db->query($sql, array($assignment_id))->getRow();
        return $query->nama_lengkap;
    }

    public function get_email_certification_committee($committee_id)
    {
        $sql = "select email from users where id=?";
        $query = $this->db->query($sql, array($committee_id))->getRow();
        return $query->email;
    }
}
