$(function () {
    var form = $('#form_profile');
    form.validate({
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
            fullname: { required: true },
            old_password: { required: true },
            new_password: { required: true },
            retype_new_password: { required: true, equalTo: "#new_password" }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', form).show();
            Template.scrollTo($('.alert-error', form), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'You profile has been Changed !',
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                window.location.reload();
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


});