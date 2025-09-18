<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Upload_user.js"></script>
<!-- <section class="content-header">
    <div class="container">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>User</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">User</a></li>
                   
                </ol>
            </div>
        </div>
    </div>
</section> -->
<div class="page-content">
    <div class="container">
        <div class="card card-info" id="upload">
            <div class="card-header">
                <h3 class="card-title">UPLOAD USER</h3>
            </div>
            <div class="container portlet light">

                <!-- <div class="portlet-body"> -->
                <hr>
                <div row>
                    <form class="form-horizontal" action="<?php echo site_url('Accounting/do_upload_data_anggaran'); ?>" role="form" id="form-import" method="post" enctype="multipart/form-data">
                        <div class="alert alert-error" style="display:none;">
                            You Have same form errors. Please check below.
                        </div>

                        <div class="form-body">
                            <div class="col-md-10">

                                <div class="form-group row">
                                    <label class="col-sm-1 control-label" style="text-align:right">Pilih File</label>
                                    <div class="col-sm-3">
                                        <input class="form-control" type="file" id="userfile" name="userfile" accept=".xlsx,.xls">
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="btn-upload" class="btn btn-success pull-left" style="margin-right:10px;"><i class="fa fa-upload"></i> &nbsp;Upload</button>

                                    </div>
                                    <div class="col-sm-4">
                                        <a class="btn btn-info" id="btn_open" href="/assets/Examples/samples_upload_user.xlsx"><i class="fa fa-open"></i>&nbsp; Download Contoh FIle Upload</a>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </form>

                </div>

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
        </div>
    </div>
</div>


<?= $this->endSection(); ?>