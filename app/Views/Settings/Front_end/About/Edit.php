<!-- Awal form edit -->
<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>
<style>
    h3 a:hover {
        background-color: greenyellow;
    }
</style>
<div class="page-content">
    <div class="container">
        <div class="card card-info" id="edit">
            <div class="card-header">
                <h3 class="card-title">
                    <a href="<?= base_url() . '/Dashboard/index'; ?>">
                        << BACK</a>
                </h3>
                <h3 class="card-title" style="float:right">ABOUT</h3>
            </div>


            <div class="card-body">
                <form class="form-horizontal" role="form" method="post" id="FormEdit" enctype="multipart/form-data" action="<?php echo site_url('Settings/edit_about_front_end') ?>">
                    <?= csrf_field() ?>
                    <?php if ($pesan != '' && $success == false) { ?>
                        <div id="msgerror1">
                            <div class="alert alert-error">
                                <button class="close"></button>
                                <?= $pesan; ?>

                            </div>
                            <hr>
                        </div>

                    <?php } else if ($pesan != '' && $success == true) { ?>
                        <div id="msgerror2">
                            <div class="alert alert-success">
                                <button class="close"></button>
                                <?= $pesan; ?>

                            </div>
                            <hr>
                        </div>
                    <?php } ?>
                    <input type="hidden" id="id" name="id" value="<?= $about['id']; ?>">
                    <div class="alert alert-error" style="display:none;">
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">
                        <!-- Isi Data -->

                        <div class="form-group row">
                            <label class="col-md-2 control-label">About Content :</label>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-12">
                                <textarea id="about_content" name="about_content"> <?= $about['about_content']; ?></textarea>
                            </div>
                        </div>


                        <hr>
                        <div class="form-actions">
                            <div class="form-group row">
                                <!-- <label class="col-md-2 control-label"></label> -->
                                <div class="col-md-4">
                                    <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                                    <a href="<?= base_url() . '/Dashboard/index'; ?>" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</a>
                                </div>
                            </div>
                        </div>



                        <!-- End of Data  -->
                    </div>
                </form>
            </div>
            <!-- END BODY -->

        </div>
    </div>
</div>


<?= $this->endSection(); ?>



<!-- akhir form edit -->