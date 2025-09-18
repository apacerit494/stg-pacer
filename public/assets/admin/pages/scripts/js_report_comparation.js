$(function(){

var btn_excel = $('#btn_excel');

btn_excel.click(function(e){
	e.preventDefault();
	valuation_date=$('#valuation_date').val();
	if (valuation_date!="") {
		valuation_date = Template.ToDateDefault(valuation_date);
		window.open(site_url+'excel/report_comparation/'+valuation_date);
	} else {
		Template.WarningAlert('Please Choose Valuation Date!')
	}
})

})