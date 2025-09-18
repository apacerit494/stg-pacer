window.global_benefit_rider = {};

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),
    pager_jqgrid_data = '#jqgrid_data_pager',
    policy_no = $('#policy_no'),
    btn_back = $('#btn-back'),
    btn_proses = $('#btn-proses'),
    alert_error = $('.alert-error');

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'outsourcing/jqgrid_import_data_etf_transaction',
    mtype: "GET",
    datatype: "json",
    postData:{
        import_id:function(){return import_id}
    },
    colModel: [
         {label:'import_data_id',name:'import_data_id',align:'left',key:true,hidden:true}
        ,{label:'import_id',name:'import_id',hidden:true}
        ,{label:'ETF Code',name:'etf_code',width:100,formatter:function(cellvalue,rowObj,rowArray){
            var flag_error_etf=rowArray[7];
            if (flag_error_etf=='0') {
                return '<span style="color:red">'+cellvalue+'</span>';
            } else {
                return cellvalue;
            }
        }}
        , { label: 'Sell Buy Flag', name: 'sell_buy_flag', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "S":
                return 'Sell';
                break;
                case "B":
                return 'Buy';
                break;
                default:
                return cellvalue;
                break;
            }
        } }
        ,{label:'NAV Date',name:'nav_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Unit',name:'unit',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'NAV',name:'nav',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'flag_error_etf',name:'flag_error_etf',hidden:true}
       
    ],
    viewrecords: true,
    autowidth: true,
    // height: auto,
    height: 300,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "etf_code",
    sortorder: "asc",
    multiselect: true,
    pager: pager_jqgrid_data
});

$('#t_jqgrid_data').append('<button class="jqGrid_edit" id="btn_edit" title="Edit Data"></button>');

$('#btn_edit').click(function(){
    selrow = jqgrid_data.jqGrid('getGridParam','selrow');
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    data = jqgrid_data.jqGrid('getRowData',selrow);
    import_id = data.import_id;
    import_data_id = data.import_data_id;
    etf_code = data.etf_code;
    if (selrow) {
        if (selarrrow.length>1) {
            Template.WarningAlert('Mohon pilih Salah satu yang akan di Edit');
        } else {
            etf_code = etf_code.replace('<span style="color:red">','')
            etf_code = etf_code.replace('</span>','')
            $('#import_id','#dialog_edit').val(import_id);
            $('#etf_code_old','#dialog_edit').val(etf_code);
            
            $('#import_data_id','#dialog_edit').val(import_data_id);
            $('#etf_code','#dialog_edit').val(etf_code);
            
            $('#dialog_edit').dialog('open');
        }
    } else {
        Template.WarningAlert('Please select a Row');
    }
});

$('#dialog_edit').dialog({
    modal:true,
    width:550,
    height:230,
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
         etf_code: {required:true}
        ,counterparty: {required:true}
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
                            jqgrid_data.trigger('reloadGrid')
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



btn_back.click(function(e){
    e.preventDefault();
    window.location.href=site_url+'/outsourcing/import_etf_transaction';
})
btn_proses.click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Proses',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Proses Import Data Transaksi ETF. Apakah anda yakin?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        imports_data_id:selarrrow
                    },url:site_url+'/outsourcing/do_import_data_etf_transaction',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Proses Transaksi ETF SELESAI!',icon:'fa fa-check',backgroundDismiss:false,
                                // content:'Proses Import Data Transaksi SAHAM SUKSES',
                                content: response.message,
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    jqgrid_data.trigger('reloadGrid');
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