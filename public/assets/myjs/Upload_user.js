$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/Certificant/jqgrid_upload_user',
        mtype: "GET",
        datatype: "json",
        // postData: {
        //     tipe_keyword: function () { return $("#tipe_keyword").val() },
        //     keyword: function () { return $("#keyword").val() }
        // },
        colModel: [
            { label: 'ID', name: 'id', key: true, width: 100, hidden: true },
            { label: 'Full Name', name: 'full_name', width: 150, search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Birth Place', name: 'birth_place', width: 150, align: 'center' },
            { label: 'Birth Date', name: 'birth_date', width: 150, align: 'center' },
            {
                label: 'Gender', name: 'gender', width: 150, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "P":
                            return "Pria";
                            break;
                        case "W":
                            return "Wanita";
                            break;
                        default:
                            return cellvalue;
                            break;
                    }
                }
            },
            { label: 'Address', name: 'address', width: 150 },
            { label: 'Province', name: 'province_name', width: 150 },
            { label: 'District', name: 'district_name', width: 150 },
            { label: 'Sub District', name: 'subdistrict_name', width: 150 },
            { label: 'Village', name: 'village_name', width: 150 },
            { label: 'Email', name: 'email', width: 150 },
            { label: 'Mobile Phone', name: 'mobile_phone', width: 150 },
            { label: 'Phone', name: 'phone', width: 150 },
            { label: 'User Type', name: 'user_type_id', width: 150 },
            { label: 'Id Card Number', name: 'idcard_number', width: 150 },
            { label: 'ID Card Path', name: 'doc_idcard_path', width: 150 },
            { label: 'User Name', name: 'user_name', width: 150 },
            { label: 'Password', name: 'user_password', width: 150, hidden: true },
            { label: 'Created At', name: 'createdAt', width: 150, align: 'center' },
            { label: 'Upadted At', name: 'updatedAt', width: 150, align: 'center' }

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
        sortname: "full_name",
        sortorder: "asc",
        caption: " &nbsp&nbsp&nbspUSER",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
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
                content: 'Delete User? Are You Sure?',
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
                        url: site_url + '/Certificant/delete_user',
                        success: function (response) {
                            if (response.success === true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Delete Certificant Success.',
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
                url: site_url + '/Certificant/get_data_user_by_id',
                success: function (response) {
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id', FormEdit).val(response.id);
                    $('#full_name', FormEdit).val(response.full_name);
                    $('#birth_place', FormEdit).val(response.birth_place);


                    $('#birth_date', FormEdit).val(response.birth_date);
                    $('#gender', FormEdit).val(response.gender);
                    $('#address', FormEdit).val(response.address);

                    fill_select('ref_province', response.province_id, $('#province_id', FormEdit))
                    fill_child('ref_province', response.province_id, $('#district_id', FormEdit), response.district_id)
                    fill_child('ref_district', response.district_id, $('#subdistrict_id', FormEdit), response.subdistrict_id)
                    fill_child('ref_subdistrict', response.subdistrict_id, $('#village_id', FormEdit), response.village_id)

                    $('#email', FormEdit).val(response.email);

                    $('#mobile_phone', FormEdit).val(response.mobile_phone);
                    $('#phone', FormEdit).val(response.phone);
                    $('#user_type_id', FormEdit).val(response.user_type_id);
                    $('#idcard_number', FormEdit).val(response.idcard_number);
                    //$('#doc_idcard_path', FormEdit).val(response.doc_idcard_path);
                    $('#user_name', FormEdit).val(response.user_name);
                    $('#user_password', FormEdit).val(response.password_hash);
                    $('#createdAt', FormEdit).val(response.created_at);
                    $('#updatedAt', FormEdit).val(response.updated_at);


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

























}); //end of $(function(){});