<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">EDIT PARTNER</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Partner/edit_partner') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Partner Name</label>
                    <div class="col-sm-3">
                        <input type="text" name="partner_name" id="partner_name" class="form-control" maxlength="50">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Contract Start Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="contract_start_date" id="contract_start_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Contract End Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="contract_end_date" id="contract_end_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Relation Status</label>
                    <div class="col-sm-3">
                        <select name="relation_status" id="relation_status" class="form-control">
                            <option value="1">Active</option>
                            <option value="0">Non Active</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Address</label>
                    <div class="col-sm-3">
                        <textarea name="address" id="address" cols="30" rows="4" class="form-control"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Website</label>
                    <div class="col-sm-3">
                        <input type="text" name="website" id="website" class="form-control" maxlength="100">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Phone</label>
                    <div class="col-sm-3">
                        <input type="text" name="phone" id="phone" class="form-control" maxlength="25">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Fax</label>
                    <div class="col-sm-3">
                        <input type="text" name="fax" id="fax" class="form-control" maxlength="25">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Contact Person</label>
                    <div class="col-sm-3">
                        <input type="text" name="contact_person" id="contact_person" class="form-control" maxlength="50">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Mobile Phone</label>
                    <div class="col-sm-3">
                        <input type="text" name="hp" id="hp" class="form-control" maxlength="25">
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