$(function(){

var t = $('#t_asset_allocation_budget');
var FormAdd = $('#FormAdd',t), FormEdit = $('#FormEdit',t);

/*
| BEGIN GRID
*/
$("#jqgrid_data_asset_alocation_budget",t).jqGrid({
    url: site_url+'/master/jqgrid_asset_allocation_policy',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Policy Effected Date', name: 'policy_effected_date', align: "center", width: 150 },
        { label: 'Policy Flag', name: 'policy_flag', width: 150, align:'left', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "1":
                return 'Government';
                break;
                case "2":
                return 'Company';
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Asset Class', name: 'asset_class_name', width: 150 },
        { label: 'Fund Code', name: 'fund_code_name', width: 150 },
        { label: 'Maximum Per Emiten', name: 'max_per_emiten', width: 175, align:'center', formatter:function(cellvalue){ return cellvalue+' %' }},
        { label: 'Maximum Per Party', name: 'max_per_party', width: 175, align:'center', formatter:function(cellvalue){ return cellvalue+' %' }},
        { label: 'Maximum Per Asset Class', name: 'max_per_asset_class', width: 175, align:'center',formatter:function(cellvalue){ return cellvalue+' %' }},
        { label: 'Valuation Basis', name: 'valuation_basis_name', width: 150 }
      
        
    ],
    viewrecords: true,
    width: 1058,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager_asset_allocation_budget"
});
$("#t_jqgrid_data_asset_alocation_budget",t).append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

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
       policy_effected_date:{required:true},
        policy_flag:{required:true},
        asset_class:{required:true},
        max_per_emiten:{required:true},
        max_per_party:{required:true},
        max_per_asset_class:{required:true},
        valuation_basis:{required:true}
        
          
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
                        content:'Add Asset Allocation Policy Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_data_asset_alocation_budget',t).trigger('reloadGrid');
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
    selrow = $('#jqgrid_data_asset_alocation_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/master/get_asset_allocation_policy',
            success:function(response){
                $('#jqgrid',t).hide();
                $('#edit',t).show();
                $('#id',FormEdit).val(response.id);
                $('#policy_effected_date',FormEdit).val(Template.ToDatePicker(response.policy_effected_date));
                $('#policy_flag',FormEdit).val(response.policy_flag);
                $('#asset_class',FormEdit).val(response.asset_class);
                $('#fund_code',FormEdit).val(response.fund_code);
                $('#max_per_emiten',FormEdit).val(response.max_per_emiten);
                $('#max_per_party',FormEdit).val(response.max_per_party);
                $('#max_per_asset_class',FormEdit).val(response.max_per_asset_class);
                $('#valuation_basis',FormEdit).val(response.valuation_basis);
                
                    
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
       policy_effected_date:{required:true},
        policy_flag:{required:true},
        asset_class:{required:true},
        fund_code:{required:true},
        max_per_emiten:{required:true},
        max_per_party:{required:true},
        max_per_asset_class:{required:true},
        valuation_basis:{required:true}
        
        
        
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
                        content:'Edit Asset Allocation Policy Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data_asset_alocation_budget',t).trigger('reloadGrid');
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
$('#btn_delete',t).click(function(){
    selrow = $('#jqgrid_data_asset_alocation_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Asset Allocation Policy Budget? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_asset_allocation_policy',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Asset Alloaction Policy Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#userfile',t).val('');
                                    $('#jqgrid_data_asset_alocation_budget',t).trigger('reloadGrid');
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
    window.open(site_url+'excel/export_report_asset_allocation_policy')
})

$('#btn_pdf',t).click(function(){
    window.open(site_url+'pdf/export_report_asset_allocation_policy')
});
})