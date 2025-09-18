<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Role_setup.js"></script>

<div class="page-content">
  <div class="container">
    <!-- batas atas -->
    <!-- JQGRID -->
    <div class="card card-info" id="jqgrid">
      <div class="card-header">
        <h3 class="card-title">ROLE SETUP</h3>
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
                        <option value="role_name" data-for="keyword">Role Name</option>
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
        <div class="wrapper-jqGrid">
          <table id="jqGrid_role"></table>
          <div id="jqGridPager_role"></div>
        </div>
        <!-- </div> -->
        <!-- </div> -->
      </div>
    </div>
    <!-- AKHIR JQGRID -->


    <!-- form ADD -->
    <div class="card card-info" id="add" style="display: none;">
      <div class="card-header">
        <h3 class="card-title">ADD MENU</h3>
      </div>
      <!-- /.card-header -->
      <!-- form start -->

      <div class="card-body">
        <form class="form-horizontal" role="form" id="form_add">
          <?= csrf_field() ?>
          <div class="alert alert-error" style="display:none;">
            <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
            <button class="close" data-dismiss="alert"></button>
            You have some form errors. Please check below.
          </div>
          <div class="form-body">
            <!-- Isi Data -->
            <div class="form-group row">
              <label class="col-md-2 control-label" style="text-align:right">Role Name</label>
              <div class="col-md-5">
                <input class="form-control" type="text" id="role_name" name="role_name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 control-label" style="text-align:right">Description</label>
              <div class="col-md-5">
                <input class="form-control" type="text" id="role_desc" name="role_desc">
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
        <form class="form-horizontal" role="form" id="form_edit">
          <?= csrf_field() ?>
          <input type="hidden" id="role_id" name="role_id">
          <div class="alert alert-error" style="display:none;">
            <button class="close" data-dismiss="alert"></button>
            You have some form errors. Please check below.
          </div>
          <div class="form-body">
            <!-- Isi Data -->

            <div class="form-group row">
              <label class="col-md-2 control-label" style="text-align:right">Role Name</label>
              <div class="col-md-5">
                <input class="form-control" type="text" id="role_name" name="role_name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-2 control-label" style="text-align:right">Description</label>
              <div class="col-md-5">
                <input class="form-control" type="text" id="role_desc" name="role_desc">
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

    <!-- BEGIN EDIT ROLE PRIVILEDGE -->
    <div class="card card-info" id="edit_role_priviledge" style="display: none;">
      <div class="card-header">
        <h3 class="card-title">Edit Role Priviledge</h3>
      </div>
      <div class="card-body">

        <!-- BEGIN FORM-->
        <form id="form_edit_role_priviledge" class="form-horizontal">
          <input type="hidden" id="role_id" name="role_id">
          <input type="checkbox" id="select_all"> Select All
          <hr size="1">
          <div id="menu-role"></div>

          <div class="form-actions" style="padding-left:20px">
            <button type="submit" class="btn purple">Save</button>
            <button type="button" class="btn" id="cancel">Back</button>
          </div>
        </form>
        <!-- END FORM-->
      </div>
    </div>
    <!-- END EDIT ROLE PRIVILEDGE -->
    <!-- batas bawah -->
  </div>
</div>


<?= $this->endSection(); ?>

<?= $this->endSection(); ?>