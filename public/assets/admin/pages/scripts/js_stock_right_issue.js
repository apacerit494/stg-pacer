$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_stock_right_issue',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Ticker', name: 'ticker', align: "center", width: 75 },
        { label: 'Emiten Name', name: 'emiten_name', align: "left", width: 175 },
        { label: 'Executed Date', name: 'executed_date', align: "center",width: 100 },
        { label: 'Quantity Right Issue', name: 'quantity_share_right_issue', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'lot Right Issue', name: 'lot_right_issue', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Price Right Issue', name: 'price_right_issue', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        
        { label: 'Sell Buy Flag', name: 'sell_buy_flag', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "S":
                return 'Sell';
                break;
                case "B":
                return 'Buy';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Price Sell', name: 'price_sell', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Relize Gain', name: 'relize_gain', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'AVG Price', name: 'avg_price', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        
        { label: 'Custody Code', name: 'custody_code', align: "center", width: 75 },
        { label: 'Bank Name', name: 'bank_name', align: "left", width: 175 },
        
        { label: 'Verified Date', name: 'verified_date', align: "center",width: 100 },
        { label: 'Verified_by', name: 'verified_by', align: "left", width: 175 },
       
        { label: 'Status', name: 'status', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return 'Unverified';
                break;
                case "1":
                return 'Verified';
                break;
                                default:
                return cellvalue;
                break;
            }
        } }
        
        
    ],
    viewrecords: true,
    width: 1098,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});



//form add
$('#fund_code',FormAdd).change(function(){
        var sell_buy_flag=$('#sell_buy_flag',FormAdd).val();
        if (sell_buy_flag=='B') { 

            var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)

                }
            })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue);
            $('#avg_price',FormAdd).val(Template.NumberFormat(avg_price2,0,',','.'));
        }
        
})

$('#ticker',FormAdd).change(function(){
     var sell_buy_flag=$('#sell_buy_flag',FormAdd).val();
         
        if (sell_buy_flag=='B') { 

            var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)

                }
            })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue);
            $('#avg_price',FormAdd).val(Template.NumberFormat(avg_price2,0,',','.'));
        }       
})



 
$('#sell_buy_flag',FormAdd).change(function(){
        price_sell=$('#price_sell',FormAdd).closest('.form-group');
        avg_price=$('#avg_price',FormAdd).closest('.form-group');
        sell_buy_flag=$('#sell_buy_flag',FormAdd).val();
        relize_gain=$('#relize_gain',FormAdd).closest('.form-group');
        if (sell_buy_flag=='S') { 
            avg_price.hide();
            avg_price.val(0);
            price_sell.show();
            price_sell.val(0);
            relize_gain.show();
            
         } else { 
            price_sell.hide();
            price_sell.val(0);
            relize_gain.hide();
            price_sell.val(0);
            avg_price.show();
            avg_price.val(0);
            

            var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)

                }
            })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue);
            $('#avg_price',FormAdd).val(Template.NumberFormat(avg_price2,0,',','.'));
        
        }
});

$('#quantity_share_right_issue',FormAdd).keyup(function(){
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormAdd).val());
    var price_sell = Template.ConvertNumeric($('#price_sell',FormAdd).val());
    var price_right_issue = Template.ConvertNumeric($('#price_right_issue',FormAdd).val());
    var lot_right_issue = eval(quantity_share_right_issue/100);
    var relize_gain=eval(quantity_share_right_issue*(price_sell-price_right_issue));
    $('#lot_right_issue',FormAdd).val(Template.NumberFormat(lot_right_issue,0,',','.'));
    $('#relize_gain',FormAdd).val(Template.NumberFormat(relize_gain,0,',','.'));

    var sell_buy_flag=$('#sell_buy_flag',FormAdd).val();
    if (sell_buy_flag=='B') { 
            var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                avg_price1.val(response.avg_price)

                }
            })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue)
            $('#avg_price',FormAdd).val(Template.NumberFormat(avg_price2,0,',','.'));
        
        }

})

$('#price_right_issue',FormAdd).keyup(function(){
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormAdd).val());
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormAdd).val());
    
    var price_sell = Template.ConvertNumeric($('#price_sell',FormAdd).val());
    var price_right_issue = Template.ConvertNumeric($('#price_right_issue',FormAdd).val());
    
    var relize_gain=eval(quantity_share_right_issue*(price_sell-price_right_issue));
    
    $('#relize_gain',FormAdd).val(Template.NumberFormat(relize_gain,0,',','.'))
    var sell_buy_flag=$('#sell_buy_flag',FormAdd).val();
    if (sell_buy_flag=='B') { 
            var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                avg_price1.val(response.avg_price)

                }
            })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue)
            $('#avg_price',FormAdd).val(Template.NumberFormat(avg_price2,0,',','.'));
            
        }



})

