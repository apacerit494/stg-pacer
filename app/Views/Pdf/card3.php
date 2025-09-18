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
        position: relative;
        top: -218px;
        left: 360px;
    }

    .depan td {
        height: 20px;
        vertical-align: middle;
    }

    /* .gambar1 {
        background-color: aqua;
    } */

    .foto {
        position: relative;
        top: -163px;
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
        background-image: url(<?php echo base_url($data['profile_picture']) ?>); 
        background-size:cover;
        background-attachment: fixed;
        background-position: center; 
       
        background-repeat:no-repeat scroll;
         background-size: 100% 100%;
         min-height:650px;
       
        /*background-size: cover;*/
        /*background-attachment: fixed;*/
        /*border: 1px solid black;*/
        /*background-repeat: no-repeat;*/
        /*background-position: center;*/
    }

    .qrcode {
        position: relative;
        top: 5px;
        left: 110px;

    }

    div.image2 {
        background-size: cover;
        background-attachment: fixed;
        border: 1px solid black;
        background-repeat: no-repeat;
        background-position: center;
    }

    .dashed-line {
        border-top: 1px dashed #000;
        width: 100%;
        /* margin: 10px 0; */
        /* margin-top: 10px;
        margin-bottom: 10px; */

    }

    .belakang {
        position: relative;
        top: -232px;
        left: 100px;
    }

    .belakang td {
        height: 13px;
        vertical-align: middle;
    }
</style>
<!-- END PAGE STYLE -->

<?php
switch ($data['code_value']) {
    case "1":
        $gambar_depan = 'depan_biru.jpg';
        $gambar_belakang = 'belakang_biru.jpg';
        break;
    case "2":
        $gambar_depan = 'depan_abu.jpg';
        $gambar_belakang = 'belakang_abu.jpg';
        break;
    case "3":
        $gambar_depan = 'depan_emas.jpg';
        $gambar_belakang = 'belakang_emas.jpg';
        break;
    case "4":
        $gambar_depan = 'depan_platinum.jpg';
        $gambar_belakang = 'belakang_platinum.jpg';
        break;
}

?>

<!-- START PAGE -->
<page backleft="17mm" backtop="15mm" backright="15mm" style="font-size:12px;line-height:18px">
    <!--  <page backbottom="15" backtop="30" backleft="15" backright="15"> -->
    <div class="gambar1">
        <img style="width:474px;height:300px;top:200; margin-left:50;overflow:hidden; " src="assets/template/card/<?= $gambar_depan; ?>" />
    </div>
    <br>
    <div class="depan">
        <table cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td style="width:150px;padding:0px"><?= $data['full_name']; ?></td>
            </tr>
            <tr>
                <td style="width:150px"><?= $data['scope_code']; ?></td>
            </tr>
            <tr>
                <td style="width:150px"><?= $data['certification_number']; ?></td>
            </tr>
            <tr>
                <td style="width:150px;padding:0px"><?= $data['code_description']; ?></td>
            </tr>
            <tr>
                <td style="height:20px;"><?= $data['start_date'] == '' ? '' : date('d M Y', strtotime($data['start_date'])); ?></td>
            </tr>
            <tr>
                <td style="height:20px;"><?= $data['end_date'] == '' ? '' : date('d M Y', strtotime($data['end_date'])); ?></td>
            </tr>

        </table>
    </div>
    <div class="foto">
        <!--<div class="image" style="height:120px;width:120px;border-radius:60px;border:1px solid black;overflow:hidden;">-->
        <div class="image" style="height:120px;width:120px;border-radius:60px;overflow:hidden;">
        </div>
    </div>
    <div class="qrcode">
        <!-- <div class="image2" style="height:120px;width:120px;overflow:hidden;"></div> -->
        <img style="width:60px;height:60px;overflow:hidden;" src="assets/template/card/qrcode.png" />

    </div>

    <br>
    <br>
    <br>
    <div class="dashed-line"></div>
    <br>
    <div class=" gambar2">
        <img style="width:474px;height:300px;margin-left:50;;overflow:hidden; " src="assets/template/card/<?= $gambar_belakang; ?>" />
    </div>

    <div class="belakang">
        <table cellspacing="0" cellpadding="0" border="0">
            <?php foreach ($data2 as $data) : ?>
                <tr>
                    <td><?= $data->fieldcode_code; ?></td>
                </tr>
            <?php endforeach; ?>


        </table>
    </div>

</page>