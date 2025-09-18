v_coupon_payment_method = '';
$(function(){
var FormAdd = $('#FormAdd');

var calculate_no_of_days_coupon = function(){
    var last_coupon_date = $('#last_coupon_date').val();
    var settlement_date = $('#settlement_date').val();
    var coupon_days = $('#coupon_days');
    bValid=true;
    if(last_coupon_date.replace(/\-/g,'')=="") {
        bValid=false;
    }
    if(settlement_date.replace(/\-/g,'')=="") {
        bValid=false;
    }
    if(bValid) {
        $.ajax({
            type:"POST",dataType:"json",data:{
                last_coupon_date:last_coupon_date,
                settlement_date:settlement_date
            },
            url:site_url+'inhouse/calculate_no_of_days_coupon',
            success:function(response){
                coupon_days.val(response.coupon_days)
            }
        })
    } else {
        coupon_days.val(0);
    }
}
var calculate_purchased_amount = function(){
    var par_amount = parseFloat(Template.ConvertNumeric($('#par_amount').val()));
    var price = $('#price').val();
    var purchased_amount = $('#purchased_amount');
    bValid=true;
    if(par_amount=="") {
        bValid=false;
    }
    if(price=="") {
        bValid=false;
    }
    if(bValid) {
        p_amount = eval(par_amount*price/100);
        purchased_amount.val(Template.NumberFormat(p_amount,0,',','.'));
    } else {
        purchased_amount.val(0);
    }
}
var calculate_accrued_interest = function(){
    var coupon = $('#coupon').val();
    var coupon_days = parseFloat(Template.ConvertNumeric($('#coupon_days').val()));
    var par_amount = parseFloat(Template.ConvertNumeric($('#par_amount').val()));
    var accrued_interest = $('#accrued_interest');
    var issuer_flag = $("input[name=issuer_flag]:checked").val();
    var settlement_date = Template.ToDateDefault($('#settlement_date').val());
    bValid=true;
    if(coupon=="") {
        bValid=false;
    }
    if(coupon_days=="") {
        bValid=false;
    }
    if(par_amount=="") {
        bValid=false;
    }
    if(settlement_date=="") {
        bValid=false;
    }
    if(bValid) {
        if (issuer_flag=='G') {
            date = new Date(settlement_date);
            year = date.getFullYear();
            if (year % 4 == 0) {
                ytd = 366;
            } else {
                ytd = 365;
            }
        } else {
            ytd = 360;
        }
        res_accrued_interest = eval((coupon_days/ytd)*(coupon/100)*par_amount);
        accrued_interest.val(Template.NumberFormat(res_accrued_interest,0,',','.'));
    } else {
        accrued_interest.val(0);
    }
}
var calculate_settlement_amount = function(){
    var purchased_amount = parseFloat(Template.ConvertNumeric($('#purchased_amount').val()));
    var accrued_interest = parseFloat(Template.ConvertNumeric($('#accrued_interest').val()));
    var settlement_amount = $('#settlement_amount');
    bValid=true;
    if(purchased_amount=="0") {
        bValid=false;
    }
    if(accrued_interest=="0") {
        bValid=false;
    }
    if(bValid) {
        res_settlement_amount = eval(purchased_amount+accrued_interest);
        settlement_amount.val(Template.NumberFormat(res_settlement_amount,0,',','.'));
    }
}
var calculate_premium_discount = function(){
    var par_amount = parseFloat(Template.ConvertNumeric($('#par_amount').val()));
    var purchased_amount = parseFloat(Template.ConvertNumeric($('#purchased_amount').val()));
    var premium_discount = $('#premium_discount');
    bValid=true;
    if(par_amount=="0") {
        bValid=false;
    }
    if(purchased_amount=="0") {
        bValid=false;
    }
    if(bValid) {
        res_premium_discount = eval(par_amount-purchased_amount);
        premium_discount.val(Template.NumberFormat(res_premium_discount,0,',','.'));
    }
}

var calculate_ytm = function(){
    var coupon = $('#coupon').val();
    var purchased_price = $('#price').val();
    var maturity_date = $('#maturity_date').val();
    var settlement_date = $('#settlement_date').val();
    var ytm = $('#ytm');
    bValid=true;
    if (coupon=="") {
        bValid=false;
    }
    if (purchased_price=="") {
        bValid=false;
    }
    if(maturity_date.replace(/\-/g,'')=="") {
        bValid=false;
    }
    if(settlement_date.replace(/\-/g,'')=="") {
        bValid=false;
    }
    if(bValid) {
        $.ajax({
            type:"POST",dataType:"json",data:{
                coupon:coupon,
                purchased_price:purchased_price,
                maturity_date:maturity_date,
                settlement_date:settlement_date
            },
            url:site_url+'inhouse/calculate_ytm',
            success:function(response){
                ytm.val(response.ytm);
            }
        })
    } else {
        ytm.val(0);
    }
}

var calculate_amortised_period = function()
{
    var maturity_date = $('#maturity_date').val();
    var settlement_date = $('#settlement_date').val();
    var amortised_period = $('#amortised_period');
    bValid=true;
    if(maturity_date.replace(/\-/g,'')=="") {
        bValid=false;
    }
    if(settlement_date.replace(/\-/g,'')=="") {
        bValid=false;
    }
    if(bValid) {
        $.ajax({
            type:"POST",dataType:"json",data:{
                maturity_date:maturity_date,
                settlement_date:settlement_date
            },
            url:site_url+'inhouse/calculate_amortised_period',
            success:function(response){
                amortised_period.val(response.amortised_period);
            }
        })
    } else {
        amortised_period.val(0);
    }
}

$('#fund_group_code',FormAdd).change(function(){
    fund_code=$(this).val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            fund_code:fund_code
        },url:site_url+'inhouse/get_current_account_number_by_fund_code',
        success:function(response){
            option = '<option value="">Please Select</option>';
            for ( i in response ) {
                option += '<option value="'+response[i].account_number+'">'+response[i].account_number+' - '+response[i].bank_name+' - '+response[i].branch_name+'</option>';
            }
            $('#bank_account_number',add).html(option);     
        }
    });
});


