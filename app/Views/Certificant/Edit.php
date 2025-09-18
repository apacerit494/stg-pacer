<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">Edit Certificant</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Certificant/edit_user') ?>">
            <?= csrf_field() ?>
            <input type="hidden" id="user_id" name="user_id">
            <input type="hidden" id="account_name_parent" name="account_name_parent">
            <div class="alert alert-error" style="display:none;">
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Full Name</label>
                    <div class="col-sm-3">
                        <input type="text" name="full_name" id="full_name" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Birth Place</label>
                    <div class="col-sm-3">
                        <input type="text" name="birth_place" id="birth_place" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Birth Date</label>
                    <div class="col-sm-3">
                        <input type="date" name="birth_date" id="birth_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Gender</label>
                    <div class="col-sm-3">
                        <select id="gender" name="gender" class="form-control">
                            <option value="">Please Select</option>
                            <option value="P">Pria</option>
                            <option value="W">Wanita</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Address</label>
                    <div class="col-sm-3">
                        <textarea name="address" id="address" class="form-control"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Province</label>
                    <div class="col-md-3">
                        <select class="form-control single-select" id="province_id" name="province_id">

                        </select>

                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">District</label>
                    <div class="col-md-3">
                        <select class="form-control single-select" id="district_id" name="district_id">

                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Sub District</label>
                    <div class="col-md-3">
                        <select class="form-control single-select" id="subdistrict_id" name="subdistrict_id">

                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Village</label>
                    <div class="col-md-3">
                        <select class="form-control single-select" id="village_id" name="village_id">

                        </select>
                    </div>
                </div>


                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Email</label>
                    <div class="col-sm-3">
                        <input type="email" name="email" id="email" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Mobile Phone</label>
                    <div class="col-sm-3">
                        <input type="text" name="mobile_phone" id="mobile_phone" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Phone</label>
                    <div class="col-sm-3">
                        <input type="text" name="phone" id="phone" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">User Type</label>
                    <div class="col-md-3">
                        <select id="user_type_id" name="user_type_id" class="form-control">
                            <option value="">Please Select</option>
                            <?php foreach ($user_types as $user_type) : ?>
                                <option value="<?php echo $user_type['role_id'] ?>"><?php echo $user_type['role_name']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">ID Card Number</label>
                    <div class="col-sm-3">
                        <input type="text" name="idcard_number" id="idcard_number" class="form-control">
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Doc ID Card Path</label>
                    <div class="col-sm-">
                        <input class="form-control" type="file" id="doc_idcard_path" name="doc_idcard_path">
                    </div>
                </div>
                <!-- <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">User Name</label>
                    <div class="col-sm-3">
                        <input type="text" name="user_name" id="user_name" class="form-control">
                    </div>

                </div> -->
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">User Password</label>
                    <div class="col-sm-3">
                        <input type="password" name="user_password" id="user_password" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Confirm Password</label>
                    <div class="col-sm-3">
                        <input type="password" name="confirm_password" id="confirm_password" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Note</label>
                    <div class="col-sm-3">
                        <textarea name="note" id="note" class="form-control" placeholder="Silahkan isi catatan"></textarea>
                    </div>
                </div>

                <hr>
                <div class="form-actions">
                    <div class="form-group row">
                        <label class="col-md-2 control-label"></label>
                        <div class="col-md-4">
                            <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Submit</button>
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