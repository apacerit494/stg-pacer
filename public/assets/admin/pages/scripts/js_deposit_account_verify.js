// wrapper
var add = $('#add');
var edit = $('#edit');
var jqgrid = $('#jqgrid');
// form button
var add_submit = $('#btn_save',add);
var add_cancel =  $('#btn_cancel',add);
var edit_submit = $('#btn_save',edit);
var edit_cancel =  $('#btn_cancel',edit);
// form
var FormAdd = $('#FormAdd');
var FormEdit = $('#FormEdit');
var jqgrid_data = $('#jqgrid_data');

window.global_show_restriction_alert = false;
window.global_v_flag_restriction = null;


var get_v_show_flag_restriction_alert = function() {
    return window.global_show_restriction_alert;
}
var get_v_flag_restriction = function() {
    return window.global_v_flag_restriction;
}

var getNextDueDateDepositAccount = function(open_date,month,ele)
{
    if (open_date!="" && month!="") {
        $.ajax({
            type:"POST",dataType:"json",data:{
                open_date:open_date,month:month
            },
            url:site_url+'get/getNextDueDateDepositAccount',
            success:function(response){
                ele.val(Template.ToDatePicker(response.date));
            },
            error:function(){
                Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
            }
        })
    }
}

$(function(){

    $("#jqgrid_data").jqGrid({
        url: site_url+'/inhouse/jqgrid_deposit_account_verify',
        mtype: "GET",
        datatype: "json",
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Fund Group' , name: 'fund_group_name', width: 100, align:'left' }
            ,{ label: 'Bank Name' , name: 'bank_name', width: 150, align:'left' }
            ,{ label: 'Account Number' , name: 'account_number', width: 150, align:'left' }
            ,{ label: 'Open Date' , name: 'open_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Next Due Date' , name: 'next_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Amount' , name: 'amount', width: 100, align:'right', formatter:'currency',formatoptions: {decimalPlaces:'.',thousandsPlaces:',',decimalPoint:'2',defaultValue:'0'} }
            ,{ label: 'Flag ARO' , name: 'aro_flag', width: 100, align:'center' , formatter:function(cellvalue){
                switch(cellvalue){
                    case"0":
                    return "Non ARO";
                    break;
                    case"1":
                    return "ARO";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            }}
            ,{ label: 'Status' , name: 'status', width: 100, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case"0":
                    return "<label class='label label-sm label-danger'>Unverified</label>";
                    break;
                    case"1":
                    return "<label class='label label-sm label-info'>Verified</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ label: 'Status Compliance' , name: 'status_compliance', width: 100, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case"0":
                    return "-";
                    break;
                    case"1":
                    return "<label class='label label-sm label-success'>OK</label>";
                    break;
                    case"2":
                    return "<label class='label label-danger'>Exceed</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ name: 'v_status', hidden:true }
            ,{ name: 'bank_code', hidden:true }
            ,{ name: 'fund_group_code', hidden:true }
            ,{label:'_status_compliance',name:'_status_compliance',hidden:true}
        ],
        viewrecords: true,
        autowidth: true,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        // 'cellEdit':true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "id",
        sortorder: "asc",
        multiselect: true,
        pager: "#jqgrid_data_pager"
    });

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

    $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-success btn-sm2" id="btn_process"><i class="fa fa-refresh"></i> Process</a> \
        <a class="btn btn-success btn-sm2" id="btn_verify"><i class="fa fa-check"></i> Allocation Verify</a> \
        <button class="btn btn-danger btn-sm2" id="btn_reject" title="Reject"><i class="fa fa-trash"></i> Delete</button> \
        </div> \
        <div class="grid-alert" style="width:40%;text-align:center;margin-left:30%;margin-right:30%;position:absolute;margin-top:3px;"></div> \
    ');

    // grid button
    var grid_process = $('#btn_process',jqgrid);
    var grid_verify = $('#btn_verify',jqgrid);
    var grid_reject = $('#btn_reject',jqgrid);
    
    grid_reject.click(function(e){
        e.preventDefault();
        selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');
        if (selarrrow.length>0) {
            $.confirm({
                title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
                content:'Reject Transaction Deposit Account. Are you sure?',
                confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
                confirm: function(){
                    $.ajax({
                        type:"POST",dataType:"json",data:{
                            id:selarrrow
                        },url:site_url+'/inhouse/do_reject_deposit_account_transaction',
                        success: function(response){
                            if (response.success==true) {
                                $.alert({
                                    title:'Reject Success!',icon:'fa fa-check',backgroundDismiss:false,
                                    content: response.message,
                                    confirmButtonClass:'btn-success',
                                    confirm:function(){
                                        $('#jqgrid_data').trigger('reloadGrid');
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
                    })
                }
            });
        } else {
            Template.WarningAlert("Please select a Row.")
        }
    });
    grid_verify.click(function(e){
        e.preventDefault();
        keyword = $('#keyword').val();
        selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');

        $.ajax({
            type:"POST",dataType:"json",data:{keyword:keyword,id:selarrrow},
            url:site_url+'/inhouse/do_allocation_verify_deposit_account',
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
    var process = function(is_restricted,v_flag_restricted) {
        $.ajax({
            type:"POST",dataType:"json",data:{
                id:selarrrow,
                is_restricted: is_restricted,
                flag_restricted: v_flag_restricted
            },
            url:site_url+'inhouse/do_process_deposit_account',
            success:function(response){
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Verify Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('#jqgrid_data').trigger('reloadGrid')
                            $('.grid-alert').html('');
                        }
                    })
                }else{
                    Template.WarningAlert(response.error);
                }
            },
            error:function(){
                Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
            }
        })
    }
    grid_process.click(function(e){
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

        selarrrow = $('#jqgrid_data').jqGrid('getGridParam','selarrrow');
        if (selarrrow.length>0) {
            $.confirm({
                title:"Proses",icon:'fa fa-check',backgroundDismiss:false,
                content:'Proses Asset Class? Apakah Anda Yakin?',
                confirmButtonClass:'btn green',
                cancelButtonClass:'btn red',
                confirm:function(){
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
            Template.WarningAlert('Please select a row.');
        }
        
    })

})