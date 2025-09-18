$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/master/jqgrid_bank',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Bank Code', name: 'bank_code', align: "center", width: 100 },
        { label: 'Bank Name', name: 'bank_name', width: 150 },
        { label: 'Bank Type', name: 'bank_type', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "1":
                return 'Bank Pemerintah Devisa';
                break;
                case "2":
                return 'Bank Pemerintah Non Devisa';
                break;
                case "3":
                return 'Bank Swasta Devisa';
                break;
                case "4":
                return 'Bank Swasta Non Devisa';
                break;
                case "5":
                return 'Bank Pemerintah Daerah';
                break;
                case "6":
                return 'Bank BPR/BPRS';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Bank Class', name: 'bank_class', width: 100, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "1":
                return 'Buku 1';
                break;
                case "2":
                return 'Buku 2';
                break;
                case "3":
                return 'Buku 3';
                break;
                case "4":
                return 'Buku 4';
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Classification', name: 'bank_class', width: 100, align:'center', formatter:function(cellvalue) {
        	switch(cellvalue) {
        		case "1":
        		return 'BUMN';
        		break;
        		case "2":
        		return 'BUMD';
        		break;
        		case "3":
        		return 'SWASTA';
        		break;
        		default:
        		return cellvalue;
        		break;
        	}
        } },
        { label: 'Sharia Flag', name: 'sharia_flag', width: 100, align:'center', formatter:function(cellvalue) {
        	switch(cellvalue) {
        		case "1":
        		return 'Syariah Pemerintah Devisa';
        		break;
        		case "2":
        		return 'Unit Syariah';
        		break;
        		case "3":
        		return 'Konvensional';
        		break;
        		default:
        		return cellvalue;
        		break;
        	}
        } },

        { label: 'Custody Flag', name: 'custody_flag', width: 100, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return 'Non Custody';
                break;
                case "1":
                return 'Custody';
                break;
                default:
                return cellvalue;
                break;
            }
        } }

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
        bank_code:{required:true},
        bank_name:{required:true},
        bank_type:{required:true},
        bank_class:{required:true},
        sharia_flag:{required:true},
        custody_flag:{required:true}
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
                        content:'Add Bank Success.',
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
            url:site_url+'/master/get_bank',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#bank_code',FormEdit).val(response.bank_code);
                $('#bank_name',FormEdit).val(response.bank_name);
                $('#bank_type',FormEdit).val(response.bank_type);
                $('#bank_class',FormEdit).val(response.bank_class);
                $('#sharia_flag',FormEdit).val(response.sharia_flag);
                $('#custody_flag',FormEdit).val(response.custody_flag);
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
        bank_code:{required:true},
        bank_name:{required:true},
        bank_type:{required:true},
        bank_class:{required:true},
        sharia_flag:{required:true},
        custody_flag:{required:true}
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
                        content:'Edit Bank Success.',
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
            content:'Delete Bank? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_bank',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Bank Success.',
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
    window.open(site_url+'excel/export_report_master_bank')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_master_bank')
});
})