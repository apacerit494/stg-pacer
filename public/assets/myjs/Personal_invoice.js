$(document).ready(function () {

    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormPayment = $('#FormPayment');

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

    var update_form_payment_awal = function () {
        /** refresh Form Validate */
        for (let jumpay = 1; jumpay <= jumlah_payment; jumpay++) {
            $('#FormPayment_' + jumpay).validate({
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
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    $('.alert-error', $('#FormPayment_' + jumpay)).show();
                    Template.scrollTo($('.alert-error', $('#FormPayment_' + jumpay)), -200);
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
                },
                submitHandler: function (form) {

                    $('#btn_proses_' + jumpay).html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Proccessing.....');
                    $('#btn_proses_' + jumpay).attr('disabled', true);
                    $('#btn_close_' + jumpay).attr('disabled', true);

                    $('#FormPayment_' + jumpay).ajaxSubmit({
                        dataType: 'json',
                        success: function (response) {
                            if (response.success == true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Payment berhasil diproses',
                                    //content: response.msg,
                                    confirmButtonClass: 'btn-success',
                                    confirm: function () {
                                        // $('.alert-error', $('#FormPayment_' + jumpay)).hide();
                                        $('#btn_proses_' + jumpay).html('<i class="fa fa-check"></i> &nbsp;Proccess');
                                        $('#btn_proses_' + jumpay).removeAttr('disabled');
                                        $('#btn_close_' + jumpay).removeAttr('disabled');
                                        $('#modal_invoice_' + jumpay).modal('hide');
                                        $('#btn_submit_' + jumpay).hide();
                                        var class_a = $(".form-control");
                                        for (var i = 0; i < class_a.length; i++) {
                                            class_a[i].classList.remove("is-valid");
                                        }
                                        window.location.reload();

                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.bank_name == '1') ? $('#bank_name_' + jumpay, $('#FormPayment_' + jumpay)).addClass('is-invalid') : "";
                                (response.account_no == '1') ? $('#account_no_' + jumpay, $('#FormPayment_' + jumpay)).addClass('is-invalid') : "";
                                (response.account_name == '1') ? $('#account_name_' + jumpay, $('#FormPayment_' + jumpay)).addClass('is-invalid') : "";
                                (response.payment_date == '1') ? $('#payment_date_' + jumpay, $('#FormPayment_' + jumpay)).addClass('is-invalid') : "";
                                (response.payment_slip == '1') ? $('#payment_slip_' + jumpay, $('#FormPayment_' + jumpay)).addClass('is-invalid') : "";

                            }
                        },
                        error: function () {
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        }
                    });
                }
            });
        }

        /** refresh btn_edit */
        for (let jumpay = 1; jumpay <= jumlah_payment; jumpay++) {
            $('#btn_edit_' + jumpay, $('#FormPayment_' + jumpay)).click(function (e) {
                e.preventDefault();
                caption_edit_education = $('#btn_edit_' + jumpay, $('#FormPayment_' + jumpay)).text();
                (caption_edit_education.trim() == 'Edit') ? disabled_form_payment('enabled', jumpay) : disabled_form_payment('disabled', jumpay);
            });
        }

        /** refresh btn_delete */
        for (let jumpay = 1; jumpay <= jumlah_payment; jumpay++) {
            $('#btn_delete_' + jumpay, $('#FormPayment_' + jumpay)).click(function (e) {
                e.preventDefault();
                //alert(jumpay + '-' + sisa_education);
                var id = $('#id_' + jumpay, $('#FormPayment_' + jumpay)).val();
                if (id == '') {
                    $(this).parents(".tambahan_" + jumpay).remove();
                } else {
                    $.confirm({
                        title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Delete Education ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $.ajax({
                                type: "POST", dataType: "json", data: { id: id },
                                url: site_url + '/Register/delete_education',
                                success: function (response) {
                                    if (response.success === true) {
                                        $.alert({
                                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                            content: 'Delete Education Success.',
                                            confirmButtonClass: 'btn green',
                                            confirm: function () {
                                                //  alert("sisa Education = " + sisa_education);
                                                if (sisa_education == 0) {
                                                    $('#btn_edit_' + jumpay, $('#FormPayment_' + jumpay)).click();
                                                    $('#FormPayment_' + jumpay).trigger('reset');
                                                    // alert('reset dong FormPayment_' + jumpay);
                                                } else {
                                                    //$('#btn_delete_' + jumpay).parents(".tambahan_" + jumpay).remove();
                                                    $('#doc_path_education_' + jumpay).parents(".tambahan_" + jumpay).remove();
                                                    sisa_education--;
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
                            })
                        }
                    })
                }
            });
        }


    }
    update_form_payment_awal();


    $('#btn_cancel', FormAdd).click(function () {
        $('#add').hide();
        $('#jqgrid').show();
        $('.alert-error', FormAdd).hide();
        FormAdd.trigger('reset');
        $('.error', FormAdd).removeClass('error');
        $('.is-valid', FormAdd).removeClass('is-valid');
        $('.is-invalid', FormAdd).removeClass('is-invalid');
    })

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

    for (let jumpay = 1; jumpay < jumlah_payment; jumpay++) {

        $('#btn_submit_' + jumpay).click(function (e) {
            e.preventDefault();
            // alert("halo");
            var invoice_no = $(this).data('invoice_number');
            var total_invoice = $(this).data('total_invoice');

            $('#invoice_number_' + jumpay, $('#FormPayment_' + jumpay)).val(invoice_no);
            $('#total_invoice_' + jumpay, $('#FormPayment_' + jumpay)).val(Template.NumberFormat(total_invoice, 0, ',', '.'));

            $('#modal_invoice_' + jumpay).modal('show');
        });
    }


    for (let jumpay = 1; jumpay < jumlah_payment; jumpay++) {

        $('#btn_close_' + jumpay).click(function (e) {
            e.preventDefault();

            $('#modal_invoice_' + jumpay).modal('hide');
        });
    }

}); //end of $(function(){});