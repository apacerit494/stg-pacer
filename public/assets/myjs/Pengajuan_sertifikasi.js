$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd_'), FormComment = $('#FormComment');
    var sertifikasiku = $('#sertifikasiku');
    var sisa_sertifikasi = jumlah_sertifikasi - 1;
    let jumlah_tambah = $('#jumlah_tambah').val();
    let jumlah_batas = $('#jumlah_batas').val();


    /*FORM ACTIONS*/
    /*BEGIN ADD*/

    /** surat_persetujuan change*/
    jumsur = jumlah_sertifikasi + 1;
    for (let jumedu = 1; jumedu <= jumsur; jumedu++) {
        $('#surat_persetujuan_' + jumedu, sertifikasiku).change(function (e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('btn_preview_' + jumedu, sertifikasiku);
                output.href = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
            // alert($(this).val());
            $('#text_surat_persetujuan_' + jumedu, sertifikasiku).val($(this).val());
        });
    }
    
    $('#btn_cancel', FormAdd).click(function () {
        $('#add').hide();
        $('#jqgrid').show();
        $('.alert-error', FormAdd).hide();
        FormAdd.trigger('reset');
        $('.error', FormAdd).removeClass('error');
        $('.is-valid', FormAdd).removeClass('is-valid');
        $('.is-invalid', FormAdd).removeClass('is-invalid');
    })

    var fill_multi_select_asli = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect, disabled) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/getdatatoarray',
            data: {
                table: stable1,
                field: sfield1,
                param: sparam
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/getdatatoarray2',
                    data: {
                        table: stable2,
                        field1: sfield2a,
                        field2: sfield2b
                    },
                    dataType: "json",
                    success: function (response) {
                        opt = '<option value="">Please Select</option>';
                        var check = false;
                        for (i in response) {
                            for (j in response2) {
                                if (response[i].id == response2[j].id) {
                                    check = true;
                                }
                            }
                            if (check == true) {
                                opt += '<option value="' + response[i].id + '"  " selected " ' + disabled + '>' + response[i].name + '</option>';
                            } else {
                                opt += '<option value="' + response[i].id + '"  ' + disabled + '>' + response[i].name + '</option>';

                            }
                            check = false;
                        }
                        sselect.html(opt);
                    }
                });
            }
        });
    }

    var fill_multi_select = function (stable1, sfield1, sparam, scope_id, sselect, disabled) {
        $.ajax({
            type: "POST",
            async: false,
            url: site_url + '/Certification/getdatatoarray',
            data: {
                table: stable1,
                field: sfield1,
                param: sparam
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                $.ajax({
                    type: "POST",
                    async: false,
                    url: site_url + '/Certification/get_fieldcodes',
                    data: {
                        scope_id: scope_id
                    },
                    dataType: "json",
                    success: function (response) {
                        opt = '<option value="">Please Select</option>';
                        var check = false;
                        for (i in response) {
                            for (j in response2) {
                                if (response[i].fieldcode_id == response2[j].id) {
                                    check = true;
                                }
                            }
                            if (check == true) {
                                opt += '<option value="' + response[i].fieldcode_id + '"  " selected " ' + disabled + '>' + response[i].fieldcode_code + ' - ' + response[i].fieldcode_description + '</option>';
                            } else {
                                opt += '<option value="' + response[i].fieldcode_id + '"  ' + disabled + '>' + response[i].fieldcode_code + ' - ' + response[i].fieldcode_description + '</option>';

                            }
                            check = false;
                        }
                        sselect.html(opt).trigger('click');
                    }
                });
            }
        });
    }

    $('#btn_edit,add').click(function (e) {
        e.preventDefault();
        caption_edit = $('#btn_edit,add').text();
        status_certification = $('#status,add').val();
        if (caption_edit.trim() == 'Edit') {
            if (status_certification == '0') {
                disabled_form('enabled');
            } else if (status_certification == '1') {
                Template.WarningAlert('Pengajuan sertifikasi anda tidak bisa diedit karena sedang dalam penilaian');
            }
        } else {
            disabled_form('disabled');
        }
    });

    var disabled_form = function (disabled) {
        if (disabled == 'enabled') {
            $('#btn_edit', add).html('<i class="fa fa-undo"></i> Cancel');
            $('#btn_save', add).removeAttr('disabled', 'disabled')
            $('#btn_draft', add).removeAttr('disabled', 'disabled')
            $('#scope_id', add).removeAttr('disabled', 'disabled')
            $('#fieldcode_id', add).removeAttr('disabled', 'disabled')
            $('#certification_type_id', add).removeAttr('disabled', 'disabled')
            $('#fieldcode_id', add).removeAttr('disabled', 'disabled')
            $('#fieldcode_id', add).removeAttr('disabled', 'disabled')
            $('#level_auditor', add).removeAttr('disabled', 'disabled')
        } else {
            $('#btn_edit', add).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_save', add).attr('disabled', 'true');
            $('#btn_draft', add).attr('disabled', 'true');
            $('#scope_id', add).attr('disabled', 'true');
            $('#fieldcode_id', add).attr('disabled', 'disabled');
            $('#certification_type_id', add).attr('disabled', 'true');
            $('#fieldcode_id', add).attr('disabled', 'true');
            $('#level_auditor', add).attr('disabled', 'true');
        }
    }

    FormComment.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: true, // do not focus the last invalid input
        errorPlacement: function (error, element) {
            if (element.prop('class') === 'form-control single-select') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },

        ignore: "",
        rules: {
            comment: { required: true }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormComment).show();
            Template.scrollTo($('.alert-error', FormComment), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormComment.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        html = "";
                        var date = new Date();
                        tahun = date.getFullYear();
                        bulan = date.getMonth();
                        tanggal = date.getDate();
                        jam = date.getHours();
                        menit = date.getMinutes();
                        detik = date.getSeconds();
                        comment_date = tahun + '-' + bulan + '-' + tanggal + ' ' + jam + ':' + menit + ':' + detik;
                        comment = $('#comment', FormComment).val();
                        if (user_type == '5') {
                            html += '<div class="direct-chat-msg right">';
                            html += '    <div class="direct-chat-infos clearfix">';
                            html += '        <span class="direct-chat-name float-right">' + $('#full_name', FormComment).val() + '</span>';
                            html += '        <span class="direct-chat-timestamp float-left">' + comment_date + '</span>';
                            html += '    </div>';
                            html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                            html += '    <div class="direct-chat-text">';
                            html += comment;
                            html += '    </div>';
                            html += '</div>';
                        } else {
                            html += '<div class="direct-chat-msg ">';
                            html += '    <div class="direct-chat-infos clearfix">';
                            html += '        <span class="direct-chat-name float-left">' + $('#full_name', FormComment).val() + '</span>';
                            html += '        <span class="direct-chat-timestamp float-right">' + comment_date + '</span>';
                            html += '    </div>';
                            html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                            html += '    <div class="direct-chat-text">';
                            html += comment;
                            html += '    </div>';
                            html += '</div>';

                        }
                        $(".tambahan", FormComment).append(html).children(':last');
                        FormComment.trigger('reset');

                        //  $('#doc_path_education_' + jumlah_sertifikasi).parents(".tambahan_" + jumlah_sertifikasi).remove();


                    } else {
                        Template.WarningAlert(response.error);
                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    });
    
    
        

    /** button submit */

    for (let ijupeng = 1; ijupeng < jumlah_sertifikasi + 2; ijupeng++) {
        $('#btn_save_' + ijupeng, $('#FormAdd_' + ijupeng)).click(function () {

            button_spin('save', ijupeng, true);

            id = $('#id_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            certification_number = $('#certification_number_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            scope_id = $('#scope_id_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            check_syarat = $('#check_syarat_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            user_id = $('#user_id_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            voucher_code = $('#voucher_code_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            text_surat_persetujuan = $('#text_surat_persetujuan_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            surat_persetujuan = $('#surat_persetujuan_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            
            
            data_ke=ijupeng;
            let msg = "";

            // var checkbox = $('.scopean', $('#FormAdd_' + ijupeng));
            // var scope_id = [];
            // for (var i = 0; i < checkbox.length; i++) {
            //     if (checkbox[i].checked) {
            //         scope_id[i] = checkbox[i].value;
            //     }
            // }


            // if (scope_id.length < 1) {
            //     msg += 'Mohon pilih scope \n';
            // }


            if (scope_id.length == "") {
                msg += '- Mohon pilih scope \n';
            }

            if (text_surat_persetujuan == "") {
                msg += '<br>- Mohon lampirkan surat persetujuan \n';
            }


            field_code_id = $('#fieldcode_id_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            //alert(field_code_id);
            if (field_code_id == null) {
                msg += '<br>- Mohon pilih Field Code \n';
            }



            // var checkbox2 = $('.typean', $('#FormAdd_' + ijupeng));
            // var certification_type_id = [];
            // for (var i = 0; i < checkbox2.length; i++) {
            //     if (checkbox2[i].checked) {
            //         certification_type_id[i] = checkbox2[i].value;
            //     }
            // }

            // if (certification_type_id.length < 1) {
            //     msg += 'Mohon pilih Certification Type \n';
            // }

            certification_type_id = $('#certification_type_id_' + ijupeng, $('#FormAdd_' + ijupeng)).val();

            cost = $('#cost_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            level_auditor = $('#level_auditor_' + ijupeng, $('#FormAdd_' + ijupeng)).val();
            if (level_auditor == '') {
                msg += '<br>- Mohon pilih Level AUditor \n';
            }

            var syarat = $('input[id=check_syarat_' + ijupeng + ']:checked');
            if (syarat.length == 0) {
                msg += '<br>- Silahkan baca dan setujui Surat Persetujuan dan Perjanjian Sertifikasi \n';

            }

            //
            var fileInput = document.getElementById('surat_persetujuan_' + ijupeng);
            var file = fileInput.files[0];
            
            // Buat objek FormData
            var formData = new FormData();
            //alert(field_code_id);
               
            var fieldCodeIdJSON = JSON.stringify(field_code_id);
            // alert(fieldCodeIdJSON);
            //   var fieldCodeIdString = field_code_id.join(',');
            //   alert(fieldCodeIdString);

            // field_code_id.forEach(function(value, index) {
            //     formData.append('field_code_id[]', value);
            // });
           
            formData.append('id', id);
            formData.append('certification_number', certification_number);
            formData.append('user_id', user_id);
            formData.append('scope_id', scope_id);
            formData.append('certification_type_id', certification_type_id);
            formData.append('cost', cost);
            formData.append('voucher_code', voucher_code);
            formData.append('level_auditor', level_auditor);
            formData.append('data_ke', data_ke);
            formData.append('text_surat_persetujuan', text_surat_persetujuan);
            formData.append('field_code_id', fieldCodeIdJSON);
            
            // Tambahkan file ke FormData
            formData.append('surat_persetujuan', file);
            
            //

            if (msg == "") {

                $.confirm({
                    title: "Submit", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Apakah data sudah benar ?',
                    confirmButtonClass: 'btn green',
                    // confirmButtonCaption: 'Yes',
                    cancelButtonClass: 'btn red',
                    // cancelButtonText: 'No',
                    confirmButtonClass: 'btn green',
                    confirmButton: 'Yes',
                    cancelButton: 'No',
                    cancelButtonClass: 'btn red',
                    confirm: function () {
                        $.ajax({
                            type: "POST", dataType: "json", 
                           
                            // data: {
                            //     id: id,
                            //     certification_number: certification_number,
                            //     user_id: user_id,
                            //     scope_id: scope_id,
                            //     field_code_id: field_code_id,
                            //     certification_type_id: certification_type_id,
                            //     cost: cost,
                            //     voucher_code: voucher_code,
                            //     level_auditor: level_auditor,
                            //     data_ke:data_ke
                            //     //,
                            //     //text_surat_persetujuan: text_surat_persetujuan,
                            //     //surat_persetujuan: file
                                
                                
                            // },
                            //data: $(form).serialize(),
                            
                            processData: false, // Jangan proses data secara otomatis
                            contentType: false, // Jangan mengatur jenis konten secara otomatis
                            data :formData,
                            async: false,
                            url: site_url + '/Certification/submit_pengajuan_sertifikasi/' + ijupeng,
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Pengajuan sertifikasi success.',
                                        confirmButtonClass: 'btn green',
                                        confirm: function () {
                                            $('#userfile').val('');
                                            $('#btn_cancel', FormAdd).trigger('click');
                                            $('#jqgrid_data').trigger('reloadGrid');
                                            $('#certification_number_' + ijupeng, $('#FormAdd_' + ijupeng)).val(response.certification_number);
                                            $('#certification_id', FormComment).val(response.certification_id);
                                            disabled_form_sertifikasi('disabled', ijupeng);
                                            var class_a = $(".form-control");
                                            for (var i = 0; i < class_a.length; i++) {
                                                class_a[i].classList.remove("is-valid");
                                            }
                                            button_spin('save', ijupeng, false);

                                           window.location.reload();
                                        }
                                    })
                                } else {
                                    Template.WarningAlert(response.msg);
                                    (response.fieldcode_id == '1') ? $('#fieldcode_id', $('#FormAdd_')).addClass('is-invalid') : "";
                                    (response.certification_type_id == '1') ? $('#certification_type_id', $('#FormAdd_')).addClass('is-invalid') : "";
                                    (response.scope_id == '1') ? $('#scope_id', $('#FormAdd_')).addClass('is-invalid') : "";
                                    (response.level_auditor == '1') ? $('#level_auditor', $('#FormAdd_')).addClass('is-invalid') : "";

                                    button_spin('save', ijupeng, false);
                                }
                            },
                            error: function () {
                                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                                button_spin('save', ijupeng, false);
                            }
                        })
                    },
                    cancel: function () {
                        button_spin('save', ijupeng, false);
                    }

                })
            } else {
                Template.WarningAlert(msg);
                button_spin('save', ijupeng, false);
            }


        });
    }

    var button_spin = function (button, ijupeng, isSpin) {
        if (button == 'save') {
            if (isSpin == true) {
                $('#btn_save_' + ijupeng).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Submitting.....');
                $('#btn_save_' + ijupeng).attr('disabled', true);
                $('#btn_draft_' + ijupeng).attr('disabled', true);
            } else {
                $('#btn_save_' + ijupeng).html('<i class="fa fa-save"></i> &nbsp;Submit');
                $('#btn_save_' + ijupeng).removeAttr('disabled');
                $('#btn_draft_' + ijupeng).removeAttr('disabled');
            }

        } else {
            if (isSpin == true) {
                $('#btn_draft_' + ijupeng).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Saving as draft.....');
                $('#btn_draft_' + ijupeng).attr('disabled', true);
                $('#btn_save_' + ijupeng).attr('disabled', true);
            } else {
                $('#btn_draft_' + ijupeng).html('<i class="fa fa-save"></i> &nbsp;Save as Draft');
                $('#btn_draft_' + ijupeng).removeAttr('disabled');
                $('#btn_save_' + ijupeng).removeAttr('disabled');
            }
        }
    }

    var fill_field_code_edit = function (certification_id, scope_id, sselect) {
        /** mencari jumlah scope di tabel certificationd_scope */
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/get_fieldcode_by_certification_id',
            data: {
                certification_id: certification_id,
                scope_id: scope_id
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                /** mencari jumlah fieldcode yang ada di tabel certificationd_fieldcode */
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/get_fieldcodes',
                    data: {
                        scope_id: scope_id
                    },
                    dataType: "json",
                    success: function (response) {
                        var check = false;

                        optku = '<option value="">Please Select</option>';

                        for (i in response) {
                            for (j in response2) {
                                if (response2[j].fieldcode_id == response[i].fieldcode_id) {
                                    check = true;
                                }
                            }
                            if (check == true) {
                                optku += '<option value="' + response[i].fieldcode_id + '"  selected>' + response[i].fieldcode_code + ' - ' + response[i].fieldcode_description + '</option>';
                            } else {
                                optku += '<option value="' + response[i].fieldcode_id + '">' + response[i].fieldcode_code + ' - ' + response[i].fieldcode_description + '</option>';
                            }
                            check = false;
                        }
                        // alert(optku);
                        sselect.html(optku);
                    }
                });

            }
        });
    }

    var fill_cost = function (certification_type_id, field_code_id, voucher_code, sinput) {
        //alert(sclass.length);
        //  field_code = field_code_id.length;
        $.ajax({
            type: "POST",
            async: false,
            url: site_url + '/Certification/get_cost_multi',
            data: {
                certification_type_id: certification_type_id,
                field_code_id: field_code_id,
                voucher_code: voucher_code
            },
            dataType: "json",
            success: function (response) {
                sinput.val(Template.NumberFormat(response.cost, 2, ',', '.'));
                //sinput.val('1000000');
            }
        });

    }

    /** scope_id */
    for (let ijupeng = 1; ijupeng < jumlah_sertifikasi + 2; ijupeng++) {
        $('#scope_id_' + ijupeng).change(function (e) {
            e.preventDefault();
            fill_multi_select('certificationd_fieldcode', 'fieldcode_id', "certification_id='" + "" + "'", $('#scope_id_' + ijupeng, sertifikasiku).val(), $('#fieldcode_id_' + ijupeng, sertifikasiku), '');
        });
    }



    /** Form Education */
    $("body").on("click", ".add-more-sertifikasi", function () {
        clik_body_sertifikasi();
    });

    var clik_body_sertifikasi = function () {
        jumlah_sertifikasi++;
        sisa_sertifikasi++;
        //alert(jumlah_tambah + '-' + jumlah_batas);
        if (jumlah_tambah > jumlah_batas || (jumlah_tambah == 0 && jumlah_batas == 0)) {
            Template.WarningAlert('Anda masih memiliki pengajuan sertifikasi yang belum dinilai');
        } else {
            $('.tambahan_' + jumlah_tambah).show();
            jumlah_tambah++;
        }
        fill_scope($('#scope_id_' + jumlah_sertifikasi, sertifikasiku));
        fill_certification_type($('#certification_type_id_' + jumlah_sertifikasi, sertifikasiku));
        update_form_sertifikasi_akhir();
    }

    var disabled_form_sertifikasi = function (status, jumser) {
        if (status == 'disabled') {
            $('#scope_id_' + jumser, $('#FormAdd_' + jumser)).attr('disabled', 'true');
            $('#fieldcode_id_' + jumser, $('#FormAdd_' + jumser)).attr('disabled', 'true');
            $('#certification_type_id_' + jumser, $('#FormAdd_' + jumser)).attr('disabled', 'true');
            $('#level_auditor_' + jumser, $('#FormAdd_' + jumser)).attr('disabled', 'true');
            $('#voucher_code_' + jumser, $('#FormAdd_' + jumser)).attr('disabled', 'true');
            $('#btn_save_' + jumser, $('#FormAdd_' + jumser)).attr('disabled', 'true');
            $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormAdd_' + jumser)).removeClass('error');
            $('.is-valid', $('#FormAdd_' + jumser)).removeClass('is-valid');
            $('.is-invalid', $('#FormAdd_' + jumser)).removeClass('is-invalid');
        } else {
            $('#scope_id_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#fieldcode_id_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#certification_type_id_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#level_auditor_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#voucher_code_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#btn_save_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).html('<i class="fa fa-undo"></i> Cancel');
            $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormAdd_' + jumser)).removeClass('error');
            $('.is-valid', $('#FormAdd_' + jumser)).removeClass('is-valid');
            $('.is-invalid', $('#FormAdd_' + jumser)).removeClass('is-invalid');
        }
    }

    var update_form_sertifikasi_awal = function () {
        /** refresh Form Validate */
        var jumlah_update = jumlah_sertifikasi + 3;
        for (let jumser = 1; jumser <= jumlah_update; jumser++) {
            $('#FormAdd_' + jumser).validate({
                errorElement: 'span', //default input error message container
                errorClass: 'invalid-feedback', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                errorPlacement: function (error, element) {
                    if (element.prop('class') === 'form-control single-select') {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                ignore: "",
                rules: {

                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    $('.alert-error', $('#FormAdd_' + jumser)).show();
                    Template.scrollTo($('.alert-error', $('#FormAdd_' + jumser)), -200);
                },
                highlight: function (element) { // hightlight error inputs
                    // $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    // $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
                },
                submitHandler: function (form) {

                    button_spin('draft', jumser, true);

                    $('#FormAdd_' + jumser).ajaxSubmit({
                        dataType: 'json',
                        success: function (response) {
                            if (response.success == true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Update Sertifikasi Success.',
                                    confirmButtonClass: 'btn-success',
                                    confirm: function () {
                                        $('.alert-error', $('#FormAdd_' + jumser)).hide();
                                        if (response.save == 'New') {
                                            $('#id_' + jumser, $('#FormAdd_' + jumser)).val(response.id);
                                            $('#btn_delete_' + jumser, $('#FormAdd_' + jumser)).removeAttr('disabled', 'disabled');
                                        }
                                        button_spin('draft', jumser, false);
                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.level == '1') ? $('#level_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.major == '1') ? $('#major_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.university == '1') ? $('#university_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.start_date_education == '1') ? $('#start_date_education_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.end_date_education == '1') ? $('#end_date_education_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.certificate_number == '1') ? $('#certificate_number_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.accreditation_status == '1') ? $('#accreditation_status_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                (response.doc_path_education == '1') ? $('#doc_path_education_' + jumser, $('#FormAdd_' + jumser)).addClass('is-invalid') : "";
                                button_spin('draft', jumser, false);
                            }
                        },
                        error: function () {
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                            button_spin('draft', jumser, false);
                        }
                    });
                }
            });
        }

        /** refresh btn_edit */
        for (let jumser = 1; jumser <= jumlah_update; jumser++) {
            $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).click(function (e) {
                e.preventDefault();
                caption_edit_sertifikasi = $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).text();
                (caption_edit_sertifikasi.trim() == 'Edit') ? disabled_form_sertifikasi('enabled', jumser) : disabled_form_sertifikasi('disabled', jumser);
            });
        }

        /** refresh btn_delete */
        for (let jumser = 1; jumser <= jumlah_update; jumser++) {
            $('#btn_delete_' + jumser, $('#FormAdd_' + jumser)).click(function (e) {
                e.preventDefault();
                //alert(jumser + '-' + sisa_sertifikasi);
                var id = $('#id_' + jumser, $('#FormAdd_' + jumser)).val();
                if (id == '') {
                    $(this).parents(".tambahan_" + jumser).remove();
                } else {
                    $.confirm({
                        title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Delete Pengajuan Sertifikasi ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $.ajax({
                                type: "POST", dataType: "json", data: { id: id },
                                url: site_url + '/Register/delete_education',
                                success: function (response) {
                                    if (response.success === true) {
                                        $.alert({
                                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                            content: 'Delete Pengajuan Sertifikasi Success.',
                                            confirmButtonClass: 'btn green',
                                            confirm: function () {
                                                //  alert("sisa Education = " + sisa_sertifikasi);
                                                if (sisa_sertifikasi == 0) {
                                                    $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).click();
                                                    $('#FormAdd_' + jumser).trigger('reset');
                                                    // alert('reset dong FormAdd' + jumser);
                                                } else {
                                                    //$('#btn_delete_' + jumser).parents(".tambahan_" + jumser).remove();
                                                    $('#doc_path_education_' + jumser).parents(".tambahan_" + jumser).remove();
                                                    sisa_sertifikasi--;
                                                }
                                            }
                                        })
                                    } else {
                                        Template.WarningAlert(response.msg);
                                    }
                                },
                                error: function () {
                                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                                }
                            })
                        }
                    })
                }
            });
        }

        /** refresh btn_delete */
        for (let jumser = 1; jumser <= jumlah_update; jumser++) {
            $('#btn_delete_' + jumser, $('#FormAdd_' + jumser)).click(function (e) {
                e.preventDefault();
                //alert(jumser + '-' + sisa_sertifikasi);
                var id = $('#id_' + jumser, $('#FormAdd_' + jumser)).val();
                if (id == '') {
                    $(this).parents(".tambahan_" + jumser).remove();
                } else {
                    $.confirm({
                        title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Delete Pengajuan Sertifikasi ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $.ajax({
                                type: "POST", dataType: "json", data: { id: id },
                                url: site_url + '/Register/delete_education',
                                success: function (response) {
                                    if (response.success === true) {
                                        $.alert({
                                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                            content: 'Delete Pengajuan Sertifikasi Success.',
                                            confirmButtonClass: 'btn green',
                                            confirm: function () {
                                                //  alert("sisa Education = " + sisa_sertifikasi);
                                                if (sisa_sertifikasi == 0) {
                                                    $('#btn_edit_' + jumser, $('#FormAdd_' + jumser)).click();
                                                    $('#FormAdd_' + jumser).trigger('reset');
                                                    // alert('reset dong FormAdd' + jumser);
                                                } else {
                                                    //$('#btn_delete_' + jumser).parents(".tambahan_" + jumser).remove();
                                                    $('#doc_path_education_' + jumser).parents(".tambahan_" + jumser).remove();
                                                    sisa_sertifikasi--;
                                                }
                                            }
                                        })
                                    } else {
                                        Template.WarningAlert(response.msg);
                                    }
                                },
                                error: function () {
                                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                                }
                            })
                        }
                    })
                }
            });
        }

    }
    update_form_sertifikasi_awal();

    var update_form_sertifikasi_akhir = function () {
        /** refresh Form Validate */
        $('#FormAdd_' + jumlah_sertifikasi).validate({
            errorElement: 'span', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            errorPlacement: function (error, element) {
                if (element.prop('class') === 'form-control single-select') {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            ignore: "",
            rules: {
                level: { required: true },
                university: { required: true },
                major: { required: true },
                start_date_education: { required: true },
                end_date_education: { required: true },
                certificate_number: { required: true },
                accreditation_status: { required: true },
                doc_path_education: { required: true }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                $('.alert-error', $('#FormAdd_' + jumlah_sertifikasi)).show();
                Template.scrollTo($('.alert-error', $('#FormAdd_' + jumlah_sertifikasi)), -200);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
            },
            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
            },
            submitHandler: function (form) {
                button_spin('draft', jumser, true);

                $('#FormAdd_' + jumlah_sertifikasi).ajaxSubmit({
                    dataType: 'json',
                    success: function (response) {
                        if (response.success == true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Update Education Success.',
                                confirmButtonClass: 'btn-success',
                                confirm: function () {
                                    $('.alert-error', $('#FormAdd_' + jumlah_sertifikasi)).hide();
                                    // alert(response.save + ' - ' + response.id);
                                    if (response.save == 'New') {
                                        $('#id_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).val(response.id);
                                        $('#btn_delete_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).removeAttr('disabled', 'disabled');
                                        // alert(response.save + ' - ' + response.id + '-' + jumlah_sertifikasi);
                                    }
                                    disabled_form_education('disabled', jumlah_sertifikasi);
                                    button_spin('draft', jumser, false);

                                }
                            })
                        } else {
                            Template.WarningAlert(response.msg);
                            (response.level == '1') ? $('#level_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.major == '1') ? $('#major_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.university == '1') ? $('#university_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.start_date_education == '1') ? $('#start_date_education_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.end_date_education == '1') ? $('#end_date_education_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.certificate_number == '1') ? $('#certificate_number_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.accreditation_status == '1') ? $('#accreditation_status_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            (response.doc_path_education == '1') ? $('#doc_path_education_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).addClass('is-invalid') : "";
                            button_spin('draft', jumser, false);
                        }
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        button_spin('draft', jumser, false);
                    }
                });
            }
        });

        /** refresh btn_edit */
        $('#btn_edit_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).click(function (e) {
            e.preventDefault();
            caption_edit_education = $('#btn_edit_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).text();
            (caption_edit_education.trim() == 'Edit') ? disabled_form_education('enabled', jumlah_sertifikasi) : disabled_form_education('disabled', jumlah_sertifikasi);
        });

        /** refresh btn_delete */
        $('#btn_delete_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).click(function (e) {
            e.preventDefault();
            var id = $('#id_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).val();
            if (id == '') {
                $(this).parents(".tambahan_" + jumlah_sertifikasi).remove();
            } else {
                $.confirm({
                    title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Delete Education ? Are You Sure?',
                    confirmButtonClass: 'btn green',
                    cancelButtonClass: 'btn red',
                    confirm: function () {
                        $.ajax({
                            type: "POST", dataType: "json", data: { id: id },
                            url: site_url + '/Register/delete_education',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Delete Education Success.',
                                        confirmButtonClass: 'btn green',
                                        confirm: function () {
                                            //  alert("sisa Education = " + sisa_sertifikasi);
                                            if (sisa_sertifikasi == 0) {
                                                $('#btn_edit_' + jumlah_sertifikasi, $('#FormAdd_' + jumlah_sertifikasi)).click();
                                                $('#FormAdd_' + jumlah_sertifikasi).trigger('reset');
                                                // alert('reset dong FormAdd' + jumlah_sertifikasi);
                                            } else {
                                                //$('#btn_delete_' + jumlah_sertifikasi).parents(".tambahan_" + jumlah_sertifikasi).remove();
                                                $('#doc_path_education_' + jumlah_sertifikasi).parents(".tambahan_" + jumlah_sertifikasi).remove();
                                                sisa_sertifikasi--;
                                            }
                                        }
                                    })
                                } else {
                                    Template.WarningAlert(response.msg);
                                }
                            },
                            error: function () {
                                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                            }
                        })
                    }
                })
            }
        });




    }

    var fill_scope = function (sselect) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/get_scopes',
            data: {},
            dataType: "json",
            success: function (response) {
                var html = '';
                html += '<option value="">Please Select</option>';
                for (k in response) {
                    html += '<option value="' + response[k].scope_id + '">' + response[k].scope_code + ' - ' + response[k].scope_description + '</option>';
                }
                sselect.html(html);
            }
        });
    }

    var fill_certification_type = function (sselect) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/get_certification_types',
            data: {},
            dataType: "json",
            success: function (response) {
                var html = '';
                html += '<option value="">Please Select</option>';
                for (k in response) {
                    html += '<option value="' + response[k].certification_type_id + '">' + response[k].description + '</option>';
                }
                sselect.html(html);
            }
        });
    }

    var fill_field_code = function (sselect) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/get_field_codes_new',
            data: {
                scope_id: scope_id
            },
            dataType: "json",
            success: function (response) {
                var html = '';
                html += '<option value="" selected>Please Select</option>';
                for (k in response) {
                    html += '<option value="' + response[k].fieldcode_id + '">' + response[k].fieldcode_code + ' - ' + response[k].fieldcode_description + '</option>';
                }
                sselect.html(html);
            }
        });
    }

    /** field_code_id */
    jumano = jumlah_sertifikasi + 1;
    for (let ijupeng = 1; ijupeng < jumano; ijupeng++) {
        if ($('#id_' + ijupeng + 1, sertifikasiku).val() == '') {
        } else {
            fill_multi_select('certificationd_fieldcode', 'fieldcode_id', "certification_id='" + $('#id_' + ijupeng, sertifikasiku).val() + "'", $('#scope_id_' + ijupeng, sertifikasiku).val(), $('#fieldcode_id_' + ijupeng, sertifikasiku), '');
            fill_cost($('#certification_type_id_' + ijupeng, sertifikasiku).val(), $('#fieldcode_id_' + ijupeng, sertifikasiku).val(), $('#voucher_code_' + ijupeng, sertifikasiku).val(), $('#cost_' + ijupeng, sertifikasiku));
        }
    }

    /** fieldcode change */
    jumano = jumlah_sertifikasi + 1;
    for (let ijupeng = 1; ijupeng < jumano; ijupeng++) {
        $('#fieldcode_id_' + ijupeng, sertifikasiku).change(function (e) {
            e.preventDefault();
            fill_cost($('#certification_type_id_' + ijupeng, sertifikasiku).val(), $('#fieldcode_id_' + ijupeng, sertifikasiku).val(), $('#voucher_code_' + ijupeng, sertifikasiku).val(), $('#cost_' + ijupeng, sertifikasiku));
        });

    }

    /** voucher_code keyup */
    jumano = jumlah_sertifikasi + 1;
    for (let ijupeng = 1; ijupeng < jumano; ijupeng++) {
        $('#voucher_code_' + ijupeng, sertifikasiku).keyup(function (e) {
            voucher_code = $(this).val();
            if (voucher_code == '') {
                $('#ket_discount_' + ijupeng, sertifikasiku).html('')
            } else {
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/check_discount',
                    data: {
                        voucher_code: voucher_code
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response.discount == 0) {
                            $('#ket_discount_' + ijupeng, sertifikasiku).html('Kode Voucher tidak ditemukan')
                            $('#ket_discount_' + ijupeng, sertifikasiku).css('color', 'red');
                        } else if (response.discount == -1) {
                            $('#ket_discount_' + ijupeng, sertifikasiku).html('Kode Voucher belum berlaku')
                            $('#ket_discount_' + ijupeng, sertifikasiku).css('color', 'red');
                        } else if (response.discount == -2) {
                            $('#ket_discount_' + ijupeng, sertifikasiku).html('Kode Voucher sudah expired')
                            $('#ket_discount_' + ijupeng, sertifikasiku).css('color', 'red');
                        } else if (response.discount == -3) {
                            $('#ket_discount_' + ijupeng, sertifikasiku).html('Quota sudah habis')
                            $('#ket_discount_' + ijupeng, sertifikasiku).css('color', 'red');
                        } else {
                            $('#ket_discount_' + ijupeng, sertifikasiku).html('Discount : ' + response.discount + ' %');
                            $('#ket_discount_' + ijupeng, sertifikasiku).css('color', 'green');
                        }

                    }
                });
            }
        });
    }

    /** voucher_code change*/
    jumano = jumlah_sertifikasi + 1;
    for (let ijupeng = 1; ijupeng < jumano; ijupeng++) {
        $('#voucher_code_' + ijupeng, sertifikasiku).change(function (e) {
            e.preventDefault();
            fill_cost($('#certification_type_id_' + ijupeng, sertifikasiku).val(), $('#fieldcode_id_' + ijupeng, sertifikasiku).val(), $('#voucher_code_' + ijupeng, sertifikasiku).val(), $('#cost_' + ijupeng, sertifikasiku));
        });
    }

    /** certification_type_id change*/
    for (let ijupeng = 1; ijupeng < jumlah_sertifikasi + 2; ijupeng++) {
        $('#certification_type_id_' + ijupeng, sertifikasiku).change(function (e) {
            //    alert(ijupeng + '-' + $('#fieldcode_id_' + ijupeng, add).val());
            fill_cost($('#certification_type_id_' + ijupeng, sertifikasiku).val(), $('#fieldcode_id_' + ijupeng, sertifikasiku).val(), $('#voucher_code_' + ijupeng, sertifikasiku).val(), $('#cost_' + ijupeng, sertifikasiku));

        });
    }
    
   
    // fill_cost($('#certification_type_id_1', add).val(), $('#fieldcode_id_1', add).val(), $('#cost_1', add));


    // $('#certification_type_id_1', sertifikasiku).trigger('change');

}); //end of $(function(){});