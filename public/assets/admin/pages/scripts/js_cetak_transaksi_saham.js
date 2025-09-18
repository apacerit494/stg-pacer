$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit')

$("#jqgrid_data").jqGrid({
    url: site_url+'/report/jqgrid_cetak_transaksi_saham',
    mtype: "GET",
    datatype: "json",
    postData:{
        fund_code:function(){ return $('#fund_code').val() },
        ticker:function(){ return $('#ticker').val() },
        tradedatefrom:function(){ return $('#tradedatefrom').val() },
        tradedateto:function(){ return $('#tradedateto').val() }
    },
    colModel: [
         { label: 'ID' , name: 'id', key:true, width: 80, align:'center',hidden:true }
        ,{ label: 'Fund Name' , name: 'fund_group_name', key:true, width: 80, align:'center' }
        , { label: 'Sell Buy Flag', name: 'sell_buy_flag', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "B":
                return 'Buy';
                break;
                case "S":
                return 'Sell';
                break;
                
                default:
                return cellvalue;
                break;
            }
        } }
        ,{ label: 'Ticker' , name: 'ticker', width: 100, align:'left' }
        ,{ label: 'Trade Date' , name: 'trade_date', width: 150, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Settelment Date' , name: 'settlement_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Price' , name: 'price', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Quantity Sheet' , name: 'quantity_sheet', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Quantity Lot' , name: 'quantity_lot', width: 100, align:'right' }
        ,{ label: 'Transaction fee' , name: 'transaction_fee', width: 100, align:'right' }
        ,{ label: 'Amount' , name: 'amount', width: 100, align:'right' ,formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Settelment Amount' , name: 'settlement_amount', width: 100, align:'right' ,formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        
      ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "fund_code",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$("#t_jqgrid_data").append('<button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');


$('#btn_search').click(function(e){
    e.preventDefault();
    tradedate = $('#tradedate').val();
    if (tradedate=='') {
        Template.WarningAlert('Please Select a Trade date');
    } else {
        $('#jqgrid_data').setGridParam({postData:{trade_date:tradedate}}).trigger('reloadGrid',[{page:1}]);
    }
})

$('#btn_export').click(function(){
    fund_code=($('#fund_code').val()=="")?'-':$('#fund_code').val();
    ticker=($('#ticker').val()=="")?'-':$('#ticker').val();
    tradedatefrom = $('#tradedatefrom').val().replace(/\//g,'');
    tradedateto = $('#tradedateto').val().replace(/\//g,'');
    tradedatefrom=(tradedatefrom=="")?"-":tradedatefrom;
    tradedateto=(tradedateto=="")?"-":tradedateto;

    window.open(site_url+'excel/export_report_cetak_transaksi_saham/'+tradedatefrom+'/'+tradedateto+'/'+fund_code+'/'+ticker);
})

$('#btn_pdf').click(function(){
    fund_code=($('#fund_code').val()=="")?'-':$('#fund_code').val();
    ticker=($('#ticker').val()=="")?'-':$('#ticker').val();
    tradedatefrom = $('#tradedatefrom').val().replace(/\//g,'');
    tradedateto = $('#tradedateto').val().replace(/\//g,'');
    tradedatefrom=(tradedatefrom=="")?"-":tradedatefrom;
    tradedateto=(tradedateto=="")?"-":tradedateto;
    
    window.open(site_url+'pdf/export_report_cetak_transaksi_saham/'+tradedatefrom+'/'+tradedateto+'/'+fund_code+'/'+ticker);
});
})