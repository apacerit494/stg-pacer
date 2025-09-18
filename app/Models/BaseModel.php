<?php

namespace App\Models;

use CodeIgniter\Model;
use PHPUnit\Framework\MockObject\Stub\ReturnReference;

class BaseModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    function get_uuid()
    {
        $sql = "select uuid()";
        $query = $this->db->query($sql);
        $row = $query->getRowarray();
        return $row['uuid'];
    }

    function getdata($table, $field, $criteria)
    {
        $sql = "SELECT * FROM " . $table . " WHERE " . $criteria;
        $row = $this->db->query($sql)->getRowArray();
        if ($row) {
            return $row[$field];
        } else {
            return FALSE;
        }
    }

    function isgetdata($table, $criteria)
    {
        $sql = "SELECT * FROM " . $table . " WHERE " . $criteria;
        $row = $this->db->query($sql)->getRowArray();
        if ($row) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    function getdata4selectoption($table, $fieldkey, $fields, $criteria = '', $selected = '', $insertempty = false)
    {
        $sql = "SELECT * FROM " . $table;
        if ($criteria != '') {
            $sql = $sql . " WHERE " . $criteria;
        }
        $rows = $this->db->query($sql)->getResultArray();
        if ($rows) {
            $option = '';
            if ($insertempty) {
                $option = '<option value="">&nbsp;</option>';
            }
            foreach ($rows as $record) {
                $option = $option . '<option value="' . $record[$fieldkey] . '" ';
                if ($selected == htmlentities($record[$fieldkey], ENT_QUOTES)) {
                    $option = $option . ' selected ';
                }
                $option = $option . '>';

                $first = true;
                foreach ($fields as $field) {
                    if ($first) {
                        $first = false;
                    } else {
                        $option = $option . " | ";
                    }
                    $option = $option . $record[$field];
                }
                $option = $option . '</option>';
            }
            return $option;
        } else {
            return FALSE;
        }
    }



    public function get_menu($role_id, $menu_parent = 0)
    {
        // $role_id = session('user_type_id');
        $sql = "SELECT lsp_menu.menu_id
		,lsp_menu.menu_parent
		,lsp_menu.menu_title
		,lsp_menu.menu_url
		,lsp_menu.menu_type
		,lsp_menu.menu_icon_parent 
		,lsp_menu.icon_color
		FROM lsp_menu
		LEFT JOIN lsp_user_nav ON lsp_user_nav.menu_id = lsp_menu.menu_id
		WHERE lsp_user_nav.role_id = ? AND lsp_menu.menu_parent = ? ORDER BY position ASC";
        $query = $this->db->query($sql, array($role_id, $menu_parent));

        return $query->getResultArray();
    }

    //menu
    public function get_menu_id($menu_url)
    {
        $sql = "SELECT menu_id FROM lsp_menux WHERE menu_url = ?";
        $query = $this->db->query($sql, array($menu_url));

        $row = $query->getRowArray();

        if (count($row) > 0)
            return $row['menu_id'];
        else
            return NULL;
    }

    public function authentication($username, $password, $salt)
    {
        $password = sha1($password . $salt);
        $sql = "SELECT
				lsp_user.user_id,
				lsp_user.username,
				lsp_user.status,
				lsp_user.role_id,
				lsp_user.fullname,
				lsp_user.branch_code,
				life_branch.branch_name,
				life_branch.branch_class
				FROM
				lsp_userx
				INNER JOIN life_branch ON lsp_user.branch_code = life_branch.branch_code
				WHERE lsp_user.username = ? and lsp_user.password = ? and lsp_user.status='1'
			   ";
        $query = $this->db->query($sql, array($username, $password));

        return $query->getRowArray();
    }

    function has_sub_menu($menu_id)
    {
        $sql = "select count(*) num from lsp_menux where menu_parent = ?";
        $query = $this->db->query($sql, array($menu_id));
        $row = $query->getRowArray();
        if ($row['num'] == 0) {
            return false;
        } else {
            return true;
        }
    }

    function get_menu_position($menu_parent = 0)
    {
        $sql = "SELECT lsp_menu.menu_id
		,lsp_menu.menu_parent
		,lsp_menu.menu_title
		,lsp_menu.menu_url
		,lsp_menu.menu_icon_parent 
		FROM lsp_menux 
		WHERE lsp_menu.menu_parent = ? ORDER BY position ASC";

        $query = $this->db->query($sql, array($menu_parent));

        return $query->getResultArray();
    }

    function get_list_code($code_group)
    {
        $sql = "select code_value,display_text from h_master_code where code_group=? order by display_sort asc";
        $query = $this->db->query($sql, array($code_group));
        return $query->getResultArray();
    }

    // public function get_notifications()
    // {
    //     $sql = "
    // 		SELECT
    // 			y.code_description as title,
    // 			substring(x.description,0,1000) as subtitle,
    // 			x.due_date as date,
    // 			x.nominal as amount,
    // 			x.notification_type as notiftype
    // 		FROM h_due_date_notification x, h_master_code y
    // 		WHERE x.notification_type=y.code_value AND y.code_type='NOTIFICATION_TYPE'
    // 		AND x.closing_date<=? AND x.status='0'
    // 	";
    //     $date = date('Y-m-d');
    //     $query = $this->db->query($sql, array($date));
    //     return $query->getResultArray();
    // }

    function get_fund_types()
    {
        $sql = "select * from dfi_reference where reference_name='FUND_TYPE' order by 1 asc";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function get_level_accounts()
    {
        $sql = "select * from dfi_reference where reference_name='LEVEL_ACCOUNT' order by 1 asc";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function get_class_accounts()
    {
        $sql = "select * from dfi_gl_account_class where description<>'ROOT' order by 1 asc";

        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    function get_flag_reports()
    {
        $sql = "select * from dfi_reference where reference_name='FLAG_REPORT' order by 1 asc";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    function get_uoms()
    {
        $sql = "select * from dfi_uom order by 1 asc";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function get_account_codes()
    {
        $sql = "select * from dfi_gl_account order by account_code asc";

        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function get_report_nos()
    {
        //$sql = "select report_no,report_name from dfi_gl_report_master where ojk_internal_flag ='1'  order by report_no";
        $sql = "select report_no,report_name from dfi_gl_report_master  order by report_no";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_provinces()
    {
        $sql = "select * from ref_province";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_user_types()
    {
        $sql = "select * from lsp_user_role";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_districts($province_id = "")
    {
        $sql = "select * from ref_district";
        if ($province_id <> "") {
            $sql .= " where province_id=?";
        }
        $query = $this->db->query($sql, array($province_id));
        return $query->getResultArray();
    }

    public function get_subdistricts($district_id = "")
    {
        $sql = "select * from ref_subdistrict";
        if ($district_id <> "") {
            $sql .= " where district_id=?";
        }
        $query = $this->db->query($sql, array($district_id));
        return $query->getResultArray();
    }

    public function get_villages($subdistrict_id = "")
    {
        $sql = "select * from ref_village";
        if ($subdistrict_id <> "") {
            $sql .= " where subdistrict_id=?";
        }
        $query = $this->db->query($sql, array($subdistrict_id));
        return $query->getResultArray();
    }

    public function get_scopes()
    {
        $sql = "select * from ref_scope";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_users()
    {
        $sql = "select * from users where user_type_id='5' order by full_name";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_field_codes()
    {
        $sql = "select * from ref_fieldcode order by fieldcode_code";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_field_codes_new($scope_id)
    {
        $sql = "select a.fieldcode_id, b.fieldcode_code,b.fieldcode_description
                from ref_fieldmap a 
                left join ref_fieldcode b on a.fieldcode_id=b.fieldcode_id
                where a.scope_id=? 
                order by b.fieldcode_code";
        $query = $this->db->query($sql, $scope_id);
        return $query->getResultArray();
    }

    public function get_certification_types()
    {
        $sql = "select * from ref_certification_type where certification_type_id not in ('1','5','6') ";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_perans()
    {
        $sql = "select * from ref_role";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function getdatatoarray($table, $field, $param)
    {

        if ($param == "") {
            $sql = "SELECT " . $field . " id FROM " . $table;
        } else {
            $sql = "SELECT " . $field . " id FROM " . $table . " where " . $param;
        }

        $query = $this->db->query($sql, $field);
        return $query->getResultArray();
    }

    function getdatatoarray2($table, $field1, $field2)
    {

        if ($table == 'ref_certification_type') {
            $sql = "SELECT "  . $field1 . " id, " . $field2 . " name FROM  " . $table . " where certification_type_id <>'1'";
        } else {

            $sql = "SELECT "  . $field1 . " id, " . $field2 . " name FROM  " . $table;
        }
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function getdatatoarray21($scope_id)
    {
        $sql = "SELECT * FROM  ref_fieldcode where scope_id=?";
        $query = $this->db->query($sql, $scope_id);
        return $query->getResultArray();
    }

    public function get_committees()
    {
        $sql = "Select * from users where user_type_id='3'";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_committee_certifications()
    {
        $sql = "Select * from users where user_type_id='4'";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_select_master_code($code_type)
    {
        $sql = "select * from lsp_master_code where code_type=? order by code_value";
        $query = $this->db->query($sql, array($code_type));
        return $query->getResultArray();
    }

    public function get_url_parent($url)
    {
        $sql = "SELECT
        a.menu_id,
        (case when b.menu_title is null then '- Parent -' else b.menu_title end) as menu_parent,
        a.menu_title,
        a.menu_url,
        a.menu_type,
        a.menu_icon_parent
        FROM lsp_menu a
        LEFT JOIN lsp_menu b ON a.menu_parent=b.menu_id
        where  a.menu_url=?";
        $query = $this->db->query($sql, array($url));
        $row = $query->getRowArray();
        return $row['menu_parent'];
    }

    public function get_genders()
    {
        $sql = "select * from lsp_master_code where code_type='gender'";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function check_email($email, $id = "")
    {
        $sql = "select count(*) jml from users where email=?";
        $param = array();
        $param[] = $email;
        if ($id != "") {
            $sql .= " and id<>?";
            $param[] = $id;
        }

        $query = $this->db->query($sql, $param);
        $row = $query->getRowArray();
        return $row['jml'];
    }
    
    public function check_username($username, $id = "")
    {
        $sql = "select count(*) jml from users where username=?";
        $param = array();
        $param[] = $username;
        if ($id != "") {
            $sql .= " and id<>?";
            $param[] = $id;
        }

        $query = $this->db->query($sql, $param);
        $row = $query->getRowArray();
        return $row['jml'];
    }

    public function get_user($id)
    {
        $sql = "select * from users where id=? ";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_auth_groups_users($data)
    {
        $this->db->table('auth_groups_users')->insert($data);
    }

    public function get_id($email)
    {
        $sql = "select id from users where email=?";
        $query = $this->db->query($sql, $email)->getRow();
        return $query->id;
    }

    public function get_notifications($user_id)
    {
        $sql = "select * from notification where user_id=? and read_status='0'";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_certificants()
    {
        $sql = "select a.user_id,b.full_name from certification a 
                left join users b on a.user_id=b.id
                group by a.user_id";
        $query = $this->db->query($sql);
        return $query->getResult();
    }
    
     public function get_total_certificants()
    {
        $sql = "select count(*) jml from users where user_type_id='5'";
        $query = $this->db->query($sql)->getRow();
        return $query->jml;
    }

    public function get_total_new_certifications()
    {
        $sql = "select count(*) jml from certification where certification_type_id='2'";
        $query = $this->db->query($sql)->getRow();
        return $query->jml;
    }

    public function get_total_extension_certifications()
    {
        $sql = "select count(*) jml from certification where certification_type_id='3'";
        $query = $this->db->query($sql)->getRow();
        return $query->jml;
    }

    public function get_total_auditor_tidak_perpanjang()
    {
        $sql = "select count(*) jml from certification where end_date<curdate() and end_date<>'0000-00-00' and user_id not in (SELECT user_id FROM certification WHERE certification_type_id='3');";
        $query = $this->db->query($sql)->getRow();
        return $query->jml;
    }
    
    public function get_freeze($user_id){
        $sql = "select count(*) jml from certification where user_id=? and status='4' ";
        $query = $this->db->query($sql,array($user_id))->getRow();
        return $query->jml;
    
        
    }
}
