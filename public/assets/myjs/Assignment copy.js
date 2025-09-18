$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#modal_assignment'), FormEdit = $('#FormEdit');
    var check_doc_dulu = '';

    $("#jqgrid_data").jqGrid({
        url: site_url + '/Assignment/jqgrid_assignment',
        mtype: "GET",
        datatype: "json",
        postData: {
            status: function () { return $("#status").val() },
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'certification_id', key: true, width: 100, align: 'center', hidden: false },
            { label: 'Certification Number', name: 'certification_number', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Apply Date', name: 'apply_date', width: 150, align: 'center' },
            { label: 'Full Name', name: 'full_name', width: 150, align: 'left' },
            { label: 'Description', name: 'description', width: 150, align: 'left' },
            { label: 'Cost', name: 'cost', width: 150, align: 'left', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            {
                label: 'Level Auditor', name: 'level_auditor', width: 150, align: 'left', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "1":
                            return 'Auditor Mula / Provisional Auditor';
                            break;
                        case "2":
                            return 'Auditor / Auditor';
                            break;
                        case "3":
                            return 'Auditor Kepala / Lead Auditor';
                            break;
                        case "4":
                            return 'Auditor Utama / Bussiness Improvement Auditor';
                            break;

                        default:
                            return cellvalue;
                            break;
                    }
                }
            },
            { label: 'Created At', name: 'createdAt', width: 150, align: 'center' },
            { label: 'Updated At', name: 'updatedAt', width: 150, align: 'center' },
            { label: 'level', name: 'level', width: 150, align: 'center' },
            { label: 'University', name: 'university', width: 150, align: 'center' },
            { label: 'Major', name: 'major', width: 150, align: 'center' },
            { label: 'Start Date Education', name: 'start_date_education', width: 150, align: 'center' },
            { label: 'End Date Education', name: 'end_date_education', width: 150, align: 'center' },
            { label: 'Certificate Number', name: 'certificate_number', width: 150, align: 'center' },
            { label: 'Accreditation Status', name: 'accreditation_status', width: 150, align: 'center' },
            { label: 'doc_path_education', name: 'doc_path_education', width: 150, align: 'center' },
            { label: 'company_name', name: 'company_name', width: 150, align: 'center' },
            { label: 'departement_id', name: 'departement_id', width: 150, align: 'center' },
            { label: 'position', name: 'position', width: 150, align: 'center' },
            { label: 'start_date_experience', name: 'start_date_experience', width: 150, align: 'center' },
            { label: 'end_date_experience', name: 'end_date_experience', width: 150, align: 'center' },
            { label: 'doc_path_experience', name: 'doc_path_experience', width: 150, align: 'center' },
            { label: 'company_addres', name: 'company_addres', width: 150, align: 'center' },
            { label: 'company_phone', name: 'company_phone', width: 150, align: 'center' },
            { label: 'contact_person', name: 'contact_person', width: 150, align: 'center' },
            { label: 'start_date_audit_experience', name: 'start_date_audit_experience', width: 150, align: 'center' },
            { label: 'end_date_audit_experience', name: 'end_date_audit_experience', width: 150, align: 'center' },
            { label: 'doc_audit_plan_path', name: 'doc_audit_plan_path', width: 150, align: 'center' },
            { label: 'doc_work_order_path', name: 'doc_work_order_path', width: 150, align: 'center' },
            { label: 'provider_name', name: 'provider_name', width: 150, align: 'center' },
            { label: 'start_date_training', name: 'start_date_training', width: 150, align: 'center' },
            { label: 'end_date_training', name: 'end_date_training', width: 150, align: 'center' },
            { label: 'training_topic', name: 'training_topic', width: 150, align: 'center' },
            { label: 'relation_status', name: 'relation_status', width: 150, align: 'center' },
            { label: 'doc_path_training', name: 'doc_path_training', width: 150, align: 'center' }

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
        // caption: " &nbsp&nbsp&nbsp ASSIGNMENT",
        multiselect: true,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager"
    });

    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-info btn-sm2" id="btn_assignment" data-toggle="modal" data-target="#modal_assignment" title="Proccess Assignment"><i class="fa fa-check"></i> &nbspProccess Assignment</a> \
    <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Edit Assignment"><i class="fa fa-check"></i> &nbspEdit Assignment</a> \
    <a class="btn btn-danger btn-sm2" id="btn_delete" title="Delete Assignment"><i class="fa fa-check"></i> &nbspDelete Assignment</a> \
    </div> \
    ');

    $('#status').change(function (e) {
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid')

    });
    $('#btn_close').click(function (e) {
        e.preventDefault();
        $('#modal_assignment').modal('hide');
    });

    $('#btn_edit').click(function (e) {
        e.preventDefault();
        status1 = $('#status').val();
        if (status1 == '1') {
            $.alert({
                title: 'Edit Assignment !', icon: 'fa fa-danger', backgroundDismiss: false,
                content: 'Hanya yang sudah diassignment yang bisa diedit',
                confirmButtonClass: 'btn-success',
                confirm: function () {
                    $('#modal_assignment').modal('hide');
                }
            });

        } else {
            status1 = $('#status').val();
            $('#status1').val(status1);
            $('#modal_assignment').modal('show');
        }
    });

    $('#btn_delete').click(function (e) {
        e.preventDefault();
        status1 = $('#status').val();
        if (status1 == '1') {
            $.alert({
                title: 'Delete Assignment !', icon: 'fa fa-danger', backgroundDismiss: false,
                content: 'Hanya yang sudah diassignment yang bisa dihapus',
                confirmButtonClass: 'btn-success',
                confirm: function () {
                    $('#modal_assignment').modal('hide');
                }
            });
        } else {
            selarrrow = $('#jqgrid_data').jqGrid('getGridParam', 'selarrrow');
            if (selarrrow.length == 0) {
                $.alert({
                    title: 'Delete Assignment !', icon: 'fa fa-danger', backgroundDismiss: false,
                    content: 'Please select certificant',
                    confirmButtonClass: 'btn-success',
                    confirm: function () {

                    }
                });

            } else {
                $.ajax({
                    type: "POST",
                    url: site_url + '/Assignment/delete_assignment',
                    data: {
                        certification_id: selarrrow
                    },
                    dataType: "json",
                    success: function (response) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Delete Assignment Success.',
                            confirmButtonClass: 'btn green',
                            confirm: function () {
                                $('#jqgrid_data').trigger('reloadGrid')
                            }
                        });

                    }
                });
            }
        }
    });

    $('#btn_assignment').click(function (e) {
        e.preventDefault();
        status1 = $('#status').val();
        $('#status1').val(status1);
    });


    $('#btn_proses').click(function (e) {
        e.preventDefault();
        status1 = $('#status1').val();
        committee1 = $('#committee1').val();
        committee2 = $('#committee2').val();
        committee3 = $('#committee3').val();
        start_date = $('#start_date').val();
        end_date = $('#end_date').val();
        note = $('#note').val();

        selarrrow = $('#jqgrid_data').jqGrid('getGridParam', 'selarrrow');
        if (selarrrow.length == 0) {
            $.alert({
                title: 'Assignment !', icon: 'fa fa-danger', backgroundDismiss: false,
                content: 'Please select certificant',
                confirmButtonClass: 'btn-success',
                confirm: function () {

                }
            })

        } else {
            $('#btn_proses').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Proccessing.....');
            $('#btn_proses').attr('disabled', true);
            $('#alert_result').hide();
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    status1: status1,
                    committee1: committee1,
                    committee2: committee2,
                    committee3: committee3,
                    start_date: start_date,
                    end_date: end_date,
                    note: note,
                    certification_id: selarrrow
                },
                url: site_url + '/Assignment/proses_assignment',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Proccess Assignment Success.',
                            confirmButtonClass: 'btn green',
                            confirm: function () {
                                $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                                $('#btn_proses').removeAttr('disabled');
                                $('#modal_assignment').modal('hide');
                                $('#jqgrid_data').trigger('reloadGrid')
                            }
                        });

                    } else {
                        Template.WarningAlert(response.error);
                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                    $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                    $('#btn_proses').removeAttr('disabled');
                    $('#modal_assignment').modal('hide');

                }
            });
        }

    });



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

    FormAdd.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        errorPlacement: function (a, b) { },
        ignore: "",
        rules: {
            committee1: { required: true },
            committee2: { required: true },
            committee3: { required: true },
            start_date: { required: true },
            end_date: { required: true },
            note: { required: true },
            status1: { required: true }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormAdd).show();
            Template.scrollTo($('.alert-error', FormAdd), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).closest('.form-group').removeClass('error'); // set error class to the control group
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






}); //end of $(function(){});