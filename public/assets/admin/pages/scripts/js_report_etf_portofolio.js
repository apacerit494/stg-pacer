$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormUpload = $("#FormUpload");

$("#jqgrid_data").jqGrid({
    url: site_url+'/report/jqgrid_report_etf_portofolio',
    mtype: "GET",
    datatype: "json",
     postData:{ 
      fund : function(){return $("#fund").val()},
      fm_code : function(){return $("#fm_code").val()} 
    },
    colModel: [
         { label: 'Fund Group' , name: 'fund_group_name', key:true, width: 80, align:'center' }
        ,{ label: 'Fund Manager' , name: 'fm_code', width: 150, align:'left' }
        ,{ label: 'Clasification' , name: 'classification', width: 100, align:'left' }
        //,{ label: 'Broker' , name: 'broker', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Total Buy' , name: 'total_buy', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Total Sell' , name: 'total_sell', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Available' , name: 'Available', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "fund_group_name",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});
$("#t_jqgrid_data").append('<button class="jqGrid_export" id="btn_export"></button> <button class="jqGrid_print" id="btn_pdf"></button>');


/*BEGIN SEARCH*/
$("#btn_search").click(function(e){
    e.preventDefault();
   $("#jqgrid_data").trigger('reloadGrid');
});
/*END SEARCH*/

// EVENT CLICK EXPORT KE EXCEL
$('#btn_export').click(function(){
    fund_code = $('#fund').val();
    fm_code = $('#fm_code').val();
    fund_code=(fund_code=="")?'-':fund_code;
    fm_code=(fm_code=="")?'-':fm_code;
    window.open(site_url+'excel/report_etf_portofolio/'+fund_code+'/'+fm_code)
})

// EVENT CLICK EXPORT KE EXCEL
$('#btn_pdf').click(function(){
    fund_code = $('#fund').val();
    fm_code = $('#fm_code').val();
    fund_code=(fund_code=="")?'-':fund_code;
    fm_code=(fm_code=="")?'-':fm_code;
    window.open(site_url+'pdf/report_etf_portofolio/'+fund_code+'/'+fm_code)
})

})