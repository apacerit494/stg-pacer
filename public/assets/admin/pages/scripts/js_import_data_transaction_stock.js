window.global_benefit_rider = {};

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),
    pager_jqgrid_data = '#jqgrid_data_pager',
    policy_no = $('#policy_no'),
    btn_remove = $('#btn-remove'),
    btn_proses = $('#btn-proses'),
    alert_error = $('.alert-error');

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_import_data_transaction_stock',
    mtype: "GET",
    datatype: "json",
    postData:{
        import_id:function(){return import_id}
    },
    colModel: [
         {label:'import_data_id',name:'import_data_id',align:'left',key:true,hidden:true}
        ,{label:'import_id',name:'import_id',hidden:true}
        ,{label:'Securities',name:'securities_name',width:80,formatter:function(cellvalue,rowObj,rowArray){
            var flag_error_ticker=rowArray[10];
            if (flag_error_ticker=='0') {
                return '<span style="color:red">'+cellvalue+'</span>';
            } else {
                return cellvalue;
            }
        }}
        ,{label:'Trade Date',name:'trade_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Settlement Date',name:'settlement_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Quantity',name:'quantity',width:100,align:'right',formatter: function(cellvalue2,rowObj,rowArray) {
            var flag_error_custody=rowArray[12];
            if (flag_error_custody=='0') {
                return '<span style="color:red" data-toggle="tooltip" data-placement="top" title="Lot Exceeds the Balance">'+Template.NumberFormat(cellvalue2,0,',','.')+'</span>';
            } else {
                return Template.NumberFormat(cellvalue2,0,',','.');
            }
        }}
        ,{label:'Price',name:'price',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Gross Settlement',name:'gross_settlment_amount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Comission',name:'commission',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Net Settlement',name:'net_settlement_amount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'flag_error_ticker',name:'flag_error_ticker',hidden:true}
        ,{label:'flag_error_broker',name:'flag_error_broker',hidden:true}
        ,{label:'flag_error_custody',name:'flag_error_custody',hidden:true}
        ,{label:'Counterparty',name:'counterparty',formatter: function(cellvalue2,rowObj,rowArray) {
            var flag_error_broker=rowArray[11];
            if (flag_error_broker=='0') {
                return '<span style="color:red">'+cellvalue2+'</span>';
            } else {
                return cellvalue2;
            }
        }}
        ,{label:'Custody',name:'custody',width:100,align:'center',formatter: function(cellvalue2,rowObj,rowArray) {
            var flag_error_custody=rowArray[12];
            if (flag_error_custody=='0') {
                return '<span style="color:red">'+cellvalue2+'</span>';
            } else {
                return cellvalue2;
            }
        }}
    ],
    viewrecords: true,
    autowidth: true,
    // height: auto,
    height: 300,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "securities_name",
    sortorder: "asc",
    // multiselect: false,
    pager: pager_jqgrid_data
});

$('#t_jqgrid_data').append('\
    <button class="jqGrid_edit" id="btn_edit" title="Edit Data"></button>\
');
// -- <button class="jqGrid_delete" id="btn_delete" title="Delete"></button>\

$('#btn_edit').click(function(){
    selrow = jqgrid_data.jqGrid('getGridParam','selrow');
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    data = jqgrid_data.jqGrid('getRowData',selrow);
    import_id = data.import_id;
    import_data_id = data.import_data_id;
    securities_name = data.securities_name;
    counterparty = data.counterparty;
    custody = data.custody;
    if (selrow) {
        if (selarrrow.length>1) {
            Template.WarningAlert('Mohon pilih Salah satu yang akan di Edit');
        } else {
            securities_name = securities_name.replace('<span style="color:red">','')
            securities_name = securities_name.replace('</span>','')
            counterparty = counterparty.replace('<span style="color:red">','')
            counterparty = counterparty.replace('</span>','')
            custody = custody.replace('<span style="color:red">','')
            custody = custody.replace('</span>','')
            $('#import_id','#dialog_edit').val(import_id);
            $('#securities_name_old','#dialog_edit').val(securities_name);
            $('#counterparty_old','#dialog_edit').val(counterparty);
            $('#custody_old','#dialog_edit').val(custody);

            $('#import_data_id','#dialog_edit').val(import_data_id);
            $('#securities_name','#dialog_edit').val(securities_name);
            $('#counterparty','#dialog_edit').val(counterparty);
            $('#custody','#dialog_edit').val(custody);

            $('#dialog_edit').dialog('open');
        }
    } else {
        Template.WarningAlert('Please select a Row');
    }
});

/*$('#btn_delete').click(function(){
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        Template.ConfirmAlert('Are you sure want to delete this record?',function(){
            $.ajax({
                type:"POST",dataType:"json",data:{
                    imports_data_id:selarrrow
                },url:site_url+'/inhouse/do_delete_import_data_transaction_stock',
                success: function(response){
                    if (response.success==true) {
                        Template.SuccessAlert('Deleting Success!');
                        jqgrid_data.trigger('reloadGrid');
                    } else {
                        Template.WarningAlert(response.error);
                    }
                },
                error: function(){
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                }
            })
        })
    } else {
        Template.WarningAlert('Please select a row!');
    }
});*/

$('#dialog_edit').dialog({
    modal:true,
    width:550,
    height:280,
    autoOpen:false,
    buttons:false
})


$('#FormEdit').validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
         securities_name: {required:true}
        ,counterparty: {required:true}
        ,custody: {required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error','#FormEdit').show();
        Template.scrollTo($('.alert-error','#FormEdit'), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        $('#FormEdit').ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Edit Import Transaksi Sukses.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error','#FormEdit').hide();
                            $('#btn_cancel','#FormEdit').trigger('click');
                            $('#ticker','#FormEdit').trigger('chosen:updated');
                            jqgrid_data.trigger('reloadGrid');
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

$('#btn_cancel','#dialog_edit').click(function(){
    $('#FormEdit').trigger('reset');
    $('#dialog_edit').dialog('close');
})



btn_remove.click(function(e){
    e.preventDefault();
    // window.location.href=site_url+'/inhouse/import_transaction_stock';

    $.confirm({
        title:'Batal Proses',icon:'fa fa-warning',backgroundDismiss:false,
        content:'Apakah anda yakin ingin membatalkan Proses ini?',
        confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
        confirm: function(){
            window.location.href=site_url+'inhouse/cancel_import_data_transaction_stock/'+import_id;
        }
    });
})
btn_proses.click(function(e){
    e.preventDefault();
    // selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    // if (selarrrow.length>0) {
        $.confirm({
            title:'Proses',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Proses Semua Data Transaksi Saham. Apakah anda yakin?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        import_id:import_id
                    },url:site_url+'/inhouse/do_import_data_transaction_stock',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Proses Transaksi Saham SELESAI!',icon:'fa fa-check',backgroundDismiss:false,
                                // content:'Proses Import Data Transaksi SAHAM SUKSES',
                                content: response.message,
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    jqgrid_data.trigger('reloadGrid');
                                    if (response.is_have_error==false) {
                                        window.location.href=site_url+'inhouse/import_transaction_stock';
                                    }
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
    // } else {
    //     Template.WarningAlert("Please select a Row.")
    // }
})

});