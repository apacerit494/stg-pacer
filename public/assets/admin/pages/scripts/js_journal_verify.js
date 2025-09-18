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
        url: site_url+'/inhouse/jqgrid_journal_verify',
        mtype: "GET",
        datatype: "json",
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Fund Group' , name: 'fund_group_name', width: 100, align:'left' }
            ,{ label: 'Voucher Ref' , name: 'voucher_ref', width: 100, align:'left' }
            ,{ label: 'Voucher Date' , name: 'voucher_date', width: 100, align:'left',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}  }
            ,{ label: 'Voucher Number' , name: 'voucher_no', width: 150, align:'left'}
            ,{ label: 'Description' , name: 'description', width: 350, align:'left'}
            ,{ label: 'Voucher Type' , name: 'voucher_type', width: 100, align:'center'}
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
           
            ,{ name: 'v_status', hidden:true }
            ,{ name: 'fund_group', hidden:true }
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
        pager: "#jqgrid_data_pager",
        ondblClickRow:function(row_id){
            $('#dialog_preview_transaction').dialog('open');
            
            var data = $("#jqgrid_data").jqGrid('getRowData',row_id);
            var id=data.id;
            var voucher_no=data.voucher_no;
            var description=data.description;
            var voucher_date=data.voucher_date;
            var status=data.v_status;
            if (status=='0') {
                $('.ui-dialog-buttonset button:nth-child(1)').show();
            } else {
                $('.ui-dialog-buttonset button:nth-child(1)').hide();
            }
            $('#id','#dialog_preview_transaction').val(id);
            $('#voucher_no','#dialog_preview_transaction').html(voucher_no);
            $('#description','#dialog_preview_transaction').html(description);
            $('#voucher_date','#dialog_preview_transaction').html(voucher_date);
            $('#jqgrid_data_preview').setGridParam({postData:{voucher_no:voucher_no}}).trigger('reloadGrid',[{page:1}]);
        }
    });
    
    $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-danger btn-sm2" id="btn_print"><i class="fa fa-print"></i> Print</a> \
        <span style="color:green">&nbsp; &nbsp; &nbsp; (* Double Klik untuk Melihat Detail Transaksi & Verify Transaksi</span> \
            <div class="grid-alert" style="width:40%;text-align:center;margin-left:30%;margin-right:30%;position:absolute;margin-top:3px;"></div> \
    ');

    
    $("#jqgrid_data_preview").jqGrid({
        url: site_url+'/inhouse/jqgrid_journal_verify_preview',
        mtype: "GET",
        datatype: "json",
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Account No.' , name: 'account_no', width: 100, align:'center' }
            ,{ label: 'Description' , name: 'description', width: 220 }
            ,{ label: 'Amount' , name: 'amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
            ,{ label: 'Debit/Credit' , name: 'debit_credit_flag', align:'center', width: 90, formatter: function(cellvalue){
                switch(cellvalue) {
                    case"D":
                    return "<label class='label label-xs label-danger'>Debit</label>";
                    break;
                    case"C":
                    return "<label class='label label-xs label-success'>Credit</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } },
            { name: 'voucher_no', hidden:true},
            { name: 'voucher_ref', hidden:true}
        ],
        viewrecords: true,
        width: 560,
        // autowidth: true,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        // 'cellEdit':true,
        shrinkToFit: false,
        toolbar: [false, "top"],
        sortname: "id",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_preview_pager"
    });

    $("#dialog_preview_transaction").dialog({
        autoOpen: false,
        modal: true,
        title: 'Preview Transaction',
        width: 600,
        height: 500,
        buttons: {
            'Verify': function(){
                verify();
            },
            'Close': function(){
                $(this).dialog('close');
            }
        }
    })

    
    $('#btn_search').click(function(e){
        e.preventDefault();

        keyword = $('#keyword').val();
        date1 = $('#date1').val();
        date2 = $('#date2').val();

        if (date1!="") date1 = Template.ToDateDefault(date1)
        if (date2!="") date2 = Template.ToDateDefault(date2)
        $('#jqgrid_data').setGridParam(
            {
                postData:{
                    keyword:keyword,
                    date1:date1,
                    date2:date2
                }
            }
        ).trigger('reloadGrid',[{page:1}]);
    })

    

    // grid button
    var grid_process = $('#btn_process',jqgrid);
    var grid_verify = $('#btn_verify',jqgrid);
    var grid_reject = $('#btn_reject',jqgrid);
   
    $('#btn_reject').click(function(e){
        e.preventDefault();
        selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
        if (selarrrow.length>0) {
            $.confirm({
                title:'Reject',icon:'fa fa-warning',backgroundDismiss:false,
                content:'Reject Journal. Are you sure?',
                confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
                confirm: function(){
                    $.ajax({
                        type:"POST",dataType:"json",data:{
                            ids:selarrrow
                        },url:site_url+'/inhouse/do_reject_journal_verify',
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
   

    var verify = function(){
        var id = $('#id','#dialog_preview_transaction').val();
        $.confirm({
            title:'Verification',icon:'fa fa-warning',backgroundDismiss:false,
            content:'Verification Journal. Are You Sure?',
            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
            confirm: function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        id:id
                    },url:site_url+'/inhouse/do_journal_verify',
                    success: function(response){
                        if (response.success==true) {
                            $.alert({
                                title:'Verification Success!',icon:'fa fa-check',backgroundDismiss:false,
                                content: response.message,
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    jqgrid_data.trigger('reloadGrid');
                                    $('#dialog_preview_transaction').dialog('close');
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
    };
    
    $('#btn_print').click(function(e){
        e.preventDefault();
        selarrrow = jqgrid_data.jqGrid('getGridParam','selarrrow');
        if (selarrrow.length>0) {
            var vno = [];
            var bValid=true;
            for ( i in selarrrow ) {
                selrow = selarrrow[i];
                data = jqgrid_data.jqGrid('getRowData',selrow);
                voucher_no = data.voucher_no;
                status = data.v_status;
                if (status=='0') {
                    bValid=false;
                    break;
                }
                vno.push(voucher_no);
            }
            if (bValid==true) {
                $('#vno').val(JSON.stringify(vno));
                $('#formPrint').submit();
            } else {
                Template.WarningAlert("Voucher dengan Status Unverified tidak bisa di Print !");
            }
        } else {
            Template.WarningAlert("Please select a Row !");
        }
    });
})