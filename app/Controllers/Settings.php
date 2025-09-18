<?php

namespace App\Controllers;

use CodeIgniter\HTTP\Request;
use \App\Models\SettingsModel;
use \App\Models\BaseModel;

use Config\Services;
use Myth\Auth\Models\UserModel;
use Myth\Auth\Entities\User;


class Settings extends BaseController
{
    protected $SettingsModel;
    protected $db;



    public function __construct()
    {
        $this->SettingsModel = new SettingsModel();
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }

    /* BEGIN MENU SETUP */
    public function menu_setup()
    {
        $data['title'] = 'Menu Setup';
        $data['content'] = 'admin/settings/menu_setup';
        $data['icons'] = $this->SettingsModel->get_icons();
        $data['menus'] = $this->SettingsModel->get_menu_parent();
        $data['menu'] = $this->generate_menu('/Settings/menu_setup');
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());

        $url = 'Settings/menu_setup';
        //$data['menu'] = $this->generate_menu($url);
        //d($this->mymenu);
        return view('Settings/Menu_setup', $data);
    }

    public function jqgrid_data_menu()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'menu_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->get_data_menu('', '', '', '', $tipe_keyword, $keyword);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->get_data_menu($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['menu_id'] = $row['menu_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['menu_id'], $row['menu_parent'], $row['menu_title'], $row['menu_url'], $row['menu_type'], $row['menu_icon_parent']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_menu()
    {
        $menu_parent = $this->request->getVar('menu_parent');
        $menu_title = $this->request->getVar('menu_title');
        $menu_url = $this->request->getVar('menu_url');
        $menu_type = $this->request->getVar('menu_type');
        $menu_icon = $this->request->getVar('menu_icon');

        $data = array(
            // 'menu_id'=>uuid(false),
            'menu_id' => rand(111111, 999999),
            'menu_parent' => $menu_parent,
            'menu_title' => $menu_title,
            'menu_url' => $menu_url,
            'menu_type' => $menu_type,
            'menu_icon_parent' => ($menu_icon == '') ? NULL : $menu_icon
        );

        $this->db->transbegin();
        $this->SettingsModel->insert_menu($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    function get_data_menu_by_id()
    {
        $menu_id = $this->request->getVar('menu_id');
        $data = $this->SettingsModel->get_data_menu_by_id($menu_id);
        echo json_encode($data);
    }

    function edit_menu()
    {
        $menu_id = $this->request->getVar('menu_id');
        $menu_parent = $this->request->getVar('menu_parent');
        $menu_title = $this->request->getVar('menu_title');
        $menu_url = $this->request->getVar('menu_url');
        $menu_type = $this->request->getVar('menu_type');
        $menu_icon = $this->request->getVar('menu_icon');
        if ($menu_icon == "") {
            $data = array(
                'menu_parent' => $menu_parent,
                'menu_title' => $menu_title,
                'menu_url' => $menu_url,
                'menu_type' => $menu_type
            );
        } else {
            $data = array(
                'menu_parent' => $menu_parent,
                'menu_title' => $menu_title,
                'menu_url' => $menu_url,
                'menu_type' => $menu_type,
                'menu_icon_parent' => ($menu_icon == '') ? NULL : $menu_icon
            );
        }
        // $param = array('menu_id' => $menu_id);
        $this->db->transbegin();
        $this->SettingsModel->update_menu($data, $menu_id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_menu()
    {
        $menu_id = $this->request->getVar('menu_id');
        $param = array('menu_id' => $menu_id);
        $this->db->transbegin();
        $this->SettingsModel->delete_menu($param);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    public function get_menu_position()
    {
        $role_id = user()->role_id;

        $html = '
		<div class="dd" id="menu">
			<ol class="dd-list">';

        $menu = $this->SettingsModel->get_menu_position(0);

        for ($i = 0; $i < count($menu); $i++) {

            $html .= '
              <li class="dd-item dd3-item" data-id="' . $menu[$i]['menu_id'] . '">
                 <div class="dd-handle dd3-handle"></div>
                 <div class="dd3-content">' . $menu[$i]['menu_title'] . '</div>';

            $childmenu = $this->SettingsModel->get_menu_position($menu[$i]['menu_id']);

            if (count($childmenu) > 0)
                $html .= '  <ol class="dd-list">';

            for ($j = 0; $j < count($childmenu); $j++) {

                $html .= '  <li class="dd-item dd3-item" data-id="' . $childmenu[$j]['menu_id'] . '">
                       <div class="dd-handle dd3-handle"></div>
                       <div class="dd3-content">' . $childmenu[$j]['menu_title'] . '</div>';

                $grandchildmenu = $this->SettingsModel->get_menu_position($childmenu[$j]['menu_id']);

                if (count($grandchildmenu) > 0)
                    $html .= '     <ol class="dd-list">';

                for ($k = 0; $k < count($grandchildmenu); $k++) {

                    $html .= '     		<li class="dd-item dd3-item" data-id="' . $grandchildmenu[$k]['menu_id'] . '">
		                       <div class="dd-handle dd3-handle"></div>
		                       <div class="dd3-content">' . $grandchildmenu[$k]['menu_title'] . '</div>
		                    </li>';
                }

                if (count($grandchildmenu) > 0)
                    $html .= '      </ol>';

                $html .= '  </li>';
            }

            if (count($childmenu) > 0)
                $html .= '
                 </ol>';


            $html .= '
              </li>';
        }

        $html .= '
			</ol>
		</div>
		';
        //  dd($html);

        echo $html;
    }

    function change_position_menu()
    {
        $data = $this->request->getVar('data');
        // dd($data);
        $n1 = 1;
        foreach ($data as $key_parent => $val_parent) {
            /*[BEGIN] UPDATE KE DATABASE*/
            $data_parent = array('position' => $n1, 'menu_parent' => 0);
            //$param_parent = array('menu_id' => $val_parent['id']);
            $param_parent =  $val_parent['id'];
            $this->db->transbegin();
            //$this->SettingsModel->update_menu($data_parent, $param_parent);
            $this->SettingsModel->update_menu_posisi($data_parent, $param_parent);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
            } else {
                $this->db->transrollback();
            }

            /*[END] UPDATE KE DATABASE*/

            $n2 = 1;

            if (isset($val_parent['children'])) {
                foreach ($val_parent['children'] as $key_child => $val_child) {
                    $n3 = 1;

                    /*[BEGIN] UPDATE KE DATABASE*/
                    $data_child = array('position' => $n2, 'menu_parent' => $val_parent['id']);
                    //$param_child = array('menu_id' => $val_child['id']);
                    $param_child =  $val_child['id'];
                    $this->db->transbegin();
                    $this->SettingsModel->update_menu_posisi($data_child, $param_child);

                    if ($this->db->transstatus() === true) {
                        $this->db->transcommit();
                    } else {
                        $this->db->transrollback();
                    }

                    /*[END] UPDATE KE DATABASE*/

                    if (isset($val_child['children'])) {
                        foreach ($val_child['children'] as $key_grandchild => $val_grandchild) {
                            /*[BEGIN] UPDATE KE DATABASE*/
                            $data_grandchild = array('position' => $n3, 'menu_parent' => $val_child['id']);
                            //$param_grandchild = array('menu_id' => $val_grandchild['id']);
                            $param_grandchild = $val_grandchild['id'];
                            $this->db->transbegin();
                            // d($data_grandchild);
                            //d($param_grandchild);
                            $this->SettingsModel->update_menu_posisi($data_grandchild, $param_grandchild);
                            if ($this->db->transstatus() === true) {
                                $this->db->transcommit();
                            } else {
                                $this->db->transrollback();
                            }
                            /*[END] UPDATE KE DATABASE*/

                            $n3++;
                        }
                    }

                    $n2++;
                }
            }

            $n1++;
        }
    }
    /* END MENU SETUP */

    /*BEGIN ROLE SETUP*/
    public function role_setup()
    {
        $data['title'] = 'Role Setup';
        $data['content'] = 'admin/settings/role_setup';
        $url = 'Settings/dashboard';
        $data['menu'] = $this->generate_menu('/Settings/role_setup');
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());

        return view('Settings/Role_setup', $data);
    }

    public function jqgrid_data_role()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'role_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->get_data_role('', '', '', '', $tipe_keyword, $keyword);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->get_data_role($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['role_id'] = $row['role_id'];
            $responce['rows'][$i]['cell'] = array(
                $row['role_id'], $row['role_name'], $row['role_desc'], $row['created_by'], $row['created_stamp']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_role()
    {
        $role_name = $this->request->getVar('role_name');
        $role_desc = $this->request->getVar('role_desc');

        $data = array(
            'role_name' => $role_name,
            'role_desc' => $role_desc,
            'created_stamp' => date('Y-m-d H:i:s'),
            'created_by' => user_id()
        );

        $this->db->transbegin();
        $this->SettingsModel->insert_user_role($data);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_data_role_by_id()
    {
        $role_id = $this->request->getVar('role_id');
        $data = $this->SettingsModel->get_data_role_by_id($role_id);
        echo json_encode($data);
    }

    function edit_role()
    {
        $role_id = $this->request->getVar('role_id');
        $role_name = $this->request->getVar('role_name');
        $role_desc = $this->request->getVar('role_desc');

        $data = array(
            'role_name' => $role_name,
            'role_desc' => $role_desc,
        );
        $param = array('role_id' => $role_id);

        $this->db->transbegin();
        $this->SettingsModel->update_user_role($data, $param);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function delete_role()
    {
        $role_id = $this->request->getVar('role_id');
        $param = array('role_id' => $role_id);
        $this->db->transBegin();
        $this->SettingsModel->delete_user_role($param);
        if ($this->db->transStatus() === true) {
            $this->db->transCommit();
            $return = array('success' => true);
        } else {
            $this->db->transRollback();
            $return = array('success' => false);
        }
        echo json_encode($return);
    }

    function get_menu_by_role()
    {
        $role_id = $this->request->getVar('role_id');

        $menuroleparent = $this->SettingsModel->get_menu_parent_by_role($role_id);

        $menu = '<ol>';

        foreach ($menuroleparent as $parent) {
            $parent_is = '';
            if ($parent['role_id'] != "")
                $parent_is = ' checked="checked"';

            $menu .= '<li>
					    <input type="checkbox" name="menu_id[]" id="parent"' . $parent_is . ' value="' . $parent['menu_id'] . '"> ' . $parent['menu_title'];

            $menurolechild = $this->SettingsModel->get_menu_child_by_role($role_id, $parent['menu_id']);

            if (count($menurolechild) > 0)
                $menu .= '<ol>';

            foreach ($menurolechild as $child) {

                $menurolegrandchild = $this->SettingsModel->get_menu_child_by_role($role_id, $child['menu_id']);

                $child_is = '';
                if ($child['role_id'] != "")
                    $child_is = ' checked="checked"';

                $menu .= '<li>
					    	<input type="checkbox" name="menu_id[]" id="child"' . $child_is . ' value="' . $child['menu_id'] . '"> ' . $child['menu_title'];

                if (count($menurolegrandchild) > 0)
                    $menu .= '<ol>';

                foreach ($menurolegrandchild as $grandchild) {
                    $grandchild_is = '';
                    if ($grandchild['role_id'] != "")
                        $grandchild_is = ' checked="checked"';

                    $menu .= '<li><input type="checkbox" name="menu_id[]" id="grandchild"' . $grandchild_is . ' value="' . $grandchild['menu_id'] . '"> ' . $grandchild['menu_title'] . '</li>';
                }

                if (count($menurolegrandchild) > 0)
                    $menu .= '</ol>';

                $menu .= '</li>';
            }

            if (count($menurolechild) > 0)
                $menu .= '</ol>';

            $menu .= '					    
					  </li>';
        }

        $menu .= '</ol>';

        echo $menu;
    }

    function edit_role_priviledge()
    {
        $role_id = $this->request->getVar('role_id');
        $menu_id = $this->request->getVar('menu_id');

        $data_batch = array();

        if (isset($menu_id)) {
            for ($i = 0; $i < count($menu_id); $i++) {
                $data_batch[] = array(
                    'role_id' => $role_id,
                    'menu_id' => $menu_id[$i]
                );
            }
        }

        $param_delete = $role_id;

        $this->db->transbegin();
        $this->SettingsModel->delete_user_nav($param_delete);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();

            if (count($data_batch) > 0) {
                $this->db->transbegin();
                $this->SettingsModel->insert_batch_user_nav($data_batch);
                if ($this->db->transstatus() === true) {
                    $this->db->transcommit();
                    $return = array('success' => true);
                } else {
                    $this->db->transrollback();
                    $return = array('success' => false);
                }
            } else {
                $return = array('success' => true);
            }
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    /*END ROLL SETUP*/
    //Begin setup Company by Hakim 151103

    function setup_company()
    {
        $data['title'] = "SETUP COMPANY";
        $data['content'] = "admin/settings/setup_company/main";
        $data['menu'] = $this->generate_menu('Settings/setup_company');
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        return view('admin/settings/setup_company/main', $data);
    }

    function jqgrid_setup_company()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : '1';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'DESC';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->jqgrid_setup_company('', '', '', '');

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->jqgrid_setup_company($sidx, $sord, $limit_rows, $start);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'], $row['company_code'], $row['company_name'], $row['code_description'], $row['telephone_no'], $row['faximile_no'], $row['address'], $row['city'], $row['province'], $row['pos_code']

            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_setup_company()
    {
        $company_code = $this->request->getVar('company_code');
        $company_name = $this->request->getVar('company_name');
        $business_type = $this->request->getVar('business_type');
        $telephone_no = $this->request->getVar('telephone_no');
        $faximile_no = $this->request->getVar('faximile_no');
        $address = $this->request->getVar('address');
        $city = $this->request->getVar('city');
        $province = $this->request->getVar('province');
        $pos_code = $this->request->getVar('pos_code');
        $officer1 = $this->request->getVar('officer1');
        $occupation1 = $this->request->getVar('occupation1');
        $officer2 = $this->request->getVar('officer2');
        $occupation2 = $this->request->getVar('occupation2');
        $officer3 = $this->request->getVar('officer3');
        $occupation3 = $this->request->getVar('occupation3');

        $bValid = true;

        $data = array(
            'company_code' => $company_code,
            'company_name' => $company_name,
            'business_type' => $business_type,
            'telephone_no' => $telephone_no,
            'faximile_no' => $faximile_no,
            'address' => $address,
            'city' => $city,
            'province' => $province,
            'pos_code' => $pos_code,
            'officer1' => $officer1,
            'occupation1' => $occupation1,
            'officer2' => $officer2,
            'occupation2' => $occupation2,
            'officer3' => $officer3,
            'occupation3' => $occupation3
        );

        /* BEGIN UPLOAD SIGNATURE */

        $location = './assets/admin/img/cp-signature/';

        //$this->load->library('upload');

        $uploaded = array();

        if (isset($_FILES['signature1'])) {
            // print_r($_FILES['signature1']['name']);
            $ext1 = @end(explode(".", $_FILES['signature1']['name']));
            // echo $ext1;
            // die();
            $nf_signature1 = 'signature1-' . $company_code . '.' . $ext1;

            $config['upload_path'] = $location;
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size']    = '10000';
            $config['file_name'] = $nf_signature1;

            $this->upload->initialize($config);

            if (!$this->upload->do_upload('signature1')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $signature1 = $u_data['file_name'];
                $data['signature1'] = $signature1;

                $uploaded[] = $signature1;
            }
        }


        if (isset($_FILES['signature2'])) {

            $ext2 = @end(explode(".", $_FILES['signature2']['name']));
            $nf_signature2 = 'signature2-' . $company_code . '.' . $ext2;

            $config1['upload_path'] = $location;
            $config1['allowed_types'] = 'jpg|jpeg|png|gif';
            $config1['max_size']    = '10000';
            $config1['file_name'] = $nf_signature2;

            $this->upload->initialize($config1);

            if (!$this->upload->do_upload('signature2')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $signature2 = $u_data['file_name'];
                $data['signature2'] = $signature2;

                $uploaded[] = $signature2;
            }
        }


        if (isset($_FILES['signature3'])) {

            $ext3 = @end(explode(".", $_FILES['signature3']['name']));
            $nf_signature3 = 'signature3-' . $company_code . '.' . $ext3;

            $config2['upload_path'] = $location;
            $config2['allowed_types'] = 'jpg|jpeg|png|gif';
            $config2['max_size']    = '10000';
            $config2['file_name'] = $nf_signature3;

            $this->upload->initialize($config2);

            if (!$this->upload->do_upload('signature3')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $signature3 = $u_data['file_name'];
                $data['signature3'] = $signature3;

                $uploaded[] = $signature3;
            }
        }

        /* END UPLOAD SIGNATURE */

        if ($bValid == false) {
            // -- DELETE Uploaded file when Validation is False!
            for ($i = 0; $i < count($uploaded); $i++) {
                @unlink($location . $uploaded[$i]);
            }
        } else {
            $this->db->transbegin();
            $this->SettingsModel->insert_setup_company($data);
            if ($this->db->transstatus() === TRUE) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your administrator.');

                // -- DELETE Uploaded file when Insert is Failed!
                for ($i = 0; $i < count($uploaded); $i++) {
                    @unlink($location . $uploaded[$i]);
                }
            }
        }

        echo json_encode($return);
    }

    function get_setup_company()
    {
        $id = $this->request->getVar('id');
        $data = $this->SettingsModel->get_setup_company($id);
        $data['location'] = base_url('assets/admin/img/cp-signature') . '/';
        $data['location_logo'] = base_url('assets/admin/img/cp-logo') . '/';
        echo json_encode($data);
    }

    function edit_setup_company()
    {
        $id = $this->request->getVar('id');
        $company_code = $this->request->getVar('company_code');
        $company_name = $this->request->getVar('company_name');
        $business_type = $this->request->getVar('business_type');
        $telephone_no = $this->request->getVar('telephone_no');
        $faximile_no = $this->request->getVar('faximile_no');
        $address = $this->request->getVar('address');
        $city = $this->request->getVar('city');
        $province = $this->request->getVar('province');
        $pos_code = $this->request->getVar('pos_code');
        $officer1 = $this->request->getVar('officer1');
        $occupation1 = $this->request->getVar('occupation1');
        $f_company_logo = $this->request->getVar('f_company_logo');
        $f_signature1 = $this->request->getVar('f_signature1');
        $officer2 = $this->request->getVar('officer2');
        $occupation2 = $this->request->getVar('occupation2');
        $f_signature2 = $this->request->getVar('f_signature2');
        $officer3 = $this->request->getVar('officer3');
        $occupation3 = $this->request->getVar('occupation3');
        $f_signature3 = $this->request->getVar('f_signature3');

        $bValid = true;

        $data = array(
            'company_code' => $company_code,
            'company_name' => $company_name,
            'business_type' => $business_type,
            'telephone_no' => $telephone_no,
            'faximile_no' => $faximile_no,
            'address' => $address,
            'city' => $city,
            'province' => $province,
            'pos_code' => $pos_code,
            'officer1' => $officer1,
            'occupation1' => $occupation1,
            'officer2' => $officer2,
            'occupation2' => $occupation2,
            'officer3' => $officer3,
            'occupation3' => $occupation3
        );
        $param = array('id' => $id);

        /* BEGIN UPLOAD SIGNATURE */

        $location_logo = './assets/admin/img/cp-logo/';
        $location = './assets/admin/img/cp-signature/';

        $this->load->library('upload');

        $uploaded = array();

        if (isset($_FILES['company_logo'])) {
            // print_r($_FILES['company_logo']['name']);
            $ext1 = @end(explode(".", $_FILES['company_logo']['name']));
            // echo $ext1;
            // die();
            $nf_company_logo = 'company_logo-' . $company_code . '.' . $ext1;

            $config['upload_path'] = $location_logo;
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size']    = '10000';
            $config['file_name'] = $nf_company_logo;

            $this->upload->initialize($config);

            if (!$this->upload->do_upload('company_logo')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $company_logo = $u_data['file_name'];
                $data['company_logo'] = $company_logo;

                $uploaded[] = $company_logo;

                // delete old file if update is success
                @unlink($location_logo . $f_company_logo);
            }
        }

        if (isset($_FILES['signature1'])) {
            // print_r($_FILES['signature1']['name']);
            $ext1 = @end(explode(".", $_FILES['signature1']['name']));
            // echo $ext1;
            // die();
            $nf_signature1 = 'signature1-' . $company_code . '.' . $ext1;

            $config['upload_path'] = $location;
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size']    = '10000';
            $config['file_name'] = $nf_signature1;

            $this->upload->initialize($config);

            if (!$this->upload->do_upload('signature1')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $signature1 = $u_data['file_name'];
                $data['signature1'] = $signature1;

                $uploaded[] = $signature1;

                // delete old file if update is success
                @unlink($location . $f_signature1);
            }
        }


        if (isset($_FILES['signature2'])) {

            $ext2 = @end(explode(".", $_FILES['signature2']['name']));
            $nf_signature2 = 'signature2-' . $company_code . '.' . $ext2;

            $config1['upload_path'] = $location;
            $config1['allowed_types'] = 'jpg|jpeg|png|gif';
            $config1['max_size']    = '10000';
            $config1['file_name'] = $nf_signature2;

            $this->upload->initialize($config1);

            if (!$this->upload->do_upload('signature2')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $signature2 = $u_data['file_name'];
                $data['signature2'] = $signature2;

                $uploaded[] = $signature2;

                // delete old file if update is success
                @unlink($location . $f_signature2);
            }
        }


        if (isset($_FILES['signature3'])) {

            $ext3 = @end(explode(".", $_FILES['signature3']['name']));
            $nf_signature3 = 'signature3-' . $company_code . '.' . $ext3;

            $config2['upload_path'] = $location;
            $config2['allowed_types'] = 'jpg|jpeg|png|gif';
            $config2['max_size']    = '10000';
            $config2['file_name'] = $nf_signature3;

            $this->upload->initialize($config2);

            if (!$this->upload->do_upload('signature3')) {
                $err_msg = $this->upload->display_errors('', '');
                $return = array('success' => false, 'message' => $err_msg);
                $bValid = false;
            } else {
                $u_data = $this->upload->data();
                $signature3 = $u_data['file_name'];
                $data['signature3'] = $signature3;

                $uploaded[] = $signature3;

                // delete old file if update is success
                @unlink($location . $f_signature3);
            }
        }

        /* END UPLOAD SIGNATURE */
        if ($bValid == false) {
            // -- DELETE Uploaded file when Validation is False!
            for ($i = 0; $i < count($uploaded); $i++) {
                @unlink($location . $uploaded[$i]);
            }
        } else {
            $this->db->transbegin();
            $this->SettingsModel->update_setup_company($data, $param);
            if ($this->db->transstatus() === TRUE) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your administrator.');

                // -- DELETE Uploaded file when Update is Failed!
                for ($i = 0; $i < count($uploaded); $i++) {
                    @unlink($location . $uploaded[$i]);
                }
            }
        }

        echo json_encode($return);
    }

    function delete_setup_company()
    {
        $id = $this->request->getVar('id');

        $data = $this->SettingsModel->get_setup_company($id);
        $f_signature1 = $data['signature1'];
        $f_signature2 = $data['signature2'];
        $f_signature3 = $data['signature3'];

        $param = array('id' => $id);

        $this->db->transbegin();
        $this->SettingsModel->delete_setup_company($param);
        if ($this->db->transstatus() === TRUE) {
            $this->db->transcommit();
            $return = array('success' => true);

            // -- DELETE SIGNATURE
            @unlink('./assets/admin/img/cp-signature/' . $f_signature1);
            @unlink('./assets/admin/img/cp-signature/' . $f_signature2);
            @unlink('./assets/admin/img/cp-signature/' . $f_signature3);
        } else {
            $this->db->transrollback();
            $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your administrator.');
        }

        echo json_encode($return);
    }

    function master_code()
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = "Master Code";
        $data['content'] = "admin/settings/master_code/main";
        return view('Admin/Settings/Master_code/Main', $data);
    }

    function add_master_code()
    {
        $code_type = $this->request->getVar('code_type');
        $code_type_detail = $this->request->getVar('code_type_detail');
        $code_value = $this->request->getVar('code_value');
        $code_description = $this->request->getVar('code_description');

        $data = array(
            'code_type' => $code_type, 'code_type_detail' => $code_type_detail, 'code_value' => $code_value, 'code_description' => $code_description


        );

        $this->db->transbegin();
        $this->SettingsModel->insert_master_code($data);
        if ($this->db->transstatus() === TRUE) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your administrator.');
        }
        echo json_encode($return);
    }

    function edit_master_code()
    {
        $id = $this->request->getVar('id');
        $code_type = $this->request->getVar('code_type');
        $code_type_detail = $this->request->getVar('code_type_detail');
        $code_value = $this->request->getVar('code_value');
        $code_description = $this->request->getVar('code_description');

        $data = array(
            'code_type' => $code_type, 'code_type_detail' => $code_type_detail, 'code_value' => $code_value, 'code_description' => $code_description
        );
        $param = array('id' => $id);

        $this->db->transbegin();
        $this->SettingsModel->update_master_code($data, $param);
        if ($this->db->transstatus() === TRUE) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your administrator.');
        }

        echo json_encode($return);
    }

    function delete_master_code()
    {
        $id = $this->request->getVar('id');
        $param = array('id' => $id);

        $this->db->transbegin();
        $this->SettingsModel->delete_master_code($param);
        if ($this->db->transstatus() === TRUE) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your administrator.');
        }

        echo json_encode($return);
    }

    function get_master_code()
    {
        $id = $this->request->getVar('id');
        $data = $this->SettingsModel->get_master_code($id);
        echo json_encode($data);
    }

    function jqgrid_master_code()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : '1';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'DESC';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->jqgrid_master_code('', '', '', '');

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->jqgrid_master_code($sidx, $sord, $limit_rows, $start);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'], $row['code_type'], $row['code_type_detail'], $row['code_value'], $row['code_description'], $row['change_status']


            );
            $i++;
        }

        echo json_encode($responce);
    }
    //end Master Code Hakim 160515


    /* MY PROFILE */
    public function profile_setup()
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = 'Profile Setup';
        $data['content'] = 'admin/settings/profile_setup';
        $data['menu'] = $this->generate_menu('Settings/profile_setup');
        return view('admin/settings/profile_setup', $data);
    }

    public function do_profile_setup()
    {
        $user_id = user_id();
        $fullname = $this->request->getVar('fullname');
        $old_password = $this->request->getVar('old_password');
        $new_password = $this->request->getVar('new_password');
        $retype_new_password = $this->request->getVar('retype_new_password');
        $isOldPasswordValid = $this->SettingsModel->is_old_password_valid($user_id, $old_password, $this->_salt);

        if ($isOldPasswordValid == false) {
            $return = array('success' => false, 'error' => 'Invalid Old Password !');
        } else if ($new_password != $retype_new_password) {
            $return = array('success' => false, 'error' => 'New Password must be same with Retype New Password !');
        } else {
            $password = sha1($new_password . $this->_salt);;
            $data = array(
                'fullname' => $fullname,
                'password' => $password,
                'last_updated_stamp' => $this->_now_timestamp
            );
            $param = array('user_id' => $user_id);

            $this->db->transbegin();
            $this->SettingsModel->update_profile_setup($data, $user_id);
            if ($this->db->transstatus() === true) {

                // update new session
                $userdata = $this->SettingsModel->get_userdata_new_session($user_id);
                $userdata['is_logged_in'] = true;
                $this->session->set($userdata);

                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false, 'error' => 'Failed to connect into database, please contact your Administrator !');
            }
        }
        echo json_encode($return);
    }

    /**
     * USER SETUP
     * 22-08-2022
     */

    public function user_setup()
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = 'User Setup';
        $data['user_roles'] = $this->SettingsModel->get_user_roles2();
        $data['genders'] = $this->BaseModel->get_genders();
        $role_id = user()->role_id;
        $data['menu'] = $this->generate_menu('/Settings/user_setup');
        return view('Settings/User_setup/Main', $data);
    }

    public function jqgrid_user_setup()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'menu_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->jqgrid_user_setup('', '', '', '', $tipe_keyword, $keyword);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->jqgrid_user_setup($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['full_name'],
                // $row['birth_place'],
                // $row['birth_date'],
                $row['gender'],
                // $row['address'],
                // $row['province_name'],
                // $row['district_name'],
                // $row['subdistrict_name'],
                $row['username'],
                $row['email'],
                $row['mobile_phone'],
                //  $row['user_type_id'],
                $row['role_name'],
                $row['npwp'],
                $row['bank_name'],
                $row['account_number'],
                $row['account_name'],
                $row['created_at'],
                $row['updated_at']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_user_setup()
    {

        $Salt_key = 'Peh@HaY74turn#elL';
        $status = $this->request->getVar('status');
        $full_name = $this->request->getVar('full_name');
        $gender = $this->request->getVar('gender');
        $username = $this->request->getVar('username');
        $email = $this->request->getVar('email');
        $mobile_phone = $this->request->getVar('mobile_phone');
        $user_type_id = $this->request->getVar('user_type_id');
        // $password = sha1($this->request->getVar('password') . $Salt_key);
        //$password = md5($this->request->getVar('password'));
        // $password = password_hash($this->request->getVar('password'), PASSWORD_DEFAULT);
        $status = $this->request->getVar('status');
        $npwp = $this->request->getVar('npwp');
        $bank_name = $this->request->getVar('bank_name');
        $account_number = $this->request->getVar('account_number');
        $account_name = $this->request->getVar('account_name');
        $id = $this->get_uuid();
        $createdAt = date("Y-m-d H:i:s");

        /** coba */
        //Create new instance of the MythAuth UserModel
        $users = model(UserModel::class);

        //Get the id of the current user
        $user_id = user_id();

        //Create new user entity
        $entity = new User();

        //Get current password from input field
        $newPassword = $this->request->getPost('password');

        //Hash password using the "setPassword" function of the User entity
        $entity->setPassword($newPassword);

        //Save the hashed password in the variable "hash"
        $hash  = $entity->password_hash;

        //update the current users password_hash in the database with the new hashed password.
        //  $users->update($user_id, ['password_hash' => $hash]);

        //Return back with success message
        //   return redirect()->to('/test')->with('success', "Put your message here");
        /** coba */
        $check_email = $this->BaseModel->check_email($email, "");
        $check_username = $this->BaseModel->check_username($username, "");
        
        if ($check_email > 0) {
            $return = array('success' => false, 'error' => 'Email sudah terdaftar');
        } else if ($check_username>0) {
            $return = array('success' => false, 'error' => 'Username sudah terdaftar');
        } else {
            $data = array(
                'full_name' => $full_name,
                'gender' => $gender,
                'username' => $username,
                'email' => $email,
                'mobile_phone' => $mobile_phone,
                'user_type_id' => $user_type_id,
                'password_hash' =>  $hash,
                'active' => $status,
                'npwp' => $npwp,
                'bank_name' => $bank_name,
                'account_number' => $account_number,
                'account_name' => $account_name,
                'created_at' => $createdAt
            );

    //dd($data);
            $this->db->transbegin();
            $this->SettingsModel->insert_user_setup($data);
            if ($this->db->transStatus() == true) {
                $this->db->transCommit();
                $return = array('success' => true);
            } else {
                $this->db->transRollback();
                $return = array('success' => false);
            }
            

            $id = $this->BaseModel->get_id($email);
            $data = array(
                'group_id' => $user_type_id,
                'user_id' => $id
            );
            $this->db->transbegin();
            $this->BaseModel->insert_auth_groups_users($data);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        }
        echo json_encode($return);
    }

    function get_data_user_setup_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->SettingsModel->get_data_user_setup_by_id($id);
        echo json_encode($data);
    }

    function edit_user_setup()
    {
        $Salt_key = 'Peh@HaY74turn#elL';
        $new_password = $this->request->getVar('password');
        //$password = sha1($this->request->getVar('password') . $Salt_key);
        // $password = md5($this->request->getVar('password2'));
        $id = $this->request->getVar('id');
        $old_password = $this->request->getVar('old_password');
        $Salt_key = 'Peh@HaY74turn#elL';
        $status = $this->request->getVar('status');
        $full_name = $this->request->getVar('full_name');
        $gender = $this->request->getVar('gender');
        $username = $this->request->getVar('username');
        $email = $this->request->getVar('email');
        $mobile_phone = $this->request->getVar('mobile_phone');
        $user_type_id = $this->request->getVar('user_type_id');
        $status = $this->request->getVar('status');
        $npwp = $this->request->getVar('npwp');
        $bank_name = $this->request->getVar('bank_name');
        $account_number = $this->request->getVar('account_number');
        $account_name = $this->request->getVar('account_name');

        //  $check_password = $this->request->getVar('check_password');
        $updatedAt = date("Y-m-d H:i:s");

        $check_password = isset($_REQUEST['check_password']) ? '1' : '0';
        //Create new instance of the MythAuth UserModel
        $users = model(UserModel::class);

        //Get the id of the current user
        $user_id = user_id();

        //Create new user entity
        $entity = new User();

        //Get current password from input field
        $newPassword = $this->request->getPost('password2');

        //Hash password using the "setPassword" function of the User entity
        $entity->setPassword($newPassword);

        //Save the hashed password in the variable "hash"
        $hash  = $entity->password_hash;

        // $check_email = $this->BaseModel->check_email($email, $id);
        // if ($check_email > 0) {
        //     $return = array('success' => false, 'error' => 'Email sudah terdaftar');
        // } else {


        if ($check_password == '0') {
            $data = array(
                'full_name' => $full_name,
                'gender' => $gender,
                'username' => $username,
                'username' => $username,
                'mobile_phone' => $mobile_phone,
                'user_type_id' => $user_type_id,
                //'password,' => $password,
                'active' => $status,
                'npwp' => $npwp,
                'bank_name' => $bank_name,
                'account_number' => $account_number,
                'account_name' => $account_name,
                'updated_at' => $updatedAt

            );
        } else {
            $data = array(
                'full_name' => $full_name,
                'gender' => $gender,
                'username' => $username,
                'mobile_phone' => $mobile_phone,
                'user_type_id' => $user_type_id,
                'password_hash' => $hash,
                'active' => $status,
                'updated_at' => $updatedAt

            );
        }


        $this->db->transbegin();
        $this->SettingsModel->update_user_setup($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        // }
        echo json_encode($return);
    }

    function delete_user_setup()
    {
        $id = $this->request->getVar('id');
        $this->db->transbegin();
        $this->SettingsModel->delete_user_setup($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }
    /** end of User Setup */

    /**
     * Setting | Front End | Slide
     * Hakim Desyanto
     * 2023-05-04
     */

    public function slide_front_end()
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = 'Slide Front End';
        $data['menu'] = $this->generate_menu('/Settings/slide_front_end');
        return view('Settings/Front_end/Slide/Main', $data);
    }

    public function jqgrid_slide_front_end()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'menu_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->jqgrid_slide_front_end('', '', '', '', $tipe_keyword, $keyword);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->jqgrid_slide_front_end($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['slide_title'],
                $row['slide_label'],
                $row['picture_path'],
                $row['showed']
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_slide_front_end()
    {

        $slide_title = $this->request->getVar('slide_title');
        $picture_path = $this->request->getVar('picture_path');
        $slide_label = $this->request->getVar('slide_label');
        $showed = $this->request->getVar('showed');

        try {
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/front-end/img/slider/';
            $folderName = $folder . '/'  . basename($_FILES['picture_path']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['picture_path']['tmp_name'], $folderName);
            $picture_path = '/assets/front-end/img/slider/'  . basename($_FILES['picture_path']['name']);
            $file_exists = true;
            $data = array(
                'slide_title' => $slide_title,
                'picture_path' => $picture_path,
                'slide_label' => $slide_label,
                'showed' => $showed
            );
        } catch (\Exception $e) {
            $file_exists = false;
            $data = array(
                'slide_title' => $slide_title,
                'slide_label' => $slide_label,
                'showed' => $showed
            );
        }

        if ($file_exists == false) {
            $return = array('success' => false, 'error' => 'Mohon pilih gambar terlebih dahulu!');
        } else {
            $this->db->transbegin();
            $this->SettingsModel->insert_slide_front_end($data);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        }

        echo json_encode($return);
    }

    function get_data_slide_front_end_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->SettingsModel->get_data_slide_front_end_by_id($id);
        echo json_encode($data);
    }

    function edit_slide_front_end()
    {
        $id = $this->request->getVar('id');
        $slide_title = $this->request->getVar('slide_title');
        $picture_path = $this->request->getVar('picture_path');
        $slide_label = $this->request->getVar('slide_label');
        $showed = $this->request->getVar('showed');

        try {
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/front-end/img/slider/';
            $folderName = $folder . '/'  . basename($_FILES['picture_path']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['picture_path']['tmp_name'], $folderName);
            $picture_path = '/assets/front-end/img/slider/'  . basename($_FILES['picture_path']['name']);
            $file_exists = true;
            $data = array(
                'slide_title' => $slide_title,
                'picture_path' => $picture_path,
                'slide_label' => $slide_label,
                'showed' => $showed
            );
        } catch (\Exception $e) {
            $file_exists = false;
            $data = array(
                'slide_title' => $slide_title,
                'slide_label' => $slide_label,
                'showed' => $showed
            );
        }

        $this->db->transbegin();
        $this->SettingsModel->update_slide_front_end($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }
        // }
        echo json_encode($return);
    }

    function delete_slide_front_end()
    {
        $id = $this->request->getVar('id');
        $this->db->transbegin();
        $this->SettingsModel->delete_slide_front_end($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }
    /** end of Setting | Front End | Slide */


    /**
     * Setting | Front End | News
     * Hakim Desyanto
     * 2023-05-04
     */

    public function news_front_end()
    {
        if (session()->getFlashdata('validation')) {
            $validation = session()->getFlashdata('validation');
        } else {
            $validation = \Config\Services::validation();
        }
        $data['pesan'] = session()->getFlashdata('pesan');
        $data['success'] = session()->getFlashdata('success');
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = 'News Front End';
        $data['menu'] = $this->generate_menu('/Settings/news_front_end');

        return view('Settings/Front_end/News/Main', $data);
    }

    public function jqgrid_news_front_end()
    {
        $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $limit_rows = isset($_REQUEST['rows']) ? $_REQUEST['rows'] : 15;
        $sidx = isset($_REQUEST['sidx']) ? $_REQUEST['sidx'] : 'menu_id';
        $sord = isset($_REQUEST['sord']) ? $_REQUEST['sord'] : 'ASC';
        $tipe_keyword = isset($_REQUEST['tipe_keyword']) ? $_REQUEST['tipe_keyword'] : '';
        $keyword = isset($_REQUEST['keyword']) ? $_REQUEST['keyword'] : '';

        $totalrows = isset($_REQUEST['totalrows']) ? $_REQUEST['totalrows'] : false;
        if ($totalrows) {
            $limit_rows = $totalrows;
        }

        $result = $this->SettingsModel->jqgrid_news_front_end('', '', '', '', $tipe_keyword, $keyword);

        $count = count($result);
        if ($count > 0) {
            $total_pages = ceil($count / $limit_rows);
        } else {
            $total_pages = 0;
        }

        if ($page > $total_pages)
            $page = $total_pages;
        $start = $limit_rows * $page - $limit_rows;
        if ($start < 0) $start = 0;

        $result = $this->SettingsModel->jqgrid_news_front_end($sidx, $sord, $limit_rows, $start, $tipe_keyword, $keyword);

        $responce['page'] = $page;
        $responce['total'] = $total_pages;
        $responce['records'] = $count;

        $i = 0;
        foreach ($result as $row) {
            $responce['rows'][$i]['id'] = $row['id'];
            $responce['rows'][$i]['cell'] = array(
                $row['id'],
                $row['news_title'],
                //  $row['news_content'],
                $row['news_date'],
                $row['showed'],
                ''
            );
            $i++;
        }

        echo json_encode($responce);
    }

    function add_news_front_end()
    {

        $news_title = $this->request->getVar('news_title');
        $news_date = date('Y-m-d H:i:s');
        $news_content = $this->request->getVar('news_content');
        $showed = $this->request->getVar('showed');
        $date = date('YmdHis');
        try {
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/News';
            $folderName = $folder . '/' . $date . ' ' . basename($_FILES['news_image']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['news_image']['tmp_name'], $folderName);
            $news_image = '/assets/News' . '/' . $date . ' ' . basename($_FILES['news_image']['name']);
            $file_exists = true;
            $data = array(
                'news_title' => $news_title,
                'news_image' => $news_image,
                'news_date' => $news_date,
                'news_content' => $news_content,
                'showed' => $showed
            );

            $this->db->transbegin();
            $this->SettingsModel->insert_news_front_end($data);
            if ($this->db->transstatus() === true) {
                $this->db->transcommit();
                $return = array('success' => true);
            } else {
                $this->db->transrollback();
                $return = array('success' => false);
            }
        } catch (\Exception $e) {
            $file_exists = false;
            $return = array('success' => false, 'error' => 'Mohon diisi dulu gambar beritanya!');
        }

        echo json_encode($return);
    }

    function get_data_news_front_end_by_id()
    {
        $id = $this->request->getVar('id');
        $data = $this->SettingsModel->get_data_news_front_end_by_id($id);
        echo json_encode($data);
    }

    function edit_news_front_end()
    {
        $id = $this->request->getVar('id');
        $news_title = $this->request->getVar('news_title');
        $news_date = date('Y-m-d H:i:s');
        $news_content = $this->request->getVar('news_content2');
        $showed = $this->request->getVar('showed');
        $date = date('YmdHis');
        $news_image = $this->request->getVar('news_image2');
        try {
            $folder = $_SERVER["DOCUMENT_ROOT"] . '/assets/News';
            $folderName = $folder . '/' . $date . ' ' . basename($_FILES['news_image3']['name']);
            if (!file_exists($folder)) {
                mkdir($folder, 0755, true);
            }
            move_uploaded_file($_FILES['news_image3']['tmp_name'], $folderName);
            $news_image = '/assets/News' . '/' . $date . ' ' . basename($_FILES['news_image3']['name']);
            $file_exists = true;
        } catch (\Exception $e) {
            $file_exists = false;
        }

        $data = array(
            'news_title' => $news_title,
            'news_image' => $news_image,
            'news_date' => $news_date,
            'news_content' => $news_content,
            'showed' => $showed
        );

        $this->db->transbegin();
        $this->SettingsModel->update_news_front_end($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            //  $return = array('success' => true);
            session()->setFlashdata('success', true);
            session()->setFlashdata('pesan', 'Data Berhasil diedit');
        } else {
            $this->db->transrollback();
            // $return = array('success' => false);
            session()->setFlashdata('success', false);
            session()->setFlashdata('pesan', 'Data gagal diedit');
            return redirect()->to('/Settings/news_front_end');
        }
        return redirect()->to('/Settings/news_front_end');


        // }
        //echo json_encode($return);

    }

    function delete_news_front_end()
    {
        $id = $this->request->getVar('id');
        $this->db->transbegin();
        $this->SettingsModel->delete_news_front_end($id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            $return = array('success' => true);
        } else {
            $this->db->transrollback();
            $return = array('success' => false);
        }

        echo json_encode($return);
    }

    public function edit_front_end_news_form($id)
    {
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = 'Edit News';
        $data['menu'] = $this->generate_menu('/Settings/news_front_end');
        $data['news'] = $this->SettingsModel->get_news($id);
        return view('Settings/Front_end/News/Edit', $data);
    }
    /** end of Setting | Front End | News */

    /**
     * Setting | Front End | About
     * Hakim Desyanto
     * 2023-06-20
     */

    public function about_front_end()
    {
        if (session()->getFlashdata('validation')) {
            $validation = session()->getFlashdata('validation');
        } else {
            $validation = \Config\Services::validation();
        }
        $data['pesan'] = session()->getFlashdata('pesan');
        $data['success'] = session()->getFlashdata('success');
        $data['notifications'] = $this->BaseModel->get_notifications(user_id());
        $data['title'] = 'About Front End';
        $data['menu'] = $this->generate_menu('/Settings/about_front_end');
        $data['about'] = $this->SettingsModel->get_about();
        return view('Settings/Front_end/About/Main', $data);
    }

    function edit_about_front_end()
    {
        $id = $this->request->getVar('id');
        $about_content = $this->request->getVar('about_content');

        $data = array(
            'about_content' => $about_content
        );

        $this->db->transbegin();
        $this->SettingsModel->update_about_front_end($data, $id);
        if ($this->db->transstatus() === true) {
            $this->db->transcommit();
            session()->setFlashdata('success', true);
            session()->setFlashdata('pesan', 'Data Berhasil diedit');
        } else {
            $this->db->transrollback();
            session()->setFlashdata('success', false);
            session()->setFlashdata('pesan', 'Data gagal diedit');
            return redirect()->to('/Settings/about_front_end');
        }
        return redirect()->to('/Settings/about_front_end');
    }


    /** end of Setting | Front End | About */
}
