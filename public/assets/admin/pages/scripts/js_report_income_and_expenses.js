$(function(){

var filter = $('#filter');
var table = $('#income_and_expenses');

filter.click(function(e){
	e.preventDefault();
	valuation_date=$('#valuation_date').val();
	if (valuation_date!="") {
		$("#jqgrid_data").trigger('reloadGrid');
	} else {
		Template.WarningAlert('Please Choose Valuation Date!')
	}
})


/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'report/jqgrid_report_income_and_expenses',
    mtype: "GET",
    datatype: "json",
    postData:{
    	valuation_date:function(){ return $('#valuation_date').val() }
    },
    colModel: [
        { label: 'ID', name:'id', key: true, width: 80, align:'center', hidden:true },
        { sortable:false, label: 'DESCRIPTION', width: 200 },
        { sortable:false, label: 'CURRENT ACCOUNT', width: 150 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'DEPOSIT', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'BOND', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'STOCK', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'MUTUAL FUND', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'ETF', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
        { sortable:false, label: 'DESCRE', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' }},
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$("#t_jqgrid_data").append(' \
	<button class="jqGrid_export" id="btn_excel"></button> \
	<button class="jqGrid_print" id="btn_pdf"></button> \
');

var btn_excel = $('#btn_excel');
var btn_pdf = $('#btn_pdf');

btn_excel.click(function(e){
	e.preventDefault();
	valuation_date=$('#valuation_date').val();
	if (valuation_date!="") {
		valuation_date = Template.ToDateDefault(valuation_date);
		window.open(site_url+'excel/report_income_and_expenses/'+valuation_date);
	} else {
		Template.WarningAlert('Please Choose Valuation Date!')
	}
})

btn_pdf.click(function(e){
	e.preventDefault();
	valuation_date=$('#valuation_date').val();
	if (valuation_date!="") {
		valuation_date = Template.ToDateDefault(valuation_date);
		window.open(site_url+'pdf/report_income_and_expenses/'+valuation_date);
	} else {
		Template.WarningAlert('Please Choose Valuation Date!')
	}
})

})