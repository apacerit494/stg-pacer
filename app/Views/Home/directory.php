<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>LSP Pacer</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">

    <!-- Favicons -->
    <link href="<?= base_url(); ?>/assets/front-end/img/favicon.png" rel="icon">
    <link href="<?= base_url(); ?>/assets/front-end/img/apple-touch-icon.png" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700|Raleway:300,400,400i,500,500i,700,800,900" rel="stylesheet">

    <!-- Bootstrap CSS File -->
    <link href="<?= base_url(); ?>/assets/front-end/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap4.min.css" rel="stylesheet">

    <!-- Libraries CSS Files -->
    <link href="<?= base_url(); ?>/assets/front-end/lib/nivo-slider/css/nivo-slider.css" rel="stylesheet">
    <link href="<?= base_url(); ?>/assets/front-end/lib/owlcarousel/owl.carousel.css" rel="stylesheet">
    <link href="<?= base_url(); ?>/assets/front-end/lib/owlcarousel/owl.transitions.css" rel="stylesheet">
    <link href="<?= base_url(); ?>/assets/front-end/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="<?= base_url(); ?>/assets/front-end/lib/animate/animate.min.css" rel="stylesheet">
    <link href="<?= base_url(); ?>/assets/front-end/lib/venobox/venobox.css" rel="stylesheet">

    <!-- Nivo Slider Theme -->
    <link href="<?= base_url(); ?>/assets/front-end/css/nivo-slider-theme.css" rel="stylesheet">

    <!-- Main Stylesheet File -->
    <link href="<?= base_url(); ?>/assets/front-end/css/style.css" rel="stylesheet">

    <!-- Responsive Stylesheet File -->
    <link href="<?= base_url(); ?>/assets/front-end/css/responsive.css" rel="stylesheet">
</head>

