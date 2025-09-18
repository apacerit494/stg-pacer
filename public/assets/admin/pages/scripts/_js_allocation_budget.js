$(function(){

var t = $('#t_allocation_budget');
var FormAdd = $('#FormAdd',t), FormEdit = $('#FormEdit',t);

/*
| BEGIN GRID
*/
$("#jqgrid_data_allocation_budget",t).jqGrid({
    url: site_url+'/master/jqgrid_master_allocation_budget',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Budget Year', name: 'budget_year', align: "center", width: 100 },
        { label: 'Fund Code', name: 'fund_code', align: "center", width: 100 },
        { label: 'Budget Level', name: 'budget_level', width: 150 },
        { label: 'Return Projection - Deposit Account', name: 'rp_deposit', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Return Projection - Bond', name: 'rp_bond', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Return Projection - Mutual Fund Fix Income', name: 'rp_mf_fix', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }},
        { label: 'Return Projection - Mutual Fund Balance', name: 'rp_mf_balance', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Return Projection - Mutual Fund Equity', name: 'rp_mf_equity', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Return Projection - Mutual Fund Terproteksi', name: 'rp_mf_protected', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Return Projection - Mutual Fund RDPT', name: 'rp_mf_rdpt', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Return Projection - Stock', name: 'rp_stock', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        
        { label: 'Return Projection - SBSN', name: 'rp_sbsn', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - SBI', name: 'rp_sbi', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - EBA/EBAS', name: 'rp_ebas', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - KIK', name: 'rp_kik', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - Pembiayaan', name: 'rp_pembiayaan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - Emas', name: 'rp_emas', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - Tanah', name: 'rp_tanah', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - Bangunan', name: 'rp_bangunan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - KSO', name: 'rp_kso', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Return Projection - Penyertaan', name: 'rp_penyertaan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
                

        { label: 'Asset Allocation - Deposit Account', name: 'aa_deposit', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Bond', name: 'aa_bond', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Mutual Fund Fix Incom', name: 'aa_mf_fix', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Mutual Fund Balanc', name: 'aa_mf_balance', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Mutual Fund Equity', name: 'aa_mf_equity', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Mutual Fund Terproteksi', name: 'aa_mf_protected', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Mutual Fund RDPT', name: 'aa_mf_rdpt', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Stock', name: 'aa_stock', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        
        { label: 'Asset Allocation - SBSN', name: 'aa_sbsn', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - SBI', name: 'aa_sbi', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocationn - EBA/EBAS', name: 'aa_ebas', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - KIK', name: 'aa_kik', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Pembiayaan', name: 'aa_pembiayaan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Emas', name: 'aa_emas', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Tanah', name: 'aa_tanah', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Bangunan', name: 'aa_bangunan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - KSO', name: 'aa_kso', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Asset Allocation - Penyertaan', name: 'aa_penyertaan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
                
        { label: 'Tax - Deposit Account', name: 'tax_deposit', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Bond', name: 'tax_bond', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }},
        { label: 'Tax - Mutual Fund Fix Income', name: 'tax_mf_fix', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } },
        { label: 'Tax - Mutual Fund Balance', name: 'tax_mf_balance', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Mutual Fund Equity', name: 'tax_mf_equity', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Mutual Fund Terproteksi', name: 'tax_mf_protected', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Mutual Fund RDPT', name: 'tax_mf_rdpt', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Stock', name: 'tax_stock', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        
        { label: 'Tax - SBSN', name: 'tax_sbsn', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - SBI', name: 'tax_sbi', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - EBA/EBAS', name: 'tax_ebas', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - KIK', name: 'tax_kik', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Pembiayaan', name: 'tax_pembiayaan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Emas', name: 'tax_emas', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Tanah', name: 'tax_tanah', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Bangunan', name: 'tax_bangunan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - KSO', name: 'tax_kso', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Tax - Penyertaan', name: 'tax_penyertaan', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
                
        { label: 'High Risk Allocation', name: 'high_risk_allocation_range', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Gross Expected Return', name: 'gross_expected_return', width: 175, formatter:function(cellvalue){ return cellvalue+'%' }  },
        { label: 'Nett Expected Return', name: 'nett_expected_return', width: 175, formatter:function(cellvalue){ return cellvalue+'%' } }
        
        
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
    pager: "#jqgrid_data_pager_allocation_budget"
});

$("#t_jqgrid_data_allocation_budget",t).append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
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
        fund_group_code:{required:true},
        budget_level:{required:true},
        rp_deposit:{required:true},
        rp_bond:{required:true},
        rp_mf_fix:{required:true},
        rp_mf_balance:{required:true},
        rp_mf_equity:{required:true},
        rp_mf_protected:{required:true},
        rp_mf_rdpt:{required:true},
        rp_stock:{required:true},
        
        rp_sbsn:{required:true},
        rp_sbi:{required:true},
        rp_ebas:{required:true},
        rp_kik:{required:true},
        rp_pembiayaan:{required:true},
        rp_emas:{required:true},
        rp_tanah:{required:true},
        rp_bangunan:{required:true},
        rp_kso:{required:true},
        rp_penyertaan:{required:true},
        
        aa_deposit:{required:true},
        aa_bond:{required:true},
        aa_mf_fix:{required:true},
        aa_mf_balance:{required:true},
        aa_mf_equity:{required:true},
        aa_mf_protected:{required:true},
        aa_mf_rdpt:{required:true},
        aa_stock:{required:true},
        
        aa_sbsn:{required:true},
        aa_sbi:{required:true},
        aa_ebas:{required:true},
        aa_kik:{required:true},
        aa_pembiayaan:{required:true},
        aa_emas:{required:true},
        aa_tanah:{required:true},
        aa_bangunan:{required:true},
        aa_kso:{required:true},
        aa_penyertaan:{required:true},

        tax_deposit:{required:true},
        tax_bond:{required:true},
        tax_mf_fix:{required:true},
        tax_mf_balance:{required:true},
        tax_mf_equity:{required:true},
        tax_mf_protected:{required:true},
        tax_mf_rdpt:{required:true},
        tax_stock:{required:true},
        
        tax_sbsn:{required:true},
        tax_sbi:{required:true},
        tax_ebas:{required:true},
        tax_kik:{required:true},
        tax_pembiayaan:{required:true},
        tax_emas:{required:true},
        tax_tanah:{required:true},
        tax_bangunan:{required:true},
        tax_kso:{required:true},
        tax_penyertaan:{required:true}
          
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
                        content:'Add Master Allocation Budget Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_data_allocation_budget',t).trigger('reloadGrid');
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
    selrow = $('#jqgrid_data_allocation_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/master/get_master_allocation_budget',
            success:function(response){
                $('#jqgrid',t).hide();
                $('#edit',t).show();
                $('#id',FormEdit).val(response.id);
                $('#budget_year',FormEdit).val(response.budget_year);
                $('#fund_group_code',FormEdit).val(response.fund_code);
                $('#budget_level',FormEdit).val(response.budget_level);

                $('#rp_deposit',FormEdit).val((response.rp_deposit));
                $('#rp_bond',FormEdit).val((response.rp_bond));
                $('#rp_mf_fix',FormEdit).val((response.rp_mf_fix));
                $('#rp_mf_balance',FormEdit).val((response.rp_mf_balance));
                $('#rp_mf_equity',FormEdit).val((response.rp_mf_equity));
                $('#rp_mf_protected',FormEdit).val((response.rp_mf_protected));
                $('#rp_mf_rdpt',FormEdit).val((response.rp_mf_rdpt));
                $('#rp_stock',FormEdit).val((response.rp_stock));
                
                $('#rp_sbsn',FormEdit).val((response.rp_sbsn));
                $('#rp_sbi',FormEdit).val((response.rp_sbi));
                $('#rp_ebas',FormEdit).val((response.rp_ebas));
                $('#rp_kik',FormEdit).val((response.rp_kik));
                $('#rp_pembiayaan',FormEdit).val((response.rp_pembiayaan));
                $('#rp_emas',FormEdit).val((response.rp_emas));
                $('#rp_tanah',FormEdit).val((response.rp_tanah));
                $('#rp_bangunan',FormEdit).val((response.rp_bangunan));
                $('#rp_kso',FormEdit).val((response.rp_kso));
                $('#rp_penyertaan',FormEdit).val((response.rp_penyertaan));
                
                $('#aa_deposit',FormEdit).val((response.aa_deposit));
                $('#aa_bond',FormEdit).val((response.aa_bond));
                $('#aa_mf_fix',FormEdit).val((response.aa_mf_fix));
                $('#aa_mf_balance',FormEdit).val((response.aa_mf_balance));
                $('#aa_mf_equity',FormEdit).val((response.aa_mf_equity));
                $('#aa_mf_protected',FormEdit).val((response.aa_mf_protected));
                $('#aa_mf_rdpt',FormEdit).val((response.aa_mf_rdpt));
                $('#aa_stock',FormEdit).val((response.aa_stock));
                

                $('#aa_sbsn',FormEdit).val((response.aa_sbsn));
                $('#aa_sbi',FormEdit).val((response.aa_sbi));
                $('#aa_ebas',FormEdit).val((response.aa_ebas));
                $('#aa_kik',FormEdit).val((response.aa_kik));
                $('#aa_pembiayaan',FormEdit).val((response.aa_pembiayaan));
                $('#aa_emas',FormEdit).val((response.aa_emas));
                $('#aa_tanah',FormEdit).val((response.aa_tanah));
                $('#aa_bangunan',FormEdit).val((response.aa_bangunan));
                $('#aa_kso',FormEdit).val((response.aa_kso));
                $('#aa_penyertaan',FormEdit).val((response.aa_penyertaan));

                $('#tax_deposit',FormEdit).val((response.tax_deposit));
                $('#tax_bond',FormEdit).val((response.tax_bond));
                $('#tax_mf_fix',FormEdit).val((response.tax_mf_fix));
                $('#tax_mf_balance',FormEdit).val((response.tax_mf_balance));
                $('#tax_mf_equity',FormEdit).val((response.tax_mf_equity));
                $('#tax_mf_protected',FormEdit).val((response.tax_mf_protected));
                $('#tax_mf_rdpt',FormEdit).val((response.tax_mf_rdpt));
                $('#tax_stock',FormEdit).val((response.tax_stock));
                
                $('#tax_sbsn',FormEdit).val((response.tax_sbsn));
                $('#tax_sbi',FormEdit).val((response.tax_sbi));
                $('#tax_ebas',FormEdit).val((response.tax_ebas));
                $('#tax_kik',FormEdit).val((response.tax_kik));
                $('#tax_pembiayaan',FormEdit).val((response.tax_pembiayaan));
                $('#tax_emas',FormEdit).val((response.tax_emas));
                $('#tax_tanah',FormEdit).val((response.tax_tanah));
                $('#tax_bangunan',FormEdit).val((response.tax_bangunan));
                $('#tax_kso',FormEdit).val((response.tax_kso));
                $('#tax_penyertaan',FormEdit).val((response.tax_penyertaan));

                    
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
        fund_group_code:{required:true},
        budget_level:{required:true},
        rp_deposit:{required:true},
        rp_bond:{required:true},
        rp_mf_fix:{required:true},
        rp_mf_balance:{required:true},
        rp_mf_equity:{required:true},
        rp_mf_protected:{required:true},
        rp_mf_rdpt:{required:true},
        rp_stock:{required:true},
        
        rp_sbsn:{required:true},
        rp_sbi:{required:true},
        rp_ebas:{required:true},
        rp_kik:{required:true},
        rp_pembiayaan:{required:true},
        rp_emas:{required:true},
        rp_tanah:{required:true},
        rp_bangunan:{required:true},
        rp_kso:{required:true},
        rp_penyertaan:{required:true},
        
        aa_deposit:{required:true},
        aa_bond:{required:true},
        aa_mf_fix:{required:true},
        aa_mf_balance:{required:true},
        aa_mf_equity:{required:true},
        aa_mf_protected:{required:true},
        aa_mf_rdpt:{required:true},
        aa_stock:{required:true},
        
        aa_sbsn:{required:true},
        aa_sbi:{required:true},
        aa_ebas:{required:true},
        aa_kik:{required:true},
        aa_pembiayaan:{required:true},
        aa_emas:{required:true},
        aa_tanah:{required:true},
        aa_bangunan:{required:true},
        aa_kso:{required:true},
        aa_penyertaan:{required:true},

        tax_deposit:{required:true},
        tax_bond:{required:true},
        tax_mf_fix:{required:true},
        tax_mf_balance:{required:true},
        tax_mf_equity:{required:true},
        tax_mf_protected:{required:true},
        tax_mf_rdpt:{required:true},
        tax_stock:{required:true},
        
        tax_sbsn:{required:true},
        tax_sbi:{required:true},
        tax_ebas:{required:true},
        tax_kik:{required:true},
        tax_pembiayaan:{required:true},
        tax_emas:{required:true},
        tax_tanah:{required:true},
        tax_bangunan:{required:true},
        tax_kso:{required:true},
        tax_penyertaan:{required:true}
        
        
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
                        content:'Edit Master Allocation Budget Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data_allocation_budget',t).trigger('reloadGrid');
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
    selrow = $('#jqgrid_data_allocation_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Master Allocation Budget? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_master_allocation_budget',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Master Code Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#userfile',t).val('');
                                    $('#jqgrid_data_allocation_budget',t).trigger('reloadGrid');
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
    // window.open(site_url+'excel/export_report_allocation_budget')
    selrow = $('#jqgrid_data_allocation_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        data = $('#jqgrid_data_allocation_budget',t).jqGrid('getRowData',selrow);
        year = data.budget_year;
        window.open(site_url+'excel/investment_budget/'+year);
    } else {
        Template.WarningAlert('No row selected!');
    }
})

$('#btn_pdf',t).click(function(){ 
    selrow = $('#jqgrid_data_allocation_budget',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        data = $('#jqgrid_data_allocation_budget',t).jqGrid('getRowData',selrow);
        year = data.budget_year;
        window.open(site_url+'pdf/export_report_allocation_budget/'+year)
    } else {
        Template.WarningAlert('No row selected!');
    }
});

})