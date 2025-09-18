$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/Partner/jqgrid_partner',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Partner Name', name: 'partner_name', width: 150, align: 'left', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Contract Start Date', name: 'contract_start_date', width: 120, align: 'center' },
            { label: 'Contract End Date', name: 'contract_end_date', width: 120, align: 'center' },
            { label: 'Relation Status', name: 'relation_status', width: 120, align: 'center' },
            { label: 'Address', name: 'address', width: 120, align: 'left' },
            { label: 'Website', name: 'website', width: 120, align: 'left' },
            { label: 'Phone', name: 'phone', width: 120, align: 'left' },
            { label: 'Fax', name: 'fax', width: 120, align: 'left' },
            { label: 'Contact Person', name: 'contact_person', width: 120, align: 'left' },
            { label: 'Mobile Phone', name: 'hp', width: 120, align: 'left' }

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
        caption: " &nbsp&nbsp&nbsp Partner",
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
                content: 'Delete Partner ? Are You Sure?',
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
                        type: "POST", dataType: "json", data: { id: selrow },
                        url: site_url + '/Partner/delete_partner',
                        success: function (response) {
                            if (response.success === true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Delete Partner Success.',
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
                url: site_url + '/Partner/get_data_partner_by_id',
                success: function (response) {
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id', FormEdit).val(response.partner_id);
                    $('#partner_name', FormEdit).val(response.partner_name);
                    $('#contract_start_date', FormEdit).val(response.contract_start_date);
                    $('#contract_end_date', FormEdit).val(response.contract_end_date);
                    $('#relation_status', FormEdit).val(response.relation_status);
                    $('#address', FormEdit).val(response.address);
                    $('#website', FormEdit).val(response.website);
                    $('#phone', FormEdit).val(response.phone);
                    $('#fax', FormEdit).val(response.fax);
                    $('#contact_person', FormEdit).val(response.contact_person);
                    $('#hp', FormEdit).val(response.hp);
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
            partner_name: { required: true },
            contract_start_date: { required: true },
            contract_end_date: { required: true },
            relation_status: { required: true },
            address: { required: true },
            website: { required: true },
            phone: { required: true },
            fax: { required: true },
            contact_person: { required: true },
            hp: { required: true }

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
                            content: 'Data Partner berhasil ditambahkan',
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
            partner_name: { required: true },
            contract_start_date: { required: true },
            contract_end_date: { required: true },
            relation_status: { required: true },
            address: { required: true },
            website: { required: true },
            phone: { required: true },
            fax: { required: true },
            contact_person: { required: true },
            hp: { required: true }
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
                            content: 'Edit Partner Success.',
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

}); //end of $(function(){});