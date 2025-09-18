$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormUpload = $("#FormUpload");

$("#jqgrid_data").jqGrid({
    url: site_url+'/master/jqgrid_emiten_list',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Ticker', name: 'ticker', align: "center", width: 100 },
        { label: 'Emiten Name', name: 'emiten_name', width: 350 },
        { label: 'Registered Date', name: 'registered_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} }
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

//$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');
$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

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
        ticker:{required:true},
        emiten_name:{required:true},
        registered_date:{required:true}
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
                        content:'Add Emiten Success.',
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

$('#btn_edit').click(function(e){
	selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
	if (selrow) {
		$.ajax({
			type:"POST",dataType:"json",data:{id:selrow},
			url:site_url+'/master/get_emiten_list',
			success:function(response){
				$('#jqgrid').hide();
				$('#edit').show();
				$('#id',FormEdit).val(response.id);
				$('#ticker',FormEdit).val(response.ticker);
				$('#emiten_name',FormEdit).val(response.emiten_name);
				$('#registered_date1',FormEdit).val(Template.ToDatePicker(response.registered_date));
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
        ticker:{required:true},
        emiten_name:{required:true},
        registered_date:{required:true}
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
                        content:'Edit Emiten Success.',
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

/*UPLOAD*/
FormUpload.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        userfile:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormUpload).show();
        Template.scrollTo($('.alert-error',FormUpload), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        $('#btn_upload').attr('disabled',true);
        
        FormUpload.ajaxSubmit({
            dataType: 'json', 
            beforeSend: function() {
                $('#btn_upload').html('<i class="icon-spinner icon-spin"></i> <span>0%</span>');
            },
            uploadProgress: function(event, position, total, percentComplete) {
                if (percentComplete>99) {
                    percentComplete=99;
                }
                $('#btn_upload span').html(''+percentComplete+'%');
            },
            cache:false,
            success: function(response) {
                $('#btn_upload').html('<i class="icon-upload"></i> Upload');
                $('#btn_upload').attr('disabled',false);
                if (response.success==true) {
                    $.alert({
                        title:'Upload Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Upload Data Emiten Success.',
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
                // var percentVal = '100%';
                // percent.html(percentVal);
                $('#btn_upload').html('<i class="icon-upload"></i> Upload');
                $('#btn_upload').attr('disabled',false);
            }
        });
    }
});

$('#btn_delete').click(function(){
	selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
	if (selrow) {
		$.confirm({
			title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
			content:'Delete Emiten? Are You Sure?',
			confirmButtonClass:'btn green',
			cancelButtonClass:'btn red',
			confirm:function(){
				$.ajax({
					type:"POST",dataType:"json",data:{id:selrow},
					url:site_url+'/master/delete_emiten_list',
					success:function(response) {
						if (response.success===true) {
							$.alert({
		                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
		                        content:'Delete Emiten Success.',
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

/* EDIT EMITEN 1*/
$('#editemiten1 tbody td').click(function(){
    if ($(this).find('input[type=checkbox]').is(':checked')==true) {
        $(this).addClass('checked');
    } else {
        $(this).removeClass('checked');
    }
});

$('select#sector').livequery('change',function(){
    var sector_code = $(this).val();
    subsector = $(this).closest('tr').find('#subsector');
    if (sector_code=='') {
        html = '<option value=""></option>';
        subsector.html(html);
    } else {
        $.ajax({
            type:"POST",dataType:"json",data:{sector_code:sector_code},
            url:site_url+'master/get_subsector_ajax',
            success:function(response) {
                html = '<option value="">SILAHKAN PILIH SUBSECTOR</option>';
                for (i in response) {
                    html += '<option value="'+response[i].subsector_code+'">'+response[i].subsector_name+'</option>';
                }
                subsector.html(html);
            }
        })
    }
})


// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    window.open(site_url+'excel/export_report_emiten_list2')
})

$('#btn_pdf').click(function(){
window.open(site_url+'pdf/export_report_emiten_list2')
});

})