v_coupon_payment_method = '';
v_available=0;

$(function(){
var FormAdd = $('#FormAdd');

$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_transaction_bond2',
    mtype: "GET",
    datatype: "json",
    colModel: [
         { label: 'id' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
        ,{ label: 'Ref No' , name: 'ref_no', width: 50, key:true, align:'left' }
        ,{ label: 'Bond Code' , name: 'bond_code', width: 100, key:true, align:'left' }
        ,{ label: 'Bond Name' , name: 'bond_name', width: 350, key:true, align:'left' }
        ,{ label: 'Clasification' , name: 'classification', width: 100, align:'center' }
        ,{ label: 'Total Buy' , name: 'total_buy', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Total Sell' , name: 'total_sell', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Available' , name: 'available', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Price' , name: 'price', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ name: 'fund_code', hidden:true }
        ,{ name: 'bank_account_number', hidden:true }
        ,{ name: 'amortised_method', hidden:true }
        ,{ name: 'rating_issuer', hidden:true }
        ,{ label: 'Sell', width: 80, align:'right', align:'center', sortable:false, formatter: function(cellvalue,rowObj,rowArray) {
                
                var row_id=rowObj.rowId;
                var id=rowArray[0];
                var ref_no=rowArray[1];
                var bond_code=rowArray[2];
                var bond_name=rowArray[3];
                var classification=rowArray[4];
                var available=rowArray[7];
                var price=rowArray[8];
                var fund_code=rowArray[9];
                var bank_account_number=rowArray[10];
                var amortised_method=rowArray[11];
                var rating_issuer=rowArray[12];

                // switch(classification) {
                //     case "":
                //     break;
                //     default:

                    data  = ' data-available="'+available+'"';
                    data += ' data-id="'+id+'"';
                    data += ' data-bond_name="'+bond_name+'"';
                    data += ' data-bond_code="'+bond_code+'"';
                    data += ' data-price="'+price+'"';
                    data += ' data-fund_code="'+fund_code+'"';
                    data += ' data-ref_no="'+ref_no+'"';
                    data += ' data-classification="'+classification+'"';
                    data += ' data-bank_account_number="'+bank_account_number+'"';
                    data += ' data-amortised_method="'+amortised_method+'"';
                    data += ' data-rating_issuer="'+rating_issuer+'"';
                    var sell_button = '<a class="btn btn-success btn-sm2" '+data+' id="button_sell" style="color:white;margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Sell</a>';
                    var actions = '<div class="btn-group" role="group" style="margin:0px;">'+sell_button+'</div>';

                    // break;
                // }
                
                return actions;

            }
        }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    // 'cellEdit':true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "2",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$('a#button_sell').livequery('click',function(){

    $(this).parent().click();
    $('#jqgrid').hide();
    $('#add').show();

    // declare
    var fund_code = $(this).data('fund_code');
    var ref_no = $(this).data('ref_no');
    var bond_code = $(this).data('bond_code');
    var bond_name = $(this).data('bond_name');
    var classification = $(this).data('classification');
    var available = $(this).data('available');
    var bank_account_number = $(this).data('bank_account_number');
    var amortised_method = $(this).data('amortised_method');
    var rating_issuer = $(this).data('rating_issuer');
    var purchased_price = $(this).data('price');

    // get description of value
    switch(amortised_method) {
        case "SLM": amortised_method_text = 'Strait Line Methods'; break;
        case "EIM": amortised_method_text = 'Effective Interest Method'; break;
        default: amortised_method_text = ''; break;
    }

    // set global value
    v_available = available;

    // set value
    $('#fund_code','#add').val(fund_code);
    $('#ref_no','#add').val(ref_no);
    $('#bond_code','#add').val(bond_code).trigger('chosen:updated').trigger('change');
    $('#bond_name','#add').val(bond_name);
    $('#classification','#add').val(classification);
    $('#display-MPA','#add').html('Maks : '+Template.NumberFormat(available,0,',','.')+',-');
    $('#bank_account_number').val(bank_account_number);
    $('#amortised_method').val(amortised_method);
    $('#amortised_method_text').val(amortised_method_text);
    $('#rating_issuer').val(rating_issuer);
    $('#purchased_price').val(purchased_price);
    $.ajax({
        type:"POST",
        dataType:"json",
        data:{fund_code:fund_code,bond_code:bond_code,ref_no:ref_no},
        url:site_url+'inhouse/get_last_coupon_date_sell',
        success:function(response){
            $('#last_coupon_date').val(Template.ToDatePicker(response.last_coupon_date)).trigger('change');
        }
    });

})


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
// var calculate_premium_discount = function(){
//     var par_amount = parseFloat(Template.ConvertNumeric($('#par_amount').val()));
//     var purchased_amount = parseFloat(Template.ConvertNumeric($('#purchased_amount').val()));
//     var premium_discount = $('#premium_discount');
//     bValid=true;
//     if(par_amount=="0") {
//         bValid=false;
//     }
//     if(purchased_amount=="0") {
//         bValid=false;
//     }
//     if(bValid) {
//         res_premium_discount = eval(par_amount-purchased_amount);
//         premium_discount.val(Template.NumberFormat(res_premium_discount,0,',','.'));
//     }
// }

// var calculate_ytm = function(){
//     var coupon = $('#coupon').val();
//     var purchased_price = $('#price').val();
//     var maturity_date = $('#maturity_date').val();
//     var settlement_date = $('#settlement_date').val();
//     var ytm = $('#ytm');
//     bValid=true;
//     if (coupon=="") {
//         bValid=false;
//     }
//     if (purchased_price=="") {
//         bValid=false;
//     }
//     if(maturity_date.replace(/\-/g,'')=="") {
//         bValid=false;
//     }
//     if(settlement_date.replace(/\-/g,'')=="") {
//         bValid=false;
//     }
//     if(bValid) {
//         $.ajax({
//             type:"POST",dataType:"json",data:{
//                 coupon:coupon,
//                 purchased_price:purchased_price,
//                 maturity_date:maturity_date,
//                 settlement_date:settlement_date
//             },
//             url:site_url+'inhouse/calculate_ytm',
//             success:function(response){
//                 ytm.val(response.ytm);
//             }
//         })
//     } else {
//         ytm.val(0);
//     }
// }

// var calculate_amortised_period = function()
// {
//     var maturity_date = $('#maturity_date').val();
//     var settlement_date = $('#settlement_date').val();
//     var amortised_period = $('#amortised_period');
//     bValid=true;
//     if(maturity_date.replace(/\-/g,'')=="") {
//         bValid=false;
//     }
//     if(settlement_date.replace(/\-/g,'')=="") {
//         bValid=false;
//     }
//     if(bValid) {
//         $.ajax({
//             type:"POST",dataType:"json",data:{
//                 maturity_date:maturity_date,
//                 settlement_date:settlement_date
//             },
//             url:site_url+'inhouse/calculate_amortised_period',
//             success:function(response){
//                 amortised_period.val(response.amortised_period);
//             }
//         })
//     } else {
//         amortised_period.val(0);
//     }
// }

$('#last_coupon_date,#settlement_date').blur(function(){
    calculate_no_of_days_coupon();
    calculate_accrued_interest();
})

$('#par_amount,#price').change(function(){
    calculate_purchased_amount();
    calculate_settlement_amount();
    // calculate_premium_discount();
})
$('#par_amount').change(function(){
    available = v_available;
    par_amount = Template.ConvertNumeric($(this).val());
    if (parseFloat(par_amount)>parseFloat(available)) {
        $(this).val(Template.NumberFormat(available,0,',','.')).trigger('change');
        Template.WarningAlert("Par Amount Melebihi Maksimum!");

    }
});

$('#bond_code,#coupon,#coupon_days,#par_amount').change(function(){
    calculate_accrued_interest();
    calculate_settlement_amount();
});

// $('#coupon,#price,#maturity_date,#settlement_date').change(function(){
//     calculate_ytm();
// });

// $('#maturity_date,#settlement_date').change(function(){
//     calculate_amortised_period();
// });
// $('#maturity_date,#settlement_date').blur(function(){
//     calculate_amortised_period();
// });

$('#bond_code').change(function(){
    bond_code = $(this).val();
    if (bond_code!="") {
        $.ajax({
            type:"POST",dataType:"json",data:{bond_code:bond_code},
            url:site_url+'inhouse/get_bond_ajax',
            async:false,
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
                    CF = 3;
                    break;
                    case "S":
                    coupon_payment_method = '<option value="S">Semesterly</option>';
                    CF = 2;
                    break;
                }
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
})

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
        ,rating_issuer_flag: {required:true}
        ,maturity_date: {required:true}
        ,coupon: {required:true}
        ,last_coupon_date: {required:true}
        ,coupon_payment_method: {required:true}
        ,classification: {required:true}
        ,trade_date: {required:true}
        ,settlement_date: {required:true}
        ,nominal: {required:true}
        ,price: {required:true}
        ,coupon_days: {required:true}
        ,amount: {required:true}
        ,accrued_interest: {required:true}
        ,total_proceed: {required:true}
        ,broker_code: {required:true}
        // ,premium_discount: {required:true}
        // ,ytm: {required:true}
        // ,amortise_period: {required:true}
        // ,investment_rate: {required:true}
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
        var amortise_period = $('#amortise_period');
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
        if (amortise_period.val()=="") {
            bValid=false;
        }
        if (investment_rate.val()=="") {
            bValid=false;
        }
        if (bank_custody.val()=="") {
            bValid=false;
        }
        // alert(bValid);
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
                                $('input[name=rating_issuer_flag]').removeAttr('checked');
                                $('input[name=issuer_flag]').removeAttr('checked');
                                $('#coupon_payment_method').html('');
                                $('#display_CF').html('---');
                                $('#display_DOIP').html('---');
                                
                                $('#jqgrid').show();
                                $('#add').hide();
                                $("#jqgrid_data").trigger('reloadGrid');
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

$('#btn_cancel').click(function(){
    $('#add').hide();
    $('#jqgrid').show();
});

})