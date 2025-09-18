<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use App\Models\BaseModel;





class Auth implements FilterInterface
{
    protected $BaseModel;
    protected $db;

    public function __construct()
    {
        $this->BaseModel = new BaseModel();
        $this->db = db_connect();
    }


    public function before(RequestInterface $request, $arguments = null)
    {
        if (!session()->get('user_id')) {
            //    return redirect()->to('/Login/index');
            return redirect()->to('/login');
        }

        // if (!logged_in()) {
        //     return redirect()->to('/login');
        // }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
