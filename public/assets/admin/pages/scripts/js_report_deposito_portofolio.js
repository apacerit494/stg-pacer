$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit')

$("#jqgrid_data").jqGrid({
    url: site_url+'/report/jqgrid_report_deposito_portofolio',
    mtype: "GET",
    datatype: "json",
    postData:{
        valuation_date:function(){ return $('#valuation_date').val() },
        fund_code:function(){ return $('#fund_code').val() },
        bank_name:function(){ return $('#bank_name').val() }
    },
    colModel: [
        { label: 'ID' , name: 'id', key:true, width: 80, align:'center',hidden:true }
        ,{ label: 'Fund Group' , name: 'fund_group_code', key:true, width: 80, align:'center' }
        ,{ label: 'Account Number' , name: 'account_number', width: 150, align:'left' }
        ,{ label: 'Amount' , name: 'amount', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Due Return' , name: 'due_return', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Paid Return' , name: 'paid_return', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Bank Name' , name: 'bank_name', width: 100, align:'left' }
        ,{ label: 'Branch Code' , name: 'branch_code', width: 100, align:'left' }
        ,{ label: 'Bank Type' , name: 'bank_type', width: 100, align:'left' }
        ,{ label: 'Sharia Flag' , name: 'sharia_flag', width: 100, align:'left' }
        ,{ label: 'Break Date' , name: 'break_date', width: 150, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Maturity Date' , name: 'maturity_date', width: 150, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
       
    ],
     viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "fund_group_code",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$("#t_jqgrid_data").append('<button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

$('#btn_search').click(function(e){
    e.preventDefault();
    valuation_date = $('#valuation_date').val();
    if (valuation_date=='') {
        Template.WarningAlert('Please Select a valuation date');
    } else {
        $('#jqgrid_data').setGridParam({postData:{valuation_date:valuation_date}}).trigger('reloadGrid',[{page:1}]);
    }
})

$('#btn_export').click(function(){
    valuation_date = $('#valuation_date').val().replace(/\//g,'');
    valuation_date=(valuation_date=="")?"-":valuation_date;
    fund_code=($('#fund_code').val()=="")?'-':$('#fund_code').val();
    bank_name=($('#bank_name').val()=="")?'-':$('#bank_name').val();
    
    window.open(site_url+'excel/report_deposito_portofolio/'+valuation_date+'/'+fund_code+'/'+bank_name);
})

$('#btn_pdf').click(function(){
   valuation_date = $('#valuation_date').val().replace(/\//g,'');
    valuation_date=(valuation_date=="")?"-":valuation_date;
    fund_code=($('#fund_code').val()=="")?'-':$('#fund_code').val();
    bank_name=($('#bank_name').val()=="")?'-':$('#bank_name').val();
    
    window.open(site_url+'pdf/report_deposito_portofolio/'+valuation_date+'/'+fund_code+'/'+bank_name);
});
})