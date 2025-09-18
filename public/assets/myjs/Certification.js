$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormComment = $('#FormComment');;
    var check_doc_dulu = '';

    $("#jqgrid_data").jqGrid({
        url: site_url + '/Certification/jqgrid_certification',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'certification_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Full Name', name: 'full_name', width: 185, align: 'left' },
            { label: 'Certification Number', name: 'certification_number', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Apply Date', name: 'apply_date', width: 150, align: 'center', hidden: true },
            { label: 'Level Auditor Pengajuan', name: 'level_auditor_pengajuan', width: 200, align: 'left' },
            { label: 'Level Auditor Approved', name: 'level_auditor_approved', width: 200, align: 'left' },
            { label: 'Scope Code', name: 'scope_code', hidden: false, width: 100, align: 'center' },
            {
                label: 'Status', name: 'status', width: 120, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "0":
                            return "<span class='label label-sm label-warning'>Draft</span>";
                            break;
                        case "1":
                            return "<span class='label label-sm label-info'>Unassignment</span>"
                            break;
                        case "2":
                            return "<span class='label label-sm label-success'>Assignmented</span>"
                            break;
                        case "3":
                            return "<span class='label label-sm label-success'>Assesmented</span>"
                            break;
                        case "4":
                            return "<span class='label label-sm label-danger'>Freeze</span>"
                            break;
                        case "5":
                            return "<span class='label label-sm label-danger'>Removed</span>"
                            break;
                        default:
                            return cellvalue;
                            break;

                    }
                }
            },
            { label: 'Status', name: 'v_status', hidden: true, width: 120, align: 'center' },
            {
                label: 'Result', name: 'hasil_akhir', hidden: false, width: 100, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "Pass":
                            return "<span class='label label-sm label-success'>Pass</span>";
                            break;
                        case "Fail":
                            return "<span class='label label-sm label-danger'>Fail</span>"
                            break;
                        default:
                            return '';
                            break;

                    }
                }
            },
            { label: 'Period', name: 'period', hidden: false, width: 150, align: 'center' },
            { label: 'Created At', name: 'createdAt', width: 150, align: 'center', hidden: true },
            { label: 'Updated At', name: 'updatedAt', width: 150, align: 'center', hidden: true },
            { label: 'Surat Persetujuan', name: 'surat_persetujuan', width: 150, align: 'center', hidden: true },
            { label: 'Surat Persetujuan', name: 'surat_persetujuan2', width: 200, align: 'center', formatter: function (cellvalue, rowObj, rowArray) {
                    var row_id = rowObj.rowId;
                    var surat_persetujuan = rowArray[13];
                  
                    if (surat_persetujuan == '' || surat_persetujuan == null) {
                       download_button=''; 
                    } else {
                        download_button = '<a href="' + site_url + "/" + surat_persetujuan + '" \
                                                id="btn_download" \
                                                target="_ blank" \
                                                class="btn btn-info btn-sm2" \
                                                style="margin:5px 0;" \
                                                data-id="'+ row_id + '" \ data-surat_persetujuan="' + surat_persetujuan + '" \
                                                ><i class="fa fa-download"></i> Surat Persetujuan</a > ';
                    }
                    var actions = download_button;
                    return actions;
                }
            }


        ],
        viewrecords: true,
        autowidth: true,
        //width: 1068,
        height: 250,
        rowNum: 100,
        rowList: [100, 200, 300],
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "createdAt",
        sortorder: "asc",
        caption: " &nbsp&nbsp&nbsp CERTIFICATION",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    //$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> ');


    /*BEGIN SEARCH*/
    $('#btn_search', '#jqgrid').click(function (e) {
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
    })

    $("#keyword").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#jqGrid_data").trigger('reloadGrid');
        }
    });

    /** update jqgrid when insert data */
    var pusher = new Pusher('452f5671f2a3962c0370', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('certification');
    channel.bind('my-event', function (data) {
        $('#jqgrid_data').trigger('reloadGrid');
    });

    /*SETUP BUTTON ACTIONS*/
    $("#btn_add").click(function () {
        $('#jqgrid').hide();
        $('#add').show();
        FormAdd.trigger('reset');

    });

    $('#btn_delete').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var certification_id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', certification_id);
            var status = data.v_status;
            if (status == '0' || status == '1') {
                $.confirm({
                    title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Delete Certification ? Are You Sure?',
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
                            type: "POST", dataType: "json", data: { certification_id: selrow },
                            url: site_url + '/Certification/delete_certification',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Delete Certification Success.',
                                        confirmButtonClass: 'btn green',
                                        confirm: function () {
                                            $('#userfile').val('');
                                            $('#jqgrid_data').trigger('reloadGrid');
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
            } else if (status == '2') {
                Template.WarningAlert("Data Certification tidak bisa dihapus karena sedang dalam proses penilaian");
            } else {
                Template.WarningAlert("Data Certification tidak bisa dihapus karena sudah dinilai");
            }
        } else {
            Template.WarningAlert("Please select a row.");
        }
    });

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

    $('#btn_edit').click(function (e) {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');

        if (selrow) {
            var certification_id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', certification_id);
            var status = data.v_status;

            if (status == '0') {
                fill_form_edit(selrow);
                $('#user_id2', FormEdit).removeAttr('disabled', 'disabled');
                $('#scope_id', FormEdit).removeAttr('disabled', 'disabled');
                $('#field_code_id2', FormEdit).removeAttr('disabled', 'disabled');
                $('#certification_type_id', FormEdit).removeAttr('disabled', 'disabled');
                $('#level_auditor', FormEdit).removeAttr('disabled', 'disabled');
                $('#btn_save', FormEdit).removeAttr('disabled', 'disabled');
                $('#btn_draft', FormEdit).removeAttr('disabled', 'disabled');
                $('#btn_cancel', FormEdit).removeAttr('disabled', 'disabled');

            } else if (status == '1') {
                fill_form_edit(selrow);
                $('#user_id2', FormEdit).attr('disabled', true);
                $('#scope_id', FormEdit).attr('disabled', true);
                $('#field_code_id2', FormEdit).attr('disabled', true);
                $('#certification_type_id', FormEdit).attr('disabled', true);
                $('#level_auditor', FormEdit).attr('disabled', true);
                $('#btn_save', FormEdit).attr('disabled', true);
                $('#btn_draft', FormEdit).attr('disabled', true);
                $('#btn_cancel', FormEdit).removeAttr('disabled', 'disabled');
                //    Template.WarningAlert("Data Certification tidak bisa diedit karena data sudah disubmit");
            } else if (status == '2') {
                fill_form_edit(selrow);
                $('#user_id2', FormEdit).attr('disabled', true);
                $('#scope_id', FormEdit).attr('disabled', true);
                $('#field_code_id2', FormEdit).attr('disabled', true);
                $('#certification_type_id', FormEdit).attr('disabled', true);
                $('#level_auditor', FormEdit).attr('disabled', true);
                $('#btn_save', FormEdit).attr('disabled', true);
                $('#btn_draft', FormEdit).attr('disabled', true);
                $('#btn_cancel', FormEdit).removeAttr('disabled', 'disabled');

                //   Template.WarningAlert("Data Certification tidak bisa diedit karena dalam sedang proses penilaian");
            } else {
                fill_form_edit(selrow);
                $('#user_id2', FormEdit).attr('disabled', true);
                $('#scope_id', FormEdit).attr('disabled', true);
                $('#field_code_id2', FormEdit).attr('disabled', true);
                $('#certification_type_id', FormEdit).attr('disabled', true);
                $('#level_auditor', FormEdit).attr('disabled', true);
                $('#btn_save', FormEdit).attr('disabled', true);
                $('#btn_draft', FormEdit).attr('disabled', true);
                $('#btn_cancel', FormEdit).removeAttr('disabled', 'disabled');

                // Template.WarningAlert("Data Certification tidak bisa diedit karena sudah dinilai");
            }


        } else {
            Template.WarningAlert("Please select a row");
        }
    })

    var fill_form_edit = function (certification_id) {
        $.ajax({
            type: "POST", dataType: "json", data: { certification_id: certification_id },
            url: site_url + '/Certification/get_data_certification_by_id',
            success: function (response) {
                $('#jqgrid').hide();
                $('#id', FormEdit).val(response.certification_id);
                $('#certification_id', FormComment).val(response.user_id + 'a');
                $('#certification_id', FormEdit).val(response.certification_id);
                $('#certification_number', FormEdit).val(response.certification_number);
                fill_select('users', response.user_id, $('#user_id2', FormEdit))
                fill_scope(response.scope_id, $('#scope_id', FormEdit));
                $('#certification_type_id', FormEdit).val(response.certification_type_id);
                certification_id = response.user_id + 'a';
                fill_select_master_code('level_auditor', response.level_auditor.trim(), $('#level_auditor', FormEdit))
                fill_multi_field_code(response.certification_id, response.scope_id, $('#field_code_id2', FormEdit));
                // $('#certification_type_id', FormEdit).trigger('click');
                fill_cost(response.certification_type_id, $('#field_code_id2', FormEdit).val(), $('#cost', FormEdit));
                /** isi tab comment */
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/get_data_comment_by_id',
                    data: { certification_id: certification_id },
                    dataType: "json",
                    success: function (response) {
                        $(".tambahan", FormComment).html("");
                        // $('#doc_path_education_' + jumlah_education).parents(".tambahan_" + jumlah_education).remove();

                        for (i in response) {
                            var html = "";

                            if (response[i].user_type_id == '5') {
                                html += '<div class="direct-chat-msg right">';
                                html += '    <div class="direct-chat-infos clearfix">';
                                html += '        <span class="direct-chat-name float-right">' + response[i].full_name + '</span>';
                                html += '        <span class="direct-chat-timestamp float-left">' + response[i].comment_date + '</span>';
                                html += '    </div>';
                                html += '    <img class="direct-chat-img" src = "' + site_url + '/dist/img/user1-128x128.jpg" alt = "Message User Image">';
                                html += '    <div class="direct-chat-text">';
                                html += response[i].comment;
                                html += '    </div>';
                                html += '</div>';
                            } else {
                                html += '<div class="direct-chat-msg ">';
                                html += '    <div class="direct-chat-infos clearfix">';
                                html += '        <span class="direct-chat-name float-left">' + response[i].full_name + '</span>';
                                html += '        <span class="direct-chat-timestamp float-right">' + response[i].comment_date + '</span>';
                                html += '    </div>';
                                html += '    <img class="direct-chat-img" src = "' + site_url + '/dist/img/user1-128x128.jpg" alt = "Message User Image">';
                                html += '    <div class="direct-chat-text">';
                                html += response[i].comment;
                                html += '    </div>';
                                html += '</div>';

                            }

                            $(".tambahan", FormComment).append(html).children(':last');

                        }
                    }
                });
                $('#edit').show();



            },
            error: function () {
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        })
    }

    /*FORM ACTIONS*/
    /*BEGIN ADD*/
    FormAdd.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: false, // do not focus the last invalid input

        ignore: "",
        rules: {
            user_id: { required: true },
            scope_id: { required: true },
            field_code_id: { required: true },
            certification_type_id: { required: true },
            cost: { required: true },
            level_auditor: { required: true }
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
                            content: 'Data Certification berhasil ditambahkan',
                            //content: response.msg,
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormAdd).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#btn_cancel', FormAdd).trigger('click');
                                var class_a = $(".form-control");
                                for (var i = 0; i < class_a.length; i++) {
                                    class_a[i].classList.remove("is-valid");
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
            });
            //}
        }
    });

    $('#btn_cancel', FormAdd).click(function () {
        $('#add').hide();
        $('#jqgrid').show();
        $('.alert-error', FormAdd).hide();
        $('.error', FormAdd).removeClass('error');
        $('.is-valid', FormAdd).removeClass('is-valid');
        $('.is-invalid', FormAdd).removeClass('is-invalid');

        FormAdd.trigger('reset');
        $("#user_id", FormAdd).val('').trigger('change');
        $("#field_code_id", FormAdd).val('').trigger('change');
    })

    /*BEGIN EDIT*/
    FormEdit.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: true, // do not focus the last invalid input

        ignore: "",
        rules: {
            user_id: { required: true },
            scope_id: { required: true },
            field_code_id2: { required: true },
            certification_type_id: { required: true },
            cost: { required: true },
            level_auditor: { required: true }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormEdit).show();
            Template.scrollTo($('.alert-error', FormEdit), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormEdit.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Edit Certification Success.',
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormEdit).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#btn_cancel', FormEdit).trigger('click');
                                var class_a = $(".form-control");
                                for (var i = 0; i < class_a.length; i++) {
                                    class_a[i].classList.remove("is-valid");
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
            });
        }
    });

    var check_doc = function () {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/check_doc',
            dataType: "json",
            success: function (response) {
                check_doc_dulu = response.msg;

            }
        });
    }

    $('#btn_cancel', FormEdit).click(function () {
        $('#edit').hide();
        $('#jqgrid').show();
        $('.alert-error', FormEdit).hide();
        FormEdit.trigger('reset');
        $('.error', FormEdit).removeClass('error');
        $('.is-valid', FormEdit).removeClass('is-valid');
        $('.is-invalid', FormEdit).removeClass('is-invalid');
        $("#user_id", FormEdit).val('').trigger('change');
        $("#field_code_id", FormEdit).val('').trigger('change');
    })

    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });
    /*END EDIT*/



    var fill_select = function (stable, sid, sselect) {
        //alert(sprovince_id);
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                stable: stable
            },
            url: site_url + '/Certificant/get_select',
            async: false,
            success: function (response) {
                if (sid == "cingcangkeling") {
                    opt = '<option value="" selected>Please Select</option>';
                } else {
                    opt = '<option value="Null">Please Select</option>';
                }
                for (i in response) {
                    if (response[i].id == sid) {
                        opt += '<option value="' + response[i].id + '"  selected>' + response[i].name + '</option>';

                    } else {
                        opt += '<option value="' + response[i].id + '">' + response[i].name + '</option>';

                    }
                }
                sselect.html(opt)

            },
            error: function (e) {
                alert("Failed to Connect into Database, Please Contact Your Administrator!");
            }
        });

    }

    var fill_select_master_code = function (code_type, scode_value, sselect) {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                code_type: code_type
            },
            url: site_url + '/MasterCode/get_select_master_code',
            async: false,
            success: function (response) {
                opt = '<option value="Null">Please Select</option>';
                for (i in response) {
                    if (response[i].code_value.trim() == scode_value.trim()) {
                        opt += '<option value="' + response[i].code_value.trim() + '"  selected>' + response[i].code_description + '</option>';

                    } else {
                        opt += '<option value="' + response[i].code_value.trim() + '">' + response[i].code_description + '</option>';

                    }
                }
                sselect.html(opt)
            },
            error: function (e) {
                alert("Failed to Connect into Database, Please Contact Your Administrator!");
            }
        });

    }

    var fill_multi_select = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect) {
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
                                opt += '<option value="' + response[i].id + '"  selected>' + response[i].name + '</option>';
                            } else {
                                opt += '<option value="' + response[i].id + '">' + response[i].name + '</option>';

                            }
                            check = false;
                        }
                        sselect.html(opt);
                    }
                });
            }
        });
    }

    var fill_multi_field_code = function (certification_id, scope_id, sselect) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/get_field_code_select',
            data: {
                certification_id: certification_id,
                scope_id: scope_id
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/get_field_code',
                    data: {
                        scope_id: scope_id
                    },
                    dataType: "json",
                    success: function (response) {
                        opt = '<option value="">Please Select</option>';
                        var check = false;
                        for (i in response) {
                            for (j in response2) {
                                if (response[i].fieldcode_id == response2[j].fieldcode_id) {
                                    check = true;
                                }
                            }
                            if (check == true) {
                                opt += '<option value="' + response[i].fieldcode_id + '"  selected>' + response[i].fieldcode_code + '-' + response[i].fieldcode_description + '</option>';
                            } else {
                                opt += '<option value="' + response[i].fieldcode_id + '">' + response[i].fieldcode_code + '-' + response[i].fieldcode_description + '</option>';

                            }
                            check = false;
                        }
                        sselect.html(opt);
                    }
                });
            }
        });
    }

    var fill_field_code = function (scope_id, id, sselect) {
        //alert(sprovince_id);
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                scope_id: scope_id
            },
            url: site_url + '/Certification/get_field_code',
            async: false,
            success: function (response) {
                opt = '<option value="">Please Select</option>';
                for (i in response) {
                    if (response[i].fieldcode_id == id) {
                        opt += '<option value="' + response[i].fieldcode_id + '"  selected>' + response[i].fieldcode_code + ' - ' + response[i].fieldcode_description + '</option>';

                    } else {
                        opt += '<option value="' + response[i].fieldcode_id + '">' + response[i].fieldcode_code + ' - ' + response[i].fieldcode_description + '</option>';
                    }
                }
                //alert(opt);
                sselect.html(opt)


            },
            error: function (e) {
                alert("Failed to Connect into Database, Please Contact Your Administrator!");
            }
        });

    }

    var fill_scope = function (scope_id, sselect) {
        //alert(sprovince_id);
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                //scope_id: scope_id
            },
            url: site_url + '/Certification/get_scopes',
            async: false,
            success: function (response) {
                opt = '<option value="">Please Select</option>';
                for (i in response) {
                    if (response[i].scope_id == scope_id) {
                        opt += '<option value="' + response[i].scope_id + '"  selected>' + response[i].scope_code + ' - ' + response[i].scope_description + '</option>';

                    } else {
                        opt += '<option value="' + response[i].scope_id + '">' + response[i].scope_code + ' - ' + response[i].scope_description + '</option>';
                    }
                }
                //alert(opt);
                sselect.html(opt)


            },
            error: function (e) {
                alert("Failed to Connect into Database, Please Contact Your Administrator!");
            }
        });

    }

    $('#scope_id', FormAdd).change(function (e) {
        e.preventDefault();
        scope_id = $(this).val();
        fill_field_code(scope_id, "", $('#field_code_id', FormAdd));
    });

    $('#scope_id', FormEdit).change(function (e) {
        e.preventDefault();
        scope_id = $(this).val();
        fill_field_code(scope_id, "", $('#field_code_id2', FormEdit));
    });

    $('#certification_type_id', FormAdd).click(function (e) {
        fill_cost($(this).val(), $('#field_code_id', FormAdd).val(), $('#cost', FormAdd));
    });

    $('#field_code_id', FormAdd).change(function (e) {
        fill_cost($('#certification_type_id', FormAdd).val(), $('#field_code_id', FormAdd).val(), $('#cost', FormAdd));
    });

    $('#certification_type_id', FormEdit).click(function (e) {
        fill_cost($('#certification_type_id', FormEdit).val(), $('#field_code_id2', FormEdit).val(), $('#cost', FormEdit));
    });

    $('#field_code_id2', FormEdit).change(function (e) {
        fill_cost($('#certification_type_id', FormEdit).val(), $('#field_code_id2', FormEdit).val(), $('#cost', FormEdit));
    });


    var fill_cost = function (certification_type_id, field_code_id, sinput) {
        //alert(sclass.length);
        //  field_code = field_code_id.length;


        $.ajax({
            type: "POST",
            url: site_url + '/Certification/get_cost_multi',
            data: {
                certification_type_id: certification_type_id,
                field_code_id: field_code_id
            },
            dataType: "json",
            success: function (response) {
                sinput.val(response.cost);
            }
        });

    }

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
                                checkbox += '<input type="checkbox" class="' + sclass + '" id="' + sid + '" name="' + sid + '[]" value="' + response[i].id + '"    checked="true"  ' + disabled + ' >&nbsp' + response[i].scope_code + ' - ' + response[i].name + '<br>';
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

    fill_multi_check('certificationd_type', 'certification_type_id', "certification_id='" + $('#id', edit).val() + "'", 'ref_certification_type', 'certification_type_id', 'description', $('#certification_type2', edit), 'certification_type_id2', 'enabled', 'typean2');

    var fill_multi_check2 = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect, sid, disabled, sclass) {
        //alert(stable1 + ' - ' + sfield1 + ' - ' + sparam + ' - ' + stable2 + ' - ' + sfield2a + ' - ' + sfield2b + ' - ' + sselect + ' - ' + sid + ' - ' + disabled + ' - ' + sclass);
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
                                checkbox += '<input type="checkbox" class="' + sclass + '" id="' + sid + '" name="' + sid + '[]" value="' + response[i].id + '"    checked="true"  ' + disabled + ' >&nbsp' + response[i].name + '<br>';
                            } else {
                                checkbox += '<input type="checkbox" class="' + sclass + '" id="' + sid + '" name="' + sid + '[]" value="' + response[i].id + '" ' + disabled + ' >&nbsp' + response[i].name + '<br>';

                            }
                            check = false;

                        }
                        sselect.html(checkbox);

                    }
                });
            }
        });
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
                        } else {
                            html += '<div class="direct-chat-msg ">';

                        }
                        html += '    <div class="direct-chat-infos clearfix">';
                        html += '        <span class="direct-chat-name float-left">' + $('#full_name', FormEdit).val() + '</span>';
                        html += '        <span class="direct-chat-timestamp float-right">' + comment_date + '</span>';
                        html += '    </div>';
                        html += '    <img class="direct-chat-img" src = "' + site_url + '/dist/img/user1-128x128.jpg" alt = "Message User Image">';
                        html += '    <div class="direct-chat-text">';
                        html += comment;
                        html += '    </div>';
                        html += '</div>';
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

        // var checkbox = $('.scopean', FormAdd);
        // var scope_id = [];
        // for (var i = 0; i < checkbox.length; i++) {
        //     if (checkbox[i].checked) {
        //         scope_id[i] = checkbox[i].value;
        //     }
        // }

        field_code_id = $('#field_code_id', FormAdd).val();
        // field_code_id_1 = $('#field_code_id_1', FormAdd).val();
        // field_code_id_2 = $('#field_code_id_2', FormAdd).val();
        // field_code_id_3 = $('#field_code_id_3', FormAdd).val();
        // field_code_id_4 = $('#field_code_id_4', FormAdd).val();

        scope_id = $('#scope_id', FormAdd).val();
        // scope_id_1 = $('#scope_id_1', FormAdd).val();
        // scope_id_2 = $('#scope_id_2', FormAdd).val();
        // scope_id_3 = $('#scope_id_3', FormAdd).val();
        // scope_id_4 = $('#scope_id_4', FormAdd).val();

        certification_type_id = $('#certification_type_id', FormAdd).val();
        // var checkbox2 = $('.typean', FormAdd);
        // var certification_type_id = [];
        // for (var i = 0; i < checkbox2.length; i++) {
        //     if (checkbox2[i].checked) {
        //         certification_type_id[i] = checkbox2[i].value;
        //     }
        // }

        cost = $('#cost', FormAdd).val();
        level_auditor = $('#level_auditor', FormAdd).val();
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
                        // scope_id_1: scope_id_1,
                        // scope_id_2: scope_id_2,
                        // scope_id_3: scope_id_3,
                        // scope_id_4: scope_id_4,

                        field_code_id: field_code_id,
                        // field_code_id_1: field_code_id_1,
                        // field_code_id_2: field_code_id_2,
                        // field_code_id_3: field_code_id_3,
                        // field_code_id_4: field_code_id_4,

                        certification_type_id: certification_type_id,
                        cost: cost,
                        level_auditor: level_auditor
                    },
                    url: site_url + '/Certification/submit_certification',
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

    });

    $('#btn_save', FormEdit).click(function () {
        id = $('#id', FormEdit).val();
        certification_number = $('#certification_number', FormEdit).val();
        user_id = $('#user_id2', FormEdit).val();

        // var checkbox = $('.scopean2', FormEdit);
        // var scope_id = [];
        // for (var i = 0; i < checkbox.length; i++) {
        //     if (checkbox[i].checked) {
        //         scope_id[i] = checkbox[i].value;
        //     }
        // }

        field_code_id = $('#field_code_id2', FormEdit).val();
        // field_code_id_1 = $('#field_code_id2_1', FormEdit).val();
        // field_code_id_2 = $('#field_code_id2_2', FormEdit).val();
        // field_code_id_3 = $('#field_code_id2_3', FormEdit).val();
        // field_code_id_4 = $('#field_code_id2_4', FormEdit).val();


        scope_id = $('#scope_id', FormEdit).val();
        // scope_id_1 = $('#scope_id_1', FormEdit).val();
        // scope_id_2 = $('#scope_id_2', FormEdit).val();
        // scope_id_3 = $('#scope_id_3', FormEdit).val();
        // scope_id_4 = $('#scope_id_4', FormEdit).val();

        certification_type_id = $('#certification_type_id', FormEdit).val();
        //var checkbox2 = $('.typean', FormEdit);
        // var certification_type_id = [];
        // for (var i = 0; i < checkbox2.length; i++) {
        //     if (checkbox2[i].checked) {
        //         certification_type_id[i] = checkbox2[i].value;
        //     }
        // }

        cost = $('#cost', FormEdit).val();
        level_auditor = $('#level_auditor', FormEdit).val();
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
                    url: site_url + '/Certification/submit_certification',
                    success: function (response) {
                        if (response.success === true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Pengajuan sertifikasi success.',
                                confirmButtonClass: 'btn green',
                                confirm: function () {
                                    $('#userfile').val('');
                                    $('#btn_cancel', FormEdit).trigger('click');
                                    $('#jqgrid_data').trigger('reloadGrid');
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

    });

}); //end of $(function(){});