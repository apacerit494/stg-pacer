<!-- JQGRID -->
<div class="card card-info" id="jqgrid">
    <div class="card-header">
        <h3 class="card-title">CERTIFICATION CARD AND CERTIFICATE</h3>
    </div>
    <div class="container portlet light">

        <!-- <div class="portlet-body"> -->
        <hr>
        <form class="form-horizontal" id="formSearch">

            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <select class="form-control" id="tipe_keyword" name="tipe_keyword">
                                        <option value="b.full_name">Full Name</option>
                                        <option value="a.certification_number">Certification Number</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="keyword" nama="keyword" placeholder="Masukan Keyword...">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-info" id="btn_search">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <hr size="1">


        <!-- END FORM SEARCH -->
        <!-- <div class="container-fluid"> -->
        <div id="tr_grid" class="wrapper-jqGrid">
            <table id="jqgrid_data"></table>
            <div id="jqgrid_data_pager"></div>
        </div>
        <!-- </div> -->
        <!-- </div> -->
    </div>
    <!-- AKHIR JQGRID -->

    <div id="modal_upload" class="modal fade" role="dialog" aria-hidden="true">
        <div class="modal-dialog" style="width:400px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <!-- <h4 class="modal-title" style="text-align:left ;"><i class="fa fa-edit"></i> Edit Holiday And Mass Leave</h4> -->
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" method="post" id="FormUpload" enctype="multipart/form-data" action="<?php echo site_url('DownloadBerkas/upload_certification_card_certification') ?>">

                        <input type="hidden" id="certification_id" name="certification_id">


                        <!--<div class="form-group row">-->
                        <!--    <label class="col-md-3 control-label">Card</label>-->
                        <!--    <div class="col-md-9">-->
                        <!--        <input type="file" class="form-control" id="certification_card_path" name="certification_card_path" accept=".pdf,.jpg,.jpeg,.png">-->
                        <!--    </div>-->
                        <!--</div>-->
                        <div class="form-group row">
                            <label class="col-md-3 control-label">Certificate</label>
                            <div class="col-md-9">
                                <input type="file" class="form-control" id="certification_certificate_path" name="certification_certificate_path" accept=".pdf,.jpg,.jpeg,.png">
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="modal-footer" style="text-align:left ;">
                                <button class="btn green" id="edit_detail"><i class="fa fa-save"></i> Save</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    </div>
</div>