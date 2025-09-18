<?= $this->extend('Container'); ?>
<?= $this->section('content'); ?>

<div class="page-content">
    <div class="container">
        <div class="card card-info">
            <div class="card-header">
                <h3 class="card-title">BIODATA</h3>
            </div>
            <script src="<?= base_url(); ?>/assets/myjs/Register.js"></script>
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
                            <?= $this->include('Register/Personal'); ?>
                        </div>
                        <div class="tab-pane fade" id="education" role="tabpanel" aria-labelledby="education-tab">
                            <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                            <?= $this->include('Register/Education'); ?>
                            <!-- </div> -->
                        </div>
                        <div class="tab-pane fade" id="experience" role="tabpanel" aria-labelledby="experience-tab">
                            <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                            <?= $this->include('Register/Experience'); ?>
                            <!-- </div> -->
                        </div>
                        <div class="tab-pane fade" id="audit_experience" role="tabpanel" aria-labelledby="audit_experience-tab">
                            <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                            <?= $this->include('Register/Audit_experience'); ?>
                            <!-- </div> -->
                        </div>
                        <div class="tab-pane fade" id="training" role="tabpanel" aria-labelledby="training-tab">
                            <!-- <div class="card card-primary card-outline direct-chat direct-chat-primary"> -->
                            <?= $this->include('Register/Training'); ?>
                            <!-- </div> -->
                        </div>
                    </div>
                    <!-- END BODY -->

                </div>
                <script>
                    // var full_name2 = <?= user()->full_name; ?>;
                </script>
            </div>
            <!-- akhir form edit -->
        </div>
    </div>
</div>
<script src="<?= base_url(); ?>/plugins/jquery/jquery.min.js"></script>
<?= $this->endSection(); ?>