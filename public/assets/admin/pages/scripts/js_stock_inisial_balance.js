$(function(){

var FormUpload = $("#FormUpload");

$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_stock_inisial_balance',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'id', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund Code', name: 'fund_code', align: "center", width: 100 },
        { label: 'Ticker', name: 'ticker', width: 100 },
        { label: 'Classification', name: 'classification', width: 100 },
        { label: 'Broker Code', name: 'broker_code', width: 100 },
        { label: 'Quantity Sheet', name: 'quantity_sheet', width: 100 },
        { label: 'Last Price', name: 'last_price', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } },
        { label: 'Last Amount', name: 'last_amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } },
        { label: 'Last Trade Date', name: 'last_trade_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} }
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
    multiselect: true,
    pager: "#jqgrid_data_pager"
});

$("#t_jqgrid_data").append('<button class="jqGrid_delete" id="btn_delete"></button>');


/*UPLOAD*/
FormUpload.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        userfile:{required:true}
        ,col_fund_code:{required:true}
        ,first_data_row:{required:true,number:true}
        ,last_data_row:{number:true}
        ,col_ticker:{required:true}
        ,col_classification:{required:true}
        ,col_broker_code:{required:true}
        ,col_quantity_sheet:{required:true}
        ,col_last_price:{required:true}
        ,col_last_amount:{required:true}
        ,col_last_trade_date:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormUpload).show();
        Template.scrollTo($('.alert-error',FormUpload), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).removeClass('error'); // set error class to the control group
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
                        content:'Upload Data Stock Inisial Balance Success.',
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

$('#btn_delete').click(function(e){
    e.preventDefault();
    selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Delete',icon:'fa fa-trash',backgroundDismiss:false,
            content:'Deleting Stock Inisial Balance. Are you sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        id:selarrrow
                    },url:site_url+'/inhouse/delete_stock_inisial_balance',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Success!',icon:'fa fa-check',backgroundDismiss:false,
                                // content:'Proses Import Data Transaksi SAHAM SUKSES',
                                content: 'Delete Stock Inisial Balance Success!',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    $('#jqgrid_data').trigger('reloadGrid');
                                }
                            })
                        } else {
                            Template.WarningAlert(response.error);
                        }
                    },
                    error: function(){
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                    }
                })
            }
        });
    } else {
        Template.WarningAlert("Please select a Row.")
    }
})

});