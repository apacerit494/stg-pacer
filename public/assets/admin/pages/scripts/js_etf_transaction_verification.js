window.global_benefit_rider = {};

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),pager_jqgrid_data = '#jqgrid_data_pager';

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_etf_transaction_verification',
    mtype: "GET",
    datatype: "json",
    colModel: [
         {label:'ID',name:'id',key:true,hidden:true}
        ,{label:'Fund Group',name:'fund_code',align:'center'}
        ,{label:'Sell/Buy',name:'sell_buy_flag', width:100,align:'center',formatter:function(cellvalue){
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
        ,{label:'FM Code',name:'fm_code',align:'center'}
        ,{label:'ETF Code',name:'etf_code',align:'center'}
        ,{label:'ETF Type',name:'etf_type', width:100,align:'center',formatter:function(cellvalue){
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
        ,{label:'NAV Date',name:'nav_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Settlement Date',name:'settlement_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'NAV',name:'nav',width:150,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Amount',name:'amount',width:150,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Subscription Fee',name:'subscription_fee',width:150,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Settlement Amount',name:'settlement_amount',width:150,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Total Unit',name:'total_unit',width:150,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Custody Code',name:'custody_code',align:'center'}
        ,{label:'Classification',name:'classification',align:'center'}
        ,{label:'status',name:'status',hidden:true}
        ,{ label: 'Status Compliance' , name: 'status_compliance', width: 100, align:'center', formatter:function(cellvalue){
            switch(cellvalue) {
                case"0":
                return "-";
                break;
                case"1":
                return "<label class='label label-sm label-success'>OK</label>";
                break;
                default:
                return cellvalue;
                break;
            }
        } }
        
        
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




$('#btn_process').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Verification',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Verification ETF Transaction. Are You Sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'/inhouse/do_verify_etf_transaction',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Verification Success!',icon:'fa fa-check',backgroundDismiss:false,
                                content: response.message,
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    jqgrid_data.trigger('reloadGrid');
                                }
                            })
                        } else {
                            Template.WarningAlert(response.message);
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

$('#btn_reject').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Reject ETF Transaction. Are you sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'/inhouse/do_reject_etf_Transaction',
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
    $.ajax({
        type:"POST",dataType:"json",
        url:site_url+'/inhouse/do_allocation_verify_etf_transaction',
        success: function(response){
            if (response.success==true) {
                $("#jqgrid_data").trigger('reloadGrid');
                if (response.status=='OK') {
                    message = '<span class="label label-success">'+response.message+'</span>';
                } else {
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
    })         
});

});
