$(function () {

    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

    $("#jqgrid_data").jqGrid({
        url: site_url + '/Settings/jqgrid_user_setup',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },

        colModel: [
            { label: 'ID', name: 'id', key: true, width: 100, hidden: true },
            { label: 'Full Name', name: 'full_name', width: 150 },
            {
                label: 'Gender', name: 'gender', width: 100, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "P":
                            return 'Pria';
                            break;
                        case "W":
                            return 'Wanita';
                            break;
                        default:
                            return cellvalue;
                            break;
                    }
                }
            },
            { label: 'User Name', name: 'username', width: 150 },

            { label: 'Email', name: 'email', width: 150 },
            { label: 'Mobile Phone', name: 'mobile_phone', width: 150 },
            { label: 'Role', name: 'role_name', width: 150 },
            { label: 'NPWP', name: 'npwp', width: 150 },
            { label: 'Bank Name', name: 'bank_name', width: 150 },
            { label: 'Account Number', name: 'account_number', width: 150 },
            { label: 'Account Name', name: 'account_name', width: 150 },
            { label: 'Created At', name: 'created_stamp', width: 150, align: 'center' },
            { label: 'Updated At', name: 'last_updated_stamp', width: 150, align: 'center' }

        ],
        viewrecords: true,
        autowidth: true,
        //width: 1098,
        height: 250,
        rowNum: 100,
        rowList: [100, 200, 300],
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "full_name",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager",
        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });

    $("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> ');
    //$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

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

    $('#btn_delete').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            $.confirm({
                title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                content: 'Delete User ? Are You Sure?',
                confirmButtonClass: 'btn green',
                cancelButtonClass: 'btn red',
                confirm: function () {
                    $.ajax({
                        type: "POST", dataType: "json", data: { id: selrow },
                        url: site_url + '/Settings/delete_user_setup',
                        success: function (response) {
                            if (response.success === true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Delete User Success.',
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
                url: site_url + '/Settings/get_data_user_setup_by_id',
                success: function (response) {
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id', FormEdit).val(response.id);
                    $('#old_password', FormEdit).val(response.user_password);
                    $('#full_name', FormEdit).val(response.full_name);
                    $('#username', FormEdit).val(response.username);
                    $('#gender', FormEdit).val(response.gender);
                    $('#email', FormEdit).val(response.email);
                    $('#mobile_phone', FormEdit).val(response.mobile_phone);
                    $('#user_type_id', FormEdit).val(response.user_type_id);
                    $('#npwp', FormEdit).val(response.npwp);
                    $('#bank_name', FormEdit).val(response.bank_name);
                    $('#account_number', FormEdit).val(response.account_number);
                    $('#account_name', FormEdit).val(response.account_name);
                    //$('#password', FormEdit).val();
                    $('#status', FormEdit).val(response.active);
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
            full_name: { required: true },
            gender: { required: true },
            email: { required: true, email: true },
            password: { required: true },
            confirm_password: { required: true, equalTo: '#password' },
            mobile_phone: { required: true },
            user_type_id: { required: true },
            status: { required: true }

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
                            content: 'Add User Success.',
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
        var class_a = $(".form-control");
        for (var i = 0; i < class_a.length; i++) {
            class_a[i].classList.remove("is-valid");
        }
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
            full_name: { required: true },
            gender: { required: true },
            email: { required: true, email: true },
            //  password2: { required: true },
            confirm_password: { equalTo: '#password2' },
            mobile_phone: { required: true },
            user_type_id: { required: true },
            status: { required: true }

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
                            content: 'Edit User Success.',
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
        var class_a = $(".form-control");
        for (var i = 0; i < class_a.length; i++) {
            class_a[i].classList.remove("is-valid");
        }
    })

    /*END EDIT*/









}); //end of $(function(){});