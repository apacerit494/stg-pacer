$(function(){

var FormAdd = $('#FormAdd'),FormTrx = $('#FormTrx'), FormEdit = $('#FormEdit'), FormUpload = $('#FormUpload');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_current_account_transaction',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Account Number', name: 'account_number', align: "center", width: 120 },
        { label: 'Transaction Date', name: 'transaction_date', width: 120, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} },
        { label: 'Transaction code', name: 'transaction_code', hidden:true },
        { label: 'Transaction Name', name: 'code_description', width: 150 },
        { label: 'Reference', name: 'reference', width: 100 },
        { label: 'Debit Credit Flag', name: 'debit_credit_flag', width: 110, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "D":
                return 'Debet';
                break;
                case "C":
                return 'Credit';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Amount', name: 'amount', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { label: 'balance', name: 'balance', width: 150 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' },hidden:true},
        { label: 'Description', name: 'description', width: 250 },
         { label: 'Status', name: 'status', width: 100, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return '<span class="label label-danger label-sm">Belum Verifikasi</span>';
                break;
                case "1":
                return '<span class="label label-info label-sm">Verified</span>';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { name:'status1',hidden:true }
        //{ label: 'Created Stamp', name: 'created_stamp', width: 150 },
        //{ label: 'Last Updated Stamp', name: 'last_updated_stamp', width: 150 }
          
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "transaction_date",
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
    FormTrx.trigger('reset');
    FormAdd.trigger('reset');
    $('#history tbody').html('<tr><td colspan="6" align="center" id="empty">-Empty-</td></tr>');
})

$('#btn_cancel',FormAdd).click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.alert-error',FormAdd).hide();
    $('.alert-error',FormTrx).hide();
    FormAdd.trigger('reset');
    FormTrx.trigger('reset');
    $('#history tbody').html('<tr><td colspan="6" align="center" id="empty">-Empty-</td></tr>');
    $('.error',FormAdd).removeClass('error');
    $('.error',FormTrx).removeClass('error');
    $('#account_number',FormAdd).html('<option value="">Please Select</option>');
    $("#jqgrid_data").trigger('reloadGrid')
})

FormTrx.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        account_number:{required:true},
        transaction_date:{required:true},
        transaction_code:{required:true},
        reference:{required:true},
        debit_credit_flag:{required:true},
        amount:{required:true},
        description:{required:true}
        
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormTrx).show();
        Template.scrollTo($('.alert-error',FormTrx), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormTrx.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Add Current Account Transaction Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormTrx).hide();
                            $('#jqgrid_data').trigger('reloadGrid');
                            var trx_date = $('#transaction_date',FormTrx).val();
                            var debit_credit_flag = $('#debit_credit_flag',FormTrx).val();
                            var trx_code = $('#transaction_code option:selected',FormTrx).text();
                            var ref = $('#reference',FormTrx).val();
                            var amount = $('#amount',FormTrx).val();
                            var description = $('#description',FormTrx).val();
                            //reset form
                            html = '<tr>';
                            html += '<td>'+trx_date+'</td>';
                            html += '<td>'+debit_credit_flag+'</td>';
                            html += '<td>'+trx_code+'</td>';
                            html += '<td>'+ref+'</td>';
                            html += '<td align="right">'+amount+'</td>';
                            html += '<td>'+description+'</td>';
                            html += '</tr>';
                            $('#history tbody #empty').closest('tr').remove();
                            $('#history tbody').append(html);
                            FormTrx.trigger('reset');
                            $('#modal_trx').modal('hide')
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
        status = data.status1;
        if (status!='0') {
            Template.WarningAlert("Sudah diverifikasi. tidak bisa di edit");
        } else {

            // do ajax request or something here

         $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/inhouse/get_current_account_transaction',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#fund_group_code',FormEdit).val(response.fund_group_code).trigger('change');
                $('#account_number',FormEdit).val(response.account_number);
                $('#transaction_date1',FormEdit).val(Template.ToDatePicker(response.transaction_date));
                $('#reference',FormEdit).val(response.reference);
                $('#debit_credit_flag',FormEdit).val(response.debit_credit_flag).trigger('change');
                $('#transaction_code',FormEdit).val(response.transaction_code_original);
                $('#amount',FormEdit).val(Template.NumberFormat(response.amount,0,',','.'));
                $('#description',FormEdit).val(response.description);
      
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
        account_number:{required:true},
        transaction_date:{required:true},
        transaction_code:{required:true},
        reference:{required:true},
        debit_credit_flag:{required:true},
        amount:{required:true},
        description:{required:true}
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
                        content:'Edit Current Account Transaction.',
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

                    extra_msg = '';
                    if ( typeof(response.warning) != 'undefined') {
                        extra_msg = '<br><div class="alert alert-warning">';
                        extra_msg += response.warning;
                        extra_msg += '</div>';
                    }

                    $.alert({
                        title:'Upload Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'<div align="center" class="alert alert-success"><i class="fa fa-check"></i> Upload Data Current Account Transaction Success.</div>'+extra_msg,
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
$('#btn_delete').click(function(e){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        data = $('#jqgrid_data').jqGrid('getRowData',selrow);
        status = data.status1;
        if (status!='0') {
             Template.WarningAlert("Sudah diverifikasi. tidak bisa di delete");
        } else {

            // do ajax request or something here
         $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Current Account Transaction? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/inhouse/delete_current_account_transaction',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Current Account Transaction Success.',
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
    } else {
        Template.WarningAlert("Please select a row");
    }
})



// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    $('#modal_export_excel').modal('show')
})

