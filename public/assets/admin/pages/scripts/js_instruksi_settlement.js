$(function(){

var jqgrid_data = $('#jqgrid_data'),pager_jqgrid_data = '#jqgrid_data_pager';

$('#btn_search').click(function(e){
    e.preventDefault();
    jqgrid_data.trigger('reloadGrid');
})

jqgrid_data.jqGrid({
    url: site_url+'inhouse/jqgrid_instruksi_settlement',
    mtype: "GET",
    datatype: "json",
    postData:{
        trade_date:function(){ return $('#trade_date').val() }
    },
    colModel: [
         {label:'ID',name:'id',key:true,hidden:true}
        ,{label:'fund_code',name:'fund_code',hidden:true}
        ,{label:'Fund Group',name:'fund_name',width:100,align:'center'}
        ,{label:'Flag S/B',name:'sell_buy_flag', width:100,align:'center',formatter:function(cellvalue){
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
        ,{label:'ticker',name:'ticker',hidden:true}
        ,{label:'Emiten',name:'emiten_name',width:150}
        ,{label:'Trade Date',name:'trade_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Settlement Date',name:'settlement_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}}
        ,{label:'Classification',name:'classification',width:100,align:'center'}
        ,{label:'Price',name:'price',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Quantity Sheet',name:'quantity_sheet',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Compliance',name:'compliance',align:'center',width:100,formatter:function(cellvalue){
            if (cellvalue==1) {
                return "<span class='label label-success'>OK</span>";
            } else if (cellvalue==2) {
                return "<span class='label label-danger'>NOT OK</span>";
            } else {
                return "";
            }
        }}
        ,{label:'Quantity Lot',name:'quantity_lot',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Transaction Fee',name:'transaction_fee',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Amount',name:'amount',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Settlement Amount',name:'settlement_amount',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'Bank Custody',name:'bank_custody_code'}
        ,{label:'Broker',name:'broker_name'}
        ,{label:'Realized PL',name:'realized_pl',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
        ,{label:'AVG Price',name:'avg_price',width:120,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
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
    multiselect: false,
    pager: pager_jqgrid_data,
    grouping: true,
    groupingView: {
        groupField : ['bank_custody_code'],
        groupColumnShow : [false],
        groupText : ['<b>{0} - {1} Item(s)</b>'],
        groupCollapse : false,
        groupOrder: ['asc']
    },
});


$('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-danger btn-sm2" id="print_pdf1" title="Print PDF"><i class="fa fa-print"></i> Mandiri Custodian</a> \
    <a class="btn btn-danger btn-sm2" id="print_pdf2" title="Print PDF"><i class="fa fa-print"></i> Deutsche Bank Custodian</a> \
    <a class="btn btn-danger btn-sm2" id="print_pdf3" title="Print PDF"><i class="fa fa-print"></i> CIMB Niaga Custodian</a> \
    </div> \
    ');
$('#print_pdf1').click(function(){
    var trade_date = $('#trade_date').val();
    if (trade_date!="") {
        trade_date = Template.ToDateDefault(trade_date);
    } else {
        trade_date = '-';
    }
    window.open(site_url+'pdf/instruksi_settlement/1/'+trade_date,'_blank');
})
$('#print_pdf2').click(function(){
    var trade_date = $('#trade_date').val();
    if (trade_date!="") {
        trade_date = Template.ToDateDefault(trade_date);
    } else {
        trade_date = '-';
    }
    window.open(site_url+'pdf/instruksi_settlement/2/'+trade_date,'_blank');
})
$('#print_pdf3').click(function(){
    var trade_date = $('#trade_date').val();
    if (trade_date!="") {
        trade_date = Template.ToDateDefault(trade_date);
    } else {
        trade_date = '-';
    }
    window.open(site_url+'pdf/instruksi_settlement/3/'+trade_date,'_blank');
})
});