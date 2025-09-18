$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormUpload = $('#FormUpload');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_mutual_fund_transaction',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund Group', name: 'fund_code', width: 150 },
        { label: 'Fund Manager', name: 'fm_code', width: 200 },
        { label: 'Mutual Fund', name: 'mf_code', width: 200 },
        {label: 'Mutual Fund Type', name: 'mf_type', width: 120, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "E":
                return 'Eqiuity';
                break;
                case "B":
                return 'Balanced';
                break;
                case "F":
                return 'Fix Income';
                break;
                case "M":
                return 'Money Market';
                break;
                case "P":
                return 'Protected';
                break;
                case "R":
                return 'RDPT';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'NAV Date', name: 'nav_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} },
        { label: 'Settelment Date', name: 'settlement_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} },
        { label: 'NAV', name: 'nav', width: 100, hidden:true },
        { label: 'Amount', name: 'amount', width: 100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' } },
        { label: 'Settlement Amount', name: 'settlement_amount', width: 100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' } },
        { label: 'Quantity Unit', name: 'quantity_unit', width: 100, hidden:true },
        { label: 'Bank Custody', name: 'bank_custody', width: 150 },
        { label: 'classification', name: 'classification', width: 80 },
        { label: 'Status', name: 'status', width: 150, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return 'Belum Verifikasi';
                break;
                case "1":
                return 'Sudah Verifikasi';
                break;
                case "2":
                return 'Sudah Settelment';
                break;
                default:
                return cellvalue;
                break;
            }
        } }
          
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "nav_date",
    sortorder: "desc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

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
    $('.chosen').trigger('chosen:updated')
})

// -- Back to Grid
$('#btn_cancel',FormAdd).click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.alert-error',FormAdd).hide();
    FormAdd.trigger('reset');
    $('.error',FormAdd).removeClass('error');
});

// -- fill value settlement date by nav date
$('#nav_date',FormAdd).change(function(){
    $('#settlement_date',FormAdd).val($(this).val());
});
$('#nav_date',FormAdd).blur(function(){
    $('#settlement_date',FormAdd).val($(this).val());
});
$('#amount',FormAdd).change(function(){
    $('#settlement_amount',FormAdd).val($(this).val());
});

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_code:{required:true},
        fm_code:{required:true},
        mf_code:{required:true},
        mf_code:{required:true},
        nav_date:{required:true},
        amount:{required:true},
        custody_code:{required:true},
        classification:{required:true},
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
                        content:'Add Mutual Fund Transaction Success.',
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
        data = $('#jqgrid_data').jqGrid('getRowData',selrow);
        status=data.status;
        if (status!='Belum Verifikasi') {
            Template.WarningAlert("Status sudah diverifikasi");
        } else {
            $.ajax({
                type:"POST",dataType:"json",data:{id:selrow},
                url:site_url+'/inhouse/get_mutual_fund_transaction',
                success:function(response){
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id',FormEdit).val(response.id);
                    $('#fund_code',FormEdit).val(response.fund_code);
                    $('#sell_buy_flag',FormEdit).val(response.sell_buy_flag);
                    $('#fm_code',FormEdit).val(response.fm_code);
                    $('#mf_code',FormEdit).val(response.mf_code).trigger('change');
                    $('#mf_type',FormEdit).val(response.mf_type);
                    $('#nav_date1',FormEdit).val(Template.ToDatePicker(response.nav_date));
                    $('#settlement_date',FormEdit).val(Template.ToDatePicker(response.settlement_date));
                    $('#amount',FormEdit).val(response.amount);
                    $('#settlement_amount',FormEdit).val($('#amount',FormEdit).val());
                    $('#custody_code',FormEdit).val(response.bank_custody);
                    $('#classification',FormEdit).val(response.classification);
                    $('.chosen').trigger('chosen:updated');
                },
                error: function(){
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            })
        }
    } else {
        Template.WarningAlert("Please select a row");
    }
})
// -- Back to Grid
$('#btn_cancel',FormEdit).click(function(){
    $('#edit').hide();
    $('#jqgrid').show();
    $('.alert-error',FormEdit).hide();
    FormEdit.trigger('reset');
    $('.error',FormEdit).removeClass('error');
});

// -- fill value settlement date by nav date
$('#nav_date1',FormEdit).change(function(){
    $('#settlement_date',FormEdit).val($(this).val());
});
$('#nav_date1',FormEdit).blur(function(){
    $('#settlement_date',FormEdit).val($(this).val());
});
$('#amount',FormEdit).change(function(){
    $('#settlement_amount',FormEdit).val($(this).val());
});

FormEdit.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
       fund_code:{required:true},
        fund_manager_code:{required:true},
        mf_code:{required:true},
        type_of_mf:{required:true},
        nav_date:{required:true},
        amount:{required:true},
        custody_code:{required:true},
        classification:{required:true},
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
                        content:'Edit Mutual Fund Transaction.',
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