$('#last_coupon_date,#settlement_date').blur(function(){
    calculate_no_of_days_coupon();
    calculate_accrued_interest();
})

$('#par_amount,#price').change(function(){
    calculate_purchased_amount();
    calculate_settlement_amount();
    calculate_premium_discount();
})

$('#bond_code,#coupon,#coupon_days,#par_amount').change(function(){
    calculate_accrued_interest();
    calculate_settlement_amount();
});

$('#coupon,#price,#maturity_date,#settlement_date').change(function(){
    calculate_ytm();
});

// $('#maturity_date,#settlement_date').change(function(){
//     calculate_amortised_period();
// });
$('#maturity_date,#settlement_date').blur(function(){
    calculate_amortised_period();
});

$('#price').change(function(){
    price = parseFloat($(this).val());
    var flag = '';
    if (price==100) {
        $('#p_d_flag3').attr('checked',true);
        $('#p_d_flag1').removeAttr('checked');
        $('#p_d_flag2').removeAttr('checked');
        flag = 'A';
    }
    if (price>100) {
        $('#p_d_flag1').attr('checked',true);
        $('#p_d_flag2').removeAttr('checked');
        $('#p_d_flag3').removeAttr('checked');
        flag = 'P';
    }
    if (price<100) {
        $('#p_d_flag2').attr('checked',true);
        $('#p_d_flag1').removeAttr('checked');
        $('#p_d_flag3').removeAttr('checked');
        flag = 'D';
    }
    $('#p_d_flag').val(flag);
});


$('#bond_code').change(function(){
    bond_code = $(this).val();
    if (bond_code!="") {
        $.ajax({
            type:"POST",dataType:"json",data:{bond_code:bond_code},
            url:site_url+'inhouse/get_bond_ajax',
            success: function(response) {
                $('#issuer',FormAdd).val(response.issuer);
                if (response.issuer_flag=='G') {
                    $('#issuer2',FormAdd).removeAttr('checked');
                    $('#issuer1',FormAdd).attr('checked',true);
                } else if (response.issuer_flag=='C') {
                    $('#issuer1',FormAdd).removeAttr('checked');
                    $('#issuer2',FormAdd).attr('checked',true);
                }
                coupon_payment_method = response.coupon_payment_method;
                v_coupon_payment_method = coupon_payment_method;
                switch(coupon_payment_method){
                    case "M":
                    coupon_payment_method = '<option value="M">Monthly</option>';
                    CF = 12;
                    break;
                    case "Q":
                    coupon_payment_method = '<option value="Q">Quarterly</option>';
                    CF = 4;
                    break;
                    case "S":
                    coupon_payment_method = '<option value="S">Semi Annually</option>';
                    CF = 2;
                    break;
                }
                $('#rating_issuer',FormAdd).val(response.rating_issuer);
                $('#maturity_date',FormAdd).val(Template.ToDatePicker(response.maturity_date));
                $('#coupon',FormAdd).val(response.coupon);
                $('#coupon_payment_method',FormAdd).html(coupon_payment_method);
                $('#sector_code',FormAdd).html('<option value="'+response.sector+'">'+response.sector_name+'</option>');
                $('#subsector_code',FormAdd).html('<option value="'+response.subsector+'">'+response.subsector_name+'</option>');
                akad_type = '-';
                if (response.akad_type=='M') {
                    akad_type = 'Mudharabah';
                } else if (response.akad_type=='I') {
                    akad_type = 'Ijaroh';
                }
                $('#akad_type',FormAdd).html('<option value="'+response.akad_type+'">'+akad_type+'</option>');
                $('#rating',FormAdd).html('<option>'+response.rating+'</option>');

                $('#display_CF',FormAdd).html(CF);
                $('#coupon_frequency',FormAdd).val(CF);

                $('#last_coupon_date').trigger('change');
            }
        })
    }
})

