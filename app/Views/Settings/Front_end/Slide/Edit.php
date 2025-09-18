<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">EDIT SLIDE</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Settings/edit_slide_front_end') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="text_preview" name="text_preview">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->

                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Slide Title</label>
                    <div class="col-md-4">
                        <input class="form-control" type="text" id="slide_title" name="slide_title" maxlength="50">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Picture</label>
                    <div class="col-md-4">
                        <input type="file" id="picture_path" name="picture_path" class="form-control" accept=".png,.pdf,.jpg,.jpeg">
                    </div>
                    <div class="com-sm-2">
                        <a id="btn_preview2" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Slide Label</label>
                    <div class="col-md-8">
                        <textarea class="form-control" id="slide_label" name="slide_label" maxlength="255"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Show</label>
                    <div class="col-md-4">
                        <select id="showed" name="showed" class="form-control">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>



                <hr>
                <div class="form-actions">
                    <div class="form-group row">
                        <label class="col-md-2 control-label"></label>
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

</div>
<!-- akhir form edit -->