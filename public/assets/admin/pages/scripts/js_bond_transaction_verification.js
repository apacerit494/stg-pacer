window.global_benefit_rider = {};
window.global_show_restriction_alert = false;
window.global_v_flag_restriction = null;

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),pager_jqgrid_data = '#jqgrid_data_pager';

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_bond_transaction_verification',
    mtype: "GET",
    datatype: "json",
    colModel: [
         {label:'ID',name:'id',key:true,hidden:true}
        ,{label:'Compliance',name:'compliance',width:100,align:'center',formatter:function(cellvalue){
            if (cellvalue==1) {
                return "<span class='label label-success'>OK</span>";
            } else if (cellvalue==2) {
                return "<span class='label label-danger'>Exceed</span>";
            } else {
                return "";
            }
        }}
        ,{label:'fund_code',name:'fund_code',hidden:true}
        ,{label:'Fund Group',name:'fund_name',width:100,align:'center'}
        ,{label:'Flag S/B',name:'sell_buy_flag', width:100,align:'center',formatter:function(cellvalue){
            switch(cellvalue){
                case "S":
                return "<label class='label label-sm label-danger'>SELL</label>";
                break
                case "B":
                return "<label class='label label-sm label-success'>BUY</label>";
                break;
                default:
                return "-";
                break;
            }
        }}
        ,{label:'rating',name:'rating',width:50,hidden:true}
        ,{label:'Issuer',name:'rating_issuer',width:100}
        //,{label:'rating_issuer_flag',name:'rating_issuer_flag',width:50,hidden:true}
        ,{label:'P D Flag',name:'p_d_flag',width:100, align:'center', formatter:function(cellvalue){
            switch(cellvalue){
                case"p":
                case"P":
                return "Premium";
                break;
                case"d":
                case"D":
                return "Diskon";
                break;
                case"a":
                case"A":
                return "Par";
                break;
                default:
                return cellvalue;
                break;
            }
        }}
        ,{label:'Trade Date',name:'trade_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Settlement Date',name:'settlement_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Maturity Date',name:'maturity_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Price (%)',name:'price',width:60,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Amount',name:'amount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Coupon Days',name:'coupon_days',width:100,align:'center'}
        ,{label:'Accrued Interest',name:'accrued_interest',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Total Proceed',name:'total_proceed',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Premium Discount',name:'premium_discount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'YTM (%)',name:'ytm',width:50}
        ,{label:'Tingkat Investasi Umum (%)',name:'investment_rate',width:100}
        ,{label:'Amortised Method',name:'amortised_method',width:100}
        ,{label:'broker_code',name:'broker_code',width:50,hidden:true}
        ,{label:'Broker',name:'broker_name',width:100}
        ,{label:'Custody',name:'bank_custody',width:100}
        ,{label:'bond_code',name:'bond_code',width:50,hidden:true}
        ,{label:'Bond',name:'bond_name',width:100}
        ,{label:'Coupon',name:'coupon',width:50}
        ,{label:'Last Coupon Date',name:'last_coupon_date',width:50,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'coupon_payment_method',name:'coupon_payment_method',width:50,hidden:true}
        ,{label:'coupon_frequency',name:'coupon_frequency',width:50,hidden:true}
        ,{label:'sector',name:'sector',width:50,hidden:true}
        ,{label:'subsector',name:'subsector',width:50,hidden:true}
        ,{label:'sector_issuer',name:'sector_issuer',width:50,hidden:true}
        ,{label:'sector_issuer_flag',name:'sector_issuer_flag',width:50,hidden:true}
        ,{label:'status_compliance',name:'status_compliance',hidden:true}
    ],
    viewrecords: true,
    autowidth: true,
    // height: auto,
    height: 300,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: true,
    pager: pager_jqgrid_data
});

$('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <button class="btn btn-success btn-sm2" id="btn_process" title="Verify"><i class="fa fa-refresh"></i> Verify</button> \
    <button class="btn btn-success btn-sm2" id="btn_verify" title="Compliance"><i class="fa fa-check"></i> Compliance</button> \
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

$('#btn_process').click(function(e){
    e.preventDefault();
    // var data;
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
                        process(true,v_flag_restriction)   
                    }
                });
            } else {
                process(false,null);
            }
        }
    });
});

var process = function(v_is_restrict, v_flag_restriction){

    $.ajax({
        type:"POST",dataType:"json",
        data:{is_restrict:v_is_restrict,flag_restriction:v_flag_restriction},
        url:site_url+'/inhouse/do_process_bond_transaction',
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

$('#btn_verify').click(function(e){
    e.preventDefault();
    keyword = $('#keyword').val();
    selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');

    // PROSES COMPLIANCE
    $.ajax({
        type:"POST",dataType:"json",data:{keyword:keyword,id:selarrrow},
        url:site_url+'/inhouse/do_verify_bond_transaction',
        success: function(response){
            if (response.success==true) {
                jqgrid_data.trigger('reloadGrid');
                if (response.status=='OK') {
                    message = '<span class="label label-success">'+response.message+'</span>';
                    window.global_show_restriction_alert=false;
                    window.global_v_flag_restriction=null;
                } else {
                    window.global_show_restriction_alert=true;
                    window.global_v_flag_restriction='1';
                    message = '<span class="label label-danger">'+response.message+'</span>';
                }
                $('.grid-alert').html(message);
            } else {
                Template.WarningAlert(response.message);
            }
        },
        error: function(){
            Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
        }
    });
            
});

$('#btn_reject').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Reject bond Transaction. Apakah anda yakin?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'/inhouse/do_reject_bond_transaction',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Reject Success!',icon:'fa fa-check',backgroundDismiss:false,
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
});

});