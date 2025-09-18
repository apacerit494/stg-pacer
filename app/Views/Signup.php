<!doctype html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--favicon-->
	<link rel="icon" href="<?= base_url() ?>/assets/admin/images/favicon-32x32.png" type="image/png" />
	<!--plugins-->
	<link href="<?= base_url() ?>/assets/admin/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
	<link href="<?= base_url() ?>/assets/admin/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
	<link href="<?= base_url() ?>/assets/admin/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />
	<!-- loader-->
	<link href="<?= base_url() ?>/assets/admin/css/pace.min.css" rel="stylesheet" />
	<script src="<?= base_url() ?>/assets/admin/js/pace.min.js"></script>
	<!-- Bootstrap CSS -->
	<link href="<?= base_url() ?>/assets/admin/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
	<link href="<?= base_url() ?>/assets/admin/css/app.css" rel="stylesheet">
	<link href="<?= base_url() ?>/assets/admin/css/icons.css" rel="stylesheet">
	<title>Login</title>
</head>



<body class="bg-login">
	<!--wrapper-->
	<div class="wrapper">
		<div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
			<div class="container-fluid">
				<div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
					<div class="col mx-auto">
						<!-- <div class="mb-4 text-center">
                            <img src="<?= base_url() ?>/assets/admin/images/logo-icon.png" width="40" alt="" />PT Dinamika Inti Perkasa
                        </div> -->
						<?php if ($pesan != '' && $success == false) { ?>
							<div class="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2">
								<div class="d-flex align-items-center">
									<div class="font-35 text-white"><i class='bx bxs-message-square-x'></i>
									</div>
									<div class="ms-3">
										<h6 class="mb-0 text-white">Gagal!</h6>
										<div class="text-white"><?= $pesan ?></div>
									</div>
								</div>
								<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
							</div>
						<?php } else if ($pesan != '' && $success == true) { ?>
							<div class="alert alert-success border-0 bg-success alert-dismissible fade show py-2">
								<div class="d-flex align-items-center">
									<div class="font-35 text-white"><i class='bx bxs-message-square-x'></i>
									</div>
									<div class="ms-3">
										<h6 class="mb-0 text-white">Berhasil!</h6>
										<div class="text-white"><?= $pesan ?></div>
									</div>
								</div>
								<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
							</div>

						<?php } ?>
						<div class="card">
							<div class="card-body">
								<div class="border p-4 rounded">
									<div class="form-body">
										<form class="row g-3" method="POST" id="FormSignup" action="Signup/add_signup">
											<div class="col-12">
												<input type="text" class="form-control" id="full_name" name="full_name" placeholder="Nama Lengkap" value="<?= old('full_name'); ?>">
												<div class="invalid-feedback"></div>
											</div>
											<div class="col-12">
												<input type="email" class="form-control" id="email" name="email" placeholder="Email" value="<?= old('email'); ?>">
												<div class="invalid-feedback"></div>
											</div>
											<div class="col-12">
												<input type="password" class="form-control" name="user_password" id="user_password" placeholder="Masukkan Password" value="<?= old('user_password'); ?>">
												<!-- <div class="input-group" id="show_hide_password"> -->
												<!-- <input type="password" class="form-control border-end-0" name="user_password" id="user_password" placeholder="Masukkan Password"> <a href="javascript:;" class="input-group-text bg-transparent"><i class='bx bx-hide'></i></a> -->
												<!-- </div> -->
											</div>
											<div class="col-12">
												<input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Masukkan Konfirmasi Password" value="<?= old('confirm_password'); ?>">
											</div>


											<div class="col-12">
												<div class="d-grid">
													<button type="submit" class="btn btn-primary">Sign Up</button>
												</div>
											</div>

										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--end row-->
			</div>
		</div>
	</div>
	<!--end wrapper-->
	<!-- Bootstrap JS -->
	<script src="<?= base_url() ?>/assets/admin/js/bootstrap.bundle.min.js"></script>
	<!--plugins-->
	<script src="<?= base_url() ?>/assets/admin/js/jquery.min.js"></script>
	<script src="<?= base_url() ?>/assets/admin/plugins/simplebar/js/simplebar.min.js"></script>
	<script src="<?= base_url() ?>/assets/admin/plugins/metismenu/js/metisMenu.min.js"></script>
	<script src="<?= base_url() ?>/assets/admin/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
	<!--Password show & hide js -->
	<script>
		$(document).ready(function() {
			$("#show_hide_password a").on('click', function(event) {
				event.preventDefault();
				if ($('#show_hide_password input').attr("type") == "text") {
					$('#show_hide_password input').attr('type', 'password');
					$('#show_hide_password i').addClass("bx-hide");
					$('#show_hide_password i').removeClass("bx-show");
				} else if ($('#show_hide_password input').attr("type") == "password") {
					$('#show_hide_password input').attr('type', 'text');
					$('#show_hide_password i').removeClass("bx-hide");
					$('#show_hide_password i').addClass("bx-show");
				}
			});
		});
	</script>
	<!--app JS-->
	<script src="<?= base_url() ?>/assets/admin/js/app.js"></script>
	<script src="<?php echo base_url() ?>/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>

	<script src="/assets/myjs/Signup.js"></script>
</body>

</html>