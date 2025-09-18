var _master_ledger_mutualfund = $('#t_mutualfund_ledger');
var _jqgridMLM = $('#jqgrid_data_master_mutualfund_ledger');
var _p_jqgridMLM = "#jqgrid_data_master_mutualfund_ledger_pager";
var _portletsetupMLM = $('#setup',_master_ledger_mutualfund);
var _portletaddMLM = $('#add',_master_ledger_mutualfund);
var _portleteditMLM = $('#edit',_master_ledger_mutualfund);

// Setup
var SetupMLM = {
    init: function(){
        _jqgridMLM.jqGrid({
            url: site_url+'/master/jqgrid_master_ledger_mutualfund',
            mtype: "GET",
            datatype: "json",
            colModel: [
                { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
                { label: 'Fund Code', name: 'fund_code', align: "center", width: 150 },
                { label: 'Ledger Bank Cash Out', name: 'ledger_bank_cash_out', width: 100 },
                { label: 'Ledger Bank Cash In', name: 'ledger_bank_cash_in', width: 100 },
                { label: 'Ledger TRD Purchase Price', name: 'ledger_trd_purchase_price', width: 100 },
                { label: 'Ledger TRD Adjusted Price', name: 'ledger_trd_adjusted_price', width: 100 },
                { label: 'Ledger AFS Purchase Price', name: 'ledger_afs_purchase_price', width: 100 },
                { label: 'Ledger AFS Adjusted Price', name: 'ledger_afs_adjusted_price', width: 100 },
                { label: 'Ledger TRD Realized Investment Return', name: 'ledger_trd_relized_investment_return', width: 100 },
                { label: 'Ledger AFS Realized Investment', name: 'ledger_afs_relized_investment_return', width: 100 },
                { label: 'Ledger TRD Unrealized Investment Return', name: 'ledger_trd_unrelized_investment_return', width: 100 },
                { label: 'Ledger AFS Unrealized Investment Return', name: 'ledger_afs_unrelized_investment_return', width: 100 },
                { label: 'Ledger TRD Receivable Investment', name: 'ledger_trd_receivable_investment', width: 100 },
                { label: 'Ledger AFS Receivable Investment', name: 'ledger_afs_receivable_investment', width: 100 },
                { label: 'Ledger TRD Receivable Investment Return', name: 'ledger_trd_receivable_investment_return', width: 100 },
                { label: 'Ledger AFS Receivable Investment Return', name: 'ledger_afs_receivable_investment_return', width: 100 },
                { label: 'Ledger Bank Admin', name: 'ledger_bank_admin', width: 100 },
            ],
            viewrecords: true,
            // autowidth:true,
            width: 1058,
            height: 250,
            rowNum: 20,
            rownumbers: true,
            shrinkToFit: false,
            toolbar: [true, "top"],
            sortname: "id",
            sortorder: "asc",
            multiselect: false,
            pager: _p_jqgridMLM
        });
        $('#t_jqgrid_data_master_mutualfund_ledger').append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');

        // BtnAdd Click
        $('#btn_add',_master_ledger_mutualfund).click(function(){
            AddMLM.show();
        });
        // BtnEdit Click
        $('#btn_edit',_master_ledger_mutualfund).click(function(){
            var selrow = _jqgridMLM.jqGrid('getGridParam','selrow');
            if (selrow) {
                EditMLM.show();
                EditMLM.fillData(selrow);
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
        // BtnDelete Click
        $('#btn_delete',_master_ledger_mutualfund).click(function(){
            var selrow = _jqgridMLM.jqGrid('getGridParam','selrow');
            if (selrow) {
                Template.ConfirmAlert("Apakah anda yakin ingin menghapus data ini ?", function(){
                    SetupMLM.deleteData(selrow);
                });
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
    },
    show: function(){
        _portletaddMLM.hide();
        _portleteditMLM.hide();
        _portletsetupMLM.show();
    },
    reloadGrid: function(){
        _jqgridMLM.trigger('reloadGrid');
    },
    deleteData: function(id){
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_mutualfund_delete',
            success: function(response) {
                if (response.success==true) {
                    Template.SuccessAlert("Delete Master Mutual Fund Ledger Success !", function(){
                        SetupMLM.reloadGrid();
                    });
                } else {
                    Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
                }
            },
            error: function(){
                Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
            }
        });
    }
}

// ADD
var AddMLM = {
    init: function(){
        var FormAdd = $('form',_portletaddMLM);
        FormAdd.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code : {required: true},
                ledger_bank_cash_out : {required: true},
                ledger_bank_cash_in : {required: true},
                ledger_trd_purchase_price : {required: true},
                ledger_trd_adjusted_price : {required: true},
                ledger_afs_purchase_price : {required: true},
                ledger_afs_adjusted_price : {required: true},
                ledger_trd_relized_investment_return : {required: true},
                ledger_afs_relized_investment_return : {required: true},
                ledger_trd_unrelized_investment_return : {required: true},
                ledger_afs_unrelized_investment_return : {required: true},
                ledger_trd_receivable_investment : {required: true},
                ledger_afs_receivable_investment : {required: true},
                ledger_trd_receivable_investment_return : {required: true},
                ledger_afs_receivable_investment_return : {required: true},
                ledger_bank_admin : {required: true}
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
                                content:'Add Master Mutual Fund Ledger Success.',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    SetupMLM.reloadGrid();
                                    AddMLM.backToSetup();
                                }
                            })
                        }else{
                            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                        }
                    },
                    error: function(){
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                });
            }
        });
        
        // Back To Grid
        $('#btn_cancel',_portletaddMLM).click(function(){
            AddMLM.backToSetup();
        })
    },
    show: function(){
        _portletsetupMLM.hide();
        _portletaddMLM.show();
    },
    reset: function(){
        $('form',_portletaddMLM).trigger('reset');
        $('.chosen',_portletaddMLM).trigger('chosen:updated');
    },
    backToSetup: function(){
        AddMLM.reset();
        SetupMLM.show();
    }
}

