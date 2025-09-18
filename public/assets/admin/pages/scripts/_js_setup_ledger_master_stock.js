var _master_ledger_stock = $('#t_stock_ledger');
var _jqgridMLS = $('#jqgrid_data_master_stock_ledger');
var _p_jqgridMLS = "#jqgrid_data_master_stock_ledger_pager";
var _portletsetupMLS = $('#setup',_master_ledger_stock);
var _portletaddMLS = $('#add',_master_ledger_stock);
var _portleteditMLS = $('#edit',_master_ledger_stock);

// Setup
var SetupMLS = {
    init: function(){
        _jqgridMLS.jqGrid({
            url: site_url+'/master/jqgrid_master_ledger_stock',
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
            pager: _p_jqgridMLS
        });
        $('#t_jqgrid_data_master_stock_ledger').append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');

        // BtnAdd Click
        $('#btn_add',_master_ledger_stock).click(function(){
            AddMLS.show();
        });
        // BtnEdit Click
        $('#btn_edit',_master_ledger_stock).click(function(){
            var selrow = _jqgridMLS.jqGrid('getGridParam','selrow');
            if (selrow) {
                EditMLS.show();
                EditMLS.fillData(selrow);
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
        // BtnDelete Click
        $('#btn_delete',_master_ledger_stock).click(function(){
            var selrow = _jqgridMLS.jqGrid('getGridParam','selrow');
            if (selrow) {
                Template.ConfirmAlert("Apakah anda yakin ingin menghapus data ini ?", function(){
                    SetupMLS.deleteData(selrow);
                });
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
    },
    show: function(){
        _portletaddMLS.hide();
        _portleteditMLS.hide();
        _portletsetupMLS.show();
    },
    reloadGrid: function(){
        _jqgridMLS.trigger('reloadGrid');
    },
    deleteData: function(id){
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_stock_delete',
            success: function(response) {
                if (response.success==true) {
                    Template.SuccessAlert("Delete Master Stock Ledger Success !", function(){
                        SetupMLS.reloadGrid();
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
var AddMLS = {
    init: function(){
        var FormAdd = $('form',_portletaddMLS);
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
                                content:'Add Master Stock Ledger Success.',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    SetupMLS.reloadGrid();
                                    AddMLS.backToSetup();
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
        $('#btn_cancel',_portletaddMLS).click(function(){
            AddMLS.backToSetup();
        })
    },
    show: function(){
        _portletsetupMLS.hide();
        _portletaddMLS.show();
    },
    reset: function(){
        $('form',_portletaddMLS).trigger('reset');
        $('.chosen',_portletaddMLS).trigger('chosen:updated');
    },
    backToSetup: function(){
        AddMLS.reset();
        SetupMLS.show();
    }
}

// Edit
var EditMLS = {
    init: function(){
        var FormEdit = $('form',_portleteditMLS);
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
                            Template.SuccessAlert("Edit Master Stock Ledger Success !", function(){
                                SetupMLS.reloadGrid();
                                EditMLS.backToSetup();
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
        $('#btn_cancel',_portleteditMLS).click(function(){
            EditMLS.backToSetup();
        });
    },
    show: function(){
        _portletsetupMLS.hide();
        _portleteditMLS.show();
    },
    fillData: function(id) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_stock_get',
            success: function(response) {
                $('#id',_portleteditMLS).val(id);
                $('#fund_code',_portleteditMLS).val(response.fund_code);
                $('#ledger_bank_cash_out',_portleteditMLS).val(response.ledger_bank_cash_out);
                $('#ledger_bank_cash_in',_portleteditMLS).val(response.ledger_bank_cash_in);
                $('#ledger_trd_purchase_price',_portleteditMLS).val(response.ledger_trd_purchase_price);
                $('#ledger_trd_adjusted_price',_portleteditMLS).val(response.ledger_trd_adjusted_price);
                $('#ledger_afs_purchase_price',_portleteditMLS).val(response.ledger_afs_purchase_price);
                $('#ledger_afs_adjusted_price',_portleteditMLS).val(response.ledger_afs_adjusted_price);
                $('#ledger_trd_relized_investment_return',_portleteditMLS).val(response.ledger_trd_relized_investment_return);
                $('#ledger_afs_relized_investment_return',_portleteditMLS).val(response.ledger_afs_relized_investment_return);
                $('#ledger_trd_unrelized_investment_return',_portleteditMLS).val(response.ledger_trd_unrelized_investment_return);
                $('#ledger_afs_unrelized_investment_return',_portleteditMLS).val(response.ledger_afs_unrelized_investment_return);
                $('#ledger_trd_receivable_investment',_portleteditMLS).val(response.ledger_trd_receivable_investment);
                $('#ledger_afs_receivable_investment',_portleteditMLS).val(response.ledger_afs_receivable_investment);
                $('#ledger_trd_receivable_investment_return',_portleteditMLS).val(response.ledger_trd_receivable_investment_return);
                $('#ledger_afs_receivable_investment_return',_portleteditMLS).val(response.ledger_afs_receivable_investment_return);
                $('#ledger_bank_admin',_portleteditMLS).val(response.ledger_bank_admin);
                $('.chosen',_portleteditMLS).trigger('chosen:updated');
            },
            error: function(){
                Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
            }
        });
    },
    reset: function(){
        $('form',_portleteditMLS).trigger('reset');
        $('.chosen',_portleteditMLS).trigger('chosen:updated');
    },
    backToSetup: function(){
        EditMLS.reset();
        SetupMLS.show();
    }
}

$(function(){
    SetupMLS.init();
    AddMLS.init();
    EditMLS.init();
});