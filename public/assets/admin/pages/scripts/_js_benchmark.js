$(function(){

var t = $('#t_benchmark');
var FormAdd = $('#FormAdd',t), FormEdit = $('#FormEdit',t);

/*
| BEGIN GRID
*/
$("#jqgrid_data_benchmark",t).jqGrid({
    url: site_url+'/master/jqgrid_benchmark',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund', name: 'group_fund' , width: 100, align:'center'},
        { label: 'Year', name: 'benchmark_year' , width: 100, align:'center'},
        { label: 'Bobot Composite', name: 'bobot_composite' , width: 130},
        { label: 'Bobot LQ45', name: 'bobot_lq45' , width: 100},
        { label: 'Bobot JII', name: 'bobot_jii' , width: 100},
        { label: 'Bobot ISSI', name: 'bobot_issi' , width: 100},
        { label: 'Bobot Time Deposit', name: 'bobot_time_deposit' , width: 130},
        { label: 'Bobot Indobex', name: 'bobot_indobex' , width: 100},
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
    pager: "#jqgrid_data_pager_benchmark"
});
$("#t_jqgrid_data_benchmark",t).append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');
/*
| END GRID
*/

/*
| BEGIN ADD
*/
$('#btn_add',t).click(function(){
	$('#jqgrid',t).hide();
	$('#add',t).show();
	FormAdd.trigger('reset');
})

$('#btn_cancel',FormAdd).click(function(){
	$('#add',t).hide();
	$('#jqgrid',t).show();
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
        group_fund:{required:true},
        year:{required:true},
        bobot_composite:{required:true},
        bobot_lq45:{required:true},
        bobot_jii:{required:true},
        bobot_issi:{required:true},
        bobot_time_deposit:{required:true},
        bobot_indobex:{required:true}
        
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
                        content:'Add Benchmark Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_data_benchmark',t).trigger('reloadGrid');
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

$('#btn_edit',t).click(function(e){
    selrow = $('#jqgrid_data_benchmark',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/master/get_benchmark',
            success:function(response){
                $('#jqgrid',t).hide();
                $('#edit',t).show();
                $('#id',FormEdit).val(response.id);
                $('#group_fund',FormEdit).val(response.group_fund);
				$('#year',FormEdit).val(response.benchmark_year);
				$('#bobot_composite',FormEdit).val(Template.NumberFormat(response.bobot_composite,2,',','.'));
				$('#bobot_lq45',FormEdit).val(Template.NumberFormat(response.bobot_lq45,2,',','.'));
				$('#bobot_jii',FormEdit).val(Template.NumberFormat(response.bobot_jii,2,',','.'));
				$('#bobot_issi',FormEdit).val(Template.NumberFormat(response.bobot_issi,2,',','.'));
				$('#bobot_time_deposit',FormEdit).val(Template.NumberFormat(response.bobot_time_deposit,2,',','.'));
				$('#bobot_indobex',FormEdit).val(Template.NumberFormat(response.bobot_indobex,2,',','.'));
                
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
    $('#edit',t).hide();
    $('#jqgrid',t).show();
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
        group_fund:{required:true},
        year:{required:true},
        bobot_composite:{required:true},
        bobot_lq45:{required:true},
        bobot_jii:{required:true},
        bobot_issi:{required:true},
        bobot_time_deposit:{required:true},
        bobot_indobex:{required:true}
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
                        content:'Edit Benchmark Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data_benchmark',t).trigger('reloadGrid');
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
$('#btn_delete',t).click(function(){
    selrow = $('#jqgrid_data_benchmark',t).jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Benchmark? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/master/delete_benchmark',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Benchmark Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#userfile',t).val('');
                                    $('#jqgrid_data_benchmark',t).trigger('reloadGrid');
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
});

});