/*UPLOAD*/
FormUpload.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        userfile:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormUpload).show();
        Template.scrollTo($('.alert-error',FormUpload), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        $('#btn_upload').attr('disabled',true);
        
        FormUpload.ajaxSubmit({
            dataType: 'json', 
            beforeSend: function() {
                $('#btn_upload').html('<i class="icon-spinner icon-spin"></i> <span>0%</span>');
            },
            uploadProgress: function(event, position, total, percentComplete) {
                if (percentComplete>99) {
                    percentComplete=99;
                }
                $('#btn_upload span').html(''+percentComplete+'%');
            },
            cache:false,
            success: function(response) {
                $('#btn_upload').html('<i class="icon-upload"></i> Upload');
                $('#btn_upload').attr('disabled',false);
                if (response.success==true) {
                    $.alert({
                        title:'Upload Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Upload Data Mutual Fund Transaction Success.',
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
                // var percentVal = '100%';
                // percent.html(percentVal);
                $('#btn_upload').html('<i class="icon-upload"></i> Upload');
                $('#btn_upload').attr('disabled',false);
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
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Mutual Fund Transaction? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/inhouse/delete_mutual_fund_transaction',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Bank Success.',
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
    } else {
        Template.WarningAlert("Please select a row.");
    }
})
/*BEGIN SEARCH*/
$("#fm_code",FormAdd).change(function(e){
   var fm_code=$(this).val();
   $.ajax({
    type:"POST",dataType:"json",data:{
        fm_code:fm_code
    },
    url:site_url+'inhouse/ajax_get_mfs_by_fm_code',
    success:function(response) {
        var opt = '<option value="">Please Select</option>';
        for ( i in response ) {
            opt += '<option value="'+response[i].mf_code+'">'+response[i].mf_name+'</option>';
        }
        $('#mf_type',FormAdd).html(opt);
    }
   })

});

$("#fm_code",FormEdit).change(function(e){
   var fm_code=$(this).val();
   $.ajax({
    type:"POST",dataType:"json",data:{
        fm_code:fm_code
    },
    url:site_url+'inhouse/ajax_get_mfs_by_fm_code',
    success:function(response) {
        var opt = '<option value="">Please Select</option>';
        for ( i in response ) {
            opt += '<option value="'+response[i].mf_code+'">'+response[i].mf_name+'</option>';
        }
        $('#mf_type',FormEdit).html(opt);
    }
   })

});

$("#mf_code",FormAdd).change(function(e){
   var mf_code=$(this).val();
   $.ajax({
    type:"POST",dataType:"json",data:{
        mf_code:mf_code
    },
    url:site_url+'inhouse/ajax_get_tomfs_by_mf_code',
    async:false,
    success:function(response) {
       var opt = '<option value="">Please Select</option>';
      //  console.log(i)
        for ( i in response ) {
            switch (response[i].mf_type) {
                case 'E':
                display_mf_type = 'Equity';
                break;
                case 'B':
                display_mf_type = 'Balanced';
                break;
                case 'F':
                display_mf_type = 'Fix Income';
                break;
                case 'M':
                display_mf_type = 'Money Market';
                break;
                case 'P':
                display_mf_type = 'Protected';
                break;
                case 'R':
                display_mf_type = 'RTDP';
                break;
                default:
                display_mf_type = '  -';
                break;
            }
            opt += '<option value="'+response[i].mf_type+'">'+display_mf_type+'</option>';
        }
        $('#mf_type',FormAdd).html(opt);
    }
  })

});

$("#mf_code",FormEdit).change(function(e){
   var mf_code=$(this).val();
   $.ajax({
    type:"POST",dataType:"json",data:{
        mf_code:mf_code
    },
    url:site_url+'inhouse/ajax_get_tomfs_by_mf_code',
    async:false,
    success:function(response) {
       var opt = '<option value="">Please Select</option>';
        console.log(i)
        for ( i in response ) {
            switch (response[i].mf_type) {
                case 'E':
                display_mf_type = 'Equity';
                break;
                case 'B':
                display_mf_type = 'Balanced';
                break;
                case 'F':
                display_mf_type = 'Fix Income';
                break;
                case 'M':
                display_mf_type = 'Money Market';
                break;
                case 'P':
                display_mf_type = 'Protected';
                break;
                case 'R':
                display_mf_type = 'RTDP';
                break;
                default:
                display_mf_type = '  -';
                break;
            }
            opt += '<option value="'+response[i].mf_type+'">'+display_mf_type+'</option>';
        }
        $('#mf_type',FormEdit).html(opt);
    }
   })

});




/*END SEARCH*/
// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    window.open(site_url+'excel/export_report_mutual_fund_transaction')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_mutual_fund_transaction')
});
})