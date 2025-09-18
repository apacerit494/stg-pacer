<div class="card-body" id="educationku">
    <div class="after-add-more-education" id="education1">
        <?php $jumlah_education = 1; ?>
        <?php if (count($educations) < 1 && ($status == 0)) { ?>

            <div class="tambahan_<?= $jumlah_education; ?>">
                <form class="form-horizontal" role="form" method="post" id="FormEducation_1" enctype="multipart/form-data" action="<?php echo site_url('Register/add_education/1') ?>">
                    <?= csrf_field() ?>
                    <div class="alert alert-error" style="display:none;">
                        <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">
                        <input type="hidden" id="id_1" name="id_1">
                        <input type="hidden" id="text_doc_path_education_1" name="text_doc_path_education_1">
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Level</label>
                            <div class="col-md-3">
                                <select class="form-control" data-placeholder="Silahkan pilih Level" id="level_1" name="level_1">
                                    <option value="">Please Select</option>
                                    <?php foreach ($levels as $level) : ?>
                                        <option value="<?php echo $level['code_value'] ?>"><?php echo $level['code_description']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <label class="col-sm-2 control-label" style="text-align:right">University</label>
                            <div class="col-sm-3">
                                <input type="text" name="university_1" id="university_1" class="form-control" placeholder="Silahkan isi nama kampus">
                            </div>
                            <div class="col-md-2">
                                <span class="btn btn-circle green float-right add-more-education"><strong><strong> +</strong></strong></span>';
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Major</label>
                            <div class="col-sm-3">
                                <input type="text" name="major_1" id="major_1" class="form-control" placeholder="Silahkan isi nama jurusan kuliah">
                            </div>
                            <label class="col-sm-2 control-label" style="text-align:right">Certificate Number</label>
                            <div class="col-sm-3">
                                <input type="text" name="certificate_number_1" id="certificate_number_1" class="form-control" placeholder="Silahkan isi nomor ijazah">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="date" name="start_date_education_1" id="start_date_education_1" class="form-control" placeholder="Silahkan isi tanggal masuk kuliah">
                                </div>
                            </div>
                            <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                            <div class="col-sm-3">
                                <div class="input-group">
                                    <input type="date" name="end_date_education_1" id="end_date_education_1" class="form-control" placeholder="Silahkan isi tanggal lulus kuliah">
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Acreditation Status</label>
                            <div class="col-md-3">
                                <select class="form-control" id="accreditation_status_1" name="accreditation_status_1" placeholder="Silahkan pilih status akreditasi jurusan">
                                    <option value="">Please Select</option>
                                    <?php foreach ($accreditation_statuss as $accreditation_status) : ?>
                                        <option value="<?php echo $accreditation_status['code_value'] ?>"><?php echo $accreditation_status['code_description']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <label class="col-sm-2 control-label" style="text-align:right">Upload Certificate</label>
                            <div class="col-sm-3">
                                <input class="form-control" type="file" id="doc_path_education_<?= $jumlah_education; ?>" accept="application/pdf,image/*" name="doc_path_education_<?= $jumlah_education; ?>" placeholder="Silahkan upload ijazah">
                            </div>
                            <div class="com-sm-2">
                                <a id="btn_preview_<?= $jumlah_education; ?>" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="form-group row">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-4">
                                    <button class="btn btn-circle blue" id="btn_save_1"><i class="fa fa-save"></i> Save</button>
                                    <button class="btn btn-circle yellow" type="button" id="btn_edit_1" disabled><i class="fa fa-edit"></i> Edit</button>
                                    <button class="btn btn-circle red" type="button" id="btn_delete_1" disabled><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </form>
            </div>
            <?php $jumlah_education++; ?>
        <?php } else { ?>
            <?php foreach ($educations as $education) : ?>
                <div class="tambahan_<?= $jumlah_education; ?>">
                    <form class="form-horizontal" role="form" method="post" id="FormEducation_<?= $jumlah_education; ?>" enctype="multipart/form-data" action="<?php echo site_url("Register/add_education/$jumlah_education") ?>">
                        <?= csrf_field() ?>
                        <div class="alert alert-error" style="display:none;">
                            <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                            <button class="close" data-dismiss="alert"></button>
                            You have some form errors. Please check below.
                        </div>
                        <div class="form-body">
                            <input type="hidden" id="id_<?= $jumlah_education; ?>" name="id_<?= $jumlah_education; ?>" value="<?= $education['education_id']; ?>">
                            <input type="hidden" id="text_doc_path_education_<?= $jumlah_education; ?>" name="text_doc_path_education_<?= $jumlah_education; ?>" value="<?= $education['doc_path']; ?>">
                            <div class="form-group row">
                                <label class="col-md-2 control-label" style="text-align:right">Level</label>
                                <div class="col-md-3">
                                    <select class="form-control" data-placeholder="Silahkan pilih Level" id="level_<?= $jumlah_education; ?>" name="level_<?= $jumlah_education; ?>" disabled>
                                        <option value="">Please Select</option>
                                        <?php foreach ($levels as $level) : ?>
                                            <option value="<?php echo $level['code_value'] ?>" <?= ($education['level'] == $level['code_value']) ? " selected" : "" ?>><?php echo $level['code_description']  ?> </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <label class="col-sm-2 control-label" style="text-align:right">University</label>
                                <div class="col-sm-3">
                                    <input type="text" name="university_<?= $jumlah_education; ?>" id="university_<?= $jumlah_education; ?>" class="form-control" value="<?= $education['university']; ?>" disabled placeholder="Silahkan isi nama kampus">
                                </div>
                                <div class="col-md-2">
                                    <span class="btn btn-circle green float-right add-more-education"><strong><strong> +</strong></strong></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Major</label>
                                <div class="col-sm-3">
                                    <input type="text" name="major_<?= $jumlah_education; ?>" id="major_<?= $jumlah_education; ?>" value="<?= $education['major']; ?>" class="form-control" placeholder="Silahkan isi nama jurusan kuliah" disabled>
                                </div>
                                <label class="col-sm-2 control-label" style="text-align:right">Certificate Number</label>
                                <div class="col-sm-3">
                                    <input type="text" name="certificate_number_<?= $jumlah_education; ?>" id="certificate_number_<?= $jumlah_education; ?>" value="<?= $education['certificate_number']; ?>" class="form-control" placeholder="Silahkan isi nomor ijazah" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="date" name="start_date_education_<?= $jumlah_education; ?>" id="start_date_education_<?= $jumlah_education; ?>" value="<?= $education['start_date']; ?>" class="form-control" placeholder="Silahkan isi tanggal masuk kuliah" disabled>
                                    </div>
                                </div>
                                <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input type="date" name="end_date_education_<?= $jumlah_education; ?>" id="end_date_education_<?= $jumlah_education; ?>" value="<?= $education['end_date']; ?>" class="form-control" placeholder="Silahkan isi tanggal lulus kuliah" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-2 control-label" style="text-align:right">Acreditation Status</label>
                                <div class="col-md-3">
                                    <select class="form-control" id="accreditation_status_<?= $jumlah_education; ?>" name="accreditation_status_<?= $jumlah_education; ?>" placeholder="Silahkan pilih status akreditasi jurusan" disabled>
                                        <option value="">Please Select</option>
                                        <?php foreach ($accreditation_statuss as $accreditation_status) : ?>
                                            <option value="<?php echo $accreditation_status['code_value'] ?>" <?= ($education['accreditation_status'] == $accreditation_status['code_value'] ? " selected" : ""); ?>><?php echo $accreditation_status['code_description']  ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <label class="col-sm-2 control-label" style="text-align:right">Upload Certificate</label>
                                <div class="col-sm-3">
                                    <input class="form-control" type="file" id="doc_path_education_<?= $jumlah_education; ?>" accept="application/pdf,image/*" name="doc_path_education_<?= $jumlah_education; ?>" placeholder="Silahkan upload ijazah" disabled>
                                </div>

                                <div class="com-sm-2">
                                    <a id="btn_preview_<?= $jumlah_education; ?>" class="btn btn-primary" href="<?= $education['doc_path'] == '' || $education['doc_path'] == null ? 'javascript:' : base_url() . $education['doc_path'] ?>" target="_blank">Preview</a>
                                </div>
                            </div>
                            <div class="form-group row" style="display:none">
                                <label class="col-sm-2 control-label" style="text-align:right">Score</label>
                                <div class="col-sm-3">
                                    <input type="text" name="score_<?= $jumlah_education; ?>" id="score_<?= $jumlah_education; ?>" class="form-control" placeholder="Silahkan isi jabatan sekarang/terakhir" value="<?= $education['score']; ?>" disabled>
                                </div>
                            </div>
                            <hr>

                            <?php if ($education['status'] == '0') { ?>
                                <div class="form-actions">
                                    <div class="form-group row">
                                        <label class="col-md-2 control-label"></label>
                                        <div class="col-md-4">
                                            <button class="btn btn-circle blue" id="btn_save_<?= $jumlah_education; ?>" disabled><i class="fa fa-save"></i> Save</button>
                                            <button class="btn btn-circle yellow" type="button" id="btn_edit_<?= $jumlah_education; ?>"><i class="fa fa-edit"></i> Edit</button>
                                            <button class="btn btn-circle red" type="button" id="btn_delete_<?= $jumlah_education; ?>"><i class="fa fa-trash"></i> Delete</button>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                            <hr>
                        </div>
                    </form>
                </div>
                <?php $jumlah_education++; ?>
            <?php endforeach; ?>
        <?php } ?>
    </div>
    <script>
        var jumlah_education = <?= $jumlah_education - 1; ?>;
    </script>
</div>