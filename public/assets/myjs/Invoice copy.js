$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormPayment = $('#FormPayment');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/Invoice/jqgrid_invoice',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'invoice_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Invoice Number', name: 'invoice_number', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Invoice Date', name: 'invoice_date', width: 150, align: 'left' },
            { label: 'Certification', name: 'certification_id', width: 150, align: 'left' },
            { label: 'Full Name', name: 'full_name', width: 150, align: 'left' },
            { label: 'Discount', name: 'discount_percentage', width: 150, align: 'left' },
            { label: 'Total Discount', name: 'discount_nominal', width: 150, align: 'left' },
            { label: 'Currency', name: 'currency', width: 150, align: 'left' },
            { label: 'Note', name: 'note', width: 150, align: 'left' },
            { label: 'Tax', name: 'taxnum', width: 150, align: 'left' },
            { label: 'Price', name: 'price', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            { label: 'VAT', name: 'vat', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            { label: 'Total Invoice', name: 'total_invoice', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            { label: 'Bank Name', name: 'bank_name', width: 150, align: 'left' },
            { label: 'Account Number', name: 'account_no', width: 150, align: 'left' },
            { label: 'Account Name', name: 'account_name', width: 150, align: 'left' },
            { label: 'Payment Date', name: 'payment_date', width: 150, align: 'left' },
            { label: 'Payment Slip', name: 'payment_slip', width: 150, align: 'left' },

            {
                label: 'Status', name: 'status', width: 150, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "0":
                            return "<span class='label label-xs label-danger'>Unpaid</span>";
                            break;
                        case '1':
                            return "<span class='label label-xs label-warning'>being verified</span>";
                            break;
                        case '2':
                            return "<span class='label label-xs label-info'>Paid</span>";
                            break;
                        default:
                            return "<span class='label label-xs label-danger'></span>";
                            break;
                    }
                }
            },
            { label: 'Status', name: 'v_status', width: 150, align: 'left', hidden: true },

            { label: 'Created At', name: 'createdAt', width: 150, align: 'left' },
            { label: 'Updated At', name: 'updatedAt', width: 150, align: 'left' }

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
        caption: " &nbsp&nbsp&nbsp INVOICE",
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


    //$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> ');

    if (user_type == '1') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-info btn-sm2" id="btn_verification"  title="Proccess Assignment"><i class="fa fa-check"></i> &nbspVerification</a> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  ><i class="fa fa-edit"></i> &nbspEdit Invoice</a> \
        </div> \
        ');
    } else if (user_type == '5') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-info btn-sm2" id="btn_pay"  data-toggle="modal" data-target="#modal_invoice"><i class="fa fa-check"></i> &nbspPay</a> \
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

    $("#btn_pay").click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        //  $('#modal_invoice').modal('show');
        if (selrow) {
            var invoice_id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', invoice_id);
            var status = data.v_status;
            var invoice_no = data.invoice_number;
            var total_invoice = data.total_invoice;

            if (status == '0') {
                $('#id', FormPayment).val(invoice_id);
                $('#invoice_number', FormPayment).val(invoice_no);
                $('#total_invoice', FormPayment).val(total_invoice);


            } else {
                $('#modal_invoice').modal('hide');
                Template.WarningAlert("Invoice Sudah dibayarkan");

            }
        } else {
            Template.WarningAlert("Please select a row.");
        }
    });


    $('#btn_verification').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');

        if (selrow) {
            var invoice_id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', invoice_id);
            var status = data.v_status;
            if (status == '0' || status == '1') {

                $.confirm({
                    title: "Verification", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Verification Invoice ? Are You Sure?',
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
                            type: "POST", dataType: "json", data: { invoice_id: selrow },
                            url: site_url + '/Invoice/verification_invoice',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Verification Invoice Success.',
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
                Template.WarningAlert("Invoice Sudah dibayarkan");
            }
        } else {
            Template.WarningAlert("Please select a row.");
        }
    });

    $('#btn_edit').click(function (e) {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var invoice_id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', invoice_id);
            var status = data.v_status;
            if (status == '0') {

                $.ajax({
                    type: "POST", dataType: "json", data: { invoice_id: selrow },
                    url: site_url + '/Invoice/get_data_invoice_by_id',
                    success: function (response) {
                        $('#jqgrid').hide();
                        $('#edit').show();
                        $('#id', FormEdit).val(response.invoice_id);
                        $('#invoice_number', FormEdit).val(response.invoice_number);
                        $('#invoice_date', FormEdit).val(response.invoice_date);
                        $('#certification_id', FormEdit).val(response.certification_id);
                        $('#user_id', FormEdit).val(response.full_name);
                        $('#discount_percentage', FormEdit).val(response.discount_percentage);
                        $('#discount_nominal', FormEdit).val(response.discount_nominal);
                        fill_select_master_code('currency', response.currency, $('#currency', FormEdit));
                        // $('#currency', FormEdit).val(response.currency);
                        $('#note', FormEdit).val(response.note);
                        $('#taxnum', FormEdit).val(response.taxnum);
                        $('#price', FormEdit).val(response.price);
                        $('#vat', FormEdit).val(response.vat);
                        $('#total_invoice', FormEdit).val(response.total_invoice);
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                })
            } else if (status == '1') {
                Template.WarningAlert("Invoice sedang dalam proses verifikasi, Invoice sudah tidak bisa diedit");
            } else if (status == '2') {
                Template.WarningAlert("Invoice sudah dibayarkan, Invoice sudah tidak bisa diedit");
            }
        } else {
            Template.WarningAlert("Please select a row");
        }
    })



    FormPayment.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        errorPlacement: function (a, b) { },
        ignore: "",
        rules: {
            bank_name: { required: true },
            account_no: { required: true },
            account_name: { required: true },
            payment_date: { required: true },
            payment_slip: { required: true }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormPayment).show();
            Template.scrollTo($('.alert-error', FormPayment), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).closest('.form-group').removeClass('error'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormPayment.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Payment berhasil diproses',
                            //content: response.msg,
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormPayment).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#modal_invoice').hide();
                                $('#btn_cancel', FormPayment).trigger('click');
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
    })

    /*BEGIN EDIT*/
    FormEdit.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        errorPlacement: function (a, b) { },
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
            $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).closest('.form-group').removeClass('error'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormEdit.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Edit Invoice Success.',
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormEdit).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#btn_cancel', FormEdit).trigger('click');

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
    })

    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });
    /*END EDIT*/


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
















}); //end of $(function(){});