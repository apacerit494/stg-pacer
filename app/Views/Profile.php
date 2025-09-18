<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LSP PACER | User Profile</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?= base_url(); ?>/plugins/fontawesome-free/css/all.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?= base_url(); ?>/dist/css/adminlte.min.css">

    <style>
        .image_upload>input {
            display: none;
        }

        input[type=text] {
            width: 220px;
            height: auto;
        }

        .pp {
            width: 100px;
            height: 100px;

        }
    </style>

</head>

<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        <!-- Navbar -->
        <?= $this->include('Layout/Navbar'); ?>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <?= $this->include('Layout/Sidebar'); ?>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->

            <br>

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">

                            <!-- Profile Image -->
                            <form class="form-horizontal" role="form" method="post" id="FormChange" enctype="multipart/form-data" action="<?php echo site_url('Profile/add_profile_picture') ?>">


                                <div class="card card-primary card-outline">
                                    <div class="card-body box-profile">
                                        <div class="text-center">
                                            <img alt="" class="pp" src="<?php echo base_url() . user()->profile_picture; ?>">
                                        </div>
                                        <h3 class="profile-username text-center"><?= $user['full_name']; ?></h3>
                                        <h3 class="profile-username text-center"><?= (count($certifications) > 0) ? $certifications[0]['certification_number'] : "" ?></h3>
                                        <p class="image_upload">
                                            <label for="userImage">
                                                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a class="btn btn-warning btn-sm" rel="nofollow"><span class='glyphicon glyphicon-paperclip'></span> Upload Passphoto</a>
                                            </label>
                                            <input type="file" name="userImage" id="userImage" accept="image/*">
                                        </p>
                                    </div>
                                    <div style="display:none ;">
                                        <button class="btn btn-warning" id="btn_upload" type="hidden"></button>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                            </form>
                            <!-- /.card -->

                            <!-- About Me Box -->
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h3 class="card-title">About Me</h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <strong><i class="fas fa-book mr-1"></i> Tempat. Tanggal Lahir</strong>

                                    <p class="text-muted">
                                        <?= $user['birth_place'] . ', ' . (($user['birth_date'] == Null || $user['birth_date'] == '') ? '' : date('d-m-Y', strtotime($user['birth_date']))); ?>
                                    </p>

                                    <hr>

                                    <strong><i class="fas fa-map-marker-alt mr-1"></i> Gender</strong>

                                    <p class="text-muted"><?= $user['gender_description']; ?></p>

                                    <hr>

                                    <strong><i class="fas fa-pencil-alt mr-1"></i> Address</strong>

                                    <p class="text-muted">
                                        <span class="tag tag-primary"><?= $user['address']; ?></span><br>
                                        <span class="tag tag-warning"><?= $user['village_id']; ?></span><br>
                                        <span class="tag tag-info"><?= $user['subdistrict_name']; ?></span><br>
                                        <span class="tag tag-success"><?= $user['district_name']; ?></span><br>
                                        <span class="tag tag-danger"><?= $user['province_name']; ?></span><br>
                                    </p>

                                    <hr>

                                    <strong><i class="far fa-file-alt mr-1"></i> Email</strong>
                                    <p class="text-muted"><?= $user['email']; ?></p>
                                    <hr>
                                    <strong><i class="far fa-file-alt mr-1"></i> Mobile Phone</strong>
                                    <p class="text-muted"><?= $user['mobile_phone']; ?></p>
                                    <hr>
                                    <strong><i class="far fa-file-alt mr-1"></i> Phone</strong>
                                    <p class="text-muted"><?= $user['phone']; ?></p>
                                    <hr>
                                    <strong><i class="far fa-file-alt mr-1"></i> KTP</strong>
                                    <div class="com-sm-2">
                                        <a id="btn_preview" class="btn btn-primary" href="<?= $user['doc_idcard_path'] == '' || $user['doc_idcard_path'] == null ? 'javascript:' : base_url() . $user['doc_idcard_path'] ?>" target="_blank">Preview</a>
                                    </div>

                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.card -->
                        </div>
                        <!-- /.col -->
                        <div class="col-md-9">
                            <div class="card">
                                <div class="card-header p-2">
                                    <ul class="nav nav-pills">
                                        <li class="nav-item"><a class="nav-link active" href="#education" data-toggle="tab">Education</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#experience" data-toggle="tab">Experience</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#audit" data-toggle="tab">Audit Experience</a></li>
                                        <li class="nav-item"><a class="nav-link" href="#training" data-toggle="tab">Training</a></li>
                                        <?php if (user()->user_type_id == '5') { ?>
                                            <li class="nav-item"><a class="nav-link" href="#certification" data-toggle="tab">Certification</a></li>
                                        <?php } ?>
                                    </ul>
                                </div><!-- /.card-header -->
                                <div class="card-body">
                                    <div class="tab-content">
                                        <div class="active tab-pane" id="education">
                                            <!-- Post -->
                                            <div class="post">
                                                <?php $no = 1; ?>
                                                <?php foreach ($educations as $education) : ?>
                                                    <div class="user-block">
                                                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                                        <span class="username">
                                                            <a href="#"><?= $education['university']; ?></a>
                                                        </span>
                                                        <span class="description"><?= date('d-m-Y', strtotime($education['start_date'])) . ' s/d ' . date('d-m-Y', strtotime($education['end_date'])); ?></span>
                                                    </div>
                                                    <table>
                                                        <tr>
                                                            <td>Level&nbsp </td>
                                                            <td> :&nbsp <?= $education['level']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Major&nbsp </td>
                                                            <td> :&nbsp <?= $education['major']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Certificate Number&nbsp </td>
                                                            <td> : &nbsp<?= $education['certificate_number']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Accreditation Status&nbsp </td>
                                                            <td> : &nbsp<?= $education['status_akreditasi']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Certificate </td>
                                                            <td>
                                                                <div class="com-sm-2">
                                                                    : <a id="btn_preview_<?= $no; ?>" class="btn btn-primary" href="<?= $education['doc_path'] == '' || $education['doc_path'] == null ? 'javascript:' : base_url() . $education['doc_path'] ?>" target="_blank">Preview</a>
                                                                </div>
                                                            </td>
                                                        </tr>



                                                        <!-- <tr>
                                                            <td>Score&nbsp </td>
                                                            <td> : &nbsp<?= $education['score']; ?> </td>
                                                        </tr> -->
                                                    </table>

                                                    <hr>
                                                    <?php $no++ ?>
                                                <?php endforeach; ?>
                                                <!-- /.user-block -->


                                            </div>
                                            <!-- /.post -->
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class="tab-pane" id="experience">
                                            <!-- The timeline -->
                                            <div class="post">
                                                <?php $no = 1; ?>
                                                <?php foreach ($experiences as $experience) : ?>
                                                    <div class="user-block">
                                                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                                        <span class="username">
                                                            <a href="#"><?= $experience['company_name']; ?></a>
                                                        </span>
                                                        <span class="description"><?= date('d-m-Y', strtotime($experience['start_date'])) . ' s/d ' . ($experience['until_now'] == '1' ? 'Sekarang' : date('d-m-Y', strtotime($experience['end_date']))) ?></span>
                                                    </div>
                                                    <table>
                                                        <tr>
                                                            <td>Departement&nbsp </td>
                                                            <td> :&nbsp <?= $experience['departement']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Position&nbsp </td>
                                                            <td> :&nbsp <?= $experience['position']; ?> </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Reference Letter&nbsp </td>
                                                            <td>
                                                                <div class="com-sm-2">
                                                                    : <a id="btn_preview_<?= $no; ?>" name="btn_preview_<?= $no; ?>" class="btn btn-primary" href="<?= $experience['doc_path'] == '' || $experience['doc_path'] == null ? 'javascript:' :  base_url() . $experience['doc_path']; ?>" target="_blank">Preview</a>
                                                                </div>
                                                            </td>
                                                        </tr>



                                                    </table>

                                                    <hr>
                                                    <?php $no++ ?>
                                                <?php endforeach; ?>
                                                <!-- /.user-block -->


                                            </div>
                                        </div>
                                        <!-- /.tab-pane -->

                                        <div class="tab-pane" id="audit">
                                            <div class="post">
                                                <?php $no = 1; ?>
                                                <?php foreach ($audits as $audit) : ?>
                                                    <div class="user-block">
                                                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                                        <span class="username">
                                                            <a href="#"><?= $audit['company_addres']; ?></a>
                                                        </span>
                                                        <span class="description"><?= date('d-m-Y', strtotime($audit['start_date'])) . ' s/d ' . date('d-m-Y', strtotime($audit['end_date'])); ?></span>
                                                    </div>
                                                    <table>
                                                        <tr>
                                                            <td>Company Phone&nbsp </td>
                                                            <td>:</td>
                                                            <td>&nbsp <?= $audit['company_phone']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Contact Person&nbsp </td>
                                                            <td>:</td>
                                                            <td>&nbsp <?= $audit['contact_person']; ?> </td>
                                                        </tr>
                                                        <?= $scopes[$no - 1]; ?>
                                                        <?= $roles[$no - 1]; ?>
                                                        <!-- <tr>
                                                            <td>Score&nbsp </td>
                                                            <td>:</td>
                                                            <td>&nbsp <?= $audit['score']; ?> </td>
                                                        </tr> -->
                                                        <tr>
                                                            <td>Audit Plan&nbsp</td>
                                                            <td>:</td>
                                                            <td>
                                                                <a id="btn_preview_audit_<?= $no; ?>" name="btn_preview_audit_<?= $no; ?>" class="btn btn-primary" href="<?= $audit['doc_audit_plan_path'] == '' || $audit['doc_audit_plan_path'] == null ? 'javascript:' : base_url() . $audit['doc_audit_plan_path']; ?>" target="_blank">Preview</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Work Order&nbsp</td>
                                                            <td>:</td>
                                                            <td>
                                                                <a id="btn_preview_work_<?= $no; ?>" name="btn_preview_work_<?= $no; ?>" class="btn btn-primary" href="<?= $audit['doc_work_order_path'] == '' || $audit['doc_work_order_path'] == null ? 'javascript:' : base_url() . $audit['doc_work_order_path']; ?>" target="_blank">Preview</a>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <hr>
                                                    <?php $no++ ?>
                                                <?php endforeach; ?>
                                                <!-- /.user-block -->


                                            </div>
                                        </div>

                                        <div class="tab-pane" id="training">
                                            <div class="post">
                                                <?php $no = 1; ?>
                                                <?php foreach ($trainings as $training) : ?>
                                                    <div class="user-block">
                                                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                                        <span class="username">
                                                            <a href="#"><?= $training['provider_name']; ?></a>
                                                        </span>
                                                        <span class="description"><?= date('d-m-Y', strtotime($training['start_date'])) . ' s/d ' . date('d-m-Y', strtotime($training['end_date'])); ?></span>
                                                    </div>
                                                    <table>
                                                        <tr>
                                                            <td>Training Topic &nbsp </td>
                                                            <td>:</td>
                                                            <td><?= $training['training_topic']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Relation Status&nbsp </td>
                                                            <td>:</td>
                                                            <td><?= $training['relation']; ?> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Certificate&nbsp </td>
                                                            <td>:</td>
                                                            <td>
                                                                <div class="com-sm-2">
                                                                    <a id="btn_preview_<?= $no; ?>" name="btn_preview_<?= $no; ?>" class="btn btn-primary" href="<?= $training['doc_path'] == '' || $training['doc_path'] == null ? 'javascript:' : base_url() . $training['doc_path'] ?>" target="_blank">Preview</a>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    </table>

                                                    <hr>
                                                    <?php $no++ ?>
                                                <?php endforeach; ?>
                                                <!-- /.user-block -->


                                            </div>
                                        </div>

                                        <div class="tab-pane" id="certification">
                                            <div class="post">
                                                <?php $no = 1; ?>
                                                <?php foreach ($certifications as $certification) : ?>
                                                    <div class="user-block">
                                                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                                                        <span class="username">
                                                            <a href="#"><?= date('d-m-Y', strtotime($certification['apply_date'])); ?></a>
                                                        </span>
                                                    </div>
                                                    <table>
                                                        <tr>
                                                            <td>Level Auditor &nbsp </td>
                                                            <td>:</td>
                                                            <td>&nbsp <?= $certification['level_auditor1']; ?> </td>
                                                        </tr>
                                                        <?= $types[$no - 1]; ?>

                                                    </table>

                                                    <hr>
                                                    <?php $no++ ?>
                                                <?php endforeach; ?>
                                                <!-- /.user-block -->


                                            </div>
                                        </div>

                                        <!-- /.tab-pane -->
                                    </div>
                                    <!-- /.tab-content -->
                                </div><!-- /.card-body -->
                            </div>
                            <!-- /.card -->
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->


        </div>
        <!-- /.content-wrapper -->
        <?= $this->include('Layout/Footer'); ?>

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->

    <!-- jQuery -->
    <script src="<?= base_url(); ?>/plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="<?= base_url(); ?>/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="<?= base_url(); ?>/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes -->
</body>
<script>
    /** membuat navbar fixed */
    $('body').addClass('layout-navbar-fixed')

    /** membuat sidebar fixed */
    $('body').addClass('layout-fixed')
    $(window).trigger('resize')
</script>
<script>
    $('#userImage').change(function(e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function() {
            var output = document.getElementById('profile_picture');
            output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        $('#btn_upload').trigger('click');

    });
</script>

</html>