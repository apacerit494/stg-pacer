<nav class="main-header navbar navbar-expand navbar-light navbar-light">

    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" id="rombe" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <!-- <li class="nav-item d-none d-sm-inline-block">
            <h4 style="color:green">&nbsp&nbspPT SERTIFIKASI KARIR PROFESIONAL</h4>
        </li> -->



    </ul>

    <style>
        .pp2 {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    </style>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">


        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
            <div class="notificationnya" style="margin-top:-2px">
                <a class="nav-link" data-toggle="dropdown" href="#">
                    <i class="far fa-bell"></i>
                    <span class="badge badge-warning navbar-badge"><?= (count($notifications) > 0) ? count($notifications) : ""; ?></span>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span class="dropdown-item dropdown-header"><?= count($notifications); ?> Notifications</span>
                    <?php foreach ($notifications as $notif) : ?>
                        <div class="dropdown-divider"></div>
                        <a href="/Notification/<?= $notif['url_link'] . "/" . $notif['notification_id']; ?>" class="dropdown-item" data-id="">
                            <i class="fas fa-envelope mr-2"></i> <?= $notif['qty'] . ' ' . $notif['note']; ?>
                        </a>
                    <?php endforeach ?>
                </div>
            </div>
        </li>






        <li class="nav-item dropdown">
            <div class="user-panel mt-0 pb-0 mb-0 d-flex" data-toggle="dropdown">
                <div class="image">
                    <!--<img alt="" class="" style="width:22px;heigh:22px;border-radius:50%" src="<?php echo base_url() . user()->profile_picture; ?>"> -->
                  <img alt="" 
     					style="width:22px; height:22px; border-radius:50%; object-fit:cover;margin-top:6px" 
     					src="<?php echo base_url() . user()->profile_picture; ?>">
                </div>
                <div class="info">
                    <a class="d-block" data-toggle="dropdown" href="#"><?= user()->full_name; ?> &nbsp&nbsp&nbsp</a>
                </div>
            </div>
            <!-- <div class="dropdown-menu dropdown-menu-lg dropdown-menu-left"> -->
            <!-- <div class="dropdown-menu dropdown-menu-ml dropdown-menu-left">
                <a href="" class="dropdown-item"> My Profile </a>
                <a href="/Login/log_out" class="dropdown-item"> Log Out </a>
            </div> -->
            <ul class="dropdown-menu dropdown-menu-default">
                <li>
                    <a href="<?= base_url(); ?>/Profile/my_profile">
                        <i class="icon-user"></i>&nbsp&nbsp My Profile </a>
                </li>
                <li>
                    <a href="<?php echo site_url('logout'); ?>">
                        <i class="icon-key"></i>&nbsp&nbsp Log Out </a>

                </li>
            </ul>
        </li>

    </ul>
</nav>

<script src="https://js.pusher.com/7.2/pusher.min.js"></script>
<script>
    // Enable pusher logging - don't include this in production
    //Pusher.logToConsole = true;

    var pusher = new Pusher('452f5671f2a3962c0370', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        show_notifications();
    });

    function show_notifications() {
        $.ajax({
            url: '<?php echo site_url("Notification/get_notifications"); ?>',
            type: 'GET',
            async: true,
            dataType: 'json',
            success: function(data) {
                var html = '';
                var count = 1;
                var i;
                html = '';
                html += '<a class="nav-link" data-toggle="dropdown" href="#">';
                html += '     <i class = "far fa-bell" ></i>';
                if (data.length == 0) {
                    html += '     <span class = "badge badge-warning navbar-badge" ></span>';
                } else {
                    html += '     <span class = "badge badge-warning navbar-badge" >' + data.length + '</span>';
                }
                html += '</a>';
                html += '<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">';
                html += '<span class="dropdown-item dropdown-header">' + data.length + ' Notifications</span>';
                for (i = 0; i < data.length; i++) {
                    //  alert(data.length);
                    html += '<div class="dropdown-divider"></div>';
                    html += '   <a href="/Notification/' + data[i].url_link + '/' + data[i].notification_id + '" class="dropdown-item" data-id="">';
                    html += '   <i class="fas fa-envelope mr-2"></i>' + data[i].qty + ' ' + data[i].note;
                    html += '   </a>';
                }
                html += '</div>';

                $('.notificationnya').html(html);
            }

        });
    }
</script>