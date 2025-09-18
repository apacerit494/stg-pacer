<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ProfileModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Profile
     * Hakim
     * 2022-11-19
     */

    public function get_user($user_id)
    {
        $sql = "select a.*,b.code_description gender_description, c.province_name,d.district_name, e.subdistrict_name
            from users a
            left join lsp_master_code b on a.gender=b.code_value and b.code_type='gender' 
            left join ref_province c on c.province_id=a.province_id  
            left join ref_district d on d.district_id=a.district_id 
            left join ref_subdistrict e on e.subdistrict_id=a.subdistrict_id
            where a.id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getRowArray();
    }

    public function get_educations($user_id)
    {
        $sql = "select a.*,b.code_description status_akreditasi
             from education a 
             left join lsp_master_code b on a.accreditation_status=b.code_value and b.code_type='accreditation_status' 
             where a.user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_experiences($user_id)
    {
        $sql = "select a.*,b.code_description departement
        from experience a
        left join lsp_master_code b on a.departement_id=b.code_value and b.code_type='departement_id' 
        where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_audit_experiences($user_id)
    {
        $sql = "select * from audit_experience where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_trainings($user_id)
    {
        $sql = "select a.*,b.code_description relation
         from training a
         left join lsp_master_code b on a.relation_status=b.code_value and b.code_type='relation_status' 
         where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_scopes($id)
    {
        $sql = "select a.*,b.scope_code,b.scope_description 
                from audit_experienced_scope a
                left join ref_scope b on a.scope_id=b.scope_id
                 where audit_experience_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function get_roles($id)
    {
        $sql = "select a.*,b.role_name 
                from audit_experienced_role a
                left join ref_role b on a.role_id=b.role_id
                 where audit_experience_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function get_types($id)
    {
        $sql = "select a.*,b.description 
                from certificationd_type a
                left join ref_certification_type b on a.certification_type_id=b.certification_type_id
                where a.certification_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function get_certifications($user_id)
    {
        $sql = "select a.*,b.code_description level_auditor1
         from certification a
         left join lsp_master_code b on a.level_auditor=b.code_value and b.code_type='level_auditor' 
         where a.user_id=? and a.status='3'";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }


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
        g.description,
        g.cost,
        a.level_auditor,
        a.createdAt,
        a.updatedAt,
        b.education_id,
        b.level,
        b.university,
        b.major,
        b.start_date start_date_education,
        b.end_date end_date_education,
        b.certificate_number,
        b.accreditation_status,
        b.doc_path doc_path_education,
        c.experience_id,
        c.company_name,
        c.departement_id,
        c.position,
        c.start_date start_date_experience,
        c.end_date end_date_experience,
        c.doc_path doc_path_experience,
        d.audit_experience_id,
        d.company_addres,
        d.company_phone,
        d.contact_person,
        d.start_date start_date_audit_experience,
        d.end_date end_date_audit_experience,
        d.doc_audit_plan_path,
        d.doc_work_order_path,
        e.training_id ,
        e.provider_name,
        e.start_date start_date_training,
        e.end_date end_date_training,
        e.training_topic,
        e.relation_status,
        e.doc_path doc_path_training
        
        from certification a
        left join education b on a.certification_id=b.certification_id 
        left join experience c on a.certification_id=c.certification_id 
        left join audit_experience d on a.certification_id=d.certification_id 
        left join training e on a.certification_id=e.certification_id
        left join users f on a.user_id=f.id 
        left join ref_certification_type g on a.certification_type_id=g.certification_type_id ";

        if ($status == '1') {
            $sql .= " where a.certification_id not in ( select certification_id from assignment) ";
        } else {
            $sql .= " where a.certification_id in ( select certification_id from assignment) ";
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
        $builder->insertBatch($data);
    }

    public function insert_assignmentd_to($data)
    {
        $builder = $this->db->table('assignmentd_to');
        $builder->insertBatch($data);
    }

    public function delete_assignment($id)
    {
        $builder = $this->db->table('assignment');
        $builder->where('certification_id', $id);
        $builder->delete();
    }
}
