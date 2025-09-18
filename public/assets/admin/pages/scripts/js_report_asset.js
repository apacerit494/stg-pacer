$(function(){
    
    $('#btn_export').click(function(e){
        e.preventDefault();
        fund_code = $('#fund_code').val();
        valuation_date = $('#valuation_date').val().replace(/\//g,'');
        valuation_date=(valuation_date=="")?"-":Template.ToDateDefault($('#valuation_date').val());
        if (fund_code!="" && valuation_date!="-") {
            window.open(site_url+'excel/report_asset/'+valuation_date+'/'+fund_code);
        } else {
            Template.WarningAlert("The form not complete, please check again !");
        }
    });

    $('#btn_pdf').click(function(e){
        e.preventDefault();
        fund_code = $('#fund_code').val();
        valuation_date = $('#valuation_date').val().replace(/\//g,'');
        valuation_date=(valuation_date=="")?"-":Template.ToDateDefault($('#valuation_date').val());
        if (fund_code!="" && valuation_date!="-") {
            window.open(site_url+'pdf/report_asset/'+valuation_date+'/'+fund_code);
        } else {
            Template.WarningAlert("The form not complete, please check again !");
        }
    });

})