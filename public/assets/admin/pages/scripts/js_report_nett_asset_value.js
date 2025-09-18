$(function(){

    
$('#btn_excel').click(function(e){
    e.preventDefault();
    valuationdate = $('#valuationdate').val().replace(/\//g,'');
    valuationdate=(valuationdate=="")?"-":valuationdate;
    window.open(site_url+'excel/report_nett_asset_value/'+valuationdate);
})


})