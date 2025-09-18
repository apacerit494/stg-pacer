<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class CertificationModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Certification
     * Hakim
     * 2022-11-17
     */

    function jqgrid_certification($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";


        $sql = "select 
        a.certification_id,
        a.certification_number,
        a.apply_date,
        f.full_name,
        a.level_auditor,
        h.code_description level_auditor_approved,
        i.code_description level_auditor_pengajuan,
        a.status,
        DATE_FORMAT(a.start_date, '%d %b %Y') start_date,
        DATE_FORMAT(a.end_date, '%d %b %Y') end_date,
        a.createdAt,
        a.updatedAt,
        a.surat_persetujuan,
        fhd_scope(a.certification_id) scope_code,
        fhd_hasil_akhir(a.certification_id) hasil_akhir
        from certification a
        left join users f on a.user_id=f.id 
        left join ref_certification_type g on a.certification_type_id=g.certification_type_id
        left join lsp_master_code h on h.code_value= a.level_auditor and h.code_type='level_auditor' 
        left join lsp_master_code i on i.code_value= a.level_auditor_pengajuan and i.code_type='level_auditor'";
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

    function jqgrid_certification_asli($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();

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
        h.code_description level_auditor_desc,
        a.createdAt,
        a.updatedAt,
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
        b.doc_path doc_path_education,
        c.experience_id,
        c.company_name,
        c.departement_id,
        l.code_description departement_id_desc,
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
        k.code_description relation_status_desc,
       
        e.doc_path doc_path_training
        
        from certification a
        left join education b on a.certification_id=b.certification_id 
        left join experience c on a.certification_id=c.certification_id 
        left join audit_experience d on a.certification_id=d.certification_id 
        left join training e on a.certification_id=e.certification_id
        left join users f on a.user_id=f.id 
        left join ref_certification_type g on a.certification_type_id=g.certification_type_id
        left join lsp_master_code h on h.code_value= a.level_auditor and h.code_type='level_auditor'
        left join lsp_master_code i on i.code_value= b.level and i.code_type='level'
        left join lsp_master_code j on j.code_value= b.accreditation_status and j.code_type='accreditation_status'
        left join lsp_master_code k on k.code_value= e.relation_status and k.code_type='relation_status'
        left join lsp_master_code l on l.code_value= c.departement_id and l.code_type='departement_id'";

        switch (user()->user_type_id) {
            case '5':
                if ($keyword != "") {
                    $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? and a.user_id=?";
                    $keyword     = strtolower($keyword);
                    $keyword     = strtoupper($keyword);
                    $param[]     = '%' . $keyword . '%';
                    $param[] = $user_id;
                } else {
                    $sql .= " where a.user_id=?";
                    $param[] = $user_id;
                }

                break;
            default:
                if ($keyword != "") {
                    $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
                    $keyword     = strtolower($keyword);
                    $keyword     = strtoupper($keyword);
                    $param[]     = '%' . $keyword . '%';
                }
                break;
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function get_data_certification_by_id($id)
    {
        $sql = "select 
                a.certification_id,
                a.certification_number,
                a.apply_date,
                a.scope_id,
                a.user_id,
                a.certification_type_id,
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
                e.doc_path doc_path_training,
                f.full_name
                
                from certification a
                left join education b on a.certification_id=b.certification_id 
                left join experience c on a.certification_id=c.certification_id 
                left join audit_experience d on a.certification_id=d.certification_id 
                left join training e on a.certification_id=e.certification_id 
                left join users f on f.id=a.user_id
                where a.certification_id=?";

        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_certification($data)
    {
        $builder = $this->db->table('certification');
        $builder->insert($data);
    }

    public function update_certification($data, $id)
    {
        $builder = $this->db->table('certification');
        $builder->where('certification_id', $id);
        $builder->update($data);
    }

    public function delete_certification($id)
    {
        $builder = $this->db->table('certification');
        $builder->where('certification_id', $id);
        $builder->delete();
    }

    public function get_certification_type($certification_type_id)
    {
        $sql = "Select * from ref_certification_type where certification_type_id=?";
        $query = $this->db->query($sql, $certification_type_id);
        return $query->getRowArray();
    }

    public function get_user_id($assignment_id)
    {
        $sql = "select user_id from certification where certification_id=(select certification_id from assignment where assignment_id=? limit 1)";
        $query = $this->db->query($sql, $assignment_id);
        $row = $query->getRow();
        return $row->user_id;
    }

    public function get_cost_multi($certification_type_id)
    {
        $sql = "Select sum(cost) cost from ref_certification_type where " . $certification_type_id;
        $query = $this->db->query($sql);
        return $query->getRowArray();
    }

    public function get_cost_fieldcode()
    {
        $sql = "Select cost from ref_certification_type where certification_type_id='8'";
        $query = $this->db->query($sql);
        return $query->getRowArray();
    }


    public function get_certification($id = false)
    {
        $sql = "select a.*,b.description
            from certification a
            left join ref_certification_type b on a.certification_type_id =b.certification_type_id";
        if ($id) {
            $sql .= " Where certification_id =? ";
            $query = $this->db->query($sql, $id);
            return $query->getRowArray();
        } else {
            $query = $this->db->query($sql);
            return $query->getResultArray();
        }
    }
    
    public function get_certification_assesmented()
    {
        $sql = "SELECT d.full_name,a.certification_id,a.certification_number,e.scope_code,e.scope_description,IF(a.level_auditor=1,'Auditor Mula',IF(a.level_auditor=2,'Auditor',IF(a.level_auditor=3,'Auditor Kepala','Auditor Utama'))) AS level_auditor,a.start_date,a.end_date
            FROM certification a
            LEFT JOIN assignment b ON (b.certification_id = a.certification_id)
            LEFT JOIN assignmentd_score c ON(b.assignment_id = c.assignment_id)
            LEFT JOIN users d ON(a.user_id = d.id)
            LEFT JOIN ref_scope e ON(a.scope_id = e.scope_id)
            LEFT JOIN (SELECT invoice.certification_id,COUNT(invoice.status) AS paid FROM invoice WHERE invoice.status='2' GROUP BY invoice.certification_id) f ON(a.certification_id = f.certification_id)
            WHERE a.status ='3' AND c.scope_score='Y' AND c.status='2' AND f.paid=2 AND YEAR(a.start_date) > YEAR(NOW())-5 ORDER BY a.start_date DESC";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    
    public function get_certification_assesmented2()
    {
        $sql = "SELECT d.full_name,a.certification_id,a.certification_number,e.scope_code,e.scope_description,IF(a.level_auditor=1,'Auditor Mula',IF(a.level_auditor=2,'Auditor',IF(a.level_auditor=3,'Auditor Kepala','Auditor Utama'))) AS level_auditor,a.start_date,a.end_date
            FROM certification a
            LEFT JOIN assignment b ON (b.certification_id = a.certification_id)
            LEFT JOIN assignmentd_score c ON(b.assignment_id = c.assignment_id)
            LEFT JOIN users d ON(a.user_id = d.id)
            LEFT JOIN ref_scope e ON(a.scope_id = e.scope_id)
            LEFT JOIN (SELECT invoice.certification_id,COUNT(invoice.status) AS paid FROM invoice WHERE invoice.status='2' GROUP BY invoice.certification_id) f ON(a.certification_id = f.certification_id)
            WHERE a.status ='4' AND c.scope_score='Y' AND c.status='2' AND f.paid=2 AND YEAR(a.start_date) > YEAR(NOW())-5 ORDER BY a.start_date DESC";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    
    public function get_certification_assesmented3()
    {
        $sql = "SELECT d.full_name,a.certification_id,a.certification_number,e.scope_code,e.scope_description,IF(a.level_auditor=1,'Auditor Mula',IF(a.level_auditor=2,'Auditor',IF(a.level_auditor=3,'Auditor Kepala','Auditor Utama'))) AS level_auditor,a.start_date,a.end_date
            FROM certification a
            LEFT JOIN assignment b ON (b.certification_id = a.certification_id)
            LEFT JOIN assignmentd_score c ON(b.assignment_id = c.assignment_id)
            LEFT JOIN users d ON(a.user_id = d.id)
            LEFT JOIN ref_scope e ON(a.scope_id = e.scope_id)
            LEFT JOIN (SELECT invoice.certification_id,COUNT(invoice.status) AS paid FROM invoice WHERE invoice.status='2' GROUP BY invoice.certification_id) f ON(a.certification_id = f.certification_id)
            WHERE a.status ='5' AND c.scope_score='Y' AND c.status='2' AND f.paid=2 AND YEAR(a.start_date) > YEAR(NOW())-5 ORDER BY a.start_date DESC";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_certification_scope($id)
    {
        $sql = "select *
            from certificationd_scope where certification_id=? ";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function get_certification_fieldcode($id)
    {
        $sql = "select *
            from certificationd_fieldcode where certification_id=? ";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }
    
    public function get_certification_fieldcode2($id)
    {
        $sql = "select distinct fieldcode_id
            from certificationd_fieldcode where certification_id=? order by fieldcode_id";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function get_education($id)
    {
        $sql = "select * from education where certification_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_experience($id)
    {
        $sql = "select * from experience where certification_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_audit_experience($id)
    {
        $sql = "select * from audit_experience where certification_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function get_training($id)
    {
        $sql = "select * from training where certification_id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }

    public function insert_certification_scope($data)
    {
        $builder = $this->db->table('certificationd_scope');
        $builder->insert($data);
    }

    public function insert_certification_type($data)
    {
        $builder = $this->db->table('certificationd_type');
        $builder->insert($data);
    }

    public function insert_certification_fieldcode($data)
    {
        $builder = $this->db->table('certificationd_fieldcode');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function insert_certification_education($data)
    {
        $builder = $this->db->table('education');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function insert_certification_experience($data)
    {
        $builder = $this->db->table('experience');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function insert_certification_audit_experience($data)
    {
        $builder = $this->db->table('audit_experience');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function insert_audit_experienced_role($data)
    {
        $builder = $this->db->table('audit_experienced_role');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function insert_audit_experienced_scope($data)
    {
        $builder = $this->db->table('audit_experienced_scope');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function insert_training($data)
    {
        $builder = $this->db->table('training');
        $builder->insert($data);
        return $this->db->insertID();
    }

    public function get_certification_id()
    {
        $sql = "select * from certification order by certification_id desc limit 1";
        $query = $this->db->query($sql);
        $row = $query->getRowArray();
        if ($row == Null) {
            return '1';
        } else {
            return $row['certification_id'] + 1;
        }
    }

    public function get_audit_experience_id($id)
    {
        $sql = "select * from audit_experience where certification_id=?";
        $query = $this->db->query($sql, $id);
        $row = $query->getRowArray();

        return $row['audit_experience_id'];
    }

    public function get_role_id($id)
    {
        $sql = "select * from audit_experienced_role where audit_experience_id=?";
        $query = $this->db->query($sql, $id);
        $row = $query->getRowArray();
        return $row['role_id'];
    }

    public function check_invoice($user_id)
    {
        $sql = "select count(invoice_id) jml from invoice where user_id=? and status<>'2'";
        $query = $this->db->query($sql, $user_id);
        $row = $query->getRowArray();
        return $row['jml'];
    }

    public function check_certification($user_id)
    {
        $sql = "select count(user_id) jml from certification where user_id=? and status in ('1','2')  ";
        $query = $this->db->query($sql, $user_id);
        $row = $query->getRowArray();
        return $row['jml'];
    }


    public function check_invoice_register($user_id)
    {
        $sql = "select count(invoice_id) jml from invoice where user_id=? and status";
        $query = $this->db->query($sql, $user_id);
        $row = $query->getRowArray();
        return $row['jml'];
    }

    public function insert_invoice($data)
    {
        $builder = $this->db->table('invoice');
        $builder->insert($data);
    }

    public function insert_invoice_detail($data)
    {
        $builder = $this->db->table('invoiced_product');
        $builder->insert($data);
    }

    public function check_scope($scope_id, $user_id, $id)
    {
        if ($id == "") {
            $sql = "select count(*) jml from certification where scope_id=? and  user_id=?";
            $query = $this->db->query($sql, array($scope_id, $user_id));
        } else {
            $sql = "select count(*) jml from certification where scope_id=? and  user_id=? and certification_id<>?";
            $query = $this->db->query($sql, array($scope_id, $user_id, $id));
        }
        $row = $query->getRowArray();
        return $row['jml'];
    }
    
     public function check_scope2($scope_id, $user_id)
    {
        $sql = "select count(a.certification_id) jml from certification a 
                    left join assignment b on b.certification_id=a.certification_id
                    left join assignmentd_score c on c.assignment_id=b.assignment_id 
                    where a.scope_id=? and  a.user_id=? and c.scope_score='Y' and c.status='2'";
        $query = $this->db->query($sql, array($scope_id, $user_id));
        $row = $query->getRowArray();
        return $row['jml'];
    }

    // public function check_fieldcode($scope_id, $fieldcode_id, $user_id)
    // {
    //     $sql="select count(*) from certificationd_fieldcode where "
    // }


    public function get_cost($id)
    {
        $sql = "select cost from ref_certification_type where certification_type_id=?";
        $query = $this->db->query($sql, $id);
        $row = $query->getRowArray();
        return $row['cost'];
    }

    public function get_data_comment_by_id($id)
    {
        $sql = "select a.*,b.full_name,b.user_type_id 
            from certificationd_comments a
            left join users b on b.id=a.user_id
            where certification_id=? 
            order by a.comment_date";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function insert_comment($data)
    {
        $this->db->table('certificationd_comments')->insert($data);
    }

    /** 
     * Pengajuan Sertifikasi
     * Hakim
     * 2022-12-09
     */

    public function get_data_educations($user_id)
    {
        $sql = "select a.*,b.code_description from education a
        left join lsp_master_code b on b.code_value=a.accreditation_status and b.code_type='accreditation_status' 
        where a.user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_data_experiences($user_id)
    {
        $sql = "select a.*,b.code_description from experience a
        left join lsp_master_code b on b.code_value=a.departement_id and b.code_type='departement_id' 
        where user_id=?";
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
        $sql = "select a.*,b.code_description from training a
        left join lsp_master_code b on b.code_value=a.relation_status and b.code_type='relation_status' 
        where user_id=?";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_data_certifications($user_id)
    {
        $sql = "select a.*,b.code_description  from certification a 
                left join lsp_master_code b on b.code_value=a.status and code_type='certification_status'
                where user_id=? order by a.status,apply_date desc";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_comment_id($user_ida)
    {
        $sql = "select fhd_insert_comment_id(?) id;";
        $query = $this->db->query($sql, $user_ida);
        $row = $query->getRowArray();
        return $row['id'];
    }

    public function get_certification_proses($user_id)
    {
        $sql = "select count(*) jml from certification where user_id=? and (status<>'3') ";
        $query = $this->db->query($sql, $user_id);
        $row = $query->getRowArray();
        return $row['jml'];
    }

    public function get_data_users()
    {
        $sql = "select * from users order by full_name";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }


    function insert_pengajuan_sertifikasi($data)
    {
        $builder = $this->db->table('certification');
        $builder->insert($data);
    }

    public function update_pengajuan_sertifikasi($data, $id)
    {
        $this->db->table('certification')->where('certification_id', $id)->update($data);
    }

    public function insert_pengajuan_sertifikasi_scope($data)
    {
        $builder = $this->db->table('certificationd_scope');
        $builder->insert($data);
    }

    public function update_pengajuan_sertifikasi_scope($data, $id)
    {
        $this->db->table('certificationd_scope')->where('certification_id', $id)->update($data);
    }

    public function insert_pengajuan_sertifikasi_fieldcode($data)
    {
        $this->db->table('certificationd_fieldcode')->insert($data);
    }

    public function update_pengajuan_sertifikasi_fieldcode($data, $id)
    {
        $this->db->table('certificationd_fieldcode')->where('certification_id', $id)->update($data);
    }

    public function insert_pengajuan_sertifikasi_type($data)
    {
        $builder = $this->db->table('certificationd_type');
        $builder->insert($data);
    }

    public function update_education($data, $user_id)
    {
        $this->db->table('education')->where('user_id', $user_id)->where('certification_id', Null)->update($data);
    }

    public function update_experience($data, $user_id)
    {
        $this->db->table('experience')->where('user_id', $user_id)->where('certification_id', Null)->update($data);
    }

    public function update_audit_experience($data, $user_id)
    {
        $this->db->table('audit_experience')->where('user_id', $user_id)->where('certification_id', Null)->update($data);
    }

    public function update_training($data, $user_id)
    {
        $this->db->table('training')->where('user_id', $user_id)->where('certification_id', Null)->update($data);
    }

    public function get_last_invoice($year, $month)
    {
        $sql = "select * from invoice
                where extract(year from invoice_date)=?
                and extract(month from invoice_date)=?
                order by invoice_number desc
                limit 1";
        $query = $this->db->query($sql, array($year, $month));
        return $query->getRowArray();
    }

    public function check_scope_score($assignment_id, $committee_id)
    {
        $sql = "select count(*) jml from assignmentd_score where assignment_id=? and committee_id=? and scope_score='Y'";
        $query = $this->db->query($sql, array($assignment_id, $committee_id));
        $row = $query->getRow();
        return $row->jml;
    }

    public function get_coments($certification_id)
    {
        $sql = "select a.*,b.full_name,b.user_type_id 
                from certificationd_comments a 
                left join users b on b.id=a.user_id
                where a.certification_id=? order by a.comment_date asc";
        $query = $this->db->query($sql, $certification_id);
        return $query->getResultArray();
    }

    public function get_field_code($scope_id)
    {
        $sql = "select a.fieldcode_id, b.fieldcode_code,b.fieldcode_description
                from ref_fieldmap a 
                left join ref_fieldcode b on a.fieldcode_id=b.fieldcode_id
                where a.scope_id=? 
                order by b.fieldcode_code";
        $query = $this->db->query($sql, $scope_id);
        return $query->getResultArray();
    }

    public function get_field_code_select($certification_id, $scope_id)
    {
        $sql = "select a.fieldcode_id, b.fieldcode_code,b.fieldcode_description
        from certificationd_fieldcode a 
        left join ref_fieldcode b on a.fieldcode_id=b.fieldcode_id
        where a.certification_id=? and a.scope_id=? 
        order by b.fieldcode_code";
        $query = $this->db->query($sql, array($certification_id, $scope_id));
        return $query->getResultArray();
    }

    public function get_scopes_by_certification_id($certification_id)
    {
        $sql = "select * from certificationd_scope where certification_id=? order by scope_id";
        $query = $this->db->query($sql, $certification_id);
        return $query->getResultArray();
    }

    public function get_fieldcode_by_certification_id($certification_id, $scope_id)
    {
        $sql = "select * from certificationd_fieldcode where certification_id=? and scope_id=? order by scope_id";
        $query = $this->db->query($sql, array($certification_id, $scope_id));
        return $query->getResultArray();
    }

    public function get_discount($voucher_code)
    {
        $sql = " select fhd_discount(?) discount";
        $query = $this->db->query($sql, $voucher_code);
        return $query->getRowArray();
    }
    
     public function get_email($certificant_id)
    {
        $sql = "select a.user_id,a.certification_number,b.* from certification a 
                left join users b on a.user_id=b.id 
                where a.certification_id=? limit 1";
        $query = $this->db->query($sql, $certificant_id);
        return $query->getRow();
    }
    
    
    public function get_data_detail($id)
    {
        $sql = "select * from certification  
                where certification_id=? limit 1";
        $query = $this->db->query($sql, $id);
        return $query->getRow();
    }
    
    public function get_last_certification_number()
    {
        $sql="SELECT LPAD(CAST(SUBSTRING(certification_number, -5) AS UNSIGNED) + 1, 5, '0') AS last_number
            FROM certification
            ORDER BY last_number DESC
            limit 1";
        $query = $this->db->query($sql)->getRow();
        return $query->last_number;
   
        
    }
    

    /** end of Pengajuan Sertifikasi */
}
