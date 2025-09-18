
 $(document).ready(function(){
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormGrid = $('#FormGrid');
    $("#jqgrid_data").jqGrid({
        
        url: site_url+'/setting/jqgrid_user',
        mtype: "GET",
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
            { label: 'User Name', name: 'username', align: "center", width: 100 },
            { label: 'Full Name', name: 'fullname', align: "left", width: 200 },
            { label: 'Created Stamp', name: 'created_stamp', align: "center", width: 150 },
            { label: 'Last Update Stamp', name: 'last_updated_stamp', align: "center", width: 150 },
            { label: 'Role Name', name: 'role_name', align: "center", width: 100 },
            { label: 'Status' , name: 'status', width: 150, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case"0":
                    return "<label class='label label-sm label-danger'>Tidak Aktif</label>";
                    break;
                    case"1":
                    return "<label class='label label-sm label-info'>Aktif</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } },
            { name: 'v_status', hidden:true }
           
            
        ],
        viewrecords: true,
        width: 1098,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "username",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager"
    });
    
   $("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
   
   


$('#btn_cancel',FormAdd).click(function(){
    FormAdd.hide();
    FormGrid.show();
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
        broker_code:{required:true},
        broker_name:{required:true},
        commission:{required:true},
        vat:{required:true},
        levy:{required:true},
        kpei:{required:true},
        tax:{required:true},
        
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
                        content:'Add Broker Success.',
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
$('#btn_add').click(function(){
    FormGrid.hide();
    FormAdd.show();
    
})
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
            url:site_url+'/setting/get_user',
            success:function(response){
                $('#FormGrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#username',FormEdit).val(response.username);
                $('#password',FormEdit).val(response.password);
                $('#status',FormEdit).val(response.status);
                $('#role_id',FormEdit).val(response.role_id);
                $('#fullname',FormEdit).val(response.fullname);
              //  Template.WarningAlert("Sukses!");
               
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
        broker_code:{required:true},
        broker_name:{required:true},
        commission:{required:true},
        vat:{required:true},
        levy:{required:true},
        kpei:{required:true},
        tax:{required:true},
        
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
                        content:'Edit Broker Success.',
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
            content:'Delete Broker? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_broker',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Broker Success.',
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
    window.open(site_url+'excel/export_report_broker')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_broker')
});
});
