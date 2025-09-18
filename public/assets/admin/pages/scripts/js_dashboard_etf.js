window.defensive_bigcap = 0;
window.defensive_midcap = 0;
window.defensive_smallcap = 0;
window.cyclical_bigcap = 0;
window.cyclical_midcap = 0;
window.cyclical_smallcap = 0;
v_n_etftype1 = 0;
v_n_etftype2 = 0;
v_n_etftype3 = 0;
v_n_etftype4 = 0;
v_n_etftype5 = 0;
v_n_etftype6 = 0;

var Dashboard = {
	reload_dashboard_etf_data : function (date,fund) {
    	Metronic.blockUI({
            target: '#wrapper-asset',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
    			date:date,fund:fund
    		},
    		url:site_url+'dashboard/etf_data',
    		success:function(response) {
                dataasset = response.dataasset;
                datasecurity = response.datasecurity;
                datapanel = response.datapanel;
                // BEGIN ASSETs DATA
                $('#asset tbody').html(dataasset);
                if (dataasset=="") {
                    $('#asset tbody').html('<tr><td colspan="18" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                // END ASSETs DATA
                // BEGIN Security DATA
                $('#security tbody').html(datasecurity);
                if (datasecurity=="") {
                    $('#security tbody').html('<tr><td colspan="10" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                // END Security DATA
                // BEGIN PANELS DATA
                if (datapanel.length>0)
                {
                    total_outstanding = parseFloat(datapanel.M.r_outstanding);
                    total_outstanding += parseFloat(datapanel.F.r_outstanding);
                    total_outstanding += parseFloat(datapanel.B.r_outstanding);
                    total_outstanding += parseFloat(datapanel.E.r_outstanding);
                    total_outstanding += parseFloat(datapanel.P.r_outstanding);
                    total_outstanding += parseFloat(datapanel.R.r_outstanding);

                    v_n_etftype1 = parseFloat(datapanel.M.r_outstanding)/total_outstanding*100;
                    if (isNaN(v_n_etftype1)==true) v_n_etftype1 = 0;
                    v_n_etftype2 = parseFloat(datapanel.F.r_outstanding)/total_outstanding*100;
                    if (isNaN(v_n_etftype2)==true) v_n_etftype2 = 0;
                    v_n_etftype3 = parseFloat(datapanel.B.r_outstanding)/total_outstanding*100;
                    if (isNaN(v_n_etftype3)==true) v_n_etftype3 = 0;
                    v_n_etftype4 = parseFloat(datapanel.E.r_outstanding)/total_outstanding*100;
                    if (isNaN(v_n_etftype4)==true) v_n_etftype4 = 0;
                    v_n_etftype5 = parseFloat(datapanel.P.r_outstanding)/total_outstanding*100;
                    if (isNaN(v_n_etftype5)==true) v_n_etftype5 = 0;
                    v_n_etftype6 = parseFloat(datapanel.R.r_outstanding)/total_outstanding*100;
                    if (isNaN(v_n_etftype6)==true) v_n_etftype6 = 0;

                    // money market
                    $('.outstanding','.money-market').html(datapanel.M.outstanding)
                    $('.realized_pl','.money-market').html(datapanel.M.realized)
                    $('.unrealized_pl','.money-market').html(datapanel.M.unrealized)
                    $('.return_ytd','.money-market').html(datapanel.M.return_ytd)
                    $('.persen_weight','.money-market').html(datapanel.M.weight)
                    $('.persen_asset','.money-market').html(datapanel.M.asset)
                    // fixed income
                    $('.outstanding','.fixed-income').html(datapanel.F.outstanding)
                    $('.realized_pl','.fixed-income').html(datapanel.F.realized)
                    $('.unrealized_pl','.fixed-income').html(datapanel.F.unrealized)
                    $('.return_ytd','.fixed-income').html(datapanel.F.return_ytd)
                    $('.persen_weight','.fixed-income').html(datapanel.F.weight)
                    $('.persen_asset','.fixed-income').html(datapanel.F.asset)
                    // balanced fund
                    $('.outstanding','.balanced-fund').html(datapanel.B.outstanding)
                    $('.realized_pl','.balanced-fund').html(datapanel.B.realized)
                    $('.unrealized_pl','.balanced-fund').html(datapanel.B.unrealized)
                    $('.return_ytd','.balanced-fund').html(datapanel.B.return_ytd)
                    $('.persen_weight','.balanced-fund').html(datapanel.B.weight)
                    $('.persen_asset','.balanced-fund').html(datapanel.B.asset)
                    // equity fund
                    $('.outstanding','.equity-fund').html(datapanel.E.outstanding)
                    $('.realized_pl','.equity-fund').html(datapanel.E.realized)
                    $('.unrealized_pl','.equity-fund').html(datapanel.E.unrealized)
                    $('.return_ytd','.equity-fund').html(datapanel.E.return_ytd)
                    $('.persen_weight','.equity-fund').html(datapanel.E.weight)
                    $('.persen_asset','.equity-fund').html(datapanel.E.asset)
                    // protected fund
                    $('.outstanding','.protected-fund').html(datapanel.P.outstanding)
                    $('.realized_pl','.protected-fund').html(datapanel.P.realized)
                    $('.unrealized_pl','.protected-fund').html(datapanel.P.unrealized)
                    $('.return_ytd','.protected-fund').html(datapanel.P.return_ytd)
                    $('.persen_weight','.protected-fund').html(datapanel.P.weight)
                    $('.persen_asset','.protected-fund').html(datapanel.P.asset)
                    // others
                    $('.outstanding','.others').html(datapanel.R.outstanding)
                    $('.realized_pl','.others').html(datapanel.R.realized)
                    $('.unrealized_pl','.others').html(datapanel.R.unrealized)
                    $('.return_ytd','.others').html(datapanel.R.return_ytd)
                    $('.persen_weight','.others').html(datapanel.R.weight)
                    $('.persen_asset','.others').html(datapanel.R.asset)
                }
            
                Dashboard.generate_graph_dashboard_etf();
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
    },
    generate_graph_dashboard_etf:function(){
        
        etftype1=v_n_etftype1;
        etftype2=v_n_etftype2;
        etftype3=v_n_etftype3;
        etftype4=v_n_etftype4;
        etftype5=v_n_etftype5;
        etftype6=v_n_etftype6;

	    if (etftype1==0 && etftype2==0 && etftype3==0 && etftype4==0 && etftype5==0 && etftype6==0) {
	    	img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
	    } else {
            // $.ajax({
            //     type:"POST",dataType:"html",
            //     // data:{bigcap:bigcap,midcap:midcap,smallcap:smallcap},
            //     url:site_url+'dashboard/generate_graph_dashboard_etf',
            //     success:function(response) {
            //         $('#graph').html(response);
            //     },
            //     error:function(){
            //         img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
            //         $('#graph').html(img);
            //     }
            // })
            d = new Date();
    		img = '<img src="'+site_url+'dashboard/generate_graph_dashboard_etf?'+d.getTime()+'&etftype1='+etftype1+'&etftype2='+etftype2+'&etftype3='+etftype3+'&etftype4='+etftype4+'&etftype5='+etftype5+'&etftype6='+etftype6+'" width="100%">';
    	}
    	$('#graph').html(img);
    }
}

$(function(){
    var date = $('#date');
    var fund = $('#fund');

    Dashboard.reload_dashboard_etf_data(date.val(),fund.val());

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
	    	Dashboard.reload_dashboard_etf_data(date.val(),fund.val());
    		Dashboard.generate_graph_dashboard_etf();
	    }
    });

})