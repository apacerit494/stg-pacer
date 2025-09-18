<!-- JQGRID -->
<div class="card card-info" id="jqgrid">
    <div class="card-header">
        <h3 class="card-title">INVOICE</h3>
    </div>
    <div class="container portlet light">

        <!-- <div class="portlet-body"> -->
        <hr>
        <form class="form-horizontal" id="formSearch">
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <select class="form-control" id="tipe_keyword" name="tipe_keyword">
                                        <option value="invoice_number">Invoice Number</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="keyword" nama="keyword" placeholder="Masukan Keyword...">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-info" id="btn_search">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <hr size="1">

        <div class="modal fade" id="modal_invoice" role="dialog" aria-hidden="true">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">

                    <div class="modal-body">

                        <div class="card card-info">

                            <div class="card-header">
                                <h3 class="card-title">PROCCESS PAYMENT</h3>
                            </div>
                            <form class="form-horizontal" role="form" method="post" id="FormPayment" enctype="multipart/form-data" action="<?php echo site_url('Invoice/proses_payment') ?>">

                                <?= csrf_field() ?>
                                <input type="hidden" id="id" name="id">
                                <div class="alert alert-error" style="display:none;">
                                    <button class="close" data-dismiss="alert"></button>
                                    You have some form errors. Please check below.
                                </div>
                                <div class="form-body">
                                    <br>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="text-align:left">Invoice Number</label>
                                        <div class="col-md-12">
                                            <input type="text" id="invoice_number" name="invoice_number" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="text-align:left">Bank</label>
                                        <div class="col-md-12">
                                            <input type="text" id="bank_name" name="bank_name" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="text-align:left">Account Number</label>
                                        <div class="col-md-12">
                                            <input type="text" id="account_no" name="account_no" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="text-align:left">Account Name</label>
                                        <div class="col-md-12">
                                            <input type="text" id="account_name" name="account_name" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="text-align:left">Payment Date</label>
                                        <div class="col-md-12">
                                            <input type="date" id="payment_date" name="payment_date" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-4 control-label" style="text-align:left">Total Amount</label>
                                        <div class="col-md-12">
                                            <input type="text" id="total_invoice" name="total_invoice" class="form-control maskmoney" style="text-align:right" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label" style="text-align:left">Payment Slip</label>
                                        <div class="col-sm-12">
                                            <input class="form-control" type="file" accept=".pdf,image/*" id="payment_slip" name="payment_slip">
                                        </div>
                                    </div>
                                    <hr>

                                    <div class="form-actions">
                                        <div class="form-group row">
                                            <label class="col-md-4 control-label"></label>
                                            <div class="col-md-8">
                                                <button class="btn btn-success" id="btn_proses"><i class="fa fa-check"></i> Proccess</button>
                                                <a href="" class="btn btn-warning" id="btn_close"><i class="fa fa-close"></i> Close</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>


        <div class="modal fade" id="modal_invoice2" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">SECRETARIAT VERIFICATION</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="assignment_id" name="assignment_id">
                        <input type="hidden" id="committee_id" name="committee_id">
                        <div class="form-group row">
                            <label class="col-md-3 control-label" style="text-align:right">Remarks</label>
                            <div class="col-md-6">
                                <select name="remarks" id="remarks" class="form-control">
                                    <option value="Y">OK</option>
                                    <option value="N">Mohon direvisi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button class="btn btn-success" id="btn_proses2"><i class="fa fa-check"></i> Proccess</button>
                        <a href="" class="btn btn-warning" id="btn_close2"><i class="fa fa-close"></i> Close</a>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <!-- END FORM SEARCH -->
        <!-- <div class="container-fluid"> -->
        <div id="tr_grid" class="wrapper-jqGrid">
            <table id="jqgrid_data"></table>
            <div id="jqgrid_data_pager"></div>
        </div>
        <!-- </div> -->
        <!-- </div> -->

        <!--  -->

    </div>
</div>
<!-- AKHIR JQGRID -->