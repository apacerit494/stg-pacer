$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), modal_secretariat_verified = $('#modal_secretariat_verified');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/ScoringFinal/jqgrid_scoring_final',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'assignment_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'committee_id', name: 'committee_id', width: 100, align: 'center', hidden: true },
            { label: 'User ID', name: 'user_id', width: 200, align: 'center', hidden: true },
            { label: 'Certificant', name: 'certificant', width: 200, align: 'left' },
            {
                label: 'Status', name: 'status', width: 150, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "0":
                            return "<span class='label label-xs label-warning'>Unverified</span>";
                            break;
                        case '1':
                            return "<span class='label label-xs label-info'>Verified by committee</span>";
                            break;
                        case '2':
                            return "<span class='label label-xs label-success'>Verified by secretariat</span>";
                            break;
                        default:
                            return "<span class='label label-xs label-danger'>No Score Yet</span>";
                            break;
                    }
                }
            },
            { label: 'Level Auditor', name: 'level_auditor_komplit', width: 200, align: 'left' },
            { label: 'scope_final', name: 'scope_score', width: 150, align: 'center'},
            { label: 'Total Score', name: 'total_Score', width: 150, align: 'center' },
            { label: 'Secretariat', name: 'secretariat', width: 200, align: 'center', hidden: true },
            { label: 'Commitee', name: 'committee', width: 200, align: 'center', hidden: true },
            { label: 'Education Score', name: 'education_score', width: 150, align: 'center' },
            { label: 'Training Score', name: 'training_score', width: 150, align: 'center' },
            { label: 'Audit Experience Score', name: 'audit_experience_score', width: 150, align: 'center' },
            { label: 'Experience Score', name: 'experience_score', width: 150, align: 'center' },
            { label: 'Written Exam Score', name: 'written_exam_score', width: 150, align: 'center' },
            { label: 'Practical Exam Score', name: 'pratical_exam_score', width: 150, align: 'center' },
            { label: 'Observation Score', name: 'observation_score', width: 150, align: 'center' },
            { label: 'Commitee Score', name: 'committee_score', width: 150, align: 'center', hidden: (user_type == '1' || user_type == '2' ? false : true) },
            { label: 'Note', name: 'note', width: 150, align: 'left' },
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
        caption: " &nbsp&nbsp&nbsp FINAL ASSESSMENT",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        },
        subGrid: true,
        subGridOptions: {
            "plusicon": "ui-icon-triangle-1-e",
            "minusicon": "ui-icon-triangle-1-s",
            "openicon": "ui-icon-arrowreturn-1-e"
        },
        subGridRowExpanded: function (ParentGridID, id) {
            var datagridSub, navGrid;
            SubGridID = ParentGridID + "_t";
            PagerID = "PagerID";
            navGrid = "p_" + datagridSub;
            $("#" + ParentGridID).html("<table id='" + SubGridID + "' class='scroll'></table><div id='" + PagerID + "' class='scroll'></div>");
            $("#" + SubGridID).jqGrid({
                url: site_url + '/ScoringFinal/subgrid_scoring',
                mtype: "GET",
                datatype: "json",
                //colNames: ['id', 'template_id', 'report_no', 'Plus Minus Flag', 'Source From', 'Source Thru', 'Calculation Formula'],
                width: 700,

                colModel: [
                    { label: 'ID', name: 'assignment_id', key: true, width: 100, align: 'center', hidden: true },
                    { label: 'Committee Name', name: 'full_name', width: 213, align: 'left' },
                    { label: 'Education Score', name: 'education_score', width: 150, align: 'center' },
                    { label: 'Training Score', name: 'training_score', width: 150, align: 'center' },
                    { label: 'Audit Experience Score', name: 'audit_experience_score', width: 150, align: 'center' },
                    { label: 'Experience Score', name: 'experience_score', width: 150, align: 'center' },
                    { label: 'Written Exam Score', name: 'written_exam_score', width: 150, align: 'center' },
                    { label: 'Practical Exam Score', name: 'pratical_exam_score', width: 150, align: 'center' },
                    { label: 'Observation Score', name: 'observation_score', width: 150, align: 'center' },
                    { label: 'Scope Score', name: 'scope_score', width: 150, align: 'center' },
                    { label: 'Level Auditor', name: 'level_auditor', width: 150, align: 'left' },
                    { label: 'Note', name: 'note', width: 250, align: 'left' },
                    {
                        label: 'Status', name: 'status', width: 150, align: 'center', formatter: function (cellvalue) {
                            switch (cellvalue) {
                                case "0":
                                    return "<span class='label label-xs label-warning'>Unverified</span>";
                                    break;
                                case '1':
                                    return "<span class='label label-xs label-info'>Verified</span>";
                                    break;
                                default:
                                    return "<span class='label label-xs label-danger'>No Score Yet</span>";
                                    break;
                            }
                        }
                    },
                    { label: 'Status', name: 'status2', width: 150, align: 'center', hidden: true }
                ],
                jsonReader: {
                    repeatitems: false,        // To Bind the Data in Grid, if it is JSON format.
                    id: "id",
                    root: function (obj) { return obj; },   // To Bind the Data in Grid.
                    page: function () { return 1; },
                    total: function () { return 1; },
                    records: function (obj) { return obj.length; },
                },
                // caption: "Daftar Account Code",
                viewrecords: true,
                rowNum: 20,
                pager: '#PagerID',
                sortname: 'num',
                sortorder: "asc",
                postData: { id: id },
                height: '120%',
                autowidth: true,
                shrinkToFit: true


            });
        }
    });


    // jQuery("#jqgrid_data").jqGrid('navGrid', '#jqgrid_data_pager', { del: false, add: false, edit: false, search: false });
    // jQuery("#jqgrid_data").jqGrid('filterToolbar', { stringResult: true, searchOnEnter: true });


    //$("#t_jqgrid_data").append('<button class="jqGrid_edit" id="btn_edit"></button>');
    if (  user_type == '0') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Add/Edit Final Score"><i class="fa fa-edit"></i> &nbspAdd/Edit Final Score</a> \
        <a class="btn btn-info btn-sm2" id="btn_verification" title="Verification Final Score"><i class="fa fa-check"></i> &nbspVerification Final Score</a> \
        <a class="btn btn-success btn-sm2" id="btn_secretariat_verification"><i class="fa fa-check"></i> &nbspSecretariat Verification</a> \
        </div> \
        ');
    }
    
    if ( user_type == '2' || user_type == '1' ) {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Add/Edit Final Score"><i class="fa fa-edit"></i> &nbspAdd/Edit Final Score</a> \
        <a class="btn btn-success btn-sm2" id="btn_secretariat_verification"><i class="fa fa-check"></i> &nbspSecretariat Verification</a> \
        </div> \
        ');
    }
    
    if (user_type == '4' ) {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Add/Edit Final Score"><i class="fa fa-edit"></i> &nbspAdd/Edit Final Score</a> \
        <a class="btn btn-info btn-sm2" id="btn_verification" title="Verification Final Score"><i class="fa fa-check"></i> &nbspVerification Final Score</a> \
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

    // $('#btn_pdf').click(function () {
    //     var url = site_url + '/ScoringFinal/surat_penetapan';
    //     window.open(url, '_blank');      
    // });


    /*SETUP BUTTON ACTIONS*/
    $("#btn_add").click(function () {
        $('#jqgrid').hide();
        $('#add').show();
        FormAdd.trigger('reset');
    });

    $('#btn_verification').click(function () {
        if (user_type == '4') {
            selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
            if (selrow) {
                var id = selrow;
                var data = $('#jqgrid_data').jqGrid('getRowData', id);
                var status = data.status2;
                var total_Score = data.total_Score;
                var education_score = data.education_score;
                var experience_score = data.experience_score;
                var audit_experience_score = data.audit_experience_score;
                var training_score = data.training_score;
                if (status == '0' && total_Score > 0) {
                    $.confirm({
                        title: "Verification", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Verification Final Score ? Are You Sure?',
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
                                data: {
                                    assignment_id: selrow,
                                    education_score: education_score,
                                    experience_score: experience_score,
                                    audit_experience_score: audit_experience_score,
                                    training_score: training_score
                                },
                                url: site_url + '/ScoringFinal/verification_score_final',
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
        } else {
            Template.WarningAlert("Hanya committee yang bisa melakukan verifikasi nilai akhir");
        }
    });

    $('#btn_secretariat_verification').click(function () {
        if (user_type == '1' || user_type == '2') {
            selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
            if (selrow) {
                var id = selrow;
                var data = $('#jqgrid_data').jqGrid('getRowData', id);
                var status = data.status2;
                var committee_id = data.committee_id;
                if (status == '1') {
                    $.confirm({
                        title: "Verification", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Verification Secretariat ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        // confirmButtonCaption: 'Yes',
                        cancelButtonClass: 'btn red',
                        // cancelButtonText: 'No',
                        confirmButtonClass: 'btn green',
                        confirmButton: 'Yes',
                        cancelButton: 'No',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $('#assignment_id', '#modal_secretariat_verified').val(id);
                            $('#committee_id', '#modal_secretariat_verified').val(committee_id);
                            $('#modal_secretariat_verified').modal('show');

                        }
                    })

                } else if (status == null || status == '') {
                    Template.WarningAlert("Belum ada nilai tidak bisa diverifikasi");
                } else if (status == '2') {
                    Template.WarningAlert("Score sudah diverifikasi tidak bisa diverifikasi ulang");
                }

            } else {
                Template.WarningAlert("Please select a row.");
            }
        } else {
            Template.WarningAlert("Hanya Secreatriat atau Admin yang bisa melakukan verifikasi Sekretariat");
        }
    });

    $('#btn_proses').click(function (e) {
        e.preventDefault();
        //  $('#btn_proses').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Processing...');
        //$('#btn_proses', '#modal_secretariat_verified').attr('disabled', true);

        //alert("halo");

        assignment_id = $('#assignment_id', '#modal_secretariat_verified').val();
        committee_id = $('#committee_id', '#modal_secretariat_verified').val();
        remarks = $('#remarks', '#modal_secretariat_verified').val();

        $('#btn_proses').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Processing.....');
        $('#btn_proses').attr('disabled', true);
        $('#btn_close', '#modal_secretariat_verified').attr('disabled', true);

        $.ajax({
            type: "POST", dataType: "json",
            data: {
                assignment_id: assignment_id,
                committee_id: committee_id,
                remarks: remarks
            },
            //async: false,
            url: site_url + '/ScoringFinal/verification_secretariat',
            success: function (response) {
                if (response.success === true) {
                    $.alert({
                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                        content: 'Ceritification berhasil dengan nomor SK : ' + response.sk_number,
                        confirmButtonClass: 'btn green',
                        confirm: function () {
                            $('#userfile').val('');
                            $('#jqgrid_data').trigger('reloadGrid');
                            $('#modal_secretariat_verified').modal('hide');
                            $('#btn_proses', modal_secretariat_verified).html('<i class="fa fa-check"></i> &nbsp;Proses');
                            $('#btn_proses', modal_secretariat_verified).removeAttr('disabled');
                        }
                    })
                } else {
                    Template.WarningAlert(response.msg);
                    $('#btn_proses', modal_secretariat_verified).html('<i class="fa fa-check"></i> &nbsp;Proses');
                    $('#btn_proses', modal_secretariat_verified).removeAttr('disabled');
                }
            },
            error: function () {
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                $('#btn_proses', modal_secretariat_verified).html('<i class="fa fa-check"></i> &nbsp;Proses');
                $('#btn_proses', modal_secretariat_verified).removeAttr('disabled');
            }
        });
        $('#btn_proses').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Processing.....');
        $('#btn_proses').attr('disabled', true);
        $('#btn_close', '#modal_secretariat_verified').attr('disabled', true);



    });

    

    $('#btn_edit').click(function (e) {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var status = data.status2;
            var user_id = data.user_id;
            if (status == '0' || status == '' || status == null || user_type == '1' || user_type == '2') {
                $('#id', FormEdit).val(id);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    async: false,
                    data: { assignment_id: id, user_id: user_id },
                    url: site_url + '/ScoringFinal/get_data_scoring_final_by_id',
                    success: function (response) {
                        $('#jqgrid').hide();
                        $('#edit').show();
                        $('.card-title', edit).html('ASSESMENT FOR  <a class="btn btn-warning" href="/Profile/ambil_profil/' + response.user_id + '" target="_blank"> ' + response.full_name.toUpperCase() + ' ( ' + response.certification_number.toUpperCase() + ' ) </a>');
                        $('#education_score3', FormEdit).val(response.education_score);
                        $('#training_score3', FormEdit).val(response.training_score);
                        $('#audit_experience_score3', FormEdit).val(response.audit_experience_score);
                        $('#experience_score3', FormEdit).val(response.experience_score);
                        $('#written_exam_score3', FormEdit).val(response.written_exam_score);
                        $('#pratical_exam_score3', FormEdit).val(response.pratical_exam_score);
                        $('#observation_score3', FormEdit).val(response.observation_score);
                        $('#scope_score3', FormEdit).val(response.scope_score);
                        $('#label_scope', FormEdit).html('Scope Score (' + response.scope_code + ')');
                        $('#note3', FormEdit).val(response.note);
                        $('#committee_score3', FormEdit).val(response.committee_score);
                        $('#label3', FormEdit).html('Committee Certification <br> ' + response.committee_name)
                        $('#committee_id3', FormEdit).val(response.committee_id);
                        $('#level_auditor3', FormEdit).val(response.level_auditor);
                        
                        $('#btn_preview_written3', FormEdit).attr('href', response.written_exam_path == '' || response.written_exam_path == null ? 'javascript:' : site_url + response.written_exam_path);
                        $('#btn_preview_practical3', FormEdit).attr('href', response.practical_exam_path == '' || response.practical_exam_path == null ? 'javascript:' : site_url + response.practical_exam_path);
                        $('#btn_preview_observation3', FormEdit).attr('href', response.observation_path == '' || response.observation_path == null ? 'javascript:' : site_url + response.observation_path);
                       
                        
                        if ( response.penguji_ujian=='0') {
                            $('#written_exam_score3', FormEdit).attr('readonly', true);
                            $('#pratical_exam_score3', FormEdit).attr('readonly', true);
                            $('#observation_score3', FormEdit).attr('readonly', true);
                            
                            $('#written_exam_path3', FormEdit).attr('disabled', true);
                            $('#practical_exam_path3', FormEdit).attr('disabled', true);
                            $('#observation_path3', FormEdit).attr('disabled', true);
                            
                            
                            $('#btn_preview_written3', FormEdit).attr('href','javascript:void(0)');
                            $('#btn_preview_written3', FormEdit).removeAttr('target');
                            $('#btn_preview_written3', FormEdit).attr('class','btn btn-secondary');
                            
                            $('#btn_preview_practical3', FormEdit).attr('href','javascript:void(0)');
                            $('#btn_preview_practical3', FormEdit).attr('class','btn btn-secondary');
                            $('#btn_preview_practical3', FormEdit).removeAttr('target');
                            
                            $('#btn_preview_observation3', FormEdit).attr('href','javascript:void(0)');
                            $('#btn_preview_observation3', FormEdit).attr('class','btn btn-secondary');
                            $('#btn_preview_observation3', FormEdit).removeAttr('target');
                            
                        } else {
                            $('#written_exam_score3', FormEdit).attr('readonly', false);
                            $('#pratical_exam_score3', FormEdit).attr('readonly', false);
                            $('#observation_score3', FormEdit).attr('readonly', false);
                            
                            $('#written_exam_path3', FormEdit).attr('readonly', false);
                            $('#practical_exam_path3', FormEdit).attr('readonly', false);
                            $('#observation_path3', FormEdit).attr('readonly', false);
                            
                            
                            $('#btn_preview_written3', FormEdit).attr('disabled',false);
                            $('#btn_preview_written3', FormEdit).attr('target','_blank');
                            $('#btn_preview_written3', FormEdit).attr('class','btn btn-primary');
                            
                            $('#btn_preview_practical3', FormEdit).attr('disabled',false);
                            $('#btn_preview_practical3', FormEdit).attr('target','_blank');
                            $('#btn_preview_practical3', FormEdit).attr('class','btn btn-primary');
                            
                            $('#btn_preview_observation3', FormEdit).attr('disabled',false);
                            $('#btn_preview_observation3', FormEdit).attr('target','_blank');
                            $('#btn_preview_observation3', FormEdit).attr('class','btn btn-primary');
                            
                        }
                        

                        
                        /** isi score scope */

                        fill_field_code(id);

                        if (user_type == '1' || user_type == '2') {
                            $('#education_score3', FormEdit).attr('disabled', true);
                            $('#training_score3', FormEdit).attr('disabled', true);
                            $('#audit_experience_score3', FormEdit).attr('disabled', true);
                            $('#experience_score3', FormEdit).attr('disabled', true);
                            $('#written_exam_score3', FormEdit).attr('disabled', true);
                            $('#pratical_exam_score3', FormEdit).attr('disabled', true);
                            $('#observation_score3', FormEdit).attr('disabled', true);
                            $('#scope_score3', FormEdit).attr('disabled', true);
                            $('#level_auditor3', FormEdit).attr('disabled', true);
                            //   $('#note3', FormEdit).attr('disabled', true);
                        } else {
                            $('#education_score3', FormEdit).removeAttr('disabled');
                            $('#training_score3', FormEdit).removeAttr('disabled');
                            $('#audit_experience_score3', FormEdit).removeAttr('disabled');
                            $('#experience_score3', FormEdit).removeAttr('disabled');
                            $('#written_exam_score3', FormEdit).removeAttr('disabled');
                            $('#pratical_exam_score3', FormEdit).removeAttr('disabled');
                            $('#observation_score3', FormEdit).removeAttr('disabled');
                            $('#scope_score3', FormEdit).removeAttr('disabled');
                            $('#note3', FormEdit).removeAttr('disabled');
                            $('#level_auditor3', FormEdit).removeAttr('disabled');
                        }

                        /** isi data penilaian dari committee 1 & 2*/
                        $.ajax({
                            type: "POST",
                            async:false,
                            url: site_url + '/ScoringFinal/get_data_scoring_committe_by_id',
                            data: { assignment_id: id, user_id: user_id },
                            dataType: "json",
                            success: function (response) {
                                $('#education_score1', FormEdit).val(response[0].education_score);
                                $('#training_score1', FormEdit).val(response[0].training_score);
                                $('#audit_experience_score1', FormEdit).val(response[0].audit_experience_score);
                                $('#experience_score1', FormEdit).val(response[0].experience_score);
                                $('#written_exam_score1', FormEdit).val(response[0].written_exam_score);
                                $('#pratical_exam_score1', FormEdit).val(response[0].pratical_exam_score);
                                $('#note1', FormEdit).val(response[0].note);
                                $('#committee_score1', FormEdit).val(response[0].committee_score);
                                $('#observation_score1', FormEdit).val(response[0].observation_score);
                                $('#scope_score1', FormEdit).val(response[0].scope_score);
                                $('#label1', FormEdit).html('Committee 1 <br> ' + response[0].committee_name)
                                $('#committee_id1', FormEdit).val(response[0].committee_id);
                                $('#level_auditor1', FormEdit).val(response[0].level_auditor);
                                
                                $('#btn_preview_written1', FormEdit).attr('href', response[0].written_exam_path == '' || response[0].written_exam_path == null ? 'javascript:' : site_url + response[0].written_exam_path);
                                $('#btn_preview_practical1', FormEdit).attr('href', response[0].practical_exam_path == '' || response[0].practical_exam_path == null ? 'javascript:' : site_url + response[0].practical_exam_path);
                                $('#btn_preview_observation1', FormEdit).attr('href', response[0].observation_path == '' || response[0].observation_path == null ? 'javascript:' : site_url + response[0].observation_path);
                        
                                if ( response[0].penguji_ujian=='0') {
                                    
                                    $('#btn_preview_written1', FormEdit).attr('href','javascript:void(0)');
                                    $('#btn_preview_written1', FormEdit).removeAttr('target');
                                    $('#btn_preview_written1', FormEdit).attr('class','btn btn-secondary');
                           
                                    $('#btn_preview_practical1', FormEdit).attr('href','javascript:void(0)');
                                    $('#btn_preview_practical1', FormEdit).removeAttr('target');
                                    $('#btn_preview_practical1', FormEdit).attr('class','btn btn-secondary');
                                    
                                    $('#btn_preview_observation1', FormEdit).attr('href','javascript:void(0)');
                                    $('#btn_preview_observation1', FormEdit).removeAttr('target');
                                    $('#btn_preview_observation1', FormEdit).attr('class','btn btn-secondary');
                                    
                                    
                                } else {
                                    
                                    $('#btn_preview_written1', FormEdit).attr('disabled',false);
                                    $('#btn_preview_written1', FormEdit).attr('target','_blank');
                                    $('#btn_preview_written1', FormEdit).attr('class','btn btn-primary');
                           
                                    $('#btn_preview_practical1', FormEdit).attr('disabled',false);
                                    $('#btn_preview_practical1', FormEdit).attr('target','_blank');
                                    $('#btn_preview_practical1', FormEdit).attr('class','btn btn-primary');
                           
                                    $('#btn_preview_observation1', FormEdit).attr('disabled',false);
                                    $('#btn_preview_observation1', FormEdit).attr('target','_blank');
                                    $('#btn_preview_observation1', FormEdit).attr('class','btn btn-primary');
                          
                                }
                        
                                score_education1 = response[0].education_score;
                                score_audit1 = response[0].audit_experience_score;
                                score_experience1 = response[0].experience_score;
                                score_training1 = response[0].training_score;
                                score_written1 = response[0].written_exam_score;
                                score_practical1 = response[0].pratical_exam_score;
                                score_observation1 = response[0].observation_score;

                                $('#education_score2', FormEdit).val(response[1].education_score);
                                $('#audit_experience_score2', FormEdit).val(response[1].audit_experience_score);
                                $('#experience_score2', FormEdit).val(response[1].experience_score);
                                $('#training_score2', FormEdit).val(response[1].training_score);
                                $('#written_exam_score2', FormEdit).val(response[1].written_exam_score);
                                $('#pratical_exam_score2', FormEdit).val(response[1].pratical_exam_score);
                                $('#note2', FormEdit).val(response[1].note);
                                $('#committee_score2', FormEdit).val(response[1].committee_score);
                                $('#observation_score2', FormEdit).val(response[1].observation_score);
                                $('#scope_score2', FormEdit).val(response[1].scope_score);
                                $('#label2', FormEdit).html('Committee 2 <br> ' + response[1].committee_name)
                                $('#committee_id2', FormEdit).val(response[1].committee_id);
                                $('#level_auditor2', FormEdit).val(response[1].level_auditor);

                                $('#btn_preview_written2', FormEdit).attr('href', response[1].written_exam_path == '' || response[1].written_exam_path == null ? 'javascript:' : site_url + response[1].written_exam_path);
                                $('#btn_preview_practical2', FormEdit).attr('href', response[1].practical_exam_path == '' || response[1].practical_exam_path == null ? 'javascript:' : site_url + response[1].practical_exam_path);
                                $('#btn_preview_observation2', FormEdit).attr('href', response[1].observation_path == '' || response[1].observation_path == null ? 'javascript:' : site_url + response[1].observation_path);
                        
                                if ( response[1].penguji_ujian=='0') {
                                    
                                    $('#btn_preview_written2', FormEdit).attr('href','javascript:void(0)');
                                    $('#btn_preview_written2', FormEdit).removeAttr('target');
                                    $('#btn_preview_written2', FormEdit).attr('class','btn btn-secondary');
                            
                                    $('#btn_preview_practical2', FormEdit).attr('href','javascript:void(0)');
                                    $('#btn_preview_practical2', FormEdit).removeAttr('target');
                                    $('#btn_preview_practical2', FormEdit).attr('class','btn btn-secondary');
                           
                                    $('#btn_preview_observation2', FormEdit).attr('href','javascript:void(0)');
                                    $('#btn_preview_observation2', FormEdit).removeAttr('target');
                                    $('#btn_preview_observation2', FormEdit).attr('class','btn btn-secondary');
                           
                                    
                                } else {
                                    
                                    $('#btn_preview_written2', FormEdit).attr('disabled',false);
                                    $('#btn_preview_written2', FormEdit).attr('target','_blank');
                                    $('#btn_preview_written2', FormEdit).attr('class','btn btn-primary');
                               
                                    $('#btn_preview_practical2', FormEdit).attr('disabled',false);
                                    $('#btn_preview_practical2', FormEdit).attr('target','_blank');
                                    $('#btn_preview_practical2', FormEdit).attr('class','btn btn-primary');
                                    
                                    $('#btn_preview_observation2', FormEdit).attr('disabled',false);
                                    $('#btn_preview_observation2', FormEdit).attr('target','_blank');
                                    $('#btn_preview_observation2', FormEdit).attr('class','btn btn-primary');
                                   
                                }
                                score_education2 = response[1].education_score;
                                score_audit2 = response[1].audit_experience_score;
                                score_experience2 = response[1].experience_score;
                                score_training2 = response[1].training_score;
                                score_written2 = response[1].written_exam_score;
                                score_practical2 = response[1].pratical_exam_score;
                                score_observation2 = response[1].observation_score;

                                //percent_education = (score_education1 <= score_education2) ? parseFloat(score_education1) / parseFloat(score_education2) : parseFloat(score_education2) / parseFloat(score_education1);
                                //percent_audit = (score_audit1 <= score_audit2) ? parseFloat(score_audit1) / parseFloat(score_audit2) : parseFloat(score_audit2) / parseFloat(score_audit1);
                                //percent_experience = (score_experience1 <= score_experience2) ? parseFloat(score_experience1) / parseFloat(score_experience2) : parseFloat(score_experience2) / parseFloat(score_experience1);
                                //percent_training = (score_training1 <= score_training2) ? parseFloat(score_training1) / parseFloat(score_training2) : parseFloat(score_training2) / parseFloat(score_training1);
                                //percent_written = (score_written1 <= score_written2) ? parseFloat(score_written1) / parseFloat(score_written2) : parseFloat(score_written2) / parseFloat(score_written1);
                                //percent_practical = (score_practical1 <= score_practical2) ? parseFloat(score_practical1) / parseFloat(score_practical2) : parseFloat(score_practical2) / parseFloat(score_practical1);
                                
                                percent_education = Math.abs(score_education1 - score_education2)/ parseFloat(score_education1) ;
                                percent_audit = Math.abs(score_audit1 - score_audit2)/ parseFloat(score_audit1) ;
                                percent_experience = Math.abs(score_experience1 - score_experience2)/ parseFloat(score_experience1) ;
                                percent_training = Math.abs(score_training1 - score_training2)/ parseFloat(score_training1) ;
                                percent_written = Math.abs(score_written1 - score_written2)/ parseFloat(score_written1) ;
                                percent_practical = Math.abs(score_practical1 - score_practical2)/ parseFloat(score_practical1) ;
                                
                                
                                if (user_type == '4') {
                                    (percent_education > 0.2) ? $('#label_education', FormEdit).html('Please Recheck').attr('style', 'color:red') : $('#label_education', FormEdit).html('Good').attr('style', 'color:green');
                                    (percent_audit > 0.2) ? $('#label_audit', FormEdit).html('Please Recheck').attr('style', 'color:red') : $('#label_audit', FormEdit).html('Good').attr('style', 'color:green');
                                    (percent_experience > 0.2) ? $('#label_experience', FormEdit).html('Please Recheck').attr('style', 'color:red') : $('#label_experience', FormEdit).html('Good').attr('style', 'color:green');
                                    (percent_training > 0.2) ? $('#label_training', FormEdit).html('Please Recheck').attr('style', 'color:red') : $('#label_training', FormEdit).html('Good').attr('style', 'color:green');
                                    //(percent_written < 0.8) ? $('#label_written', FormEdit).html('Please Recheck').attr('style', 'color:red') : $('#label_written', FormEdit).html('Good').attr('style', 'color:green');
                                    //(percent_practical < 0.8) ? $('#label_practical', FormEdit).html('Please Recheck').attr('style', 'color:red') : $('#label_practical', FormEdit).html('Good').attr('style', 'color:green');

                                    /** hitung rata2 */
                                    avg_education = Math.floor((parseFloat(score_education1) + parseFloat(score_education2)) / 2);
                                    avg_audit = Math.floor((parseFloat(score_audit1) + parseFloat(score_audit2)) / 2);
                                    avg_experience = Math.floor((parseFloat(score_experience1) + parseFloat(score_experience2)) / 2);
                                    avg_training = Math.floor((parseFloat(score_training1) + parseFloat(score_training2)) / 2);
                                    avg_written = Math.floor((parseFloat(score_written1) + parseFloat(score_written2))) ;
                                    avg_practical = Math.floor((parseFloat(score_practical1) + parseFloat(score_practical2)));
                                    avg_observation = Math.floor((parseFloat(score_observation1) + parseFloat(score_observation2)));
                                    
                                   // alert(score_practical1 + " - " + score_practical2);
                                    //alert(score_observation1 + " - " + score_observation2);
                                    
                                    
                                    var total_score= (parseFloat($('#education_score3', FormEdit).val())+parseFloat($('#audit_experience_score3', FormEdit).val())+parseFloat($('#experience_score3', FormEdit).val())
                                    +parseFloat($('#training_score3', FormEdit).val())+parseFloat($('#written_exam_score3', FormEdit).val())+parseFloat($('#pratical_exam_score3', FormEdit).val())
                                    +parseFloat($('#pratical_exam_score3', FormEdit).val()));
                                    
                                    
                                    if (total_score===0) {
                                        education_score3 = ($('#education_score3', FormEdit).val() == 0) ? avg_education : $('#education_score3', FormEdit).val();
                                        audit_experience_score3 = ($('#audit_experience_score3', FormEdit).val() == 0) ? avg_audit : $('#audit_experience_score3', FormEdit).val();
                                        experience_score3 = ($('#experience_score3', FormEdit).val() == 0) ? avg_experience : $('#experience_score3', FormEdit).val();
                                        training_score3 = ($('#training_score3', FormEdit).val() == 0) ? avg_training : $('#training_score3', FormEdit).val();
                                        written_exam_score3 = ($('#written_exam_score3', FormEdit).val() == 0) ? avg_written : $('#written_exam_score3', FormEdit).val();
                                        pratical_exam_score3 = ($('#pratical_exam_score3', FormEdit).val() == 0) ? avg_practical : $('#pratical_exam_score3', FormEdit).val();
                                        observation_score3 = ($('#observation_score3', FormEdit).val() == 0) ? avg_observation : $('#observation_score3', FormEdit).val();
                                        
                                        $('#education_score3', FormEdit).val(education_score3);
                                        $('#audit_experience_score3', FormEdit).val(audit_experience_score3);
                                        $('#experience_score3', FormEdit).val(experience_score3);
                                        $('#training_score3', FormEdit).val(training_score3);
                                        $('#written_exam_score3', FormEdit).val(written_exam_score3);
                                        $('#pratical_exam_score3', FormEdit).val(pratical_exam_score3);
                                        $('#observation_score3', FormEdit).val(observation_score3);
                                    }
                                    
                                }
                                
                                total_score1();
                                total_score2();
                                total_score3();
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

    var fill_field_code = function (assignment_id) {
        $.ajax({
            type: "POST",
            url: site_url + '/ScoringFinal/get_data_assignmentd_fieldcode',
            data: {
                assignment_id: assignment_id
            },
            dataType: "json",
            success: function (response) {
                $('.sikat-fieldcode', FormEdit).remove();
                let html = "";
                let js = 0;
                t = 0;
                for (j in response) {
                    t++;
                }
                //alert(t);
                for (k = 0; k < t; k = k + 3) {

                    //alert(i);

                    //  alert(html);
                    html += '<div class="sikat-fieldcode">';
                    html += '    <div class="form-group row">';
                    html += '        <label class="col-sm-3 control-label" style="text-align:right">' + response[k].fieldcode_code + '-' + response[k].fieldcode_description + '</label>';
                    html += '        <div class="col-sm-2">';
                    html += '            <select name="fieldcode_score1[]" id="fieldcode_score1" class="form-control" disabled>';
                    if (response[k].score == 'Y') {
                        html += '           <option value="Y" selected>OK</option>';
                        html += '           <option value="T" >Not OK</option>';
                    } else {
                        html += '           <option value="Y">OK</option>';
                        html += '           <option value="T" selected>Not OK</option>';
                    }
                    html += '            </select>';
                    html += '        </div>';
                    html += '        <div class="col-sm-2">';
                    html += '            <select name="fieldcode_score2[]" id="fieldcode_score2" class="form-control" disabled>';
                    if (response[k + 1].score == 'Y') {
                        html += '           <option value="Y" selected>OK</option>';
                        html += '           <option value="T" >Not OK</option>';
                    } else {
                        html += '           <option value="Y">OK</option>';
                        html += '           <option value="T" selected>Not OK</option>';
                    }

                    html += '            </select>';
                    html += '        </div>';
                    html += '        <div class="col-sm-2">';
                    if (user_type == '1' || user_type == '2') {
                        html += '            <select name="fieldcode_score3[]" id="fieldcode_score3" class="form-control" disabled>';
                    } else {
                        html += '            <select name="fieldcode_score3[]" id="fieldcode_score3" class="form-control">';
                    }
                    if (response[k + 2].score == 'Y') {
                        html += '           <option value="Y" selected>OK</option>';
                        html += '           <option value="T" >Not OK</option>';
                    } else {
                        html += '           <option value="Y">OK</option>';
                        html += '           <option value="T" selected>Not OK</option>';

                    }
                    html += '            </select>';
                    html += '        </div>';
                    html += '        <div class="col-sm-2">';
                    html += '            <input type="hidden" id="fieldcode_id1" name="fieldcode_id1[]" class="form-control" value="' + response[k].fieldcode_id + '">';
                    html += '        </div>';
                    html += '    </div>';
                    html += '</div>';
                    js++;
                }
                //alert(html);
                $('#jumlah_fieldcode', FormEdit).val(js);
                $('.fieldcode', FormEdit).append(html);
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
            scope_code: { required: true },
            scope_description: { required: true }

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
            scope_code: { required: true },
            scope_description: { required: true }
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

    $('#education_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
       //boleh angka, titik dan koma
       // return (e.keyCode > 31 && (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode !== 190 && e.keyCode !== 188))) ? false : true;
    });

    $('#training_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#audit_experience_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });
    $('#experience_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });
    $('#written_exam_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });
    $('#pratical_exam_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });
    $('#observation_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });
    $('#committee_score3').keydown(function (e) {
        return (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)) ? false : true;
    });

    $('#education_score3').keyup(function () {
        if ($(this).val() > 90) {
            alert("Maksimal 90");
            $(this).val('90');
        }
        total_score3();
    });

    $('#training_score3').keyup(function () {
        total_score3();
    });

    $('#audit_experience_score3').keyup(function () {
        total_score3();
    });

    $('#experience_score3').keyup(function () {
        total_score3();
    });
    
    $('#written_exam_score3').keyup(function () {
        if ($(this).val() > 100) {
            alert("Maksimal 100");
            $(this).val('100');
        }
        total_score3();
    });

    $('#pratical_exam_score3').keyup(function () {
        if ($(this).val() > 100) {
            alert("Maksimal 100");
            $(this).val('100');
        }
        total_score3();
    });

    $('#observation_score3').keyup(function () {
        if ($(this).val() > 100) {
            alert("Maksimal 100");
            $(this).val('100');
        }
        total_score3();
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

    // $('#btn_pdf').click(function () {
    //     window.open(site_url + '/pdf/pdf_gl_account_setup')
    // });

    $('#btn_close', '#modal_secretariat_verified').click(function (e) {
        e.preventDefault();
        $('#modal_secretariat_verified').modal('hide');
    });

    $('#written_exam_path3').change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview_written3');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        //$('#text_doc_path_education_' + jumlah_education, educationku).val($(this).val());
    });
    
    $('#practical_exam_path3').change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview_practical3');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        //$('#text_doc_path_education_' + jumlah_education, educationku).val($(this).val());
    });
    
     $('#observation_path3').change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview_observation3');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        //$('#text_doc_path_education_' + jumlah_education, educationku).val($(this).val());
    });
    
    var total_score3=function () {
        var education_score=parseInt($("#education_score3").val());
        var training_score=parseInt($("#training_score3").val());
        var audit_experience_score=parseInt($("#audit_experience_score3").val());
        var experience_score=parseInt($("#experience_score3").val());
        var written_exam_score=parseInt($("#written_exam_score3").val());
        var pratical_exam_score=parseInt($("#pratical_exam_score3").val());
        var observation_score=parseInt($("#observation_score3").val());
        
        $("#total_score3").val(education_score+training_score+audit_experience_score+experience_score+written_exam_score+pratical_exam_score+observation_score);
    }
    
     var total_score1=function () {
        let education_score1=parseInt($("#education_score1").val());
        let training_score1=parseInt($("#training_score1").val());
        let audit_experience_score1=parseInt($("#audit_experience_score1").val());
        let experience_score1=parseInt($("#experience_score1").val());
        let written_exam_score1=parseInt($("#written_exam_score1").val());
        let pratical_exam_score1=parseInt($("#pratical_exam_score1").val());
        let observation_score1=parseInt($("#observation_score1").val());
        
        //alert(education_score1);
        // alert(training_score1);
        // alert(audit_experience_score1);
        // alert(written_exam_score1);
        // alert(pratical_exam_score1);
        // alert(observation_score1);
        
        $("#total_score1").val(education_score1+training_score1+audit_experience_score1+experience_score1+written_exam_score1+pratical_exam_score1+observation_score1);
    }
    
     var total_score2=function () {
        var education_score2=parseInt($("#education_score2").val());
        var training_score2=parseInt($("#training_score2").val());
        var audit_experience_score2=parseInt($("#audit_experience_score2").val());
        var experience_score2=parseInt($("#experience_score2").val());
        var written_exam_score2=parseInt($("#written_exam_score2").val());
        var pratical_exam_score2=parseInt($("#pratical_exam_score2").val());
        var observation_score2=parseInt($("#observation_score2").val());
        
        $("#total_score2").val(education_score2+training_score2+audit_experience_score2+experience_score2+written_exam_score2+pratical_exam_score2+observation_score2);
    }
    
        $('#btn_scheme', FormEdit).click(function (e) {
             e.preventDefault();
            $('#modal_scheme').modal('show');
        })
    $("#btn_scheme", FormEdit).click 
}); //end of $(function(){});