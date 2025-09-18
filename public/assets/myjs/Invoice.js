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
            {
                label: 'Action', align: 'center', width: 180, formatter: function (cellvalue, rowObj, rowArray) {
                    var row_id = rowObj.rowId;
                    var status = rowArray[19];
                    var invoice_number = rowArray[2];
                    var total_invoice = rowArray[12];
                    var doc_invoice = rowArray[17];
                    switch (status) {
                        case "0":
                            // process_button = '<a class="btn btn-success btn-sm2" \
                            //                 id="btn_pay" \
                            //                 class="btn btn-success btn-sm2" \
                            //                 data-toggle="modal" \
                            //                 data-target="#modal_invoice"\
                            //                 style="margin:5px 0;" \
                            //                 data-id="'+ row_id + '" \
                            //                 data-invoice_number="'+ invoice_number + '" \
                            //                 data-total_invoice="'+ total_invoice + '" \
                            //             ><i class="fa fa-check"></i> &nbspPay</a>';
                            process_button = "<span class='label label-sm label-danger'>Unpaid</span>";
                            actionku = process_button;
                            break;
                        case "1":
                            if (user_type != '5') {
                                process_button = '<a class="btn btn-warning btn-sm2" \
                                                    id="btn_verification" \
                                                    class="btn btn-warning btn-sm2" \
                                                    style = "margin:5px 0;" \
                                                    data-id="'+ row_id + '" \
                                                    data-invoice_number="'+ invoice_number + '" \
                                                > <i class="fa fa-check"></i>  &nbspVerification</a > ';
                                download_button = '<a href="' + site_url + "/" + doc_invoice + '" \
                                                id="btn_download" \
                                                target="_ blank" \
                                                class="btn btn-info btn-sm2" \
                                                style="margin:5px 0;" \
                                                data-id="'+ row_id + '" \ data-doc_invoice="' + doc_invoice + '" \
                                                ><i class="fa fa-download"></i> Slip</a > ';
                                actionku = process_button + ' ' + download_button;


                            } else {
                                actionku = '-';
                            }
                            break;
                        default:
                            process_button = "<span class='label label-sm label-success'>Paid</span>";
                            download_button = '<a href="' + site_url + "/" + doc_invoice + '" \
                                                id="btn_download" \
                                                target="_ blank" \
                                                class="btn btn-info btn-sm2" \
                                                style="margin:5px 0;" \
                                                data-id="'+ row_id + '" \ data-doc_invoice="' + doc_invoice + '" \
                                                ><i class="fa fa-download"></i> Slip</a > ';
                            actionku = process_button + ' ' + download_button;


                            break;
                    }
                    var actions = actionku;
                    return actions;
                }
            },
            { label: 'Invoice Number', name: 'invoice_number', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Invoice Date', name: 'invoice_date', width: 150, align: 'center' },
            { label: 'Certification', name: 'certification_id', width: 150, align: 'left', hidden: true },
            { label: 'Full Name', name: 'full_name', width: 150, align: 'left' },
            { label: 'Currency', name: 'currency', width: 150, align: 'center' },
            {
                label: 'Discount', name: 'discount_percentage', width: 150, align: 'center', formatter: function (cellvalue) {
                    return cellvalue + ' %';
                }
            },
            { label: 'Total Discount', name: 'discount_nominal', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            // { label: 'Note', name: 'note', width: 150, align: 'left' },
            { label: 'Tax Number', name: 'taxnum', width: 150, align: 'center' },
            { label: 'Price', name: 'price', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            { label: 'VAT', name: 'vat', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            { label: 'Total Invoice', name: 'total_invoice', width: 150, align: 'right', formatter: 'currency', formatoptions: { decimalSeparator: ',', thousandsSeparator: '.', decimalPlaces: 2, defaultValue: '0' } },
            { label: 'Bank Name', name: 'bank_name', width: 150, align: 'left' },
            { label: 'Account Number', name: 'account_no', width: 150, align: 'left' },
            { label: 'Account Name', name: 'account_name', width: 150, align: 'left' },
            { label: 'Payment Date', name: 'payment_date', width: 150, align: 'center' },
            { label: 'Payment Slip', name: 'payment_slip', width: 150, align: 'left', hidden: true },

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
        sortname: "invoice_number",
        sortorder: "desc",
        caption: " &nbsp&nbsp&nbsp INVOICE",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    if (user_type == '1' || user_type == '2' ||  user_type == '0') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-info btn-sm2" id="btn_add"  ><i class="fa fa-plus"></i> &nbspAdd Invoice</a> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  ><i class="fa fa-edit"></i> &nbspEdit Invoice</a> \
        </div> \
        ');
    }

    $('#btn_add').click(function (e) {
        e.preventDefault();
        $('#jqgrid').hide();
        $('#add').show();


    });

    $('a#btn_pay').livequery('click', function () {
        //e.preventDefault();

        var invoice_id = $(this).data('id');
        var invoice_number = $(this).data('invoice_number');
        var total_invoice = $(this).data('total_invoice');
        $('#id', FormPayment).val(invoice_id);
        $('#invoice_number', FormPayment).val(invoice_number);
        $('#total_invoice', FormPayment).val(Template.NumberFormat(total_invoice, 0, ',', '.'));

        $('#modal_invoice').modal('show');


    })

    $('a#btn_verification').livequery('click', function (e) {
        e.preventDefault();

        var invoice_id = $(this).data('id');
        var invoice_number = $(this).data('invoice_number');

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
                    type: "POST", dataType: "json", data: { invoice_number: invoice_number },
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

    })

    $('#btn_close', '#modal_invoice').click(function () {
        //e.preventDefault();
        $('#modal_invoice').modal('hide');
        //$('#payment_slip','#modal_invoice').

    });

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
            invoice_date: { required: true },
            user_id: { required: true },
            certification_id: { required: true },
            note: { required: true },
            biaya: { required: true },
            discount_percentage: { required: true },
            price: { required: true },
            discount_nominal: { required: true },
            vat: { required: true },
            total_invoice: { required: true }

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
                            content: 'Data Invoice berhasil ditambahkan',
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
                        $('#discount_percentage', FormEdit).val(Template.NumberFormat(response.discount_percentage, 0, ',', '.'));
                        $('#discount_nominal', FormEdit).val(Template.NumberFormat(response.discount_nominal, 0, ',', '.'));
                        fill_select_master_code('currency', response.currency, $('#currency', FormEdit));
                        // $('#currency', FormEdit).val(response.currency);
                        $('#note', FormEdit).val(response.note);
                        $('#taxnum', FormEdit).val(response.taxnum);
                        $('#price', FormEdit).val(Template.NumberFormat(response.price, 0, ',', '.'));
                        $('#vat', FormEdit).val(Template.NumberFormat(response.vat, 0, ',', '.'));
                        $('#total_invoice', FormEdit).val(Template.NumberFormat(response.total_invoice, 0, ',', '.'));
                        $('#total_invoice_original', FormEdit).val(Template.NumberFormat(response.total_invoice, 0, ',', '.'));
                        $('#discount_percentage_original', FormEdit).val(Template.NumberFormat(response.discount_percentage, 0, ',', '.'));
                        $('#discount_nominal_original', FormEdit).val(Template.NumberFormat(response.discount_nominal, 0, ',', '.'));

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
            $(element).removeClass('is-valid').addClass('is-invalid'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
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
                                //   $('#jqgrid_data').trigger('reloadGrid');
                                $('#modal_invoice').modal('hide');
                                $('#jqgrid').show();
                                window.location.reload();
                                //$('#btn_cancel', FormPayment).trigger('click');
                                //$('#btn_submit').hide();
                                // var class_a = $(".form-control");
                                // for (var i = 0; i < class_a.length; i++) {
                                //     class_a[i].classList.remove("is-valid");
                                // }
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
        $('#user_id', FormAdd).val("").trigger('chosen:updated');
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
            $(element).removeClass('is-valid').addClass('is-invalid'); // set error class to the control group
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
                            content: 'Edit Invoice Success.',
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

    $('#user_id', FormAdd).change(function (e) {
        e.preventDefault();
        user_id = $(this).val();
        $.ajax({
            type: "POST",
            url: site_url + '/Invoice/get_certification_number',
            data: {
                user_id: user_id
            },
            dataType: "json",
            success: function (response) {
                opt = '<option value="">Please Select</option>';
                for (i in response) {
                    opt += '<option value="' + response[i].certification_id + '">' + response[i].certification_number + '</option>';
                }
                $('#certification_id', FormAdd).html(opt);
            }
        });
    });

    $('#biaya', FormAdd).keyup(function (e) {
        invoice_calculation();
    });

    $('#discount_percentage', FormAdd).keyup(function (e) {
        invoice_calculation();
    });

    var invoice_calculation = function () {
        biaya = parseFloat(Template.ConvertNumeric($('#biaya').val()));
        discount_percentage = $('#discount_percentage', FormAdd).val();
        price = biaya / 1.11;
        discount_nominal = price * (discount_percentage / 100);
        vat = (price - discount_nominal) * (11 / 100);
        total_invoice = price - discount_nominal + vat;

        $('#price', FormAdd).val(Template.NumberFormat(price, 0, ',', '.'));
        $('#discount_nominal', FormAdd).val(Template.NumberFormat(discount_nominal, 0, ',', '.'));
        $('#vat', FormAdd).val(Template.NumberFormat(vat, 0, ',', '.'));
        $('#total_invoice', FormAdd).val(Template.NumberFormat(total_invoice, 0, ',', '.'));

    }

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

    $('#discount_type', FormEdit).change(function (e) {
        e.preventDefault();
        discount_type = $(this).val();
        if (discount_type == '1') {
            $('#percentage').show();
            $('#nominal').hide();
        } else {
            $('#percentage').hide();
            $('#nominal').show();
        }
    });

    $('#discount_percentage', FormEdit).keyup(function (e) {
        e.preventDefault();
        var nilai = parseInt($(this).val());
            
            // Periksa apakah nilai melebihi 100
            if (nilai > 100) {
                // Jika melebihi, atur ulang nilainya menjadi 100
                $(this).val(100);
            }
        
        discount_percentage = $(this).val();
        after_discount('1', discount_percentage);
    });
    
    

    $('#discount_nominal', FormEdit).change(function (e) {
        e.preventDefault();
        // discount_nominal = Template.ConvertNumeric($(this).val());
        discount_nominal = ($(this).val());
        after_discount('2', discount_nominal);
    });

    var after_discount = function (discount_type, value) {
        total_invoice = parseFloat(Template.ConvertNumeric($('#total_invoice_original', FormEdit).val()));
        discount_percentage = parseFloat(Template.ConvertNumeric($('#discount_percentage_original', FormEdit).val()));
        discount_nominal = parseFloat(Template.ConvertNumeric($('#discount_nominal_original', FormEdit).val()));
        total_invoice1 = parseFloat(total_invoice) / (1 - (parseFloat(discount_percentage) / 100));
        total_invoice2 = parseFloat(total_invoice) + parseFloat(discount_nominal);
        if (discount_type == '1') {
            total_invoice = parseFloat(total_invoice1) - (parseFloat(total_invoice1) * (value / 100));
            price = parseFloat(total_invoice) / 1.11;
            vat = parseFloat(total_invoice) - parseFloat(price);
            $('#discount_nominal', FormEdit).val(0);
        } else {
            total_invoice = parseFloat(total_invoice2) - parseFloat(value);
            price = parseFloat(total_invoice) / 1.11;
            vat = parseFloat(total_invoice) - parseFloat(price);
            $('#discount_percentage', FormEdit).val(0);
        }
        // alert(total_invoice + '-' + price + '-' + vat);
        //$('#vat', FormEdit).val(vat.toFixed(2));
        $('#vat', FormEdit).val(Template.NumberFormat(vat, 0, ',', '.'));
        $('#price', FormEdit).val(Template.NumberFormat(price, 0, ',', '.'));
        $('#total_invoice', FormEdit).val(Template.NumberFormat(total_invoice, 0, ',', '.'));

    }

    $('#btn_proses', FormPayment).click(function (e) {
        e.preventDefault();
        $('#btn_proses', FormPayment).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Processing.....');
        $('#btn_proses', FormPayment).atr('disabled', true);
    });
    
    

}); //end of $(function(){});