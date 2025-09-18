window.global_benefit_rider = {};

$(document).ready(function(){

var jqgrid_data = $('#jqgrid_data'),
    jqgrid_data_pager = '#jqgrid_data_pager',
    jqgrid_data_1 = $('#jqgrid_data_1'),
    jqgrid_data_2 = $('#jqgrid_data_2'),
    jqgrid_data_3 = $('#jqgrid_data_3'),
    jqgrid_data_4 = $('#jqgrid_data_4'),
    jqgrid_data_5 = $('#jqgrid_data_5')


/*DATA PESERTA*/
jqgrid_data.jqGrid({
    url: site_url+'/report/jqgrid_outsourcing_report',
    mtype: "GET",
    datatype: "json",
    postData: {
        status: function(){ return $("#Fstatus").val() }
    },
    colModel: [
        { sortable:false, label: 'id', name: 'id', key: true, hidden:true },
        { sortable:false, label: 'Contract No', name: 'contract_no', align:'center' },
        { sortable:false, label: 'Fund code', name: 'fund_code'},
        { sortable:false, label: 'FM Code', name:'fm_code'},
        { sortable:false, label: 'Amount', name:'amount', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'Max Stock', name:'max_stock', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'Max Bond', name:'max_bond', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'Min Money Market', name:'min_money_market', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'Good Fund Date', name:'good_fund_date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        { sortable:false, label: 'Month Contract Periode', name:'month_contract_periode'},
        { sortable:false, label: 'Maturity Date', name:'maturity_date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        { sortable:false, label: 'Status', name:'status'},
    ],
    viewrecords: true,
    autowidth: true,
    // height: auto,
    height: 200,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    sortname: "status,sell_buy_flag",
    sortorder: "asc",
    multiselect: false,
    pager: jqgrid_data_pager,
    ondblClickRow:function(row_id,b,c){
        var data = jqgrid_data.jqGrid('getRowData',row_id);
        var contract_no = data.contract_no;
        jqgrid_data_1.setGridParam({postData:{contract_no:contract_no,type:1}}).trigger('reloadGrid');
        jqgrid_data_2.setGridParam({postData:{contract_no:contract_no,type:2}}).trigger('reloadGrid');
        jqgrid_data_3.setGridParam({postData:{contract_no:contract_no,type:3}}).trigger('reloadGrid');
        jqgrid_data_4.setGridParam({postData:{contract_no:contract_no,type:4}}).trigger('reloadGrid');
        jqgrid_data_5.setGridParam({postData:{contract_no:contract_no,type:5}}).trigger('reloadGrid');
        
        Metronic.scrollTo($('#border-detail'))
    }
});

/*DATA PESERTA*/
jqgrid_data_1.jqGrid({
    url: site_url+'/report/jqgrid_outsourcing_report_detail',
    mtype: "GET",
    datatype: "json",
    colModel: [
        {label:'Contract No',name:'contract_no'},
        {label:'Fund Code',name:'fund_code'},
        {label:'Placemenet Break Flag',name:'placement_break_flag'},
        {label:'Bank Code',name:'bank_code'},
        {label:'Date',name:'date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        {label:'Nominal',name:'nominal', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
    ],
    viewrecords: true,
    autowidth: true,
    height: 100,
    rowNum: 1000,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    multiselect: false,
    caption:'Deposito'
});
jqgrid_data_2.jqGrid({
    url: site_url+'/report/jqgrid_outsourcing_report_detail',
    mtype: "GET",
    datatype: "json",
    colModel: [
        {label:'Contract No',name:'contract_no'},
        {label:'Fund Code',name:'fund_code'},
        {label:'Sell Buy Flag',name:'sell_buy_flag'},
        {label:'Bond Code',name:'bond_code'},
        {label:'Trade Date',name:'trade_date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        {label:'Nominal',name:'nominal', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        {label:'Price',name:'price', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
    ],
    viewrecords: true,
    autowidth: true,
    height: 100,
    rowNum: 1000,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    multiselect: false,
    caption:'Bond'
});
jqgrid_data_3.jqGrid({
    url: site_url+'/report/jqgrid_outsourcing_report_detail',
    mtype: "GET",
    datatype: "json",
    colModel: [
        {label:'Contract No',name:'contract_no'},
        {label:'Fund Code',name:'fund_code'},
        {label:'Sell Buy Flag',name:'sell_buy_flag'},
        {label:'MF Code',name:'mf_code'},
        {label:'Nav Date',name:'nav_date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        {label:'Nav',name:'nav', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        {label:'Unit',name:'unit', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
    ],
    viewrecords: true,
    autowidth: true,
    height: 100,
    rowNum: 1000,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    multiselect: false,
    caption:'Mutual Fund'
});
jqgrid_data_4.jqGrid({
    url: site_url+'/report/jqgrid_outsourcing_report_detail',
    mtype: "GET",
    datatype: "json",
    colModel: [
        {label:'Contract No',name:'contract_no'},
        {label:'Fund Code',name:'fund_code'},
        {label:'Sell Buy Flag',name:'sell_buy_flag'},
        {label:'Ticker',name:'ticker'},
        {label:'Trade Date',name:'trade_date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        {label:'Price',name:'price', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        {label:'Quantity Sheet',name:'quantity_sheet', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        {label:'Quantity Lot',name:'quantity_lot', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}        
    ],
    viewrecords: true,
    autowidth: true,
    height: 100,
    rowNum: 1000,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    multiselect: false,
    caption:'Stock'
});
jqgrid_data_5.jqGrid({
    url: site_url+'/report/jqgrid_outsourcing_report_detail',
    mtype: "GET",
    datatype: "json",
    colModel: [
        {label:'Contract No',name:'contract_no'},
        {label:'Fund Code',name:'fund_code'},
        {label:'Sell Buy Flag',name:'sell_buy_flag'},
        {label:'ETF Code',name:'etf_code'},
        {label:'Nav Date',name:'nav_date', align:'center', formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        {label:'Nav',name:'nav', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        {label:'Unit',name:'unit', align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }}
    ],
    viewrecords: true,
    autowidth: true,
    height: 100,
    rowNum: 1000,
    rownumbers: true,
    shrinkToFit: true,
    toolbar: [false, "top"],
    multiselect: false,
    caption:'ETF'
});
});
