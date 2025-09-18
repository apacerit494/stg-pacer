
$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormPersonal = $('#FormPersonal')
    var sisa_experience = jumlah_experience - 1;
    var sisa_education = jumlah_education - 1;
    var sisa_training = jumlah_training - 1;
    var sisa_audit = jumlah_audit - 1;

    $("#jqgrid_data").jqGrid({
        url: site_url + '/User/jqgrid_user',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'user_id', key: true, width: 100, hidden: true },
            { label: 'Full Name', name: 'full_name', width: 150, search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'Birth Place', name: 'birth_place', width: 150, align: 'left' },
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
            { label: 'User Type', name: 'user_type_id', width: 150, hidden: true },
            { label: 'Id Card Number', name: 'idcard_number', width: 150 },
            { label: 'ID Card Path', name: 'doc_idcard_path', width: 150 },
            //{ label: 'User Name', name: 'user_name', width: 150 },
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
        caption: " &nbsp&nbsp&nbspCERTIFICANT",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });

    $("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> ');

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
        $('#register').show();
        //FormAdd.trigger('reset');
    });

    $("#btn_back", register).click(function () {
        FormPersonal.trigger('reset');

        /** reset form education */
        $('#FormEducation_1').trigger('reset');
        disabled_form_education('enabled', 1);
        for (i = 2; i <= jumlah_education; i++) {
            $('#id_' + i).parents(".tambahan_" + i).remove();
        }
        jumlah_education = 1;

        /** reset form experience */
        $('#FormExperience_1').trigger('reset');
        disabled_form_experience('enabled', 1);
        for (i = 2; i <= jumlah_experience; i++) {
            $('#id_' + i).parents(".tambahan_" + i).remove();
        }
        jumlah_experience = 1;

        /** reset form Audit experience */
        $('#FormAudit_1').trigger('reset');
        clear_multi_check('ref_scope', 'scope_id', 'scope_description', $('#scopean_1', auditku), 'scope_id_', 1, '');
        clear_multi_check('ref_role', 'role_id', 'role_name', $('#peranan_1', auditku), 'role_id_', 1, '');

        disabled_form_audit('enabled', 1);
        for (i = 2; i <= jumlah_audit; i++) {
            $('#id_' + i).parents(".tambahan_" + i).remove();
        }
        jumlah_audit = 1;

        /** reset form Training */
        $('#FormTraining_1').trigger('reset');
        disabled_form_training('enabled', 1);
        for (i = 2; i <= jumlah_training; i++) {
            $('#id_' + i).parents(".tambahan_" + i).remove();
        }
        jumlah_training = 1;

        $('#jqgrid').show();
        $('#register').hide();
        $("#jqGrid_data").trigger('reloadGrid');
        //FormAdd.trigger('reset');
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
                        url: site_url + '/User/delete_user',
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
                type: "POST", dataType: "json", data: { user_id: selrow },
                url: site_url + '/User/check_status_certification_by_id',
                success: function (response) {
                    if (response.success === true) {
                        $.ajax({
                            type: "POST", dataType: "json", data: { user_id: selrow },
                            url: site_url + '/User/get_data_user_by_id',
                            success: function (response) {
                                $('#jqgrid').hide();
                                $('#register').show();
                                $('#user_id', FormPersonal).val(response.user_id);
                                $('#user_id_1', $('#FormAudit_1')).val(response.user_id);
                                $('#user_id_1', $('#FormEducation_1')).val(response.user_id);
                                $('#user_id_1', $('#FormExperience_1')).val(response.user_id);
                                $('#user_id_1', $('#FormTraining_1')).val(response.user_id);
                                $('#old_password', FormPersonal).val(response.user_password);
                                $('#text_preview', FormPersonal).val(response.doc_idcard_path);
                                $('#btn_preview', FormPersonal).attr('href', response.doc_idcard_path == '' || response.doc_idcard_path == null ? 'javascript:' : site_url + response.doc_idcard_path);
                                user_id = response.user_id;
                                $('#full_name', FormPersonal).val(response.full_name);
                                $('#birth_place', FormPersonal).val(response.birth_place);
                                $('#birth_date', FormPersonal).val(response.birth_date);
                                $('#gender', FormPersonal).val(response.gender);
                                $('#address', FormPersonal).val(response.address);
                                //   fill_select('ref_province', response.province_id, $('#province_id', FormPersonal))
                                fill_child('province', '', $('#province_id', FormPersonal), response.province_id)
                                fill_child('ref_province', response.province_id, $('#district_id', FormPersonal), response.district_id)
                                fill_child('ref_district', response.district_id, $('#subdistrict_id', FormPersonal), response.subdistrict_id)
                                fill_child('ref_subdistrict', response.subdistrict_id, $('#village_id', FormPersonal), response.village_id)
                                $('#email', FormPersonal).val(response.email);
                                $('#mobile_phone', FormPersonal).val(response.mobile_phone);
                                $('#phone', FormPersonal).val(response.phone);
                                $('#user_type_id', FormPersonal).val(response.user_type_id);
                                $('#idcard_number', FormPersonal).val(response.idcard_number);
                                //$('#doc_idcard_path', FormPersonal).val(response.doc_idcard_path);
                                $('#user_name', FormPersonal).val(response.user_name);
                                //  $('#user_password', FormPersonal).val(response.user_password);
                                //$('#confirm_password', FormPersonal).val(response.user_password);
                                $('#note', FormPersonal).val(response.note);
                                $('#createdAt', FormPersonal).val(response.createdAt);
                                $('#updatedAt', FormPersonal).val(response.updatedAt);
                                $('#province_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#subdistrict_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#birth_place', $('#FormPersonal')).attr('disabled', 'true');
                                $('#village_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#birth_date', $('#FormPersonal')).attr('disabled', 'true');
                                $('#gender', $('#FormPersonal')).attr('disabled', 'true');
                                $('#mobile_phone', $('#FormPersonal')).attr('disabled', 'true');
                                $('#address', $('#FormPersonal')).attr('disabled', 'true');
                                $('#phone', $('#FormPersonal')).attr('disabled', 'true');
                                $('#idcard_number', $('#FormPersonal')).attr('disabled', 'true');
                                $('#district_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#doc_idcard_path', $('#FormPersonal')).attr('disabled', 'true');
                                $('#btn_save', $('#FormPersonal')).attr('disabled', 'true');
                                $('#btn_edit', personalku).html('<i class="fa fa-edit"></i> Edit');
                                $('#btn_edit', personalku).removeAttr('disabled', 'disabled');
                                $('#full_name', $('#FormPersonal')).attr('disabled', 'true');
                                $('#email', $('#FormPersonal')).attr('disabled', 'true');
                                $('#user_password', $('#FormPersonal')).attr('disabled', 'true');
                                $('#confirm_password', $('#FormPersonal')).attr('disabled', 'true');

                                /** isi form education */
                                $.ajax({
                                    type: "POST",
                                    url: site_url + '/User/get_data_education_by_id',
                                    data: { user_id: selrow },
                                    dataType: "json",
                                    success: function (response) {
                                        // if (count(response) > 0) {
                                        let edu = 1;
                                        for (ieducation in response) {
                                            if (edu > 1) {
                                                clik_body_education();
                                            }
                                            $('#user_id_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].user_id);
                                            $('#id_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].education_id);
                                            $('#level_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].level);
                                            $('#university_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].university);
                                            $('#major_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].major);
                                            $('#certificate_number_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].certificate_number);
                                            $('#start_date_education_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].start_date);
                                            $('#end_date_education_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].end_date);
                                            $('#accreditation_status_' + edu, $('#FormEducation_' + edu)).val(response[ieducation].accreditation_status);
                                            $('#btn_preview_' + edu, $('#FormEducation_' + edu)).attr('href', response[ieducation].doc_path == '' || response[ieducation].doc_path == null ? 'javascript:' : site_url + response[ieducation].doc_path);

                                            disabled_form_education('disabled', edu);
                                            if (response[ieducation].status == '1') {
                                                $('#btn_edit_' + edu, $('#FormEducation_' + edu)).attr('disabled', true);
                                                $('#btn_delete_' + edu, $('#FormEducation_' + edu)).attr('disabled', true);
                                            }
                                            edu++;
                                        }
                                    }
                                });

                                /** isi form experience */
                                $.ajax({
                                    type: "POST",
                                    url: site_url + '/User/get_data_experience_by_id',
                                    data: { user_id: selrow },
                                    dataType: "json",
                                    success: function (response) {
                                        // if (count(response) > 0) {
                                        let edu = 1;
                                        for (iexperience in response) {
                                            if (edu > 1) {
                                                click_body_experience();
                                            }
                                            $('#user_id_' + edu, $('#FormExperience_' + edu)).val(user_id);
                                            $('#id_' + edu, $('#FormExperience_' + edu)).val(response[iexperience].experience_id);
                                            $('#company_name_' + edu, $('#FormExperience_' + edu)).val(response[iexperience].company_name);
                                            $('#departement_id_' + edu, $('#FormExperience_' + edu)).val(response[iexperience].departement_id);
                                            $('#position_' + edu, $('#FormExperience_' + edu)).val(response[iexperience].position);
                                            $('#start_date_experience_' + edu, $('#FormExperience_' + edu)).val(response[iexperience].start_date);
                                            $('#end_date_experience_' + edu, $('#FormExperience_' + edu)).val(response[iexperience].end_date);
                                            $('#company_name_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#departement_id_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#position_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#start_date_experience_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#end_date_experience_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#doc_path_experience_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#btn_preview_' + edu, $('#FormExperience_' + edu)).attr('href', response[iexperience].doc_path == '' || response[iexperience].doc_path == null ? 'javascript:' : site_url + response[iexperience].doc_path);
                                            $('#btn_save_' + edu, $('#FormExperience_' + edu)).attr('disabled', 'true');
                                            $('#btn_edit_' + edu, experienceku).html('<i class="fa fa-edit"></i> Edit');
                                            $('#btn_edit_' + edu, $('#FormExperience_' + edu)).removeAttr('disabled', 'disabled');
                                            if (response[iexperience].status == '1') {
                                                $('#btn_edit_' + edu, $('#FormExperience_' + edu)).attr('disabled', true);
                                                $('#btn_delete_' + edu, $('#FormExperience_' + edu)).attr('disabled', true);
                                            }
                                            edu++;
                                        }
                                    }
                                });

                                /** isi form Audit experience */
                                $.ajax({
                                    type: "POST",
                                    url: site_url + '/User/get_data_audit_experience_by_id',
                                    data: { user_id: selrow },
                                    dataType: "json",
                                    success: function (response) {
                                        // if (count(response) > 0) {
                                        let edu = 0;
                                        for (iaudit in response) {
                                            edu++;
                                            if (edu > 1) {
                                                click_body_audit();
                                            }
                                            $('#user_id_' + edu, $('#FormAudit_' + edu)).val(user_id);
                                            $('#id_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].audit_experience_id);
                                            $('#company_addres_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].company_addres);
                                            //$('#scope_id_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].scope_id);
                                            //$('#role_id_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].role_id_);
                                            fill_multi_check('audit_experienced_scope', 'scope_id', "audit_experience_id='" + $('#id_' + edu, auditku).val() + "'", 'ref_scope', 'scope_id', 'scope_description', $('#scopean_' + edu, auditku), 'scope_id_', edu.toExponential, 'disabled');
                                            fill_multi_check('audit_experienced_role', 'role_id', "audit_experience_id='" + $('#id_' + edu, auditku).val() + "'", 'ref_role', 'role_id', 'role_name', $('#peranan_' + edu, auditku), 'role_id_', edu, 'disabled');
                                            $('#company_phone_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].company_phone);
                                            $('#contact_person_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].contact_person);
                                            $('#start_date_audit_experience_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].start_date);
                                            $('#end_date_audit_experience_' + edu, $('#FormAudit_' + edu)).val(response[iaudit].end_date);
                                            $('#btn_preview_audit_' + edu, $('#FormAudit_' + edu)).attr('href', response[iaudit].doc_audit_plan_path == '' || response[iaudit].doc_audit_plan_path == null ? 'javascript:' : site_url + response[iaudit].doc_audit_plan_path);
                                            $('#btn_preview_work_' + edu, $('#FormAudit_' + edu)).attr('href', response[iaudit].doc_work_order_path == '' || response[iaudit].doc_work_order_path == null ? 'javascript:' : site_url + response[iaudit].doc_work_order_path);
                                            disabled_form_audit('disabled', edu);

                                            if (response[iaudit].status == '1') {
                                                $('#btn_edit_' + edu, $('#FormAudit_' + edu)).attr('disabled', true);
                                                $('#btn_delete_' + edu, $('#FormAudit_' + edu)).attr('disabled', true);
                                            }
                                            edu++;
                                        }
                                    }
                                });

                                /** isi form training */
                                $.ajax({
                                    type: "POST",
                                    url: site_url + '/User/get_data_training_by_id',
                                    data: { user_id: selrow },
                                    dataType: "json",
                                    success: function (response) {
                                        // if (count(response) > 0) {
                                        let edu = 1;
                                        for (itraining in response) {
                                            if (edu > 1) {
                                                click_body_training();
                                            }
                                            $('#user_id_' + edu, $('#FormTraining_' + edu)).val(user_id);
                                            $('#id_' + edu, $('#FormTraining_' + edu)).val(response[itraining].training_id);
                                            $('#provider_name_' + edu, $('#FormTraining_' + edu)).val(response[itraining].provider_name);
                                            $('#start_date_training_' + edu, $('#FormTraining_' + edu)).val(response[itraining].start_date);
                                            $('#end_date_training_' + edu, $('#FormTraining_' + edu)).val(response[itraining].end_date);
                                            $('#training_topic_' + edu, $('#FormTraining_' + edu)).val(response[itraining].training_topic);
                                            $('#relation_status_' + edu, $('#FormTraining_' + edu)).val(response[itraining].relation_status);
                                            $('#btn_preview_' + edu, $('#FormTraining_' + edu)).attr('href', response[itraining].doc_path == '' || response[itraining].doc_path == null ? 'javascript:' : site_url + response[itraining].doc_path);
                                            disabled_form_training('disabled', edu);
                                            if (response[itraining].status == '1') {
                                                $('#btn_edit_' + edu, $('#FormTraining_' + edu)).attr('disabled', true);
                                                $('#btn_delete_' + edu, $('#FormTraining_' + edu)).attr('disabled', true);
                                            }
                                            edu++;
                                        }
                                    }
                                });

                            },
                            error: function () {
                                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
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
        } else {
            Template.WarningAlert("Please select a row");
        }
    })

    /** Form Personal */
    var fill_child = function (stable, sid, sselect, sid_child) {
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                stable: stable,
                sid: sid
            },
            url: site_url + '/User/get_child',
            async: false,
            success: function (response) {
                opt = '<option value="Null">Please Select</option>';
                for (i in response) {
                    if (response[i].id == sid_child) {
                        opt += '<option value="' + response[i].id + '"  selected>' + response[i].name + '</option>';

                    } else {
                        opt += '<option value="' + response[i].id + '">' + response[i].name + '</option>';

                    }
                }
                sselect.html(opt)
            },
            error: function (e) {
                alert("Failed to Connect into Database, Please Contact Your Administrator!");
            }

        });
    }

    FormPersonal.validate({
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
            birth_place: { required: true },
            birth_date: { required: true, date: true },
            gender: { required: true },
            address: { required: true },
            province_id: { required: true },
            district_id: { required: true },
            subdistrict_id: { required: true },
            village_id: { required: true },
            email: { required: true, email: true },
            mobile_phone: { required: true },
            user_type_id: { required: true },
            user_type_id2: { required: true },
            idcard_number: { required: true, digits: true, minlength: 16, maxlength: 16 },
            // doc_idcard_path: { required: true },
            //user_password: { required: true },
            confirm_password: { equalTo: '#user_password' }
        },

        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormPersonal).show();
            Template.scrollTo($('.alert-error', FormPersonal), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormPersonal.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Add/Edit User Success.',
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', $('#FormPersonal')).hide();
                                $('#province_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#subdistrict_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#birth_place', $('#FormPersonal')).attr('disabled', 'true');
                                $('#village_id', $('#FormPersonal')).attr('disabled', 'true');
                                $('#birth_date', $('#FormPersonal')).attr('disabled', 'true');
                                $('#gender', $('#FormPersonal')).attr('disabled', 'true');
                                $('#mobile_phone', $('#FormPersonal')).attr('disabled', 'true');
                                $('#address', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#phone', $('#FormPersonal')).attr("disabled", "true");
                                $('#idcard_number', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#district_id', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#full_name', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#email', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#user_password', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#confirm_password', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#doc_idcard_path', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#btn_save', $('#FormPersonal')).attr('disabled', 'true');;
                                $('#btn_edit', $('#FormPersonal')).removeAttr('disabled');
                                $('.error', $('#FormPersonal')).removeClass('error');
                                $('.is-valid', $('#FormPersonal')).removeClass('is-valid');
                                $('.is-invalid', $('#FormPersonal')).removeClass('is-invalid');
                                $('#user_id', $('#FormPersonal')).val(response.user_id);
                                $('#user_id_1', $('#FormEducation_1')).val(response.user_id);
                                $('#user_id_1', $('#FormTraining_1')).val(response.user_id);
                                $('#user_id_1', $('#FormExperience_1')).val(response.user_id);
                                $('#user_id_1', $('#FormAudit_1')).val(response.user_id);
                                $('#old_password', $('#FormPersonal')).val(response.old_password);

                                user_id = response.user_id;
                                $('#btn_edit', personalku).html('<i class="fa fa-edit"></i> Edit');
                                $('#btn_edit', personalku).removeAttr('disabled', 'disabled');
                                $('.check_password', personalku).hide();
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
            });
        }
    });

    // even btn_edit clik
    $('#btn_edit', $('#FormPersonal')).click(function (e) {
        e.preventDefault();
        caption_personal = $(this).text();
        if ((caption_personal).trim() == 'Edit') {
            $('#province_id', $('#FormPersonal')).removeAttr('disabled');
            $('#subdistrict_id', $('#FormPersonal')).removeAttr('disabled');
            $('#birth_place', $('#FormPersonal')).removeAttr('disabled');
            $('#village_id', $('#FormPersonal')).removeAttr('disabled');
            $('#birth_date', $('#FormPersonal')).removeAttr('disabled');
            $('#gender', $('#FormPersonal')).removeAttr('disabled');
            $('#mobile_phone', $('#FormPersonal')).removeAttr('disabled');
            $('#address', $('#FormPersonal')).removeAttr('disabled');
            $('#phone', $('#FormPersonal')).removeAttr('disabled');
            $('#idcard_number', $('#FormPersonal')).removeAttr('disabled');
            $('#district_id', $('#FormPersonal')).removeAttr('disabled');
            $('#doc_idcard_path', $('#FormPersonal')).removeAttr('disabled');
            $('#btn_save', $('#FormPersonal')).removeAttr('disabled');
            $('#btn_edit', personalku).html('<i class="fa fa-undo"></i> Cancel');
            $('#full_name', $('#FormPersonal')).removeAttr('disabled');
            $('#email', $('#FormPersonal')).removeAttr('disabled');
            $('#user_password', $('#FormPersonal')).removeAttr('disabled');
            $('#confirm_password', $('#FormPersonal')).removeAttr('disabled');
            $('.check_password', $('#FormPersonal')).show();
        } else {
            $('#province_id', $('#FormPersonal')).attr('disabled', 'true');
            $('#subdistrict_id', $('#FormPersonal')).attr('disabled', 'true');
            $('#birth_place', $('#FormPersonal')).attr('disabled', 'true');
            $('#village_id', $('#FormPersonal')).attr('disabled', 'true');
            $('#birth_date', $('#FormPersonal')).attr('disabled', 'true');
            $('#gender', $('#FormPersonal')).attr('disabled', 'true');
            $('#mobile_phone', $('#FormPersonal')).attr('disabled', 'true');
            $('#address', $('#FormPersonal')).attr('disabled', 'true');
            $('#phone', $('#FormPersonal')).attr('disabled', 'true');
            $('#idcard_number', $('#FormPersonal')).attr('disabled', 'true');;
            $('#district_id', $('#FormPersonal')).attr('disabled', 'true');;
            $('#doc_idcard_path', $('#FormPersonal')).attr('disabled', 'true');;
            $('#btn_save', $('#FormPersonal')).attr('disabled', 'true');;
            $('#btn_edit', personalku).html('<i class="fa fa-edit"></i> Edit');
            $('#full_name', $('#FormPersonal')).attr('disabled', 'true');;
            $('#email', $('#FormPersonal')).attr('disabled', 'true');;
            $('#user_password', $('#FormPersonal')).attr('disabled', 'true');;
            $('#confirm_password', $('#FormPersonal')).attr('disabled', 'true');;
            $('.check_password', $('#FormPersonal')).hide();

        }

    });

    $('#province_id', personalku).change(function () {
        province_id = $(this).val();
        fill_child('ref_province', province_id, $('#district_id', personalku), '');
    })

    $('#district_id', personalku).change(function () {
        district_id = $(this).val();
        fill_child('ref_district', district_id, $('#subdistrict_id', personalku), '');
    })

    $('#subdistrict_id', personalku).change(function () {
        subdistrict_id = $(this).val();
        fill_child('ref_subdistrict', subdistrict_id, $('#village_id', personalku), '');
    })

    $('#doc_idcard_path', personalku).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview');
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        // alert($('#btn_preview', personalku).attr('href'));
    });

    //fill_child('ref_province', $('#province_id', personalku).val(), $('#district_id', personalku), session_district);
    //fill_child('ref_district', $('#district_id', personalku).val(), $('#subdistrict_id', personalku), session_subdistrict);
    //fill_child('ref_subdistrict', $('#subdistrict_id', personalku).val(), $('#village_id', personalku), session_village);
    /** end of Form Personal */

    /** Form Education */
    $("body").on("click", ".add-more-education", function () {
        clik_body_education();
    });

    var clik_body_education = function () {
        jumlah_education++;
        sisa_education++;
        var html = '<div class="tambahan_' + jumlah_education + '">';
        html += '<form class="form-horizontal" role="form" method="post" id="FormEducation_' + jumlah_education + '" action="/User/add_education/' + jumlah_education + '">';
        html += '<?= csrf_field() ?>';
        html += '<div class="alert alert-error" style="display:none;">';
        html += '<button class="close" data-dismiss="alert"></button>';
        html += 'You have some form errors. Please check below.';
        html += '</div>';
        html += '<div class="form-body">';
        html += '<input  type="hidden" id="user_id_' + jumlah_education + '" name="user_id_' + jumlah_education + '" value="' + user_id + '">';
        html += '<input  type="hidden" id="id_' + jumlah_education + '" name="id_' + jumlah_education + '">';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label" style="text-align:right">Level</label>';
        html += '<div class="col-md-3">';
        html += '<select class="form-control" data-placeholder="Silahkan pilih Level" id="level_' + jumlah_education + '" name="level_' + jumlah_education + '">';
        html += '</select>';
        html += '</div>';
        html += '<label class="col-sm-2 control-label" style="text-align:right">University</label>';
        html += '<div class="col-sm-3">';
        html += '<input type="text" name="university_' + jumlah_education + '" id="university_' + jumlah_education + '" class="form-control" placeholder="Silahkan isi nama kampus">';
        html += '</div>';
        html += '<div class="col-md-2">';
        html += '<span class="btn btn-circle green float-right add-more-education"><strong><strong> +</strong></strong></span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Major</label>';
        html += '<div class="col-sm-3">';
        html += '<input type="text" name="major_' + jumlah_education + '" id="major_' + jumlah_education + '" class="form-control" placeholder="Silahkan isi nama jurusan kuliah">';
        html += '</div>';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Certificate Number</label>';
        html += '<div class="col-sm-3">';
        html += '<input type="text" name="certificate_number_' + jumlah_education + '" id="certificate_number_' + jumlah_education + '" class="form-control" placeholder="Silahkan isi nomor ijazah">';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Start Date</label>';
        html += '<div class="col-sm-3">';
        html += '<div class="input-group">';
        html += '<input type="date" name="start_date_education_' + jumlah_education + '" id="start_date_education_' + jumlah_education + '" class="form-control" placeholder="Silahkan isi tanggal masuk kuliah">';
        html += '</div>';
        html += '</div >';
        html += '<label class="col-sm-2 control-label" style="text-align:right">End Date</label>';
        html += '<div class="col-sm-3">';
        html += '<div class="input-group">';
        html += '<input type = "date" name = "end_date_education_' + jumlah_education + '" id = "end_date_education_' + jumlah_education + '" class="form-control" placeholder = "Silahkan isi tanggal lulus kuliah">';
        html += '</div >';
        html += '</div >';
        html += '</div >';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label" style="text-align:right">Acreditation Status</label>';
        html += '<div class="col-md-3">';
        html += '<select class="form-control" id="accreditation_status_' + jumlah_education + '" name="accreditation_status_' + jumlah_education + '" placeholder="Silahkan pilih status akreditasi jurusan">';
        html += '</select>';
        html += '</div>';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Upload Certificate</label>';
        html += '<div class="col-sm-3">';
        html += '<input class="form-control" type="file" id="doc_path_education_' + jumlah_education + '" name="doc_path_education_' + jumlah_education + '" accept="application/pdf,image/*"  placeholder="Silahkan upload ijazah">';
        html += '</div>';
        html += '<div class="com-sm-2">';
        html += '    <a id="btn_preview_' + jumlah_education + '" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-actions">';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label"></label>';
        html += '<div class="col-md-4">';
        html += '<button class="btn btn-circle blue" id="btn_save_' + jumlah_education + '"><i class="fa fa-save"></i> Submit</button>';
        html += '<button class="btn btn-circle yellow" id="btn_edit_' + jumlah_education + '"><i class="fa fa-edit"></i> Edit</button>';
        html += '<button class="btn btn-circle red" id="btn_delete_' + jumlah_education + '"><i class="fa fa-trash"></i> Delete</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<hr>';
        html += '</div>';
        html += '</form >';
        html += '</div >';
        $(".after-add-more-education", educationku).append(html).children(':last');
        fill_select_master_code('level', '', $('#level_' + jumlah_education, educationku));
        fill_select_master_code('accreditation_status', '', $('#accreditation_status_' + jumlah_education, educationku));
        update_form_education_akhir();
    }

    var disabled_form_education = function (status, jumedu) {
        if (status == 'disabled') {
            $('#level_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#university_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#major_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#start_date_education_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#end_date_education_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#certificate_number_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#accreditation_status_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#doc_path_education_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#btn_save_' + jumedu, $('#FormEducation_' + jumedu)).attr('disabled', 'true');
            $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormEducation_' + jumedu)).removeClass('error');
            $('.is-valid', $('#FormEducation_' + jumedu)).removeClass('is-valid');
            $('.is-invalid', $('#FormEducation_' + jumedu)).removeClass('is-invalid');
        } else {
            $('#level_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#university_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#major_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#start_date_education_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#end_date_education_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#certificate_number_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#accreditation_status_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#doc_path_education_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#btn_save_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).html('<i class="fa fa-undo"></i> Cancel');
            $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormEducation_' + jumedu)).removeClass('error');
            $('.is-valid', $('#FormEducation_' + jumedu)).removeClass('is-valid');
            $('.is-invalid', $('#FormEducation_' + jumedu)).removeClass('is-invalid');
        }
    }

    var update_form_education_awal = function () {
        /** refresh Form Validate */
        for (let jumedu = 1; jumedu <= jumlah_education; jumedu++) {
            $('#FormEducation_' + jumedu).validate({
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
                    level: { required: true },
                    university: { required: true },
                    major: { required: true },
                    start_date_education: { required: true },
                    end_date_education: { required: true },
                    certificate_number: { required: true },
                    accreditation_status: { required: true },
                    doc_path_education: { required: true }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    $('.alert-error', $('#FormEducation_' + jumedu)).show();
                    Template.scrollTo($('.alert-error', $('#FormEducation_' + jumedu)), -200);
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
                },
                submitHandler: function (form) {

                    $('#FormEducation_' + jumedu).ajaxSubmit({
                        dataType: 'json',
                        success: function (response) {
                            if (response.success == true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Update Education Success.',
                                    confirmButtonClass: 'btn-success',
                                    confirm: function () {
                                        $('.alert-error', $('#FormEducation_' + jumedu)).hide();
                                        // alert(response.save + ' - ' + response.id);
                                        if (response.save == 'New') {
                                            $('#id_' + jumedu, $('#FormEducation_' + jumedu)).val(response.id);
                                            $('#btn_delete_' + jumedu, $('#FormEducation_' + jumedu)).removeAttr('disabled', 'disabled');
                                            // alert(response.save + ' - ' + response.id + '-' + jumedu);
                                        }
                                        disabled_form_education('disabled', jumedu);

                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.level == '1') ? $('#level_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.major == '1') ? $('#major_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.university == '1') ? $('#university_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.start_date_education == '1') ? $('#start_date_education_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.end_date_education == '1') ? $('#end_date_education_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.certificate_number == '1') ? $('#certificate_number_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.accreditation_status == '1') ? $('#accreditation_status_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";
                                (response.doc_path_education == '1') ? $('#doc_path_education_' + jumedu, $('#FormEducation_' + jumedu)).addClass('is-invalid') : "";

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
        for (let jumedu = 1; jumedu <= jumlah_education; jumedu++) {
            $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).click(function (e) {
                e.preventDefault();
                caption_edit_education = $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).text();
                (caption_edit_education.trim() == 'Edit') ? disabled_form_education('enabled', jumedu) : disabled_form_education('disabled', jumedu);
            });
        }

        /** refresh btn_delete */
        for (let jumedu = 1; jumedu <= jumlah_education; jumedu++) {
            $('#btn_delete_' + jumedu, $('#FormEducation_' + jumedu)).click(function (e) {
                e.preventDefault();
                //alert(jumedu + '-' + sisa_education);
                var id = $('#id_' + jumedu, $('#FormEducation_' + jumedu)).val();
                if (id == '') {
                    $(this).parents(".tambahan_" + jumedu).remove();
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
                                                    $('#btn_edit_' + jumedu, $('#FormEducation_' + jumedu)).click();
                                                    $('#FormEducation_' + jumedu).trigger('reset');
                                                    // alert('reset dong FormEducation_' + jumedu);
                                                } else {
                                                    //$('#btn_delete_' + jumedu).parents(".tambahan_" + jumedu).remove();
                                                    $('#doc_path_education_' + jumedu).parents(".tambahan_" + jumedu).remove();
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

        /** refreh btn_preview */
        for (let jumedu = 1; jumedu <= jumlah_education; jumedu++) {
            $('#doc_path_education_' + jumedu, educationku).change(function (e) {
                e.preventDefault();
                var reader = new FileReader();
                reader.onload = function () {
                    var output = document.getElementById('btn_preview_' + jumedu, educationku);
                    output.href = reader.result;
                };
                reader.readAsDataURL(e.target.files[0]);
                // alert($('#btn_preview', educationku).attr('href'));
            });
        }

    }
    update_form_education_awal();

    var update_form_education_akhir = function () {
        /** refresh Form Validate */
        $('#FormEducation_' + jumlah_education).validate({
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
                level: { required: true },
                university: { required: true },
                major: { required: true },
                start_date_education: { required: true },
                end_date_education: { required: true },
                certificate_number: { required: true },
                accreditation_status: { required: true },
                doc_path_education: { required: true }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                $('.alert-error', $('#FormEducation_' + jumlah_education)).show();
                Template.scrollTo($('.alert-error', $('#FormEducation_' + jumlah_education)), -200);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
            },
            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
            },
            submitHandler: function (form) {

                $('#FormEducation_' + jumlah_education).ajaxSubmit({
                    dataType: 'json',
                    success: function (response) {
                        if (response.success == true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Update Education Success.',
                                confirmButtonClass: 'btn-success',
                                confirm: function () {
                                    $('.alert-error', $('#FormEducation_' + jumlah_education)).hide();
                                    // alert(response.save + ' - ' + response.id);
                                    if (response.save == 'New') {
                                        $('#id_' + jumlah_education, $('#FormEducation_' + jumlah_education)).val(response.id);
                                        $('#btn_delete_' + jumlah_education, $('#FormEducation_' + jumlah_education)).removeAttr('disabled', 'disabled');
                                        // alert(response.save + ' - ' + response.id + '-' + jumlah_education);
                                    }
                                    disabled_form_education('disabled', jumlah_education);

                                }
                            })
                        } else {
                            Template.WarningAlert(response.msg);
                            (response.level == '1') ? $('#level_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.major == '1') ? $('#major_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.university == '1') ? $('#university_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.start_date_education == '1') ? $('#start_date_education_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.end_date_education == '1') ? $('#end_date_education_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.certificate_number == '1') ? $('#certificate_number_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.accreditation_status == '1') ? $('#accreditation_status_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";
                            (response.doc_path_education == '1') ? $('#doc_path_education_' + jumlah_education, $('#FormEducation_' + jumlah_education)).addClass('is-invalid') : "";

                        }
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                });
            }
        });

        /** refresh btn_edit */
        $('#btn_edit_' + jumlah_education, $('#FormEducation_' + jumlah_education)).click(function (e) {
            e.preventDefault();
            caption_edit_education = $('#btn_edit_' + jumlah_education, $('#FormEducation_' + jumlah_education)).text();
            (caption_edit_education.trim() == 'Edit') ? disabled_form_education('enabled', jumlah_education) : disabled_form_education('disabled', jumlah_education);
        });

        /** refresh btn_delete */
        $('#btn_delete_' + jumlah_education, $('#FormEducation_' + jumlah_education)).click(function (e) {
            e.preventDefault();
            var id = $('#id_' + jumlah_education, $('#FormEducation_' + jumlah_education)).val();
            if (id == '') {
                $(this).parents(".tambahan_" + jumlah_education).remove();
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
                                                $('#btn_edit_' + jumlah_education, $('#FormEducation_' + jumlah_education)).click();
                                                $('#FormEducation_' + jumlah_education).trigger('reset');
                                                // alert('reset dong FormEducation_' + jumlah_education);
                                            } else {
                                                //$('#btn_delete_' + jumlah_education).parents(".tambahan_" + jumlah_education).remove();
                                                $('#doc_path_education_' + jumlah_education).parents(".tambahan_" + jumlah_education).remove();
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

        /** refreh btn_preview */
        $('#doc_path_education_' + jumlah_education, educationku).change(function (e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('btn_preview_' + jumlah_education, educationku);
                output.href = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
            // alert($('#btn_preview', educationku).attr('href'));
        });
    }
    /** end of Form Education */

    /** Form Experience */
    $("body").on("click", ".add-more-experience", function () {
        click_body_experience();
    });

    var click_body_experience = function () {
        jumlah_experience++;
        sisa_experience++;

        var html = '<div class="tambahan_' + jumlah_experience + '">';
        html += '<form class="form-horizontal" role="form" method="post" id="FormExperience_' + jumlah_experience + '"  action="/User/add_experience/' + jumlah_experience + '">';

        html += '<?= csrf_field() ?>';

        html += '<div class="alert alert-error" style="display:none;">';
        html += '<button class="close" data-dismiss="alert"></button>';
        html += 'You have some form errors. Please check below.';
        html += '</div>';
        html += '<div class="form-body">';
        html += '<input type="hidden"  id="user_id_' + jumlah_experience + '" name="user_id_' + jumlah_experience + '" value="' + user_id + '">';
        html += '<input type="hidden" id="id_' + jumlah_experience + '" name="id_' + jumlah_experience + '">';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Company Name</label>';
        html += '<div class="col-sm-4">';
        html += '<input type="text" name="company_name_' + jumlah_experience + '" id="company_name_' + jumlah_experience + '" class="form-control" placeholder="Silahkan isi nama perusahaan">';
        html += '</div>';
        html += '<div class="col-md-6">';
        html += '<span class="btn btn-circle blue float-right add-more-experience" ><strong><strong> +</strong></strong></span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label" style="text-align:right">Departement</label>';
        html += '<div class="col-md-4">';
        html += '<select class="form-control single-select" id="departement_id_' + jumlah_experience + '" name="departement_id_' + jumlah_experience + '"  placeholder="Silahkan pilih departement/divisi">';

        html += '</select>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Position</label>';
        html += '<div class="col-sm-4">';
        html += '<input type="text" name="position_' + jumlah_experience + '" id="position_' + jumlah_experience + '" class="form-control" placeholder="Silahkan isi jabatan sekarang/terakhir">';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Start Date</label>';
        html += '<div class="col-sm-4">';
        html += '<div class="input-group">';
        html += '<input type="date" name="start_date_experience_' + jumlah_experience + '" id="start_date_experience_' + jumlah_experience + '" class="form-control">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">End Date</label>';
        html += '<div class="col-sm-4">';
        html += '<div class="input-group">';
        html += '<input type="date" name="end_date_experience_' + jumlah_experience + '" id="end_date_experience_' + jumlah_experience + '" class="form-control">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Upload Reference Letter</label>';
        html += '<div class="col-sm-4">';
        html += '<input class="form-control" type="file" id="doc_path_experience_' + jumlah_experience + '" name="doc_path_experience_' + jumlah_experience + '" accept="application/pdf,image/*" placeholder="Silahkan upload surat referensi">';
        html += '</div>';
        html += '<div class="com-sm-2">';
        html += '    <a id="btn_preview_' + jumlah_experience + '" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-actions">';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label"></label>';
        html += '<div class="col-md-4">';
        html += '<button class="btn btn-circle blue" id="btn_save_' + jumlah_experience + '"><i class="fa fa-save"></i> Submit</button>';
        html += '<button class="btn btn-circle yellow" type="btn" id="btn_edit_' + jumlah_experience + '" disabled><i class="fa fa-edit"></i> Edit</button>';
        html += '<button class="btn btn-circle red" type="reset" id="btn_delete_' + jumlah_experience + '" ><i class="fa fa-trash"></i> Delete</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<hr>';
        html += '</form>';

        $(".after-add-more-experience", experienceku).append(html).children(':last');

        fill_select_master_code('departement_id', '', $('#departement_id_' + jumlah_experience, experienceku));

        update_form_experience_akhir();
    }

    var update_form_experience_awal = function () {
        /** Refres Form Validate */
        for (let jumexp = 0; jumexp <= 100; jumexp++) {
            $('#FormExperience_' + jumexp).validate({
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
                    company_name: { required: true },
                    departement_id: { required: true },
                    position: { required: true },
                    start_date_experience: { required: true },
                    end_date_experience: { required: true },
                    doc_path_experience: { required: true }


                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    $('.alert-error', $('#FormExperience_' + jumexp)).show();
                    Template.scrollTo($('.alert-error', $('#FormExperience_' + jumexp)), -200);
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
                },
                submitHandler: function (form) {

                    $('#FormExperience_' + jumexp).ajaxSubmit({
                        dataType: 'json',
                        success: function (response) {
                            if (response.success == true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Update Experience Success. ',
                                    confirmButtonClass: 'btn-success',
                                    confirm: function () {
                                        $('.alert-error', $('#FormExperience_' + jumexp)).hide();
                                        $('.error', $('#FormExperience_' + jumexp)).removeClass('error');
                                        $('.is-valid', $('#FormExperience_' + jumexp)).removeClass('is-valid');
                                        $('.is-invalid', $('#FormExperience_' + jumexp)).removeClass('is-invalid');
                                        $('#btn_save_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        $('#btn_edit_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
                                        $('#company_name_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        $('#departement_id_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        $('#position_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        $('#start_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        $('#end_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        $('#doc_path_experience_' + jumexp, $('#FormExperience_' + jumexp)).attr("disabled", "true");
                                        if (response.save == 'New') {
                                            $('#id_' + jumexp, $('#FormExperience_' + jumexp)).val(response.id);
                                            $('#btn_delete_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
                                        }


                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.company_name == '1') ? $('#company_name_' + jumexp, $('#FormExperience_' + jumexp)).addClass('is-invalid') : "";
                                (response.departement_id == '1') ? $('#departement_id_' + jumexp, $('#FormExperience_' + jumexp)).addClass('is-invalid') : "";
                                (response.position == '1') ? $('#position_' + jumexp, $('#FormExperience_' + jumexp)).addClass('is-invalid') : "";
                                (response.start_date_experience == '1') ? $('#start_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).addClass('is-invalid') : "";
                                (response.end_date_experience == '1') ? $('#end_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).addClass('is-invalid') : "";

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
        for (let ejumexp = 1; ejumexp <= jumlah_experience; ejumexp++) {
            $('#btn_edit_' + ejumexp, $('#FormExperience_' + ejumexp)).click(function (e) {
                e.preventDefault();
                caption_experience = $('#btn_edit_' + ejumexp, $('#FormExperience_' + ejumexp)).text();
                if ((caption_experience).trim() == 'Edit') {
                    $('#company_name_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled');
                    $('#departement_id_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled');
                    $('#position_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled');
                    $('#start_date_experience_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled');
                    $('#end_date_experience_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled');
                    $('#doc_path_experience_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled');
                    $('#btn_save_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled', 'disabled');
                    $('#btn_edit_' + ejumexp, experienceku).html('<i class="fa fa-undo"></i> Cancel');
                } else {
                    $('#company_name_' + ejumexp, $('#FormExperience_' + ejumexp)).attr('disabled', 'true');
                    $('#departement_id_' + ejumexp, $('#FormExperience_' + ejumexp)).attr('disabled', 'true');
                    $('#position_' + ejumexp, $('#FormExperience_' + ejumexp)).attr('disabled', 'true');
                    $('#start_date_experience_' + ejumexp, $('#FormExperience_' + ejumexp)).attr('disabled', 'true');
                    $('#end_date_experience_' + ejumexp, $('#FormExperience_' + ejumexp)).attr('disabled', 'true');
                    $('#doc_path_experience_' + ejumexp, $('#FormExperience_' + ejumexp)).attr('disabled', 'true');
                    $('#btn_save_' + ejumexp, $('#FormExperience_' + ejumexp)).removeAttr('disabled', 'disabled');
                    $('#btn_edit_' + ejumexp, experienceku).html('<i class="fa fa-edit"></i> Edit');
                }

            });
        }

        /** refresh btn_delete */
        for (let djumexp = 1; djumexp <= jumlah_experience; djumexp++) {
            $('#btn_delete_' + djumexp, $('#FormExperience_' + djumexp)).click(function (e) {
                e.preventDefault();
                id = $('#id_' + djumexp, $('#FormExperience_' + djumexp)).val();
                if (id == '') {
                    $(this).parents(".tambahan_" + djumexp).remove();
                } else {
                    $.confirm({
                        title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Delete Experience ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $.ajax({
                                type: "POST", dataType: "json", data: { id: id },
                                url: site_url + '/Register/delete_experience',
                                success: function (response) {
                                    if (response.success === true) {
                                        $.alert({
                                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                            content: 'Delete Experience Success.',
                                            confirmButtonClass: 'btn green',
                                            confirm: function () {
                                                if (sisa_experience == 0) {
                                                    $('#btn_edit_' + djumexp, $('#FormExperience_' + djumexp)).click();
                                                    $('#FormExperience_' + djumexp).trigger('reset');
                                                } else {
                                                    $('#btn_delete_' + djumexp).parents(".tambahan_" + djumexp).remove();
                                                    sisa_experience--;
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

        /** refresh btn_minus */
        for (let jumexp = 1; jumexp <= jumlah_experience; jumexp++) {
            $("body").on("click", ".remove-experience-" + jumexp, function () {
                // alert("halo " + jumexp)
                $(this).parents(".tambahan_" + jumexp).remove();
                sisa_experience--;;
            });
        }

        /** refresh btn_preview */
        for (let jumexp = 1; jumexp <= jumlah_experience; jumexp++) {
            $('#doc_path_experience_' + jumexp, $('#FormExperience_' + jumexp)).change(function (e) {
                e.preventDefault();
                //alert(jumexp);
                var reader = new FileReader();
                reader.onload = function () {
                    //var output = document.getElementById('btn_preview_' + jumexp, $('#FormExperience_' + jumexp));
                    //output.href = reader.result;
                    $('#btn_preview_' + jumexp, experienceku).attr('href', reader.result);

                };
                reader.readAsDataURL(e.target.files[0]);

            });
        }
    }
    update_form_experience_awal();

    var update_form_experience_akhir = function () {
        /** Refres Form Validate */
        $('#FormExperience_' + jumlah_experience).validate({
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
                company_name: { required: true },
                departement_id: { required: true },
                position: { required: true },
                start_date_experience: { required: true },
                end_date_experience: { required: true },
                doc_path_experience: { required: true }


            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                $('.alert-error', $('#FormExperience_' + jumlah_experience)).show();
                Template.scrollTo($('.alert-error', $('#FormExperience_' + jumlah_experience)), -200);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
            },
            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
            },
            submitHandler: function (form) {

                $('#FormExperience_' + jumlah_experience).ajaxSubmit({
                    dataType: 'json',
                    success: function (response) {
                        if (response.success == true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Update Experience Success. ',
                                confirmButtonClass: 'btn-success',
                                confirm: function () {
                                    $('.alert-error', $('#FormExperience_' + jumlah_experience)).hide();
                                    $('.error', $('#FormExperience_' + jumlah_experience)).removeClass('error');
                                    $('.is-valid', $('#FormExperience_' + jumlah_experience)).removeClass('is-valid');
                                    $('.is-invalid', $('#FormExperience_' + jumlah_experience)).removeClass('is-invalid');
                                    $('#btn_save_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    $('#btn_edit_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled', 'disabled');
                                    $('#company_name_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    $('#departement_id_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    $('#position_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    $('#start_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    $('#end_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    $('#doc_path_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr("disabled", "true");
                                    if (response.save == 'New') {
                                        $('#id_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).val(response.id);
                                        $('#btn_delete_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled', 'disabled');
                                    }


                                }
                            })
                        } else {
                            Template.WarningAlert(response.msg);
                            (response.company_name == '1') ? $('#company_name_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).addClass('is-invalid') : "";
                            (response.departement_id == '1') ? $('#departement_id_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).addClass('is-invalid') : "";
                            (response.position == '1') ? $('#position_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).addClass('is-invalid') : "";
                            (response.start_date_experience == '1') ? $('#start_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).addClass('is-invalid') : "";
                            (response.end_date_experience == '1') ? $('#end_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).addClass('is-invalid') : "";

                        }
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                });
            }
        });

        /** refresh btn_edit */
        $('#btn_edit_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).click(function (e) {
            e.preventDefault();
            caption_experience = $('#btn_edit_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).text();
            if ((caption_experience).trim() == 'Edit') {
                $('#company_name_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled');
                $('#departement_id_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled');
                $('#position_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled');
                $('#start_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled');
                $('#end_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled');
                $('#doc_path_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled');
                $('#btn_save_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled', 'disabled');
                $('#btn_edit_' + jumlah_experience, experienceku).html('<i class="fa fa-undo"></i> Cancel');
            } else {
                $('#company_name_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr('disabled', 'true');
                $('#departement_id_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr('disabled', 'true');
                $('#position_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr('disabled', 'true');
                $('#start_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr('disabled', 'true');
                $('#end_date_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr('disabled', 'true');
                $('#doc_path_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).attr('disabled', 'true');
                $('#btn_save_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).removeAttr('disabled', 'disabled');
                $('#btn_edit_' + jumlah_experience, experienceku).html('<i class="fa fa-edit"></i> Edit');
            }

        });


        /** refresh btn_delete */
        $('#btn_delete_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).click(function (e) {
            e.preventDefault();
            id = $('#id_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).val();
            if (id == '') {
                $(this).parents(".tambahan_" + jumlah_experience).remove();
            } else {
                $.confirm({
                    title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Delete Experience ? Are You Sure?',
                    confirmButtonClass: 'btn green',
                    cancelButtonClass: 'btn red',
                    confirm: function () {
                        $.ajax({
                            type: "POST", dataType: "json", data: { id: id },
                            url: site_url + '/Register/delete_experience',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Delete Experience Success.',
                                        confirmButtonClass: 'btn green',
                                        confirm: function () {
                                            if (sisa_experience == 0) {
                                                $('#btn_edit_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).click();
                                                $('#FormExperience_' + jumlah_experience).trigger('reset');
                                            } else {
                                                $('#btn_delete_' + jumlah_experience).parents(".tambahan_" + jumlah_experience).remove();
                                                sisa_experience--;
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

        /** refresh btn_preview */
        $('#doc_path_experience_' + jumlah_experience, $('#FormExperience_' + jumlah_experience)).change(function (e) {
            e.preventDefault();
            //alert(jumlah_experience);
            var reader = new FileReader();
            reader.onload = function () {
                //var output = document.getElementById('btn_preview_' + jumlah_experience, $('#FormExperience_' + jumlah_experience));
                //output.href = reader.result;
                $('#btn_preview_' + jumlah_experience, experienceku).attr('href', reader.result);

            };
            reader.readAsDataURL(e.target.files[0]);

        });

    }

    var disabled_form_experience = function (status, jumexp) {
        if (status == 'disabled') {
            $('#company_name_' + jumexp, $('#FormExperience_' + jumexp)).attr('disabled', 'true');
            $('#departement_id_' + jumexp, $('#FormExperience_' + jumexp)).attr('disabled', 'true');
            $('#position_' + jumexp, $('#FormExperience_' + jumexp)).attr('disabled', 'true');
            $('#start_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).attr('disabled', 'true');
            $('#end_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).attr('disabled', 'true');
            $('#doc_path_experience_' + jumexp, $('#FormExperience_' + jumexp)).attr('disabled', 'true');
            $('#btn_save_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
            $('#btn_edit_' + jumexp, experienceku).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_edit_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormExperience_' + jumexp)).removeClass('error');
            $('.is-valid', $('#FormExperience_' + jumexp)).removeClass('is-valid');
            $('.is-invalid', $('#FormExperience_' + jumexp)).removeClass('is-invalid');
        } else {
            $('#company_name_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled');
            $('#departement_id_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled');
            $('#position_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled');
            $('#start_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled');
            $('#end_date_experience_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled');
            $('#doc_path_experience_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled');
            $('#btn_save_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
            $('#btn_edit_' + jumexp, experienceku).html('<i class="fa fa-undo"></i> Cancel');
            $('#btn_delete_' + jumexp, $('#FormExperience_' + jumexp)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormExperience_' + jumexp)).removeClass('error');
            $('.is-valid', $('#FormExperience_' + jumexp)).removeClass('is-valid');
            $('.is-invalid', $('#FormExperience_' + jumexp)).removeClass('is-invalid');
        }
    }
    /** end of Form Experience */

    /** Form Audit Experience */
    $("body").on("click", ".add-more-audit", function () {
        click_body_audit();
        fill_multi_check('audit_experienced_scope', 'scope_id', "audit_experience_id='" + $('#id_' + jumlah_audit, auditku).val() + "'", 'ref_scope', 'scope_id', 'scope_description', $('#scopean_' + jumlah_audit, auditku), 'scope_id_', jumlah_audit);
        fill_multi_check('audit_experienced_role', 'role_id', "audit_experience_id='" + $('#id_' + jumlah_audit, auditku).val() + "'", 'ref_role', 'role_id', 'role_name', $('#peranan_' + jumlah_audit, auditku), 'role_id_', jumlah_audit);

    });

    var click_body_audit = function () {
        jumlah_audit++;
        sisa_audit++;
        var html = '<div class="tambahan_' + jumlah_audit + '">';
        html += '<form class="form-horizontal" role="form" method="post" id="FormAudit_' + jumlah_audit + '" action="' + site_url + '/User/add_audit_experience/' + jumlah_audit + '">';
        html += '<?= csrf_field() ?>';
        html += '<div class="alert alert-error" style="display:none;">';
        html += '    <button class="close" data-dismiss="alert"></button>';
        html += '    You have some form errors. Please check below.';
        html += '</div>';
        html += '<div class="form-body">';
        html += '<input type="hidden" id="user_id_' + jumlah_audit + '" name="user_id_' + jumlah_audit + '" value="' + user_id + '">';
        html += '    <input  type="hidden" id="id_' + jumlah_audit + '" name="id_' + jumlah_audit + '">';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">Company Address</label>';
        html += '        <div class="col-sm-4">';
        html += '            <textarea name="company_addres_' + jumlah_audit + '" id="company_addres_' + jumlah_audit + '" class="form-control" placeholder="Silahkan isi alamat perusahaan"></textarea>';
        html += '        </div>';
        html += '        <div class="col-md-6">';
        html += '            <span class="btn btn-circle green float-right add-more-audit"><strong><strong> +</strong></strong></span>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-md-2 control-label" style="text-align:right">Scope</label>';
        html += '        <div class="col-md-5" id="scopean_' + jumlah_audit + '">';
        // html += '            <?php foreach ($scopes as $scope) : ?>';
        // html += '                <input type="checkbox" id="scope_id_<?= $jumlah_audit; ?>" name="scope_id_<?= $jumlah_audit; ?>[]" value="<?php echo $scope['scope_id'] ?>">&nbsp<?php echo $scope['scope_description']  ?><br>';
        // html += '            <?php endforeach; ?>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-md-2 control-label" style="text-align:right">Peran</label>';
        html += '        <div class="col-md-5" id="peranan_' + jumlah_audit + '">';
        // html += '            <?php foreach ($perans as $peran) : ?>';
        // html += '                <input type="checkbox" id="role_id_<?= $jumlah_audit; ?>" name="role_id_<?= $jumlah_audit; ?>[]" ><br>';
        // html += '            <?php endforeach; ?>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">Company Phone</label>';
        html += '        <div class="col-sm-4">';
        html += '            <input type="text" name="company_phone_' + jumlah_audit + '" id="company_phone_' + jumlah_audit + '" class="form-control" placeholder="Silahkan isi nomor telp kantor">';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">Contact Person</label>';
        html += '        <div class="col-sm-4">';
        html += '            <input type="text" name="contact_person_' + jumlah_audit + '" id="contact_person_' + jumlah_audit + '" class="form-control" placeholder="SIlahkan isi contact person">';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">Start Date</label>';
        html += '        <div class="col-sm-4">';
        html += '            <div class="input-group">';
        html += '                <input type="date" name="start_date_audit_experience_' + jumlah_audit + '" id="start_date_audit_experience_' + jumlah_audit + '" class="form-control">';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">End Date</label>';
        html += '        <div class="col-sm-4">';
        html += '            <div class="input-group">';
        html += '                <input type="date" name="end_date_audit_experience_' + jumlah_audit + '" id="end_date_audit_experience_' + jumlah_audit + '" class="form-control">';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">Upload Audit Plan</label>';
        html += '        <div class="col-sm-4">';
        html += '            <input class="form-control" type="file" id="doc_audit_plan_path_' + jumlah_audit + '" name="doc_audit_plan_path_' + jumlah_audit + '" accept="application/pdf,image/*">';
        html += '        </div>';
        html += '        <div class="com-sm-2">';
        html += '           <a id="btn_preview_audit_' + jumlah_audit + '" name="btn_preview_audit_' + jumlah_audit + '" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="form-group row">';
        html += '        <label class="col-sm-2 control-label" style="text-align:right">Upload Work Order</label>';
        html += '        <div class="col-sm-4">';
        html += '            <input class="form-control" type="file" id="doc_work_order_path_' + jumlah_audit + '" name="doc_work_order_path_' + jumlah_audit + '" accept="application/pdf,image/*">';
        html += '        </div>';
        html += '        <div class="com-sm-2">';
        html += '           <a id="btn_preview_work_' + jumlah_audit + '" name="btn_preview_work_' + jumlah_audit + '" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>';
        html += '        </div>';
        html += '    </div>';
        html += '    <hr>';
        html += '    <div class="form-actions">';
        html += '        <div class="form-group row">';
        html += '            <label class="col-md-2 control-label"></label>';
        html += '            <div class="col-md-4">';
        html += '                <button class="btn btn-circle blue" id="btn_save_' + jumlah_audit + '"><i class="fa fa-save"></i> Submit</button>';
        html += '                <button class="btn btn-circle yellow" id="btn_edit_' + jumlah_audit + '"><i class="fa fa-edit" disabled></i> Edit</button>';
        html += '                <button class="btn btn-circle red" id="btn_delete_' + jumlah_audit + '"><i class="fa fa-trash" disabled></i> Delete</button>';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';
        html += '    <hr>';
        html += '</div>';
        html += '</form>';
        html += '</div>';

        $(".after-add-more-audit", auditku).append(html).children(':last');
        //fill_select_master_code('relation_status', '', $('#relation_status_' + jumlah_audit, auditku));
        update_form_audit_akhir();
    }

    var disabled_form_audit = function (status, jumaud) {
        if (status == 'disabled') {
            $('#company_addres_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            for (var i = 0; i < 5; i++) {
                $('.test1_' + i, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            }
            $('#company_phone_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#contact_person_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#start_date_audit_experience_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#end_date_audit_experience_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#doc_audit_plan_path_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#doc_work_order_path_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#btn_save_' + jumaud, $('#FormAudit_' + jumaud)).attr('disabled', 'true');
            $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormAudit_' + jumaud)).removeClass('error');
            $('.is-valid', $('#FormAudit_' + jumaud)).removeClass('is-valid');
            $('.is-invalid', $('#FormAudit_' + jumaud)).removeClass('is-invalid');

        } else {
            $('#company_addres_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            for (var i = 0; i < 5; i++) {
                $('.test1_' + i, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            }
            $('#company_phone_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#contact_person_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#start_date_audit_experience_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#end_date_audit_experience_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#doc_audit_plan_path_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#doc_work_order_path_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#btn_save_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).html('<i class="fa fa-undo"></i> Cancel');
            $('#btn_delete_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormAudit_' + jumaud)).removeClass('error');
            $('.is-valid', $('#FormAudit_' + jumaud)).removeClass('is-valid');
            $('.is-invalid', $('#FormAudit_' + jumaud)).removeClass('is-invalid');
        }
    }

    var update_form_audit_awal = function () {
        /** refresh Form Validate */
        for (let jumaud = 1; jumaud <= jumlah_audit; jumaud++) {
            //  alert(jumaud);
            $('#FormAudit_' + jumaud).validate({
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
                    company_addres: { required: true },
                    scope_id: { required: true },
                    role_id: { required: true },
                    company_phone: { required: true },
                    contact_person: { required: true },
                    start_date_audit_experience: { required: true },
                    end_date_audit_experience: { required: true },
                    doc_audit_plan_path: { required: true },
                    doc_work_order_path: { required: true }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    $('.alert-error', $('#FormAudit_' + jumaud)).show();
                    Template.scrollTo($('.alert-error', $('#FormAudit_' + jumaud)), -200);
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
                },
                submitHandler: function (form) {

                    $('#FormAudit_' + jumaud).ajaxSubmit({
                        dataType: 'json',
                        success: function (response) {
                            if (response.success == true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Update Audit Experience Success.',
                                    confirmButtonClass: 'btn-success',
                                    confirm: function () {
                                        $('.alert-error', $('#FormAudit_' + jumaud)).hide();
                                        // alert(response.save + ' - ' + response.id);
                                        if (response.save == 'New') {
                                            $('#id_' + jumaud, $('#FormAudit_' + jumaud)).val(response.id);
                                            $('#btn_delete_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
                                            $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).removeAttr('disabled', 'disabled');
                                            // alert(response.save + ' - ' + response.id + '-' + jumaud);
                                        }
                                        disabled_form_audit('disabled', jumaud);

                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.company_addres == '1') ? $('#company_addres_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";
                                (response.company_phone == '1') ? $('#company_phone_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";
                                (response.contact_person == '1') ? $('#contact_person_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";
                                (response.start_date_audit_experience == '1') ? $('#start_date_audit_experience_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";
                                (response.end_date_audit_experience == '1') ? $('#end_date_audit_experience_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";
                                (response.role_id == '1') ? $('#role_id_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";
                                (response.scope_id == '1') ? $('#scope_id_' + jumaud, $('#FormAudit_' + jumaud)).addClass('is-invalid') : "";

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
        for (let jumaud = 1; jumaud <= jumlah_audit; jumaud++) {
            $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).click(function (e) {
                e.preventDefault();
                var caption_audit = $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).text();
                ((caption_audit).trim() == 'Edit') ? disabled_form_audit('enabled', jumaud) : disabled_form_audit('disabled', jumaud);

            });
        }

        /** refresh btn_delete */
        for (let jumaud = 1; jumaud <= jumlah_audit; jumaud++) {
            $('#btn_delete_' + jumaud, $('#FormAudit_' + jumaud)).click(function (e) {
                e.preventDefault();
                //alert(jumaud + '-' + sisa_education);
                var id = $('#id_' + jumaud, $('#FormAudit_' + jumaud)).val();
                if (id == '') {
                    $(this).parents(".tambahan_" + jumaud).remove();
                    sisa_audit--;
                } else {
                    $.confirm({
                        title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Delete Audit ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $.ajax({
                                type: "POST", dataType: "json", data: { id: id },
                                url: site_url + '/Register/delete_audit',
                                success: function (response) {
                                    if (response.success === true) {
                                        $.alert({
                                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                            content: 'Delete Audit Experience Success.',
                                            confirmButtonClass: 'btn green',
                                            confirm: function () {
                                                if (sisa_audit == 0) {
                                                    $('#btn_edit_' + jumaud, $('#FormAudit_' + jumaud)).trigger('click');
                                                    $('#FormAudit_' + jumaud, trainingku).trigger('reset');
                                                    //   alert('reset dong FormAudit_' + jumaud);

                                                } else {
                                                    $('#btn_delete_' + jumaud).parents(".tambahan_" + jumaud).remove();
                                                    sisa_audit--;
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

        /** refreh btn_preview_audit */
        for (let jumaud = 1; jumaud <= jumlah_audit; jumaud++) {
            $('#doc_audit_plan_path_' + jumaud, auditku).change(function (e) {
                e.preventDefault();
                var reader = new FileReader();
                reader.onload = function () {
                    var output = document.getElementById('btn_preview_audit_' + jumaud, auditku);
                    output.href = reader.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            });
        }

        /** refreh btn_preview_work */
        for (let jumaud = 1; jumaud <= jumlah_audit; jumaud++) {
            $('#doc_work_order_path_' + jumaud, auditku).change(function (e) {
                e.preventDefault();
                var reader = new FileReader();
                reader.onload = function () {
                    var output = document.getElementById('btn_preview_work_' + jumaud, auditku);
                    output.href = reader.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            });
        }
    }
    update_form_audit_awal();

    var update_form_audit_akhir = function () {
        /** refresh Form Validate */
        $('#FormAudit_' + jumlah_audit).validate({
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
                company_addres: { required: true },
                scope_id: { required: true },
                role_id: { required: true },
                company_phone: { required: true },
                contact_person: { required: true },
                start_date_audit_experience: { required: true },
                end_date_audit_experience: { required: true },
                doc_audit_plan_path: { required: true },
                doc_work_order_path: { required: true }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                $('.alert-error', $('#FormAudit_' + jumlah_audit)).show();
                Template.scrollTo($('.alert-error', $('#FormAudit_' + jumlah_audit)), -200);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
            },
            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
            },
            submitHandler: function (form) {

                $('#FormAudit_' + jumlah_audit).ajaxSubmit({
                    dataType: 'json',
                    success: function (response) {
                        if (response.success == true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Update Audit Experience Success.',
                                confirmButtonClass: 'btn-success',
                                confirm: function () {
                                    $('.alert-error', $('#FormAudit_' + jumlah_audit)).hide();
                                    // alert(response.save + ' - ' + response.id);
                                    if (response.save == 'New') {
                                        $('#id_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).val(response.id);
                                        $('#btn_delete_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).removeAttr('disabled', 'disabled');
                                        $('#btn_edit_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).removeAttr('disabled', 'disabled');
                                        // alert(response.save + ' - ' + response.id + '-' + jumlah_audit);
                                    }
                                    disabled_form_audit('disabled', jumlah_audit);

                                }
                            })
                        } else {
                            Template.WarningAlert(response.msg);
                            (response.company_addres == '1') ? $('#company_addres_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";
                            (response.company_phone == '1') ? $('#company_phone_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";
                            (response.contact_person == '1') ? $('#contact_person_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";
                            (response.start_date_audit_experience == '1') ? $('#start_date_audit_experience_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";
                            (response.end_date_audit_experience == '1') ? $('#end_date_audit_experience_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";
                            (response.role_id == '1') ? $('#role_id_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";
                            (response.scope_id == '1') ? $('#scope_id_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).addClass('is-invalid') : "";

                        }
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                });
            }
        });

        /** refresh btn_edit */
        $('#btn_edit_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).click(function (e) {
            e.preventDefault();
            var caption_audit = $('#btn_edit_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).text();
            ((caption_audit).trim() == 'Edit') ? disabled_form_audit('enabled', jumlah_audit) : disabled_form_audit('disabled', jumlah_audit);

        });

        /** refresh btn_delete */
        $('#btn_delete_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).click(function (e) {
            e.preventDefault();
            //alert(jumlah_audit + '-' + sisa_education);
            var id = $('#id_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).val();
            if (id == '') {
                $(this).parents(".tambahan_" + jumlah_audit).remove();
                sisa_audit--;
            } else {
                $.confirm({
                    title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Delete Audit ? Are You Sure?',
                    confirmButtonClass: 'btn green',
                    cancelButtonClass: 'btn red',
                    confirm: function () {
                        $.ajax({
                            type: "POST", dataType: "json", data: { id: id },
                            url: site_url + '/Register/delete_audit',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Delete Audit Experience Success.',
                                        confirmButtonClass: 'btn green',
                                        confirm: function () {
                                            if (sisa_audit == 0) {
                                                $('#btn_edit_' + jumlah_audit, $('#FormAudit_' + jumlah_audit)).trigger('click');
                                                $('#FormAudit_' + jumlah_audit, trainingku).trigger('reset');
                                                //   alert('reset dong FormAudit_' + jumlah_audit);

                                            } else {
                                                //$('#btn_delete_' + jumlah_audit).parents(".tambahan_" + jumlah_audit).remove();
                                                $('#btn_delete_' + jumlah_audit).parents(".tambahan_" + jumlah_audit).remove();
                                                sisa_audit--;
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

        /** refreh btn_preview_audit */
        $('#doc_audit_plan_path_' + jumlah_audit, auditku).change(function (e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('btn_preview_audit_' + jumlah_audit, auditku);
                output.href = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        /** refreh btn_preview_work */
        $('#doc_work_order_path_' + jumlah_audit, auditku).change(function (e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('btn_preview_work_' + jumlah_audit, auditku);
                output.href = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }

    var fill_multi_check = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect, sid, ijum, disabled) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/getdatatoarray',
            data: {
                table: stable1,
                field: sfield1,
                param: sparam
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/getdatatoarray2',
                    data: {
                        table: stable2,
                        field1: sfield2a,
                        field2: sfield2b
                    },
                    dataType: "json",
                    success: function (response) {
                        checkbox = '';
                        var check = false;
                        for (i in response) {
                            for (j in response2) {
                                if (response[i].id == response2[j].id) {
                                    check = true;
                                }
                            }
                            if (check == true) {

                                checkbox += '<input type="checkbox" class="test1_' + ijum + '" id="' + sid + ijum + '" name="' + sid + ijum + '[]" value="' + response[i].id + '"   " checked " ' + disabled + '>&nbsp' + response[i].name + '<br>';
                            } else {
                                checkbox += '<input type="checkbox" class="test1_' + ijum + '" id="' + sid + ijum + '" name="' + sid + ijum + '[]" value="' + response[i].id + '" ' + disabled + '>&nbsp' + response[i].name + '<br>';

                            }
                            check = false;

                        }
                        //alert(ijum);
                        // alert(checkbox);
                        sselect.html(checkbox);
                        //alert(checkbox + '25')
                    }
                });
            }
        });
    }

    var clear_multi_check = function (stable2, sfield2a, sfield2b, sselect, sid, ijum, disabled) {

        $.ajax({
            type: "POST",
            url: site_url + '/Certification/getdatatoarray2',
            data: {
                table: stable2,
                field1: sfield2a,
                field2: sfield2b
            },
            dataType: "json",
            success: function (response) {
                checkbox = '';
                var check = false;
                for (i in response) {
                    checkbox += '<input type="checkbox" class="test1_' + ijum + '" id="' + sid + ijum + '" name="' + sid + ijum + '[]" value="' + response[i].id + '" ' + disabled + '>&nbsp' + response[i].name + '<br>';
                }
                sselect.html(checkbox);
            }
        });

    }

    // if (isi == 'ada') {
    for (let jumaud = 1; jumaud <= jumlah_audit; jumaud++) {
        fill_multi_check('audit_experienced_scope', 'scope_id', "audit_experience_id='" + $('#id_' + jumaud, auditku).val() + "'", 'ref_scope', 'scope_id', 'scope_description', $('#scopean_' + jumaud, auditku), 'scope_id_', jumaud, '');
        fill_multi_check('audit_experienced_role', 'role_id', "audit_experience_id='" + $('#id_' + jumaud, auditku).val() + "'", 'ref_role', 'role_id', 'role_name', $('#peranan_' + jumaud, auditku), 'role_id_', jumaud, '');
    }

    /** end of Form Audit Experience */

    /** Form Training */
    $("body").on("click", ".add-more-training", function () {
        click_body_training();
    });

    var click_body_training = function () {
        jumlah_training++;
        sisa_training++;

        var html = '<div class="tambahan_' + jumlah_training + '">';
        html += '<form class="form-horizontal" role = "form" method = "post" id = "FormTraining_' + jumlah_training + '" action = "' + site_url + '/User/add_training/' + jumlah_training + '">';
        html += '<?= csrf_field() ?>';
        html += '<div class="alert alert-error" style="display:none;">';
        html += '<button class="close" data-dismiss="alert"></button>';
        html += 'You have some form errors. Please check below.';
        html += '</div>';
        html += '<div class="form-body">';
        html += '<input type="hidden" id="user_id_' + jumlah_training + '" name="user_id_' + jumlah_training + '" value="' + user_id + '">';
        html += '<input type="hidden" id="id_' + jumlah_training + '" name="id_' + jumlah_training + '">';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Provider Name</label>';
        html += '<div class="col-sm-4">';
        html += '<input type="text" name="provider_name_' + jumlah_training + '" id="provider_name_' + jumlah_training + '"  class="form-control" placeholder="Silahkan isi nama penyedia training">';
        html += '</div>';
        html += '<div class="col-md-6">';
        html += '<span class="btn btn-circle green float-right add-more-training"><strong><strong> +</strong></strong></span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Start Date</label>';
        html += '<div class="col-sm-4">';
        html += '<div class="input-group">';
        html += '<input type="date" name="start_date_training_' + jumlah_training + '" id="start_date_training_' + jumlah_training + '" class="form-control">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">End Date</label>';
        html += '<div class="col-sm-4">';
        html += '<div class="input-group">';
        html += '<input type="date" name="end_date_training_' + jumlah_training + '" id="end_date_training_' + jumlah_training + '" class="form-control">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Training Topic</label>';
        html += '<div class="col-sm-4">';
        html += '<textarea name="training_topic_' + jumlah_training + '" id="training_topic_' + jumlah_training + '"  class="form-control" placeholder="Silahkan isi topik training"></textarea>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label" style="text-align:right">Relation Status</label>';
        html += '<div class="col-md-4">';
        html += '<select class="form-control" id="relation_status_' + jumlah_training + '" name="relation_status_' + jumlah_training + '" >';
        html += '</select>';
        html += '</div>';
        html += '</div>';
        html += '<div class="form-group row">';
        html += '<label class="col-sm-2 control-label" style="text-align:right">Upload Training</label>';
        html += '<div class="col-sm-4">';
        html += '<input class="form-control" type="file" id="doc_path_training_' + jumlah_training + '" name="doc_path_training_' + jumlah_training + '" accept="application/pdf,image/*">';
        html += '</div>';
        html += '<div class="com-sm-2">';
        html += '    <a id="btn_preview_' + jumlah_training + '" name="btn_preview_' + jumlah_training + '" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>';
        html += '</div>';
        html += '</div>';

        html += '<hr>';
        html += '<div class="form-actions">';
        html += '<div class="form-group row">';
        html += '<label class="col-md-2 control-label"></label>';
        html += '<div class="col-md-4">';
        html += '<button class="btn btn-circle blue" id="btn_save_' + jumlah_training + '"><i class="fa fa-save"></i> Submit</button>';
        html += '<button class="btn btn-circle yellow" type="button" id="btn_edit_' + jumlah_training + '" disabled><i class="fa fa-edit"></i> Edit</button>';
        html += '<button class="btn btn-circle red" type="button" id="btn_delete_' + jumlah_training + '" ><i class="fa fa-trash"></i> Delete</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<hr>';
        html += '</div>';
        html += '</form>';
        html += '</div>';

        $(".after-add-more-training", trainingku).append(html).children(':last');
        fill_select_master_code('relation_status', '', $('#relation_status_' + jumlah_training, trainingku));
        update_form_training_akhir();
    }

    var disabled_form_training = function (status, jumtra) {
        if (status == 'disabled') {
            $('#provider_name_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#start_date_training_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#end_date_training_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#training_topic_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#relation_status_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#doc_path_training_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#btn_save_' + jumtra, $('#FormTraining_' + jumtra)).attr('disabled', 'true');
            $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).html('<i class="fa fa-edit"></i> Edit');
            $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#btn_delete_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormTraining_' + jumtra)).removeClass('error');
            $('.is-valid', $('#FormTraining_' + jumtra)).removeClass('is-valid');
            $('.is-invalid', $('#FormTraining_' + jumtra)).removeClass('is-invalid');

            cancel_training = true;
        } else {
            $('#provider_name_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#start_date_training_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#end_date_training_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#training_topic_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#relation_status_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#doc_path_training_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#btn_save_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).html('<i class="fa fa-undo"></i> Cancel');
            $('#btn_delete_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
            $('.error', $('#FormTraining_' + jumtra)).removeClass('error');
            $('.is-valid', $('#FormTraining_' + jumtra)).removeClass('is-valid');
            $('.is-invalid', $('#FormTraining_' + jumtra)).removeClass('is-invalid');
            cancel_training = false;
        }
    }

    var update_form_training_awal = function () {
        /** refresh Form Validate */
        for (let jumtra = 1; jumtra <= jumlah_training; jumtra++) {
            //  alert(jumtra);
            $('#FormTraining_' + jumtra).validate({
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
                    provider_name: { required: true },
                    start_date_training: { required: true },
                    end_date_training: { required: true },
                    training_topic: { required: true },
                    relation_status: { required: true },
                    doc_path_training: { required: true }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    $('.alert-error', $('#FormTraining_' + jumtra)).show();
                    Template.scrollTo($('.alert-error', $('#FormTraining_' + jumtra)), -200);
                },
                highlight: function (element) { // hightlight error inputs
                    $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
                },
                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
                },
                submitHandler: function (form) {

                    $('#FormTraining_' + jumtra).ajaxSubmit({
                        dataType: 'json',
                        success: function (response) {
                            if (response.success == true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Update Training Success.',
                                    confirmButtonClass: 'btn-success',
                                    confirm: function () {
                                        $('.alert-error', $('#FormTraining_' + jumtra)).hide();
                                        // alert(response.save + ' - ' + response.id);
                                        if (response.save == 'New') {
                                            $('#id_' + jumtra, $('#FormTraining_' + jumtra)).val(response.id);
                                            $('#btn_delete_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
                                            $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).removeAttr('disabled', 'disabled');
                                            // alert(response.save + ' - ' + response.id + '-' + jumtra);
                                        }
                                        disabled_form_training('disabled', jumtra);

                                    }
                                })
                            } else {
                                Template.WarningAlert(response.msg);
                                (response.provider_name == '1') ? $('#provider_name_' + jumtra, $('#FormTraining_' + jumtra)).addClass('is-invalid') : "";
                                (response.start_date_training == '1') ? $('#start_date_training_' + jumtra, $('#FormTraining_' + jumtra)).addClass('is-invalid') : "";
                                (response.end_date_training == '1') ? $('#end_date_training_' + jumtra, $('#FormTraining_' + jumtra)).addClass('is-invalid') : "";
                                (response.relation_status == '1') ? $('#relation_status_' + jumtra, $('#FormTraining_' + jumtra)).addClass('is-invalid') : "";
                                (response.training_topic == '1') ? $('#training_topic_' + jumtra, $('#FormTraining_' + jumtra)).addClass('is-invalid') : "";

                            }
                        },
                        error: function () {
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        }
                    });
                }
            });
        }

        /** refresh doc_path_training */
        for (let jumtra = 1; jumtra <= jumlah_training; jumtra++) {
            $('#doc_path_training_' + jumtra, $('#FormTraining_' + jumtra)).change(function (e) {
                e.preventDefault();
                //alert('doc_path_' + jumtra);
            });
        }

        /** refresh btn_edit */
        for (let jumtra = 1; jumtra <= jumlah_training; jumtra++) {
            $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).click(function (e) {
                e.preventDefault();
                var caption_training = $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).text();
                //(cancel_training == true) ? disabled_form_training('enabled', jumtra) : disabled_form_training('disabled', jumtra);
                (caption_training == ' Edit') ? disabled_form_training('enabled', jumtra) : disabled_form_training('disabled', jumtra);

            });
        }

        /** refresh btn_delete */
        for (let jumtra = 1; jumtra <= jumlah_training; jumtra++) {

            $('#btn_delete_' + jumtra, $('#FormTraining_' + jumtra)).click(function (e) {
                e.preventDefault();
                //alert(jumtra + '-' + sisa_education);
                var id = $('#id_' + jumtra, $('#FormTraining_' + jumtra)).val();

                if (id == '') {
                    $(this).parents(".tambahan_" + jumtra).remove();
                } else {
                    $.confirm({
                        title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                        content: 'Delete Training ? Are You Sure?',
                        confirmButtonClass: 'btn green',
                        cancelButtonClass: 'btn red',
                        confirm: function () {
                            $.ajax({
                                type: "POST", dataType: "json", data: { id: id },
                                url: site_url + '/Register/delete_training',
                                success: function (response) {
                                    if (response.success === true) {
                                        $.alert({
                                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                            content: 'Delete Training Success.',
                                            confirmButtonClass: 'btn green',
                                            confirm: function () {
                                                if (sisa_training == 0) {
                                                    $('#btn_edit_' + jumtra, $('#FormTraining_' + jumtra)).trigger('click');
                                                    $('#FormTraining_' + jumtra, trainingku).trigger('reset');
                                                    //   alert('reset dong FormTraining_' + jumtra);

                                                } else {
                                                    //$('#btn_delete_' + jumtra).parents(".tambahan_" + jumtra).remove();
                                                    $('#doc_path_training_' + jumtra).parents(".tambahan_" + jumtra).remove();
                                                    sisa_training--;
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

        /** refresh btn_preview */
        for (let jumtra = 1; jumtra <= jumlah_training; jumtra++) {
            $('#doc_path_training_' + jumtra, trainingku).change(function (e) {
                e.preventDefault();
                var reader = new FileReader();
                reader.onload = function () {
                    $('#btn_preview_' + jumtra, trainingku).attr('href', reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);

            });
        }

    }
    update_form_training_awal();

    var update_form_training_akhir = function () {
        /** refresh Form Validate */
        $('#FormTraining_' + jumlah_training).validate({
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
                provider_name: { required: true },
                start_date_training: { required: true },
                end_date_training: { required: true },
                training_topic: { required: true },
                relation_status: { required: true },
                doc_path_training: { required: true }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit              
                $('.alert-error', $('#FormTraining_' + jumlah_training)).show();
                Template.scrollTo($('.alert-error', $('#FormTraining_' + jumlah_training)), -200);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
            },
            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
            },
            submitHandler: function (form) {

                $('#FormTraining_' + jumlah_training).ajaxSubmit({
                    dataType: 'json',
                    success: function (response) {
                        if (response.success == true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Update Training Success.',
                                confirmButtonClass: 'btn-success',
                                confirm: function () {
                                    $('.alert-error', $('#FormTraining_' + jumlah_training)).hide();
                                    // alert(response.save + ' - ' + response.id);
                                    if (response.save == 'New') {
                                        $('#id_' + jumlah_training, $('#FormTraining_' + jumlah_training)).val(response.id);
                                        $('#btn_delete_' + jumlah_training, $('#FormTraining_' + jumlah_training)).removeAttr('disabled', 'disabled');
                                        $('#btn_edit_' + jumlah_training, $('#FormTraining_' + jumlah_training)).removeAttr('disabled', 'disabled');
                                        // alert(response.save + ' - ' + response.id + '-' + jumlah_training);
                                    }
                                    disabled_form_training('disabled', jumlah_training);

                                }
                            })
                        } else {
                            Template.WarningAlert(response.msg);
                            (response.provider_name == '1') ? $('#provider_name_' + jumlah_training, $('#FormTraining_' + jumlah_training)).addClass('is-invalid') : "";
                            (response.start_date_training == '1') ? $('#start_date_training_' + jumlah_training, $('#FormTraining_' + jumlah_training)).addClass('is-invalid') : "";
                            (response.end_date_training == '1') ? $('#end_date_training_' + jumlah_training, $('#FormTraining_' + jumlah_training)).addClass('is-invalid') : "";
                            (response.relation_status == '1') ? $('#relation_status_' + jumlah_training, $('#FormTraining_' + jumlah_training)).addClass('is-invalid') : "";
                            (response.training_topic == '1') ? $('#training_topic_' + jumlah_training, $('#FormTraining_' + jumlah_training)).addClass('is-invalid') : "";

                        }
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                });
            }
        });

        /** refresh btn_edit */
        $('#btn_edit_' + jumlah_training, $('#FormTraining_' + jumlah_training)).click(function (e) {
            e.preventDefault();
            var caption_training = $('#btn_edit_' + jumlah_training, $('#FormTraining_' + jumlah_training)).text();
            //(cancel_training == true) ? disabled_form_training('enabled', jumlah_training) : disabled_form_training('disabled', jumlah_training);
            (caption_training == ' Edit') ? disabled_form_training('enabled', jumlah_training) : disabled_form_training('disabled', jumlah_training);

        });

        /** refresh btn_delete */
        $('#btn_delete_' + jumlah_training, $('#FormTraining_' + jumlah_training)).click(function (e) {
            e.preventDefault();
            //alert(jumlah_training + '-' + sisa_education);
            var id = $('#id_' + jumlah_training, $('#FormTraining_' + jumlah_training)).val();

            if (id == '') {
                $(this).parents(".tambahan_" + jumlah_training).remove();
            } else {
                $.confirm({
                    title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                    content: 'Delete Training ? Are You Sure?',
                    confirmButtonClass: 'btn green',
                    cancelButtonClass: 'btn red',
                    confirm: function () {
                        $.ajax({
                            type: "POST", dataType: "json", data: { id: id },
                            url: site_url + '/Register/delete_training',
                            success: function (response) {
                                if (response.success === true) {
                                    $.alert({
                                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                        content: 'Delete Training Success.',
                                        confirmButtonClass: 'btn green',
                                        confirm: function () {
                                            if (sisa_training == 0) {
                                                $('#btn_edit_' + jumlah_training, $('#FormTraining_' + jumlah_training)).trigger('click');
                                                $('#FormTraining_' + jumlah_training, trainingku).trigger('reset');
                                                //   alert('reset dong FormTraining_' + jumlah_training);

                                            } else {
                                                //$('#btn_delete_' + jumlah_training).parents(".tambahan_" + jumlah_training).remove();
                                                $('#doc_path_training_' + jumlah_training).parents(".tambahan_" + jumlah_training).remove();
                                                sisa_training--;
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


        /** refresh btn_preview */
        $('#doc_path_training_' + jumlah_training, trainingku).change(function (e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.onload = function () {
                $('#btn_preview_' + jumlah_training, trainingku).attr('href', reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);

        });


    }
    /** end of Form Training */

    /** All Form */
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

    var fill_multi_select = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/getdatatoarray',
            data: {
                table: stable1,
                field: sfield1,
                param: sparam
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/getdatatoarray2',
                    data: {
                        table: stable2,
                        field1: sfield2a,
                        field2: sfield2b
                    },
                    dataType: "json",
                    success: function (response) {
                        opt = '<option value="">Please Select</option>';
                        var check = false;
                        for (i in response) {
                            opt += '<option value="' + response[i].id + '">' + response[i].name + '</option>';
                        }
                        sselect.html(opt);
                    }
                });
            }
        });
    }

    var fill_multi_select_edit = function (stable1, sfield1, sparam, stable2, sfield2a, sfield2b, sselect) {
        $.ajax({
            type: "POST",
            url: site_url + '/Certification/getdatatoarray',
            data: {
                table: stable1,
                field: sfield1,
                param: sparam
            },
            dataType: "json",
            success: function (response) {
                var response2 = response;
                $.ajax({
                    type: "POST",
                    url: site_url + '/Certification/getdatatoarray2',
                    data: {
                        table: stable2,
                        field1: sfield2a,
                        field2: sfield2b
                    },
                    dataType: "json",
                    success: function (response) {
                        opt = '<option value="">Please Select</option>';
                        var check = false;
                        for (i in response) {
                            for (j in response2) {
                                if (response[i].id == response2[j].id) {
                                    check = true;
                                }
                            }
                            if (check == true) {
                                opt += '<option value="' + response[i].id + '"  selected>' + response[i].name + '</option>';
                            } else {
                                opt += '<option value="' + response[i].id + '">' + response[i].name + '</option>';

                            }
                            check = false;
                        }
                        sselect.html(opt);
                    }
                });
            }
        });
    }
    /** end of All Form */

}); //end of $(function(){});