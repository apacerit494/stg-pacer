<!-- form ADD -->

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<div class="card card-info" id="add" style="display: none;">

    <div class="card-header">
        <h3 class="card-title">PENGAJUAN SERTIFIKASI</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->
    <div class="card-body">

        <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('/Certification/add_certification') ?>">

            <?= csrf_field() ?>
            <div class="alert alert-error" style="display:none;">
                <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->

                <input type="hidden" id="id" name="id">
                <input type="hidden" id="status" name="status" value="0">
                <div class="card  ">
                    <div class="card-body">
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Certification Number</label>
                            <div class="col-sm-4">
                                <input type="text" name="certification_number" id="certification_number" class="form-control" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Certificant</label>
                            <div class="col-md-4">
                                <select class="form-control single-select" data-placeholder="Silahkan pilih Certificant" id="user_id" name="user_id">
                                    <option value="">Please Select</option>
                                    <?php foreach ($users as $user) : ?>
                                        <option value="<?php echo $user['id'] ?>"><?php echo $user['full_name']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Scope</label>
                            <div class="col-md-4">
                                <select name="scope_id" id="scope_id" class="form-control">
                                    <option value="">Please Select</option>
                                    <?php foreach ($scopes as $scope) : ?>
                                        <option value="<?= $scope['scope_id']; ?>"><?= $scope['scope_code'] . ' - ' . $scope['scope_description']; ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Field Code</label>
                            <div class="col-md-4">
                                <select class="multiple-select" data-placeholder="Silahkan pilih kode bidang" multiple="multiple" id="field_code_id" name="field_code_id[]">

                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Certification Type</label>
                            <div class="col-md-4" id="certification_type">
                                <select name="certification_type_id" id="certification_type_id" class="form-control">
                                    <option value="">Please Select</option>
                                    <?php foreach ($certification_types as $type) : ?>
                                        <option value="<?= $type['certification_type_id']; ?>"><?= $type['description']; ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Cost</label>
                            <div class="col-sm-4">
                                <input type="text" name="cost" id="cost" class="form-control decimal" style="text-align:right" disabled>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Auditor Level</label>
                            <div class="col-md-4">
                                <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor" name="level_auditor">
                                    <option value="">Please Select</option>
                                    <?php foreach ($level_auditors as $level_auditor) : ?>
                                        <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="form-actions">
                            <div class="form-group row">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-8">
                                    <button type="button" class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Submit</button>
                                    <button class="btn btn-circle green" id="btn_draft"><i class="fa fa-save"></i> Save as Draft</button>
                                    <button type="button" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- End of Data  -->
            </div>

        </form>


    </div>
    <!-- /.card-body -->

    <!-- /.card-footer -->

</div>


<!-- akhir form add -->