$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#modal_assignment'), FormEdit = $('#FormEdit');
    var FormAssignment = $('#FormAssignment');
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
            { label: 'ID', name: 'certification_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Certification Number', name: 'certification_number', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Apply Date', name: 'apply_date', width: 150, align: 'center' },
            { label: 'Full Name', name: 'full_name', width: 150, align: 'left' },
            {
                label: 'Level Auditor', name: 'level_auditor', width: 250, align: 'left', formatter: function (cellvalue) {
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
            { label: 'Scope Code', name: 'scope_code', width: 150, align: 'center' },
            { label: 'Created At', name: 'createdAt', width: 150, align: 'center' },
            { label: 'Updated At', name: 'updatedAt', width: 150, align: 'center' }
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

    if (user_type == '2' || user_type == '1' ||  user_type == '0') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-info btn-sm2" id="btn_assignment"  title="Proccess Assignment" style="display:true"><i class="fa fa-check"></i> &nbspProccess Assignment</a> \
        <a class="btn btn-danger btn-sm2" id="btn_reject" title="Cancel Assignment" style="display:none"><i class="fa fa-trash"></i> &nbspCancel Assignment</a> \
        </div> \
        ');

        // <a class="btn btn-warning btn-sm2" id="btn_edit"  title="Edit Assignment"><i class="fa fa-edit"></i> &nbspEdit Assignment</a> \
        // <a class="btn btn-danger btn-sm2" id="btn_delete" title="Delete Assignment"><i class="fa fa-trash"></i> &nbspDelete Assignment</a> \

    }

    $('#btn_assignment').click(function (e) {
        e.preventDefault();
        selarrrow = $('#jqgrid_data').jqGrid('getGridParam', 'selarrrow');
        if (selarrrow.length == 0) {
            Template.WarningAlert('Please select row');
        } else {
            $('#modal_assignment').modal('show');
        }

        //window.open(site_url + '/Assignment/send_email_purchase_order')

    });

    $('#status').change(function (e) {
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid')

    });

    $('#btn_close').click(function (e) {
        e.preventDefault();
        $('#modal_assignment').modal('hide');
    });

    /** update jqgrid when insert data */
    var pusher = new Pusher('452f5671f2a3962c0370', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('assignment');
    channel.bind('my-event', function (data) {
        $('#jqgrid_data').trigger('reloadGrid');
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

    $('#btn_proses').click(function (e) {
        e.preventDefault();
        status1 = $('#status1').val();
        committee1 = $('#committee1').val();
        committee2 = $('#committee2').val();
        committee3 = $('#committee3').val();
        start_date = $('#start_date').val();
        end_date = $('#end_date').val();
        note = $('#note').val();
        
        const radioInputs = document.querySelectorAll('input[name="radio_penguji"]');
        let penguji_ujian;

        // Iterasi melalui setiap elemen input radio untuk mendapatkan nilai yang dicek
        radioInputs.forEach(input => {
            if (input.checked) { // Periksa apakah input sedang dicek
                penguji_ujian = input.value; // Simpan nilai yang dicek
            }
        });
        
        
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
            $('#btn_close').attr('disabled', true);
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
                    penguji_ujian: penguji_ujian,
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
                                $('#btn_close').removeAttr('disabled');
                                $('#jqgrid_data').trigger('reloadGrid')
                                $('#modal_assignment').modal('hide');
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
        }

    });



    $('#btn_reject').click(function (e) {
        e.preventDefault();

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
            $.confirm({
                title: "Cancel", icon: 'fa fa-trash', backgroundDismiss: false,
                content: 'Cancel Assigment ? Are You Sure?',
                confirmButtonClass: 'btn green',
                cancelButtonClass: 'btn red',
                confirm: function () {
                    $('#btn_reject').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Deleting.....');
                    $('#btn_reject').attr('disabled', true);

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
                                    $('#jqgrid_data').trigger('reloadGrid');
                                    $('#btn_reject').html('<i class="fa fa-trash"></i> &nbspCancel Assignment');
                                    $('#btn_reject').removeAttr('disabled');
                                }
                            });

                        }
                    });
                }
            })
        }
    });



    $('#status').change(function (e) {
        e.preventDefault();
        v_status = $(this).val();
        if (v_status == '1') {
            $('#btn_reject').hide();
            $('#btn_assignment').show();
        } else {
            $('#btn_reject').show();
            $('#btn_assignment').hide();


        }

    });
    
        
        
    $('#committee1').change(function () {
        var committee_name = $(this).find('option:selected').data('nama');
        
        if (committee_name == '') {
            $('#radio_label1').html("Committee 1");
        } else {
            $('#radio_label1').html(committee_name);
    
        }
    });

    $('#committee2').change(function () {
        var committee_name = $(this).find('option:selected').data('nama');
        if (committee_name == '') {
            $('#radio_label2').html("Committee 2");
        } else {
            $('#radio_label2').html(committee_name);
    
        }
    });

    $('#committee3').change(function () {
        var committee_name = $(this).find('option:selected').data('nama');
        
        if (committee_name == '') {
            $('#radio_label3').html("Committee Certification");
        } else {
            $('#radio_label3').html(committee_name);
    
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
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: true, // do not focus the last invalid input
        // errorPlacement: function (a, b) { },
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
                                $('#btn_close', FormAssignment).trigger('click');
                                var class_a = $(".form-control");
                                for (var i = 0; i < class_a.length; i++) {
                                    class_a[i].classList.remove("is-valid");
                                }
                                window.location.reload();
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