$('#price_sell',FormAdd).keyup(function(){
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormAdd).val());
    var price_sell = Template.ConvertNumeric($('#price_sell',FormAdd).val());
    var price_right_issue = Template.ConvertNumeric($('#price_right_issue',FormAdd).val());
    var relize_gain=eval(quantity_share_right_issue*(price_sell-price_right_issue));
    $('#relize_gain',FormAdd).val(Template.NumberFormat(relize_gain,0,',','.'));

    var sell_buy_flag=$('#sell_buy_flag',FormAdd).val();
    if (sell_buy_flag=='B') { 
            var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                avg_price1.val(response.avg_price)

                }
            })
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue)
            $('#avg_price',FormAdd).val(Template.NumberFormat(avg_price2,0,',','.'));
        
        }
   
})

//form edit

$('#fund_code',FormEdit).change(function(){
        var sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
         
        if (sell_buy_flag=='B') { 

            var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)

                }
            })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
            
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue);
            $('#avg_price',FormEdit).val(Template.NumberFormat(avg_price2,0,',','.'));
        }
        
})

$('#ticker',FormEdit).change(function(){
     var sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
         
        if (sell_buy_flag=='B') { 

            var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)

                }
            })
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue);
            $('#avg_price',FormEdit).val(Template.NumberFormat(avg_price2,0,',','.'));
        }       
})



 
$('#sell_buy_flag',FormEdit).change(function(){
        price_sell=$('#price_sell',FormEdit).closest('.form-group');
        avg_price=$('#avg_price',FormEdit).closest('.form-group');
        sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
         
        relize_gain=$('#relize_gain',FormEdit).closest('.form-group');
        if (sell_buy_flag=='S') { 
            avg_price.hide();
            avg_price.val(0);
            price_sell.show();
            price_sell.val(0);
            relize_gain.show();
            
         } else { 
            price_sell.hide();
            price_sell.val(0);
            relize_gain.hide();
            price_sell.val(0);
            avg_price.show();
            avg_price.val(0);
            

            var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)

                }
            })
            
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue);
            $('#avg_price',FormEdit).val(Template.NumberFormat(avg_price2,0,',','.'));
            
        }
});

$('#quantity_share_right_issue',FormEdit).keyup(function(){
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormEdit).val());
    var price_sell = Template.ConvertNumeric($('#price_sell',FormEdit).val());
    var price_right_issue = Template.ConvertNumeric($('#price_right_issue',FormEdit).val());
    var lot_right_issue = eval(quantity_share_right_issue/100);
    var relize_gain=eval(quantity_share_right_issue*(price_sell-price_right_issue));
    $('#lot_right_issue',FormEdit).val(Template.NumberFormat(lot_right_issue,0,',','.'));
    $('#relize_gain',FormEdit).val(Template.NumberFormat(relize_gain,0,',','.'));

    var sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
    if (sell_buy_flag=='B') { 
            var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                avg_price1.val(response.avg_price)

                }
             })
        
            $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:fund_code,
                    ticker:ticker,
                    classi:classi
                },
                url:site_url+'inhouse/get_fn_quantity_share',
                success:function(response){
                    quantity_share1.val(response.quantity_share)

                }
            })
        
            avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue)
            $('#avg_price',FormEdit).val(Template.NumberFormat(avg_price2,0,',','.'));
        
        }

})

$('#price_right_issue',FormEdit).keyup(function(){
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormEdit).val());
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormEdit).val());
    
    var price_sell = Template.ConvertNumeric($('#price_sell',FormEdit).val());
    var price_right_issue = Template.ConvertNumeric($('#price_right_issue',FormEdit).val());
    
    var relize_gain=eval(quantity_share_right_issue*(price_sell-price_right_issue));
    
    $('#relize_gain',FormEdit).val(Template.NumberFormat(relize_gain,0,',','.'));
    var sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
    if (sell_buy_flag=='B') { 
            var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                avg_price1.val(response.avg_price)

            }
        })
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                quantity_share1.val(response.quantity_share)

            }
        })
        
        avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue)
        $('#avg_price',FormEdit).val(Template.NumberFormat(avg_price2,0,',','.'));
        
        }



})

$('#price_sell',FormEdit).keyup(function(){
    var quantity_share_right_issue = Template.ConvertNumeric($('#quantity_share_right_issue',FormEdit).val());
    var price_sell = Template.ConvertNumeric($('#price_sell',FormEdit).val());
    var price_right_issue = Template.ConvertNumeric($('#price_right_issue',FormEdit).val());
    var relize_gain=eval(quantity_share_right_issue*(price_sell-price_right_issue));
    $('#relize_gain',FormEdit).val(Template.NumberFormat(relize_gain,0,',','.'));

    var sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
    if (sell_buy_flag=='B') { 
            var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
            var avg_price1=0;
            var avg_price2=0;
            
            var quantity_share1=0;
  
            
            $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                avg_price1.val(response.avg_price)

            }
        })
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                quantity_share1.val(response.quantity_share)

            }
        })
        
        avg_price2=((avg_price1*quantity_share1)+(quantity_share_right_issue*price_right_issue))/(quantity_share1+quantity_share_right_issue)
        $('#avg_price',FormEdit).val(Template.NumberFormat(avg_price2,0,',','.'));
        
        }



    
})



