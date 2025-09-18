<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ReportModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Certification
     * Hakim Desyanto
     * 2023-08-11
     */

    public function get_data_certification($id)
    {
        $sql = "SELECT 
                     b.full_name,
                    c.scope_code,
                    c.scope_id,
                    a.certification_number,
                    d.code_value,
                    d.code_description,
                    a.start_date,
                    a.end_date,     
                    b.profile_picture,
                    b.birth_place,
                    b.birth_date,
                    b.address,
                    (e.education_score + e.training_score + e.audit_experience_score + e.experience_score + e.written_exam_score + e.pratical_exam_score + e.observation_score ) total_score
                
                FROM certification a
                left join users b on a.user_id=b.id
                left join ref_scope c on c.scope_id=a.scope_id
                left join lsp_master_code d on d.code_value=a.level_auditor and d.code_type='level_auditor'
                left join assignment f on f.certification_id=a.certification_id
                left join assignmentd_score e on e.assignment_id=f.assignment_id 
                where a.certification_id=? and e.status='2'";

        $query = $this->db->query($sql, array($id));
        return $query->getRowArray();
    }

    public function get_field_code($certification_id)
    {
        $sql = "select a.scope_id,a.fieldcode_id,
                a.committee_id,
                b.fieldcode_code,
                b.fieldcode_description
                
                from assignmentd_fieldcode a
                left join ref_fieldcode b on b.fieldcode_id=a.fieldcode_id
                left join users c on a.committee_id=c.id
                where a.assignment_id=(select assignment_id from assignment where certification_id=? )
                and a.score='Y' and c.user_type_id='4'";
        $query = $this->db->query($sql, array($certification_id));
        return $query->getResult();
    }
}
