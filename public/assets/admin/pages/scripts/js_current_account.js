v_check_account_number = true;
$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_current_account',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund Group Name', name: 'fund_group_code', align: "left", width: 150 },
        // { label: 'Fund Group Name', name: 'fund_group_name', width: 150 },
        { label: 'Bank Name', name: 'bank_code', align: "left", width: 150 },
        // { label: 'Bank Name', name: 'bank_name', width: 150 },
        { label: 'Branch Name', name: 'account_number', width: 150 },
        { label: 'Account Number', name: 'account_number', width: 110 },
        { label: 'Account Name', name: 'account_name', width: 150 },
        { label: 'Open Date', name: 'open_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newdate : 'd/m/Y'} },
        { label: 'Balance', name: 'balance', width: 100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' } },
        { label: 'Status', name: 'status', width: 100, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return '<label class="label label-sm label-warning">Belum Verifikasi</label>';
                break;
                case "1":
                return '<label class="label label-sm label-success">Aktif</label>';
                break;
                case "2":
                return '<label class="label label-sm label-danger">Tutup</label>';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Status', name:'status1', hidden:true}
    ],
    viewrecords: true,
    width: 1098,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "fund_group_code, bank_code",
    sortorder: "asc",
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
})

$('#btn_cancel',FormAdd).click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.alert-error',FormAdd).hide();
    FormAdd.trigger('reset');
    $('.error',FormAdd).removeClass('error');
})
obj_account_number=$('#account_number',FormAdd);
obj_account_number.change(function(){
    account_number=$(this).val();

    $.ajax({
        type:"POST",dataType:"json",data:{account_number:account_number},
        url:site_url+'inhouse/check_account_number',
        success: function(response) {
            helpinline=$('#help-inline-an',FormAdd)
            if (response.success==false) {
                helpinline.show().html('<span style="padding:5px;color:red;"><i class="fa fa-remove"></i> '+response.message+'</span>');
                obj_account_number.addClass('error');
            } else {
                helpinline.show().html('<span style="padding:5px;color:green;"><i class="fa fa-check"></i> '+response.message+'</span>');
                obj_account_number.removeClass('error');
            }
            v_check_account_number=response.success;
        },
        error: function(response) {
            console.log(response.statusText);
        }
    })
})

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        fund_group_code:{required:true},
        bank_code:{required:true},
        branch_name:{required:true},
        account_number:{required:true},
        account_name:{required:true},
        open_date:{required:true},
        currency:{required:true},
        balance:{required:true}
          
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
        
        if (v_check_account_number==false) {

            Template.WarningAlert('Account Number already exists.');

        } else {

            FormAdd.ajaxSubmit({
                dataType: 'json', 
                success: function(response) {
                    if(response.success==true){
                        $.alert({
                            title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                            content:'Add Current Account Success.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('.alert-error',FormAdd).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#btn_cancel',FormAdd).trigger('click');
                                $('#bank_code',FormAdd).val('').trigger('chosen:updated')
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
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/inhouse/get_current_account',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#fund_group_code',FormEdit).val(response.fund_group_code);
                $('#bank_code',FormEdit).val(response.bank_code).trigger('chosen:updated');
                $('#branch_name',FormEdit).val(response.branch_name);
                $('#account_number',FormEdit).val(response.account_number);
                $('#account_name',FormEdit).val(response.account_name);
                $('#open_date1',FormEdit).val(Template.ToDatePicker(response.open_date));
                $('#balance',FormEdit).val(response.balance);
                $('#currency',FormEdit).val(response.currency);
                  
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        })
            // do ajax request or something here

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
        fund_group_code:{required:true},
        bank_code:{required:true},
        branch_name:{required:true},
        account_number:{required:true},
        account_name:{required:true},
        open_date:{required:true},
        currency:{required:true},
        balance:{required:true}
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
                        content:'Edit Current Account Success.',
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
$('#btn_delete').click(function(e){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        data = $('#jqgrid_data').jqGrid('getRowData',selrow);
        status = data.status;
        if (status!='Belum Verifikasi') {
             Template.WarningAlert("Sudah diverifikasi. tidak bisa di delete");
        } else {

            // do ajax request or something here
         $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Current Account? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/inhouse/delete_current_account',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Current Account Success.',
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
    window.open(site_url+'excel/export_report_current_account')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_current_account')
});

})