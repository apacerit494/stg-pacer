<!-- form ADD -->


<div class="page-content">
    <div class="container">
        <div class="card card-info" id="edit" style="display: none;">
            <div class="card-header">
                <h3 class="card-title">EDIT PENGAJUAN SERTIFIKASI</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <div class="card-body">
                <nav class="w-100">
                    <div class="nav nav-tabs" id="product-tab" role="tablist">
                        <a class="nav-item nav-link active" id="Pengajuan-Sertifikasi-tab" data-toggle="tab" href="#Pengajuan-Sertifikasi" role="tab" aria-controls="Pengajuan-Sertifikasi" aria-selected="true">Pengajuan Sertifikasi</a>
                        <a class="nav-item nav-link" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="false">Comments</a>
                    </div>
                </nav>
                <div class="tab-content p-3" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="Pengajuan-Sertifikasi" role="tabpanel" aria-labelledby="Pengajuan-Sertifikasi-tab">
                        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('/Certification/edit_certification') ?>">
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
                                <input type="hidden" id="full_name" name="full_name" value="<?= $full_name; ?>">
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
                                                <select class="form-control single-select" data-placeholder="Silahkan pilih Certificant" id="user_id2" name="user_id2">
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
                                                <select class="multiple-select" data-placeholder="Silahkan pilih kode bidang" multiple="multiple" id="field_code_id2" name="field_code_id2[]">

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
                                                <input type="text" name="cost" id="cost" class="form-control" style="text-align:right" disabled>
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
                                <div class="card  col-sm-12">
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
                    <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                        <div class="card card-primary card-outline direct-chat direct-chat-primary">
                            <form class="form-horizontal" role="form" method="post" id="FormComment" action="<?php echo site_url('/Certification/add_comment') ?>">
                                <input type="hidden" id="certification_id" name="certification_id">
                                <div class="card-body">
                                    <div class="direct-chat-messages">
                                        <div class="tambahan">
                                        </div>
                                    </div>
                                </div>
                                <!-- /.card-body -->
                                <div class="card-footer">
                                    <div class="input-group">
                                        <input type="text" id="comment" name="comment" placeholder="Type Message ..." class="form-control">
                                        <span class="input-group-append">
                                            <button type="submit" class="btn btn-primary">Send</button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <!-- /.card-footer-->
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.card-body -->
            <!-- /.card-footer -->
        </div>
    </div>
</div>
<!-- akhir form add -->