<!-- Awal form edit -->
<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<link rel="stylesheet" href="/plugins/summernote/summernote-bs4.min.css">
<script src="<?= base_url(); ?>/assets/myjs/Front_end_news.js"></script>
<div class="page-content">
    <div class="container">
        <div class="card card-info" id="edit">
            <div class="card-header">
                <h3 class="card-title">EDIT NEWS</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->

            <div class="card-body">
                <form class="form-horizontal" role="form" method="post" id="FormEdit" enctype="multipart/form-data" action="<?php echo site_url('Settings/edit_news_front_end') ?>">
                    <?= csrf_field() ?>
                    <input type="hidden" id="id" name="id" value="<?= $news['id']; ?>">
                    <input type="hidden" id="news_image2" name="news_image2" value="<?= $news['news_image']; ?>">
                    <div class="alert alert-error" style="display:none;">
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">
                        <!-- Isi Data -->

                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">News Title</label>
                            <div class="col-md-4">
                                <input class="form-control" type="text" id="news_title" name="news_title" maxlength="50" value="<?= $news['news_title']; ?>">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">News Image</label>
                            <div class="col-md-4">
                                <input class="form-control" type="file" id="news_image3" name="news_image3" accept=".pdf,.jpeg,.jpg,.png">
                            </div>
                            <div class="com-sm-2">
                                <a id="btn_preview" class="btn btn-primary" href="<?= $news['news_image']; ?>" target="_blank">Preview</a>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">News Content</label>
                            <div class="col-md-8">
                                <textarea id="news_content2" name="news_content2"> <?= $news['news_content']; ?></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Show</label>
                            <div class="col-md-4">
                                <select id="showed" name="showed" class="form-control">
                                    <option value="1" <?= ($news['showed']) == '1' ? " selected" : ""; ?>>Yes</option>
                                    <option value="0" <?= ($news['showed']) == '0' ? " selected" : ""; ?>>No</option>
                                </select>
                            </div>
                        </div>



                        <hr>
                        <div class="form-actions">
                            <div class="form-group row">
                                <label class="col-md-2 control-label"></label>
                                <div class="col-md-4">
                                    <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                                    <a href="<?= base_url() . '/Settings/news_front_end'; ?>" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</a>
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

<script src="/plugins/summernote/summernote-bs4.min.js"></script>
<script>
    $(function() {
        // Summernote
        $('#news_content').summernote()
        $('#news_content2').summernote()


    })
</script>
<?= $this->endSection(); ?>



<!-- akhir form edit -->