$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_stock_deviden',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund Code', name: 'fund_code', align: "center", width: 75 },
        { label: 'Fund Name', name: 'fund_group_name', align: "left", width: 175 },
        { label: 'Ticker', name: 'ticker', align: "center", width: 75 },
        { label: 'Emiten Name', name: 'emiten_name', align: "left", width: 175 },
        { label: 'Custody Code', name: 'custody_code', align: "center", width: 75 },
        { label: 'Bank Name', name: 'bank_name', align: "left", width: 175 },
        { label: 'Current Quantity Share', name: 'current_quantity_share', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
        { label: 'Recording Date', name: 'recording_date', align: "center",width: 100 },
        { label: 'Distribution Date', name: 'distribution_date', align: "center",width: 100 },
        { label: 'Deviden_quantity_share', name: 'deviden_quantity_share', width: 145,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0'  } },
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
       var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var quantity_share1=0;
  
            
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
        
          
        
            $('#current_quantity_share',FormAdd).val(Template.NumberFormat(quantity_share1,0,',','.'));
        
})

$('#ticker',FormAdd).change(function(){
     var fund_code=$('#fund_code',FormAdd).val();
            var ticker=$('#ticker',FormAdd).val();
            var classi="TRD";
            var quantity_share1=0;
  
            
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
        
          
        
            $('#current_quantity_share',FormAdd).val(Template.NumberFormat(quantity_share1,0,',','.'));
})



 






//form edit

$('#fund_code',FormEdit).change(function(){
        var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var quantity_share1=0;
  
            
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
        
          
        
            $('#current_quantity_share',FormEdit).val(Template.NumberFormat(quantity_share1,0,',','.'));  
        
})

$('#ticker',FormEdit).change(function(){
        var fund_code=$('#fund_code',FormEdit).val();
            var ticker=$('#ticker',FormEdit).val();
            var classi="TRD";
            var quantity_share1=0;
  
            
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
        
          
        
            $('#current_quantity_share',FormEdit).val(Template.NumberFormat(quantity_share1,0,',','.'));
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
        custody_code:{required:true},
        recording_date:{required:true},
        distribution_date:{required:true},
        current_quantity_share:{required:true},
        deviden_quantity_share:{required:true}
          
          
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
                        content:'Add Stock Deviden Success.',
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
                        url:site_url+'/inhouse/get_stock_deviden',
                        success:function(response){
                            $('#jqgrid').hide();
                                   $('#edit').show();
                                    $('#id',FormEdit).val(response.id);
                                    $('#fund_code',FormEdit).val(response.fund_code);
                                    $('#ticker',FormEdit).val(response.ticker);
                                    $('#custody_code',FormEdit).val(response.custody_code);
                                    $('#current_quantity_share',FormEdit).val(Math.round(response.current_quantity_share));
                                    $('#recording_date1',FormEdit).val(Template.ToDatePicker(response.recording_date));
                                    $('#distribution_date1',FormEdit).val(Template.ToDatePicker(response.distribution_date));
                                    $('#deviden_quantity_share',FormEdit).val(Math.round(response.deviden_quantity_share));
                                    
                                    
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
        custody_code:{required:true},
        recording_date:{required:true},
        distribution_date:{required:true},
        current_quantity_share:{required:true},
        deviden_quantity_share:{required:true}
          
        
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
                        content:'Edit Stock Deviden Success.',
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
                    content:'Delete Stock Deviden? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:selrow},
                            url:site_url+'/inhouse/delete_stock_deviden',
                            success:function(response) {
                                if (response.success===true) {
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Delete Stock Deviden Success.',
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
    window.open(site_url+'excel/export_report_stock_deviden')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_stock_deviden')
});

})