<div class="card card-info" id="add" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">ADD SCHEME & ANNEX</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormAdd" enctype="multipart/form-data" action="<?php echo site_url('DownloadBerkas/add_skema_sertifikasi') ?>">

            <?= csrf_field() ?>
            <div class="alert alert-error" style="display:none;">
                <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <br>
                <input type="hidden" name="id" id="id" class="form-control">
                <input type="hidden" name="text_path" id="text_path" class="form-control">
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Description</label>
                    <div class="col-sm-5">
                        <input type="text" name="description" id="description" class="form-control" maxlength="100">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Document</label>
                    <div class="col-sm-4">
                        <input type="file" name="path" id="path" class="form-control" accept=".jpg,.png,.jpeg,.pdf">
                    </div>
                    <div class="com-sm-2">
                        <a id="btn_preview" class="btn btn-primary" target="_blank">Preview</a>
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
    <!-- /.card-body -->

    <!-- /.card-footer -->

</div>
<!-- /.card -->