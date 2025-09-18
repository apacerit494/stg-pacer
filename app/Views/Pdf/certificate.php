<style type="text/css">
    body {
        margin: 0;
        padding: 0;
    }

    table {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    table.body {
        margin: 20px;
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
        padding: 0 20px;
        margin: 0;
        width: 580px;
    }

    table.table {
        padding-left: 10px;
    }

    .depan {
        position: absolute;
        top: 250px;
        left: 230px;
        width: calc(100% - 460px); /* Adjusted to prevent overflow */
    }

    .depan table tr td {
        width: 100%; /* Adjusted to prevent overflow */
    }

    .foto {
        position: relative;
        top: -165px;
        left: 80px;
    }

    .atur {
        width: 100px;
        height: 100px;
        border: 1px solid black;
        overflow: hidden;
        border-radius: 0 0 50px 50px;
        display: inline-block;
    }

    div.image {
        background-size: cover;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .qrcode {
        position: absolute;
        top: 636px;
        left: 51px;
    }

    .profile_picture {
        position: absolute;
        top: 266px;
        left: 819px;
    }

    .pageku {
        width: 297mm; /* Width of A4 in landscape */
        height: 210mm; /* Height of A4 in landscape */
        background-image: url(<?php echo base_url('assets/template/certificate/blanko_sertifikat.png'); ?>);
        background-size: cover;
        position: relative;
    }
</style>

<!-- START PAGE -->
<page backtop="0" backbottom="0" backleft="0" backright="0" style="font-size:14px;">
    <div class="pageku">
        <div class="depan">
          
          	<div style="margin-left:404px;margin-top:-100px"><strong><?= $data['certification_number']; ?></strong></div>
          	<div style="margin-left:10px;margin-top:80px"><strong><?= $data['full_name']; ?></strong></div>
		  	<div style="margin-left:118px;margin-top:17px"><strong><?= $data['birth_place'] . ', ' . date('d M Y', strtotime($data['birth_date'])); ?></strong></div>
		    <div style="margin-left:106px;margin-top:31px"><strong>Auditor <?= $data['scope_code']; ?></strong></div>
			<div style="margin-left:138px;margin-top:24px">
              <strong>
                <?= sprintf('SS-0%d Auditor %s', $data['scope_id'], $data['scope_code']); ?>
              </strong>
            </div>
            <div style="margin-left:130px;margin-top:24px"><strong><?= $data['code_description']; ?></strong></div>
          	<div style="margin-left:124px; margin-top:25px;">
              <?php if (!empty($data2)): ?>
                <?php $no = 1; ?>
                <?php foreach ($data2 as $data1): ?>
                  <div style="margin-bottom: 5px; font-weight: bold;">
                    <?= $no++; ?>.&nbsp;&nbsp;<?= $data1->fieldcode_code . ' - ' . $data1->fieldcode_description; ?>
                  </div>
                <?php endforeach; ?>
              <?php endif; ?>
            </div>
			<div style="margin-left:96px; margin-top:25px;"><strong><?= $data['total_score']; ?></strong></div>
          	<div style="margin-left:132px; margin-top:26px;"><strong><?= date('d M Y', strtotime($data['start_date'])); ?></strong></div>
          	<div style="margin-left:80px; margin-top:26px;"><strong><?= date('d M Y', strtotime($data['start_date'])) . ' s/d ' . date('d M Y', strtotime($data['end_date'])); ?></strong></div>
          
          
        </div>
        <div class="qrcode">
            <img style="width:104px;height:104px;overflow:hidden;" src="assets/template/card/qrcode.png" />
        </div>
        <div class="profile_picture">
            <img style="width:122px;height:156px;overflow:hidden;" src="<?php echo base_url($data['profile_picture']) ?>" />
     </div>
    </div>
</page>
