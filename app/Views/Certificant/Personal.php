<div class="card-body" id="personalku">
    <form class="form-horizontal" role="form" method="post" id="FormPersonal" action="<?php echo site_url('Certificant/edit_personal') ?>"> <?= csrf_field() ?>

        <div class="alert alert-error" style="display:none;">
            <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
            <button class="close" data-dismiss="alert"></button>
            You have some form errors. Please check below.
        </div>

        <div class="form-body">
            <input type="hidden" id="user_id" name="user_id">
            <input type="hidden" id="text_preview" name="text_preview">
            <input type="hidden" id="old_password" name="old_password">
            <div class="form-group row">
                <label class="col-sm-2 control-label" for="full_name" style="text-align:right">Full Name</label>
                <div class="col-sm-3">
                    <input type="text" name="full_name" id="full_name" class="form-control">
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Birth Place</label>
                <div class="col-sm-3">
                    <input type="text" name="birth_place" id="birth_place" class="form-control" placeholder="Silahkan isi tempat lahir">
                </div>
            </div>
            <div class=" form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Birth Date</label>
                <div class="col-sm-3">
                    <input type="date" name="birth_date" id="birth_date" class="form-control">
                </div>
                <label class="col-md-2 control-label" style="text-align:right">Gender</label>
                <div class="col-md-3">
                    <div>
                        <select class="form-control" id="gender" name="gender" data-placeholder="Silahkan pilih jenis kelamin">
                            <option value="">Please Select</option>
                            <?php foreach ($genders as $gender) : ?>
                                <option value="<?= $gender['code_value']; ?>"><?= $gender['code_description']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Address</label>
                <div class="col-sm-3">
                    <textarea name="address" id="address" class="form-control" placeholder="Silahkan isi alamat"></textarea>
                </div>
                <label class="col-md-2 control-label" style="text-align:right">Province</label>
                <div class="col-md-3">
                    <div>
                        <select class="form-control single-select" id="province_id" name="province_id" data-placeholder="Silahkan pilih propinsi">
                            <option value="">Please Select</option>
                            <?php foreach ($provinces as $province) : ?>
                                <option value="<?= $province['province_id']; ?>"><?= $province['province_name']; ?></option>
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
                    <input type="text" class="form-control" id="village_id" name="village_id" data-placeholder="Silahkan pilih kelurahan/desa">
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">User Name</label>
                <div class="col-sm-3">
                    <input type="text" name="username" id="username" class="form-control">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Email</label>
                <div class="col-sm-3">
                    <input type="email" name="email" id="email" class="form-control">
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Mobile Phone</label>
                <div class="col-sm-3">
                    <input type="text" name="mobile_phone" id="mobile_phone" class="form-control">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Phone</label>
                <div class="col-sm-3">
                    <input type="text" name="phone" id="phone" class="form-control" placeholder="Silahkan isi nomor telp rumah">
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">ID Card Number</label>
                <div class="col-sm-3">
                    <input type="text" name="idcard_number" id="idcard_number" class="form-control" placeholder="Silahkan isi nomor KTP">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Password</label>
                <div class="col-sm-3">
                    <input type="password" name="user_password" id="user_password" class="form-control" placeholder="Silahkan isi password">
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Confirm Password</label>
                <div class="col-sm-3">
                    <input type="password" name="confirm_password" id="confirm_password" class="form-control" placeholder="Silahkan isi lagi passwordnya">
                </div>
                <div class="col-sm-2 check_password" style="margin-top:10px; display:none">
                    <input type="checkbox" id="check_password" name="check_password[]" style="color:blue"> Save Password<br>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Doc ID Card Path</label>
                <div class="col-sm-3">
                    <input class="form-control" type="file" accept="application/pdf,image/*" id="doc_idcard_path" name="doc_idcard_path">
                </div>
                <div class="com-sm-2">
                    <a id="btn_preview" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                </div>
            </div>


            <!-- batas -->
            <hr>
            <div class="form-actions">
                <div class="form-group row">
                    <label class="col-md-2 control-label"></label>
                    <div class="col-md-4">
                        <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                        <button class="btn btn-circle yellow" type="button" id="btn_edit" disabled><i class="fa fa-edit"></i> Edit</button>
                    </div>
                </div>
            </div>
            <!-- End of Data  -->
        </div>
    </form>
    <script>
        //var user_id = "";
    </script>

</div>