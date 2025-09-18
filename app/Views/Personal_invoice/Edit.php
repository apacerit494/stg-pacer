<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">EDIT INVOICE</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Invoice/edit_invoice') ?>">
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
                    <label class="col-sm-2 control-label" style="text-align:right">Invoice Number</label>
                    <div class="col-sm-3">
                        <input type="text" name="invoice_number" id="invoice_number" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Inovice Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="invoice_date" id="invoice_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Certification Id</label>
                    <div class="col-sm-3">
                        <input type="text" name="certification_id" id="certification_id" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Full Name</label>
                    <div class="col-sm-3">
                        <input type="text" name="user_id" id="user_id" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Discount (%)</label>
                    <div class="col-sm-3">
                        <input type="text" name="discount_percentage" id="discount_percentage" class="form-control decimal" maxlength="3">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Discount ( Nominal )</label>
                    <div class="col-sm-3">
                        <input type="text" name="discount_nominal" id="discount_nominal" class="form-control decimal">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Currency</label>
                    <div class="col-md-3">
                        <select class="single-select" id="currency" name="currency" class="form-control">

                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Note</label>
                    <div class="col-sm-3">
                        <input type="text" name="note" id="note" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Tax</label>
                    <div class="col-sm-3">
                        <input type="text" name="taxnum" id="taxnum" class="form-control decimal">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">VAT</label>
                    <div class="col-sm-3">
                        <input type="text" name="vat" id="vat" class="form-control decimal">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Price</label>
                    <div class="col-sm-3">
                        <input type="text" name="price" id="price" class="form-control decimal">
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