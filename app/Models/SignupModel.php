<?php

namespace App\Models;

use CodeIgniter\Model;

class SignupModel extends Model
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

    public function insert_signup($data)
    {
        $builder = $this->db->table('users');
        $builder->insert($data);
        //   return $this->db->insertID();
    }

    public function check_email($email)
    {
        $sql = "select count(*) jml from users where email=?";
        $query = $this->db->query($sql, $email);
        $row =  $query->getRowArray();
        return $row['jml'];
    }
}
