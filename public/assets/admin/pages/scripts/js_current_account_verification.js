window.global_benefit_rider = {};

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),pager_jqgrid_data = '#jqgrid_data_pager';

/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_current_account_verification',
    mtype: "GET",
    datatype: "json",
    colModel: [
         {label:'ID',name:'id',key:true,hidden:true}
        ,{label:'Bank Code',name:'bank_code'}
        ,{label:'Bank Name',name:'bank_name'}
        ,{label:'Fund Group Code',name:'fund_group_code'}
        ,{label:'Fund Group Name',name:'fund_group_name'}
        ,{label:'Branch Name',name:'branch_name'}
        ,{label:'Account Number',name:'account_number',width:150}
       ,{label:'Open Date',name:'open_date',width:150,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
       ,{label:'balance',name:'balance',width:100,align:'center'}
        
        
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
    <button class="btn btn-success btn-sm2" id="btn_verify" title="Verify"><i class="fa fa-check"></i> Verify</button> \
    <button class="btn btn-danger btn-sm2" id="btn_reject" title="Reject"><i class="fa fa-trash"></i> Delete</button> \
    </div> \
    <div class="grid-alert" style="width:40%;text-align:center;margin-left:30%;margin-right:30%;position:absolute;margin-top:3px;"></div> \
    ');




$('#btn_verify').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Verification',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Verification Current Account. Are You Sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'/inhouse/do_verify_current_account',
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

$('#btn_reject').click(function(e){
    e.preventDefault();
    selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
    if (selarrrow.length>0) {
        $.confirm({
            title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Reject Current Account. Are you sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        ids:selarrrow
                    },url:site_url+'/inhouse/do_reject_current_account',
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
