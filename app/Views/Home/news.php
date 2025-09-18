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
                        <h6><i class="fa fa-calendar"></i> Post at <?= date('d F Y H:i:s', strtotime($news['news_date'])) ?></h6>
                        <h2><?= $news['news_title'] ?></h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- single-well start-->
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="well-left">
                        <div class="single-well">
                            <a href="#">
                                <img src="/assets/img/about/1.jpg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <!-- single-well end-->
                <div class="col-md-12 col-sm-6 col-xs-12">
                    <div class="well-middle">
                        <div class="single-well" style="text-align: justify;">
                            <?php if($news['news_image']<>''){ ?>
                               <img src="<?= base_url().$news['news_image']; ?>" alt="" style="float: left;width : 400px;">
                            <?php }?>
                            <?= $news['news_content'] ?>
                        </div>
                    </div>
                </div>
                <!-- End col-->
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
</body>

</html>