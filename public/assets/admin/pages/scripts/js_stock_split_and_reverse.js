$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_stock_split_and_reverse',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Split Reverse Flag', name: 'split_reverse_flag', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "S":
                return 'Split';
                break;
                case "R":
                return 'Reverse';
                break;
                                default:
                return cellvalue;
                break;
            }
        } },{ label: 'Split Date', name: 'split_date', align: "center",width: 100 },
        
        { label: 'Fund Code', name: 'fund_code', align: "center", width: 75 },
        { label: 'Fund Name', name: 'fund_group_name', align: "left", width: 175 },
        { label: 'Ticker', name: 'ticker', align: "center", width: 75 },
        { label: 'Emiten Name', name: 'emiten_name', align: "left", width: 175 },
        { label: 'Previouse Avg Price', name: 'previous_avg_price', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Previous Quantity Share', name: 'previous_quantity_share', align: "right", width: 175 },
        { label: 'previous Lot', name: 'previous_lot', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Split Rasio', name: 'split_reverse_rasio', align: "right", width: 175 },
        { label: 'Current AVG Price', name: 'current_avg_price', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Current Quantity Share', name: 'current_quantity_share', align: "right", width: 175 },
        { label: 'Current Lot', name: 'current_lot', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Verified Date', name: 'verified_date', align: "center",width: 100 },
        { label: 'Verified_by', name: 'verified_by', align: "left", width: 175 },
       // { label: 'Status', name: 'status', width: 200, align:'center', formatter:function(cellvalue) {
         //   switch(cellvalue) {
           //     case "0":
             //   return 'Unverified';
              //  break;
                //case "1":
                //return 'Verified';
                //break;
                  //              default:
                //return cellvalue;
                //break;
            //}
        //} }

        { label: 'Status' , name: 'status', width: 150, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case "0":
                    return "<label class='label label-sm label-danger'>Unverified</label>";
                    break;
                    case "1":
                    return "<label class='label label-sm label-info'>Verified</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }

             ,{ name: 'v_status', hidden:true }
            
        
        
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



var calculate_current_avg_price = function(){
    var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',FormAdd).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',FormAdd).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',FormAdd).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',FormAdd).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',FormAdd).val(Template.NumberFormat(current_avg_price,0,',','.'))
    $('#current_quantity_share',FormAdd).val(Template.NumberFormat(current_quantity_share,0,',','.'))
    $('#current_lot',FormAdd).val(Template.NumberFormat(current_lot,0,',','.'))
}

var calculate_current_avg_price2 = function(){
    var split_reverse_flag=$('#split_reverse_flag',edit).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',edit).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',edit).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',edit).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',edit).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',edit).val(Template.NumberFormat(current_avg_price,0,',','.'))
    $('#current_quantity_share',edit).val(Template.NumberFormat(current_quantity_share,0,',','.'))
    $('#current_lot',edit).val(Template.NumberFormat(current_lot,0,',','.'))
}

 

$('#split_reverse_flag',FormAdd).change(function(){
    var fund_code=$('#fund_code',FormAdd).val();
    var ticker=$('#ticker',FormAdd).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
    var previous_avg_price=0;
    var previous_quantity_share=0;
  
            
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                previous_avg_price.val(response.avg_price)

            }
        })
        
        $('#previous_avg_price',FormAdd).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                previous_quantity_share.val(response.quantity_share)

            }
        })
        $('#previous_quantity_share',FormAdd).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',FormAdd).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
    
$('#fund_code',FormAdd).change(function(){
    var fund_code=$('#fund_code',FormAdd).val();
    var ticker=$('#ticker',FormAdd).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
    var previous_avg_price=0;
    var previous_quantity_share=0;
  
            
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                previous_avg_price.val(response.avg_price)

            }
        })
        
        $('#previous_avg_price',FormAdd).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                previous_quantity_share.val(response.quantity_share)

            }
        })
        $('#previous_quantity_share',FormAdd).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',FormAdd).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
        
$('#ticker',FormAdd).change(function(){
    var fund_code=$('#fund_code',FormAdd).val();
    var ticker=$('#ticker',FormAdd).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
    var previous_avg_price=0;
    var previous_quantity_share=0;
  
            
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                previous_avg_price.val(response.avg_price)

            }
        })
        
        $('#previous_avg_price',FormAdd).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                previous_quantity_share.val(response.quantity_share)

            }
        })
        $('#previous_quantity_share',FormAdd).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',FormAdd).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
 

$('#split_reverse_rasio',FormAdd).keyup(function(){
    var split_reverse_flag=$('#split_reverse_flag',FormAdd).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',FormAdd).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',FormAdd).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',FormAdd).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',FormAdd).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',FormAdd).val(Template.NumberFormat(current_avg_price,0,',','.'))
    $('#current_quantity_share',FormAdd).val(Template.NumberFormat(current_quantity_share,0,',','.'))
    $('#current_lot',FormAdd).val(Template.NumberFormat(current_lot,0,',','.'))
})





