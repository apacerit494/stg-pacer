$(function(){
var FormAdd = $('#FormAdd'), FormAdd2 = $('#FormAdd2'), FormEdit = $('#FormEdit'), FormEdit2 = $('#FormEdit2');

/* JQGRID SECTOR */
$("#jqgrid_sector").jqGrid({
    url: site_url+'/master/jqgrid_sector_setup',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, hidden:true },
        { label: 'Sector Code', name: 'sector_code', align: "center", width: 100 },
        { label: 'Sector Name', name: 'sector_name', width: 200 }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_sector_pager",
    ondblClickRow:function(row_id){
        var data = $("#jqgrid_sector").jqGrid('getRowData',row_id);
        var sector_code=data.sector_code;
        $('#jqgrid_subsector').setGridParam({postData:{sector_code:sector_code}}).trigger('reloadGrid',[{page:1}]);
        $('#sector_code',FormAdd2).val(sector_code);
    },
    caption: 'Sector Setup'
});

//$("#t_jqgrid_sector").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');
$("#t_jqgrid_sector").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

/* JQGRID SUBSECTOR */
$("#jqgrid_subsector").jqGrid({
    url: site_url+'/master/jqgrid_subsector_setup',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, hidden:true },
        { label: 'Sector Name', name: 'sector_name', width: 150 },
        { label: 'Sub Sector Code', name: 'subsector_code', align: "center", width: 100 },
        { label: 'Sub Sector Name', name: 'subsector_name', width: 200 }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_subsector_pager",
    caption: 'Sub Sector Setup'
});

$("#t_jqgrid_subsector").append('<button class="jqGrid_add" id="btn_add2"></button> <button class="jqGrid_edit" id="btn_edit2"></button> <button class="jqGrid_delete" id="btn_delete2"></button>');

$('#dialog_add_sector').dialog({
    width: 450,
    height: 270,
    modal: true,
    autoOpen:false,
    button:false
})
$('#dialog_edit_sector').dialog({
    width: 450,
    height: 270,
    modal: true,
    autoOpen:false,
    button:false
})
$('#dialog_add_subsector').dialog({
    width: 450,
    height: 270,
    modal: true,
    autoOpen:false,
    button:false
})
$('#dialog_edit_subsector').dialog({
    width: 450,
    height: 270,
    modal: true,
    autoOpen:false,
    button:false
})
$('#btn_add').click(function(){
    $('#dialog_add_sector').dialog('open');
})
$('#btn_add2').click(function(){
    $('#dialog_add_subsector').dialog('open');
})
$('#btn_cancel',FormAdd).click(function(){
    $('#dialog_add_sector').dialog('close');
})
$('#btn_cancel',FormAdd2).click(function(){
    $('#dialog_add_subsector').dialog('close');
})
$('#btn_cancel',FormEdit).click(function(){
    $('#dialog_edit_sector').dialog('close');
})
$('#btn_cancel',FormEdit2).click(function(){
    $('#dialog_edit_subsector').dialog('close');
})

$('#btn_delete').click(function(){
    selrow = $('#jqgrid_sector').jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Sector? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_sector_setup',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Sector Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#jqgrid_sector').trigger('reloadGrid');
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
$('#btn_delete2').click(function(){
    selrow = $('#jqgrid_subsector').jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Sub Sector? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_subsector_setup',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Sector Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#jqgrid_subsector').trigger('reloadGrid');
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

$('#btn_edit').click(function(){
    selrow = $('#jqgrid_sector').jqGrid('getGridParam','selrow');
    if (selrow) {
        $('#dialog_edit_sector').dialog('open');
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/master/get_sector_setup',
            success:function(response){
                $('#id',FormEdit).val(response.id);
                $('#sector_code',FormEdit).val(response.sector_code);
                $('#sector_name',FormEdit).val(response.sector_name);
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        })
    } else {
        Template.WarningAlert("Please select a row");
    }
})
$('#btn_edit2').click(function(){
    selrow = $('#jqgrid_subsector').jqGrid('getGridParam','selrow');
    if (selrow) {
        $('#dialog_edit_subsector').dialog('open');
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/master/get_subsector_setup',
            success:function(response){
                $('#id',FormEdit2).val(response.id);
                $('#subsector_code',FormEdit2).val(response.subsector_code);
                $('#subsector_name',FormEdit2).val(response.subsector_name);
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        })
    } else {
        Template.WarningAlert("Please select a row");
    }
})
FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        sector_code:{required:true},
        sector_name:{required:true}
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
                        content:'Add Sector Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_sector').trigger('reloadGrid');
                            $('#dialog_add_sector').dialog('close');
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
FormAdd2.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        sector_code:{required:true},
        subsector_code:{required:true},
        subsector_name:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormAdd2).show();
        Template.scrollTo($('.alert-error',FormAdd2), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormAdd2.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Add Sub Sector Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd2).hide();
                            $('#jqgrid_subsector').trigger('reloadGrid');
                            $('#dialog_add_subsector').dialog('close');
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
FormEdit.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        sector_code:{required:true},
        sector_name:{required:true}
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
                        content:'Edit Sector Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_sector').trigger('reloadGrid');
                            $('#dialog_edit_sector').dialog('close');
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

FormEdit2.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        subsector_code:{required:true},
        subsector_name:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormEdit2).show();
        Template.scrollTo($('.alert-error',FormEdit2), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormEdit2.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Edit Sub Sector Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit2).hide();
                            $('#jqgrid_subsector').trigger('reloadGrid');
                            $('#dialog_edit_subsector').dialog('close');
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


// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    window.open(site_url+'excel/export_report_sectorsubsector')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_sectorsubsector')
});

})