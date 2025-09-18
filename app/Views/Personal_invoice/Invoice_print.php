<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <title>LSP PACER | Invoice Print</title> -->

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../../dist/css/adminlte.min.css">
</head>

<body>
    <div class="wrapper">
        <!-- Main content -->
        <section class="invoice">
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
                                        <small class="float-right">Date: <?= $invoices['invoice_date'] ?></small>
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
                                        Email: amaryadhi@pacer.co.id
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
                                    <b>No Invoice : <?= $invoices['invoice_number']  ?></b><br>
                                    <br>
                                    <b>Certification Number : <?= $invoices['certification_number']  ?></b> <br>
                                    <b>Payment Due: <?= $invoices['invoice_date']  ?> </b> <br>
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
                                                <th style="text-align: right;">Disc (<?= $invoices['discount']; ?>%) </th>
                                                <th style="text-align: right;">VAT</th>
                                                <th style="text-align: right;">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?= $htmlku; ?>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <div class="row">
                                <!-- accepted payments column -->
                                <div class="col-6">
                                    <p class="lead">Payment Methods:</p>
                                    <img src="<?= base_url(); ?>/dist/img/credit/visa.png" alt="Visa">
                                    <img src="<?= base_url(); ?>/dist/img/credit/mastercard.png" alt="Mastercard">
                                    <img src="<?= base_url(); ?>/dist/img/credit/american-express.png" alt="American Express">
                                    <img src="<?= base_url(); ?>/dist/img/credit/paypal2.png" alt="Paypal">

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
                                                <td style="text-align: right;"><?= number_format($invoices['total_price'], 0, ',', '.') ?></td>
                                            </tr>
                                            <tr>
                                                <th>Disc (<?= $invoices['discount']; ?>%) </th>
                                                <td style="text-align: right;"><?= number_format($invoices['discount_nominal'], 0, ',', '.'); ?></td>
                                            </tr>
                                            <tr>
                                                <th>Tax (11%)</th>
                                                <td style="text-align: right;"><?= number_format($invoices['total_vat'], 0, ',', '.'); ?></td>
                                            </tr>

                                            <tr>
                                                <th>Total Invoice:</th>
                                                <td style="text-align: right;"><?= number_format($invoices['total_invoice'], 0, ',', '.') ?></td>
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



                        </div>
                        <!-- /.invoice -->
                    </div><!-- /.col -->
                </div><!-- /.row -->

            </div><!-- /.container-fluid -->


        </section>
        <!-- /.content -->
    </div>
    <!-- ./wrapper -->
    <!-- Page specific script -->
    <script>
        window.addEventListener("load", window.print());
    </script>
</body>

</html>