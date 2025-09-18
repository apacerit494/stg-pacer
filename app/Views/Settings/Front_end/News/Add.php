<!-- form ADD -->

<div class="card card-info" id="add" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">ADD NEWS</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('Settings/add_news_front_end') ?>">

            <?= csrf_field() ?>
            <div class="alert alert-error" style="display:none;">
                <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
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
                    <label class="col-md-2 control-label" style="text-align:right">News Image</label>
                    <div class="col-md-4">
                        <input class="form-control" type="file" id="news_image" name="news_image" accept=".pdf,.jpeg,.jpg,.png">
                    </div>
                    <div class="com-sm-2">
                        <a id="btn_preview" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">News Content</label>
                    <div class="col-md-8">
                        <textarea id="news_content" name="news_content"></textarea>
                    </div>
                </div>
                <div class=" form-group row">
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
    <!-- /.card-body -->

    <!-- /.card-footer -->

</div>
<!-- akhir form add -->