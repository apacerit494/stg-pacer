global_maxstock = 0;
v_broker_fee = 0;
$(function(){

var FormAdd = $('#FormAdd');

$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_sell_stock_transaction',
    mtype: "GET",
    datatype: "json",
    colModel: [
         { label: 'Fund group' , name: 'fund_group_name', key:true, width: 80, align:'center' }
        ,{ label: 'Fund group Code' , name: 'fund_group_code', hidden:true }
        ,{ label: 'Emiten' , name: 'emiten', width: 250, key:true, align:'left' }
        ,{ label: 'Ticker' , name: 'ticker', hidden:true }
        ,{ label: 'Clasification' , name: 'classification', width: 100, align:'left' }
        // ,{ label: 'Broker' , name: 'broker', width: 200 }
        ,{ label: 'Saldo Awal' , name: 'saldo_awal', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Total Buy' , name: 'total_buy', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Total Sell' , name: 'total_sell', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Available' , name: 'available', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'AVG Price' , name: 'avg_price', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ label: 'Sell', width: 80, align:'right', align:'center', sortable:false, formatter: function(cellvalue,rowObj,rowArray) {
                
                var row_id=rowObj.rowId;
                var available=rowArray[8];
                var fund_group_name=rowArray[0];
                var fund_group_code=rowArray[1];
                var emiten=rowArray[2];
                var ticker=rowArray[3];
                var classification=rowArray[4];
                var avg_price=rowArray[9];

                switch(classification) {
                    case "AFS":
                    case "TRD":

                    data  = ' data-available="'+available+'"';
                    data += ' data-fund_group_name="'+fund_group_name+'"';
                    data += ' data-fund_group_code="'+fund_group_code+'"';
                    data += ' data-emiten="'+emiten+'"';
                    data += ' data-ticker="'+ticker+'"';
                    data += ' data-classification="'+classification+'"';
                    data += ' data-avg_price="'+avg_price+'"';
                    var sell_button = '<a class="btn btn-success btn-sm2" '+data+' id="button_sell" style="color:white;margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Sell</a>';
                    var actions = '<div class="btn-group" role="group" style="margin:0px;">'+sell_button+'</div>';

                    break;
                    default:

                    data  = ' data-available="'+available+'"';
                    data += ' data-fund_group_name="'+fund_group_name+'"';
                    data += ' data-fund_group_code="'+fund_group_code+'"';
                    data += ' data-emiten="'+emiten+'"';
                    data += ' data-ticker="'+ticker+'"';
                    data += ' data-classification="'+classification+'"';
                    data += ' data-avg_price="'+avg_price+'"';
                    var sell_button = '<a href="javascript:void(0);" class="btn btn-error btn-sm2" '+data+' style="background:#CCC;color:white;margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Sell</a>';
                    var actions = '<div class="btn-group" role="group" style="margin:0px;">'+sell_button+'</div>';

                    break;
                }
                
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
    sortname: "fund_group_name",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$('a#button_sell').livequery('click',function(){
    $(this).parent().click();

    var quantity_sheet = $('#quantity_sheet','#add');
    
    var fund_group_name = $(this).data('fund_group_name');
    var emiten = $(this).data('emiten');
    var classification = $(this).data('classification');
    var fund_group_code = $(this).data('fund_group_code');
    var ticker = $(this).data('ticker');
    var available = $(this).data('available');
    var avg_price = $(this).data('avg_price');
    
    global_maxstock = available;

    $('#jqgrid').hide();
    $('#add').show();
    $('#avg_price','#add').val(Template.NumberFormat(avg_price,2,',','.'));
    $('#maxstock','#add').html(Template.NumberFormat(global_maxstock,0,',','.'));

    $('#fund_group_name','#add').val(fund_group_name)
    $('#classification','#add').val(classification)
    $('#classification_name','#add').val(classification)

    $('#fund_group_code','#add').val(fund_group_code)
    $('#emiten_name','#add').val(emiten)
    $('#ticker','#add').val(ticker)
})

$('#keyword').change(function(e){
    keyword = $(this).val();
    $('#jqgrid_data').setGridParam({postData:{keyword:keyword}}).trigger('reloadGrid',[{page:1}]);
})



/* BEGIN ADD */

var calculate_settlement_amount = function(){
    var price = $('#price').val().replace(/\,/g,'');
    var quantity_sheet = Template.ConvertNumeric($('#quantity_sheet').val());
    if (v_broker_fee==0) {
        var transaction_fee = $('#transaction_fee').val();
    } else {
        var transaction_fee = v_broker_fee;
    }
    var settlement_amount = 0;
    settlement_amount = eval(price*quantity_sheet*(1-transaction_fee/100));
    $('#settlement_amount').val(Template.NumberFormat(settlement_amount,0,',','.'))
}

$('#transaction_fee').change(function(){
    calculate_settlement_amount();
});

/* hitung LOT */
$('#quantity_sheet').keyup(function(){
    var quantity_sheet = Template.ConvertNumeric($(this).val());
    var maxstock = global_maxstock;
    if (quantity_sheet>maxstock) {
        $(this).val(maxstock);
        quantity_sheet = maxstock;
    }
    var quantity_lot = eval(quantity_sheet/100);
    $('#quantity_lot').val(quantity_lot);
});

$('#price,#quantity_sheet').keyup(function(){
    var price = $('#price').val().replace(/\,/g,'');
    var quantity_sheet = Template.ConvertNumeric($('#quantity_sheet').val());
    var amount = eval(price*quantity_sheet);
    $('#amount').val(Template.NumberFormat(amount,0,',','.'));
    calculate_settlement_amount();
})

$('#settlement_amount,#quantity_sheet').keyup(function(){
    var price = $('#price').val().replace(/\,/g,'');
    var quantity_sheet = Template.ConvertNumeric($('#quantity_sheet').val());
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
        ,sell_buy_flag: {required:true}
        ,ticker: {required:true}
        ,trade_date: {required:true}
        ,settlement_date: {required:true}
        ,classification: {required:true}
        ,avg_price: {required:true}
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
            
        quantity_sheet = parseFloat(Template.ConvertNumeric($('#quantity_sheet',FormAdd).val()));
        if (quantity_sheet>global_maxstock) {
            Template.WarningAlert('Quantity Sheet Melebihi Maksimum');
            $('#quantity_sheet',FormAdd).val(Template.NumberFormat(global_maxstock)).focus();
        } else {
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
                                $('#ticker',FormAdd).trigger('chosen:updated');
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



$('#btn_cancel','#add').click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.chosen').val('').trigger('chosen:updated');
})

})