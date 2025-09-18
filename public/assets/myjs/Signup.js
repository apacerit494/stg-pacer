$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormSignup = $('#FormSignup');

    FormSignup.validate({
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
            email: { required: true, email: true },
            mobile_phone: { required: true, digits: true },
            user_password: { required: true },
            confirm_password: { required: true, equalTo: '#user_password' }
        },

        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormSignup).show();
            //Template.scrollTo($('.alert-error', FormSignup), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormSignup.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Edit User Success.',
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormSignup).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#btn_cancel', FormSignup).trigger('click');


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



}); //end of $(function(){});