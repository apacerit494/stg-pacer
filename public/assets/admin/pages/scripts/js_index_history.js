$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormUpload = $('#FormUpload');


/*
| BEGIN GRID
*/
  


$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_index_history',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Trade Date', name: 'trade_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} },
        { label: 'Index Code', name: 'index_code', align: "left", width: 80 },
        { label: 'Description', name: 'description', align: "left", width: 100 },
        { label: 'Previous Value', name: 'previous', align: "right", width: 100 },
        { label: 'Highest Value', name: 'highest', align: "right", width: 100 },
        { label: 'Lowest Value', name: 'lowest', align: "right", width: 100 },
        { label: 'Close Value', name: 'close', align: "right", width: 100 },
        { label: 'Number Of Stock', name: 'number_of_stock', align: "right", width: 100 },
        { label: 'Change Value', name: 'change', align: "right", width: 100 },
        { label: 'Transaction Volume', name: 'volume', align: "right", width: 100 },
        { label: 'Transaction Value', name: 'value', align: "right", width: 100 },
        { label: 'Transaction Frequency', name: 'frequency', align: "right", width: 100 },
        { label: 'Market Capitalization', name: 'market_capitalization', align: "right", width: 100 },
              
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
    pager: "#jqgrid_data_pager"
});


$('#btn_search').click(function(e){
    e.preventDefault();

    date1 = $('#date1').val();
    date2 = $('#date2').val();

    if (date1!="") date1 = Template.ToDateDefault(date1)
    if (date2!="") date2 = Template.ToDateDefault(date2)
    $('#jqgrid_data').setGridParam(
        {
            postData:{
                date1:date1,
                date2:date2
            }
        }
    ).trigger('reloadGrid',[{page:1}]);
})



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
        trade_date:{required:true},
        index_code:{required:true},
        previous:{required:true},
        highest:{required:true},
        lowest:{required:true},
        close:{required:true},
        number_of_stock:{required:true},
        change:{required:true},
        volume:{required:true},
        value:{required:true},
        frequency:{required:true},
        market_capitalization:{required:true}
        
        
        
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
                        content:'Add Index Summary Success.',
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
            url:site_url+'/inhouse/get_index_history',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#trade_date',FormEdit).val(Template.ToDatePicker(response.trade_date));
                $('#index_code',FormEdit).val(response.index_code);
                $('#previous',FormEdit).val(response.previous);
                $('#highest',FormEdit).val(response.highest);
                $('#lowest',FormEdit).val(response.lowest);
                $('#close',FormEdit).val(response.close);
                $('#number_of_stock',FormEdit).val(response.number_of_stock);
                $('#change',FormEdit).val(response.change);
                $('#volume',FormEdit).val(response.volume);
                $('#value',FormEdit).val(response.value);
                $('#frequency',FormEdit).val(response.frequency);
                $('#market_capitalization',FormEdit).val(response.market_capitalization);
              
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
        trade_date:{required:true},
        index_code:{required:true},
        previous:{required:true},
        highest:{required:true},
        lowest:{required:true},
        close:{required:true},
        number_of_stock:{required:true},
        change:{required:true},
        volume:{required:true},
        value:{required:true},
        frequency:{required:true},
        market_capitalization:{required:true}
        
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
                        content:'Edit Index Summary.',
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
                        content:'Upload Index Summary Success.',
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

/*
| DELET
E
*/
$('#btn_delete').click(function(){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Index Summary? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/inhouse/delete_index_history',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Index Summary Success.',
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

$('#export_excel','#modal_export_excel').click(function(){
    date1 = $('#date1','#modal_export_excel').val();
    date2 = $('#date2','#modal_export_excel').val();

    if (date1!="" && date2!="") {
        window.open(site_url+'excel/export_report_index_history/'+Template.ToDateDefault(date1)+'/'+Template.ToDateDefault(date2))
    } else {
        Template.WarningAlert('Please select Trading Date.');
        return false;
    }
})

$('#btn_pdf').click(function(){
  date1 = $('#date1','#modal_export_excel').val();
    date2 = $('#date2','#modal_export_excel').val();

    if (date1!="" && date2!="") {
        window.open(site_url+'pdf/export_report_index_history/'+Template.ToDateDefault(date1)+'/'+Template.ToDateDefault(date2))
    } else {
        Template.WarningAlert('Please select Trading Date.');
        return false;
    }
    
})



});