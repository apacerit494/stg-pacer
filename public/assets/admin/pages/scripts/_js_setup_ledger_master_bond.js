var _master_ledger_bond = $('#t_bond_ledger');
var _jqgridMLB = $('#jqgrid_data_master_bond_ledger');
var _p_jqgridMLB = "#jqgrid_data_master_bond_ledger_pager";
var _portletsetupMLB = $('#setup',_master_ledger_bond);
var _portletaddMLB = $('#add',_master_ledger_bond);
var _portleteditMLB = $('#edit',_master_ledger_bond);

// Setup
var SetupMLB = {
    init: function(){
        _jqgridMLB.jqGrid({
            url: site_url+'/master/jqgrid_master_ledger_bond',
            mtype: "GET",
            datatype: "json",
            colModel: [
                { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
                { label: 'Fund Code', name: 'fund_code', align: "center", width: 150 },
                { label: 'Bank Cash Out', name: 'ledger_bank_cash_out', width: 100},
                { label: 'Bank Cash In', name: 'ledger_bank_cash_in', width: 100},
                { label: 'Ledger HTM Nominal', name: 'ledger_htm_nominal', width: 100},
                { label: 'Ledger HTM Diskon Premium', name: 'ledger_htm_diskon_premium', width: 100},
                { label: 'Ledger TRD Purchase Price', name: 'ledger_trd_purchase_price', width: 100},
                { label: 'Ledger TRD Adjusted Price', name: 'ledger_trd_adjusted_price', width: 100},
                { label: 'Ledger AFS Purchase Price', name: 'ledger_afs_purchase_price', width: 100},
                { label: 'Ledger AFS Adjusted Price', name: 'ledger_afs_adjusted_price', width: 100},
                { label: 'Ledger HTM Realized Investment Return', name: 'ledger_htm_relized_investment_return', width: 100},
                { label: 'Ledger TRD Realized Investment Return', name: 'ledger_trd_relized_investment_return', width: 100},
                { label: 'Ledger AFS Realized Investment Return', name: 'ledger_afs_relized_investment_return', width: 100},
                { label: 'Ledger HTM Unrealized Investment Return', name: 'ledger_htm_unrelized_investment_return', width: 100},
                { label: 'Ledger TRD Unrealized Investment Return', name: 'ledger_trd_unrelized_investment_return', width: 100},
                { label: 'Ledger AFS Unrealized Investment Return', name: 'ledger_afs_unrelized_investment_return', width: 100},
                { label: 'Ledger HTM Receivable Investment', name: 'ledger_htm_receivable_investment', width: 100},
                { label: 'Ledger TRD Receivable Investment', name: 'ledger_trd_receivable_investment', width: 100},
                { label: 'Ledger AFS Receivable Investment', name: 'ledger_afs_receivable_investment', width: 100},
                { label: 'Ledger HTM Receivable Investment Return', name: 'ledger_htm_receivable_investment_return', width: 100},
                { label: 'Ledger TRD Receivable Investment Return', name: 'ledger_trd_receivable_investment_return', width: 100},
                { label: 'Ledger AFS Receivable Investment Return', name: 'ledger_afs_receivable_investment_return', width: 100},
                { label: 'Bank Admin', name: 'ledger_bank_admin', width: 100},
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
            pager: _p_jqgridMLB
        });
        $('#t_jqgrid_data_master_bond_ledger').append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');

        // BtnAdd Click
        $('#btn_add',_master_ledger_bond).click(function(){
            AddMLB.show();
        });
        // BtnEdit Click
        $('#btn_edit',_master_ledger_bond).click(function(){
            var selrow = _jqgridMLB.jqGrid('getGridParam','selrow');
            if (selrow) {
                EditMLB.show();
                EditMLB.fillData(selrow);
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
        // BtnDelete Click
        $('#btn_delete',_master_ledger_bond).click(function(){
            var selrow = _jqgridMLB.jqGrid('getGridParam','selrow');
            if (selrow) {
                Template.ConfirmAlert("Apakah anda yakin ingin menghapus data ini ?", function(){
                    SetupMLB.deleteData(selrow);
                });
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
    },
    show: function(){
        _portletaddMLB.hide();
        _portleteditMLB.hide();
        _portletsetupMLB.show();
    },
    reloadGrid: function(){
        _jqgridMLB.trigger('reloadGrid');
    },
    deleteData: function(id){
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_bond_delete',
            success: function(response) {
                if (response.success==true) {
                    Template.SuccessAlert("Delete Master Bond Ledger Success !", function(){
                        SetupMLB.reloadGrid();
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
var AddMLB = {
    init: function(){
        var FormAdd = $('form',_portletaddMLB);
        FormAdd.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code: {required: true},
                ledger_bank_cash_out: {required: true},
                ledger_bank_cash_in: {required: true},
                ledger_htm_nominal: {required: true},
                ledger_htm_diskon_premium: {required: true},
                ledger_trd_purchase_price: {required: true},
                ledger_trd_adjusted_price: {required: true},
                ledger_afs_purchase_price: {required: true},
                ledger_afs_adjusted_price: {required: true},
                ledger_htm_relized_investment_return: {required: true},
                ledger_trd_relized_investment_return: {required: true},
                ledger_afs_relized_investment_return: {required: true},
                ledger_htm_unrelized_investment_return: {required: true},
                ledger_trd_unrelized_investment_return: {required: true},
                ledger_afs_unrelized_investment_return: {required: true},
                ledger_htm_receivable_investment: {required: true},
                ledger_trd_receivable_investment: {required: true},
                ledger_afs_receivable_investment: {required: true},
                ledger_htm_receivable_investment_return: {required: true},
                ledger_trd_receivable_investment_return: {required: true},
                ledger_afs_receivable_investment_return: {required: true},
                ledger_bank_admin: {required: true}
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
                                content:'Add Master Bond Ledger Success.',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    SetupMLB.reloadGrid();
                                    AddMLB.backToSetup();
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
        $('#btn_cancel',_portletaddMLB).click(function(){
            AddMLB.backToSetup();
        })
    },
    show: function(){
        _portletsetupMLB.hide();
        _portletaddMLB.show();
    },
    reset: function(){
        $('form',_portletaddMLB).trigger('reset');
        $('.chosen',_portletaddMLB).trigger('chosen:updated');
    },
    backToSetup: function(){
        AddMLB.reset();
        SetupMLB.show();
    }
}

// Edit
var EditMLB = {
    init: function(){
        var FormEdit = $('form',_portleteditMLB);
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
                ledger_htm_nominal: {required: true},
                ledger_htm_diskon_premium: {required: true},
                ledger_trd_purchase_price: {required: true},
                ledger_trd_adjusted_price: {required: true},
                ledger_afs_purchase_price: {required: true},
                ledger_afs_adjusted_price: {required: true},
                ledger_htm_relized_investment_return: {required: true},
                ledger_trd_relized_investment_return: {required: true},
                ledger_afs_relized_investment_return: {required: true},
                ledger_htm_unrelized_investment_return: {required: true},
                ledger_trd_unrelized_investment_return: {required: true},
                ledger_afs_unrelized_investment_return: {required: true},
                ledger_htm_receivable_investment: {required: true},
                ledger_trd_receivable_investment: {required: true},
                ledger_afs_receivable_investment: {required: true},
                ledger_htm_receivable_investment_return: {required: true},
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
                            Template.SuccessAlert("Edit Master Bond Ledger Success !", function(){
                                SetupMLB.reloadGrid();
                                EditMLB.backToSetup();
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
        $('#btn_cancel',_portleteditMLB).click(function(){
            EditMLB.backToSetup();
        });
    },
    show: function(){
        _portletsetupMLB.hide();
        _portleteditMLB.show();
    },
    fillData: function(id) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_bond_get',
            success: function(response) {
                $('#id',_portleteditMLB).val(id);
                $('#fund_code',_portleteditMLB).val(response.fund_code);
                $('#ledger_bank_cash_out',_portleteditMLB).val(response.ledger_bank_cash_out);
                $('#ledger_bank_cash_in',_portleteditMLB).val(response.ledger_bank_cash_in);
                $('#ledger_htm_nominal',_portleteditMLB).val(response.ledger_htm_nominal);
                $('#ledger_htm_diskon_premium',_portleteditMLB).val(response.ledger_htm_diskon_premium);
                $('#ledger_trd_purchase_price',_portleteditMLB).val(response.ledger_trd_purchase_price);
                $('#ledger_trd_adjusted_price',_portleteditMLB).val(response.ledger_trd_adjusted_price);
                $('#ledger_afs_purchase_price',_portleteditMLB).val(response.ledger_afs_purchase_price);
                $('#ledger_afs_adjusted_price',_portleteditMLB).val(response.ledger_afs_adjusted_price);
                $('#ledger_htm_relized_investment_return',_portleteditMLB).val(response.ledger_htm_relized_investment_return);
                $('#ledger_trd_relized_investment_return',_portleteditMLB).val(response.ledger_trd_relized_investment_return);
                $('#ledger_afs_relized_investment_return',_portleteditMLB).val(response.ledger_afs_relized_investment_return);
                $('#ledger_htm_unrelized_investment_return',_portleteditMLB).val(response.ledger_htm_unrelized_investment_return);
                $('#ledger_trd_unrelized_investment_return',_portleteditMLB).val(response.ledger_trd_unrelized_investment_return);
                $('#ledger_afs_unrelized_investment_return',_portleteditMLB).val(response.ledger_afs_unrelized_investment_return);
                $('#ledger_htm_receivable_investment',_portleteditMLB).val(response.ledger_htm_receivable_investment);
                $('#ledger_trd_receivable_investment',_portleteditMLB).val(response.ledger_trd_receivable_investment);
                $('#ledger_afs_receivable_investment',_portleteditMLB).val(response.ledger_afs_receivable_investment);
                $('#ledger_htm_receivable_investment_return',_portleteditMLB).val(response.ledger_htm_receivable_investment_return);
                $('#ledger_trd_receivable_investment_return',_portleteditMLB).val(response.ledger_trd_receivable_investment_return);
                $('#ledger_afs_receivable_investment_return',_portleteditMLB).val(response.ledger_afs_receivable_investment_return);
                $('#ledger_bank_admin',_portleteditMLB).val(response.ledger_bank_admin);
                $('.chosen',_portleteditMLB).trigger('chosen:updated');
            },
            error: function(){
                Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
            }
        });
    },
    reset: function(){
        $('form',_portleteditMLB).trigger('reset');
        $('.chosen',_portleteditMLB).trigger('chosen:updated');
    },
    backToSetup: function(){
        EditMLB.reset();
        SetupMLB.show();
    }
}

$(function(){
    SetupMLB.init();
    AddMLB.init();
    EditMLB.init();
});