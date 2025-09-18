<div class="card-body" id="experienceku">
    <!-- <form class="form-horizontal" role="form" method="post" id="FormExperience" action="<?php echo site_url('Register/add_experience') ?>"> -->
    <div class="after-add-more-experience" id="experience1">
        <?php $jumlah_experience = 1; ?>

        <div class="tambahan_<?= $jumlah_experience; ?>">
            <form class="form-horizontal" role="form" method="post" id="FormExperience_<?= $jumlah_experience; ?>" action="<?php echo site_url("Certificant/add_experience/" . $jumlah_experience) ?>">

                <?= csrf_field() ?>

                <div class="alert alert-error" style="display:none;">
                    <button class="close" data-dismiss="alert"></button>
                    You have some form errors. Please check below.
                </div>
                <div class="form-body">

                    <input type="hidden" id="user_id_1" name="user_id_1">
                    <input type="hidden" id="id_<?= $jumlah_experience; ?>" name="id_<?= $jumlah_experience; ?>">
                    <div class="form-group row">
                        <label class="col-sm-2 control-label" style="text-align:right">Company Name</label>
                        <div class="col-sm-4">
                            <input type="text" name="company_name_<?= $jumlah_experience; ?>" id="company_name_<?= $jumlah_experience; ?>" class="form-control" placeholder="Silahkan isi nama perusahaan">
                        </div>
                        <div class="col-md-6">
                            <span class="btn btn-circle green float-right add-more-experience"><strong><strong> +</strong></strong></span>';
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 control-label" style="text-align:right">Company Address</label>
                        <div class="col-sm-4">
                            <textarea name="company_addres_<?= $jumlah_experience; ?>" id="company_addres_<?= $jumlah_experience; ?>" class="form-control" placeholder="Silahkan isi alamat perusahaan"></textarea>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-2 control-label" style="text-align:right">Departement</label>
                        <div class="col-md-4">
                            <select id="departement_id_<?= $jumlah_experience; ?>" name="departement_id_<?= $jumlah_experience; ?>" class="form-control" placeholder="Silahkan pilih departement/divisi">
                                <option value="">Please Select</option>
                                <?php foreach ($departement_ids as $departement_id) : ?>
                                    <option value="<?php echo $departement_id['code_value'] ?>"><?php echo $departement_id['code_description']  ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 control-label" style="text-align:right">Position</label>
                        <div class="col-sm-4">
                            <input type="text" name="position_<?= $jumlah_experience; ?>" id="position_<?= $jumlah_experience; ?>" class="form-control" placeholder="Silahkan isi jabatan sekarang/terakhir">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>
                        <div class="col-sm-4">
                            <div class="input-group">
                                <input type="date" name="start_date_experience_<?= $jumlah_experience; ?>" id="start_date_experience_<?= $jumlah_experience; ?>" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 control-label" style="text-align:right">End Date</label>
                        <div class="col-sm-4">
                            <div class="input-group">
                                <input type="date" name="end_date_experience_<?= $jumlah_experience; ?>" id="end_date_experience_<?= $jumlah_experience; ?>" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 control-label" style="text-align:right">Upload Reference Letter</label>
                        <div class="col-sm-4">
                            <input class="form-control" type="file" id="doc_path_experience_<?= $jumlah_experience; ?>" name="doc_path_experience_<?= $jumlah_experience; ?>" accept="application/pdf,image/*" placeholder="Silahkan upload surat referensi">
                        </div>
                        <div class="com-sm-2">
                            <a id="btn_preview_<?= $jumlah_experience; ?>" name="btn_preview_<?= $jumlah_experience; ?>" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                        </div>
                    </div>


                    <div class="form-actions">
                        <div class="form-group row">
                            <label class="col-md-2 control-label"></label>
                            <div class="col-md-4">
                                <button class="btn btn-circle blue" id="btn_save_<?= $jumlah_experience; ?>"><i class="fa fa-save"></i> Save</button>
                                <button class="btn btn-circle yellow" type="reset" id="btn_edit_<?= $jumlah_experience; ?>" disabled><i class="fa fa-edit"></i> Edit</button>
                                <button class="btn btn-circle red" type="reset" id="btn_delete_<?= $jumlah_experience; ?>" disabled><i class="fa fa-trash"></i> Delete</button>
                            </div>
                        </div>
                    </div>

                    <hr>


                </div>
            </form>
        </div>

    </div>

    <script>
        var jumlah_experience = <?= $jumlah_experience; ?>;
    </script>

</div>