$('#split_reverse_flag',FormEdit).change(function(){
    var ticker=$('#ticker',FormEdit).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
    var previous_avg_price=0;
    var previous_quantity_share=0;
  
            
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                previous_avg_price.val(response.avg_price)

            }
        })
        
        $('#previous_avg_price',FormEdit).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                previous_quantity_share.val(response.quantity_share)

            }
        })
        $('#previous_quantity_share',FormEdit).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',FormEdit).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
    //calculate_current_avg_price2();

  //  var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',FormEdit).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',FormEdit).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',FormEdit).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',FormEdit).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',FormEdit).val(Template.NumberFormat(current_avg_price,0,',','.'));
    $('#current_quantity_share',FormEdit).val(Template.NumberFormat(current_quantity_share,0,',','.'));
    $('#current_lot',FormEdit).val(Template.NumberFormat(current_lot,0,',','.'));
});


$('#fund_code',FormEdit).change(function(){
    var fund_code=$('#fund_code',FormEdit).val();
    var ticker=$('#ticker',FormEdit).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
    var previous_avg_price=0;
    var previous_quantity_share=0;
  
            
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                previous_avg_price.val(response.avg_price)

            }
        })
        
        $('#previous_avg_price',FormEdit).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                previous_quantity_share.val(response.quantity_share)

            }
        })
        $('#previous_quantity_share',FormEdit).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',FormEdit).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price2();
       
})
        
$('#ticker',FormEdit).change(function(){
    var fund_code=$('#fund_code',FormEdit).val();
    var ticker=$('#ticker',FormEdit).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
    var previous_avg_price=0;
    var previous_quantity_share=0;
  
            
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_avg_price',
            success:function(response){
                previous_avg_price.val(response.avg_price)

            }
        })
        
        $('#previous_avg_price',FormEdit).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code,
                ticker:ticker,
                classi:classi
            },
            url:site_url+'inhouse/get_fn_quantity_share',
            success:function(response){
                previous_quantity_share.val(response.quantity_share)

            }
        })
        $('#previous_quantity_share',FormEdit).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',FormEdit).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
 


$('#split_reverse_rasio',FormEdit).keyup(function(){
    var split_reverse_flag=$('#split_reverse_flag',FormEdit).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',FormEdit).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',FormEdit).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',FormEdit).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',FormEdit).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',FormEdit).val(Template.NumberFormat(current_avg_price,0,',','.'))
    $('#current_quantity_share',FormEdit).val(Template.NumberFormat(current_quantity_share,0,',','.'))
    $('#current_lot',FormEdit).val(Template.NumberFormat(current_lot,0,',','.'))
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
       split_reverse_flag:{required:true},
       split_date:{required:true},
       fund_code:{required:true},
       ticker:{required:true},
       split_reverse_rasio:{required:true}
          
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
                        content:'Add Stock Split And Reverse Success.',
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
            var status = data.v_status;
            if (status=='0') {
                
            //
                        $.ajax({
                        type:"POST",dataType:"json",data:{id:selrow},
                        url:site_url+'/inhouse/get_stock_split_and_reverse',
                        success:function(response){
                            $('#jqgrid').hide();
                                    $('#edit').show();
                                    $('#id',FormEdit).val(response.id);
                                    $('#split_reverse_flag',FormEdit).val(response.split_reverse_flag);
                                    $('#split_date1',FormEdit).val(Template.ToDatePicker(response.split_date));
                                    $('#fund_code',FormEdit).val(response.fund_code);
                                    $('#ticker',FormEdit).val(response.ticker);
                                    
                                    $('#previous_avg_price',FormEdit).val(Math.round(response.previous_avg_price));
                                    $('#previous_quantity_share',FormEdit).val(Math.round(response.previous_quantity_share));
                                    $('#previous_lot',FormEdit).val(Math.round(response.previous_lot));
                                    $('#split_reverse_rasio',FormEdit).val(Math.round(response.split_reverse_rasio));
                                    $('#current_avg_price',FormEdit).val(Math.round(response.current_avg_price));
                                    $('#current_quantity_share',FormEdit).val(Math.round(response.current_quantity_share));
                                    $('#current_lot',FormEdit).val(Math.round(response.current_lot));
                                },
                        error: function(){
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        }
                    })
    } else {
    
       Template.WarningAlert('Tidak bisa Mengubah data, Status sudah diverifikasi');
       // Template.WarningAlert(v_status);
    
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
       split_reverse_flag:{required:true},
       split_date:{required:true},
       fund_code:{required:true},
       ticker:{required:true},
       split_reverse_rasio:{required:true}
       
          
        
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
                        content:'Edit Stock Split And Reverse Success.',
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
            var status = data.v_status;
            if (status=='0') {
            
                $.confirm({
                    title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
                    content:'Delete Stock split And Reverse? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:selrow},
                            url:site_url+'/inhouse/delete_stock_split_and_reverse',
                            success:function(response) {
                                if (response.success===true) {
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Delete Stock Split And Reverse Success.',
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
    window.open(site_url+'excel/export_report_stock_split_and_reverse')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_stock_split_and_reverse')
});

})