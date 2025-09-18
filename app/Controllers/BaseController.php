<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\BaseModel;
use Ramsey\Uuid\Uuid;
use Pusher;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    protected $db;
    protected $_salt = 'Peh@HaY74turn#elL';
    protected $jbl;
    public $_now_timestamp;
    protected $BaseModel;
    protected $_user_id;
    protected $_now;
    protected $session;
    protected $profile_picture;
  	protected $notif_email='noreply@pacer.co.id';
	protected $secretariat_email='sekretariat@pacer.co.id';



    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var array
     */
    protected $helpers = ['form', 'auth', 'inv'];

    /**
     * Constructor.
     * 
     * 
     */
    public function __construct($securePage = false)
    {
        //parent::__construct();

        $this->_user_id = user_id();
        $this->BaseModel = new BaseModel();
        $this->_now = date("Y-m-d");
        $this->_now_timestamp = date("Y-m-d H:i:s");
     //   $this->notif_email = 'noreply@pacer.co.id';
        //$this->profile_picture = "";

        //$this->db = db_connect();


        if ($securePage == true) {
            if (session('logged') == false) {
                redirect('login');
            }
        } else {
            if (session('logged') == true) {
                redirect('dashboard');
            }
        }



        $role_id = user()->role_id;
    }

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

        // E.g.: $this->session = \Config\Services::session();

        $this->session = \Config\Services::session();

        date_default_timezone_set("Asia/Jakarta");
    }

    function array4selectoption($data, $selected = '', $insertempty = false)
    {
        $option = '';
        if ($insertempty) {
            $option = '<option value=""' . (($selected == '') ? ' selected' : '') . '>&nbsp;</option>';
        }
        $ok = false;
        foreach ($data as $key => $value) {
            $option = $option . '<option value="' . $key . '" ';
            if (($selected == $key) && ($ok == false)) {
                $option = $option . ' selected';
                $ok = true;
            }
            $option = $option . '>' . $value . '</option>';
        }
        return $option;
    }

    function array4checkbox($data, $selected = '', $insertempty = false)
    {
        $option = '';
        if ($insertempty) {
            $option = '<option value=""' . (($selected == '') ? ' selected' : '') . '>&nbsp;</option>';
        }
        $ok = false;
        foreach ($data as $key => $value) {
            $option = $option . '<option value="' . $key . '" ';
            if (($selected == $key) && ($ok == false)) {
                $option = $option . ' selected';
                $ok = true;
            }
            $option = $option . '>' . $value . '</option>';
        }
        return $option;
    }

    function getfinaldate($year, $month)
    {
        $gday = 28;
        $gdate = strtotime($year . "/" . $month . "/" . $gday);
        $gmonth = date("m", $gdate);
        while ($gmonth == $month) {
            $gdate = strtotime(date('Y-m-d', strtotime(date('Y-m-d', $gdate) . ' + 1 day')));
            $gmonth = date("m", $gdate);
        }
        $gdate = strtotime(date('Y-m-d', strtotime(date('Y-m-d', $gdate) . ' - 1 day')));
        return date('Y-m-d', $gdate);
    }

    function round_down($float, $mod = 0)
    {
        return floor($float * pow(10, $mod)) / pow(10, $mod);
    }

    function round_up($float, $mod)
    {
        return ceil($float * pow(10, $mod)) / pow(10, $mod);
    }

    function zerofill($num, $zerofill = 7)
    {
        return str_pad($num, $zerofill, '0', STR_PAD_LEFT);
    }

    public function generate_menu($url)
    {
        // dd($role_id);
        // $role_id = session('user_type_id');
        $role_id = user()->user_type_id;
        //dd($role_id);
        $menu_parent = $this->BaseModel->get_menu($role_id, '0');
        $url_parent = $this->BaseModel->get_url_parent($url);
        $html = '<nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">';

        for ($i = 0; $i < count($menu_parent); $i++) {
            $sub_menu = $this->BaseModel->get_menu($role_id, $menu_parent[$i]['menu_id']);
            $has_sub_menu = count($sub_menu);
            $activei = array();
            if ($has_sub_menu == 0) {
                if ($i == 0) {
                    $html .= '<li class="nav-item ">';
                } else {
                    $html .= '<li class="nav-item">';
                }
                if ($menu_parent[$i]["menu_url"] == $url) {
                    $html .= '<a href="' . $menu_parent[$i]["menu_url"] . '" class="nav-link active"> 
                                    <i class="'  . $menu_parent[$i]["menu_icon_parent"] . '" style="color:' . $menu_parent[$i]["icon_color"] .'"></i>
                                    <p>' . $menu_parent[$i]["menu_title"] . ' </p>                                                  
                                </a>
                            </li>';
                    $active[$i + 1] = 'active';
                } else {
                    $html .= '<a href="' . $menu_parent[$i]["menu_url"] . '" class="nav-link"> 
                                <i class="'  . $menu_parent[$i]["menu_icon_parent"] . '"  style="color:' . $menu_parent[$i]["icon_color"] .'"></i>
                                <p>' . $menu_parent[$i]["menu_title"] . ' </p>                                                  
                            </a>
                        </li>';
                }
            } else {
                if ($url_parent == $menu_parent[$i]["menu_title"]) {
                    $html .= '<li class="nav-item menu-open">
                    <a href="#" class="nav-link active">
                        <i class="'  . $menu_parent[$i]["menu_icon_parent"] . '"  style="color:' . $menu_parent[$i]["icon_color"] .'"></i>
                        <p>' . $menu_parent[$i]["menu_title"] . '                                
                            <i class="fas fa-angle-left right"></i>
                        </p>
                    </a>';
                } else {
                    $html .= '<li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="'  . $menu_parent[$i]["menu_icon_parent"] . '"  style="color:' . $menu_parent[$i]["icon_color"] .'"></i>
                        <p>' . $menu_parent[$i]["menu_title"] . '                                
                            <i class="fas fa-angle-left right"></i>
                        </p>
                    </a>';
                }
            }

            /* BEGIN SUB MENU */
            if ($has_sub_menu > 0) {
                $html .= ' <ul class="nav nav-treeview">';

                for ($j = 0; $j < count($sub_menu); $j++) {
                    $sub_submenu = $this->BaseModel->get_menu($role_id, $sub_menu[$j]['menu_id']);
                    if (count($sub_submenu) == 0) {
                        if ($sub_menu[$j]["menu_url"] == $url) {
                            $html .= ' <li class="nav-item"> <a href="' . $sub_menu[$j]["menu_url"] . '" class="nav-link active"> ' . str_repeat('&nbsp', 6) . '<i class="'  . $sub_menu[$j]["menu_icon_parent"] . '" style="color:' . $menu_parent[$j]["icon_color"] .'"></i><p>' . $sub_menu[$j]["menu_title"] . '</p></a></li>';
                        } else {
                            $html .= ' <li class="nav-item"> <a href="' . $sub_menu[$j]["menu_url"] . '" class="nav-link"> ' . str_repeat('&nbsp', 6) . '<i class="'  . $sub_menu[$j]["menu_icon_parent"] . '" style="color:' . $menu_parent[$j]["icon_color"] .'"></i><p>' . $sub_menu[$j]["menu_title"] . '</p></a></li>';
                        }
                    } else {
                        if ($url_parent == $sub_menu[$j]["menu_title"]) {
                            $html .= '<li class="nav-item menu-open">
                            <a href="#" class="nav-link active">
                            ' . str_repeat('&nbsp', 6) . '<i class="' . $sub_menu[$j]["menu_icon_parent"] . '" style="color:' . $menu_parent[$j]["icon_color"] .'"></i>
                                <p>' . $sub_menu[$j]["menu_title"] . '                                
                                    <i class="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">';
                        } else {
                            $html .= '<li class="nav-item">
                            <a href="#" class="nav-link">
                            ' . str_repeat('&nbsp', 6) . '<i class="' . $sub_menu[$j]["menu_icon_parent"] . '" style="color:' . $menu_parent[$j]["icon_color"] .'"></i>
                                <p>' . $sub_menu[$j]["menu_title"] . '                                
                                    <i class="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview">';
                        }

                        for ($k = 0; $k < count($sub_submenu); $k++) {
                            if ($sub_submenu[$k]["menu_url"] == $url) {
                                $html .= ' <li class="nav-item"> <a href="' . $sub_submenu[$k]["menu_url"] . '" class="nav-link active"> ' . str_repeat('&nbsp', 12) . '<i class="'  . $sub_submenu[$k]["menu_icon_parent"] . '" style="color:' . $menu_parent[$k]["icon_color"] .'"></i><p>' . $sub_submenu[$k]["menu_title"] . '</p></a></li>';
                            } else {
                                $html .= ' <li class="nav-item"> <a href="' . $sub_submenu[$k]["menu_url"] . '" class="nav-link"> ' . str_repeat('&nbsp', 12) . '<i class="'  . $sub_submenu[$k]["menu_icon_parent"] . '" style="color:' . $menu_parent[$k]["icon_color"] .'"></i><p>' . $sub_submenu[$k]["menu_title"] . '</p></a></li>';
                            }
                        }
                        $html .= '</ul>
                    </li>';
                    }
                }
                $html .= '</ul>';
                $html .= '</li>';
            }
        }
        $html .= '</ul>';
        $html .= ' </nav>';
        // dd($html);
        return $html;
    }

    public function get_menu_id($menu_url)
    {
        $menu_id = $this->BaseModel->get_menu_id($menu_url);
        return $menu_id;
    }

    /**
     * fungsi untuk mengambil root menu
     * @param role_id
     */
    public function load_menu($role_id)
    {
        $menu = $this->BaseModel->get_menu($role_id, 0);
        // $this->load->vars('menu', $menu);
    }

    /**
     * fungsi untuk mengambil sub menu
     * @param role_id, menu_parent
     */
    public function load_sub_menu($role_id, $menu_parent)
    {
        $submenu = $this->BaseModel->get_menu($role_id, $menu_parent);
        // $this->load->vars('submenu', $submenu);
    }

    public function RupiahToNumeric($value)
    {
        $return = str_replace('.', '', $value);
        $return = str_replace(',', '.', $return);
        return $return;
    }

    public function DecimalToNumeric($value)
    {
        $return = str_replace(',', '', $value);
        return $return;
    }

    public function DatepickerToEn($datepicker)
    {
        $datepicker = str_replace('/', '', $datepicker);
        $date = substr($datepicker, 4, 4) . '-' . substr($datepicker, 2, 2) . '-' . substr($datepicker, 0, 2);
        return $date;
    }

    public function get_master_code_row($code_type, $code_type_detail)
    {
        $this->db->where('code_type', $code_type);
        $this->db->where('code_type_detail', $code_type_detail);
        $query = $this->db->get('h_master_code');
        return $query->row_array();
    }

    public function get_master_code_result($code_type, $code_type_detail)
    {
        $this->db->where('code_type', $code_type);
        $this->db->where('code_type_detail', $code_type_detail);
        $query = $this->db->get('h_master_code');
        return $query->result_array();
    }

    public function get_company()
    {
        $query = $this->db->get('h_master_company');
        return $query->row_array();
    }

    public function getDescriptionDate($date)
    {
        $month = array('', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
        $date = date('d', strtotime($date)) . ' ' . $month[(int)date('m', strtotime($date))] . ' ' . date('Y', strtotime($date));
        return $date;
    }

    public function getMonth($periode_bulan)
    {
        switch ($periode_bulan) {
            case "1":
                $month = "Januari";
                break;
            case "2":
                $month = "Februari";
                break;
            case "3":
                $month = "Maret";
                break;
            case "4":
                $month = "April";
                break;
            case "5":
                $month = "Mei";
                break;
            case "6":
                $month = "Juni";
                break;
            case "7":
                $month = "Juli";
                break;
            case "8":
                $month = "Agustus";
                break;
            case "9":
                $month = "September";
                break;
            case "10":
                $month = "Oktober";
                break;
            case "11":
                $month = "Nopember";
                break;
            case "12":
                $month = "Desember";
                break;
        }
        return $month;
    }

    public function get_uuid()
    {
        return str_replace("-", "", uuid::uuid4());
    }

    public function get_select()
    {
        $table = $this->request->getVar('stable');
        $data = $this->BaseModel->get_select($table);
        return json_encode($data);
    }

    public function get_child()
    {
        $table = $this->request->getVar('stable');
        $id = $this->request->getVar('sid');
        $data = $this->BaseModel->get_child($table, $id);
        return json_encode($data);
    }

    public function run_pusher()
    {
        $options = array(
            'cluster' => 'ap1',
            'useTLS' => true
        );
        $pusher = new Pusher\Pusher(
            '452f5671f2a3962c0370',
            '76bda6bce97299584b82',
            '1567356',
            $options
        );

        $data['message'] = 'success';
        $pusher->trigger('my-channel', 'my-event', $data);
    }

    public function run_pusher_certification()
    {
        $options = array(
            'cluster' => 'ap1',
            'useTLS' => true
        );
        $pusher = new Pusher\Pusher(
            '452f5671f2a3962c0370',
            '76bda6bce97299584b82',
            '1567356',
            $options
        );

        $data['message'] = 'success';
        $pusher->trigger('certification', 'my-event', $data);
    }

    public function run_pusher_assignment()
    {
        $options = array(
            'cluster' => 'ap1',
            'useTLS' => true
        );
        $pusher = new Pusher\Pusher(
            '452f5671f2a3962c0370',
            '76bda6bce97299584b82',
            '1567356',
            $options
        );

        $data['message'] = 'success';
        $pusher->trigger('assignment', 'my-event', $data);
    }

    public function run_pusher_comment($comment)
    {
        $options = array(
            'cluster' => 'ap1',
            'useTLS' => true
        );
        $pusher = new Pusher\Pusher(
            '452f5671f2a3962c0370',
            '76bda6bce97299584b82',
            '1567356',
            $options
        );

        // $data['message'] = $comment;
        $data = $comment;
        $pusher->trigger('comment', 'my-event', ($data));
    }
    
    public function notif_emailku()
    {
        return     'noreply@pacer.co.id';
    }
}
