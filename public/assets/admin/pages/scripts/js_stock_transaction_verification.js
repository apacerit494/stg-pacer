window.global_benefit_rider = {};
window.global_show_restriction_alert = false;
window.global_v_flag_restriction = null;

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),pager_jqgrid_data = '#jqgrid_data_pager';

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_stock_transaction_verification',
    mtype: "GET",
    datatype: "json",
    colModel: [
         {sortable:false,label:'ID',name:'id',key:true,hidden:true}
        ,{sortable:false,label:'Status',name:'compliance',align:'center',width:70,formatter:function(cellvalue){
            if (cellvalue==1) {
                return "<span class='label label-success'>OK</span>";
            } else if (cellvalue==2) {
                return "<span class='label label-danger'>Exceed</span>";
            } else if (cellvalue==0) {
                return "-";
            } else {
                return "";
            }
        }}
        ,{sortable:false,label:'fund_code',name:'fund_code',hidden:true}
        ,{sortable:false,label:'Fund group',name:'fund_name',width:100,align:'center'}
        ,{sortable:false,label:'Flag S/B',name:'sell_buy_flag', width:70,align:'center',formatter:function(cellvalue){
            switch(cellvalue){
                case "S":
                return "SELL";
                break
                case "B":
                return "BUY";
                break;
                default:
                return "-";
                break;
            }
        }}
        ,{sortable:false,label:'ticker',name:'ticker',hidden:true}
        ,{sortable:false,label:'Emiten',name:'emiten_name',width:150}
        ,{sortable:false,label:'Trade Date',name:'trade_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{sortable:false,label:'Settlement Date',name:'settlement_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{sortable:false,label:'Classification',name:'classification',width:100,align:'center'}
        ,{sortable:false,label:'AVG Price',name:'avg_price',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' }}
        ,{sortable:false,label:'Price',name:'price',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' }}
        ,{sortable:false,label:'Quantity Sheet',name:'quantity_sheet',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{sortable:false,label:'Quantity Lot',name:'quantity_lot',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{sortable:false,label:'Transaction Fee',name:'transaction_fee',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{sortable:false,label:'Amount',name:'amount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{sortable:false,label:'Settlement Amount',name:'settlement_amount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{sortable:false,label:'Bank Custody',name:'bank_custody'}
        ,{sortable:false,label:'Broker',name:'broker_name'}
        ,{sortable:false,label:'Realized GL',name:'realized_gl',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' }}
        ,{label:'status_compliance',name:'status_compliance',hidden:true}
    ],
    viewrecords: true,
    autowidth: true,
    // height: auto,
    height: 300,
    rowNum: 100,
    rowList:[100,200,500,1000,1500,2000,5000],
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    //sortname: "a.trade_date,a.created_stamp",
    sortname: "a.trade_date",
    sortorder: "asc",
    multiselect: true,
    pager: pager_jqgrid_data,
    grouping: true,
    groupingView: {
        groupField : ['fund_name'],
        groupColumnShow : [false],
        groupText : ['<b>{0} - {1} Item(s)</b>'],
        groupCollapse : false,
        groupOrder: ['asc']
    },
});

$('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <button class="btn btn-success btn-sm2" id="btn_process" title="Process"><i class="fa fa-refresh"></i> Process</button> \
    <button class="btn btn-success btn-sm2" id="btn_verify" title="Verify"><i class="fa fa-check"></i> Allocation Verify</button> \
    <button class="btn btn-danger btn-sm2" id="btn_reject" title="Reject"><i class="fa fa-trash"></i> Delete</button> \
    </div> \
    <div class="grid-alert" style="width:40%;text-align:center;margin-left:30%;margin-right:30%;position:absolute;margin-top:3px;"></div> \
    ');

$('#btn_search').click(function(e){
    e.preventDefault();

    keyword = $('#keyword').val();
    
    $('#jqgrid_data').setGridParam(
        {
            postData:{
                keyword:keyword,

            }
        }
    ).trigger('reloadGrid',[{page:1}]);
});

var get_v_show_flag_restriction_alert = function() {
    return window.global_show_restriction_alert;
}
var get_v_flag_restriction = function() {
    return window.global_v_flag_restriction;
}

var process = function(is_restricted,v_flag_restricted) {
    $.ajax({
        type:"POST",dataType:"json",
        url:site_url+'inhouse/do_process_stock_transaction',
        data:{is_restricted:is_restricted,v_flag_restricted:v_flag_restricted},
        success: function(response){
            if (response.success==true) {
                $.alert({
                    title:'Process Success!',icon:'fa fa-check',backgroundDismiss:false,
                    content: response.message,
                    confirmButtonClass:'btn-success',
                    confirm:function(){
                        jqgrid_data.trigger('reloadGrid');
                        $('.grid-alert').html('');
                    }
                })
            } else {
                Template.WarningAlert(response.message);
            }
        },
        error: function(){
            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
        }
    });
}

$('#btn_process').click(function(e){
    e.preventDefault();
    var statusCompliance=null;

    var data = jqgrid_data.jqGrid('getRowData');
    if (get_v_flag_restriction()!='1') {
        for ( i in data ) {
            statusCompliance = data[i].status_compliance;
            console.log(statusCompliance);
            if (statusCompliance=='2') {
                window.global_show_restriction_alert=true;
                window.global_v_flag_restriction='2';
            }
        }
    }

    $.confirm({
        title:'Process',icon:'fa fa-warning',backgroundDismiss:false,
        content:'Proses Asset Class. Apakah anda yakin?',
        confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
        confirm: function(){
            v_show_flag_restriction_alert = get_v_show_flag_restriction_alert();
            v_flag_restriction = get_v_flag_restriction();
            if (v_show_flag_restriction_alert==true) {
                $.confirm({
                    title:'Konfirmasi',icon:'fa fa-warning',backgroundDismiss:false,
                    content:'Melebihi Ketentuan! Lanjutkan atau Batalkan ?',
                    confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
                    confirmButton: 'Lanjutkan',
                    cancelButton: 'Batalkan',
                    confirm: function(){
                        process(true,v_flag_restriction);
                    }
                });
            } else {
                process(false,null);
            }
        }
    });
});

$('#btn_verify').click(function(e){
    e.preventDefault();
    keyword = $('#keyword').val();
    selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');
    $.ajax({
        type:"POST",dataType:"json",data:{keyword:keyword,id:selarrrow},
        url:site_url+'inhouse/do_verify_stock_transaction',
        success: function(response){
            if (response.success==true) {
                jqgrid_data.trigger('reloadGrid');
                if (response.status=='OK') {
                    message = '<span class="label label-success">'+response.message+'</span>';
                    window.global_show_restriction_alert=false;
                    window.global_v_flag_restriction=null;
                } else {
                    message = '<span class="label label-danger">'+response.message+'</span>';
                    window.global_show_restriction_alert=true;
                    window.global_v_flag_restriction='1';
                }
                $('.grid-alert').html(message);
            } else {
                Template.WarningAlert(response.message);
            }
        },
        error: function(){
            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
        }
    })
            
});

$('#btn_reject').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Reject Stock Transaction. Apakah anda yakin?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'inhouse/do_reject_stock_transaction',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Reject Success!',icon:'fa fa-check',backgroundDismiss:false,
                                content: response.message,
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    jqgrid_data.trigger('reloadGrid');
                                    $('.grid-alert').html('');
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
});

});