// wrapper
var add = $('#add');
var edit = $('#edit');
var jqgrid = $('#jqgrid');
// form button
var add_submit = $('#btn_save',add);
var add_cancel =  $('#btn_cancel',add);
var edit_submit = $('#btn_save',edit);
var edit_cancel =  $('#btn_cancel',edit);
// form
var FormAdd = $('#FormAdd');
var FormEdit = $('#FormEdit');



$(function(){

    $("#jqgrid_data").jqGrid({
        url: site_url+'/inhouse/jqgrid_verification_stock_right_issue',
        mtype: "GET",
        datatype: "json",
        colModel: [
        { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' },
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
       
         { label: 'Status' , name: 'status', width: 150, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case"0":
                    return "<label class='label label-sm label-danger'>Unverified</label>";
                    break;
                    case"1":
                    return "<label class='label label-sm label-info'>Verified</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ name: 'v_status', hidden:true }
            ,{ label: 'Action', align:'center', width:80, formatter:function(cellvalue,rowObj,rowArray) {
                var row_id=rowObj.rowId;
                var status=rowArray[15];
                var no_surat=rowArray[18];
                var tgl_surat=rowArray[19];

                var url = site_url+'pdf/export_report_verification_stock_right_issue_buy/'+row_id;

                switch(status){
                    case "1":
                    process_button = '<a href="'+url+'" \
                                            id="btn_print" \
                                            target="_blank" \
                                            class="btn btn-success btn-sm2" \
                                            style="margin:5px 0;" \
                                            data-id="'+row_id+'" \
                                            data-no_surat="'+no_surat+'" \
                                            data-tgl_surat="'+tgl_surat+'" \
                                        ><i class="fa fa-print"></i> Print</a>';
                    break;
                    default:
                    process_button = '-';
                    
                    break;
                }
                var actions = process_button;
                return actions;
            }}
            ,{ name: 'no_surat', hidden:true }
            ,{ name: 'tgl_surat', hidden:true }
        ],
        viewrecords: true,
        autowidth: true,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        // 'cellEdit':true,
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


    // print surat placement
    $('a#btn_print').livequery('click',function(e){
        e.preventDefault();

        // get data from element
        var url = $(this).attr('href');
        var id = $(this).data('id');
        var no_surat = $(this).data('no_surat');
        var tgl_surat = $(this).data('tgl_surat');

        // set data to dialog
        $('#id','#modal_print').val(id);
        $('#url','#modal_print').val(url);
        $('#no_surat','#modal_print').val(no_surat);
        if (tgl_surat=="" || tgl_surat==null) {
            $('#tgl_surat','#modal_print').val('');
        } else {
            $('#tgl_surat','#modal_print').val(Template.ToDatePicker(tgl_surat));
        }

        $('#modal_print').modal('show');

    })
    $('#print_do').click(function(){
        var id = $('#id','#modal_print').val();
        var no_surat = $('#no_surat','#modal_print').val();
        var tgl_surat = $('#tgl_surat','#modal_print').val();
        var url = $('#url','#modal_print').val();
        var bValid=true;

        if (no_surat=="") {
            bValid=false;
            $('#no_surat','#modal_print').addClass('error')
        } else {
            $('#no_surat','#modal_print').removeClass('error')
        }
        if (tgl_surat=="") {
            bValid=false;
            $('#tgl_surat','#modal_print').addClass('error')
        } else {
            $('#tgl_surat','#modal_print').removeClass('error')
        }
        if (bValid==true) {
            $.ajax({
                type:"POST",dataType:"json",data:{
                    id:id
                    ,no_surat:no_surat
                    ,tgl_surat:tgl_surat
                },url:site_url+'inhouse/update_deposit_account_print_placement',
                success:function(response){
                    if (response.success===true) {
                        $("#jqgrid_data").trigger('reloadGrid');
                        $('#modal_print').modal('hide');
                        window.open(url,'_blank');
                    } else {
                        Template.WarningAlert('Failed to connect into databases. please check your connection!')
                    }
                },
                error: function(){
                    Template.WarningAlert('Failed to connect into databases. please check your connection!')
                }
            })
        } else {
           Template.WarningAlert('You have some form error. please fix it!');
        }
    })

    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-info btn-sm2" id="btn_add"><i class="fa fa-add"></i> Add</a> \
    <a class="btn btn-success btn-sm2" id="btn_edit"><i class="fa fa-edit"></i> Edit</a> \
    <a class="btn btn-danger btn-sm2" id="btn_delete"><i class="fa fa-remove"></i> Hapus</a> \
    <a class="btn btn-verify btn-sm2" id="btn_verify"><i class="fa fa-verify"></i> Verifikasi</a> \
    </div> \
    ');

    // grid button
    var grid_add = $('#btn_add',jqgrid);
    var grid_edit = $('#btn_edit',jqgrid);
    var grid_delete = $('#btn_delete',jqgrid);
    var grid_verify = $('#btn_verify',jqgrid);

    // begin event button click
    add_cancel.click(function(){
        add.hide();
        jqgrid.show();
        edit.hide();
    })
    edit_cancel.click(function(){
        edit.hide();
        jqgrid.show();
        add.hide();
    })
    grid_add.click(function(){
        add.show();
        jqgrid.hide();
        edit.hide();
    })
    grid_verify.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='0') {
                $.confirm({
                    title:"Verify",icon:'fa fa-check',backgroundDismiss:false,
                    content:'Verify Status? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/verify_stock_right_issue',
                            success:function(response){
                                if(response.success==true){
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Verify Success.',
                                        confirmButtonClass:'btn-success',
                                        confirm:function(){
                                            $('#jqgrid_data').trigger('reloadGrid')
                                        }
                                    })
                                }else{
                                    Template.WarningAlert(response.error);
                                }
                            },
                            error:function(){
                                Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
                            }
                        })
                    }
                });
            } else {
                Template.WarningAlert('Akun sudah diverifikasi');
            }
        } else {
            Template.WarningAlert('Please select a row.');
        }
    })
    grid_delete.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='0') {
                $.confirm({
                    title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
                    content:'Delete Stock Right Issue? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/delete_verification_stock_right_issue',
                            success:function(response){
                                if(response.success==true){
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Delete Success.',
                                        confirmButtonClass:'btn-success',
                                        confirm:function(){
                                            $('#jqgrid_data').trigger('reloadGrid')
                                        }
                                    })
                                }else{
                                    Template.WarningAlert(response.error);
                                }
                            },
                            error:function(){
                                Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
                            }
                        })
                    }
                });
            } else {
                Template.WarningAlert('Tidak bisa Menghapus, Status sudah diverifikasi');
            }
        } else {
            Template.WarningAlert('Please select a row.');
        }
    })
    grid_edit.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        //
         var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='0') {
                
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
});
    
    
    // end event button click
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
                            content:'Add Success.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('.alert-error',FormAdd).hide();
                                add_cancel.trigger('click');
                                $('#jqgrid_data').trigger('reloadGrid')
                                $('#bank_code',FormAdd).val('').trigger('chosen:updated');
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
                            content:'Edit Success.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('.alert-error',FormEdit).hide();
                                $('#btn_cancel',FormEdit).trigger('click');
                                $('#jqgrid_data').trigger('reloadGrid')
                                $('#bank_code',FormEdit).val('').trigger('chosen:updated');
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
    | even get current account / Current account by fund_code
    | @form : add
    */
    
    /*
    | even get current account / Current account by fund_code
    | @form : edit
    */
    

})