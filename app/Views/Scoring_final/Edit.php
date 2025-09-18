<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title"></h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('ScoringFinal/edit_scoring_final') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="committee_id1" name="committee_id1">
            <input type="hidden" id="committee_id2" name="committee_id2">
            <input type="hidden" id="committee_id3" name="committee_id3">
            <input type="hidden" id="jumlah_scope" name="jumlah_scope">
            <input type="hidden" id="jumlah_fieldcode_0" name="jumlah_fieldcode_0">
            <input type="hidden" id="jumlah_fieldcode_1" name="jumlah_fieldcode_1">
            <input type="hidden" id="jumlah_fieldcode_2" name="jumlah_fieldcode_2">
            <input type="hidden" id="jumlah_fieldcode_3" name="jumlah_fieldcode_3">
            <input type="hidden" id="jumlah_fieldcode_4" name="jumlah_fieldcode_4">


            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:center">Jenis Penilaian</label>
                    <label class="col-sm-2 control-label" style="text-align:center" id="label1">Committee 1</label>
                    <label class="col-sm-2 control-label" style="text-align:center" id="label2">Committee 2</label>
                    <label class="col-sm-2 control-label" style="text-align:center" id="label3">Committee Certification</label>
                    <div class="col-sm-2">
                        <button id="btn_scheme" name="btn_scheme" class="btn btn-success" >Show Scheme</button>
                    </div>
                
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Education Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="education_score1" id="education_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="education_score2" id="education_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="education_score3" id="education_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                    <label class="col-sm-2 control-label" style="text-align:left" id="label_education"></label>
                    
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Training Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="training_score1" id="training_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="training_score2" id="training_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="training_score3" id="training_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                    <label class="col-sm-2 control-label" style="text-align:left" id="label_training"></label>

                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Audit Experience Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="audit_experience_score1" id="audit_experience_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="audit_experience_score2" id="audit_experience_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="audit_experience_score3" id="audit_experience_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                    <label class="col-sm-2 control-label" style="text-align:left" id="label_audit"></label>

                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Experience Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="experience_score1" id="experience_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="experience_score2" id="experience_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="experience_score3" id="experience_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                    <label class="col-sm-2 control-label" style="text-align:left" id="label_experience"></label>

                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Write Exam Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="written_exam_score1" id="written_exam_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="written_exam_score2" id="written_exam_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="written_exam_score3" id="written_exam_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                    <label class="col-sm-2 control-label" style="text-align:left" id="label_written"></label>

                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right"></label>
                    <div class="col-sm-2">
                        <a id="btn_preview_written1" name="btn_preview_written1" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                    <div class="col-sm-2">
                        <a id="btn_preview_written2" name="btn_preview_written2" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                    <div class="col-sm-2">
                        <input class="form-control" type="file" id="written_exam_path3" name="written_exam_path3" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps">
                    </div>
                    <a id="btn_preview_written3" name="btn_preview_written3" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Practical Exam Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="pratical_exam_score1" id="pratical_exam_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="pratical_exam_score2" id="pratical_exam_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="pratical_exam_score3" id="pratical_exam_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                    <label class="col-sm-2 control-label" style="text-align:left" id="label_practical"></label>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right"></label>
                    <div class="col-sm-2">
                        <a id="btn_preview_practical1" name="btn_preview_practical1" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                    <div class="col-sm-2">
                        <a id="btn_preview_practical2" name="btn_preview_practical2" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                    <div class="col-sm-2">
                        <input class="form-control" type="file" id="practical_exam_path3" name="practical_exam_path3" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps">
                    </div>
                        <a id="btn_preview_practical3" name="btn_preview_practical3" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                 </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Observation Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="observation_score1" id="observation_score1" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="observation_score2" id="observation_score2" class="form-control" style="text-align:right" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="observation_score3" id="observation_score3" class="form-control" style="text-align:right" maxlength="3">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right"></label>
                    <div class="col-sm-2">
                        <a id="btn_preview_observation1" name="btn_preview_observation1" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                    <div class="col-sm-2">
                        <a id="btn_preview_observation2" name="btn_preview_observation2" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                    <div class="col-sm-2">
                        <input class="form-control" type="file" id="observation_path3" name="observation_path3" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps">
                    </div>
                        <a id="btn_preview_observation3" name="btn_preview_observation3" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                 </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Total Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="total_score1" id="total_score1" class="form-control" style="text-align:right; background-color:lightgreen" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="total_score2" id="total_score2" class="form-control" style="text-align:right; background-color:lightgreen" readonly>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="total_score3" id="total_score3" class="form-control" style="text-align:right; background-color:lightgreen" readonly maxlength="3">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right" id="label_scope"></label>
                    <div class="col-sm-2">
                        <select name="scope_score1" id="scope_score1" class="form-control" disabled>
                            <option value="Y">OK</option>
                            <option value="T">NOT OK</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <select name="scope_score2" id="scope_score2" class="form-control" disabled>
                            <option value="Y">OK</option>
                            <option value="T">NOT OK</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <select name="scope_score3" id="scope_score3" class="form-control">
                            <option value="Y">OK</option>
                            <option value="T">NOT OK</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Auditor Level</label>
                    <div class="col-sm-2">
                        <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor1" name="level_auditor1" disabled>
                            <option value="">Please Select</option>
                            <?php foreach ($level_auditors as $level_auditor) : ?>
                                <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor2" name="level_auditor2" disabled>
                            <option value="">Please Select</option>
                            <?php foreach ($level_auditors as $level_auditor) : ?>
                                <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <select class="form-control" data-placeholder="Silahkan pilih level auditor " id="level_auditor3" name="level_auditor3">
                            <option value="">Please Select</option>
                            <?php foreach ($level_auditors as $level_auditor) : ?>
                                <option value="<?php echo $level_auditor['code_value'] ?>"><?php echo $level_auditor['code_description']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>

            <!-- <div class="fieldcode"> -->
            <div class="card">
                <div class="card-body fieldcode">

                </div>
            </div>
            <!-- </div> -->

            <div class="form-group row">
                <label class="col-sm-3 control-label" style="text-align:right">Note</label>
                <div class="col-sm-2">
                    <textarea name="note1" id="note1" class="form-control" disabled></textarea>
                </div>
                <div class="col-sm-2">
                    <textarea name="note2" id="note2" class="form-control" disabled></textarea>
                </div>
                <div class="col-sm-2">
                    <textarea name="note3" id="note3" class="form-control"></textarea>
                </div>
            </div>
            <?php if (session('user_type_id') == '1' || session('user_type_id') == '2') { ?>
                <div class="form-group row">
                    <label class="col-sm-3 control-label" style="text-align:right">Commitee Score</label>
                    <div class="col-sm-2">
                        <input type="text" name="committee_score1" id="committee_score1" class="form-control" style="text-align:right">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="committee_score2" id="committee_score2" class="form-control" style="text-align:right">
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="committee_score3" id="committee_score3" class="form-control" style="text-align:right" maxlength="2">
                    </div>
                </div>
            <?php } ?>
            <hr>
            <div class="form-actions">
                <div class="form-group row">
                    <label class="col-md-3 control-label"></label>
                    <div class="col-md-4">
                        <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                        <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button>
                    </div>
                </div>
            </div>



            <!-- End of Data  -->
    </div>
    </form>
</div>
<!-- END BODY -->

    <div class="modal fade" id="modal_scheme" role="dialog" aria-hidden="true">
            <div class="modal-dialog" style="width:1200px;">
                <div class="modal-content">

                    <div class="modal-body">

                        <div class="card card-info">

                            <div class="card-header">
                                <h3 class="card-title">SKEMA NILAI</h3>
                            </div>
                            <img src="<?= base_url() ?>/assets/images/Skema Nilai.png" style="width:100%">
                        </div>
                    </div>

                </div>

            </div>
        </div>

</div>
<!-- akhir form edit -->