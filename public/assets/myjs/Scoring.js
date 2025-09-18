$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormReas = $('#modal_assignment'), FormDetail = $('#FormDetail');
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
            { label: 'ID', name: 'id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Assignment ID', name: 'assignment_id', width: 100, align: 'center', hidden: true },
            { label: 'Certificant', name: 'certificant', width: 200, align: 'left' },
            { label: 'Committee', name: 'committee', width: 200, align: 'left', hidden: user_type == '3' ? true : false },
            {
                label: 'Status', name: 'status', width: 150, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "0":
                            return "<span class='label label-xs label-warning'>Unverified</span>";
                            break;
                        case "1":
                            return "<span class='label label-xs label-info'>Verified by Committee</span>";
                            break;
                        case "2":
                            return "<span class='label label-xs label-success'>Verified by Secretariat</span>";
                            break;
                        default:
                            return "<span class='label label-xs label-danger'>No Score Yet</span>";
                            //return cellvalue;
                            break;
                    }
                }
            },
            { label: 'Secretariat', name: 'secretariat', width: 200, align: 'left', hidden: true },
            { label: 'Commitee', name: 'committee_id', width: 200, align: 'left', hidden: true },
            { label: 'Education Score', name: 'education_score', width: 150, align: 'right' },
            { label: 'Training Score', name: 'training_score', width: 150, align: 'right' },
            { label: 'Audit Experience Score', name: 'audit_experience_score', width: 150, align: 'right' },
            { label: 'Experience Score', name: 'experience_score', width: 150, align: 'right' },
            { label: 'Written Exam Score', name: 'written_exam_score', width: 150, align: 'right' },
            { label: 'Practical Exam Score', name: 'pratical_exam_score', width: 150, align: 'right' },
            { label: 'Observation Score', name: 'observation_score', width: 150, align: 'right' },
            { label: 'Commitee Score', name: 'committee_score', width: 150, align: 'right', hidden: true },
            { label: 'Total Score', name: 'total_Score', width: 150, align: 'center', hidden: true },
            { label: 'Level Auditor', name: 'level_auditor_komplit', width: 150, align: 'left', hidden: false },

            { label: 'Note', name: 'note', width: 150, align: 'left' },
            { label: 'Status', name: 'status2', width: 150, align: 'center', hidden: true },
            { label: 'Start Date', name: 'start_date', width: 120, align: 'center', hidden: false },
            { label: 'End Date', name: 'end_date', width: 120, align: 'center', hidden: false },

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
    if (user_type == '3' ||  user_type == '0') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Add/Edit Score"><i class="fa fa-edit"></i> &nbspAdd/Edit Score</a> \
        <a class="btn btn-info btn-sm2" id="btn_verification" title="Verification Score"><i class="fa fa-check"></i> &nbspVerification Score</a> \
        <a class="btn btn-danger btn-sm2" id="btn_reject" title="Reject Assignmnent" style="display:none"><i class="fa fa-trash"></i> &nbspReject Assignment</a> \
        </div> \
        ');
    } else if (user_type == '2' ||  user_type == '0') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-success btn-sm2" id="btn_detail"  title="Show Detail Score"><i class="fa fa-search"></i> &nbspShow Detail</a> \
        <a class="btn btn-warning btn-sm2" id="btn_reassignment"  title="Re-Assignmnent"><i class="fa fa-undo"></i> &nbspRe-Assignment</a> \
        </div> \
        ');
    } else if (user_type == '1' ||  user_type == '0') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-success btn-sm2" id="btn_detail"  title="Show Detail Score"><i class="fa fa-search"></i> &nbspShow Detail</a> \
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
            var assignment_id = data.assignment_id;
            var status = data.status2;
            var total_Score = data.total_Score;

            if (status == '0' && total_Score > 0) {
                $.confirm({
                    title: "Verification", icon: 'fa fa-check', backgroundDismiss: false,
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
                            type: "POST", dataType: "json", data: { assignment_id: assignment_id },
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

    $('#btn_reject').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var assignment_id = data.assignment_id;
            var status = data.status2;
            var total_Score = data.total_Score;

            if (status == '0') {
                $.confirm({
                    title: "Reject Assignment", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Reject Assignment ? Are You Sure?',
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
                            type: "POST", dataType: "json", data: { assignment_id: assignment_id },
                            url: site_url + '/Scoring/reject_assignment',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Reject Assginment Success.',
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
            } else {
                Template.WarningAlert("Score sudah diverifikasi tidak bisa direject");
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
            var assignment_id = data.assignment_id;
            var status = data.status2;
            var committee_id = data.committee_id;
            
            if (status == '0' || status == '' || status == null) {
                $('#id', FormEdit).val(assignment_id);
                $.ajax({
                    type: "POST", dataType: "json", data: { assignment_id: assignment_id,committee_id:committee_id },
                    async: false,
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
                        $('#label_scope', FormEdit).html('Scope Score (' + response.scope_code + ')');
                        $('#note', FormEdit).val(response.note);
                        $('#committee_score', FormEdit).val(response.committee_score);
                        $('#level_auditor', FormEdit).val(response.level_auditor);
                        
                        if ( response.penguji_ujian=='0') {
                            //$('#written_exam_score', FormEdit).attr('readonly', true);
                            //$('#pratical_exam_score', FormEdit).attr('readonly', true);
                            //$('#observation_score', FormEdit).attr('readonly', true);
                            $('.penguji').hide();
                        } else {
                            //$('#written_exam_score', FormEdit).attr('readonly', false);
                            //$('#pratical_exam_score', FormEdit).attr('readonly', false);
                            //$('#observation_score', FormEdit).attr('readonly', false);
                            $('.penguji').show();
                        }
                        

                        $('#btn_preview_written', FormEdit).attr('href', response.written_exam_path == '' || response.written_exam_path == null ? 'javascript:' : site_url + response.written_exam_path);
                        $('#btn_preview_practical', FormEdit).attr('href', response.practical_exam_path == '' || response.practical_exam_path == null ? 'javascript:' : site_url + response.practical_exam_path);
                        $('#btn_preview_observation', FormEdit).attr('href', response.observation_path == '' || response.observation_path == null ? 'javascript:' : site_url + response.observation_path);
                                
                        /** tampilkan scope */
                        assignment_id = response.assignment_id;
                        $('.sikat-scope', FormEdit).remove();
                        $('.sikat-fieldcode', FormEdit).remove();
                        scope_id = response.scope_id;
                        /** tampilkan field_code */
                        fill_field_code(assignment_id, scope_id);
                        
                        total_score(FormEdit);



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

    $('#btn_reassignment').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var status = data.status2;
            var total_Score = data.total_Score;
            var assignment_id = data.assignment_id;
            var committee = data.committee_id;
            var start_date = data.start_date;
            var end_date = data.end_date;
            var note = data.note;
            if (status != '1') {
                $('#id', FormReas).val(id);
                $('#assignment_id', FormReas).val(assignment_id);
                $('#committee_lama', FormReas).val(committee);
                $('#committee', FormReas).val(committee);
                $('#start_date', FormReas).val(start_date);
                $('#end_date', FormReas).val(end_date);
                $('#note', FormReas).val(note);
                $('#modal_assignment').modal('show');
            } else {
                Template.WarningAlert("Score sudah diverifikasi tidak bisa dire-assignment");
            }
        } else {
            Template.WarningAlert("Please select a row.");
        }
    });

    $('#btn_close', FormReas).click(function (e) {
        e.preventDefault();
        $('#FormAssignment').trigger('reset');
        $('#modal_assignment').modal('hide');
    });

    $('#btn_proses').click(function (e) {
        e.preventDefault();
        id = $('#id').val();
        committee = $('#committee').val();
        assignment_id = $('#assignment_id').val();
        committee_lama = $('#committee_lama').val();
        start_date = $('#start_date').val();
        end_date = $('#end_date').val();
        note = $('#note').val();

        $('#btn_proses').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Proccessing.....');
        $('#btn_proses').attr('disabled', true);
        $('#btn_close').attr('disabled', true);
        $('#alert_result').hide();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                assignment_id: assignment_id,
                committee_lama: committee_lama,
                committee: committee,
                start_date: start_date,
                end_date: end_date,
                note: note
            },
            url: site_url + '/Scoring/re_assignment',
            success: function (response) {
                if (response.success == true) {
                    $.alert({
                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                        content: 'Proccess Re-Assignment Success.',
                        confirmButtonClass: 'btn green',
                        confirm: function () {
                            $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                            $('#btn_proses').removeAttr('disabled');
                            $('#btn_close').removeAttr('disabled');
                            $('#jqgrid_data').trigger('reloadGrid')
                            $('#modal_assignment').modal('hide');
                            FormReas.trigger('reset');
                            // window.location.reload();
                        }
                    });

                } else {
                    Template.WarningAlert(response.error);
                    $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                    $('#btn_proses').removeAttr('disabled');
                    $('#btn_close').removeAttr('disabled');
                    $('#modal_assignment').modal('hide');
                }
            },
            error: function () {
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                $('#btn_proses').removeAttr('disabled');
                $('#btn_close').removeAttr('disabled');
                $('#modal_assignment').modal('hide');

            }
        });


    });

    $('#btn_detail').click(function (e) {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var assignment_id = data.assignment_id;
            var committee_id = data.committee_id;
                $('#id', FormDetail).val(assignment_id);
                $.ajax({
                    type: "POST", dataType: "json", data: { assignment_id: assignment_id , committee_id:committee_id},
                    async: false,
                    url: site_url + '/Scoring/get_data_scoring_by_id',

                    success: function (response) {
                        $('#jqgrid').hide();
                        $('#detail').show();
                        $('.card-title', detail).html('ASSESMENT FOR  <a class="btn btn-warning"  href="/Profile/ambil_profil/' + response.user_id + '" style="color: green; text - decoration: underline" target="_blank"> ' + response.full_name.toUpperCase() + ' ( ' + response.certification_number.toUpperCase() + ' ) </a>');
                        $('#education_score', FormDetail).val(response.education_score);
                        $('#training_score', FormDetail).val(response.training_score);
                        $('#audit_experience_score', FormDetail).val(response.audit_experience_score);
                        $('#experience_score', FormDetail).val(response.experience_score);
                        $('#written_exam_score', FormDetail).val(response.written_exam_score);
                        $('#pratical_exam_score', FormDetail).val(response.pratical_exam_score);
                        $('#observation_score', FormDetail).val(response.observation_score);
                        $('#scope_score', FormDetail).val(response.scope_score);
                        $('#label_scope', FormDetail).html('Scope Score (' + response.scope_code + ')');
                        $('#note', FormDetail).val(response.note);
                        $('#committee_score', FormDetail).val(response.committee_score);
                        $('#level_auditor', FormDetail).val(response.level_auditor);

                        $('#btn_preview_written', FormDetail).attr('href', response.written_exam_path == '' || response.written_exam_path == null ? 'javascript:' : site_url + response.written_exam_path);
                        $('#btn_preview_practical', FormDetail).attr('href', response.practical_exam_path == '' || response.practical_exam_path == null ? 'javascript:' : site_url + response.practical_exam_path);
                        $('#btn_preview_observation', FormDetail).attr('href', response.observation_path == '' || response.observation_path == null ? 'javascript:' : site_url + response.observation_path);
                                
                        /** tampilkan scope */
                        assignment_id = response.assignment_id;
                        $('.sikat-scope', FormDetail).remove();
                        $('.sikat-fieldcode', FormDetail).remove();
                        scope_id = response.scope_id;
                        /** tampilkan field_code */
                        fill_field_code(assignment_id, scope_id);
                        
                        total_score(FormDetail);



                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                })
        } else {
            Template.WarningAlert("Please select a row");
        }

    })


    var fill_field_code = function (assignment_id, scope_id) {
        $.ajax({
            type: "POST",
            url: site_url + '/Scoring/get_data_assignmentd_fieldcode',
            async: false,
            data: {
                assignment_id: assignment_id,
                scope_id: scope_id
            },
            dataType: "json",
            success: function (response) {

                let html = "";
                let jf = 0;
                for (j in response) {
                    html += '<div class="sikat-fieldcode">'
                    html += '<div class="form-group row">';
                    html += '    <label class="col-sm-4 control-label" style="text-align:right">' + response[j].fieldcode_code + '-' + response[j].fieldcode_description + '</label>';
                    html += '    <div class="col-sm-4">';
                    html += '        <select name="fieldcode_score[]" id="fieldcode_score" class="form-control">';
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
                    html += '        <input type="hidden" class="form-control" id="fieldcode_id" name="fieldcode_id[]" value="' + response[j].fieldcode_id + '">';
                    html += '    </div>';
                    html += '</div>';
                    html += '</div>';
                    jf++;
                } /** end of response j */
                //  alert(js + '-' + jf);
                $('#jumlah_fieldcode', FormEdit).val(jf);
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
            education_score: { required: true, number: true },
            training_score: { required: true, number: true },
            audit_experience_score: { required: true, number: true },
            experience_score: { required: true, number: true },
            written_exam_score: { required: true, number: true },
            pratical_exam_score: { required: true, number: true },
            committee_score: { required: true, number: true }

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
            education_score: { required: true, number: true },
            training_score: { required: true, number: true },
            audit_experience_score: { required: true, number: true },
            experience_score: { required: true, number: true },
            written_exam_score: { required: true, number: true },
            pratical_exam_score: { required: true, number: true },
            committee_score: { required: true, number: true }
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

    $('#education_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
         //bisa angka, koma dan titik
         //return (e.keyCode > 31 && (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode !== 190 && e.keyCode !== 188))) ? false : true;
   });

    $('#training_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#audit_experience_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#experience_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#written_exam_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#pratical_exam_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#observation_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#committee_score',FormEdit).keydown(function (e) {
         return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#education_score',FormEdit).keyup(function () {
        if ($(this).val() > 90) {
            alert("Maksimal 90");
            $(this).val('90');
        }
        total_score(FormEdit);
    });

    $('#training_score',FormEdit).keyup(function () {
        total_score(FormEdit);
    });
    
    $('#audit_experience_score',FormEdit).keyup(function () {
        total_score(FormEdit);
    });
   
    $('#experience_score',FormEdit).keyup(function () {
        total_score(FormEdit);
    });
   
    $('#written_exam_score',FormEdit).keyup(function () {
        if ($(this).val() > 100) {
            alert("Maksimal 100");
            $(this).val('100');
        }
        total_score(FormEdit);
    });

    $('#pratical_exam_score',FormEdit).keyup(function () {
        if ($(this).val() > 100) {
            alert("Maksimal 100");
            $(this).val('100');
        }
        total_score(FormEdit);
    });

    $('#observation_score',FormEdit).keyup(function () {
        if ($(this).val() > 100) {
            alert("Maksimal 100");
            $(this).val('100');
        }
        total_score(FormEdit);
    });
    
    var total_score=function (sForm) {
        var education_score=parseInt($("#education_score",sForm).val());
        var training_score=parseInt($("#training_score",sForm).val());
        var audit_experience_score=parseInt($("#audit_experience_score",sForm).val());
        var experience_score=parseInt($("#experience_score",sForm).val());
        var written_exam_score=parseInt($("#written_exam_score",sForm).val());
        var pratical_exam_score=parseInt($("#pratical_exam_score",sForm).val());
        var observation_score=parseInt($("#observation_score",sForm).val());
        
        $("#total_score",sForm).val(education_score+training_score+audit_experience_score+experience_score+written_exam_score+pratical_exam_score+observation_score);
    }


    $('#btn_cancel', FormEdit).click(function () {
        $('#edit').hide();
        $('#jqgrid').show();
        $('.alert-error', FormEdit).hide();
        FormEdit.trigger('reset');
        $('.error', FormEdit).removeClass('error');
        $('.is-valid', FormEdit).removeClass('is-valid');
        $('.is-invalid', FormEdit).removeClass('is-invalid');
    })

    $('#btn_cancel', FormDetail).click(function () {
        $('#detail').hide();
        $('#jqgrid').show();
        $('.alert-error', FormDetail).hide();
        FormDetail.trigger('reset');
        $('.error', FormDetail).removeClass('error');
        $('.is-valid', FormDetail).removeClass('is-valid');
        $('.is-invalid', FormDetail).removeClass('is-invalid');
    })


    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });
    
    $('#written_exam_path', FormEdit).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview_written');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        //$('#text_doc_path_education_' + jumlah_education, educationku).val($(this).val());
    });
    
     $('#practical_exam_path',FormEdit).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview_practical');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        //$('#text_doc_path_education_' + jumlah_education, educationku).val($(this).val());
    });
    
     $('#observation_path',FormEdit).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview_observation');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        //$('#text_doc_path_education_' + jumlah_education, educationku).val($(this).val());
    });
    /*END EDIT*/



















}); //end of $(function(){});