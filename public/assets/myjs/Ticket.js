$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormComment = $('#FormComment');
    // var full_name = "";

    $("#jqgrid_data").jqGrid({
        url: site_url + '/Ticket/jqgrid_ticket',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'ticket_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'Tikcet Number', name: 'ticket_num', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] } },
            { label: 'User Name', name: 'full_name', width: 150, align: 'left' },
            { label: 'Subject', name: 'ticket_subject', width: 150, align: 'left' },
            { label: 'Date', name: 'ticket_date', width: 150, align: 'center' },
            { label: 'Description', name: 'description', width: 250, align: 'left', hidden: true },
            { label: 'Priority', name: 'priority', width: 150, align: 'center', hidden: true },
            { label: 'Priority', name: 'priority_desc', width: 150, align: 'center', hidden: true },
            { label: 'User ID', name: 'user_id', width: 150, align: 'left', hidden: true },
            { label: 'Status', name: 'status', width: 150, align: 'center', hidden: true },
            { label: 'Status', name: 'status_desc', width: 150, align: 'center' },
            { label: 'Attachment', name: 'attachment', width: 150, align: 'left', hidden: true },
            { label: 'Closed Date', name: 'ticket_closeddate', width: 150, align: 'center' },
            { label: 'Created At', name: 'created_at', width: 150, align: 'center', hidden: true },
            { label: 'Updated At', name: 'updated_at', width: 150, align: 'center', hidden: true }
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
        caption: " &nbsp&nbsp&nbsp Ticket",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    // $("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> ');
    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-info btn-sm2" id="btn_add"><i class="fa fa-plus"></i> New</a> \
    <a class="btn btn-success btn-sm2" id="btn_edit"><i class="fa fa-edit"></i> Reply</a> \
    </div> \
    ');

    //<a class="btn btn-danger btn-sm2" id="btn_delete"><i class="fa fa-trash"></i> Delete</a> \

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

    /** update jqgrid when insert data */
    var pusher = new Pusher('452f5671f2a3962c0370', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('comment');
    channel.bind('my-event', function (message) {
        //  alert(message);
        add_acomment(message);
    });

    var add_acomment = function (message) {
        html = "";
        var date = new Date();
        tahun = date.getFullYear();
        bulan = date.getMonth();
        tanggal = date.getDate();
        jam = date.getHours();
        menit = date.getMinutes();
        detik = date.getSeconds();
        comment_date = tahun + '-' + bulan + '-' + tanggal + ' ' + jam + ':' + menit + ':' + detik;
        comment = $('#comment', FormComment).val();
        if (user_type == '5' || user_type == '4' || user_type == '3') {
            html += '<div class="direct-chat-msg right">';
        } else {
            html += '<div class="direct-chat-msg ">';

        }
        html += '    <div class="direct-chat-infos clearfix">';
        html += '        <span class="direct-chat-name float-left">' + $('#full_name', FormEdit).val() + '</span>';
        html += '        <span class="direct-chat-timestamp float-right">' + comment_date + '</span>';
        html += '    </div>';
        html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
        html += '    <div class="direct-chat-text">';
        html += message;
        html += '    </div>';
        html += '</div>';
        $(".tambahan", FormComment).append(html).children(':last');
        FormComment.trigger('reset');
        $('#posisi').scrollTop($('#posisi')[0].scrollHeight);

    }



    /*SETUP BUTTON ACTIONS*/
    $("#btn_add").click(function () {
        $('#jqgrid').hide();
        $('#add').show();
        FormAdd.trigger('reset');
      // Misal ID yang dikirim ke fungsi PHP
    //const id = 'e2f4379cb89843daa6318cf2270efb3e'; // ganti dengan ID yang sesuai, bisa juga ambil dari elemen HTML

    // URL endpoint yang akan memanggil fungsi sendCertificate di controller
    //const url = `/CronJobController/sendCertificate/${id}`;

    // Buka PDF di tab baru
    //window.open(url, "_blank");
      
    //const id = '060e05777e5449bc8bc6d319f8555cda'; // ganti dengan ID sesuai kebutuhan
    //const url = `/CronJobController/sendCertificate/${id}`;

    // Jalankan fungsi di backend via AJAX
    //$.ajax({
      //  url: url,
       // type: 'GET',
        //dataType: 'json',
        //success: function (response) {
          //  if (response.status === 'success') {
            //    alert("Certificate berhasil dikirim ke: " + response.full_name);
            //} else {
              //console.log(response.message);  
              //alert("Gagal mengirim certificate: " + response.message);
              
            //}
        //},
        //error: function (xhr, status, error) {
          //  console.error("Error:", error);
            ///alert("Terjadi kesalahan saat memproses permintaan.");
        //}
    //});
    });

    $('#btn_delete').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            $.confirm({
                title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
                content: 'Delete Ticket ? Are You Sure?',
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
                        type: "POST", dataType: "json", data: { ticket_id: selrow },
                        url: site_url + '/Ticket/delete_ticket',
                        success: function (response) {
                            if (response.success === true) {
                                $.alert({
                                    title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                    content: 'Delete Ticket Success.',
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
                type: "POST", dataType: "json", data: { ticket_id: selrow },
                url: site_url + '/Ticket/get_data_ticket_by_id',
                success: function (response) {
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id', FormEdit).val(response.ticket_id);
                    $('#ticket_id', FormComment).val(response.ticket_id);
                    $('#ticket_num', FormEdit).val(response.ticket_num);
                    $('#ticket_subject', FormEdit).val(response.ticket_subject);
                    $('#ticket_date', FormEdit).val(response.ticket_date);
                    $('#description', FormEdit).val(response.description);
                    $('#priority', FormEdit).val(response.priority);
                    $('#user_id2', FormEdit).val(response.user_id).trigger('chosen:updated');
                    $('#status', FormEdit).val(response.status);
                    $('#ticket_closeddate', FormEdit).val(response.ticket_closeddate);
                    $('#btn_preview2', FormEdit).attr('href', response.attachment == '' || response.attachment == null ? 'javascript:' : response.attachment)

                    if (response.status == '3') {
                        $('#btn_save', FormEdit).attr('disabled', true);
                    } else {
                        $('#btn_save', FormEdit).removeAttr('disabled', 'disabled');

                    }
                    // full_name = response.full_name;
                    $.ajax({
                        type: "POST",
                        url: site_url + '/Ticket/get_data_comment_by_id',
                        data: { ticket_id: selrow },
                        dataType: "json",
                        success: function (response) {
                            $(".tambahan", FormComment).html("");
                            // $('#doc_path_education_' + jumlah_education).parents(".tambahan_" + jumlah_education).remove();


                            for (i in response) {
                                var html = "";

                                if (response[i].user_type_id == '5' || response[i].user_type_id == '4' || response[i].user_type_id == '3') {
                                    html += '<div class="direct-chat-msg right">';
                                    html += '    <div class="direct-chat-infos clearfix">';
                                    html += '        <span class="direct-chat-name float-right">' + response[i].full_name + '</span>';
                                    html += '        <span class="direct-chat-timestamp float-left">' + response[i].comment_date + '</span>';
                                    html += '    </div>';
                                    html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                                    html += '    <div class="direct-chat-text">';
                                    html += response[i].comment;
                                    html += '    </div>';
                                    html += '</div>';
                                } else {
                                    html += '<div class="direct-chat-msg ">';
                                    html += '    <div class="direct-chat-infos clearfix">';
                                    html += '        <span class="direct-chat-name float-left">' + response[i].full_name + '</span>';
                                    html += '        <span class="direct-chat-timestamp float-right">' + response[i].comment_date + '</span>';
                                    html += '    </div>';
                                    html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                                    html += '    <div class="direct-chat-text">';
                                    html += response[i].comment;
                                    html += '    </div>';
                                    html += '</div>';

                                }

                                $(".tambahan", FormComment).append(html).children(':last');
                                $('#posisi').scrollTop($('#posisi')[0].scrollHeight);
                            }
                        }
                    });
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
            ticket_subject: { required: true },
            description: { required: true },
            priority: { required: true }

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
                            content: 'Data Ticket berhasil ditambahkan',
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

                                if ($('#ticket_num', FormAdd).val() == "") {
                                    $('#ticket_num', FormAdd).val(response.ticket_number);
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

    $('#user_id2', FormEdit).change(function (e) {
        e.preventDefault();
        dataku = $(this).val();
        $('#jambul', FormEdit).val(dataku);

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
            ticket_subject: { required: true },
            description: { required: true },
            priority: { required: true }
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
                            content: 'Edit Ticket Success.',
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

    // let chatContainer = $('.direct-chat-messages', FormComment);

    // function scrollToBottom() {
    //     chatContainer.scrollTop = chatContainer.scrollHeight;
    // }

    FormComment.validate({
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
            comment: { required: true }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormComment).show();
            Template.scrollTo($('.alert-error', FormComment), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormComment.ajaxSubmit({
                dataType: 'json',
                async: false,
                success: function (response) {
                    if (response.success == true) {
                        // html = "";
                        // var date = new Date();
                        // tahun = date.getFullYear();
                        // bulan = date.getMonth();
                        // tanggal = date.getDate();
                        // jam = date.getHours();
                        // menit = date.getMinutes();
                        // detik = date.getSeconds();
                        // comment_date = tahun + '-' + bulan + '-' + tanggal + ' ' + jam + ':' + menit + ':' + detik;
                        // comment = $('#comment', FormComment).val();
                        // if (user_type == '5') {
                        //     html += '<div class="direct-chat-msg right">';
                        // } else {
                        //     html += '<div class="direct-chat-msg ">';

                        // }
                        // html += '    <div class="direct-chat-infos clearfix">';
                        // html += '        <span class="direct-chat-name float-left">' + $('#full_name', FormEdit).val() + '</span>';
                        // html += '        <span class="direct-chat-timestamp float-right">' + comment_date + '</span>';
                        // html += '    </div>';
                        // html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                        // html += '    <div class="direct-chat-text">';
                        // html += comment;
                        // html += '    </div>';
                        // html += '</div>';
                        // $(".tambahan", FormComment).append(html).children(':last');
                        // FormComment.trigger('reset');
                        // $('#posisi').scrollTop($('#posisi')[0].scrollHeight);

                    } else {
                        Template.WarningAlert(response.error);
                        //FormComment.trigger('reset');

                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    });

    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });
    /*END EDIT*/

    $('#attachment', FormAdd).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview', FormAdd);
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        // alert($('#btn_preview', personalku).attr('href'));
    });

    $('#attachment', FormEdit).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview2', FormEdit);
            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
        // alert($('#btn_preview', personalku).attr('href'));
    });


}); //end of $(function(){});