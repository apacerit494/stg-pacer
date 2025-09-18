window.global_benefit_rider = {};

$(document).ready(function(){

var form_import = $('#form-import'), 
    progress = $('.progress'), 
    bar = $('.bar'), 
    percent = $('.percent'),
    status = $('#status'), 
    jqgrid_data = $('#jqgrid_data'),
    jqgrid_data_pager = '#jqgrid_data_pager',
    t_jqgrid_data = $('#t_jqgrid_data'),
    policy_no = $('#policy_no',form_import),
    product_name = $('#product_name',form_import),
    alert_error = $('.alert-error');

$("#btn-search").click(function(e){
    e.preventDefault();
    jqgrid_data.trigger('reloadGrid');
});

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'/outsourcing/jqgrid_import_etf_transaction',
    mtype: "GET",
    datatype: "json",
    postData: {
        status: function(){ return $("#Fstatus").val() }
    },
    colModel: [
        { label: 'import_id', name: 'import_id', key: true, hidden:true },
        { label: 'File', name: 'file_client_name', width: 150, align:'left' },
        { label: 'Contract No', name: 'contract_no', width: 120, align:'center'},
        { label: 'Fund Code', name: 'fund_code', width: 100, align:'center',hidden:true},
        { label: 'FM Code', name: 'fm_code', width: 120, align:'center',hidden:true},
        { label: 'Date Time', name: 'imported_stamp', width: 120, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'d/m/Y H:i:s'}},
        { label: 'Status', name: 'status', width: 100, align:'center', formatter: function(cellvalue){
            switch (cellvalue) {
                case "0":
                return '<span class="label label-sm label-warning">Unprocessed</span>';
                break;
                case "1":
                return '<span class="label label-sm label-info">Process</span>';
                break;
                case "2":
                return '<span class="label label-sm label-default" style="background:#CCCCCC;">Done</span>';
                break;
                default:
                return cellvalue;
                break;
            }
        }},
        { label: 'status', name: 'status_hidden', width: 100, align:'center',hidden:true },
        { label: 'Jumlah Data', name: 'jumlah_data', width: 100, align:'center' },
        { label: 'Imported BY', name: 'imported_by', hidden:true},
        { label: 'Action', name:"filename", width: 200, align:'center', formatter: function(cellvalue,rowObj,rowArray) {
                var row_id=rowObj.rowId;
                var status=rowArray[7]; //column status
                var process_url = site_url+'/outsourcing/process_import_data_etf_transaction/'+row_id;
                var download_button = '<a class="btn btn-default btn-sm2" style="margin:5px 0;" href="'+base_url+'assets/admin/files/etf_transaction/'+cellvalue+'" title="'+cellvalue+'"><i class="fa fa-download"></i> &nbsp;Download</a>';
                var process_button = '<a class="btn btn-default btn-sm2" style="margin:5px 0;" href="'+process_url+'" title="Proses Import ETF Transaction"><i class="fa fa-refresh"></i> &nbsp;Process</a>';
                var delete_button = '<a class="btn btn-default btn-sm2" style="margin:5px 0;" id="btn-delete" data-id="'+row_id+'" href="javascript:void(0);" title="Delete"><i class="fa fa-trash"></i></a>';
                // if (status!='0') { //unprocessed
                //     delete_button = '';
                // }
                if (status=='2') { //finished
                    process_button = '';
                }
                var actions = '<div class="btn-group" role="group">'+(process_button+download_button+delete_button)+'</div>';
                return actions;
            }
        }
    ],
    viewrecords: true,
    autowidth: true,
    // height: auto,
    height: 200,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    sortname: "status,imported_stamp",
    sortorder: "desc",
    multiselect: false,
    pager: jqgrid_data_pager
});

t_jqgrid_data.append('<button class="jqGrid_add" id="btn_add2" title="Tambah Data Peserta Baru"></button> <button class="jqGrid_makeactive" id="btn_verify2" title="Verifikasi Data Peserta"></button> <button class="jqGrid_makedisable" id="btn_reject2" title="Reject/Hapus Data Peserta"></button>');

$('select#contract_no',form_import).livequery('change',function(){
    var contract_no = $(this).val();
    fund_code = $('#fund_code',form_import);
    fm_code = $('#fm_code',form_import);
    if (contract_no=='') {
        fund_code.val('');
        fm_code.val('');
    } else {
        $.ajax({
            type:"POST",dataType:"json",data:{contract_no:contract_no},
            url:site_url+'outsourcing/get_fund_code_ajax',
            success:function(response) {
                fund_code.val(response.fund_code);
                fm_code.val(response.fm_code);
            }
        })
    }
})
    
/*Get Product Name*/
policy_no.change(function(e){
    e.preventDefault();
    product_name.val(policy_no.find('option:selected').data('productname'))
});

$("a#btn-delete").livequery('click',function(){
    id = $(this).data('id');
    data = jqgrid_data.jqGrid('getRowData',id);
    message = "Hapus Data Import Transaksi ETF. Apakah anda yakin ?";
    if (data.status_hidden=='1') {
        message = "Terdapat "+data.jumlah_data+" Data yang sedang dalam proses. Apakah anda yakin akan Melanjutkan ?";
    }
    $.confirm({
        title:'Delete',icon:'fa fa-trash',backgroundDismiss:false,
        content:message,
        confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
        confirm:function(){
            $.ajax({
                type:"POST",
                dataType:"json",data:{
                    import_id:id
                },url:site_url+"/outsourcing/delete_import_data_etf_transaction",
                success: function(response) {
                    if (response.success===true) {
                        $.alert({
                            title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                            content:'Hapus Data Import SUKSES.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                jqgrid_data.trigger('reloadGrid');
                            }
                        });
                    } else {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                    }
                },error: function(){
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                }
            })
        }
    })
})

form_import.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        contract_no: {required: true}
        ,userfile: {required: true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        alert_error.show();
        Template.scrollTo(alert_error, -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {

        form_import.ajaxSubmit({
            dataType: 'json', 
            beforeSend: function() {
                progress.show();
                status.empty();
                var percentVal = '0%';
                bar.width(percentVal)
                percent.html(percentVal);
            },
            uploadProgress: function(event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';
                bar.width(percentVal)
                percent.html(percentVal);
            },
            success: function(response) {
                var percentVal = '100%';
                bar.width(percentVal);
                percent.html(percentVal);

                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Data Has Been Uploaded.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            alert_error.hide();
                            jqgrid_data.trigger('reloadGrid');
                            clearFormImport();
                        }
                    })
                }else{
                    Template.WarningAlert(response.error);
                    progress.hide();
                }
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            },
            complete: function(xhr) {
                status.html(xhr.responseText);
            }
        });
    }
});

var clearFormImport = function () {
    $('#contract_no',form_import).val('');
    $('#fund_code',form_import).val('');
    $('#fm_code',form_import).val('');
    $('#userfile',form_import).val('');
    progress.hide();
}

});