$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormPayment = $('#FormPayment');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/DownloadBerkas/jqgrid_skema_sertifikasi',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Description', name: 'description', width: 450, align: 'left', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Path', name: 'path', width: 150, align: 'center', hidden: true },
            { label: 'Created At', name: 'createdAt', width: 150, align: 'center' },
            { label: 'Updated At', name: 'updatedAt', width: 150, align: 'center' },
             {
                label: 'Action', align: 'center', width: 180, formatter: function (cellvalue, rowObj, rowArray) {
                    var row_id = rowObj.rowId;
                    var path = rowArray[2];
                    download_button = '<a href="' + site_url + "/" + path + '" \
                                                id="btn_download" \
                                                target="_ blank" \
                                                class="btn btn-info btn-sm2" \
                                                style="margin:5px 0;" \
                                                ><i class="fa fa-download"></i> Download</a > ';

                    return download_button;
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
        sortorder: "desc",
        caption: " &nbsp&nbsp&nbsp  SCHEME & ANNEX",
        multiselect: false,
        gridview: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    if (user_type == '1' || user_type == '2') {
        $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-info btn-sm2" id="btn_add"  ><i class="fa fa-plus"></i> &nbspAdd File</a> \
        <a class="btn btn-warning btn-sm2" id="btn_edit"  ><i class="fa fa-edit"></i> &nbspEdit File</a> \
        <a class="btn btn-danger btn-sm2" id="btn_delete"  ><i class="fa fa-edit"></i> &nbspDelete File</a> \
        </div> \
        ');
    }

    $('#btn_add').click(function (e) {
        e.preventDefault();
        $('#jqgrid').hide();
        $('#add').show();


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
            description: { required: true },
            path: { required: true }

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
                            content: 'Berkas Skema Sertifikasi berhasil ditambahkan',
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
                        (response.description == '1') ? $('#description', FormAdd).addClass('is-invalid') : "";
                        (response.text_path == '1') ? $('#path', FormAdd).addClass('is-invalid') : "";


                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    });

    $('#path', FormAdd).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            $('#btn_preview', FormAdd).attr('href', reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        $('#text_path', FormAdd).val($(this).val());
    });

    $('#path', FormEdit).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            $('#btn_preview', FormEdit).attr('href', reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        $('#text_path', FormEdit).val($(this).val());
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
            var id = selrow;

            $.ajax({
                type: "POST", dataType: "json", data: { id: selrow },
                url: site_url + '/DownloadBerkas/get_data_skema_sertifikasi_by_id',
                success: function (response) {
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id', FormEdit).val(response.id);
                    $('#description', FormEdit).val(response.description);
                    $('#text_path', FormEdit).val(response.path);
                    $('#btn_preview', FormEdit).attr('href', response.path);
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            })

        } else {
            Template.WarningAlert("Please select a row");
        }
    })


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
                            content: 'Edit Berkas Sertifikasi Success.',
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
                        (response.description == '1') ? $('#description', FormEdit).addClass('is-invalid') : "";
                        (response.text_path == '1') ? $('#path', FormEdit).addClass('is-invalid') : "";

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
    });

    $('#btn_delete').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            $.confirm({
                title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                content: 'Delete Berkas Sertifikasi? Are You Sure?',
                confirmButtonClass: 'btn green',
                cancelButtonClass: 'btn red',
                confirmButtonClass: 'btn green',
                confirmButton: 'Yes',
                cancelButton: 'No',
                cancelButtonClass: 'btn red',
                confirm: function () {
                    $.ajax({
                        type: "POST", dataType: "json", data: { id: selrow },
                        url: site_url + '/DownloadBerkas/delete_skema_sertifikasi',
                        success: function (response) {
                            if (response.success === true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Delete Berkas Sertifikasi Success.',
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



}); //end of $(function(){});