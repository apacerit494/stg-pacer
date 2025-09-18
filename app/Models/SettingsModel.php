<?php

namespace App\Models;

use CodeIgniter\Model;

class SettingsModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /* BEGIN MENU SETUP MODEL */
    function get_data_menu($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT
				a.menu_id,
				(case when b.menu_title is null then '- Parent -' else b.menu_title end) as menu_parent,
				a.menu_title,
				a.menu_url,
				a.menu_type,
				a.menu_icon_parent
				FROM lsp_menu a
				LEFT JOIN lsp_menu b ON a.menu_parent=b.menu_id ";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function get_data_menu_by_id($menu_id)
    {
        $sql = "select * from lsp_menu where menu_id=?";
        $query = $this->db->query($sql, array($menu_id));
        return $query->getRowarray();
    }

    function get_menu_parent()
    {
        $sql = "select
				a.menu_id,
				b.menu_title as menu_parent,
				a.menu_title,
				a.menu_url,
				a.menu_type,
				a.menu_icon_parent,
				a.position
				from lsp_menu a
				left join lsp_menu b on a.menu_parent=b.menu_id
				order by a.menu_parent,a.menu_title
				";

        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function add_menu($data)
    {
    }


    function insert_menu($data)
    {
        //$this->db->insert('lsp_menu', $data);
        $builder = $this->db->table('lsp_menu');
        $builder->insert($data);
        // return $this->db->insertID();
    }
    function update_menu($data, $param)
    {
        // $this->db->update('lsp_menu', $data, $param);
        $builder = $this->db->table('lsp_menu');
        $builder->where('menu_id', $param);
        $builder->update($data);
    }
    function update_menu_posisi($data, $param)
    {
        $builder = $this->db->table('lsp_menu');
        $builder->where('menu_id', $param);
        $builder->update($data);
    }
    function delete_menu($param)
    {
        $builder = $this->db->table('lsp_menu');
        $builder->where('menu_id', $param);
        $builder->delete();
    }
    function get_menu_position($menu_parent = 0)
    {
        $sql = "SELECT lsp_menu.menu_id
		,lsp_menu.menu_parent
		,lsp_menu.menu_title
		,lsp_menu.menu_url
		,lsp_menu.menu_icon_parent 
		FROM lsp_menu 
		WHERE lsp_menu.menu_parent = ? ORDER BY position ASC";

        $query = $this->db->query($sql, array($menu_parent));

        return $query->getResultArray();
    }

    public function get_icons()
    {
        $sql = "select * from lsp_master_code where code_type='icon' order by code_value";
        $query = $this->db->query($sql);
        return $query->getResult();
    }
    /* END MENU SETUP MODEL */


    /* BEGIN ROLE SETUP MODEL */

    function get_roles()
    {
        $sql = "select * from lsp_user_role";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    function get_data_role($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * FROM lsp_user_role";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " $order $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }
    function get_data_role_by_id($role_id)
    {
        $sql = "select * from lsp_user_role where role_id=?";
        $query = $this->db->query($sql, array($role_id));
        return $query->getRowarray();
    }
    function insert_user_role($data)
    {
        $builder = $this->db->table('lsp_user_role');
        $builder->insert($data);
        return $this->db->insertID();
    }
    function update_user_role($data, $param)
    {
        $builder = $this->db->table('lsp_user_role');
        $builder->where('role_id', $param);
        $builder->update($data);
    }
    function delete_user_role($param)
    {
        $builder = $this->db->table('lsp_user_role');
        $builder->where('role_id', $param);
        $builder->delete();
    }
    function get_menu_parent_by_role($role_id)
    {
        $sql = "SELECT
				lsp_menu.menu_id,
				lsp_menu.menu_title,
				lsp_user_nav.role_id
				FROM lsp_menu
				LEFT JOIN lsp_user_nav ON lsp_user_nav.menu_id = lsp_menu.menu_id and lsp_user_nav.role_id = ?
				WHERE lsp_menu.menu_parent = '0' order by lsp_menu.position asc";

        $query = $this->db->query($sql, array($role_id));

        return $query->getResultArray();
    }
    function get_menu_child_by_role($role_id, $menu_parent)
    {
        $sql = "SELECT
				lsp_menu.menu_id,
				lsp_menu.menu_title,
				lsp_user_nav.role_id
				FROM lsp_menu
				LEFT JOIN lsp_user_nav ON lsp_user_nav.menu_id = lsp_menu.menu_id and lsp_user_nav.role_id = ?
				WHERE lsp_menu.menu_parent = ? order by lsp_menu.position asc";

        $query = $this->db->query($sql, array($role_id, $menu_parent));

        return $query->getResultArray();
    }
    function delete_user_nav($param)
    {
        $builder = $this->db->table('lsp_user_nav');
        $builder->where('role_id', $param);
        $builder->delete();
    }
    function insert_batch_user_nav($data)
    {
        $builder = $this->db->table('lsp_user_nav');
        $builder->insertBatch($data);
        // return $this->db->insertID();
    }
    /* END ROLE SETUP MODEL */


    //begin setup company by hakim 151103
    function jqgrid_setup_company($sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select a.id,a.company_code,a.company_name,a.business_type,a.telephone_no,a.faximile_no, 
				a.address,a.city,a.province,a.pos_code,b.code_description from kn_master_company a 
				left join kn_master_code b on b.code_type='BUSINESS_TYPE' and a.business_type=b.code_value
				";

        $sql .= " $order $limit ";
        $query = $this->db->query($sql);

        return $query->getResultArray();
    }
    // function insert_setup_company($data)
    // {
    //     $this->db->insert('kn_master_company', $data);
    // }

    function get_setup_company($id)
    {
        $sql = "select * from kn_master_company where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    // function update_setup_company($data, $param)
    // {
    //     $this->db->update('kn_master_company', $data, $param);
    // }
    // function delete_setup_company($param)
    // {
    //     $this->db->delete('kn_master_company', $param);
    // }
    function get_bts()
    {
        $sql = "select * from kn_master_code where code_type='BUSINESS_TYPE' order by code_value asc";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    //Master Code Hakim 160515
    // function insert_master_code($data)
    // {
    //     $this->db->insert('kn_master_code', $data);
    // }

    // function update_master_code($data, $param)
    // {
    //     $this->db->update('kn_master_code', $data, $param);
    // }

    // function delete_master_code($param)
    // {
    //     $this->db->delete('kn_master_code', $param);
    // }

    function get_master_code($id)
    {
        $sql = "select * from kn_master_code where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function jqgrid_master_code($sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select * from kn_master_code";

        $sql .= " $order $limit ";
        $query = $this->db->query($sql);

        return $query->getResultArray();
    }


    /*BEGIN SETUP CUSTODY
	| by : sayyid (2015-11-07)
	*/
    function jqgrid_setup_custody($sidx = '', $sord = '', $limit_rows = '', $start = '')
    {
        $order = '';
        $limit = '';

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select * from kn_master_custody";

        $sql .= " $order $limit ";
        $query = $this->db->query($sql);

        return $query->getResultArray();
    }
    // function insert_custody($data)
    // {
    //     $this->db->insert('kn_master_custody', $data);
    // }
    // function get_custody_bank()
    // {
    //     $this->db->where('custody_flag', '1');
    //     $query = $this->db->get('kn_master_bank');
    //     return $query->result_array();
    // }
    function get_setup_custody_by_id($id)
    {
        $sql = "select * from kn_master_custody where id = ?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }
    // function update_custody($data, $param)
    // {
    //     $this->db->update('kn_master_custody', $data, $param);
    // }
    // function delete_setup_custody($param)
    // {
    //     $this->db->delete('kn_master_custody', $param);
    // }
    /*END SETUP CUSTODY*/

    function is_old_password_valid($user_id, $old_password, $salt)
    {
        $old_password = sha1($old_password . $salt);
        $sql = "
			select count(*) num
			from kn_user
			where user_id=?
			and password=?
		";
        $query = $this->db->query($sql, array($user_id, $old_password));
        $row = $query->getRowarray();
        if ($row['num'] > 0) {
            return true;
        } else {
            return false;
        }
    }

    function get_userdata_new_session($id)
    {
        $sql = "
			SELECT
				kn_user.user_id,
				kn_user.username,
				kn_user.status,
				kn_user.role_id,
				kn_user.fullname
			FROM kn_user
			WHERE kn_user.user_id=? AND kn_user.status='1'
		";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    /**
     * USER SETUP
     * 22-08-2022
     */

    public function jqgrid_user_setup($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')

    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT a.*, b.role_name
                
                FROM users a left join lsp_user_role b on a.user_type_id=b.role_id
                Where a.user_type_id<>'5' 
               ";

        if ($keyword != "") {
            $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }


        $sql .= " $order $limit ";

        $builder = $this->db->query($sql, array($param));

        return $builder->getResultArray();
    }

    function get_data_user_setup_by_id($id)
    {
        $sql = "select * from users where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_user_setup($data)
    {
        $this->db->table('users')->insert($data);
    }



    public function update_user_setup($data, $id)
    {
        $builder = $this->db->table('users');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_user_setup($id)
    {
        $builder = $this->db->table('users');
        $builder->where('id', $id);
        $builder->delete();
    }

    public function get_user_roles()
    {
        $sql = "select * from lsp_user_role";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_user_roles2()
    {
        $sql = "select * from lsp_user_role where role_id<>'5' order by role_id";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }
    public function update_profile_setup($data, $id)
    {
        $builder = $this->db->table('kn_user');
        $builder->where('user_id', $id);
        $builder->update($data);
    }
    /** end of User Setup */

    /** 
     * Settings | Master Fund
     * Hakim
     * 2022-10-20
     */

    public function jqgrid_master_fund($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')

    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT *
                
                FROM dfi_master_fund 
               ";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(a." . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }


        $sql .= " $order $limit ";

        $builder = $this->db->query($sql, array($param));

        return $builder->getResultArray();
    }

    function get_data_master_fund_by_id($id)
    {
        $sql = "select * from dfi_master_fund where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_master_fund($data)
    {
        $builder = $this->db->table('dfi_master_fund');
        $builder->insert($data);
    }
    public function update_master_fund($data, $id)
    {
        $builder = $this->db->table('dfi_master_fund');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_master_fund($id)
    {
        $builder = $this->db->table('dfi_master_fund');
        $builder->where('id', $id);
        $builder->delete();
    }

    /** end of Master Fund */

    /**
     * Setting | Front End | Slide
     * Hakim Desyanto
     * 2023-05-04
     */

    public function jqgrid_slide_front_end($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')

    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "SELECT * from lsp_slide
               ";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }


        $sql .= " $order $limit ";

        $builder = $this->db->query($sql, array($param));

        return $builder->getResultArray();
    }

    function get_data_slide_front_end_by_id($id)
    {
        $sql = "select * from lsp_slide where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_slide_front_end($data)
    {
        $this->db->table('lsp_slide')->insert($data);
    }



    public function update_slide_front_end($data, $id)
    {
        $builder = $this->db->table('lsp_slide');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_slide_front_end($id)
    {
        $builder = $this->db->table('lsp_slide');
        $builder->where('id', $id);
        $builder->delete();
    }
    /** end of Setting | Front End | Slide */

    /**
     * Setting | Front End | News
     * Hakim Desyanto
     * 2023-05-04
     */

    public function jqgrid_news_front_end($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')

    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select id, news_title,case when length(news_content)>50 then concat(left(news_content,50),'...') else news_content END news_content,
        news_date,showed from lsp_news ";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }


        $sql .= " $order $limit ";

        $builder = $this->db->query($sql, array($param));

        return $builder->getResultArray();
    }

    function get_data_news_front_end_by_id($id)
    {
        $sql = "select * from lsp_news where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_news_front_end($data)
    {
        $this->db->table('lsp_news')->insert($data);
    }

    public function update_news_front_end($data, $id)
    {
        $builder = $this->db->table('lsp_news');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_news_front_end($id)
    {
        $builder = $this->db->table('lsp_news');
        $builder->where('id', $id);
        $builder->delete();
    }

    public function get_news($id)
    {
        $sql = "select * from lsp_news where id=?";
        $query = $this->db->query($sql, $id);
        return $query->getRowArray();
    }
    /** end of Setting | Front End | News */

    /**
     * Setting | Front End | News
     * Hakim Desyanto
     * 2023-06-20
     */

    function get_about()
    {
        $sql = "select * from lsp_about";
        $query = $this->db->query($sql);
        return $query->getRowarray();
    }

    public function update_about_front_end($data, $id)
    {
        $builder = $this->db->table('lsp_about');
        $builder->where('id', $id);
        $builder->update($data);
    }
    /** end of Setting | Front End | News */
}
