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
        url: site_url+'/inhouse/jqgrid_verification_ssar',
        mtype: "GET",
        datatype: "json",
        colModel: [
        { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' },
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
        } },
        { label: 'Split Date', name: 'split_date', align: "center",width: 100 },
        
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

                var url = site_url+'pdf/export_report_verification_ssar/'+row_id;

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

    var calculate_current_avg_price = function(){
    var split_reverse_flag=$('#split_reverse_flag',add).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',add).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',add).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',add).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',add).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',add).val(Template.NumberFormat(current_avg_price,0,',','.'))
    $('#current_quantity_share',add).val(Template.NumberFormat(current_quantity_share,0,',','.'))
    $('#current_lot',add).val(Template.NumberFormat(current_lot,0,',','.'))
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

 

$('#split_reverse_flag',add).change(function(){
    var fund_code=$('#fund_code',add).val();
    var ticker=$('#ticker',add).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',add).val();
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
        
        $('#previous_avg_price',add).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
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
        $('#previous_quantity_share',add).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',add).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
    
$('#fund_code',add).change(function(){
    var fund_code=$('#fund_code',add).val();
    var ticker=$('#ticker',add).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',add).val();
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
        
        $('#previous_avg_price',add).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
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
        $('#previous_quantity_share',add).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',add).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
        
$('#ticker',add).change(function(){
    var fund_code=$('#fund_code',add).val();
    var ticker=$('#ticker',add).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',add).val();
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
        
        $('#previous_avg_price',add).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
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
        $('#previous_quantity_share',add).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',add).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
 

$('#split_reverse_rasio',add).keyup(function(){
    var split_reverse_flag=$('#split_reverse_flag',add).val();
    var previous_avg_price = Template.ConvertNumeric($('#previous_avg_price',add).val());
    var previous_quantity_share = Template.ConvertNumeric($('#previous_quantity_share',add).val());
    var previous_lot = Template.ConvertNumeric($('#previous_lot',add).val());
    var split_reverse_rasio = Template.ConvertNumeric($('#split_reverse_rasio',add).val());
    
                
    if (split_reverse_flag=='S') {
        var current_avg_price = eval(previous_avg_price/split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share*split_reverse_rasio);
        var current_lot = eval(previous_lot*split_reverse_rasio);
    } else {
        var current_avg_price = eval(previous_avg_price*split_reverse_rasio);
        var current_quantity_share = eval(previous_quantity_share/split_reverse_rasio);
        var current_lot = eval(previous_lot/split_reverse_rasio);
    }
    $('#current_avg_price',add).val(Template.NumberFormat(current_avg_price,0,',','.'))
    $('#current_quantity_share',add).val(Template.NumberFormat(current_quantity_share,0,',','.'))
    $('#current_lot',add).val(Template.NumberFormat(current_lot,0,',','.'))
})





$('#split_reverse_flag',edit).change(function(){
    var ticker=$('#ticker',edit).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',edit).val();
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
        
        $('#previous_avg_price',edit).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
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
        $('#previous_quantity_share',edit).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',edit).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
    calculate_current_avg_price2();
});
$('#fund_code',edit).change(function(){
    var fund_code=$('#fund_code',edit).val();
    var ticker=$('#ticker',edit).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',edit).val();
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
        
        $('#previous_avg_price',edit).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
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
        $('#previous_quantity_share',edit).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',edit).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price2();
       
})
        
$('#ticker',edit).change(function(){
    var fund_code=$('#fund_code',edit).val();
    var ticker=$('#ticker',edit).val();
    var classi="TRD";
    var split_reverse_flag=$('#split_reverse_flag',edit).val();
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
        
        $('#previous_avg_price',edit).val(Template.NumberFormat(previous_avg_price,0,',','.'));
        
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
        $('#previous_quantity_share',edit).val(Template.NumberFormat(previous_quantity_share,0,',','.'));
        
        $('#previous_lot',edit).val(Template.NumberFormat(previous_avg_price/100,0,',','.'));
   
           calculate_current_avg_price();
       
})
 


$('#split_reverse_rasio',edit).keyup(function(){
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
                },url:site_url+'inhouse/update_verification_ssar_print',
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
                            url:site_url+'inhouse/verify_ssar',
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
                    content:'Delete Stock Split And Reverse? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/delete_verification_ssar',
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
                        url:site_url+'/inhouse/get_verification_ssar',
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