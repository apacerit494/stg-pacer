<!-- form ADD -->

<?= $this->extend('Container'); ?>
<?= $this->section('content'); ?>
<div class="page-content">
    <div class="container">

        <div class="card card-info" id="sertifikasiku">

            <div class="card-header">
                <h3 class="card-title"> <?= (count($certifications) > 0) ? " SERTIFIKASI ANDA SEDANG DALAM PROSES  " : "PENGAJUAN SERTIFIKASI"; ?></h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <div class="card-body">
                <div class="form-body">
                    <nav class="w-100">
                        <div class="nav nav-tabs" id="product-tab" role="tablist">
                            <a class="nav-item nav-link active" id="Add-Ticket-tab" data-toggle="tab" href="#Add-Ticket" role="tab" aria-controls="Add-Ticket" aria-selected="true">Pengajuan Sertifikasi</a>
                            <a class="nav-item nav-link" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="false">Comments</a>
                        </div>
                    </nav>
                    <div class="tab-content p-3" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="Add-Ticket" role="tabpanel" aria-labelledby="Add-Ticket-tab">
                            <?php $jumlah_sertifikasi = 1;
                            // jika belum ada data sama sekali
                            if (count($certifications) < 1) { ?>
                                <div class="after-add-more-sertifikasi" id="sertifikasi1">
                                    <input type="hidden" id="jumlah_batas" name="jumlah_batas" value="2">
                                    <input type="hidden" id="jumlah_tambah" name="jumlah_tambah" value="2">

                                    <?php for ($i = 1; $i < 3; $i++) { ?>
                                        <div class="tambahan_<?= $i; ?>" style="display:<?= ($i == 1) ? true : 'none'; ?>">

                                            <form class="form-horizontal" role="form" method="post" id="FormAdd_<?= $i; ?>" action="<?php echo site_url('/Certification/add_pengajuan_sertifikasi/' . $i) ?>">

                                                <?= csrf_field() ?>
                                                <div class="alert alert-error" style="display:none;">
                                                    <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                                                    <button class="close" data-dismiss="alert"></button>
                                                    You have some form errors. Please check below.
                                                </div>
                                                <div class="form-body">
                                                    <!-- Isi Data -->
                                                    <div class="row">
                                                        <div class="col-md-8">
                                                            <input type="hidden" id="id_<?= $i; ?>" name="id_<?= $i; ?>">
                                                            <input type="hidden" id="user_id_<?= $i; ?>" name="user_id_<?= $i; ?>" value="<?= user_id(); ?>">
                                                            <input type="hidden" id="status_<?= $i; ?>" name="status_<?= $i; ?>" value="0">
                                                            <input type="hidden" id="text_surat_persetujuan_<?= $i; ?>" name="text_surat_persetujuan_<?= $i; ?>" value="">
                                                            <div class="form-group row">
                                                                <label class="col-sm-3 control-label" style="text-align:right">Certification Number</label>
                                                                <div class="col-sm-6">
                                                                    <input type="text" name="certification_number_<?= $i; ?>" id="certification_number_<?= $i; ?>" class="form-control" disabled>
                                                                </div>
                                                                <div class="col-md-1" title="Add Scope">
                                                                    <span class="btn btn-circle green float-right add-more-sertifikasi" title="Add Scope"><strong><strong> +</strong></strong></span>';
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-md-3 control-label" style="text-align:right">Certification Type</label>
                                                                <div class="col-md-6">
                                                                    <select name="certification_type_id_<?= $i; ?>" id="certification_type_id_<?= $i; ?>" class="form-control">
                                                                        <option value="">Please Select</option>
                                                                        <?php foreach ($certification_types as $type) : ?>
                                                                            <option value="<?= $type['certification_type_id']; ?>"><?= $type['description']; ?></option>
                                                                        <?php endforeach; ?>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-md-3 control-label" style="text-align:right">Scope</label>
                                                                <div class="col-md-6">
                                                                    <select name="scope_id_<?= $i; ?>" id="scope_id_<?= $i; ?>" class="form-control">
                                                                        <option value="">Please Select</option>
                                                                        <?php foreach ($scopes as $scope) : ?>
                                                                            <option value="<?= $scope['scope_id']; ?>"><?= $scope['scope_code'] . ' - ' . $scope['scope_description']; ?></option>
                                                                        <?php endforeach; ?>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-md-3 control-label" style="text-align:right">Field Code</label>
                                                                <div class="col-md-6">
                                                                    <select class="multiple-select" data-placeholder="Silahkan pilih kode bidang" multiple="multiple" id="fieldcode_id_<?= $i; ?>" name="fieldcode_id_<?= $i; ?>[]">
        
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-md-3 control-label" style="text-align:right">Auditor Level</label>
                                                                <div class="col-md-6">
                                                                    <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor_<?= $i; ?>" name="level_auditor_<?= $i; ?>">
                                                                        <option value="">Please Select</option>
                                                                        <?php foreach ($level_auditors as $level_auditor) : ?>
                                                                            <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                                                                        <?php endforeach; ?>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-sm-3 control-label" style="text-align:right">Voucher Code</label>
                                                                <div class="col-sm-6">
                                                                    <input class="form-control  test" type="text" id="voucher_code_<?= $i; ?>" name="voucher_code_<?= $i; ?>" maxlength="50">
                                                                </div>
                                                                <label class="col-sm-9 control-label" style="text-align:left;margin-top:10px; " id="ket_discount_<?= $i; ?>"></label>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-sm-3 control-label" style="text-align:right">Cost</label>
                                                                <div class="col-sm-6">
                                                                    <input class="form-control maskmoney" type="text" id="cost_<?= $i; ?>" name="cost_<?= $i; ?>" maxlength="18" value="0" disabled="" style="text-align:right">
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-sm-3 control-label" style="text-align:right">Surat Persetujuan</label>
                                                                <div class="col-sm-5">
                                                                    <input class="form-control" type="file" accept="application/pdf,image/*" id="surat_persetujuan_<?= $i; ?>" name="surat_persetujuan_<?= $i; ?>" >
                                                                </div>
                                                                <div class="com-sm-2">
                                                                    <a id="btn_preview_<?= $i; ?>" class="btn btn-primary"  target="_blank">Preview</a>
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label class="col-sm-3 control-label" style="text-align:right"></label>
                                                                <div class="col-sm-6 check_syarat">
                                                                    <input type="checkbox" id="check_syarat_<?= $i; ?>" name="check_syarat_<?= $i; ?>[]" style="color:blue"> Saya sudah membaca dan menyetujui surat persetujuan dan perjanjian yang berlaku <a href="#" data-toggle="modal" data-target="#myModal">Baca Persetujuan & Perjanjian</a><br>
                                                                </div>
                                                            </div>
        
                                                            <hr>
                                                            <div class="form-actions">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 control-label"></label>
                                                                    <div class="col-md-7">
                                                                        <button type="button" class="btn btn-circle blue" id="btn_save_<?= $i; ?>"><i class="fa fa-save"></i> Submit</button>
                                                                        <button class="btn btn-circle green" id="btn_draft_<?= $i; ?>"><i class="fa fa-save"></i> Save as Draft</button>
                                                                        <!-- <button type="button" class="btn btn-circle yellow" id="btn_edit_<?= $i; ?>" disabled><i class="fa fa-edit"></i> Edit</button> -->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <h1>Panduan Field Code</h1>
                                                            <br>
                                                            <img src="<?= base_url() ?>/assets/images/FieldCode.png" style="width:98%">
                                                            <br>
                                                            <br>
                                                            <a id="btn_preview" class="btn btn-primary"  target="_blank" href="<?= base_url() . "/assets/surat/Surat Persetujuan.docx" ?>">Download Surat Persetujuan</a>
                                                        
                                                        </div>
                                                    </div>
                                                    <!-- End of Data  -->
                                                </div>

                                            </form>
                                        </div>
                                    <?php } ?>
                                </div>
                            <?php $jumlah_sertifikasi = 2;
                            } else { ?>
                                <!-- jika masih ada kuota untuk mengajukan sertifikasi -->
                                <?php if ($jum_proses < 2) {
                                    $jm = count($certifications) + 1;
                                    $js = count($certifications) + (3 - $jum_proses);
                                    $jb = $jm - 1;
                                    for ($i = $jm; $i < $js; $i++) { ?>
                                        <div class="after-add-more-sertifikasi" id="sertifikasi1">
                                            <div class="tambahan_<?= $i; ?>" style="display:none">

                                                <form class="form-horizontal" role="form" method="post" id="FormAdd_<?= $i; ?>" action="<?php echo site_url('/Certification/add_pengajuan_sertifikasi/' . $i) ?>">

                                                    <?= csrf_field() ?>
                                                    <div class="alert alert-error" style="display:none;">
                                                        <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                                                        <button class="close" data-dismiss="alert"></button>
                                                        You have some form errors. Please check below. <?= $jum_proses; ?>
                                                    </div>
                                                    <div class="form-body">
                                                        <!-- Isi Data -->
                                                        <div class="row">
                                                            <div class="col-md-8">
                                                                <input type="hidden" id="id_<?= $i; ?>" name="id_<?= $i; ?>">
                                                                <input type="hidden" id="user_id_<?= $i; ?>" name="user_id_<?= $i; ?>" value="<?= user_id(); ?>">
                                                                <input type="hidden" id="status_<?= $i; ?>" name="status_<?= $i; ?>" value="0">
                                                                <input type="hidden" id="text_surat_persetujuan_<?= $i; ?>" name="text_surat_persetujuan_<?= $i; ?>" value="">
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 control-label" style="text-align:right">Certification Number</label>
                                                                    <div class="col-sm-7">
                                                                        <input type="text" name="certification_number_<?= $i; ?>" id="certification_number_<?= $i; ?>" class="form-control" disabled>
                                                                    </div>
                                                                    <div class="col-md-1" title="Add Scope">
                                                                        <span class="btn btn-circle green float-right add-more-sertifikasi" title="Add Scope"><strong><strong> +</strong></strong></span>';
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 control-label" style="text-align:right">Certification Type</label>
                                                                    <div class="col-md-7">
                                                                        <select name="certification_type_id_<?= $i; ?>" id="certification_type_id_<?= $i; ?>" class="form-control">
                                                                            <option value="">Please Select</option>
                                                                            <?php foreach ($certification_types as $type) : ?>
                                                                                <option value="<?= $type['certification_type_id']; ?>"><?= $type['description']; ?></option>
                                                                            <?php endforeach; ?>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 control-label" style="text-align:right">Scope</label>
                                                                    <div class="col-md-7">
                                                                        <select name="scope_id_<?= $i; ?>" id="scope_id_<?= $i; ?>" class="form-control">
                                                                            <option value="">Please Select</option>
                                                                            <?php foreach ($scopes as $scope) : ?>
                                                                                <option value="<?= $scope['scope_id']; ?>"><?= $scope['scope_code'] . ' - ' . $scope['scope_description']; ?></option>
                                                                            <?php endforeach; ?>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 control-label" style="text-align:right">Field Code</label>
                                                                    <div class="col-md-7">
                                                                        <select class="multiple-select" data-placeholder="Silahkan pilih kode bidang" multiple="multiple" id="fieldcode_id_<?= $i; ?>" name="fieldcode_id_<?= $i; ?>[]">
        
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 control-label" style="text-align:right">Auditor Level</label>
                                                                    <div class="col-md-7">
                                                                        <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor_<?= $i; ?>" name="level_auditor_<?= $i; ?>">
                                                                            <option value="">Please Select</option>
                                                                            <?php foreach ($level_auditors as $level_auditor) : ?>
                                                                                <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                                                                            <?php endforeach; ?>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 control-label" style="text-align:right">Voucher Code</label>
                                                                    <div class="col-sm-4">
                                                                        <input class="form-control test" type="text" id="voucher_code_<?= $i; ?>" name="voucher_code_<?= $i; ?>" maxlength="50">
                                                                    </div>
                                                                    <label class="col-sm-5 control-label" style="text-align:left" id="ket_discount_<?= $i; ?>"></label>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 control-label" style="text-align:right">Cost</label>
                                                                    <div class="col-sm-7">
                                                                        <input class="form-control maskmoney" type="text" id="cost_<?= $i; ?>" name="cost_<?= $i; ?>" maxlength="18" value="0" disabled="" style="text-align:right">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 control-label" style="text-align:right">Surat Persetujuan</label>
                                                                    <div class="col-sm-5">
                                                                        <input class="form-control" type="file" accept="application/pdf,image/*" id="surat_persetujuan_<?= $i; ?>" name="surat_persetujuan_<?= $i; ?>" >
                                                                    </div>
                                                                    <div class="com-sm-2">
                                                                        <a id="btn_preview_<?= $i; ?>" class="btn btn-primary"  target="_blank">Preview</a>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group row">
                                                                    <label class="col-sm-3 control-label" style="text-align:right"></label>
                                                                    <div class="col-sm-7 check_syarat">
                                                                        <input type="checkbox" id="check_syarat_<?= $i; ?>" name="check_syarat_<?= $i; ?>[]" style="color:blue"> Saya sudah membaca dan menyetujui surat persetujuan dan perjanjian yang berlaku <a href="#" data-toggle="modal" data-target="#myModal">Baca Persetujuan & Perjanjian</a><br>
                                                                    </div>
                                                                </div>
        
                                                                <hr>
                                                                <div class="form-actions">
                                                                    <div class="form-group row">
                                                                        <label class="col-md-3 control-label"></label>
                                                                        <div class="col-md-7">
                                                                            <button type="button" class="btn btn-circle blue" id="btn_save_<?= $i; ?>"><i class="fa fa-save"></i> Submit</button>
                                                                            <button class="btn btn-circle green" id="btn_draft_<?= $i; ?>"><i class="fa fa-save"></i> Save as Draft</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <hr>
                                                            </div>
                                                        <!-- End of Data  -->
                                                            <div class="col-md-4">
                                                                <h1>Panduan Field Code</h1>
                                                                <br>
                                                                <img src="<?= base_url() ?>/assets/images/FieldCode.png" style="width:98%">
                                                                <br>
                                                                <br>
                                                                <a id="btn_preview" class="btn btn-primary"  target="_blank" href="<?= base_url() . "/assets/surat/Surat Persetujuan.docx" ?>">Download Surat Persetujuan</a>
                                                   
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>

                                    <?php $jb++;
                                    } ?>
                                    <input type="hidden" id="jumlah_batas" name="jumlah_batas" value="<?= $jb; ?>">
                                    <input type="hidden" id="jumlah_tambah" name="jumlah_tambah" value="<?= $jm; ?>">
                                <?php }
                                foreach ($certifications as $certification) : ?>
                                    <!-- jika sudah tidak ada kuota untuk mengajukan sertifikasi -->
                                    <div class="after-add-more-sertifikasi" id="sertifikasi1">
                                        <div class="tambahan_<?= $jumlah_sertifikasi; ?>">

                                            <form class="form-horizontal" role="form" method="post" id="FormAdd_<?= $jumlah_sertifikasi; ?>" action="<?php echo site_url('/Certification/add_pengajuan_sertifikasi/' . $jumlah_sertifikasi) ?>">

                                                <?= csrf_field() ?>
                                                <div class="alert alert-error" style="display:none;">
                                                    <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                                                    <button class="close" data-dismiss="alert"></button>
                                                    You have some form errors. Please check below. <?= $jum_proses; ?>
                                                </div>
                                                <div class="form-body">
                                                    <!-- Isi Data -->
                                                    <div class="row">
                                                        <div class="col-md-8">
                                                        <input type="hidden" id="id_<?= $jumlah_sertifikasi; ?>" name="id_<?= $jumlah_sertifikasi; ?>" value="<?= $certification['certification_id']; ?>">
                                                        <input type="hidden" id="user_id_<?= $jumlah_sertifikasi; ?>" name="user_id_<?= $jumlah_sertifikasi; ?>" value="<?= user_id(); ?>">
                                                        <input type="hidden" id="status_<?= $jumlah_sertifikasi; ?>" name="status_<?= $jumlah_sertifikasi; ?>" value="<?= $certification['status']; ?>">
                                                        <input type="hidden" id="text_surat_persetujuan_<?= $jumlah_sertifikasi; ?>" name="text_surat_persetujuan_<?= $jumlah_sertifikasi; ?>" value="<?= $certification['surat_persetujuan']; ?>">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 control-label" style="text-align:right">Certification Number</label>
                                                            <div class="col-sm-7">
                                                                <input type="text" name="certification_number_<?= $jumlah_sertifikasi; ?>" id="certification_number_<?= $jumlah_sertifikasi; ?>" class="form-control" value="<?= $certification['certification_number']; ?>" disabled>
                                                            </div>
                                                            <div class="col-md-1" title="Add Scope">
                                                                <span class="btn btn-circle green float-right add-more-sertifikasi" title="Add Scope"><strong><strong> +</strong></strong></span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-md-3 control-label" style="text-align:right">Certification Type</label>
                                                            <div class="col-md-7">
                                                                <select name="certification_type_id_<?= $jumlah_sertifikasi; ?>" id="certification_type_id_<?= $jumlah_sertifikasi; ?>" class="form-control" <?= ($certification['status'] != '0') ? " disabled" : "" ?>>
                                                                    <option value="">Please Select</option>
                                                                    <?php foreach ($certification_types as $type) : ?>
                                                                        <option value="<?= $type['certification_type_id']; ?>" <?= ($certification['certification_type_id'] == $type['certification_type_id']) ? " selected" : ""; ?>><?= $type['description']; ?></option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-md-3 control-label" style="text-align:right">Scope</label>
                                                            <div class="col-md-7">
                                                                <select name="scope_id_<?= $jumlah_sertifikasi; ?>" id="scope_id_<?= $jumlah_sertifikasi; ?>" class="form-control" <?= ($certification['status'] != '0') ? " disabled" : "" ?>>
                                                                    <option value="">Please Select</option>
                                                                    <?php foreach ($scopes as $scope) : ?>
                                                                        <option value="<?= $scope['scope_id']; ?>" <?= ($certification['scope_id'] == $scope['scope_id']) ? " selected" : ""; ?>><?= $scope['scope_code'] . ' - ' . $scope['scope_description']; ?></option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-md-3 control-label" style="text-align:right">Field Code</label>
                                                            <div class="col-md-7">
                                                                <select class="multiple-select" data-placeholder="Silahkan pilih kode bidang" multiple="multiple" id="fieldcode_id_<?= $jumlah_sertifikasi; ?>" name="fieldcode_id_<?= $jumlah_sertifikasi; ?>[]" <?= ($certification['status'] != '0') ? " disabled" : "" ?>>
    
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-md-3 control-label" style="text-align:right">Auditor Level</label>
                                                            <div class="col-md-7">
                                                                <select class="form-control" data-placeholder="Silahkan pilih level auditor2 " id="level_auditor_<?= $jumlah_sertifikasi; ?>" name="level_auditor_<?= $jumlah_sertifikasi; ?>" <?= ($certification['status'] != '0') ? " disabled" : "" ?>>
                                                                    <option value="">Please Select</option>
                                                                    <?php foreach ($level_auditors as $level_auditor) : ?>
                                                                        <option value="<?php echo $level_auditor['code_value'] ?>" <?= ($certification['level_auditor'] == $level_auditor['code_value']) ? " selected" : ""; ?>><?php echo $level_auditor['code_description']  ?></option>
                                                                    <?php endforeach; ?>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 control-label" style="text-align:right">Voucher Code</label>
                                                            <div class="col-sm-3">
                                                                <input class="form-control test" type="text" id="voucher_code_<?= $jumlah_sertifikasi; ?>" name="voucher_code_<?= $jumlah_sertifikasi; ?>" maxlength="50" value="<?php echo $certification['voucher_code'] ?>" <?= ($certification['status'] != '0') ? " disabled" : "" ?>>
                                                            </div>
                                                            <label class="col-sm-5 control-label" style="text-align:left" id="ket_discount_<?= $jumlah_sertifikasi; ?>"></label>
                                                        </div>
                                                        <div class="form-group row" style="<?= ($certification['status'] <> '0') ? "display:none" : "" ?>">
                                                            <label class="col-sm-3 control-label" style="text-align:right">Cost</label>
                                                            <div class="col-sm-7">
                                                                <input class="form-control maskmoney" type="text" id="cost_<?= $jumlah_sertifikasi; ?>" name="cost_<?= $jumlah_sertifikasi; ?>" maxlength="18" value="0" disabled="" style="text-align:right">
                                                                <!-- <input type="text" name="cost" id="cost" class="form-control maskmoney" style="background:#f9f9f9;" disabled> -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 control-label" style="text-align:right">Surat Persetujuan</label>
                                                            <div class="col-sm-5">
                                                                <input class="form-control" type="file" accept="application/pdf,image/*" id="surat_persetujuan_<?= $jumlah_sertifikasi; ?>" name="surat_persetujuan_<?= $jumlah_sertifikasi; ?>" <?= ($certification['status'] != '0') ? " disabled" : "" ?>>
                                                            </div>
                                                            <div class="com-sm-2">
                                                                <a id="btn_preview_<?= $jumlah_sertifikasi; ?>" class="btn btn-primary" href="<?= $certification['surat_persetujuan'] == '' || $certification['surat_persetujuan'] == null ? 'javascript:' : base_url() . $certification['surat_persetujuan'] ?>" target="_blank">Preview</a>
                                                            </div>
                                                        </div>
                                                            
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 control-label" style="text-align:right">Status</label>
                                                            <div class="col-sm-7">
                                                                <input class="form-control" type="text" id="status_<?= $jumlah_sertifikasi; ?>" name="status_<?= $jumlah_sertifikasi; ?>" value="<?= $certification['code_description'] ?>" disabled="">
                                                                <!-- <input type="text" name="cost" id="cost" class="form-control maskmoney" style="background:#f9f9f9;" disabled> -->
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 control-label" style="text-align:right"></label>
                                                            <div class="col-sm-7 check_syarat">
                                                                <input type="checkbox" id="check_syarat_<?= $jumlah_sertifikasi; ?>" name="check_syarat_<?= $jumlah_sertifikasi; ?>[]" style="color:blue" checked disabled> Saya sudah membaca dan menyetujui surat persetujuan dan perjanjian yang berlaku <a href="#" data-toggle="modal" data-target="#myModal">Baca Persetujuan & Perjanjian</a><br>
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <?php if ($certification['status'] == '0') { ?>
                                                            <div class="form-actions">
                                                                <div class="form-group row">
                                                                    <label class="col-md-3 control-label"></label>
                                                                    <div class="col-md-7">
                                                                        <button type="button" class="btn btn-circle blue" id="btn_save_<?= $jumlah_sertifikasi; ?>"><i class="fa fa-save"></i> Submit</button>
                                                                        <button class="btn btn-circle green" id="btn_draft_<?= $jumlah_sertifikasi; ?>"><i class="fa fa-save"></i> Save as Draft</button>
                                                                        <!-- <button type="button" class="btn btn-circle yellow" id="btn_edit_<?= $jumlah_sertifikasi; ?>"><i class="fa fa-edit"></i> Edit</button> -->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr>
                                                        <?php } ?>
                                                        <!-- End of Data  -->
                                                    </div>
                                                        <div class="col-md-4">
                                                            <h1>Panduan Field Code</h1>
                                                            <br>
                                                            <img src="<?= base_url() ?>/assets/images/FieldCode.png" style="width:98%">
                                                            <br>
                                                            <br>
                                                            <a id="btn_preview" class="btn btn-primary"  target="_blank" href="<?= base_url() . "/assets/surat/Surat Persetujuan.docx" ?>">Download Surat Persetujuan</a>
                                                   
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                <?php
                                    $jumlah_sertifikasi++;
                                endforeach;
                                ?>
                                <input type="hidden" id="jumlah_batas" name="jumlah_batas" value="0">
                                <input type="hidden" id="jumlah_tambah" name="jumlah_tambah" value="0">
                            <?php } ?>


                        </div>
                        <!-- tab comment start -->
                        <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                            <div class="card card-primary card-outline direct-chat direct-chat-primary">
                                <form class="form-horizontal" role="form" method="post" id="FormComment" action="<?php echo site_url('Certification/add_comment') ?>">
                                    <input type="hidden" id="full_name" name="full_name" value="<?= session('full_name'); ?>">
                                    <div class="card-body">
                                        <!-- Conversations are loaded here -->
                                        <div class="direct-chat-messages">
                                            <!-- Message. Default to the left -->


                                            <div class="tambahan">
                                                <?php if (count($certifications) > 0) { ?>
                                                    <input type="hidden" id="certification_id" name="certification_id" value="<?= $comment_id; ?>">
                                                    <?php foreach ($comments as $comment) : ?>
                                                        <?php if ($comment['user_type_id'] == '5') { ?>
                                                            <div class="direct-chat-msg right">
                                                                <div class="direct-chat-msg ">
                                                                    <div class="direct-chat-infos clearfix">
                                                                        <span class="direct-chat-name float-right"><?= $comment['full_name'] ?></span>
                                                                        <span class="direct-chat-timestamp float-left"><?= $comment['comment_date'] ?></span>
                                                                    </div>
                                                                    <img class="direct-chat-img" src="<?php echo base_url('assets/global/img/avatar.png'); ?>" alt="Message User Image">
                                                                    <div class="direct-chat-text">
                                                                        <?= $comment['comment'] ?>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <?php } else {  ?>
                                                            <div class="direct-chat-msg">
                                                                <div class="direct-chat-msg ">
                                                                    <div class="direct-chat-infos clearfix">
                                                                        <span class="direct-chat-name float-left"><?= $comment['full_name'] ?></span>
                                                                        <span class="direct-chat-timestamp float-right"><?= $comment['comment_date'] ?></span>
                                                                    </div>
                                                                    <img class="direct-chat-img" src="<?php echo base_url('assets/global/img/avatar.png'); ?>" alt="Message User Image">
                                                                    <div class="direct-chat-text">
                                                                        <?= $comment['comment'] ?>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        <?php } ?>

                                                    <?php endforeach; ?>
                                                <?php } ?>
                                            </div>


                                        </div>
                                        <!-- /.card-body -->
                                        <div class="card-footer">
                                            <!-- <form method="post"> -->
                                            <div class="input-group">
                                                <input type="text" id="comment" name="comment" placeholder="Type Message ..." class="form-control">
                                                <span class="input-group-append">
                                                    <button type="submit" class="btn btn-primary">Send</button>
                                                </span>
                                            </div>
                                            <!-- </form> -->
                                        </div>

                                        <input type="hidden" name="apasih" id="apasih">
                                        <!-- /.card-footer-->
                                </form>
                            </div>

                        </div>
                        <!-- tab comment end -->
                    </div>

                </div>
                <!-- /.card-body -->

                <!-- /.card-footer -->

            </div>
        </div>

        <div class="modal fade" id="myModal" tabindex="1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="max-width: 600px">
                <div class="modal-content">
                    <div class="modal-body" style="display:float ;">
                        <p style="text-align:center ;">
                            <strong><strong><strong>PERSETUJUAN DAN PERJANJIAN SERTIFIKASI</strong></strong></strong>
                        </P>
                        <hr>

                        <p style="text-align:justify;">
                            Saya mengajukan sertfikasi profesi di LSP PACER dan menyetujui perjanjian sertifikasi dengan ketentuan sebagai berikut : </p>
                        <table>
                            <tr>
                                <td style="vertical-align:top;">1. </td>
                                <td style="text-align:justify;">Saya menyatakan bahwa semua dokumen dan informasi yang saya berikan adalah benar dan bersedia bertanggung jawab secara hukum bilamana informasi dan dokumen yang saya berikan adalah tidak benar.<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">2. </td>
                                <td style="text-align:justify;">Saya bersedia mengikuti dan memenuhi persyaratan sertifikasi yang ditetapkan oleh LSP PACER sebagaimana yang terdapat dalam Skema Sertifikasi LSP PACER secara taat asas.<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">3. </td>
                                <td style="text-align:justify;">Saya akan menjaga kerahasiaan informasi yang karena sifatnya harus saya rahasiakan sebagai seorang auditor<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">4. </td>
                                <td style="text-align:justify;">Saya akan menjaga kerahasiaan informasi dari LSP PACER seperti soal ujian dan materi pelatihan, Skema Sertifikasi serta informasi lainnya yang sifatnya harus dirahasiakan sesuai ketentuan dari LSP PACER<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">5. </td>
                                <td style="text-align:justify;">Saya bersedia membayar biaya admnistrasi dan biaya sertifikasi yang ditetapkan oleh LSP PACER<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">6. </td>
                                <td style="text-align:justify;">Saya bersedia mematuhi kode etik yang tertuang dalam Skema Sertifikasi LSP PACER<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">7. </td>
                                <td style="text-align:justify;">Saya akan melaksanakan tugas sebagai seorang auditor dengan profesional<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">8. </td>
                                <td style="text-align:justify;">Saya tidak akan mengkompromikan tekanan keuangan atau jabatan dan atau kepentingan pribadi dan lainnya dalam melaksanakan dan melaporkan kegiatan audit.<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">9. </td>
                                <td>Saya tidak akan menyalahgunakan sertifikat yang saya dapatkan dari LSP PACER dan tidak akan memberikan pernyataan yang berkaitan dengan sertifikasi yang diberikan sehingga dapat menyesatkan pihak lain dan merugikan LSP PACER<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">10. </td>
                                <td style="text-align:justify;">Saya akan menghentikan penggunaan semua informasi atau sertifikat atau kartu auditor jika sertifikasi saya dibekukan atau dicabut oleh LSP PACER.<br></td>
                            </tr>
                            <tr>
                                <td style="vertical-align:top;">11. </td>
                                <td style="text-align:justify;">Sebagai pemohon atau sertifikan saya mempunyai hak sebagai berikut :<br>
                                    <table>
                                        <tr>
                                            <td style="vertical-align:top;">a. </td>
                                            <td style="text-align:justify;">memperoleh pelayanan yang sama secara adil dan tanpa pembatasan.<br></td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;">b. </td>
                                            <td style="text-align:justify;">Dapat menyampaikan keluhan dan banding atas kebijakan dan keputusan sertifikasi dari LSP PACER<br></td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;">c. </td>
                                            <td style="text-align:justify;">Memperoleh informasi yang jelas tentang persyaratan sertifikasi.<br></td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;">d. </td>
                                            <td style="text-align:justify;">Memperoleh jaminan kerahasiaan yang berkaitan dengan proses sertifikasi.<br></td>
                                        </tr>
                                        <tr>
                                            <td style="vertical-align:top;">e. </td>
                                            <td style="text-align:justify;">Mendapatkan sertifikat dan kartu anggota serta pencantuman identitas sertifikan dalam website PACER<br></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>



                        <p style="text-align:justify;">Saya menyetujui Surat Persetujuan dan Perjanjian Sertifikasi tanpa ada tekanan atau paksaan dari pihak manapun, apabila saya melanggar dari ketentuan ini maka saya bersedia bertanggung jawab sesuai peraturan yang berlaku dan persyaratan sertifikasi dari LSP PACER<br></P>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Tutup</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            let jumlah_sertifikasi = <?= $jumlah_sertifikasi; ?>
        </script>
        <script src="<?= base_url(); ?>/assets/myjs/Pengajuan_sertifikasi.js"></script>
    </div>
    <?= $this->endSection(); ?>
    <!-- akhir form add -->