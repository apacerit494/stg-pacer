global_maxstock = 0;
global_maxamount = 0;
$(function(){

var FormAdd = $('#FormAdd');

$("#jqgrid_data").jqGrid({
    url: site_url+'inhouse/jqgrid_sell_mf_transaction',
    mtype: "GET",
    datatype: "json",
    colModel: [
         { label: 'Fund Group' , name: 'fund_group_name', key:true, width: 80, align:'center' }
        ,{ label: 'Fund Group Code' , name: 'fund_group_code', hidden:true }
        ,{ label: 'Mutual Fund' , name: 'mf_name', width: 250, key:true, align:'left' }
        ,{ label: 'FM Name' , name: 'fm_name', hidden:true }
        ,{ label: 'Classification' , name: 'classification', width: 100, align:'center' }
        // ,{ label: 'Broker' , name: 'broker', width: 200 }
        ,{ label: 'Initial Unit' , name: 'saldo_awal', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0.0000' } }
        ,{ label: 'Total Buy' , name: 'total_buy', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0.0000' } }
        ,{ label: 'Total Sell' , name: 'total_sell', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0.0000' } }
        ,{ label: 'Available Unit' , name: 'available_unit', width: 90, align:'right', formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0.0000' } }
        ,{ label: 'AVG NAV' , name: 'avg_nav', width: 80, align:'right', formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:4,defaultValue:'0.0000' } }
        ,{ label: 'Available Nominal' , name: 'available_nom', width: 120, align:'right', formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0.0000' } }
        ,{ label: 'MF CODE' , name: 'mf_code', hidden:true }
        ,{ label: 'Sell', width: 80, align:'right', align:'center', sortable:false, formatter: function(cellvalue,rowObj,rowArray) {
                
                var row_id=rowObj.rowId;
                var fund_group_name=rowArray[0];
                var fund_group_code=rowArray[1];
                var mf_name=rowArray[2];
                var fm_name=rowArray[3];
                var classification=rowArray[4];
                var available=rowArray[8];
                var avg_price=rowArray[9];
                var available_nom=rowArray[10];
                var mf_code=rowArray[11];
                var fm_code=rowArray[13];

                switch(classification) {
                    case "AFS":
                    case "TRD":

                    data  = ' data-available="'+available+'"';
                    data += ' data-available_nom="'+available_nom+'"';
                    data += ' data-fund_group_name="'+fund_group_name+'"';
                    data += ' data-fund_group_code="'+fund_group_code+'"';
                    data += ' data-mf_code="'+mf_code+'"';
                    data += ' data-mf_name="'+mf_name+'"';
                    data += ' data-fm_code="'+fm_code+'"';
                    data += ' data-fm_name="'+fm_name+'"';
                    data += ' data-classification="'+classification+'"';
                    data += ' data-avg_price="'+avg_price+'"';
                    var sell_button = '<a class="btn btn-success btn-sm2" '+data+' id="button_sell" style="color:white;margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Sell</a>';
                    var actions = '<div class="btn-group" role="group" style="margin:0px;">'+sell_button+'</div>';

                    break;
                    default:

                    data  = ' data-available="'+available+'"';
                    data += ' data-available_nom="'+available_nom+'"';
                    data += ' data-fund_group_name="'+fund_group_name+'"';
                    data += ' data-fund_group_code="'+fund_group_code+'"';
                    data += ' data-mf_code="'+mf_code+'"';
                    data += ' data-mf_name="'+mf_name+'"';
                    data += ' data-fm_code="'+fm_code+'"';
                    data += ' data-fm_name="'+fm_name+'"';
                    data += ' data-classification="'+classification+'"';
                    data += ' data-avg_price="'+avg_price+'"';
                    var sell_button = '<a href="javascript:void(0);" class="btn btn-error btn-sm2" '+data+' style="background:#CCC;color:white;margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Sell</a>';
                    var actions = '<div class="btn-group" role="group" style="margin:0px;">'+sell_button+'</div>';

                    break;
                }
                
                return actions;

            }
        }
        ,{ label: 'FM Code' , name: 'fm_code', hidden:true }
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
    var mf_code = $(this).data('mf_code');
    var mf_name = $(this).data('mf_name');
    var classification = $(this).data('classification');
    var fund_group_code = $(this).data('fund_group_code');
    var fm_code = $(this).data('fm_code');
    var fm_name = $(this).data('fm_name');
    var available = $(this).data('available');
    var available_nom = $(this).data('available_nom');
    var avg_price = $(this).data('avg_price');

    global_maxstock = available;
    global_maxamount = available_nom;

    $('#jqgrid').hide();
    $('#add').show();
    // $('#avg_price','#add').val(Template.NumberFormat(avg_price,4,'.',','));
    $('#maxstock','#add').html(Template.NumberFormat(global_maxstock,4,'.',','));
    $('#maxamount','#add').html(Template.NumberFormat(global_maxamount,0,'.',','));
    $('#sell_flag','#add').val('A').trigger('change');

    $('#fund_group_name','#add').val(fund_group_name)
    $('#classification','#add').val(classification)
    $('#classification_name','#add').val(classification)

    $('#fund_group_code','#add').val(fund_group_code)
    $('#mf_code','#add').val(mf_code)
    $('#mf_name','#add').val(mf_name)
    $('#fm_code','#add').val(fm_code)
    $('#fm_name','#add').val(fm_name)
})

$('#keyword').change(function(e){
    keyword = $(this).val();
    $('#jqgrid_data').setGridParam({postData:{keyword:keyword}}).trigger('reloadGrid',[{page:1}]);
})



/* BEGIN ADD */

// var calculate_settlement_amount = function(){
//     var price = Template.ConvertDecimal($('#price').val());
//     var quantity_sheet = Template.ConvertDecimal($('#quantity_sheet').val());
//     // var transaction_fee = $('#transaction_fee').val();
//     var settlement_amount = 0;
//     // settlement_amount = eval(price*quantity_sheet*(100/100-transaction_fee/100));
//     settlement_amount = eval(price*quantity_sheet);
//     $('#settlement_amount').val(Template.NumberFormat(settlement_amount,2,'.',','))
// }

// $('#transaction_fee').change(function(){
//     calculate_settlement_amount();
// });

$('#sell_flag','#add').change(function(){
    if ($(this).val()=='N') {
        $('#quantity_sheet').closest('.form-group').hide();
        $('#quantity_sheet').removeAttr('readonly');
        $('#amount').val(0);
        $('#amount').closest('.form-group').show();
    } else if($(this).val()=='A') {
        $('#quantity_sheet').closest('.form-group').show();
        $('#amount').closest('.form-group').hide();
        $('#quantity_sheet').attr('readonly',true);
        $('#quantity_sheet').val(0);
        $('#quantity_sheet').val(Template.NumberFormat(global_maxstock,0,'.',','));
    } else {
        $('#quantity_sheet').removeAttr('readonly');
        $('#quantity_sheet').closest('.form-group').show();
        $('#amount').closest('.form-group').hide();
        $('#quantity_sheet').val(0);
    }
})

/* Check MAX UNIT */
// $('#quantity_sheet').keyup(function(){
    // var quantity_sheet = Template.ConvertDecimal($(this).val());
    // var maxstock = global_maxstock;
    // if (parseFloat(quantity_sheet)>parseFloat(maxstock)) {
    //     $(this).val(Template.NumberFormat(maxstock,4,'.',','));
    // }
// });

// $('#price,#quantity_sheet').keyup(function(){
//     var price = Template.ConvertDecimal($('#price').val());
//     var quantity_sheet = Template.ConvertDecimal($('#quantity_sheet').val());
//     var amount = eval(price*quantity_sheet);
//     $('#amount').val(Template.NumberFormat(amount,2,'.',','));
//     // calculate_settlement_amount();
// })

// $('#quantity_sheet').keyup(function(){
//     var price = Template.ConvertDecimal($('#price').val());
//     var quantity_sheet = Template.ConvertDecimal($('#quantity_sheet').val());
//     var amount = eval(price*quantity_sheet);
//     $('#amount').val(Template.NumberFormat(amount,2,'.',','))
// })

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_group_code: {required:true}
        ,sell_buy_flag: {required:true}
        ,fm_name: {required:true}
        ,trade_date: {required:true}
        // ,settlement_date: {required:true}
        ,classification: {required:true}
        //,avg_price: {required:true}
        ,price: {required:true}
        ,quantity_sheet: {required:true}
        // ,quantity_lot: {required:true}
        // ,transaction_fee: {required:true}
        ,amount: {required:true}
        // ,settlement_amount: {required:true}
        //,broker_code: {required:true}
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
            
        quantity_sheet = parseFloat(Template.ConvertDecimal($('#quantity_sheet',FormAdd).val()));
        amount = parseFloat(Template.ConvertDecimal($('#amount',FormAdd).val()));
        if (quantity_sheet>global_maxstock) {
            Template.WarningAlert('Quantity Sheet Melebihi Maksimum');
            $('#quantity_sheet',FormAdd).val(Template.NumberFormat(global_maxstock,4,'.',',')).focus();
        } else if(amount>global_maxamount) {
            Template.WarningAlert('Amount Melebihi Maksimum');
            $('#amount',FormAdd).val(Template.NumberFormat(global_maxamount,4,'.',',')).focus();
        } else {
            Metronic.blockUI();
            FormAdd.ajaxSubmit({
                dataType: 'json', 
                success: function(response) {
                    Metronic.unblockUI();
                    if(response.success==true){
                        $.alert({
                            title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                            content:'Transaction Success.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('.alert-error',FormAdd).hide();
                                $('#btn_cancel',FormAdd).trigger('click');
                                $('#fm_name',FormAdd).trigger('chosen:updated');
                            }
                        })
                    }else{
                        Template.WarningAlert(response.error);
                    }
                },
                error: function(){
                    Metronic.unblockUI();
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    }
});



$('#btn_cancel','#add').click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.chosen'.FormAdd).val('').trigger('chosen:updated');
    $('#jqgrid_data').trigger('reloadGrid');
})

})