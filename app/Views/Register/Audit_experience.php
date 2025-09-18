<div class="card-body" id="auditku">
    <div class="after-add-more-audit" id="training1">
        <?php $jumlah_audit = 1 ?>;

        <?php if (count($audits) < 1 && ($status == 0)) { ?>
            <div class="tambahan_<?= $jumlah_audit; ?>">
                <form class="form-horizontal" role="form" method="post" id="FormAudit_<?= $jumlah_audit; ?>" enctype="multipart/form-data" action="<?php echo site_url('Register/add_audit_experience/' . $jumlah_audit) ?>">

                    <?= csrf_field() ?>
                    <div class="alert alert-error" style="display:none;">
                        <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">
                        <input type="hidden" id="id_<?= $jumlah_audit; ?>" name="id_<?= $jumlah_audit; ?>">
                        <input type="hidden" id="doc_audit_<?= $jumlah_audit; ?>" name="doc_audit_<?= $jumlah_audit; ?>">
                        <input type="hidden" id="doc_work_<?= $jumlah_audit; ?>" name="doc_work_<?= $jumlah_audit; ?>">
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Company Name</label>
                            <div class="col-sm-4">
                                <input type="text" name="company_name_<?= $jumlah_audit; ?>" id="company_name_<?= $jumlah_audit; ?>" class="form-control" placeholder="Silahkan isi nama perusahaan">
                            </div>
                            <div class="col-md-6">
                                <span class="btn btn-circle green float-right add-more-audit"><strong><strong> +</strong></strong></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Company Address</label>
                            <div class="col-sm-4">
                                <textarea name="company_addres_<?= $jumlah_audit; ?>" id="company_addres_<?= $jumlah_audit; ?>" class="form-control" placeholder="Silahkan isi alamat perusahaan"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Scope</label>
                            <div class="col-md-6">
                                <?php foreach ($scopes as $scope) : ?>
                                    <input type="checkbox" id="scope_id_<?= $jumlah_audit; ?>" name="scope_id_<?= $jumlah_audit; ?>[]" value="<?php echo $scope['scope_id'] ?>">&nbsp<?php echo $scope['scope_code'] . ' - ' . $scope['scope_description']  ?><br>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Peran</label>
                            <div class="col-md-5" id="peranan_<?= $jumlah_audit; ?>">
                                <select name="role_id_<?= $jumlah_audit; ?>" id="role_id_<?= $jumlah_audit; ?>" class="form-control">
                                    <option value="">Please Select</option>
                                    <?php foreach ($perans as $peran) : ?>
                                        <option value="<?php echo  $peran['role_id'] ?>">&nbsp<?php echo $peran['role_name']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Company Phone</label>
                            <div class="col-sm-4">
                                <input type="text" name="company_phone_<?= $jumlah_audit; ?>" id="company_phone_<?= $jumlah_audit; ?>" class="form-control" placeholder="Silahkan isi nomor telp kantor">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Contact Person</label>
                            <div class="col-sm-4">
                                <input type="text" name="contact_person_<?= $jumlah_audit; ?>" id="contact_person_<?= $jumlah_audit; ?>" class="form-control" placeholder="SIlahkan isi contact person">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="date" name="start_date_audit_experience_<?= $jumlah_audit; ?>" id="start_date_audit_experience_<?= $jumlah_audit; ?>" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="date" name="end_date_audit_experience_<?= $jumlah_audit; ?>" id="end_date_audit_experience_<?= $jumlah_audit; ?>" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Upload Audit Plan & Attendance List</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="file" id="doc_audit_plan_path_<?= $jumlah_audit; ?>" name="doc_audit_plan_path_<?= $jumlah_audit; ?>" accept=".pdf">
                            </div>
                            <div class="com-sm-2">
                                <a id="btn_preview_audit_<?= $jumlah_audit; ?>" name="btn_preview_audit_<?= $jumlah_audit; ?>" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Upload Work Order</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="file" id="doc_work_order_path_<?= $jumlah_audit; ?>" name="doc_work_order_path_<?= $jumlah_audit; ?>" accept=".pdf">
                            </div>
                            <div class="com-sm-2">
                                <a id="btn_preview_work_<?= $jumlah_audit; ?>" name="btn_preview_work_<?= $jumlah_audit; ?>" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                            </div>
                        </div>

                        <div class="form-actions">
                            <div class="form-group row">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-4">
                                    <button class="btn btn-circle blue" id="btn_save_<?= $jumlah_audit; ?>"><i class="fa fa-save"></i> Save</button>
                                    <button class="btn btn-circle yellow" id="btn_edit_<?= $jumlah_audit; ?>" disabled><i class="fa fa-edit"></i> Edit</button>
                                    <button class="btn btn-circle red" id="btn_delete_<?= $jumlah_audit; ?>" disabled><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>

                        <hr>
                    </div>
                </form>
            </div>
            <?php $jumlah_audit++ ?>
        <?php } else { ?>
            <?php foreach ($audits as $audit) : ?>
                <div class="tambahan_<?= $jumlah_audit; ?>">
                    <form class="form-horizontal" role="form" method="post" id="FormAudit_<?= $jumlah_audit; ?>" enctype="multipart/form-data" action="<?php echo site_url('Register/add_audit_experience/' . $jumlah_audit) ?>">
                        <?= csrf_field() ?>
                        <div class="alert alert-error" style="display:none;">
                            <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                            <button class="close" data-dismiss="alert"></button>
                            You have some form errors. Please check below.
                        </div>
                        <div class="form-body">
                            <input type="hidden" id="id_<?= $jumlah_audit; ?>" name="id_<?= $jumlah_audit; ?>" value="<?= $audit['audit_experience_id'] ?>">
                            <input type="hidden" id="doc_audit_<?= $jumlah_audit; ?>" name="doc_audit_<?= $jumlah_audit; ?>" value="<?= $audit['doc_audit_plan_path'] ?>">
                            <input type="hidden" id="doc_work_<?= $jumlah_audit; ?>" name="doc_work_<?= $jumlah_audit; ?>" value="<?= $audit['doc_work_order_path'] ?>">
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Company Name</label>
                                <div class="col-sm-4">
                                    <input type="text" name="company_name_<?= $jumlah_audit; ?>" id="company_name_<?= $jumlah_audit; ?>" class="form-control" placeholder="Silahkan isi nama perusahaan" value="<?= $audit['company_name'] ?>" disabled>
                                </div>
                                <div class="col-md-6">
                                    <span class="btn btn-circle green float-right add-more-audit"><strong><strong> +</strong></strong></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Company Address</label>
                                <div class="col-sm-4">
                                    <textarea name="company_addres_<?= $jumlah_audit; ?>" id="company_addres_<?= $jumlah_audit; ?>" class="form-control" placeholder="Silahkan isi alamat perusahaan" disabled><?= $audit['company_addres'] ?></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-2 control-label ampundah_<?= $jumlah_audit; ?>" style="text-align:right">Scope</label>
                                <div class="col-md-5" id="scopean_<?= $jumlah_audit; ?>">

                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-2 control-label" style="text-align:right">Peran</label>
                                <div class="col-md-4" id="peranan_<?= $jumlah_audit; ?>">
                                    <select name="role_id_<?= $jumlah_audit; ?>" id="role_id_<?= $jumlah_audit; ?>" class="form-control" disabled>
                                        <option value="">Please Select</option>
                                        <?php foreach ($perans as $peran) : ?>
                                            <option value="<?php echo  $peran['role_id'] ?>" <?= ($peran['role_id'] == $audit['role_id']) ? " selected" : ""; ?>>&nbsp<?php echo $peran['role_name']  ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Company Phone</label>
                                <div class="col-sm-4">
                                    <input type="text" name="company_phone_<?= $jumlah_audit; ?>" id="company_phone_<?= $jumlah_audit; ?>" value="<?= $audit['company_phone']; ?>" class="form-control" placeholder="Silahkan isi nomor telp kantor" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Contact Person</label>
                                <div class="col-sm-4">
                                    <input type="text" name="contact_person_<?= $jumlah_audit; ?>" id="contact_person_<?= $jumlah_audit; ?>" value="<?= $audit['contact_person']; ?>" class="form-control" placeholder="SIlahkan isi contact person" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="date" name="start_date_audit_experience_<?= $jumlah_audit; ?>" id="start_date_audit_experience_<?= $jumlah_audit; ?>" value="<?= $audit['start_date']; ?>" class="form-control" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="date" name="end_date_audit_experience_<?= $jumlah_audit; ?>" id="end_date_audit_experience_<?= $jumlah_audit; ?>" value="<?= $audit['end_date']; ?>" class="form-control" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Upload Audit Plan & Attendance List</label>
                                <div class="col-sm-4">
                                    <input class="form-control" type="file" id="doc_audit_plan_path_<?= $jumlah_audit; ?>" name="doc_audit_plan_path_<?= $jumlah_audit; ?>" value="<?= $audit['doc_audit_plan_path']; ?>" accept=".pdf" disabled>
                                </div>
                                <div class="com-sm-2">
                                    <a id="btn_preview_audit_<?= $jumlah_audit; ?>" name="btn_preview_audit_<?= $jumlah_audit; ?>" class="btn btn-primary" href="<?= $audit['doc_audit_plan_path'] == '' || $audit['doc_audit_plan_path'] == null ? 'javascript:' : base_url() . $audit['doc_audit_plan_path']; ?>" target="_blank">Preview</a>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Upload Work Order</label>
                                <div class="col-sm-4">
                                    <input class="form-control" type="file" id="doc_work_order_path_<?= $jumlah_audit; ?>" name="doc_work_order_path_<?= $jumlah_audit; ?>" value="<?= $audit['doc_work_order_path']; ?>" accept=".pdf" disabled>
                                </div>
                                <div class="com-sm-2">
                                    <a id="btn_preview_work_<?= $jumlah_audit; ?>" name="btn_preview_work_<?= $jumlah_audit; ?>" class="btn btn-primary" href="<?= $audit['doc_work_order_path'] == '' || $audit['doc_work_order_path'] == null ? 'javascript:' : base_url() . $audit['doc_work_order_path']; ?>" target="_blank">Preview</a>
                                </div>
                            </div>
                            <div class="form-group row" style="display:none">
                                <label class="col-sm-2 control-label" style="text-align:right">Score</label>
                                <div class="col-sm-4">
                                    <input type="text" name="score_<?= $jumlah_audit; ?>" id="score_<?= $jumlah_audit; ?>" class="form-control" placeholder="Silahkan isi jabatan sekarang/terakhir" value="<?= $audit['score']; ?>" disabled>
                                </div>
                            </div>

                            <?php if ($audit['status'] == '0') { ?>
                                <div class="form-actions">
                                    <div class="form-group row">
                                        <label class="col-md-2 control-label"></label>
                                        <div class="col-md-4">
                                            <button class="btn btn-circle blue" id="btn_save_<?= $jumlah_audit; ?>"><i class="fa fa-save"></i> Save</button>
                                            <button class="btn btn-circle yellow" id="btn_edit_<?= $jumlah_audit; ?>"><i class="fa fa-edit"></i> Edit</button>
                                            <button class="btn btn-circle red" id="btn_delete_<?= $jumlah_audit; ?>"><i class="fa fa-trash"></i> Delete</button>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                            <hr>
                        </div>
                    </form>
                </div>
                <?php $jumlah_audit++ ?>


            <?php endforeach; ?>
            <?php $isi = "ada" ?>
        <?php } ?>
    </div>
    <script>
        var jumlah_audit = <?= $jumlah_audit - 1 ?>;
        var jumlah_peran = <?= count($perans) ?>;
        var jumlah_scaope = <?= count($scopes) ?>;
    </script>
</div>