<body data-spy="scroll" data-target="#navbar-example">

    <div id="preloader"></div>

    <!-- Start News area -->
    <div id="about" class="about-area area-padding">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="section-headline text-center" style="text-align: left;">
                        <h3>Directory Auditor</h3>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-12 col-sm-6 col-xs-12">
                    <h5>Please type your name in the search field provided</h5>
                    <hr>
                    <h3>Passed</h3>
                    <table id="example" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th style="text-align:center;vertical-align: middle;">Num</th>
                                <th style="text-align:center;vertical-align: middle;">Certificate Num</th>
                                <th style="text-align:center;vertical-align: middle;">Name</th>
                                <th style="text-align:center;vertical-align: middle;">Scope</th>
                                <th style="text-align:center;vertical-align: middle;">Field Code</th>
                                <th style="text-align:center;vertical-align: middle;">Level</th>
                                <th style="text-align:center;vertical-align: middle;">Start Date</th>
                                <th style="text-align:center;vertical-align: middle;">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $num = 1;
                            if(count($auditors)>0){
                            foreach ($auditors as $auditor) {
                            ?>
                                <tr>
                                    <td><?= $num; ?></td>
                                    <td><?= $auditor['certification_number'] ?></td>
                                    <td><?= $auditor['full_name'] ?></td>
                                    <td><?= $auditor['scope_code'] ?></td>
                                    <td><?= $auditor['field_code'] ?></td>
                                    <td><?= $auditor['level_auditor'] ?></td>
                                    <td><?= date('d M Y', strtotime($auditor['start_date'])); ?></td>
                                    <td><?= date('d M Y', strtotime($auditor['end_date'])); ?></td>
                                </tr>
                            <?php
                                $num++;
                            }
                            }else{
                                ?>
                                <tr><td colspan='8' style="text-align : center">No record found.</td></tr>
                            <?php
                            }
                            ?>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th style="text-align:center;vertical-align: middle;">Num</th>
                                <th style="text-align:center;vertical-align: middle;">Certificate Num</th>
                                <th style="text-align:center;vertical-align: middle;">Name</th>
                                <th style="text-align:center;vertical-align: middle;">Scope</th>
                                <th style="text-align:center;vertical-align: middle;">Field Code</th>
                                <th style="text-align:center;vertical-align: middle;">Level</th>
                                <th style="text-align:center;vertical-align: middle;">Start Date</th>
                                <th style="text-align:center;vertical-align: middle;">End Date</th>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <hr>
                    <h3>Suspended</h3>
                    <table id="example" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th style="text-align:center;vertical-align: middle;">Num</th>
                                <th style="text-align:center;vertical-align: middle;">Certificate Num</th>
                                <th style="text-align:center;vertical-align: middle;">Name</th>
                                <th style="text-align:center;vertical-align: middle;">Scope</th>
                                <th style="text-align:center;vertical-align: middle;">Field Code</th>
                                <th style="text-align:center;vertical-align: middle;">Level</th>
                                <th style="text-align:center;vertical-align: middle;">Start Date</th>
                                <th style="text-align:center;vertical-align: middle;">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $num = 1;
                            if(count($auditors2)>0){
                            foreach ($auditors2 as $auditor) {
                            ?>
                                <tr>
                                    <td><?= $num; ?></td>
                                    <td><?= $auditor['certification_number'] ?></td>
                                    <td><?= $auditor['full_name'] ?></td>
                                    <td><?= $auditor['scope_code'] ?></td>
                                    <td><?= $auditor['field_code'] ?></td>
                                    <td><?= $auditor['level_auditor'] ?></td>
                                    <td><?= date('d M Y', strtotime($auditor['start_date'])); ?></td>
                                    <td><?= date('d M Y', strtotime($auditor['end_date'])); ?></td>
                                </tr>
                            <?php
                                $num++;
                            }
                            }else{
                                ?>
                                <tr><td colspan='8' style="text-align : center">No record found.</td></tr>
                            <?php
                            }
                            ?>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th style="text-align:center;vertical-align: middle;">Num</th>
                                <th style="text-align:center;vertical-align: middle;">Certificate Num</th>
                                <th style="text-align:center;vertical-align: middle;">Name</th>
                                <th style="text-align:center;vertical-align: middle;">Scope</th>
                                <th style="text-align:center;vertical-align: middle;">Field Code</th>
                                <th style="text-align:center;vertical-align: middle;">Level</th>
                                <th style="text-align:center;vertical-align: middle;">Start Date</th>
                                <th style="text-align:center;vertical-align: middle;">End Date</th>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <hr>
                    <h3>Withdrawn</h3>
                    <table id="example" class="table table-striped table-bordered" style="width:100%">
                        <thead>
                            <tr>
                                <th style="text-align:center;vertical-align: middle;">Num</th>
                                <th style="text-align:center;vertical-align: middle;">Certificate Num</th>
                                <th style="text-align:center;vertical-align: middle;">Name</th>
                                <th style="text-align:center;vertical-align: middle;">Scope</th>
                                <th style="text-align:center;vertical-align: middle;">Field Code</th>
                                <th style="text-align:center;vertical-align: middle;">Level</th>
                                <th style="text-align:center;vertical-align: middle;">Start Date</th>
                                <th style="text-align:center;vertical-align: middle;">End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $num = 1;
                            if(count($auditors3)>0){
                            foreach ($auditors3 as $auditor) {
                            ?>
                                <tr>
                                    <td><?= $num; ?></td>
                                    <td><?= $auditor['certification_number'] ?></td>
                                    <td><?= $auditor['full_name'] ?></td>
                                    <td><?= $auditor['scope_code'] ?></td>
                                    <td><?= $auditor['field_code'] ?></td>
                                    <td><?= $auditor['level_auditor'] ?></td>
                                    <td><?= date('d M Y', strtotime($auditor['start_date'])); ?></td>
                                    <td><?= date('d M Y', strtotime($auditor['end_date'])); ?></td>
                                </tr>
                            <?php
                                $num++;
                            }
                            }else{
                                ?>
                                <tr><td colspan='8' style="text-align : center">No record found.</td></tr>
                            <?php
                            }
                            ?>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th style="text-align:center;vertical-align: middle;">Num</th>
                                <th style="text-align:center;vertical-align: middle;">Certificate Num</th>
                                <th style="text-align:center;vertical-align: middle;">Name</th>
                                <th style="text-align:center;vertical-align: middle;">Scope</th>
                                <th style="text-align:center;vertical-align: middle;">Field Code</th>
                                <th style="text-align:center;vertical-align: middle;">Level</th>
                                <th style="text-align:center;vertical-align: middle;">Start Date</th>
                                <th style="text-align:center;vertical-align: middle;">End Date</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- End News area -->

    <!-- Start Footer bottom Area -->
    <footer>
        <div class="footer-area">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="footer-content">
                            <div class="footer-head">
                                <div class="footer-logo">
                                    <h2><span>LSP</span>PACER</h2>
                                </div>

                                <p>Auditor Sistem Manajemen ISO
                                </p>
                                <div class="footer-icons">
                                    <ul>
                                        <li>
                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="fa fa-google"></i></a>
                                        </li>
                                        <li>
                                            <a href="#"><i class="fa fa-pinterest"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end single footer -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="footer-content">
                            <div class="footer-head">
                                <h4>information</h4>
                                <p>
                                    Silahkan hubungi kami
                                </p>
                                <div class="footer-contacts">
                                    <p><span>Phone:</span> 0251 8340450</p>
                                    <p><span>Email:</span> info@pacer.co.id</p>
                                    <p><span>Working Hours:</span> 8am-5pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end single footer -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="footer-content">
                            <div class="footer-head">
                                <h4>Instagram</h4>
                                <div class="flicker-img">
                                    <a href="#"><img src="<?= base_url(); ?>/assets/front-end/img/portfolio/1.jpg" alt=""></a>
                                    <a href="#"><img src="<?= base_url(); ?>/assets/front-end/img/portfolio/2.jpg" alt=""></a>
                                    <a href="#"><img src="<?= base_url(); ?>/assets/front-end/img/portfolio/3.jpg" alt=""></a>
                                    <a href="#"><img src="<?= base_url(); ?>/assets/front-end/img/portfolio/4.jpg" alt=""></a>
                                    <a href="#"><img src="<?= base_url(); ?>/assets/front-end/img/portfolio/5.jpg" alt=""></a>
                                    <a href="#"><img src="<?= base_url(); ?>/assets/front-end/img/portfolio/6.jpg" alt=""></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-area-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="copyright text-center">
                            <p>
                                &copy; Copyright <strong>2023</strong>. All Rights Reserved
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>

    <!-- JavaScript Libraries -->
    <script src="<?= base_url(); ?>/assets/front-end/lib/jquery/jquery.min.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/venobox/venobox.min.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/knob/jquery.knob.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/wow/wow.min.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/parallax/parallax.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/easing/easing.min.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/nivo-slider/js/jquery.nivo.slider.js" type="text/javascript"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/appear/jquery.appear.js"></script>
    <script src="<?= base_url(); ?>/assets/front-end/lib/isotope/isotope.pkgd.min.js"></script>

    <!-- Contact Form JavaScript File -->
    <script src="<?= base_url(); ?>/assets/front-end/contactform/contactform.js"></script>

    <script src="<?= base_url(); ?>/assets/front-end/js/main.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap4.min.js"></script>
</body>

</html>