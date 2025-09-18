<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">EDIT VOUCHER</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Voucher/edit_voucher') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Voucher Code</label>
                    <div class="col-sm-3">
                        <input type="text" name="voucher_code" id="voucher_code" class="form-control" maxlength="50">
                    </div>
                    <div class="col-sm-3" style="margin-top:10px; ">
                        <input type="checkbox" id="unlimited1" name="unlimited1" style="color:blue"> Unlimited<br>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Partner</label>
                    <div class="col-sm-3">
                        <select name="partner_id" id="partner_id" class="form-control">
                            <option value="">Please Select</option>
                            <?php foreach ($partners as $partner) : ?>
                                <option value="<?= $partner->partner_id; ?>"><?= $partner->partner_name; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Discount</label>
                    <div class="col-sm-3">
                        <input type="text" name="discount" id="discount" class="form-control" maxlength="25">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="start_date" id="start_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Expired Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="expired_date" id="expired_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row" style="display:none ;">
                    <label class="col-sm-2 control-label" style="text-align:right">Status</label>
                    <div class="col-sm-3">
                        <select name="active_status" id="active_status" class="form-control">
                            <option value="1">Active</option>
                            <option value="0">Not Active</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row" style="display:none ;">
                    <label class="col-sm-2 control-label" style="text-align:right">Voucher Type</label>
                    <div class="col-sm-3">
                        <input type="text" name="voucher_type" id="voucher_type" class="form-control" maxlength="100">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Quota</label>
                    <div class="col-sm-3">
                        <input type="text" name="qouta" id="qouta" class="form-control" maxlength="50">
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