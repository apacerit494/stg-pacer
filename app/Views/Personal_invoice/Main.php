<?= $this->extend('Container'); ?>
<?= $this->section('content'); ?>
<div class="wrapper">


    <script src="<?= base_url(); ?>/assets/myjs/Personal_invoice.js"></script>
    <?php
    $i = 1;
    $id = 0;
    foreach ($invoices as $invoice) :
    ?>
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <br>


                        <!-- Main content -->
                        <div class="invoice p-3 mb-3">
                            <!-- title row -->
                            <div class="row">
                                <div class="col-12">
                                    <h4>
                                        <i class="fas fa-globe"></i> PT SERTIFIKASI KARIR PROFESIONAL
                                        <small class="float-right">Date: <?= $invoice['invoice_date'] ?></small>
                                    </h4>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- info row -->
                            <div class="row invoice-info">
                                <div class="col-sm-4 invoice-col">
                                    From
                                    <address>
                                        <strong>LSP PACER</strong><br>
                                        Jl. Gereja No. 9<br>
                                        Paledang - Bogor<br>
                                        Phone: (0251) 8340450<br>
                                        Email: sekretariat@pacer.co.id
                                    </address>
                                </div>
                                <!-- /.col -->
                                <div class="col-sm-4 invoice-col">
                                    To
                                    <address>
                                        <strong><?= $user['full_name']; ?></strong><br>
                                        <?= $user['address']; ?><br>
                                        <?= $user['district_name']; ?><br>
                                        <?= $user['mobile_phone']; ?><br>
                                        <?= $user['email']; ?>
                                    </address>
                                </div>
                                <!-- /.col -->
                                <div class="col-sm-4 invoice-col">
                                    <b>No Invoice : <?= $invoice['invoice_number']  ?></b><br>
                                    <br>
                                    <b>Certification Number : <?= $invoice['certification_number']  ?></b> <br>
                                    <b>Payment Due: <?= $invoice['invoice_date']  ?> </b> <br>
                                    <b>Account: 20202020202020</b>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <!-- Table row -->
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Qty</th>
                                                <th>Product</th>
                                                <th style="text-align: right;">Price</th>
                                                <th style="text-align: right;">Disc (<?= $invoice['discount']; ?>%) </th>
                                                <th style="text-align: right;">VAT</th>
                                                <th style="text-align: right;">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?= $htmlku[$id]; ?>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <div class="row">
                                <!-- accepted payments column -->
                                <div class="col-6">
                                    <p class="lead">Payment Methods: <br>
                                        Mohon ditransfer ke : <br>
                                        Bank Syariah Indonesia <br>
                                        No Rekening : 1057967206<br>
                                        a/n : PT. Sertifikasi Karir Profesional
                                    </p>
                                    <p class="text-muted well well-sm shadow-none" style="margin-top: 10px;">
                                        Segera konfirmasi jika sudah melakukan pembayaran
                                    </p>
                                </div>
                                <!-- /.col -->
                                <div class="col-6">
                                    <p class="lead">Amount Due 2/22/2014</p>

                                    <div class="table-responsive">
                                        <table class="table">
                                            <tr>
                                                <th style="width:50%">Total Price:</th>
                                                <td style="text-align: right;"><?= $invoice['total_price'] ? number_format($invoice['total_price'], 0, ',', '.') : 0?></td>
                                            </tr>
                                            <tr>
                                                <th>Disc (<?= $invoice['discount']; ?>%) </th>
                                                <td style="text-align: right;"><?= $invoice['discount_nominal'] ? number_format($invoice['discount_nominal'], 0, ',', '.') : 0; ?></td>
                                            </tr>
                                            <tr>
                                                <th>Tax (11%)</th>
                                                <td style="text-align: right;"><?= $invoice['total_vat'] ? number_format($invoice['total_vat'], 0, ',', '.') : 0; ?></td>
                                            </tr>

                                            <tr>
                                                <th>Total Invoice:</th>
                                                <td style="text-align: right;"><?= $invoice['total_invoice'] ? number_format($invoice['total_invoice'], 0, ',', '.') : 0 ?></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <!--modal -->

                            <!-- modal -->

                            <!-- this row will not appear when printing -->

                            <div id="modal_invoice_<?= $i; ?>" class="modal fade" role="dialog" aria-hidden="false">
                                <div class="modal-dialog" style="width:400px;">
                                    <div class="modal-content">

                                        <div class="modal-body">
                                            <!--  -->
                                            <div class="card card-info">

                                                <div class="card-header">
                                                    <h3 class="card-title">PROCCESS PAYMENT</h3>
                                                </div>
                                                <form class="form-horizontal" role="form" method="post" enctype="multipart/form-data" id="FormPayment_<?= $i; ?>" action="<?php echo site_url('Invoice/proses_payment_personal_invoice/'  . $i) ?>">

                                                    <?= csrf_field() ?>
                                                    <input type="hidden" id="id_<?= $i; ?>" name="id_<?= $i; ?>">
                                                    <div class="alert alert-error" style="display:none;">
                                                        <button class="close" data-dismiss="alert"></button>
                                                        You have some form errors. Please check below.
                                                    </div>
                                                    <div class="form-body">
                                                        <br>
                                                        <div class="form-group">
                                                            <label class="col-md-4 control-label" style="text-align:left">Invoice Number</label>
                                                            <div class="col-md-12">
                                                                <input type="text" id="invoice_number_<?= $i; ?>" name="invoice_number_<?= $i; ?>" class="form-control" readonly>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-md-4 control-label" style="text-align:left">Bank</label>
                                                            <div class="col-md-12">
                                                                <input type="text" id="bank_name_<?= $i; ?>" name="bank_name_<?= $i; ?>" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-md-4 control-label" style="text-align:left">Account Number</label>
                                                            <div class="col-md-12">
                                                                <input type="text" id="account_no_<?= $i; ?>" name="account_no_<?= $i; ?>" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-md-4 control-label" style="text-align:left">Account Name</label>
                                                            <div class="col-md-12">
                                                                <input type="text" id="account_name_<?= $i; ?>" name="account_name_<?= $i; ?>" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-md-4 control-label" style="text-align:left">Payment Date</label>
                                                            <div class="col-md-12">
                                                                <input type="date" id="payment_date_<?= $i; ?>" name="payment_date_<?= $i; ?>" class="form-control">
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="col-md-4 control-label" style="text-align:left">Total Amount</label>
                                                            <div class="col-md-12">
                                                                <input type="text" id="total_invoice_<?= $i; ?>" name="total_invoice_<?= $i; ?>" class="form-control" style="text-align:right" readonly>
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label class="col-sm-4 control-label" style="text-align:right">Payment Slip</label>
                                                            <div class="col-sm-12">
                                                                <input class="form-control" type="file" id="payment_slip_<?= $i; ?>" name="payment_slip_<?= $i; ?>" accept="application/pdf,image/*">
                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="form-actions">
                                                            <div class="form-group row">
                                                                <label class="col-md-4 control-label"></label>
                                                                <div class="col-md-8">
                                                                    <button class="btn btn-success" id="btn_proses_<?= $i; ?>"><i class="fa fa-check"></i> Proccess</button>
                                                                    <button class="btn btn-danger" id="btn_close_<?= $i; ?>"><i class="fa fa-out"></i> Close</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </form>
                                            </div>
                                            <!--  -->
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="row no-print">
                                <div class="col-12">
                                    <a href="<?= base_url(); ?>/Invoice/cetak_invoice/<?= $invoice['invoice_number']; ?>" rel="noopener" target="_blank" class="btn btn-default"><i class="fas fa-print"></i> Print</a>
                                    <button type="button" id="btn_submit_<?= $i; ?>" data-invoice_number="<?= $invoice['invoice_number']; ?>" data-total_invoice="<?= $invoice['total_invoice']; ?>" data-togle="modal" data-target="#modal_invoice_<?= $i; ?>" class="btn btn-success float-right"><i class="far fa-credit-card"></i> Payment </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- /.invoice -->
                    </div><!-- /.col -->
                </div><!-- /.row -->

            </div><!-- /.container-fluid -->


        </section>
    <?php
        $i++;
        $id++;
    endforeach; ?>
    <!-- /.content -->

    <!-- /.content-wrapper -->


</div>
<script>
    var jumlah_payment = <?= $i; ?>;
</script>
<?= $this->endSection(); ?>
<!-- ./wrapper -->