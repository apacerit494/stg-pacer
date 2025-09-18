<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">EDIT NEWS</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Settings/edit_news_front_end') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="text_preview" name="text_preview">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->

                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">News Title</label>
                    <div class="col-md-4">
                        <input class="form-control" type="text" id="news_title" name="news_title" maxlength="50">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">News Content</label>
                    <div class="col-md-8">
                        <textarea id="news_content2" name="news_content2"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Show</label>
                    <div class="col-md-4">
                        <select id="showed" name="showed" class="form-control">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>



                <hr>
                <div class="form-actions">
                    <div class="form-group row">
                        <label class="col-md-2 control-label"></label>
                        <div class="col-md-4">
                            <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                            <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button>
                        </div>
                    </div>
                </div>



                <!-- End of Data  -->
            </div>
        </form>
    </div>
    <!-- END BODY -->

</div>
<!-- akhir form edit -->