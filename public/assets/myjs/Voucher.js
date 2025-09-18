$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/Voucher/jqgrid_voucher',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'voucher_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Voucher Code', name: 'voucher_code', width: 150, align: 'left', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Voucher Date', name: 'voucher_date', width: 120, align: 'center' },
            { label: 'Start Date', name: 'start_date', width: 120, align: 'center' },
            { label: 'Expired Date', name: 'expired_date', width: 120, align: 'center' },
            // { label: 'Status', name: 'active_status', width: 120, align: 'left' },
            //{ label: 'Status Type', name: 'voucher_type', width: 120, align: 'left' },
            { label: 'Partner', name: 'partner_id', width: 120, align: 'left' },
            { label: 'Unlimited', name: 'unlimited', width: 120, align: 'center' },
            { label: 'Quota', name: 'qouta', width: 120, align: 'right' },
            { label: 'ordered', name: 'ordered', width: 120, align: 'right' },
            {
                label: 'Discount', name: 'discount', width: 120, align: 'right', formatter: function (cellvalue) {
                    cellvalue + ' %';
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
        sortname: "id",
        sortorder: "asc",
        caption: " &nbsp&nbsp&nbsp Voucher Discount",
        multiselect: false,
        gridview: true,
        //ignoreCase: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",
        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });

    // jQuery("#jqgrid_data").jqGrid('filterToolbar', { searchOperators: true });


    $("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> ');

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

    $('#btn_delete').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            $.confirm({
                title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                content: 'Delete Voucher ? Are You Sure?',
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
                        type: "POST", dataType: "json", data: { voucher_id: selrow },
                        url: site_url + '/Voucher/delete_voucher',
                        success: function (response) {
                            if (response.success === true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Delete Voucher Success.',
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
            Template.WarningAlert("Please select a row.");
        }
    });

    $('#btn_edit').click(function (e) {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            $.ajax({
                type: "POST", dataType: "json", data: { id: selrow },
                url: site_url + '/Voucher/get_data_voucher_by_id',
                success: function (response) {
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id', FormEdit).val(response.voucher_id);
                    $('#voucher_code', FormEdit).val(response.voucher_code);
                    // <<<<<<< HEAD
                    //$('#voucher_date', FormEdit).val(response.voucher_date);
                    $('#start_date', FormEdit).val(response.start_date);
                    $('#expired_date', FormEdit).val(response.expired_date);
                    // $('#active_status', FormEdit).val(response.active_status);
                    //$('#voucher_type', FormEdit).val(response.voucher_type);
                    $('#partner_id', FormEdit).val(response.partner_id);
                    if (response.unlimited == '0') {
                        $('#unlimited1', FormEdit).prop('checked', true).trigger('click');
                    } else {
                        $('#unlimited1', FormEdit).prop('checked', false).trigger('click');
                    }
                    // =======
                    //                     $('#voucher_date', FormEdit).val(response.voucher_date);
                    //                     $('#start_date', FormEdit).val(response.start_date);
                    //                     $('#expired_date', FormEdit).val(response.expired_date);
                    //                     $('#active_status', FormEdit).val(response.active_status);
                    //                     $('#voucher_type', FormEdit).val(response.voucher_type);
                    //                     $('#partner_id', FormEdit).val(response.partner_id);
                    //                     $('#unlimited', FormEdit).val(response.unlimited);
                    // >>>>>>> f6ffdaea913d21eccdffa825a798b9674ac5cb2e
                    $('#qouta', FormEdit).val(response.qouta);
                    $('#ordered', FormEdit).val(response.ordered);
                    $('#discount', FormEdit).val(response.discount);
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            })
        } else {
            Template.WarningAlert("Please select a row");
        }
    })

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
            voucher_code: { required: true },
            //voucher_date: { required: true },
            // start_date: { required: true },
            //expired_date: { required: true },
            //active_status: { required: true },
            //voucher_type: { required: true },
            partner_id: { required: true },
            //unlimited: { required: true },
            //qouta: { required: true },
            discount: { required: true }

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
                            content: 'Data Voucher berhasil ditambahkan',
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
            voucher_code: { required: true },
            //voucher_date: { required: true },
            //start_date: { required: true },
            //expired_date: { required: true },
            //active_status: { required: true },
            //voucher_type: { required: true },
            partner_id: { required: true },
            //unlimited: { required: true },
            //qouta: { required: true },
            discount: { required: true }
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
                            content: 'Edit Voucher Success.',
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

    $('#unlimited', FormAdd).click(function (e) {
        //e.preventDefault();      
        var check = $('input[id=unlimited]:checked');
        if (check.length == 0) {
            $("input[name=qouta]").prop("disabled", false);
            $("input[name=start_date]").prop("disabled", false);
            $("input[name=expired_date]").prop("disabled", false);
            $("input[name=quota]").prop("disabled", false);
        } else {
            $("input[name=qouta]").prop("disabled", true);
            $("input[name=start_date]").prop("disabled", true);
            $("input[name=expired_date]").prop("disabled", true);
            $("input[name=quota]").prop("disabled", true);
        }
    });

    $('#unlimited1', FormEdit).click(function (e) {
        //e.preventDefault();      
        var check = $('input[id=unlimited1]:checked');
        if (check.length == 0) {
            $("input[name=qouta]").prop("disabled", false);
            $("input[name=start_date]").prop("disabled", false);
            $("input[name=expired_date]").prop("disabled", false);
            $("input[name=quota]").prop("disabled", false);
        } else {
            $("input[name=qouta]").prop("disabled", true);
            $("input[name=start_date]").prop("disabled", true);
            $("input[name=expired_date]").prop("disabled", true);
            $("input[name=quota]").prop("disabled", true);
        }
    });

    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });

}); //end of $(function(){});