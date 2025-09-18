<?php

namespace App\Models;

use CodeIgniter\Model;

class SlideModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Slide
     * Hakim
     * 2023-01-12
     */

    function slide_list()
    {
        $sql = "SELECT * FROM lsp_slide WHERE showed=1";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function get_data_slide_by_id($id)
    {
        $sql = "SELECT * FROM lsp_slide WHERE showed=1 
                AND id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_slide($data)
    {
        $builder = $this->db->table('lsp_slide');
        $builder->insert($data);
    }

    public function update_slide($data, $id)
    {
        $builder = $this->db->table('lsp_slide');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_slide($id)
    {
        $builder = $this->db->table('lsp_slide');
        $builder->where('id', $id);
        $builder->delete();
    }
}
