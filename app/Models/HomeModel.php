<?php

namespace App\Models;

use CodeIgniter\Model;

class HomeModel extends Model
{
    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }
}
