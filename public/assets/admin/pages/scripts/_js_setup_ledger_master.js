var _master_ledger = $('#t_master_ledger');
var _jqgridML = $('#jqgrid_data_master_ledger');
var _p_jqgridML = "#jqgrid_data_master_ledger_pager";
var _portletsetupML = $('#setup',_master_ledger);
var _portletaddML = $('#add',_master_ledger);
var _portleteditML = $('#edit',_master_ledger);

// Setup
var SetupML = {
    init: function(){
        _jqgridML.jqGrid({
            url: site_url+'/master/jqgrid_master_ledger',
            mtype: "GET",
            datatype: "json",
            colModel: [
                { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
                { label: 'Fund Code', name: 'fund_code', align: "center", width: 150 },
                { label: 'Ledger Code', name: 'ledger_code', width: 100 },
                { label: 'Ledger Name', name: 'ledger_name', width: 200 },
            ],
            viewrecords: true,
            autowidth:true,
            height: 250,
            rowNum: 20,
            rownumbers: true,
            shrinkToFit: false,
            toolbar: [true, "top"],
            sortname: "id",
            sortorder: "asc",
            multiselect: false,
            pager: _p_jqgridML
        });
        $('#t_jqgrid_data_master_ledger').append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');

        // BtnAdd Click
        $('#btn_add',_master_ledger).click(function(){
            AddML.show();
        });
        // BtnEdit Click
        $('#btn_edit',_master_ledger).click(function(){
            var selrow = _jqgridML.jqGrid('getGridParam','selrow');
            if (selrow) {
                EditML.show();
                EditML.fillData(selrow);
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
        // BtnDelete Click
        $('#btn_delete',_master_ledger).click(function(){
            var selrow = _jqgridML.jqGrid('getGridParam','selrow');
            if (selrow) {
                Template.ConfirmAlert("Apakah anda yakin ingin menghapus data ini ?", function(){
                    SetupML.deleteData(selrow);
                });
            } else {
                Template.WarningAlert("Please select a row !");
            }
        });
    },
    show: function(){
        _portletaddML.hide();
        _portleteditML.hide();
        _portletsetupML.show();
    },
    reloadGrid: function(){
        _jqgridML.trigger('reloadGrid');
    },
    deleteData: function(id){
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_delete',
            success: function(response) {
                if (response.success==true) {
                    Template.SuccessAlert("Delete Master Ledger Success !", function(){
                        SetupML.reloadGrid();
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
var AddML = {
    init: function(){
        var FormAdd = $('form',_portletaddML);
        FormAdd.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code:{required:true},
                ledger_code:{required:true},
                ledger_name:{required:true}
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
                                content:'Add Master Ledger Success.',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    SetupML.reloadGrid();
                                    AddML.backToSetup();
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
        $('#btn_cancel',_portletaddML).click(function(){
            AddML.backToSetup();
        })
    },
    show: function(){
        _portletsetupML.hide();
        _portletaddML.show();
    },
    reset: function(){
        $('form',_portletaddML).trigger('reset');
    },
    backToSetup: function(){
        AddML.reset();
        SetupML.show();
    }
}

// Edit
var EditML = {
    init: function(){
        var FormEdit = $('form',_portleteditML);
        FormEdit.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-inline', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            errorPlacement: function(a,b){},
            // ignore: "",
            rules: {
                fund_code:{required:true},
                ledger_code:{required:true},
                ledger_name:{required:true}
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
                            Template.SuccessAlert("Edit Master Ledger Success !", function(){
                                SetupML.reloadGrid();
                                EditML.backToSetup();
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
        $('#btn_cancel',_portleteditML).click(function(){
            EditML.backToSetup();
        });
    },
    show: function(){
        _portletsetupML.hide();
        _portleteditML.show();
    },
    fillData: function(id) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:id},
            url:site_url+'master/setup_ledger_master_get',
            success: function(response) {
                $('#id',_portleteditML).val(id);
                $('#fund_code',_portleteditML).val(response.fund_code);
                $('#ledger_code',_portleteditML).val(response.ledger_code);
                $('#ledger_name',_portleteditML).val(response.ledger_name);
            },
            error: function(){
                Template.WarningAlert("Failed to connect into database, Please contact Your Administrator !");
            }
        });
    },
    backToSetup: function(){
        EditML.show();
        SetupML.show();
    }
}

$(function(){
    SetupML.init();
    AddML.init();
    EditML.init();
});