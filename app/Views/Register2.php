<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>HRIS | User</title>

	<!-- Google Font: Source Sans Pro -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="<?= base_url(); ?>/plugins/fontawesome-free/css/all.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="<?= base_url(); ?>/dist/css/adminlte.min.css">


	<link href="<?= base_url() ?>/assets/admin/plugins/select2/css/select2.min.css" rel="stylesheet" />
	<link href="<?= base_url() ?>/assets/admin/plugins/select2/css/select2-bootstrap4.css" rel="stylesheet" />



	<!-- from inv -->
	<link href="<?php echo base_url() ?>/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
	<!-- <link href="<?php echo base_url() ?>/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" /> -->
	<link href="<?php echo base_url() ?>/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/global/plugins/ui/jquery-ui.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/global/plugins/jqGrid/css/ui.jqgrid.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/global/plugins/chosen/chosen.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/global/plugins/confirm/jquery-confirm.css" rel="stylesheet" type="text/css" />

	<link href="<?php echo base_url() ?>/assets/global/css/components.min.css" id="style_components" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />

	<!-- BEGIN THEME STYLES -->
	<link href="<?php echo base_url() ?>/assets/admin/layout/css/layout.min.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/admin/layout/css/themes/default.min.css" rel="stylesheet" type="text/css" id="style_color" />
	<link href="<?php echo base_url() ?>/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css" />
	<link href="<?php echo base_url() ?>/assets/admin/layout/css/template.css" rel="stylesheet" type="text/css" />

	<!-- END THEME STYLES -->
	<link rel="shortcut icon" href="favicon.ico" />

	<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
	<script src="<?php echo base_url() ?>/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>

	<!-- Sweetalert2 -->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.2/dist/sweetalert2.min.js"></script>
	<link href="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.2/dist/sweetalert2.min.css" rel="stylesheet" type="text/css" />
	<!-- <title> </title> -->
	<!-- end from inv -->

	<script src="<?= base_url(); ?>/assets/myjs/Register.js"></script>
</head>


<!-- Site wrapper -->
<div class="container-fluid">
	<br>
	<!-- Navbar -->

	<!-- /.navbar -->

	<!-- side bar -->

	<!-- end side bar -->
	<!-- Content Wrapper. Contains page content -->

	<!-- Content Header (Page header) -->


	<!-- Main content -->
	<section class="content">
		<!-- <div class="container-fluid"> -->

		<!-- form register -->
		<div class="card card-info" id="add">
			<div class="card-header">
				<h3 class="card-title">Register</h3>
			</div>
			<!-- /.card-header -->
			<!-- form start -->

			<div class="card-body">
				<form class="form-horizontal" role="form" method="post" id="FormAdd" enctype="multipart/form-data" action="<?php echo site_url('Register/add_register') ?>">

					<?= csrf_field() ?>
					<input type="hidden" id="parent_account_code" name="parent_account_code">

					<div class="alert alert-error" style="display:none;">
						<!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
						<button class="close" data-dismiss="alert"></button>
						You have some form errors. Please check below.
					</div>
					<div class="form-body">
						<!-- Isi Data -->
						<div class="form-group row">
							<label class="col-sm-2 control-label" for="full_name" style="text-align:right">Full Name</label>
							<div class="col-sm-3">
								<input type="text" name="full_name" id="full_name" class="form-control" placeholder="Silahkan isi nama lengkap sesuai KTP">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Birth Place</label>
							<div class="col-sm-3">
								<input type="text" name="birth_place" id="birth_place" class="form-control" placeholder="Silahkan isi tempat lahir">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Birth Date</label>
							<div class="col-sm-3">
								<input type="date" name="birth_date" id="birth_date" class="form-control" placeholder="Silahkan isi tanggal lahir">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Gender</label>
							<div class="col-sm-3">
								<select id="gender" name="gender" class="form-control single-select" data-placeholder="Silahkan pilih jenis kelamin">
									<option value="">Please Select</option>
									<?php foreach ($genders as $gender) : ?>
										<option value="<?php echo $gender['code_value'] ?>"><?php echo $gender['code_description']  ?></option>
									<?php endforeach; ?>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Address</label>
							<div class="col-sm-3">
								<textarea name="address" id="address" class="form-control" placeholder="Silahkan isi alamat"></textarea>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-2 control-label" style="text-align:right">Province</label>
							<div class="col-md-3">
								<select class="form-control single-select" id="province_id" name="province_id" data-placeholder="Silahkan pilih propinsi">
									<option value="">Please Select</option>
									<?php foreach ($provinces as $province) : ?>
										<option value="<?php echo $province['province_id'] ?>"><?php echo $province['province_name']  ?></option>
									<?php endforeach; ?>
								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-2 control-label" style="text-align:right">District</label>
							<div class="col-md-3">
								<select class="form-control single-select" id="district_id" name="district_id" data-placeholder="Silahkan pilih kabupaten/kota">

								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-2 control-label" style="text-align:right">Sub District</label>
							<div class="col-md-3">
								<select class="form-control single-select" id="subdistrict_id" name="subdistrict_id" data-placeholder="Silahkan pilih kecamatan">

								</select>
							</div>
						</div>
						<div class="form-group row">
							<label class="col-md-2 control-label" style="text-align:right">Village</label>
							<div class="col-md-3">
								<select class="form-control single-select" id="village_id" name="village_id" data-placeholder="Silahkan pilih kelurahan/desa">

								</select>
							</div>
						</div>


						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Email</label>
							<div class="col-sm-3">
								<input type="email" name="email" id="email" class="form-control" placeholder="Silahkan isi alamat email">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Mobile Phone</label>
							<div class="col-sm-3">
								<input type="text" name="mobile_phone" id="mobile_phone" class="form-control" placeholder="Silahkan isi nomor handphone">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Phone</label>
							<div class="col-sm-3">
								<input type="text" name="phone" id="phone" class="form-control" placeholder="Silahkan isi nomor telepon rumah">
							</div>
						</div>

						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">ID Card Number</label>
							<div class="col-sm-3">
								<input type="text" name="idcard_number" id="idcard_number" class="form-control" placeholder="Silahkan isi nomor KTP">
							</div>
						</div>

						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Doc ID Card Path</label>
							<div class="col-sm-3">
								<input class="form-control" type="file" id="doc_idcard_path" name="doc_idcard_path" placeholder="Silahkan upload KTP">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">User Name</label>
							<div class="col-sm-3">
								<input type="text" name="user_name" id="user_name" class="form-control" placeholder="Silahkan isi user name">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">User Password</label>
							<div class="col-sm-3">
								<input type="password" name="user_password" id="user_password" class="form-control" placeholder="Silahkan isi password">
							</div>
						</div>
						<div class="form-group row">
							<label class="col-sm-2 control-label" style="text-align:right">Confirm Password</label>
							<div class="col-sm-3">
								<input type="password" name="confirm_password" id="confirm_password" class="form-control" placeholder="Silahkan isi password sekali lagi">
							</div>
						</div>


						<hr>
						<div class="form-actions">
							<div class="form-group row">
								<label class="col-md-2 control-label"></label>
								<div class="col-md-4">
									<button class="btn btn-success" id="btn_save"><i class="fa fa-save"></i> Save</button>
									<!-- <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button> -->
									<a href="/" class="col-sm-3 btn btn-warning">Cancel</a>
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
		<!-- /.card -->
		<!-- akhir form register -->
		<!-- </div> -->
	</section>
	<!-- /.content -->

	<!-- /.content-wrapper -->



	<!-- Control Sidebar -->

	<!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

