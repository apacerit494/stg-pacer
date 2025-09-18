$(function(){

    $('#btn_search').click(function(e){
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
    })

    $("#jqgrid_data").jqGrid({
        url: site_url+'/inhouse/jqgrid_deposit_report',
        mtype: "GET",
        datatype: "json",
        postData:{
            periode1: function(){
                var periode1 = $('#periode1').val();
                if (periode1!="") {
                    periode1 = Template.ToDateDefault(periode1);
                }
                return periode1;
            },
            periode2: function(){
                var periode2 = $('#periode2').val();
                if (periode2!="") {
                    periode2 = Template.ToDateDefault(periode2);
                }
                return periode2;
            },
            status: function(){
                var status = $('#status').val();
                return status;
            }
        },
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Fund Group' , name: 'fund_group_name', width: 100, align:'left' }
            ,{ label: 'Bank Name' , name: 'bank_name', width: 150, align:'left' }
            ,{ label: 'Account Number' , name: 'account_number', width: 150, align:'left' }
            ,{ label: 'Nominal' , name: 'amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
            ,{ label: 'Open Date' , name: 'open_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Last Due Date' , name: 'last_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Next Due Date' , name: 'next_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Profit Return Rasio' , name: 'profit_return_rasio', width: 100, align:'left', hidden:true }
            ,{ label: 'Last Yield' , name: 'last_yield', width: 100, align:'left', hidden:true }
            ,{ label: 'Return Last Due Date' , name: 'return_last_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Return Next Due Date' , name: 'return_next_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Contract Month' , name: 'contract_month', width: 100, align:'left', hidden:true }
            ,{ label: 'Payment Return Mode' , name: 'payment_return_mode', width: 100, align:'left', hidden:true }
            ,{ label: 'Current Account Number' , name: 'current_account_number', width: 100, align:'left', hidden:true }
            ,{ label: 'Flag ARO' , name: 'aro_flag', width: 100, align:'left'  , formatter:function(cellvalue){
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
            ,{ label: 'Flag Profit Sharing' , name: 'profit_sharing_flag', width: 100, align:'left', hidden:true }
            ,{ label: 'Break Date' , name: 'break_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Maturity Date' , name: 'maturity_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Status' , name: 'status', width: 100, align:'center', formatter:function(cellvalue) {
                switch(cellvalue) {
                    case"0":
                    return "<label class='label label-sm label-danger'>UnVerified</label>";
                    break;
                    case"1":
                    return "<label class='label label-sm label-info'>Verified</label>";
                    break;
                    case"2":
                    return "<label class='label label-sm label-warning'>UnVerified Break</label>";
                    break;
                    case"3":
                    return "<label class='label label-sm label-warning'>UnVerified Maturity</label>";
                    break;
                    case"4":
                    return "<label class='label label-sm label-info'>Break</label>";
                    break;
                    case"5":
                    return "<label class='label label-sm label-info'>Maturity</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ label: 'Created Stamp' , name: 'created_stamp', width: 100, align:'left', hidden:true }
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

$('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-success btn-sm2" id="btn_export_excel" title="Change Status"><i class="fa fa-book"></i> Export to Excel</a> \
    <a class="btn btn-danger btn-sm2" id="btn_export_pdf" title="Change Status"><i class="fa fa-print"></i> Export to PDF</a> \
    </div> \
    ');
$('#btn_export_excel').click(function(){
    var periode1 = $('#periode1').val();
    if (periode1!="") {
        periode1 = Template.ToDateDefault(periode1);
    } else {
        periode1 = '-';
    }
    var periode2 = $('#periode2').val();
    if (periode2!="") {
        periode2 = Template.ToDateDefault(periode2);
    } else {
        periode1 = '-';
    }
    window.open(site_url+'excel/deposit_report/'+periode1+'/'+periode2,'_blank');
})
$('#btn_export_pdf').click(function(){
    var periode1 = $('#periode1').val();
    if (periode1!="") {
        periode1 = Template.ToDateDefault(periode1);
    } else {
        periode1 = '-';
    }
    var periode2 = $('#periode2').val();
    if (periode2!="") {
        periode2 = Template.ToDateDefault(periode2);
    } else {
        periode1 = '-';
    }
    window.open(site_url+'pdf/deposit_report/'+periode1+'/'+periode2,'_blank');
})
});