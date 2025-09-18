<?php

namespace App\Models;

use CodeIgniter\Model;

class RegisterModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    public function getUser($id = false)
    {
        $sql = "SELECT
                *
                FROM users
               ";
        if ($id) {
            $sql = $sql . " WHERE id=" . $id;
        }
        $builder = $this->db->query($sql);
        if ($id) {
            return $builder->getRowArray();
        } else {
            return $builder->getResultArray();
        }
    }

    public function get_data_educations($user_id)
    {
        $sql = "select a.*,b.* from education a
        left join lsp_master_code b on b.code_value=a.accreditation_status and b.code_type='accreditation_status' 
        where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_data_users($user_id)
    {
        $sql = "select * from users
        where id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getRowArray();
    }

    public function get_data_experiences($user_id)
    {
        $sql = "select * from experience where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_data_audit_experiences($user_id)
    {
        $sql = "select * from audit_experience where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_data_trainings($user_id)
    {
        $sql = "select * from training where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function insertUser($data)
    {
        $builder = $this->db->table('users');
        $builder->insert($data);
        //   return $this->db->insertID();
    }

    public function insert_invoice($data)
    {
        $builder = $this->db->table('invoice');
        $builder->insert($data);
        return $this->db->insertID();
    }
    public function get_province($id = '')
    {
        $sql = "select * from ref_province";
        if ($id) {
            $sql = $sql . " WHERE province_id=" . $id;
        }
        $builder = $this->db->query($sql);

        if ($id) {
            return $builder->getRowArray();
        } else {
            return $builder->getResultArray();
        }
    }

    public function get_district($id = '')
    {
        $sql = "select * from ref_district";
        if ($id) {
            $sql = $sql . " WHERE district_id=" . $id;
        }
        $builder = $this->db->query($sql);

        if ($id) {
            return $builder->getRowArray();
        } else {
            return $builder->getResultArray();
        }
    }

    function jqgrid_education($sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";


        $sql = "select 
        b.education_id,
        b.level,
        i.code_description level_desc,
        b.university,
        b.major,
        b.start_date start_date_education,
        b.end_date end_date_education,
        b.certificate_number,
        b.accreditation_status,
        j.code_description accreditation_status_desc,
        b.doc_path doc_path_education
        
        from education b
        left join lsp_master_code i on i.code_value= b.level and i.code_type='level'
        left join lsp_master_code j on j.code_value= b.accreditation_status and j.code_type='accreditation_status'";

        switch (user()->user_type_id) {
            case '5':

                $sql .= " where b.user_id=?";
                $param[] = $user_id;


                break;
            default:

                break;
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function jqgrid_experience($sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";


        $sql = "select 
        c.experience_id,
        c.company_name,
        c.departement_id,
        l.code_description departement_id_desc,
        c.position,
        c.start_date start_date_experience,
        c.end_date end_date_experience,
        c.doc_path doc_path_experience
        
        from experience c
        left join lsp_master_code l on l.code_value= c.departement_id and l.code_type='departement_id'";

        switch (user()->user_type_id) {
            case '5':

                $sql .= " where c.user_id=?";
                $param[] = $user_id;


                break;
            default:

                break;
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function jqgrid_audit_experience($sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";


        $sql = "select 
        
        d.audit_experience_id,
        d.company_addres,
        d.company_phone,
        d.contact_person,
        d.start_date start_date_audit_experience,
        d.end_date end_date_audit_experience,
        d.doc_audit_plan_path,
        d.doc_work_order_path
        
        from audit_experience d";

        switch (user()->user_type_id) {
            case '5':

                $sql .= " where d.user_id=?";
                $param[] = $user_id;


                break;
            default:

                break;
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function jqgrid_training($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";


        $sql = "select 
        
        e.training_id ,
        e.provider_name,
        e.start_date start_date_training,
        e.end_date end_date_training,
        e.training_topic,
        e.relation_status,
        k.code_description relation_status_desc,
       
        e.doc_path doc_path_training
        
        from training e
       left join lsp_master_code k on k.code_value= e.relation_status and k.code_type='relation_status'";

        switch (user()->user_type_id) {
            case '5':

                $sql .= " where e.user_id=?";
                $param[] = $user_id;


                break;
            default:

                break;
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    public function insert_education($data)
    {
        $builder = $this->db->table('education');
        $builder->insert($data);
    }

    public function delete_education($id)
    {
        $this->db->table('education')->where('education_id', $id)->delete();
    }

    public function insert_experience($data)
    {
        $builder = $this->db->table('experience');
        $builder->insert($data);
    }

    public function delete_experience($id)
    {
        $this->db->table('experience')->where('experience_id', $id)->delete();
    }

    public function insert_audit_experience($data)
    {
        $builder = $this->db->table('audit_experience');
        $builder->insert($data);
    }

    public function delete_audit($id)
    {
        $this->db->table('audit_experience')->where('audit_experience_id', $id)->delete();
    }

    public function insert_training($data)
    {
        $builder = $this->db->table('training');
        $builder->insert($data);
    }

    public function update_training($data, $id)
    {
        $builder = $this->db->table('training')->where('training_id', $id);
        $builder->update($data);
    }
    public function delete_training($id)
    {
        $this->db->table('training')->where('training_id', $id)->delete();
    }

    public function update_personal($data, $user_id)
    {
        $this->db->table('users')->where('id', $user_id)->update($data);
    }

    public function update_education($data, $id)
    {
        $builder = $this->db->table('education');
        $builder->where('education_id', $id);
        $builder->update($data);
    }

    public function update_experience($data, $id)
    {
        $builder = $this->db->table('experience')->where('experience_id', $id);
        $builder->update($data);
    }

    public function update_audit_experience($data, $id)
    {
        $builder = $this->db->table('audit_experience')->where('audit_experience_id', $id);
        $builder->update($data);
    }

    public function get_data_education_by_id($id)
    {
        $sql = "select * from education where education_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_data_experience_by_id($id)
    {
        $sql = "select * from experience where experience_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_data_audit_experience_by_id($id)
    {
        $sql = "select * from audit_experience where audit_experience_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_data_training_by_id($id)
    {
        $sql = "select * from training where training_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_session($user_id)
    {
        $sql = "select * from users where id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getRowArray();
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
    
      public function check_certification($user_id)
    {
        $sql = "SELECT count(*) jumlah FROM certification
                where user_id=? and status='3'";
        $query = $this->db->query($sql, array($user_id))->getRow();
        return $query->jumlah;
    }
}