<script>
	var site_url = "<?php echo base_url(); ?>";
	var user_type = "<?= session('user_type_id'); ?>"
	window.max_date = "<?php echo @$max_date; ?>";
</script>

<!-- jQuery 
        -->
<!-- <script src="<?= base_url(); ?>/plugins/jquery/jquery.min.js"></script> -->
<!-- Bootstrap 4 -->
<script src="<?= base_url(); ?>/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="<?= base_url(); ?>/dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<!-- <script src="<?= base_url(); ?>/dist/js/demo.js"></script> -->


<!-- from inv -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/bootstrap-hover-dropdown.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jqGrid/js/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jqGrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/ui/jquery-ui.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/chosen/chosen.jquery.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/confirm/jquery-confirm.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.inputmask.bundle.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.livequery.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.maskmoney.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.form.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery.nestable.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/highcharts/code/highcharts.js"></script>
<script src="<?php echo base_url() ?>/assets/global/plugins/highcharts/code/modules/exporting.js"></script>

<script src="<?= base_url() ?>/assets/admin/plugins/select2/js/select2.min.js"></script>

<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?php echo base_url() ?>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?php echo base_url() ?>/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/scripts/template.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="<?php echo base_url() ?>/assets/global/scripts/polyfill.js" type="text/javascript"></script>



<script>
	jQuery(document).ready(function() {
		Metronic.init(); // init metronic core components
		Layout.init(); // init current layout
		Demo.init();
		Template.init();
	});

	// $('body').addClass('sidebar-collapse')
	// $(window).trigger('resize')

	/** warnain brand */

	$('.single-select').select2({
		theme: 'bootstrap4',
		width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
		placeholder: $(this).data('placeholder'),
		allowClear: Boolean($(this).data('allow-clear')),
	});
	$('.multiple-select').select2({
		theme: 'bootstrap4',
		width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
		placeholder: $(this).data('placeholder'),
		allowClear: Boolean($(this).data('allow-clear')),
	});

	/** membuat navbar fixed */
	$('body').addClass('layout-navbar-fixed')

	/** membuat sidebar fixed */
	$('body').addClass('layout-fixed')
	$(window).trigger('resize')

	/** untuk membuat anak menu menjorok ke dalam */
	//$('.nav-sidebar').addClass('nav-child-indent')

	// $('body').addClass('dark-mode')
</script>




<!-- end from inv -->


</html>