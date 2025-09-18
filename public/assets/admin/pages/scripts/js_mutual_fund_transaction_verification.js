window.global_benefit_rider = {};
window.global_show_restriction_alert = false;
window.global_v_flag_restriction = null;

var get_v_show_flag_restriction_alert = function() {
    return window.global_show_restriction_alert;
}
var get_v_flag_restriction = function() {
    return window.global_v_flag_restriction;
}

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),pager_jqgrid_data = '#jqgrid_data_pager';

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_mutual_fund_transaction_verification',
    mtype: "GET",
    datatype: "json",
    colModel: [
         {label:'ID',name:'id',key:true,hidden:true}
        ,{ label: 'Status Compliance' , name: 'status_compliance', width: 100, align:'center', formatter:function(cellvalue){
            if (cellvalue==1) {
                return "<span class='label label-success'>OK</span>";
            } else if (cellvalue==2) {
                return "<span class='label label-danger'>Exceed</span>";
            } else if (cellvalue==0) {
                return "--";
            } else {
                return "";
            }
        } }
        ,{label:'Fund Group',name:'fund_code',align:'center',width:80}
        ,{label:'Sell/Buy',name:'sell_buy_flag', width:60,align:'center',formatter:function(cellvalue){
            switch(cellvalue){
                case "S":
                return "Sell";
                break
                case "B":
                return "Buy";
                break;
                default:
                return "-";
                break;
           }
        }}
        ,{label:'Mutual Fund',name:'mf_code',align:'left', width: 250}
        ,{label:'Type',name:'mf_type', width:80,align:'center',formatter:function(cellvalue){
            switch(cellvalue){
                case "E":
                return "Eqiuity";
                break
                case "B":
                return "Balanced";
                break;
                case "F":
                return "Fix Income";
                break;
                default:
                return "-";
                break;
           }
        }}
        ,{label:'NAV Date',name:'nav_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d-m-Y'}}
        ,{label:'Settlement Date',name:'settlement_date',width:100,align:'center',hidden:true,formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'NAV',name:'nav',width:100,align:'right',hidden:true,formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:4,defaultValue:'0' }}
        ,{label:'Total Unit',name:'total_unit',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Amount',name:'amount',width:100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0' }}
        // ,{label:'Transaction Fee',name:'transaction_fee',width:100,align:'right'}
        ,{label:'Settlement Amount',name:'settlement_amount',width:100,align:'right',hidden:true,formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' }}
        ,{label:'Classification',name:'classification',width:55,align:'center'}
        ,{label:'Bank Custody',name:'custody_code',align:'left'}
        ,{label:'status',name:'status',hidden:true}
        ,{label:'_status_compliance',name:'_status_compliance',hidden:true}
        
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
    <button class="btn btn-success btn-sm2" id="btn_process" title="Process"><i class="fa fa-refresh"></i> Process</button> \
    <button class="btn btn-success btn-sm2" id="btn_verify" title="Allocation Verify"><i class="fa fa-check"></i> Allocation Verify</button> \
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

var process = function(is_restricted,v_flag_restricted) {
    $.ajax({
        type:"POST",dataType:"json",data:{
            ids:selarrrow,
            is_restricted:is_restricted,
            flag_restricted:v_flag_restricted
        },url:site_url+'inhouse/do_process_mutual_fund_transaction',
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
            statusCompliance = data[i]._status_compliance;
            console.log(statusCompliance);
            if (statusCompliance=='2') {
                window.global_show_restriction_alert=true;
                window.global_v_flag_restriction='2';
            }
        }
    }

    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Proses',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Proses Mutual Fund Transaction. Apakah anda yakin?',
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
    } else {
        Template.WarningAlert("Please select a Row.")
    }
            
});

$('#btn_reject').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Reject Mutual Fund Transaction. Are you sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'inhouse/do_reject_mutual_fund_Transaction',
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


    
$('#btn_verify').click(function(e){
    e.preventDefault();
     keyword = $('#keyword').val();
     selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');
    $.ajax({
        type:"POST",dataType:"json",data:{keyword:keyword,id:selarrrow},
        url:site_url+'/inhouse/do_allocation_verify_mutual_fund',
        success: function(response){
            if (response.success==true) {
                $("#jqgrid_data").trigger('reloadGrid');
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



});
