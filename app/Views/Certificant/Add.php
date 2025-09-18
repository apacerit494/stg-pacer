<div class="card card-info" id="add" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">Add Certificant</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->


    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('Certificant/add_user') ?>">

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
                        <input type="text" name="full_name" id="full_name" class="form-control" required placeholder="Silahkan isi nama lengkap sesuai KTP">
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
                        <input type="date" name="birth_date" id="birth_date" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Gender</label>
                    <div class="col-md-3">
                        <div>
                            <select class="form-control single-select" id="gender" name="gender" data-placeholder="Silahkan pilih jenis kelamin">
                                <option value="">Please Select</option>
                                <option value="P">Pria</option>
                                <option value="W">Wanita</option>
                            </select>
                        </div>
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
                        <div>
                            <select class="form-control single-select" id="province_id" name="province_id" data-placeholder="Silahkan pilih propinsi">
                                <option value="">Please Select</option>
                                <?php foreach ($provinces as $province) : ?>
                                    <option value="<?php echo $province['province_id'] ?>"><?php echo $province['province_name']  ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">District</label>
                    <div class="col-md-3">
                        <div>
                            <select class="form-control single-select" id="district_id" name="district_id" data-placeholder="Silahkan pilih kabupaten/kota">

                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Sub District</label>
                    <div class="col-md-3">
                        <div>
                            <select class="form-control single-select" id="subdistrict_id" name="subdistrict_id" data-placeholder="Silahkan pilih kecamatan">

                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">Village</label>
                    <div class="col-md-3">
                        <div>
                            <select class="form-control single-select" id="village_id" name="village_id" data-placeholder="Silahkan pilih kelurahan/desa">

                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">User Name</label>
                    <div class="col-sm-3">
                        <input type="text" name="username" id="username" class="form-control" placeholder="Silahkan isi username">
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
                        <input type="text" name="phone" id="phone" class="form-control" placeholder="Silahkan isi nomor telp rumah">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-md-2 control-label" style="text-align:right">User Type</label>
                    <div class="col-md-3">
                        <div>
                            <select class="form-control single-select" id="user_type_id" name="user_type_id" data-placeholder="Silahkan pilih tipe pengguna">
                                <option value="">Please Select</option>
                                <?php foreach ($user_types as $user_type) : ?>
                                    <option value="<?php echo $user_type['role_id'] ?>"><?php echo $user_type['role_name']  ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
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
                        <input class="form-control" type="file" id="doc_idcard_path" name="doc_idcard_path">
                    </div>
                </div>
                <!-- <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">User Name</label>
                    <div class="col-sm-3">
                        <input type="text" name="user_name" id="user_name" class="form-control" placeholder="Silahkan isi user name">
                    </div>
                </div> -->
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
    <!-- /.card-body -->

    <!-- /.card-footer -->

</div>


<!-- /.card -->