<?php

namespace App\Models;

use CodeIgniter\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class DownloadBerkasModel extends Model
{

    protected $db;

    public function __construct()
    {
        $this->db = db_connect();
    }

    /**
     * Download Berkas | Certification Card & Certificate
     * Hakim Desyanto
     * 2023-05-29
     */

    function jqgrid_certification_card_certificate($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();

        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        if (user()->user_type_id <> '5') {

            $sql = "SELECT a.*,b.full_name, 
                    CONCAT_WS(';',a.certification_id,a.certification_card_path,a.certification_certificate_path,b.user_type_id) status_id 
                    from certification a
                    left join users b on a.user_id=b.id
                    left join assignment c on c.certification_id=a.certification_id
                    left join assignmentd_score d on d.assignment_id=c.assignment_id
                    left join users e on e.id=d.committee_id
                    where a.status='3' and d.scope_score='Y' and e.user_type_id='4' and a.certification_id not in ( select certification_id from invoice where status<>'2')";
        } else {
            $sql = "SELECT a.*,b.full_name, 
                    CONCAT_WS(';',a.certification_id,a.certification_card_path,a.certification_certificate_path,b.user_type_id) status_id 
                    from certification a
                    left join users b on a.user_id=b.id
                    left join assignment c on c.certification_id=a.certification_id
                    left join assignmentd_score d on d.assignment_id=c.assignment_id
                    left join users e on e.id=d.committee_id
                    where a.status='3' and d.scope_score='Y' and e.user_type_id='4' and a.user_id=?  and a.certification_id not in ( select certification_id from invoice where status<>'2')";
            $param[] = user_id();
        }

        if ($keyword != "") {
            $sql .= " AND UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by 1,2,3 asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }


    public function update_certification_card_certificate($data, $id)
    {
        $builder = $this->db->table('certification');
        $builder->where('certification_id', $id);
        $builder->update($data);
    }
    /** */

    /**
     * Download Bekas | Skema Sertifikasi
     * Hakim Desyanto
     * 2023-07-02
     */

    function jqgrid_skema_sertifikasi($sidx = '', $sord = '', $limit_rows = '', $start = '', $tipe_keyword = '', $keyword = '')
    {
        $order = '';
        $limit = '';
        $param = array();
        $user_id = user_id();
        $user_type = user()->user_type_id;
        if ($sidx != '' && $sord != '') $order = "ORDER BY $sidx $sord";
        if ($limit_rows != '' && $start != '') $limit = "LIMIT $limit_rows OFFSET $start";

        $sql = "select * from skema_sertifikasi";

        if ($keyword != "") {
            $sql .= " WHERE UPPER(" . $tipe_keyword . ") LIKE ? ";
            $keyword     = strtolower($keyword);
            $keyword     = strtoupper($keyword);
            $param[]     = '%' . $keyword . '%';
        }

        $sql .= " order by id asc $limit ";

        $query = $this->db->query($sql, $param);

        return $query->getResultArray();
    }


    function get_data_skema_sertifikasi_by_id($id)
    {
        $sql = "select * from skema_sertifikasi where id=?";
        $query = $this->db->query($sql, array($id));
        return $query->getRowarray();
    }

    public function update_skema_sertifikasi($data, $id)
    {
        $builder = $this->db->table('skema_sertifikasi');
        $builder->where('id', $id);
        $builder->update($data);
    }

    public function insert_skema_sertifikasi($data)
    {
        $this->db->table('skema_sertifikasi')->insert($data);
    }

    public function delete_skema_sertifikasi($id)
    {
        $this->db->table('skema_sertifikasi')->where('id', $id)->delete();
    }
    /** End of Download Berkas | Skema Sertifikasi */
}
