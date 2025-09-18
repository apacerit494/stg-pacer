<div class="card-body" id="trainingku">
    <div class="after-add-more-training" id="training1">
        <?php $jumlah_training = 1; ?>
        <?php if (count($trainings) < 1 && ($status == 0)) { ?>
            <div class="tambahan_<?= $jumlah_training; ?>">
                <form class="form-horizontal" role="form" method="post" id="FormTraining_<?= $jumlah_training; ?>" enctype="multipart/form-data" action="<?php echo site_url('Register/add_training/' . $jumlah_training) ?>">
                    <?= csrf_field() ?>
                    <div class="alert alert-error" style="display:none;">
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">

                        <input type="hidden" id="id_<?= $jumlah_training; ?>" name="id_<?= $jumlah_training; ?>">
                        <input type="hidden" id="text_doc_path_training_<?= $jumlah_training; ?>" name="text_doc_path_training_<?= $jumlah_training; ?>">
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Provider Name</label>
                            <div class="col-sm-4">
                                <input type="text" name="provider_name_<?= $jumlah_training; ?>" id="provider_name_<?= $jumlah_training; ?>" class="form-control" placeholder="Silahkan isi nama penyedia training">
                            </div>
                            <div class="col-md-6">
                                <span class="btn btn-circle green float-right add-more-training"><strong><strong> +</strong></strong></span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="date" name="start_date_training_<?= $jumlah_training; ?>" id="start_date_training_<?= $jumlah_training; ?>" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                            <div class="col-sm-4">
                                <div class="input-group">
                                    <input type="date" name="end_date_training_<?= $jumlah_training; ?>" id="end_date_training_<?= $jumlah_training; ?>" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Training Topic</label>
                            <div class="col-sm-4">
                                <textarea name="training_topic_<?= $jumlah_training; ?>" id="training_topic_<?= $jumlah_training; ?>" class="form-control" placeholder="Silahkan isi topik training"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Relation Status</label>
                            <div class="col-md-4">
                                <select class="form-control" id="relation_status_<?= $jumlah_training; ?>" name="relation_status_<?= $jumlah_training; ?>">
                                    <option value="">Please Select</option>
                                    <?php foreach ($relation_statuss as $relation_status) : ?>
                                        <option value="<?php echo $relation_status['code_value'] ?>"><?php echo $relation_status['code_description']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 control-label" style="text-align:right">Upload Certificate</label>
                            <div class="col-sm-4">
                                <input class="form-control" type="file" id="doc_path_training_<?= $jumlah_training; ?>" name="doc_path_training_<?= $jumlah_training; ?>" accept="application/pdf,image/*">
                            </div>
                            <div class="com-sm-2">
                                <a id="btn_preview_<?= $jumlah_training; ?>" name="btn_preview_<?= $jumlah_training; ?>" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                            </div>
                        </div>

                        <hr>
                        <div class="form-actions">
                            <div class="form-group row">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-4">
                                    <button class="btn btn-circle blue" id="btn_save_<?= $jumlah_training; ?>"><i class="fa fa-save"></i> Save</button>
                                    <button class="btn btn-circle yellow" type="button" id="btn_edit_<?= $jumlah_training; ?>" disabled><i class="fa fa-edit"></i> Edit</button>
                                    <button class="btn btn-circle red" type="button" id="btn_delete_<?= $jumlah_training; ?>" disabled><i class="fa fa-trash"></i> Delete</button>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
                </form>
            </div>
            <?php $jumlah_training++ ?>
        <?php } else { ?>
            <?php foreach ($trainings as $training) : ?>
                <div class="tambahan_<?= $jumlah_training; ?>">
                    <form class="form-horizontal" role="form" method="post" id="FormTraining_<?= $jumlah_training; ?>" enctype="multipart/form-data" action="<?php echo site_url('Register/add_training/' . $jumlah_training) ?>">
                        <?= csrf_field() ?>
                        <div class="alert alert-error" style="display:none;">
                            <button class="close" data-dismiss="alert"></button>
                            You have some form errors. Please check below.
                        </div>
                        <div class="form-body">

                            <input type="hidden" id="id_<?= $jumlah_training; ?>" name="id_<?= $jumlah_training; ?>" value="<?= $training['training_id']; ?>">
                            <input type="hidden" id="text_doc_path_training_<?= $jumlah_training; ?>" name="text_doc_path_training_<?= $jumlah_training; ?>" value="<?= $training['doc_path']; ?>">
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Provider Name</label>
                                <div class="col-sm-4">
                                    <input type="text" name="provider_name_<?= $jumlah_training; ?>" id="provider_name_<?= $jumlah_training; ?>" value="<?= $training['provider_name']; ?>" class="form-control" placeholder="Silahkan isi nama penyedia training" disabled>
                                </div>
                                <div class="col-md-6">
                                    <span class="btn btn-circle green float-right add-more-training"><strong><strong> +</strong></strong></span>';
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="date" name="start_date_training_<?= $jumlah_training; ?>" id="start_date_training_<?= $jumlah_training; ?>" value="<?= $training['start_date']; ?>" class="form-control" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <input type="date" name="end_date_training_<?= $jumlah_training; ?>" id="end_date_training_<?= $jumlah_training; ?>" value="<?= $training['end_date']; ?>" class="form-control" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Training Topic</label>
                                <div class="col-sm-4">
                                    <textarea name="training_topic_<?= $jumlah_training; ?>" id="training_topic_<?= $jumlah_training; ?>" class="form-control" placeholder="Silahkan isi topik training" disabled><?= $training['training_topic']; ?></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-2 control-label" style="text-align:right">Relation Status</label>
                                <div class="col-md-4">
                                    <select class="form-control" id="relation_status_<?= $jumlah_training; ?>" name="relation_status_<?= $jumlah_training; ?>" disabled>
                                        <option value="">Please Select</option>
                                        <?php foreach ($relation_statuss as $relation_status) : ?>
                                            <option value="<?php echo $relation_status['code_value'] ?>" <?= ($relation_status['code_value'] == $training['relation_status']) ? " selected" : "" ?>><?php echo $relation_status['code_description']  ?></option>

                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 control-label" style="text-align:right">Upload Certificate</label>
                                <div class="col-sm-4">
                                    <input class="form-control" type="file" id="doc_path_training_<?= $jumlah_training; ?>" name="doc_path_training_<?= $jumlah_training; ?>" accept="application/pdf,image/*" value="<?= $training['doc_path']; ?>" disabled>
                                </div>
                                <div class="com-sm-2">
                                    <a id="btn_preview_<?= $jumlah_training; ?>" name="btn_preview_<?= $jumlah_training; ?>" class="btn btn-primary" href="<?= $training['doc_path'] == '' || $training['doc_path'] == null ? 'javascript:' : base_url() . $training['doc_path'] ?>" target="_blank">Preview</a>
                                </div>
                            </div>

                            <div class="form-group row" style="display:none">
                                <label class="col-sm-2 control-label" style="text-align:right">Score</label>
                                <div class="col-sm-4">
                                    <input type="text" name="score_<?= $jumlah_training; ?>" id="score_<?= $jumlah_training; ?>" class="form-control" placeholder="Silahkan isi jabatan sekarang/terakhir" value="<?= $training['score']; ?>" disabled>
                                </div>
                            </div>
                            <hr>

                            <?php if ($training['status'] == '0') { ?>
                                <div class="form-actions">
                                    <div class="form-group row">
                                        <label class="col-md-2 control-label"></label>
                                        <div class="col-md-4">
                                            <button class="btn btn-circle blue" id="btn_save_<?= $jumlah_training; ?>" disabled><i class="fa fa-save"></i> Save</button>
                                            <button class="btn btn-circle yellow" type="button" id="btn_edit_<?= $jumlah_training; ?>"><i class="fa fa-edit"></i> Edit</button>
                                            <button class="btn btn-circle red" type="button" id="btn_delete_<?= $jumlah_training; ?>"><i class="fa fa-trash"></i> Delete</button>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                            <hr>
                        </div>
                    </form>
                </div>
                <?php $jumlah_training++ ?>
            <?php endforeach; ?>
        <?php } ?>
    </div>
    <script>
        var jumlah_training = <?= $jumlah_training - 1; ?>
    </script>
</div>