$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
/*
| END GRID
*/

/*
| BEGIN ADD
*/
$('#btn_add').click(function(){
    $('#jqgrid').hide();
    $('#add').show();
    FormAdd.trigger('reset');
})

$('#btn_cancel',FormAdd).click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.alert-error',FormAdd).hide();
    FormAdd.trigger('reset');
    $('.error',FormAdd).removeClass('error');
})

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_code:{required:true},
        ticker:{required:true},
        executed_date:{required:true},
        quantity_share_right_issue:{required:true},
        price_right_issue:{required:true},
        sell_buy_flag:{required:true},
        custody_code:{required:true}
          
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
                        content:'Add Stock Right Issue Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_data').trigger('reloadGrid');
                            $('#btn_cancel',FormAdd).trigger('click');
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
/*
| END ADD
*/

/*
| BEGIN EDIT
*/

$('#btn_edit').click(function(e){ 
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        //
         var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.status;
            if (status=='Unverified') {
                
            //
                        $.ajax({
                        type:"POST",dataType:"json",data:{id:selrow},
                        url:site_url+'/inhouse/get_stock_right_issue',
                        success:function(response){
                            $('#jqgrid').hide();
                                    $('#edit').show();
                                    $('#id',FormEdit).val(response.id);
                                    $('#ticker',FormEdit).val(response.ticker);
                                    $('#executed_date1',FormEdit).val(Template.ToDatePicker(response.executed_date));
                                    $('#quantity_share_right_issue',FormEdit).val(Math.round(response.quantity_share_right_issue));
                                    $('#lot_right_issue',FormEdit).val(Math.round(response.lot_right_issue));
                                    $('#price_right_issue',FormEdit).val(Math.round(response.price_right_issue));
                                    $('#sell_buy_flag',FormEdit).val(response.sell_buy_flag);
                                    $('#custody_code',FormEdit).val(response.custody_code);
                                    
                                    price_sell=$('#price_sell',FormEdit).closest('.form-group');
                                    avg_price=$('#avg_price',FormEdit).closest('.form-group');
                                    sell_buy_flag=$('#sell_buy_flag',FormEdit).val();
                                    relize_gain=$('#relize_gain',FormEdit).closest('.form-group');
                                    if (sell_buy_flag=='S') { 
                                        avg_price.hide();
                                        avg_price.val(0);
                                        price_sell.show();
                                        price_sell.val(0);
                                        relize_gain.show();
                                        $('#price_sell',FormEdit).val(Math.round(response.price_sell));
                                        $('#relize_gain',FormEdit).val(Math.round(response.relize_gain));
                                        
                                     } else { 
                                        price_sell.hide();
                                        price_sell.val(0);
                                        relize_gain.hide();
                                        price_sell.val(0);
                                        avg_price.show();
                                        avg_price.val(0);
                                        $('#avg_price',FormEdit).val(Math.round(response.avg_price));
                                    }
                                    },
                        error: function(){
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        }
                    })
    } else {
        //
        Template.WarningAlert('Tidak bisa Mengubah data, Status sudah diverifikasi');
    }
}
else 
    {
        Template.WarningAlert("Please select a row");
    }
})





$('#btn_cancel',FormEdit).click(function(){
    $('#edit').hide();
    $('#jqgrid').show();
    $('.alert-error',FormEdit).hide();
    FormEdit.trigger('reset');
    $('.error',FormEdit).removeClass('error');
})

FormEdit.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_code:{required:true},
        ticker:{required:true},
        executed_date:{required:true},
        quantity_share_right_issue:{required:true},
        price_right_issue:{required:true},
        sell_buy_flag:{required:true},
        custody_code:{required:true}
          
        
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormEdit).show();
        Template.scrollTo($('.alert-error',FormEdit), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormEdit.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Edit Stock Right Issue Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data').trigger('reloadGrid');
                            $('#btn_cancel',FormEdit).trigger('click');
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

/*
| DELET
E
*/
$('#btn_delete').click(function(){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.status;
            if (status=='Unverified') {
            
                $.confirm({
                    title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
                    content:'Delete Stock Right Issue? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:selrow},
                            url:site_url+'/inhouse/delete_stock_right_issue',
                            success:function(response) {
                                if (response.success===true) {
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Delete Stock Right Issue Success.',
                                        confirmButtonClass:'btn green',
                                        confirm:function(){
                                            $('#userfile').val('');
                                            $('#jqgrid_data').trigger('reloadGrid');
                                        }
                                    })
                                } else {
                                    Template.WarningAlert(response.error);
                                }
                            },
                            error: function(){
                                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                            }
                        })
                    }
                })
    } 
    //
     else {
        //
        Template.WarningAlert('Tidak bisa Menghapus data, Status sudah diverifikasi');
    }
}
    //

    else {
        Template.WarningAlert("Please select a row.");
    }
})

 



// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    window.open(site_url+'excel/export_report_stock_right_issue')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_stock_right_issue')
});

})