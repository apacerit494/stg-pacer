<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">ASSESMENT</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Scoring/edit_scoring') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="jumlah_scope" name="jumlah_scope">
            <input type="hidden" id="jumlah_fieldcode_0" name="jumlah_fieldcode_0" value="0">
            <input type="hidden" id="jumlah_fieldcode_1" name="jumlah_fieldcode_1" value="0">
            <input type="hidden" id="jumlah_fieldcode_2" name="jumlah_fieldcode_2" value="0">
            <input type="hidden" id="jumlah_fieldcode_3" name="jumlah_fieldcode_3" value="0">
            <input type="hidden" id="jumlah_fieldcode_4" name="jumlah_fieldcode_4" value="0">

            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Education Score</label>
                            <div class="col-sm-4">
                                <input type="text" name="education_score" id="education_score" class="form-control" style="text-align:right" maxlength="3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Training Score</label>
                            <div class="col-sm-4">
                                <input type="text" name="training_score" id="training_score" class="form-control" style="text-align:right" maxlength="3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Audit Experience Score</label>
                            <div class="col-sm-4">
                                <input type="text" name="audit_experience_score" id="audit_experience_score" class="form-control" style="text-align:right" maxlength="3">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Experience Score</label>
                            <div class="col-sm-4">
                                <input type="text" name="experience_score" id="experience_score" class="form-control" style="text-align:right" maxlength="3">
                            </div>
                        </div>
                        <div class="penguji" style="display:none">
                            <div class="form-group row">
                                <label class="col-sm-4 control-label" style="text-align:right">Write Exam Score</label>
                                <div class="col-sm-4">
                                    <input type="text" name="written_exam_score" id="written_exam_score" class="form-control" style="text-align:right" maxlength="3">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-8">
                                    <input class="form-control" type="file" id="written_exam_path" name="written_exam_path" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps">
                                </div>
                                <div class="com-sm-4">
                                    <a id="btn_preview_written" name="btn_preview_written" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 control-label" style="text-align:right">Practical Exam Score</label>
                                <div class="col-sm-4">
                                    <input type="text" name="pratical_exam_score" id="pratical_exam_score" class="form-control" style="text-align:right" maxlength="3">
                                </div>
                               
                            </div>
                            <div class="form-group row">
                                 <div class="col-sm-8">
                                    <input class="form-control" type="file" id="practical_exam_path" name="practical_exam_path" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps">
                                </div>
                                <div class="com-sm-4">
                                    <a id="btn_preview_practical" name="btn_preview_practical" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-4 control-label" style="text-align:right">Observation Score</label>
                                <div class="col-sm-4">
                                    <input type="text" name="observation_score" id="observation_score" class="form-control" style="text-align:right" maxlength="3">
                                </div>
                            </div>
                            <div class="form-group row">
                                 <div class="col-sm-8">
                                    <input class="form-control" type="file" id="observation_path" name="observation_path" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps">
                                </div>
                                <div class="com-sm-4">
                                    <a id="btn_preview_observation" name="btn_preview_observation" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Total Score</label>
                            <div class="col-sm-4">
                                <input type="text" name="total_score" id="total_score" class="form-control" style="text-align:right; background-color:lightgreen" maxlength="3" readonly>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right" id="label_scope"></label>
                            <div class="col-sm-4">
                                <select name="scope_score" id="scope_score" class="form-control">
                                    <option value="Y">OK</option>
                                    <option value="T">NOT OK</option>
                                </select>
                            </div>
                        </div>
                        <div class="scope">

                        </div>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Auditor Level</label>
                            <div class="col-sm-6">
                                <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor" name="level_auditor">
                                    <option value="">Please Select</option>
                                    <?php foreach ($level_auditors as $level_auditor) : ?>
                                        <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <?php if (user()->user_type_id == '1' || user()->user_type_id == '2') { ?>
                            <div class="form-group row">
                                <label class="col-sm-4 control-label" style="text-align:right">Commitee Score</label>
                                <div class="col-sm-4">
                                    <input type="text" name="committee_score" id="committee_score" class="form-control" style="text-align:right">
                                </div>
                            </div>
                        <?php } ?>
                        <div class="form-group row">
                            <label class="col-sm-4 control-label" style="text-align:right">Note</label>
                            <div class="col-sm-6">
                                <textarea name="note" id="note" class="form-control"></textarea>
                            </div>
                        </div>
                        <hr>
                        <div class="form-actions">
                            <div class="form-group row">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-6">
                                    <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                                    <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h1>Skema Nilai</h1>
                        <br>
                        <img src="<?= base_url() ?>/assets/images/Skema Nilai.png" style="width:98%">
                    </div>
                </div>


                <hr>




                <!-- End of Data  -->
            </div>
        </form>
    </div>
    <!-- END BODY -->
    
        
</div>
<!-- akhir form edit -->