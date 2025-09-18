<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="/assets/myjs/menu_setup.js"></script>

<div class="page-content">
    <div class="container">
        <!-- batas atas -->
        <div class="card card-info" id="jqgrid">
            <div class="card-header">
                <h3 class="card-title">MENU SETUP</h3>
            </div>
            <div class="container portlet light">
                <div class="portlet light" id="setup">
                    <!-- <ul class="nav nav-tabs" role="tablist" id="menuTabs">
                        <li role="presentation" class="active"><a href="#menu_setup" aria-controls="menu_setup" role="tab" data-toggle="tab">Menu Setup</a></li>
                        <li role="presentation"><a href="#change_position" aria-controls="change_position" role="tab" data-toggle="tab">Change Position</a></li>
                    </ul> -->
                    <!-- <div class="card-header d-flex p-0"> -->
                    <!-- <h3 class="card-title p-3">MENU SETUP</h3> -->
                    <ul class="nav nav-pills ml-auto p-2" id="menuTabs">
                        <li class="nav-item"><a class="nav-link active" href="#menu_setup" data-toggle="tab">Menu Setup</a></li>
                        <li class="nav-item"><a class="nav-link" href="#change_position" data-toggle="tab">Change Position</a></li>
                    </ul>
                    <!-- </div> -->
                    <hr>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="menu_setup">
                            <!-- BEGIN FORM SEARCH -->
                            <div class="row">

                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <select class="form-control" id="tipe_keyword" name="tipe_keyword">
                                                        <option value="a.menu_title">Menu</option>

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

                                <!-- <div class="col-md-4">
                                <select class="form-control" id="tipe_keyword" name="tipe_keyword">
                                    <option value="scope_code">Scope Code</option>
                                    <option value="scope_description">Description</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <input type="text" class="form-control" id="keyword" nama="keyword" placeholder="Masukan Keyword...">
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-info" id="btn_search">Search</button>
                            </div> -->

                            </div>
                            <!-- END FORM SEARCH -->
                            <p></p>
                            <!-- BEGIN JQGRID DATA -->
                            <div class="wrapper-jqGrid">
                                <table id="jqGrid_menu"></table>
                                <div id="jqGridPager_menu"></div>
                            </div>
                            <!-- END JQGRID DATA -->
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="change_position"> </div>
                    </div>
                </div>






            </div>
        </div>

        <!-- form ADD -->
        <div class="card card-info" id="add" style="display: none;">
            <div class="card-header">
                <h3 class="card-title">ADD MENU</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->

            <div class="card-body">
                <form class="form-horizontal" role="form" method="post" id="form_add" action="<?php echo site_url('Scope/add_scope') ?>">

                    <?= csrf_field() ?>
                    <div class="alert alert-error" style="display:none;">
                        <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">
                        <!-- Isi Data -->
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Parent</label>
                            <div class="col-md-5">
                                <select class="form-control" id="menu_parent" name="menu_parent">
                                    <option value="0">IS PARENT</option>
                                    <?php foreach ($menus as $menu) : ?>
                                        <option value="<?php echo $menu['menu_id'] ?>"><?php echo (($menu['menu_parent'] != '') ? $menu['menu_parent'] . ' | ' : '') . $menu['menu_title'] ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Title</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" id="menu_title" name="menu_title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu URL</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" id="menu_url" name="menu_url">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Type</label>
                            <div class="col-md-5">
                                <select class="form-control" id="menu_type" name="menu_type">
                                    <option value="0">Normal Menu</option>
                                    <option value="1">Classic Menu</option>
                                    <option value="2">Mega Menu</option>
                                    <option value="3">Mega Menu FULL</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu ICON</label>
                            <div class="col-md-2">
                                <input class="form-control" type="text" id="menu_icon" name="menu_icon">
                            </div>
                        </div> -->
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Icon</label>
                            <div class="col-md-5">
                                <select class="form-control" id="menu_icon" name="menu_icon">
                                    <option value="">Please Select</option>
                                    <?php foreach ($icons as $icon) : ?>
                                        <option value="<?= $icon->code_value; ?>"><?= $icon->code_description; ?></option>
                                    <?php endforeach; ?>
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
        <!-- Awal form edit -->
        <div class="card card-info" id="edit" style="display: none;">
            <div class="card-header">
                <h3 class="card-title">EDIT MENU</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->

            <div class="card-body">
                <form class="form-horizontal" role="form" method="post" id="form_edit" action="<?php echo site_url('Scope/edit_scope') ?>">
                    <?= csrf_field() ?>
                    <input type="hidden" id="menu_id" name="menu_id">
                    <div class="alert alert-error" style="display:none;">
                        <button class="close" data-dismiss="alert"></button>
                        You have some form errors. Please check below.
                    </div>
                    <div class="form-body">
                        <!-- Isi Data -->
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Parent</label>
                            <div class="col-md-5">
                                <select class="form-control" id="menu_parent" name="menu_parent">
                                    <option value="0">IS PARENT</option>
                                    <?php foreach ($menus as $menu) : ?>
                                        <option value="<?php echo $menu['menu_id'] ?>"><?php echo (($menu['menu_parent'] != '') ? $menu['menu_parent'] . ' | ' : '') . $menu['menu_title'] ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Title</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" id="menu_title" name="menu_title">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu URL</label>
                            <div class="col-md-5">
                                <input class="form-control" type="text" id="menu_url" name="menu_url">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Type</label>
                            <div class="col-md-5">
                                <select class="form-control" id="menu_type" name="menu_type">
                                    <option value="0">Normal Menu</option>
                                    <option value="1">Classic Menu</option>
                                    <option value="2">Mega Menu</option>
                                    <option value="3">Mega Menu FULL</option>
                                </select>
                            </div>
                        </div>
                        <!-- <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu ICON</label>
                            <div class="col-md-2">
                                <input class="form-control" type="text" id="menu_icon" name="menu_icon">
                            </div>
                        </div> -->
                        <div class="form-group row">
                            <label class="col-md-2 control-label" style="text-align:right">Menu Icon</label>
                            <div class="col-md-5">
                                <select class="form-control" id="menu_icon" name="menu_icon">
                                    <option value="">Please Select</option>
                                    <?php foreach ($icons as $icon) : ?>
                                        <option value="<?= $icon->code_value; ?>"><?= $icon->code_description; ?></option>
                                    <?php endforeach; ?>
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
        <!-- batas -->
    </div>
</div>


<?= $this->endSection(); ?>