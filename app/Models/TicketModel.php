<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class TicketModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Ticket
     * Hakim
     * 2023-01-12
     */

    function jqgrid_ticket($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        if (user()->user_type_id == '5' || user()->user_type_id == '4' || user()->user_type_id == '3') {
            $sql = "SELECT a.*,b.full_name,c.code_description priority_desc,d.code_description status_desc
            from ticket a
            left join users b on b.id=a.user_id
            left join lsp_master_code c on c.code_value=a.priority and c.code_type='priority' 
            left join lsp_master_code d on d.code_value=a.status and d.code_type='status_ticket' 
            where a.user_id=? ";
            $param[] = user_id();
        } else {
            $sql = "SELECT a.*,b.full_name,c.code_description priority_desc,d.code_description status_desc
                from ticket a
                left join users b on b.id=a.user_id
                left join lsp_master_code c on c.code_value=a.priority and c.code_type='priority' 
                left join lsp_master_code d on d.code_value=a.status and d.code_type='status_ticket' 
                where a.user_id<>'sdfjlasfdhlashdfklhsadkfdsf' ";
        }
        if ($keyword != "") {
            $sql .= " and  UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by ticket_date desc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }

    function get_data_ticket_by_id($id)
    {
        $sql = "select a.*,b.full_name from ticket a
                left join users b on a.user_id=b.id 
                where ticket_id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    function insert_ticket($data)
    {
        $builder = $this->db->table('ticket');
        $builder->insert($data);
    }

    public function update_ticket($data, $id)
    {
        $builder = $this->db->table('ticket');
        $builder->where('ticket_id', $id);
        $builder->update($data);
    }

    public function delete_ticket($id)
    {
        $builder = $this->db->table('ticket');
        $builder->where('ticket_id', $id);
        $builder->delete();
    }

    public function get_priorities()
    {
        $sql = "select * from lsp_master_code where code_type='priority' order by code_value";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_statuss()
    {
        $sql = "select * from lsp_master_code where code_type='status_ticket' order by code_value";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function get_users()
    {
        $sql = "select * from users where user_type_id='5' or user_type_id='4' or user_type_id='3' order by full_name";
        $query = $this->db->query($sql);
        return $query->getResultArray();
    }

    public function insert_comment($data)
    {
        $this->db->table('ticketd_comments')->insert($data);
    }

    public function get_data_comment_by_id($id)
    {
        $sql = "select a.*,b.full_name,b.user_type_id from ticketd_comments a 
                left join users b on a.user_id=b.id 
                where ticket_id=? order by comment_date asc";
        $query = $this->db->query($sql, $id);
        return $query->getResultArray();
    }

    public function check_status($ticket_id)
    {
        $sql = "select a.status,a.user_id,a.ticket_num,b.email,b.full_name from ticket a
                left join users b on a.user_id=b.id where a.ticket_id=?";
        $query = $this->db->query($sql, $ticket_id);
        return $query->getRow();
    }
    /** 
     * Pengjuan Ticket
     * Hakim Desyanto
     * 2023-01-12
     */

    public function get_tickets()
    {
        $user_id = user_id();
        $sql = "select * from ticket where user_id=? and status<>0";
        $query = $this->db->query($sql, $user_id);
        return $query->getResultArray();
    }

    public function get_coments($ticket_id)
    {
        $sql = "select a.*,b.full_name,b.user_type_id 
                from ticketd_comments a 
                left join users b on b.id=a.user_id
                where a.ticket_id=? order by a.comment_date desc";
        $query = $this->db->query($sql, $ticket_id);
        return $query->getResultArray();
    }
}
