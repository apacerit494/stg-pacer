<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">Edit Certification Type</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('CertificationType/edit_certification_type') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="account_name_parent" name="account_name_parent">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Description</label>
                    <div class="col-sm-3">
                        <input type="text" name="description" id="description" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Cost</label>
                    <div class="col-sm-3">
                        <input type="text" name="cost" id="cost" class="form-control">
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