<!-- Content Wrapper. Contains page content -->
<!-- Content Header (Page header) -->

<!-- Main content -->
<div class="card card-info" id="register" style="display:none ;">
    <div class="card-header">
        <!-- <h3 class="card-title"> -->
        <button class="btn btn-info" type="button" id="btn_back"><i class="fa fa-arrow-left"></i> Back</button>
        <!-- </h3> -->
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <div class="form-body">
            <nav class="w-100">
                <div class="nav nav-tabs" id="product-tab" role="tablist">
                    <a class="nav-item nav-link active" id="personal-tab" data-toggle="tab" href="#personal" role="tab" aria-controls="personal" aria-selected="true">Personal Information</a>
                    <a class="nav-item nav-link" id="education-tab" data-toggle="tab" href="#education" role="tab" aria-controls="education" aria-selected="false">Education</a>
                    <a class="nav-item nav-link" id="experience-tab" data-toggle="tab" href="#experience" role="tab" aria-controls="experience" aria-selected="false">Experience</a>
                    <a class="nav-item nav-link" id="audit_experience-tab" data-toggle="tab" href="#audit_experience" role="tab" aria-controls="audit_experience" aria-selected="false">Audit Experience</a>
                    <a class="nav-item nav-link" id="training-tab" data-toggle="tab" href="#training" role="tab" aria-controls="training" aria-selected="false">Training</a>
                </div>
            </nav>
            <div class="tab-content p-3" id="nav-tabContent">
                <div class="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                    <?= $this->include('Certificant/Personal'); ?>
                </div>
                <div class="tab-pane fade" id="education" role="tabpanel" aria-labelledby="education-tab">
                    <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                    <?= $this->include('Certificant/Education'); ?>
                    <!-- </div> -->
                </div>
                <div class="tab-pane fade" id="experience" role="tabpanel" aria-labelledby="experience-tab">
                    <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                    <?= $this->include('Certificant/Experience'); ?>
                    <!-- </div> -->
                </div>
                <div class="tab-pane fade" id="audit_experience" role="tabpanel" aria-labelledby="audit_experience-tab">
                    <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                    <?= $this->include('Certificant/Audit_experience'); ?>
                    <!-- </div> -->
                </div>
                <div class="tab-pane fade" id="training" role="tabpanel" aria-labelledby="training-tab">
                    <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                    <?= $this->include('Certificant/Training'); ?>
                    <!-- </div> -->
                </div>
            </div>
            <!-- END BODY -->

        </div>
        <script>
            var full_name2 = <?= session('full_name'); ?>;
        </script>
    </div>
    <!-- akhir form edit -->
</div>
<!-- /.container-fluid -->

<!-- /.content -->

<!-- /.content-wrapper -->


<!-- Control Sidebar -->


<!-- ./wrapper -->