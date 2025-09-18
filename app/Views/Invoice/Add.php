<div class="card card-info" id="add" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">ADD INVOICE</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('Invoice/add_invoice') ?>">

            <?= csrf_field() ?>
            <div class="alert alert-error" style="display:none;">
                <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <br>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Invoice Number</label>
                    <div class="col-sm-3">
                        <input type="text" name="invoice_number" id="invoice_number" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Inovice Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="invoice_date" id="invoice_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Full Name</label>
                    <div class="col-sm-3">
                        <select name="user_id" id="user_id" class="form-control chosen">
                            <option value="">Please Select</option>
                            <?php foreach ($certificants as $certificant) : ?>
                                <option value="<?= $certificant->user_id; ?>"><?= $certificant->full_name; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Certification Number</label>
                    <div class="col-sm-3">
                        <select name="certification_id" id="certification_id" class="form-control">

                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Keterangan</label>
                    <div class="col-sm-3">
                        <input type="text" name="note" id="note" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Biaya</label>
                    <div class="col-sm-3">
                        <input type="text" name="biaya" id="biaya" class="form-control maskmoney" style="text-align:right">
                    </div>
                </div>
                <div class=" form-group row" id="percentage">
                    <label class="col-sm-2 control-label" style="text-align:right">Discount (%)</label>
                    <div class="col-sm-3">
                        <input type="text" name="discount_percentage" id="discount_percentage" class="form-control" style="text-align:right" value="0" maxlength="3">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Price</label>
                    <div class="col-sm-3">
                        <input type="text" name="price" id="price" class="form-control" style="text-align:right" readonly>
                    </div>
                </div>
                <div class="form-group row" id="nominal">
                    <label class="col-sm-2 control-label" style="text-align:right">Discount</label>
                    <div class="col-sm-3">
                        <input type="text" name="discount_nominal" id="discount_nominal" class="form-control maskmoney" style="text-align:right" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">VAT</label>
                    <div class="col-sm-3">
                        <input type="text" name="vat" id="vat" class="form-control maskmoney" style="text-align:right" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Total Invoice</label>
                    <div class="col-sm-3">
                        <input type="text" name="total_invoice" id="total_invoice" class="form-control maskmoney" readonly>
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