// Edit
var EditMLM = {
    init: function(){
        var FormEdit = $('form',_portleteditMLM);
        FormEdit.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code: {required: true},
                ledger_bank_cash_out: {required: true},
                ledger_bank_cash_in: {required: true},
                ledger_trd_purchase_price: {required: true},
                ledger_trd_adjusted_price: {required: true},
                ledger_afs_purchase_price: {required: true},
                ledger_afs_adjusted_price: {required: true},
                ledger_trd_relized_investment_return: {required: true},
                ledger_afs_relized_investment_return: {required: true},
                ledger_trd_unrelized_investment_return: {required: true},
                ledger_afs_unrelized_investment_return: {required: true},
                ledger_trd_receivable_investment: {required: true},
                ledger_afs_receivable_investment: {required: true},
                ledger_trd_receivable_investment_return: {required: true},
                ledger_afs_receivable_investment_return: {required: true},
                ledger_bank_admin: {required: true}
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
                        if (response.success==true) {
                            Template.SuccessAlert("Edit Master Mutual Fund Ledger Success !", function(){
                                SetupMLM.reloadGrid();
                                EditMLM.backToSetup();
                            });
                        } else {
                            Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
                        }
                    },
                    error: function(){
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                });
            }
        });

        // Back To Grid
        $('#btn_cancel',_portleteditMLM).click(function(){
            EditMLM.backToSetup();
        });
    },
    show: function(){
        _portletsetupMLM.hide();
        _portleteditMLM.show();
    },
    fillData: function(id) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_mutualfund_get',
            success: function(response) {
                $('#id',_portleteditMLM).val(id);
                $('#fund_code',_portleteditMLM).val(response.fund_code);
                $('#ledger_bank_cash_out',_portleteditMLM).val(response.ledger_bank_cash_out);
                $('#ledger_bank_cash_in',_portleteditMLM).val(response.ledger_bank_cash_in);
                $('#ledger_trd_purchase_price',_portleteditMLM).val(response.ledger_trd_purchase_price);
                $('#ledger_trd_adjusted_price',_portleteditMLM).val(response.ledger_trd_adjusted_price);
                $('#ledger_afs_purchase_price',_portleteditMLM).val(response.ledger_afs_purchase_price);
                $('#ledger_afs_adjusted_price',_portleteditMLM).val(response.ledger_afs_adjusted_price);
                $('#ledger_trd_relized_investment_return',_portleteditMLM).val(response.ledger_trd_relized_investment_return);
                $('#ledger_afs_relized_investment_return',_portleteditMLM).val(response.ledger_afs_relized_investment_return);
                $('#ledger_trd_unrelized_investment_return',_portleteditMLM).val(response.ledger_trd_unrelized_investment_return);
                $('#ledger_afs_unrelized_investment_return',_portleteditMLM).val(response.ledger_afs_unrelized_investment_return);
                $('#ledger_trd_receivable_investment',_portleteditMLM).val(response.ledger_trd_receivable_investment);
                $('#ledger_afs_receivable_investment',_portleteditMLM).val(response.ledger_afs_receivable_investment);
                $('#ledger_trd_receivable_investment_return',_portleteditMLM).val(response.ledger_trd_receivable_investment_return);
                $('#ledger_afs_receivable_investment_return',_portleteditMLM).val(response.ledger_afs_receivable_investment_return);
                $('#ledger_bank_admin',_portleteditMLM).val(response.ledger_bank_admin);
                $('.chosen',_portleteditMLM).trigger('chosen:updated');
            },
            error: function(){
                Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
            }
        });
    },
    reset: function(){
        $('form',_portleteditMLM).trigger('reset');
        $('.chosen',_portleteditMLM).trigger('chosen:updated');
    },
    backToSetup: function(){
        EditMLM.reset();
        SetupMLM.show();
    }
}

$(function(){
    SetupMLM.init();
    AddMLM.init();
    EditMLM.init();
});