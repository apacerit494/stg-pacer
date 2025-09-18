$(function () {

    /*DECLARE VARIABLE*/
    var form_add = $("#form_add");
    var form_edit = $("#form_edit");
    var add_alert_error = $(".alert-error", "#add");
    var edit_alert_error = $(".alert-error", "#edit");

    $("#jqGrid_menu").jqGrid({
        url: site_url + '/settings/jqgrid_data_menu',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'Menu ID', name: 'menu_id', key: true, width: 100 },
            {
                label: 'Menu Parent', name: 'menu_parent', width: 100, formatter: function (cellvalue) {
                    if (cellvalue == null) {
                        return "Parent";
                    } else {
                        return cellvalue;
                    }
                }
            },
            { label: 'Menu Title', name: 'menu_title', width: 200 },
            { label: 'Menu URL', name: 'menu_url', width: 250 },
            {
                label: 'Menu Type', name: 'menu_type', width: 150, formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "0":
                            return "Normal Menu";
                            break;
                        case "1":
                            return "Classic Menu";
                            break;
                        case "2":
                            return "Mega Menu";
                            break;
                        case "3":
                            return "Mega Menu Full";
                            break;
                    }
                }
            },
            { label: 'Menu ICON', name: 'menu_icon_parent', width: 150 }
        ],
        viewrecords: true,
        autowidth: true,
        height: 250,
        rowNum: 100,
        rowList: [100, 200, 300],
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "menu_id",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqGridPager_menu",
        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });

    //    $("#t_jqGrid_menu").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');
    $("#t_jqGrid_menu").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

    /*BEGIN SEARCH*/
    $("#btn_search").click(function (e) {
        e.preventDefault();
        $("#jqGrid_menu").trigger('reloadGrid');
    });

    $("#keyword").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#jqGrid_menu").trigger('reloadGrid');
        }
    });
    /*END SEARCH*/

    /*SETUP BUTTON ACTIONS*/
    $("#btn_add").click(function () {
        $("#jqgrid").hide();
        $("#add").show();
        add_alert_error.hide();
        form_add.find('.error,.success').removeClass('error').removeClass('success');
    });

    $("#btn_edit").click(function () {
        selrow = $("#jqGrid_menu").jqGrid('getGridParam', 'selrow');
        data = $("#jqGrid_menu").jqGrid('getRowData', selrow);
        menu_id = data.menu_id;
        if (selrow) {

            /*SHOW EDIT FORM & HIDE DATA GRID*/
            $("#jqgrid").hide();
            $("#edit").show();
            edit_alert_error.hide();
            form_edit.find('.error,.success').removeClass('error').removeClass('success');

            /* LOAD DATA FOR EDIT FORM */
            $.ajax({
                type: "POST",
                dataType: "json",
                data: { menu_id: menu_id },
                url: site_url + '/settings/get_data_menu_by_id',
                success: function (response) {
                    $("#menu_id", form_edit).val(response.menu_id);
                    $("#menu_parent", form_edit).val(response.menu_parent);
                    $("#menu_title", form_edit).val(response.menu_title);
                    $("#menu_url", form_edit).val(response.menu_url);
                    $("#menu_type", form_edit).val(response.menu_type);
                    $("#menu_icon", form_edit).val(response.menu_icon_parent);

                }
            })

        } else {
            alert("Please select a Row");
        }

    });

    $("#btn_delete").click(function () {

        selrow = $("#jqGrid_menu").jqGrid('getGridParam', 'selrow');
        data = $("#jqGrid_menu").jqGrid('getRowData', selrow);
        menu_id = data.menu_id;
        if (selrow) {
            var conf = confirm("Apakah anda Yakin akan menghapus menu ini?");
            if (conf) {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    data: { menu_id: menu_id },
                    url: site_url + '/settings/delete_menu',
                    success: function (response) {
                        if (response.success === true) {
                            alert("Successfuly Delete Menu!");
                            $("#jqGrid_menu").trigger('reloadGrid');
                        } else {
                            alert("Failed to Connect into Database, Please Contact Your Administrator!")
                        }
                    },
                    error: function () {
                        alert("Failed to Connect into Database, Please Contact Your Administrator!")
                    }
                })
            }
        } else {
            alert("Please select a Row");
        }
    })

    /*FORM ACTIONS*/
    /*BEGIN ADD*/
    form_add.validate({
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
            menu_parent: { required: true },
            menu_title: { required: true },
            menu_url: { required: true },
            menu_type: { required: true },
            menu_icon: { required: true }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            add_alert_error.show();
            Template.scrollTo(add_alert_error, -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {
            console.log(form);
            $.ajax({
                type: "POST",
                dataType: "json",
                data: $(form).serialize(),
                url: site_url + "/settings/add_menu",

                success: function (response) {
                    if (response.success === true) {
                        alert("Successfuly Add Menu!");
                        add_alert_error.hide();
                        form_add.trigger('reset');

                        $("#jqgrid").show();
                        $("#add").hide();
                        $("#jqGrid_menu").trigger('reloadGrid');
                        var class_a = $(".form-control");
                        for (var i = 0; i < class_a.length; i++) {
                            class_a[i].classList.remove("is-valid");
                        }
                    } else {
                        alert("Failed to Connect into Database, Please Contact Your Administrator!")
                    }
                },
                error: function () {
                    alert("Failed to Connect into Database, Please Contact Your Administrator!")
                }
            })
        }

    });

    $("#btn_cancel", "#add").click(function (e) {
        e.preventDefault();
        form_add.trigger('reset');
        $("#jqgrid").show();
        $("#add").hide();
        $('.is-valid', form_add).removeClass('is-valid');
        $('.is-invalid', form_add).removeClass('is-invalid');
    });
    /*END ADD*/

    /*BEGIN EDIT*/
    form_edit.validate({
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
            menu_parent: { required: true },
            menu_title: { required: true },
            menu_url: { required: true },
            menu_type: { required: true }
            // menu_icon: { required: true }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            edit_alert_error.show();
            Template.scrollTo(edit_alert_error, -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {
            console.log(form);
            $.ajax({
                type: "POST",
                dataType: "json",
                data: $(form).serialize(),
                url: site_url + "/settings/edit_menu",
                success: function (response) {
                    if (response.success === true) {
                        alert("Successfuly Edit Menu!");
                        edit_alert_error.hide();
                        form_edit.trigger('reset');
                        $("#jqgrid").show();
                        $("#edit").hide();
                        $("#jqGrid_menu").trigger('reloadGrid');
                        var class_a = $(".form-control");
                        for (var i = 0; i < class_a.length; i++) {
                            class_a[i].classList.remove("is-valid");
                        }
                    } else {
                        alert("Failed to Connect into Database, Please Contact Your Administrator!")
                    }
                },
                error: function () {
                    alert("Failed to Connect into Database, Please Contact Your Administrator!")
                }
            })
        }
    });

    $("#btn_cancel", "#edit").click(function (e) {
        e.preventDefault();
        form_edit.trigger('reset');
        $("#jqgrid").show();
        $("#edit").hide();
        $('.is-valid', form_edit).removeClass('is-valid');
        $('.is-invalid', form_edit).removeClass('is-invalid');
    });

    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_menu_setup');
        // Template.WarningAlert(site_url+'excel/export_report_master_bank');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_menu_setup')
    });
    /*END EDIT*/

    /*A*/
    $('#menuTabs').tab();

    $.ajax({
        type: "POST",
        url: site_url + "/settings/get_menu_position",
        dataType: "html",
        success: function (response) {
            $("#change_position").html(response);
        }
    });

    $("#menu").livequery(function () {

        $(this).nestable({
            group: 1,
            maxDepth: 3
        }).on('change', function (e) {
            var list = e.length ? e : $(e.target);

            $.ajax({
                type: "POST",
                dataType: "json",
                url: site_url + "/settings/change_position_menu",
                data: { data: list.nestable('serialize') },
                success: function (response) {

                }
            })
        })
    });

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