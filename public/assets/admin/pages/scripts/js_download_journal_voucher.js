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
        url: site_url+'/inhouse/jqgrid_download_journal_voucher',
        mtype: "GET",
        datatype: "json",
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Fund Group' , name: 'fund_group', width: 100, align:'left' }
            ,{ label: 'Voucher Ref' , name: 'voucher_ref', width: 100, align:'left' }
            ,{ label: 'Voucher Date' , name: 'voucher_date', width: 100, align:'left',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}  }
            ,{ label: 'Voucher Number' , name: 'voucher_no', width: 150, align:'left'}
            ,{ label: 'Description' , name: 'description', width: 420, align:'left'}
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
        multiselect: false,
        pager: "#jqgrid_data_pager"
    });

    
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

    $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
        <a class="btn btn-success btn-sm2" id="btn_download"><i class="fa fa-check"></i> Dwonload To Excel</a> \
         <div class="grid-alert" style="width:40%;text-align:center;margin-left:30%;margin-right:30%;position:absolute;margin-top:3px;"></div> \
    ');

    

    // grid button
    var grid_verify = $('#btn_verify',jqgrid);
    
 

 



$('#btn_download').click(function(){
    var date1 = $('#date1').val();
    var date2 = $('#date2').val();
    var keyword = $('#keyword').val();
    if (date1!="") {
        date1 = Template.ToDateDefault(date1);
    } else {
        date1 = '-';
    }
    var date2 = $('#date2').val();
    if (date2!="") {
        date2 = Template.ToDateDefault(date2);
    } else {
        date2 = '-';
    }
    var keyword = $('#keyword').val();
    if (keyword!="") {
        keyword = keyword;
    } else {
        keyword = '-';
    }
    window.open(site_url+'excel/export_download_journal_voucher/'+date1+'/'+date2+'/'+keyword,'_blank');
})



       
})