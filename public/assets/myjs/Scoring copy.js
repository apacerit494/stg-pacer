$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');
    let js = 0;


    $("#jqgrid_data").jqGrid({
        url: site_url + '/Scoring/jqgrid_scoring',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'assignment_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Certificant', name: 'certificant', width: 200, align: 'left' },

            { label: 'Committee', name: 'committee', width: 200, align: 'left', hidden: user_type == '3' ? true : false },
            { label: 'Secretariat', name: 'secretariat', width: 200, align: 'left', hidden: true },
            { label: 'Commitee', name: 'committee', width: 200, align: 'left', hidden: true },
            { label: 'Education Score', name: 'education_score', width: 150, align: 'right' },
            { label: 'Training Score', name: 'training_score', width: 150, align: 'right' },
            { label: 'Audit Experience Score', name: 'audit_experience_score', width: 150, align: 'right' },
            { label: 'Experience Score', name: 'experience_score', width: 150, align: 'right' },
            { label: 'Written Exam Score', name: 'written_exam_score', width: 150, align: 'right' },
            { label: 'Practical Exam Score', name: 'pratical_exam_score', width: 150, align: 'right' },
            { label: 'Observation Score', name: 'observation_score', width: 150, align: 'right' },
            { label: 'Commitee Score', name: 'committee_score', width: 150, align: 'right', hidden: true },
            { label: 'Total Score', name: 'total_Score', width: 150, align: 'center', hidden: true },

            { label: 'Note', name: 'note', width: 150, align: 'left' },
            {
                label: 'Status', name: 'status', width: 150, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "0":
                            return "<span class='label label-xs label-warning'>Unverified</span>";
                            break;
                        case "1":
                            return "<span class='label label-xs label-info'>Verified</span>";
                            break;
                        default:
                            return "<span class='label label-xs label-danger'>No Score Yet</span>";
                            //return cellvalue;
                            break;
                    }
                }
            },
            { label: 'Status', name: 'status2', width: 150, align: 'center', hidden: true }

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
        sortname: "id",
        sortorder: "asc",
        caption: " &nbsp&nbsp&nbsp ASSESSMENT",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    // jQuery("#jqgrid_data").jqGrid('navGrid', '#jqgrid_data_pager', { del: false, add: false, edit: false, search: false });
    // jQuery("#jqgrid_data").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });


    //$("#t_jqgrid_data").append('<button class="jqGrid_edit" id="btn_edit"></button>');
    //if (user_type == '3' || user_type == '2' || user_type == '1') {
    if (user_type == '3') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Add/Edit Score"><i class="fa fa-edit"></i> &nbspAdd/Edit Score</a> \
        <a class="btn btn-info btn-sm2" id="btn_verification" title="Verification Score"><i class="fa fa-check"></i> &nbspVerification Score</a> \
        </div> \
        ');
    }

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

    /*SETUP BUTTON ACTIONS*/
    $("#btn_add").click(function () {
        $('#jqgrid').hide();
        $('#add').show();
        FormAdd.trigger('reset');
    });

    $('#btn_verification').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var status = data.status2;
            var total_Score = data.total_Score;

            if (status == '0' && total_Score > 0) {
                $.confirm({
                    title: "Verification", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Verification Score ? Are You Sure?',
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
                            type: "POST", dataType: "json", data: { assignment_id: selrow },
                            url: site_url + '/Scoring/verification_score',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Verification Score Success.',
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
            } else if (status == '0' || total_Score == 0) {
                Template.WarningAlert("Belum ada nilai tidak bisa diverifikasi");
            } else if (status == null || status == '') {
                Template.WarningAlert("Belum ada nilai tidak bisa diverifikasi");
            } else if (status == '1') {
                Template.WarningAlert("Score sudah diverifikasi tidak bisa diverifikasi ulang");
            }
        } else {
            Template.WarningAlert("Please select a row.");
        }
    });

    $('#btn_edit').click(function (e) {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var status = data.status2;
            if (status == '0' || status == '' || status == null) {
                $('#id', FormEdit).val(id);
                $.ajax({
                    type: "POST", dataType: "json", data: { assignment_id: id },
                    url: site_url + '/Scoring/get_data_scoring_by_id',
                    success: function (response) {
                        $('#jqgrid').hide();
                        $('#edit').show();
                        $('.card-title', edit).html('ASSESMENT FOR  <a class="btn btn-warning"  href="/Profile/ambil_profil/' + response.user_id + '" style="color: green; text - decoration: underline" target="_blank"> ' + response.full_name.toUpperCase() + ' ( ' + response.certification_number.toUpperCase() + ' ) </a>');
                        $('#education_score', FormEdit).val(response.education_score);
                        $('#training_score', FormEdit).val(response.training_score);
                        $('#audit_experience_score', FormEdit).val(response.audit_experience_score);
                        $('#experience_score', FormEdit).val(response.experience_score);
                        $('#written_exam_score', FormEdit).val(response.written_exam_score);
                        $('#pratical_exam_score', FormEdit).val(response.pratical_exam_score);
                        $('#observation_score', FormEdit).val(response.observation_score);
                        $('#scope_score', FormEdit).val(response.scope_score);
                        $('#note', FormEdit).val(response.note);
                        $('#committee_score', FormEdit).val(response.committee_score);

                        /** tampilkan scope */
                        assignment_id = response.assignment_id;
                        $.ajax({
                            type: "POST",
                            url: site_url + '/Scoring/get_data_assignmentd_scope',
                            data: {
                                assignment_id: assignment_id
                            },
                            dataType: "json",
                            success: function (response) {
                                $('.sikat-scope', FormEdit).remove();
                                $('.sikat-fieldcode', FormEdit).remove();
                                js = 0;
                                for (i in response) {
                                    let html = "";
                                    html += '<div class="sikat-scope">'
                                    html += '<div class="form-group row">';
                                    html += '    <label class="col-sm-4 control-label" style="text-align:right">' + response[i].scope_code + '</label>';
                                    html += '    <div class="col-sm-4">';
                                    html += '        <select name="scope_score[]" id="scope_score" class="form-control">';
                                    if (response[i].score == 'Y') {
                                        html += '           <option value="Y" selected>OK</option>';
                                    } else {
                                        html += '           <option value="Y">OK</option>';

                                    }
                                    if (response[i].score == 'T') {
                                        html += '           <option value="T" selected>Not OK</option>';
                                    } else {
                                        html += '           <option value="T" >Not OK</option>';
                                    }

                                    html += '        </select>';
                                    html += '    </div>';
                                    html += '    <div class="col-sm-4">';
                                    html += '        <input type="hidden" class="form-control" id="scope_id" name="scope_id[]" value="' + response[i].scope_id + '">';
                                    html += '    </div>';
                                    html += '</div>';
                                    html += '</div>';
                                    //  alert(html);
                                    scope_id = response[i].scope_id;
                                    /** tampilkan field_code */
                                    fill_field_code(assignment_id, scope_id, js, html);
                                    js++;
                                    $('#jumlah_scope', FormEdit).val(js);
                                    //   alert(html);
                                    // $('.scope', FormEdit).append(html);

                                } /** end of response i */


                            }
                        });


                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                })
            } else {
                Template.WarningAlert("Score sudah diverifikasi tidak bisa diedit lagi");
            }
        } else {
            Template.WarningAlert("Please select a row");
        }

    })

    var fill_field_code = function (assignment_id, scope_id, js, html) {
        $.ajax({
            type: "POST",
            url: site_url + '/Scoring/get_data_assignmentd_fieldcode',
            data: {
                assignment_id: assignment_id,
                scope_id: scope_id
            },
            dataType: "json",
            success: function (response) {

                //  let html = "";
                let jf = 0;
                for (j in response) {
                    html += '<div class="sikat-fieldcode">'
                    html += '<div class="form-group row">';
                    html += '    <label class="col-sm-4 control-label" style="text-align:right">' + response[j].fieldcode_code + '</label>';
                    html += '    <div class="col-sm-4">';
                    html += '        <select name="fieldcode_score_' + js + '[]" id="fieldcode_score_' + js + '" class="form-control">';
                    if (response[j].score == 'Y') {
                        html += '           <option value="Y" selected>OK</option>';
                    } else {
                        html += '           <option value="Y">OK</option>';
                    }

                    if (response[j].score == 'T') {
                        html += '           <option value="T" selected>Not OK</option>';
                    } else {
                        html += '           <option value="T" >Not OK</option>';
                    }

                    html += '        </select>';
                    html += '    </div>';
                    html += '    <div class="col-sm-4">';
                    html += '        <input type="hidden" class="form-control" id="fieldcode_id_' + js + '" name="fieldcode_id_' + js + '[]" value="' + response[j].fieldcode_id + '">';
                    html += '    </div>';
                    html += '</div>';
                    html += '</div>';
                    jf++;
                } /** end of response j */
                //  alert(js + '-' + jf);
                $('#jumlah_fieldcode_' + js, FormEdit).val(jf);
                $('.scope', FormEdit).append(html);
            }

        });
    }

    /*FORM ACTIONS*/
    /*BEGIN ADD*/
    FormAdd.validate({
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
            education_score: { required: true },
            training_score: { required: true },
            audit_experience_score: { required: true },
            experience_score: { required: true },
            written_exam_score: { required: true },
            pratical_exam_score: { required: true },
            committee_score: { required: true }

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
                            content: 'Data Scoring berhasil ditambahkan',
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
                        Template.WarningAlert(response.error);
                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
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

    /*BEGIN EDIT*/
    FormEdit.validate({
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
            education_score: { required: true },
            training_score: { required: true },
            audit_experience_score: { required: true },
            experience_score: { required: true },
            written_exam_score: { required: true },
            pratical_exam_score: { required: true },
            committee_score: { required: true }
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
                            content: 'Edit Scoring Success.',
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
                        Template.WarningAlert(response.error);
                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    });


    $('#btn_cancel', FormEdit).click(function () {
        $('#edit').hide();
        $('#jqgrid').show();
        $('.alert-error', FormEdit).hide();
        FormEdit.trigger('reset');
        $('.error', FormEdit).removeClass('error');
        $('.is-valid', FormEdit).removeClass('is-valid');
        $('.is-invalid', FormEdit).removeClass('is-invalid');
    })

    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });
    /*END EDIT*/



















}); //end of $(function(){});