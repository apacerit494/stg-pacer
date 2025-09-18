<?php

namespace App\Models;

use CodeIgniter\Model;

class NewsModel extends Model
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

    function news_list()
    {
        $sql = "SELECT * FROM lsp_news WHERE showed=1 Order By news_date DESC LIMIT 3";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    function get_data_news_by_id($id)
    {
        $sql = "SELECT * FROM lsp_news WHERE showed=1 
                AND id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_news($data)
    {
        $builder = $this->db->table('lsp_news');
        $builder->insert($data);
    }

    public function update_news($data, $id)
    {
        $builder = $this->db->table('lsp_news');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function delete_news($id)
    {
        $builder = $this->db->table('lsp_news');
        $builder->where('id', $id);
        $builder->delete();
    }
}
