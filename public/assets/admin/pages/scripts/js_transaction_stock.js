v_broker_fee = 0;
$(function(){
var FormAdd = $('#FormAdd');

var calculate_settlement_amount = function(){
    var broker_fee = $('#transaction_fee2').val();
    var price = $('#price').val().replace(/\,/g,'');
    var quantity_sheet = $('#quantity_sheet').val();
    if (v_broker_fee==0) {
        var transaction_fee = $('#transaction_fee').val();
    } else {
        var transaction_fee = v_broker_fee;
    }
    var settlement_amount = eval(price*quantity_sheet*(100/100+transaction_fee/100));
    $('#settlement_amount').val(Template.NumberFormat(settlement_amount,0,',','.'))
}

$('#transaction_fee').change(function(){
    calculate_settlement_amount();
});

/* hitung LOT */
$('#quantity_sheet').keyup(function(){
    var quantity_sheet = $(this).val();
    var quantity_lot = eval(quantity_sheet/100);
    $('#quantity_lot').val(quantity_lot);
});

$('#price,#quantity_sheet').keyup(function(){
    var price = $('#price').val().replace(/\,/g,'');
    var quantity_sheet = $('#quantity_sheet').val();
    var amount = eval(price*quantity_sheet);
    $('#amount').val(Template.NumberFormat(amount,0,',','.'));
    calculate_settlement_amount();
})

$('#settlement_amount,#quantity_sheet').keyup(function(){
    var price = $('#price').val().replace(/\,/g,'');
    var quantity_sheet = $('#quantity_sheet').val();
    var amount = eval(price*quantity_sheet);
    $('#amount').val(Template.NumberFormat(amount,0,',','.'))
})

$('#broker_code').change(function(){
    fee = $(this).find('option:selected').data('fee')
    if (fee==null) {
        fee=0;
    } else if (fee=="") {
        fee=0;
    }
    v_broker_fee = fee;
    $('#transaction_fee2').val(fee);
    if (fee>0) {
        $('#transaction_fee').val('');
        $('#transaction_fee').closest('.form-group').hide();
    } else {
        $('#transaction_fee').val('');
        $('#transaction_fee').closest('.form-group').show();
    }
    calculate_settlement_amount();
})

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_group_code: {required:true}
        ,ticker: {required:true}
        ,trade_date: {required:true}
        ,settlement_date: {required:true}
        ,classification: {required:true}
        ,price: {required:true}
        ,quantity_sheet: {required:true}
        ,quantity_lot: {required:true}
        ,transaction_fee: {required:true}
        ,amount: {required:true}
        ,settlement_amount: {required:true}
        ,broker_code: {required:true}
        ,bank_custody: {required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormAdd).show();
        Template.scrollTo($('.alert-error',FormAdd), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormAdd.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Transaction Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#btn_cancel',FormAdd).trigger('click');
                            $('.chosen',FormAdd).trigger('chosen:updated');
                        }
                    })
                }else{
                    Template.WarningAlert(response.error);
                }
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        });
    }
});

})