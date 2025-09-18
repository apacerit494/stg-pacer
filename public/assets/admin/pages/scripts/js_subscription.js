$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/outsourcing/jqgrid_subscription',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Contract No', name: 'contract_no', align: "center", width: 100 },
        { label: 'Fund Code', name: 'fund_code', align: "center", width: 100 },
        { label: 'Fund group Name', name: 'fund_group_name', align: "center", width: 150 },
        { label: 'Fund Mutual Code', name: 'fm_code', width: 100 },
        { label: 'Fund Mutual Name', name: 'fm_name', width: 200 },
        { label: 'Amount', name: 'amount', width: 150,align:'right' },
        { label: 'Maximum Stock', name: 'max_stock', width: 175, align:'center', formatter:function(cellvalue){ return cellvalue+' %' }},
        { label: 'Maximum Bound', name: 'max_bound', width: 175, align:'center', formatter:function(cellvalue){ return cellvalue+' %' }},
        { label: 'Minimum Money Market', name: 'min_money_market', width: 175, align:'center', formatter:function(cellvalue){ return cellvalue+' %' }},
        { label: 'Good Fund Date', name: 'good_fund_date', width: 150 },
        { label: 'Month Contract Periode', name: 'month_contract_periode', width: 150,align:'center' },
        { label: 'Maturity Date', name: 'maturity_date', width: 150 }
        
        

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
        contract_no:{required:true},
        fund_code:{required:true},
        fm_code:{required:true},
        amount:{required:true},
        max_stock:{required:true},
        max_bound:{required:true},
        min_money_market:{required:true},
        good_fund_date:{required:true},
        month_contract_periode:{required:true},
        maturity_date:{required:true}
       
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
                        content:'Add Subscription Success.',
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
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/outsourcing/get_subscription',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#contract_no',FormEdit).val(response.contract_no);
                $('#fund_group_code',FormEdit).val(response.fund_code);
                $('#fm_code',FormEdit).val(response.fm_code);
                $('#amount',FormEdit).val(response.amount);
                $('#max_stock',FormEdit).val(response.max_stock);
                $('#max_bound',FormEdit).val(response.max_bound);
                $('#min_money_market',FormEdit).val(response.min_money_market);
                $('#good_fund_date',FormEdit).val(Template.ToDatePicker(response.good_fund_date));
                $('#month_contract_periode',FormEdit).val(response.month_contract_periode);
                $('#maturity_date',FormEdit).val(Template.ToDatePicker(response.maturity_date));
                




            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        })
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
        contract_no:{required:true},
        fund_code:{required:true},
        fm_code:{required:true},
        amount:{required:true},
        max_stock:{required:true},
        max_bound:{required:true},
        min_money_market:{required:true},
        good_fund_date:{required:true},
        month_contract_periode:{required:true},
        maturity_date:{required:true}
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
                        content:'Edit Subscription Success.',
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
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Subscription? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/outsourcing/delete_subscription',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Subscription Success.',
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


// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    window.open(site_url+'excel/export_report_subscription')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_subscription')
});
})