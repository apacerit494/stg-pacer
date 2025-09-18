$(function(){

var t = $('#t_fund_budget');
var FormAdd = $('#FormAdd',t), FormEdit = $('#FormEdit',t);

/*
| BEGIN GRID
*/
$("#jqgrid_data_fund_budget",t).jqGrid({
    url: site_url+'/master/jqgrid_master_fund_budget',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Budget Year', name: 'budget_year', align: "center", width: 100 },
        { label: 'Fund Code', name: 'fund_code', width: 75 },
        { label: 'Fund Group Name', name: 'fund_group_name', width: 150 },
        { label: 'Min Nett Expected Return', name: 'min_nett_expected_return', width: 170, formatter:function(cellvalue){ return cellvalue+' %' }  },
        { label: 'Mid Nett Expected Return', name: 'mid_nett_expected_return', width: 170, formatter:function(cellvalue){ return cellvalue+' %' }  },
        { label: 'Max Nett Expected Return', name: 'max_nett_expected_return', width: 170, formatter:function(cellvalue){ return cellvalue+' %' }  },
        { label: 'AUM Begin Year', name: 'aum_begin_year', width: 120 },
        { label: 'Weighted AUM Begin Year', name: 'aum_begin_year_weighted', width: 120 },
        { label: 'AUM Addition on Year', name: 'aum_add_year', width: 120 },
        { label: 'Weighted AUM Addition on Year', name: 'aum_add_year_weighted', width: 120 }
        
        
    ],
    viewrecords: true,
    width: 1058,
    // autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager_fund_budget"
});

$("#t_jqgrid_data_fund_budget",t).append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
/*
| END GRID
*/

/*
| BEGIN ADD
*/
$('#btn_add',t).click(function(){
    $('#jqgrid',t).hide();
    $('#add',t).show();
    FormAdd.trigger('reset');
})

$('#btn_cancel',FormAdd).click(function(){
    $('#add',t).hide();
    $('#jqgrid',t).show();
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
        budget_year:{required:true},
        fund_code:{required:true},
        min_nett_expected_return:{required:true},
        mid_nett_expected_return:{required:true},
        max_nett_expected_return:{required:true},
        aum_begin_year:{required:true},
        aum_end_year:{required:true}
          
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
                        content:'Add Master Fund Budget Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_data_fund_budget',t).trigger('reloadGrid');
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

$('#btn_edit',t).click(function(e){
    selrow = $('#jqgrid_data_fund_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/master/get_master_fund_budget',
            success:function(response){
                $('#jqgrid',t).hide();
                $('#edit',t).show();
                $('#id',FormEdit).val(response.id);
                $('#budget_year',FormEdit).val(response.budget_year);
                $('#fund_group_code',FormEdit).val(response.fund_code);
                $('#min_nett_expected_return',FormEdit).val((response.min_nett_expected_return));
                $('#mid_nett_expected_return',FormEdit).val((response.mid_nett_expected_return));
                $('#max_nett_expected_return',FormEdit).val((response.max_nett_expected_return));
                $('#aum_begin_year',FormEdit).val(Math.round(response.aum_begin_year));
                $('#aum_begin_year_weighted',FormEdit).val(Math.round(response.aum_begin_year_weighted));
                $('#aum_add_year',FormEdit).val(Math.round(response.aum_add_year));
                $('#aum_add_year_weighted',FormEdit).val(Math.round(response.aum_add_year_weighted));
                    
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
    $('#edit',t).hide();
    $('#jqgrid',t).show();
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
        budget_year:{required:true},
        fund_code:{required:true},
        min_nett_expected_return:{required:true},
        mid_nett_expected_return:{required:true},
        max_nett_expected_return:{required:true},
        aum_begin_year:{required:true},
        aum_end_year:{required:true}
        
        
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
                        content:'Edit Master Fund Budget Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data_fund_budget',t).trigger('reloadGrid');
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
| DELETE
*/
$('#btn_delete',t).click(function(){
    selrow = $('#jqgrid_data_fund_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Master Fund Budget? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_master_fund_budget',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Master Code Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#userfile',t).val('');
                                    $('#jqgrid_data_fund_budget',t).trigger('reloadGrid');
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
$('#btn_export',t).click(function(){
    window.open(site_url+'excel/export_report_fund_budget')
})

$('#btn_pdf',t).click(function(){
    window.open(site_url+'pdf/export_report_fund_budget')
});
})