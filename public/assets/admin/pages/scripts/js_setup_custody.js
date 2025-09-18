$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/master/jqgrid_setup_custody',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Bank Code', name: 'bank_code', align: "center", width: 100 },
        { label: 'Bank Name', name: 'bank_name', width: 150 },
        { label: 'No Rekening Efek', name: 'no_rekening_efek', width: 100 },
        { label: 'No Rekening Kas', name: 'no_rekening_kas', width: 100 },
        { label: 'Nama Rekening', name: 'nama_rekening', width: 150 },
        { label: 'No Fax', name: 'no_fax', width: 100 },
        { label: 'No Telp', name: 'no_telp', width: 100 },
        { label: 'PIC', name: 'pic', width: 100 },
        { label: 'Addres1', name: 'address1', width: 100 },
        { label: 'Addres2', name: 'address2', width: 100 },
        { label: 'Addres3', name: 'address3', width: 100 },
        { label: 'Bank Branch', name: 'bank_branch', width: 100 }
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
    $('#bank_code',FormAdd).trigger('chosen:updated');
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
        no_rekening_efek:{required:true},
        no_rekening_kas:{required:true},
        nama_rekening:{required:true},
        no_fax:{required:true},
        no_telp:{required:true},
        pic:{required:true},
        Addres1:{required:true},
        Addres2:{required:true},
        Addres3:{required:true},
        bank_branch:{required:true}
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
                        content:'Add Bank Custody Success.',
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
            url:site_url+'/master/get_setup_custody_by_id',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#bank_code',FormEdit).val(response.bank_code);
                $('#bank_name',FormEdit).val(response.bank_name).trigger('chosen:updated');
                $('#no_rekening_efek',FormEdit).val(response.no_rekening_efek);
                $('#no_rekening_kas',FormEdit).val(response.no_rekening_kas);
                $('#nama_rekening',FormEdit).val(response.nama_rekening);
                $('#no_fax',FormEdit).val(response.no_fax);
                $('#no_telp',FormEdit).val(response.no_telp);
                $('#pic',FormEdit).val(response.pic);
                $('#address1',FormEdit).val(response.address1);
                $('#address2',FormEdit).val(response.address2);
                $('#address3',FormEdit).val(response.address3);
                $('#bank_branch',FormEdit).val(response.bank_branch);
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
        no_rekening_efek:{required:true},
        no_rekening_kas:{required:true},
        nama_rekening:{required:true},
        no_fax:{required:true},
        no_telp:{required:true},
        pic:{required:true},
        Addres1:{required:true},
        Addres2:{required:true},
        Addres3:{required:true},
        bank_branch:{required:true}
    
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
                        content:'Edit Bank Custody Success.',
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
            content:'Delete Bank Custody? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_setup_custody',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Bank Custody Success.',
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

// $('#bank_code',FormAdd).change(function(){
//     bank_name = $(this).find('option:selected').data('bank_name');
//     $('#bank_name',FormAdd).val(bank_name)
// })

// $('#bank_code',FormEdit).change(function(){
//     bank_name = $(this).find('option:selected').data('bank_name');
//     $('#bank_name',FormEdit).val(bank_name)
// })

// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    window.open(site_url+'excel/export_report_custody_setup')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_custody_setup')
});
})