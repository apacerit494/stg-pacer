<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">EDIT USER SETUP</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Settings/edit_user_setup') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="id" name="id">
            <input type="hidden" id="old_password" name="old_password">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Full Name</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="full_name" name="full_name" maxlength="50" value="<?= old('fullname'); ?>">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Gender</label>
                            <div class="col-md-6">
                                <select id="gender" name="gender" class="form-control" value="<?= old('role_id'); ?>">
                                    <option value="">Please Select</option>
                                    <?php foreach ($genders as $gender) : ?>
                                        <option value="<?php echo $gender['code_value'] ?>"><?php echo $gender['code_description'] ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">User Name</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="username" name="username" maxlength="30">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Email</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="email" name="email" maxlength="50" disabled>
                            </div>
                        </div>
                        <div class=" form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Mobile Phone</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="mobile_phone" name="mobile_phone" maxlength="50">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">User Role</label>
                            <div class="col-md-6">
                                <select id="user_type_id" name="user_type_id" class="form-control">
                                    <option value="">Please Select</option>
                                    <?php foreach ($user_roles as $user_role) : ?>
                                        <option value="<?php echo $user_role['role_id'] ?>"><?php echo $user_role['role_name'] ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class=" form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Password</label>
                            <div class="col-md-6">
                                <input class="form-control" type="password" id="password2" name="password2" maxlength="50">
                            </div>
                        </div>
                        <div class=" form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Confirm Password</label>
                            <div class="col-md-6">
                                <input class="form-control" type="password" id="confirm_password" name="confirm_password" maxlength="50">
                            </div>
                        </div>
                        <div class=" form-group row">
                            <label class="col-md-4 control-label" style="text-align:right"></label>
                            <div class="col-md-6">
                                <input type="checkbox" id="check_password" name="check_password[]" style="color:blue"> Save Password<br>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Status</label>
                            <div class="col-md-6">
                                <select id="status" name="status" class="form-control" value="<?= old('status'); ?>">
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak AKtif</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">NPWP</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="npwp" name="npwp" maxlength="25">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Bank Name</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="bank_name" name="bank_name" maxlength="100">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Account Number</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="account_number" name="account_number" maxlength="25">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-md-4 control-label" style="text-align:right">Account Name</label>
                            <div class="col-md-6">
                                <input class="form-control" type="text" id="account_name" name="account_name" maxlength="100">
                            </div>
                        </div>
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