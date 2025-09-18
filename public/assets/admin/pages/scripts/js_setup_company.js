$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/settings/jqgrid_setup_company',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Company Code', name: 'company_code', align: "center", width: 100 },
        { label: 'Company Name Name', name: 'company_name', width: 250 },
        { label: 'Business Type', name: 'business_type', width: 250 },
        { label: 'Telephone No', name: 'telephone_no', width: 250 },
        { label: 'Faximile No', name: 'faximile_no', width: 250 },
        { label: 'Address', name: 'address', width: 250 },
        { label: 'City', name: 'city', width: 250 },
        { label: 'Province', name: 'province', width: 250 },
        { label: 'Pos Code', name: 'pos_code', width: 250 },
       
          
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

$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add" style="display:none;"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete" style="display:none;"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
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
        company_code:{required:true},
        company_name:{required:true},
        business_type:{required:true},
        telephone_no:{required:true},
        faximile_no:{required:true},
        address:{required:true},
        city:{required:true},
        province:{required:true},
        pos_code:{required:true},
        officer1:{required:true},
        occupation1:{required:true},
        // signature1:{required:true},
        officer2:{required:true},
        occupation2:{required:true},
        // signature2:{required:true},
        // officer3:{required:true},
        // occupation3:{required:true},
        // signature3:{required:true},
          
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
                        content:'Add Master Company Success.',
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
            url:site_url+'/settings/get_setup_company',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#company_code',FormEdit).val(response.company_code);
                $('#company_name',FormEdit).val(response.company_name);
                $('#business_type',FormEdit).val(response.business_type);
                $('#telephone_no',FormEdit).val(response.telephone_no);
                $('#faximile_no',FormEdit).val(response.faximile_no);
                $('#address',FormEdit).val(response.address);
                $('#city',FormEdit).val(response.city);
                $('#province',FormEdit).val(response.province);
                $('#pos_code',FormEdit).val(response.pos_code);
                $('#officer1',FormEdit).val(response.officer1);
                $('#occupation1',FormEdit).val(response.occupation1);
                $('#f_company_logo',FormEdit).val(response.company_logo);
                if (response.company_logo!=null) {
                    $('#preview-company_logo',FormEdit).attr('href',response.location_logo+response.company_logo);
                } else {
                    $('#preview-company_logo',FormEdit).parent().hide();
                }
                $('#f_signature1',FormEdit).val(response.signature1);
                $('#f_signature2',FormEdit).val(response.signature2);
                $('#f_signature3',FormEdit).val(response.signature3);
                if (response.signature1!=null) {
                    $('#preview-signature1',FormEdit).attr('href',response.location+response.signature1);
                } else {
                    $('#preview-signature1',FormEdit).parent().hide();
                }
                $('#officer2',FormEdit).val(response.officer2);
                $('#occupation2',FormEdit).val(response.occupation2);
                if (response.signature2!=null) {
                    $('#preview-signature2',FormEdit).attr('href',response.location+response.signature2);
                } else {
                    $('#preview-signature2',FormEdit).parent().hide();
                }
                $('#officer3',FormEdit).val(response.officer3);
                $('#occupation3',FormEdit).val(response.occupation3);
                if (response.signature3!=null) {
                    $('#preview-signature3',FormEdit).attr('href',response.location+response.signature3);
                } else {
                    $('#preview-signature3',FormEdit).parent().hide();
                }
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
        company_code:{required:true},
        company_name:{required:true},
        business_type:{required:true},
        telephone_no:{required:true},
        faximile_no:{required:true},
        address:{required:true},
        city:{required:true},
        province:{required:true},
        pos_code:{required:true},
        officer1:{required:true},
        occupation1:{required:true},
        // signature1:{required:true},
        officer2:{required:true},
        occupation2:{required:true},
        // signature2:{required:true},
        // officer3:{required:true},
        // occupation3:{required:true},
        // signature3:{required:true},
        
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
                        content:'Edit Company Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data').trigger('reloadGrid');
                            $('#btn_cancel',FormEdit).trigger('click');
                        }
                    })
                }else{
                    Template.WarningAlert(response.message);
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
            content:'Delete Master Company? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/settings/delete_setup_company',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Master Company Success.',
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
    window.open(site_url+'excel/export_report_setup_company')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_setup_company')
});

})