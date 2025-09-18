$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormComment = $('#FormComment');

    /*FORM ACTIONS*/
    /*BEGIN ADD*/
    FormAdd.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: false, // do not focus the last invalid input

        ignore: "",
        rules: {
            //certification_number: { required: true },
            // scope_id: { required: true },
            // fieldcode_id: { required: true },
            // certification_type_id: { required: true },
            // level_auditor: { required: true }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormAdd).show();
            Template.scrollTo($('.alert-error', FormAdd), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {


            FormAdd.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Pengajuan Sertifikasi anda berhasil \n Silahkan lakukan pembayaran invoice',
                            //content: response.msg,
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormAdd).hide();
                                $('#btn_edit', add).trigger('click');
                                if (response.certification_number !== '') {
                                    $('#certification_number', $('#FormAdd')).val(response.certification_number);
                                }
                                disabled_form('disabed');
                                var class_a = $(".form-control");
                                for (var i = 0; i < class_a.length; i++) {
                                    class_a[i].classList.remove("is-valid");
                                }
                            }
                        })
                    } else {
                        Template.WarningAlert(response.msg);
                        (response.fieldcode_id == '1') ? $('#fieldcode_id', $('#FormAdd')).addClass('is-invalid') : "";
                        (response.certification_type_id == '1') ? $('#certification_type_id', $('#FormAdd')).addClass('is-invalid') : "";
                        (response.scope_id == '1') ? $('#scope_id', $('#FormAdd')).addClass('is-invalid') : "";
                        (response.level_auditor == '1') ? $('#level_auditor', $('#FormAdd')).addClass('is-invalid') : "";

                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
            //}
        }
    });

    $('#btn_cancel', FormAdd).click(function () {
        $('#add').hide();
        $('#jqgrid').show();
        $('.alert-error', FormAdd).hide();
        FormAdd.trigger('reset');
        $('.error', FormAdd).removeClass('error');
        $('.is-valid', FormAdd).removeClass('is-valid');
        $('.is-invalid', FormAdd).removeClass('is-invalid');
    })

    var fill_multi_check = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect, sid, disabled, sclass) {
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
                        checkbox = '';
                        var check = false;
                        for (i in response) {
                            for (j in response2) {
                                if (response[i].id == response2[j].id) {
                                    check = true;
                                }
                            }
                            if (check == true) {
                                checkbox += '<input type="checkbox" class="' + sclass + '" id="' + sid + '" name="' + sid + '[]" value="' + response[i].id + '"   " checked " ' + disabled + ' >&nbsp' + response[i].scope_code + ' - ' + response[i].name + '<br>';
                            } else {
                                checkbox += '<input type="checkbox" class="' + sclass + '" id="' + sid + '" name="' + sid + '[]" value="' + response[i].id + '" ' + disabled + ' >&nbsp' + response[i].scope_code + ' - ' + response[i].name + '<br>';

                            }
                            check = false;

                        }
                        sselect.html(checkbox);

                    }
                });
            }
        });
    }

    if ($('#id', add).val() == '') {
        //   fill_multi_check('certificationd_scope', 'scope_id', "certification_id='" + $('#id', add).val() + "'", 'ref_scope', 'scope_id', 'scope_code,scope_description', $('#scope', add), 'scope_id', '', 'scopean');
        //  fill_multi_check('certificationd_type', 'certification_type_id', "certification_id='" + $('#id', add).val() + "'", 'ref_certification_type', 'certification_type_id', 'description', $('#certification_type', add), 'certification_type_id', '', 'typean');

    } else {
        //fill_multi_check('certificationd_scope', 'scope_id', "certification_id='" + $('#id', add).val() + "'", 'ref_scope', 'scope_id', 'scope_code,scope_description', $('#scope', add), 'scope_id', 'disabled', 'scopean');
        //fill_multi_check('certificationd_type', 'certification_type_id', "certification_id='" + $('#id', add).val() + "'", 'ref_certification_type', 'certification_type_id', 'description', $('#certification_type', add), 'certification_type_id', 'disabled', 'typean');

        /** check typean */
        table = 'certificationd_type';
        field = 'certification_type_id';
        param = "certification_id='" + $('#id', add).val() + "'";
        var input = $('.typean', add);
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/getdatatoarray',
            data: {
                table: table,
                field: field,
                param: param
            },
            dataType: "json",
            success: function (response) {
                var response2 = response
                for (i = 0; i < input.length; i++) {
                    for (j in response2) {
                        if (input[i].value == response2[j].id) {
                            input[i].checked = true;
                            fill_cost($('.typean', add), $('#cost', add));
                        }
                    }
                    input[i].disabled = true;
                }
            }
        });

    }

    $('.typean', add).click(function (e) {
        fill_cost($('.typean', add), $('#cost', add));
    });

    var fill_cost = function (sclass, sinput) {
        // var input = $('.typean');
        // alert(sclass + ' - ' + sinput);
        certification_type_id = [];
        jumlah_check = 0;
        //alert(sclass.length);
        for (var i = 0; i < sclass.length; i++) {
            if (sclass[i].checked) {
                certification_type_id[i] = sclass[i].value;
                jumlah_check++;
            }
        }

        if (jumlah_check == 0) {
            sinput.val('0');
        } else {
            $.ajax({
                type: "POST",
                url: site_url + '/Certification/get_cost_multi',
                data: {
                    certification_type_id: certification_type_id
                },
                dataType: "json",
                success: function (response) {
                    sinput.val(response.cost);
                }
            });
        }
    }


    var fill_multi_select = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect, disabled) {
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

    if ($('#id', add).val() == '') {
        fill_multi_select('certificationd_fieldcode', 'fieldcode_id', "certification_id='" + $('#id', add).val() + "'", 'ref_fieldcode', 'fieldcode_id', 'fieldcode_description', $('#fieldcode_id', add), '');
    } else {
        fill_multi_select('certificationd_fieldcode', 'fieldcode_id', "certification_id='" + $('#id', add).val() + "'", 'ref_fieldcode', 'fieldcode_id', 'fieldcode_description', $('#fieldcode_id', add), '');
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
            $('.scopean', add).removeAttr('disabled', 'disabled')
            $('#fieldcode_id', add).removeAttr('disabled', 'disabled')
            $('.typean', add).removeAttr('disabled', 'disabled')
            $('#fieldcode_id', add).removeAttr('disabled', 'disabled')
            $('#level_auditor', add).removeAttr('disabled', 'disabled')
        } else {
            $('#btn_edit', add).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_save', add).attr('disabled', 'true');
            $('#btn_draft', add).attr('disabled', 'true');
            $('.scopean', add).attr('disabled', 'true');
            $('#fieldcode_id', add).attr('disabled', 'disabled');
            $('.typean', add).attr('disabled', 'true');
            $('#fieldcode_id', add).attr('disabled', 'true');
            $('#level_auditor', add).attr('disabled', 'true');
        }
    }

    $('.scopean', FormAdd).click(function (e) {
        //alert("halo");
        Template.WarningAlert("2");
        // fill_cost($('.typean', FormAdd), $('#cost', FormAdd))
    });

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

                        //  $('#doc_path_education_' + jumlah_education).parents(".tambahan_" + jumlah_education).remove();


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

    $('#btn_save', FormAdd).click(function () {
        id = $('#id', FormAdd).val();
        certification_number = $('#certification_number', FormAdd).val();
        user_id = $('#user_id', FormAdd).val();
        let msg = "";

        var checkbox = $('.scopean', FormAdd);
        var scope_id = [];
        for (var i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                scope_id[i] = checkbox[i].value;
            }
        }

        if (scope_id.length < 1) {
            msg += 'Mohon pilih scope \n';
        }

        field_code_id = $('#fieldcode_id', FormAdd).val();
        //alert(field_code_id);
        if (field_code_id == null) {
            msg += 'Mohon pilih Field Code \n';
        }

        var checkbox2 = $('.typean', FormAdd);
        var certification_type_id = [];
        for (var i = 0; i < checkbox2.length; i++) {
            if (checkbox2[i].checked) {
                certification_type_id[i] = checkbox2[i].value;
            }
        }

        if (certification_type_id.length < 1) {
            msg += 'Mohon pilih Certification Type \n';
        }

        cost = $('#cost', FormAdd).val();
        level_auditor = $('#level_auditor', FormAdd).val();
        if (level_auditor == '') {
            msg += 'Mohon pilih Level AUditor \n';
        }

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
                        type: "POST", dataType: "json", data: {
                            id: id,
                            certification_number: certification_number,
                            user_id: user_id,
                            scope_id: scope_id,
                            field_code_id: field_code_id,
                            certification_type_id: certification_type_id,
                            cost: cost,
                            level_auditor: level_auditor
                        },
                        url: site_url + '/Certification/submit_pengajuan_sertifikasi',
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
                                        $('#certification_number', FormAdd).val(response.certification_number);
                                        $('#certification_id', FormComment).val(response.certification_id);
                                        disabled_form('disabed');
                                        var class_a = $(".form-control");
                                        for (var i = 0; i < class_a.length; i++) {
                                            class_a[i].classList.remove("is-valid");
                                        }



                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.fieldcode_id == '1') ? $('#fieldcode_id', $('#FormAdd')).addClass('is-invalid') : "";
                                (response.certification_type_id == '1') ? $('#certification_type_id', $('#FormAdd')).addClass('is-invalid') : "";
                                (response.scope_id == '1') ? $('#scope_id', $('#FormAdd')).addClass('is-invalid') : "";
                                (response.level_auditor == '1') ? $('#level_auditor', $('#FormAdd')).addClass('is-invalid') : "";

                            }
                        },
                        error: function () {
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        }
                    })
                }
            })
        } else {
            alert(msg);
        }


    });

}); //end of $(function(){});