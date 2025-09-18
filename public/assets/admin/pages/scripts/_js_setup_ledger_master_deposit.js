var _master_ledger_deposit = $('#t_deposit_ledger');
var _jqgridMLD = $('#jqgrid_data_master_deposit_ledger');
var _p_jqgridMLD = "#jqgrid_data_master_deposit_ledger_pager";
var _portletsetupMLD = $('#setup',_master_ledger_deposit);
var _portletaddMLD = $('#add',_master_ledger_deposit);
var _portleteditMLD = $('#edit',_master_ledger_deposit);

// Setup
var SetupMLD = {
    init: function(){
        _jqgridMLD.jqGrid({
            url: site_url+'/master/jqgrid_master_ledger_deposit',
            mtype: "GET",
            datatype: "json",
            colModel: [
                { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
                { label: 'Fund Code', name: 'fund_code', align: "center", width: 150 },
                { label: 'Bank Cash Out', name: 'ledger_bank_cash_out', width: 100},
                { label: 'Bank Cash In', name: 'ledger_bank_cash_in', width: 100},
                { label: 'Nominal', name: 'ledger_nominal', width: 100},
                { label: 'Investment Return', name: 'ledger_investment_return', width: 100},
                { label: 'Receivable Investment', name: 'ledger_receivable_investment', width: 100},
                { label: 'Receivable Investment Return', name: 'ledger_receivable_investment_return', width: 100},
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
            pager: _p_jqgridMLD
        });
        $('#t_jqgrid_data_master_deposit_ledger').append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');

        // BtnAdd Click
        $('#btn_add',_master_ledger_deposit).click(function(){
            AddMLD.show();
        });
        // BtnEdit Click
        $('#btn_edit',_master_ledger_deposit).click(function(){
            var selrow = _jqgridMLD.jqGrid('getGridParam','selrow');
            if (selrow) {
                EditMLD.show();
                EditMLD.fillData(selrow);
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
        // BtnDelete Click
        $('#btn_delete',_master_ledger_deposit).click(function(){
            var selrow = _jqgridMLD.jqGrid('getGridParam','selrow');
            if (selrow) {
                Template.ConfirmAlert("Apakah anda yakin ingin menghapus data ini ?", function(){
                    SetupMLD.deleteData(selrow);
                });
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
    },
    show: function(){
        _portletaddMLD.hide();
        _portleteditMLD.hide();
        _portletsetupMLD.show();
    },
    reloadGrid: function(){
        _jqgridMLD.trigger('reloadGrid');
    },
    deleteData: function(id){
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_deposit_delete',
            success: function(response) {
                if (response.success==true) {
                    Template.SuccessAlert("Delete Master Deposit Ledger Success !", function(){
                        SetupMLD.reloadGrid();
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
var AddMLD = {
    init: function(){
        var FormAdd = $('form',_portletaddMLD);
        FormAdd.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code: {required:true},
                ledger_bank_cash_out: {required:true},
                ledger_bank_cash_in: {required:true},
                ledger_nominal: {required:true},
                ledger_investment_return: {required:true},
                ledger_receivable_investment: {required:true},
                ledger_receivable_investment_return: {required:true},
                ledger_bank_admin: {required:true}
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
                                content:'Add Master Deposit Ledger Success.',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    SetupMLD.reloadGrid();
                                    AddMLD.backToSetup();
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
        $('#btn_cancel',_portletaddMLD).click(function(){
            AddMLD.backToSetup();
        })
    },
    show: function(){
        _portletsetupMLD.hide();
        _portletaddMLD.show();
    },
    reset: function(){
        $('form',_portletaddMLD).trigger('reset');
        $('.chosen',_portletaddMLD).trigger('chosen:updated');
    },
    backToSetup: function(){
        AddMLD.reset();
        SetupMLD.show();
    }
}

// Edit
var EditMLD = {
    init: function(){
        var FormEdit = $('form',_portleteditMLD);
        FormEdit.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code: {required:true},
                ledger_bank_cash_out: {required:true},
                ledger_bank_cash_in: {required:true},
                ledger_nominal: {required:true},
                ledger_investment_return: {required:true},
                ledger_receivable_investment: {required:true},
                ledger_receivable_investment_return: {required:true},
                ledger_bank_admin: {required:true}
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
                            Template.SuccessAlert("Edit Master Deposit Ledger Success !", function(){
                                SetupMLD.reloadGrid();
                                EditMLD.backToSetup();
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
        $('#btn_cancel',_portleteditMLD).click(function(){
            EditMLD.backToSetup();
        });
    },
    show: function(){
        _portletsetupMLD.hide();
        _portleteditMLD.show();
    },
    fillData: function(id) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_deposit_get',
            success: function(response) {
                $('#id',_portleteditMLD).val(id);
                $('#fund_code',_portleteditMLD).val(response.fund_code);
                $('#ledger_bank_cash_out',_portleteditMLD).val(response.ledger_bank_cash_out);
                $('#ledger_bank_cash_in',_portleteditMLD).val(response.ledger_bank_cash_in);
                $('#ledger_nominal',_portleteditMLD).val(response.ledger_nominal);
                $('#ledger_investment_return',_portleteditMLD).val(response.ledger_investment_return);
                $('#ledger_receivable_investment',_portleteditMLD).val(response.ledger_receivable_investment);
                $('#ledger_receivable_investment_return',_portleteditMLD).val(response.ledger_receivable_investment_return);
                $('#ledger_bank_admin',_portleteditMLD).val(response.ledger_bank_admin);
                $('.chosen',_portleteditMLD).trigger('chosen:updated');
            },
            error: function(){
                Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
            }
        });
    },
    reset: function(){
        $('form',_portleteditMLD).trigger('reset');
        $('.chosen',_portleteditMLD).trigger('chosen:updated');
    },
    backToSetup: function(){
        EditMLD.reset();
        SetupMLD.show();
    }
}

$(function(){
    SetupMLD.init();
    AddMLD.init();
    EditMLD.init();
});