$('#export_excel','#modal_export_excel').click(function(){
    periode1 = $('#periode1','#modal_export_excel').val();
    periode2 = $('#periode2','#modal_export_excel').val();

    if (periode1!="" && periode2!="") {
        window.open(site_url+'excel/export_report_current_account_transaction/'+Template.ToDateDefault(periode1)+'/'+Template.ToDateDefault(periode2))
    } else {
        Template.WarningAlert('Please select Periode.');
        return false;
    }
})

$('#btn_pdf').click(function(){
    $('#modal_export_pdf').modal('show')
})

$('#export_pdf','#modal_export_pdf').click(function(){
    periode3 = $('#periode3','#modal_export_pdf').val();
    periode4 = $('#periode4','#modal_export_pdf').val();

    if (periode3!="" && periode4!="") {
        window.open(site_url+'pdf/export_report_current_account_transaction/'+Template.ToDateDefault(periode3)+'/'+Template.ToDateDefault(periode4))
    } else {
        Template.WarningAlert('Please select Periode.');
        return false;
    }
});


$('#fund_group_code',FormAdd).change(function(){
    fund_group_code = $(this).val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            fund_group_code:fund_group_code
        },
        url:site_url+'inhouse/get_account_number_by_fund_group_code',
        async:false,
        success: function(response) {
            opt = '<option value="">Please Select</option>';
            for ( i in response ) {
                opt += '<option value="'+response[i].account_number+'">'+response[i].account_number+' - '+response[i].bank_name+'</option>';
            }
            $('#account_number',FormAdd).html(opt).trigger('chosen:updated')
        },
        error:function(e){
            Template.WarningAlert(e)
        }
    })
})

$('#fund_group_code',FormUpload).change(function(){
    fund_group_code = $(this).val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            fund_group_code:fund_group_code
        },
        url:site_url+'inhouse/get_account_number_by_fund_group_code',
        async:false,
        success: function(response) {
            opt = '<option value="">Please Select</option>';
            for ( i in response ) {
                opt += '<option value="'+response[i].account_number+'">'+response[i].account_number+' - '+response[i].bank_name+'</option>';
            }
            $('#account_number',FormUpload).html(opt).trigger('chosen:updated')
        },
        error:function(e){
            Template.WarningAlert(e)
        }
    })
})


$('#add_trx').click(function(){
    account_number = $('#account_number','#add').val();
    if (account_number=="") {
        $('#account_number',FormAdd).addClass('error');
        Template.WarningAlert('Please select Account Number.');
    } else {
        $('#account_number',FormAdd).removeClass('error');
        $('#account_number',FormTrx).val(account_number);
        $('#modal_trx').modal('show');
    }
})


$('#debit_credit_flag',FormTrx).change(function(){
    debit_credit_flag = $(this).val();
    //account_number = $('#account_number','#add').val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            debit_credit_flag:debit_credit_flag,
         //   account_number:account_number
        },
        url:site_url+'inhouse/get_transaction_code_by_dc_flag',
        success: function(response) {
            opt = '<option value="">Please Select</option>';
            for ( i in response ) {
            //    opt += '<option value="'+response[i].transaction_code_original+'">'+response[i].transaction_code_original+' - '+response[i].description+'</option>';
                opt += '<option value="'+response[i].code_value+'">'+response[i].code_value+' - '+response[i].code_description+'</option>';
            }
            $('#transaction_code',FormTrx).html(opt).trigger('chosen:updated')
        },
        error:function(e){
            Template.WarningAlert(e)
        }
    })
})

$('#save_trx','#modal_trx').click(function(){
    FormTrx.submit();
})


$('#fund_group_code',FormEdit).change(function(){
    fund_group_code = $(this).val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            fund_group_code:fund_group_code
        },
        url:site_url+'inhouse/get_account_number_by_fund_group_code',
        async:false,
        success: function(response) {
            opt = '<option value="">Please Select</option>';
            for ( i in response ) {
                opt += '<option value="'+response[i].account_number+'">'+response[i].account_number+' - '+response[i].bank_name+'</option>';
            }
            $('#account_number',FormEdit).html(opt).trigger('chosen:updated')
        },
        error:function(e){
            Template.WarningAlert(e)
        }
    })
})

$('#debit_credit_flag',FormEdit).change(function(){
    debit_credit_flag = $(this).val();
    account_number = $('#account_number','#edit').val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            account_number:account_number,
            debit_credit_flag:debit_credit_flag
        },
        url:site_url+'inhouse/get_transaction_code_by_dc_flag',
        async:false,
        success: function(response) {
            opt = '<option value="">Please Select</option>';
            for ( i in response ) {
                opt += '<option value="'+response[i].transaction_code_original+'">'+response[i].transaction_code_original+' - '+response[i].description+'</option>';
            }
            $('#transaction_code',FormEdit).html(opt).trigger('chosen:updated')
        },
        error:function(e){
            Template.WarningAlert(e)
        }
    })
})
})