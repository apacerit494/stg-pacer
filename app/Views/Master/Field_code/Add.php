<div class="card card-info" id="add" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">ADD FIELD CODE</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('FieldCode/add_field_code') ?>">

            <?= csrf_field() ?>
            <div class="alert alert-error" style="display:none;">
                <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->

                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Field Code</label>
                    <div class="col-sm-3">
                        <input type="text" name="fieldcode_code" id="fieldcode_code" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Description</label>
                    <div class="col-sm-3">
                        <input type="text" name="fieldcode_description" id="fieldcode_description" class="form-control">
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