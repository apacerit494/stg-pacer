<style type="text/css">
    table {
        margin: 0;
        padding: 0;
    }

    table.body {
        margin: 20px 20px 20px 0px;
        padding: 0;
    }

    tr {
        padding: 0;
        margin: 0;
    }

    td {
        vertical-align: top;
        line-height: 18px;
    }

    td.header {
        padding: 0 0 0 20px;
        margin: 0;
        width: 580px;
    }

    table {
        width: 700px;
    }



    table.table {
        padding-left: 10px;
    }

    .depan {
        position: absolute; 
        top: 250px;
        left: 230px;
    }

    .depan table tr td {
        /*height: 20px;*/
        width : 650px;
        /*vertical-align: middle;*/
    }

    /* .gambar1 {
        background-color: aqua;
    } */

    .foto {
        position: relative;
        top: -165px;
        left: 80px;

        /*top: -160px;*/
        /*left: 85px;*/

    }

    .atur {
        width: 100px;
        height: 100px;
        border: 1px solid black;
        overflow: hidden;
        border-radius: 0px 0px 50px 50px;
        display: inline-block;
    }

    div.image {
        /*background-image:url(<?php echo base_url('assets/template/certificate/certificate.png'); ?>);*/
        /* background-image: url(<?php echo base_url($data['profile_picture']) ?>); */
        background-size: cover;
        background-attachment: fixed;
        background-position: center;

        background-repeat: no-repeat;
        background-size: 100% 100%;
        min-height: 650px;

    }


    .qrcode {
        position: absolute;

        top: 640px;
        left: 65px;

    }
    
    .profile_picture {
        position: absolute;
        top: 335px;
        left: 912px;

    }

    .pageku {

        width: 1125px;
        height: 793px;
        background-image: url(<?php echo base_url('assets/template/certificate/certificate_new.jpg'); ?>);
        background-size: cover;
    }
</style>
<!-- END PAGE STYLE -->


<!-- START PAGE -->
<!-- <page backleft="17mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px"> -->
<page style="font-size:14px;line-height:18px;">
    <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->
    <div class="pageku">
        <!-- <img style="width:1125px;height:793px;overflow:hidden; " src="assets/template/certificate/certificate_new.jpg" /> -->
        <!-- <img style="width:1125px;height:793px;overflow:hidden; " src="assets/template/certificate/certificate.png" /> -->
        <div class="depan">
            <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td>Nama : <strong><?= $data['full_name']; ?></strong></td>
                </tr>
                <tr>
                    <td>Tempat Tanggal Lahir : <strong><?= $data['birth_place'] .', ' .date('d M Y',strtotime($data['birth_date'])) ; ?></strong></td>
                </tr>
                <tr>
                    <td>
                    <table cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="width:50">Alamat :</td>
                                <td style="width:590"><strong><?= $data['address']; ?></strong></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            
            <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td>Nomor Sertifikat : <strong><?= $data['certification_number']; ?></strong></td>
                </tr>
                <tr>
                    <td>Ditetapkan sebagai : <strong>Auditor <?= $data['scope_code']; ?></strong></td>
                </tr>
                <tr>
                    <td>Sesuai skema sertifikasi LSP PACER SS-0<?= $data['scope_id']; ?></td>
                </tr>
                
                <tr>
                    <td>Pada Tingkatan / Level : <strong><?= $data['code_description']; ?></strong></td>
                </tr>
                <tr>
                    <td>Dengan Bidang Industri Jasa : </td>
                </tr>
                
                <tr>
                    <td>
                        <table cellspacing="0" cellpadding="0" border="0">
                                      <?php 
                $no=1;
                foreach ($data2 as $data1) : ?>
                
                <tr>
                    <td style="width:15px"><strong><?= $no++; ?> .</strong></td>
                    <td style="width:510px" ><strong><?= $data1->fieldcode_code .' - ' .$data1->fieldcode_description; ?></strong></td>
                    
                </tr>
            <?php endforeach; ?>
                   
                        </table>
                    </td>
                </tr>
               
                <tr>
                    <td>Total Angka Kredit : <strong><?= $data['total_score']; ?></strong></td>
                </tr>  <tr>
                    <td>Tanggal Sertifikasi Awal : <strong><?= date('d M Y', strtotime($data['start_date'])); ?></strong></td>
                </tr>  <tr>
                    <td>Masa Sertifikasi : <strong><?= date('d M Y', strtotime($data['start_date'])) .' s/d ' .date('d M Y', strtotime($data['end_date'])); ?></strong></td>
                </tr>
            </table>
        </div>
    
    
        <div class="qrcode">
            <img style="width:120px;height:120px;overflow:hidden;" src="assets/template/card/qrcode.png" />
        </div>
        
         <div class="profile_picture">
            <img style="width:122px;height:156px;overflow:hidden;" src="<?php echo base_url($data['profile_picture']) ?>" />
        </div>
        <br>
        <br>
       
        <br>
    </div>
    <br>


</page>