$('#last_coupon_date').blur(function(){
    if ($(this).val()!="") {
        $(this).trigger('change')
    }
})
$('#last_coupon_date').change(function(){
    date = $(this).val();

    if (date!="" && v_coupon_payment_method!="") {

        s = date.split('/');
        year = s[2];
        month = s[1];
        day = s[0];
        switch(v_coupon_payment_method){
            case "M":
                DOIP = 'Setiap tanggal '+day;
                $('#display_DOIP',FormAdd).html(DOIP);
            break;
            case "Q":
            $.ajax({
                type:"POST",dataType:"html",data:{
                    date:year+'-'+month+'-'+day
                },url:site_url+'inhouse/getQuarterlyDateList',
                success:function(response) {
                    DOIP = response;
                    $('#display_DOIP',FormAdd).html(DOIP);
                }
            })
            break;
            case "S":
            $.ajax({
                type:"POST",dataType:"html",data:{
                    date:year+'-'+month+'-'+day
                },url:site_url+'inhouse/getSemesterlyDateList',
                success:function(response) {
                    DOIP = response;
                    $('#display_DOIP',FormAdd).html(DOIP);
                }
            })
            break;
        }

    }
});

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_group_code: {required:true}
        ,sell_buy_flag: {required:true}
        ,p_d_flag: {required:true}
        ,bond_code: {required:true}
        ,rating_issuer: {required:true}
        // ,rating_issuer_flag: {required:true}
        ,maturity_date: {required:true}
        ,coupon: {required:true}
        ,last_coupon_date: {required:true}
        ,coupon_payment_method: {required:true}
        ,classification: {required:true}
        ,trade_date: {required:true}
        ,settlement_date: {required:true}
        ,par_amount: {required:true}
        ,price: {required:true}
        ,coupon_days: {required:true}
        ,purchased_amount: {required:true}
        ,accrued_interest: {required:true}
        ,settlement_amount: {required:true}
        ,broker_code: {required:true}
        ,premium_discount: {required:true}
        ,ytm: {required:true}
        ,amortised_period: {required:true}
        ,investment_rate: {required:true}
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
        var fund_group_code = $('#fund_group_code');
        var bond_code = $('#bond_code');
        var classification = $('#classification');
        var amortised_period = $('#amortised_period');
        var investment_rate = $('#investment_rate');
        var bank_custody = $('#bank_custody');
        var bValid=true;

        if (fund_group_code.val()=="") {
            bValid=false;
        }
        if (bond_code.val()=="") {
            bValid=false;
        }
        if (classification.val()=="") {
            bValid=false;
        }
        if (amortised_period.val()=="") {
            bValid=false;
        }
        if (investment_rate.val()=="") {
            bValid=false;
        }
        if (bank_custody.val()=="") {
            bValid=false;
        }


        if (bValid==false) {
            $('.alert-error',FormAdd).show();
            Template.scrollTo($('.alert-error',FormAdd), -200);
        } else {
            $('.alert-error',FormAdd).hide();
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
                                $('#rating',FormAdd).html('');
                                $('#sector_code',FormAdd).html('');
                                $('#subsector_code',FormAdd).html('');
                                $('#akad_type',FormAdd).html('');
                                $('#btn_cancel',FormAdd).trigger('click');
                                $("#bond_code").val('').trigger('chosen:updated');
                                $("#broker_code").val('').trigger('chosen:updated');
                                $("#bank_custody").val('').trigger('chosen:updated');
                                $("#fund_group_code").val('').trigger('chosen:updated');
                                $("#amortised_method").val('').trigger('chosen:updated');
                                $("#classification").val('').trigger('chosen:updated');
                                // $('input[name=rating_issuer_flag]').removeAttr('checked');
                                $('input[name=issuer_flag]').removeAttr('checked');
                                $('#coupon_payment_method').html('');
                                $('#display_CF').html('---');
                                $('#display_DOIP').html('---');
                                $('#par_amount').val(0);
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
    }
});

})