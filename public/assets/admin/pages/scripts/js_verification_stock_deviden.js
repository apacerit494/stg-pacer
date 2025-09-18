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
        url: site_url+'/inhouse/jqgrid_verification_stock_deviden',
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
             
             //
              var  $id= selrow;
              var  $fund_code = data.fund_code;
              var  $sell_buy_flag='B';
              var  $ticker = data.ticker;
              var  $trade_date = data.distribution_date;
              var  $settlement_date = data.distribution_date;
              var  $classification='TRD';
              var  $price=0;
              var  $quantity_sheet = Math.round(data.deviden_quantity_share);
              var  $quantity_lot=$quantity_sheet/100;
              var  $transaction_fee=0;
              var  $amount=0;
              var  $settlement_amount=0;
              var  $custody_code = data.custody_code;
              //var  $broker=Null;
              var  $realized_gl=0;
              var  $classification='TRD';
              $.ajax({
                type:"POST",dataType:"json",data:{
                    fund_code:$fund_code,
                    ticker:$ticker,
                    classification:$classification
                },
                url:site_url+'inhouse/get_fn_avg_price',
                success:function(response){
                    avg_price1.val(response.avg_price)
                      var $avg_price=avg_price1;
            
                }
            })

            
            
            if (status=='0') {
                $.confirm({
                    title:"Verify",icon:'fa fa-check',backgroundDismiss:false,
                    content:'Verify Status? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                type:"POST",dataType:"json",data:{
                  id:$id,
                  fund_code:$fund_code,
                  ticker:$ticker,
                  trade_date:$trade_date,
                  settlement_date:$settlement_date,
                  quantity_sheet:$quantity_sheet,
                  quantity_lot:$quantity_lot,
                  custody_code:$custody_code
              
                },
                url:site_url+'inhouse/update_verification_stock_deviden_stock_transaction2',
                success:function(response){
                    avg_price1.val(response.avg_price)
                      var $avg_price=avg_price1;
            
                }
            })
                        

                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/verify_stock_deviden',
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
                    content:'Delete Stock Deviden? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/delete_verification_stock_deviden',
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
                        url:site_url+'/inhouse/get_verification_stock_deviden',
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
});
    
    
    // end event button click
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
            split_rasio:{required:true}

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
            split_reverse_flag:{required:true},
            split_date:{required:true},
            fund_code:{required:true},
            ticker:{required:true},
            split_rasio:{required:true}
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