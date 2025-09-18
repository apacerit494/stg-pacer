<div class="card-body" id="personalku">
    <form class="form-horizontal" role="form" method="post" id="FormPersonal" enctype="multipart/form-data" action="<?php echo site_url('Register/edit_personal') ?>"> <?= csrf_field() ?>

        <div class="alert alert-error" style="display:none;">
            <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
            <button class="close" data-dismiss="alert"></button>
            You have some form errors. Please check below.
        </div>

        <div class="form-body">
            <input type="hidden" id="text_preview" name="text_preview" value="<?= $users['doc_idcard_path']; ?>">
            <div class="form-group row">
                <label class="col-sm-2 control-label" for="full_name" style="text-align:right">Full Name</label>
                <div class="col-sm-3">
                    <input type="text" name="full_name" id="full_name" class="form-control" value="<?= $users['full_name']; ?>" disabled>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Birth Place</label>
                <div class="col-sm-3">
                    <input type="text" name="birth_place" id="birth_place" class="form-control" value="<?= $users['birth_place']; ?>" placeholder="Silahkan isi tempat lahir" disabled>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Birth Date</label>
                <div class="col-sm-3">
                    <input type="date" name="birth_date" id="birth_date" class="form-control" value="<?= $users['birth_date']; ?>" disabled>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Gender</label>
                <div class="col-sm-3">
                    <div>
                        <select class="form-control" id="gender" name="gender" value="<?= $users['gender']; ?>" data-placeholder="Silahkan pilih jenis kelamin" disabled>
                            <option value="">Please Select</option>
                            <option value="P" <?= $users['gender'] == "P" ? " selected" : "" ?>>Pria</option>
                            <option value="W" <?= $users['gender'] == "W" ? " selected" : "" ?>>Wanita</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Address</label>
                <div class="col-sm-3">
                    <textarea name="address" id="address" class="form-control" placeholder="Silahkan isi alamat" disabled><?= $users['address']; ?></textarea>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Province</label>
                <div class="col-sm-3">
                    <div>
                        <select class="form-control single-select" id="province_id" name="province_id" data-placeholder="Silahkan pilih propinsi" value="<?= $users['province_id'] ?>" disabled>
                            <option value="">Please Select</option>
                            <?php foreach ($provinces as $province) : ?>
                                <option value="<?php echo $province['province_id'] ?>" <?= ($users['province_id'] == $province['province_id']) ? " selected" : "" ?>><?php echo $province['province_name']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">District</label>
                <div class="col-sm-3">
                    <div>
                        <select class="form-control single-select" id="district_id" name="district_id" value="<?= $users['district_id']; ?>" data-placeholder="Silahkan pilih kabupaten/kota" disabled>
                            <option value="">Please Select</option>
                            <?php foreach ($districts as $district) : ?>
                                <option value="<?php echo $district['district_id'] ?>" <?= ($users['district_id'] == $district['district_id']) ? " selected" : "" ?>><?php echo $district['district_name']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Sub District</label>
                <div class="col-sm-3">
                    <div>
                        <select class="form-control single-select" id="subdistrict_id" name="subdistrict_id" value="<?= $users['subdistrict_id']; ?>" data-placeholder="Silahkan pilih kecamatan" disabled>
                            <option value="">Please Select</option>
                            <?php foreach ($subdistricts as $subdistrict) : ?>
                                <option value="<?php echo $subdistrict['subdistrict_id'] ?>" <?= ($users['subdistrict_id'] == $subdistrict['subdistrict_id']) ? " selected" : "" ?>><?php echo $subdistrict['subdistrict_name']  ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Village</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="village_id" name="village_id" value="<?= $users['village_id']; ?>" placeholder="Silahkan isi nama desa" disabled>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Username</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="username" name="username" value="<?= $users['username']; ?>" disabled>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Email</label>
                <div class="col-sm-3">
                    <input type="email" name="email" id="email" class="form-control" value="<?= $users['email']; ?>" disabled>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">Mobile Phone</label>
                <div class="col-sm-3">
                    <input type="text" name="mobile_phone" id="mobile_phone" class="form-control" value="<?= $users['mobile_phone']; ?>" disabled>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Phone</label>
                <div class="col-sm-3">
                    <input type="text" name="phone" id="phone" class="form-control" value="<?= $users['phone']; ?>" placeholder="Silahkan isi nomor telp rumah" disabled>
                </div>
                <label class="col-sm-2 control-label" style="text-align:right">ID Card Number</label>
                <div class="col-sm-3">
                    <input type="text" name="idcard_number" id="idcard_number" value="<?= $users['idcard_number']; ?>" class="form-control" placeholder="Silahkan isi nomor KTP" disabled>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 control-label" style="text-align:right">Doc ID Card Path</label>
                <div class="col-sm-3">
                    <input class="form-control" type="file" accept="application/pdf,image/*" id="doc_idcard_path" name="doc_idcard_path" disabled>
                </div>
                <div class="com-sm-2">
                    <a id="btn_preview" class="btn btn-primary" href="<?= $users['doc_idcard_path'] == '' || $users['doc_idcard_path'] == null ? 'javascript:' : base_url() . $users['doc_idcard_path'] ?>" target="_blank">Preview</a>
                </div>
            </div>
            <img id="output" />

            <!-- batas -->
            <hr>
            <?php if ($status == '0') { ?>
                <div class="form-actions">
                    <div class="form-group row">
                        <label class="col-md-2 control-label"></label>
                        <div class="col-md-4">
                            <button class="btn btn-circle blue" id="btn_save" disabled><i class="fa fa-save"></i> Save</button>
                            <button class="btn btn-circle yellow" type="button" id="btn_edit"><i class="fa fa-edit"></i> Edit</button>
                        </div>
                    </div>
                </div>
            <?php } ?>
            <!-- End of Data  -->

        </div>

    </form>

    <script>
        var jk_province = <?= $users['province_id']; ?>;
        var jk_district = <?= $users['district_id'];  ?>;
        var jk_subdistrict = <?= $users['subdistrict_id']; ?>;
    </script>

</div>