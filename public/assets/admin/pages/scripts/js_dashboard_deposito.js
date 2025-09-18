window.defensive_bigcap = 0;
window.defensive_midcap = 0;
window.defensive_smallcap = 0;
window.cyclical_bigcap = 0;
window.cyclical_midcap = 0;
window.cyclical_smallcap = 0;
v_n_mftype1 = 0;
v_n_mftype2 = 0;
v_n_mftype3 = 0;
v_n_mftype4 = 0;
v_n_mftype5 = 0;
v_n_mftype6 = 0;

var Dashboard = {
	reload_dashboard_deposito_data : function (date,fund) {
    	Metronic.blockUI({
            target: '#wrapper-asset',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
    			date:date,fund:fund
    		},
    		url:site_url+'dashboard/deposito_data',
    		success:function(response) {
                // dataasset = response.dataasset;
                databanks = response.databank;
                datapanel = response.datapanel;
                tenor = datapanel.tenor;
                bank_class = datapanel.bank_class;
                bank_type = datapanel.bank_type;
                avg_rate = datapanel.avg_rate;
                // BEGIN ASSETs DATA
                // $('#asset tbody').html(dataasset);
                // if (dataasset=="") {
                //     $('#asset tbody').html('<tr><td colspan="17" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                // }
                // END ASSETs DATA
                // BEGIN banks DATA
                $('#banks tbody').html(databanks);
                if (databanks=="") {
                    $('#banks tbody').html('<tr><td colspan="9" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                // END banks DATA
                // BEGIN PANELS DATA

                // begin tenor
                t = '';
                for ( x in tenor ) {
                    t += '<tr><td style="text-align:right;font-weight:bold;padding-right:10px;width:40%;text-align:right;">'+tenor[x].tenor+'</td><td style="text-align:left;">'+tenor[x].percentage+'</td></tr>';
                }
                $('.tenor-in-month table tbody').html(t);
                // end tenor

                // begin bank class
                bc = '';
                for ( y in bank_class ) {
                    bc += '<tr><td style="padding-right:10px;width:40%;text-align:right;">'+bank_class[y].class+'</td><td style="text-align:left;">'+bank_class[y].percentage+'</td></tr>';
                }
                $('.bank-class table tbody').html(bc);
                // end bank class

                // begin bank type
                bt = '';
                for ( z in bank_type ) {
                    pbar = '<div style="width:'+bank_type[z].amt_percentage+'%;background:blue;height:11px;float:left;margin-right:4px;"></div>';
                    bt += '<tr><td style="text-align:right;font-weight:bold;padding-right:10px;font-size:10px;width:35%;white-space:normal;">'+bank_type[z].type+'</td>'+
                               '<td style="font-size:10px;width:65%;">'+pbar+bank_type[z].percentage+'</td></tr>';
                }
                $('.bank-type table tbody').html(bt);
                // end bank type

                // average rates
                avg_rate_gross = avg_rate.gross;
                avg_rate_nett = avg_rate.nett;
                $('.gross','.average-rate').html(avg_rate_gross);
                $('.net','.average-rate').html(avg_rate_nett);
            
                // BEGIN PANELS DATA
    			Metronic.unblockUI('#wrapper-asset');
    		},
    		error: function(){
                $('#asset tbody').html('<tr><td colspan="17" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                $('#asset').show();
    			$('#security tbody').html('<tr><td colspan="10" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			$('#security').show();
                Metronic.unblockUI('#wrapper-asset');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    }
}

$(function(){
    var date = $('#date');
    var fund = $('#fund');

    Dashboard.reload_dashboard_deposito_data(date.val(),fund.val());

    $('#search').click(function(e){
    	e.preventDefault();
    	bValid = true;
    	if (date.val()=="") {
    		date.addClass('error');
    		bValid=false;
    	} else {
    		date.removeClass('error');
    	}
    	if (fund.val()=="") {
    		fund.addClass('error');
    		bValid=false;
    	} else {
    		fund.removeClass('error');
    	}

    	if (bValid===true) {
	    	Dashboard.reload_dashboard_deposito_data(date.val(),fund.val());
	    }
    });

})