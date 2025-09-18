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
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

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

    <header>
        <!-- header-area start -->
        <div id="sticker" class="header-area">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">

                        <!-- Navigation -->
                        <nav class="navbar navbar-default">
                            <!-- Brand and toggle get grouped for better mobile display -->
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <!-- Brand -->
                                <a class="navbar-brand page-scroll sticky-logo" href="#home">
                                    <!-- <h1><span>LSP</span>PACER</h1> -->
                                    <img src="<?= base_url(); ?>/assets/front-end/img/logo2.png" alt="" title="" style="width : 250px;margin-top : -10px;">
                                    <!-- Uncomment below if you prefer to use an image logo -->
                                </a>
                            </div>
                            <!-- Collect the nav links, forms, and other content for toggling -->
                            <div class="collapse navbar-collapse main-menu bs-example-navbar-collapse-1" id="navbar-example">
                                <ul class="nav navbar-nav navbar-right">
                                    <li>
                                        <!-- <a class="page-scroll active" href="#home">Home</a> -->
                                    <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Home<span class="caret"></span></a>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a class="page-scroll" href="#about">About Us</a></li>
                                            <li><a class="page-scroll" href="#services">Services</a></li>
                                            <li><a class="page-scroll" href="#blog">News</a></li>
                                        </ul>
                                    </li>
                                    <!-- <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Introduction<span class="caret"></span></a>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a class="page-scroll" href="#about">About Us</a></li>
                                            <li><a class="page-scroll" href="#services">Services</a></li>
                                            <li><a class="page-scroll" href="#blog">News</a></li>
                                        </ul>
                                    </li> -->
                                    <li>
                                        <a class="page-scroll" href="<?= base_url(); ?>/Dashboard/utama">Registration</a>
                                    </li>
                                    <li>
                                        <a class="page-scroll" href="<?= base_url(); ?>/learning/" target="_blank">Learning</a>
                                    </li>
                                    <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Directory<span class="caret"></span></a>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a class="page-scroll" href="<?= base_url(); ?>/Home/directory" target="_blank">Auditor</a></li>
                                            <li><a class="page-scroll" href="#">Surveyor</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a class="page-scroll" href="#contact">Contact</a>
                                    </li>
                                    <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Partner<span class="caret"></span></a>
                                        <ul class="dropdown-menu" role="menu">
                                            <li><a class="page-scroll" href="#">Training Partner</a></li>
                                            <li><a class="page-scroll" href="#">Certification Partner</a></li>
                                        </ul>
                                    </li>
                                    <!-- <li>
                                        <a class="page-scroll" href="/Dashboard/utama">Login</a>
                                    </li> -->
                                </ul>
                            </div>
                            <!-- navbar-collapse -->
                        </nav>
                        <!-- END: Navigation -->
                    </div>
                </div>
            </div>
        </div>
        <!-- header-area end -->
    </header>
    <!-- header end -->

    <!-- Start Slider Area -->
    <div id="home" class="slider-area">
        <div class="bend niceties preview-2">
            <div id="ensign-nivoslider" class="slides">
                <?php
                $no = 1;
                foreach ($slides as $slide) {
                ?>
                    <img src="<?= base_url() . $slide['picture_path']; ?>" alt="" title="#slider-direction-<?= $no ?>" />
                <?php
                    $no++;
                } ?>
            </div>

            <!-- direction -->
            <?php
            $no = 1;
            foreach ($slides as $slide) {
            ?>
                <div id="slider-direction-<?= $no ?>" class="slider-direction slider-one">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="slider-content">
                                    <!-- layer 1 -->
                                    <div class="layer-1-1 hidden-xs wow slideInDown" data-wow-duration="2s" data-wow-delay=".1s">
                                        <h2 class="title1"><?= $slide['slide_title'] ?></h2>
                                    </div>
                                    <!-- layer 2 -->
                                    <div class="layer-1-2 wow slideInUp" data-wow-duration="2s" data-wow-delay=".1s">
                                        <h1 class="title2"><?= $slide['slide_label'] ?></h1>
                                    </div>
                                    <!-- layer 3 -->
                                    <div class="layer-1-3 hidden-xs wow slideInUp" data-wow-duration="2s" data-wow-delay=".1s">
                                        <a class="ready-btn right-btn page-scroll" href="#services">See Services</a>
                                        <a class="ready-btn page-scroll" href="#about">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php
                $no++;
            } ?>
        </div>
    </div>
    <!-- End Slider Area -->

    <!-- Start About area -->
    <div id="about" class="about-area area-padding">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="section-headline text-center">
                        <h2>About LSP PACER</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- single-well start-->
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="well-left">
                        <div class="single-well">
                            <a href="#">
                                <img src="img/about/1.jpg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <!-- single-well end-->
                <div class="col-md-12 col-sm-6 col-xs-12">
                    <div class="well-middle">
                        <div class="single-well">
                            <?= $about['about_content'];?>
                        </div>
                    </div>
                </div>
                <!-- End col-->
            </div>
        </div>
    </div>
    <!-- End About area -->

    <!-- Start Service area -->
    <div id="services" class="services-area area-padding">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="section-headline services-head text-center">
                        <h2>Our Services</h2>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="services-contents">
                    <!-- Start Left services -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="about-move">
                            <div class="services-details">
                                <div class="single-services">
                                    <a class="services-icon" href="<?= base_url(); ?>/register">
                                        <i class='bx bx-certification'></i>
                                    </a>
                                    <h4>Professional Certification</h4>
                                    <!-- <p>
                                        Sistem Manajemen Kualitas
                                    </p> -->
                                </div>
                            </div>
                            <!-- end about-details -->
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="about-move">
                            <div class="services-details">
                                <div class="single-services">
                                    <a class="services-icon" href="<?= base_url(); ?>/register">
                                        <i class='bx bx-file'></i>
                                    </a>
                                    <h4>Professional Curriculum Vitae</h4>

                                </div>
                            </div>
                            <!-- end about-details -->
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <!-- end col-md-4 -->
                        <div class=" about-move">
                            <div class="services-details">
                                <div class="single-services">
                                    <a class="services-icon" href="<?= base_url(); ?>/register">
                                        <i class='bx bx-male-female'></i>
                                    </a>
                                    <h4>Professional Career Management</h4>

                                </div>
                            </div>
                            <!-- end about-details -->
                        </div>
                    </div>
                    <!-- <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class=" about-move">
                            <div class="services-details">
                                <div class="single-services">
                                    <a class="services-icon" href="#">
                                        <i class="fa fa-camera-retro"></i>
                                    </a>
                                    <h4>Professional Training</h4>

                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- End Left services -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                    </div>
                </div>
                <!-- End Left services -->
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <!-- end col-md-4 -->
                    <div class=" about-move">
                        <div class="services-details">
                            <div class="single-services">
                                <a class="services-icon" href="<?= base_url(); ?>/learning">
                                    <i class='bx bx-slideshow'></i>
                                </a>
                                <h4>Professional Training</h4>
                            </div>
                        </div>
                        <!-- end about-details -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <!-- End Service area -->

    <!-- Start Blog Area -->
    <div id="blog" class="blog-area">
        <div class="blog-inner area-padding">
            <div class="blog-overly"></div>
            <div class="container ">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="section-headline text-center">
                            <h2>Latest News</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Start News -->
                    <?php
                    foreach ($newses as $news) {
                    ?>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="single-blog">
                                <div class="single-blog-img">
                                    <a href="blog.html">
                                        <img src="img/blog/1.jpg" alt="">
                                    </a>
                                </div>
                                <div class="blog-meta">
                                    <!-- <span class="comments-type">
                                        <i class="fa fa-comment-o"></i>
                                        <a href="#">13 comments</a>
                                    </span> -->
                                    <span class="date-type">
                                        <i class="fa fa-calendar"></i><?= date('d M Y H:i:s', strtotime($news['news_date'])); ?>
                                    </span>
                                </div>
                                <div class="blog-text">
                                    <h4>
                                        <a href="blog.html"><?= $news['news_title'] ?></a>
                                    </h4>
                                    <div style="text-align:justify;">
                                        <?php
                                        if (strlen($news['news_content']) > 200) {
                                            echo substr(strip_tags($news['news_content']), 0, 200) . '...';
                                        } else {
                                            echo strip_tags($news['news_content']);
                                        }
                                        ?>
                                    </div>
                                </div>
                                <span>
                                    <a href="<?= base_url() . '/Home/news/' . $news['id'] ?>" class="ready-btn" target="_blank">Read more</a>
                                </span>
                            </div>
                            <!-- Start single blog -->
                        </div>
                    <?php
                    } ?>
                    <!-- End News-->
                </div>
            </div>
        </div>
    </div>
    <!-- End Blog -->
    
    <!-- Start contact Area -->
    <div id="contact" class="contact-area">
        <div class="contact-inner area-padding">
            <div class="contact-overly"></div>
            <div class="container ">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="section-headline text-center">
                            <h2>Contact us</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Start contact icon column -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="contact-icon text-center">
                            <div class="single-icon">
                                <i class="fa fa-mobile"></i>
                                <p>
                                    Phone/Fax. 0251 8340450<br>
                                    <span>Monday-Friday (8am-5pm)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Start contact icon column -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="contact-icon text-center">
                            <div class="single-icon">
                                <i class="fa fa-envelope-o"></i>
                                <p>
                                    Email: info@pacer.co.id<br>
                                    <span>Web: www.pacer.co.id</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Start contact icon column -->
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <div class="contact-icon text-center">
                            <div class="single-icon">
                                <i class="fa fa-map-marker"></i>
                                <p>
                                    Location: Jl. Gereja No. 9 RT 01/RW 08, Paledang, Kecamatan Bogor Tengah, Kota Bogor, Jawa
                                    Barat<br>
                                    <span>Post Code 16122, Indonesia</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <!-- Start Google Map -->
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <!-- Start Map -->
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d700.633322269599!2d106.79263542082306!3d-6.599534287352288!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5b867c38f31%3A0xd44408f70f01935d!2sJl.%20Gereja%2C%20RT.03%2FRW.08%2C%20Paledang%2C%20Kecamatan%20Bogor%20Tengah%2C%20Kota%20Bogor%2C%20Jawa%20Barat%2016122!5e0!3m2!1sid!2sid!4v1671158092319!5m2!1sid!2sid" width="100%" height="380" frameborder="0" style="border:0" allowfullscreen></iframe>
                        <!-- End Map -->
                    </div>
                    <!-- End Google Map -->

                    <!-- Start  contact -->
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <div class="form contact-form">
                            <div id="sendmessage">Your message has been sent. Thank you!</div>
                            <div id="errormessage"></div>
                            
                            <form action="<?php echo site_url('Home/send_message') ?>" method="post" role="form" class="contactForm" id="FormAdd">
                                <div class="form-group">
                                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                    <div class="validation"></div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                    <div class="validation"></div>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                                    <div class="validation"></div>
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                                    <div class="validation"></div>
                                </div>
                                <div class="text-center"><button type="submit">Send Message</button></div>
                            </form>
                        </div>
                    </div>
                    <!-- End Left contact -->
                </div>
            </div>
        </div>
    </div>
    <!-- End Contact Area -->

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
                                    <span><a href="https://empire5.fastcloud.id:2096" target="_blank"><i class="fa fa-envelope-o" aria-hidden="true"></i> Pacer Webmail</a></span><br/>
                                    <span><a href="https://pacer.co.id/seed/seeddms/out/out.Login.php" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> Pacer Document</a></span>
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
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
</body>

</html>