$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormComment = $('#FormComment');


    $("#keyword").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#jqGrid_data").trigger('reloadGrid');
        }
    });

    /*FORM ACTIONS*/

    $('#btn_cancel', FormAdd).click(function () {
        var caption = $('#btn_cancel', FormAdd).text();
        if (caption.trim() == 'Edit') {
            disabled_form('enabled');
        } else {
            disabled_form('disabled');

        }
    })

    var disabled_form = function (sstatus) {
        if (sstatus == 'disabled') {
            $('#ticket_subject', FormAdd).attr('disabled', 'true');
            $('#description', FormAdd).attr('disabled', 'true');
            $('#priority', FormAdd).attr('disabled', 'true');
            $('#attachment', FormAdd).attr('disabled', 'true');
            $('#btn_save', FormAdd).attr('disabled', 'true');
            $('#btn_cancel', FormAdd).html('<i class="fa fa-edit"></i> Edit');
        } else {
            $('#ticket_subject', FormAdd).removeAttr('disabled');
            $('#description', FormAdd).removeAttr('disabled');
            $('#priority', FormAdd).removeAttr('disabled');
            $('#attachment', FormAdd).removeAttr('disabled');
            $('#btn_save', FormAdd).removeAttr('disabled');
            $('#btn_cancel', FormAdd).html('<i class="fa fa-undo"></i> Cancel');
        }
    }

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
                                //$('#btn_cancel', FormAdd).trigger('click');
                                disabled_form('disabled');
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
            ticket_subject: { required: true },
            description: { required: true },
            priority: { required: true }

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
                success: function (response) {
                    if (response.success == true) {
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
                        if (user_type == '5') {
                            html += '<div class="direct-chat-msg right">';
                            html += '    <div class="direct-chat-infos clearfix">';
                            html += '        <span class="direct-chat-name float-right">' + $('#full_name', FormAdd).val() + '</span>';
                            html += '        <span class="direct-chat-timestamp float-left">' + comment_date + '</span>';
                            html += '    </div>';
                            html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                            html += '    <div class="direct-chat-text">';
                            html += comment;
                            html += '    </div>';
                            html += '</div>';
                        } else {
                            html += '<div class="direct-chat-msg ">';
                            html += '    <div class="direct-chat-infos clearfix">';
                            html += '        <span class="direct-chat-name float-left">' + $('#full_name', FormAdd).val() + '</span>';
                            html += '        <span class="direct-chat-timestamp float-right">' + comment_date + '</span>';
                            html += '    </div>';
                            html += '    <img class="direct-chat-img" src = "' + site_url + '/assets/global/img/avatar.png" alt = "Message User Image">';
                            html += '    <div class="direct-chat-text">';
                            html += comment;
                            html += '    </div>';
                            html += '</div>';

                        }
                        $(".tambahan", FormComment).append(html).children(':last');
                        FormComment.trigger('reset');

                        //  $('#doc_path_education_' + jumlah_education).parents(".tambahan_" + jumlah_education).remove();


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

    /*END EDIT*/



















}); //end of $(function(){});