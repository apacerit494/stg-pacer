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
	reload_dashboard_bond_data : function (date,fund) {
    	Metronic.blockUI({
            target: '#wrapper-asset',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
    			date:date,fund:fund
    		},
    		url:site_url+'dashboard/bond_data',
    		success:function(response) {
                dataasset = response.dataasset;
                databond = response.databond;
                datapanel = response.datapanel;
                // BEGIN ASSETs DATA
                $('#asset tbody').html(dataasset);
                if (dataasset=="") {
                    $('#asset tbody').html('<tr><td colspan="17" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                // END ASSETs DATA
                // BEGIN bond DATA
                $('#bond tbody').html(databond);
                if (databond=="") {
                    $('#bond tbody').html('<tr><td colspan="9" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                } else {
                }

                // END bond DATA
                // BEGIN PANELS DATA

                // END PANELS DATA

                Dashboard.generate_graph_dashboard_bond(date,fund);
    			Metronic.unblockUI('#wrapper-asset');
    		},
    		error: function(){
                $('#asset tbody').html('<tr><td colspan="17" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                $('#asset').show();
    			$('#bond tbody').html('<tr><td colspan="9" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			$('#bond').show();
                Metronic.unblockUI('#wrapper-asset');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    generate_graph_dashboard_bond:function(date,fund_code){
	    if (false) {
            img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
            $('#graph').html(img);
	    	
            img2 = '<div align="center" class="alert alert-error">No Data to Show...</div>';
            $('#graph2').html(img2);
	    } else {
            $.ajax({
                type:"POST",dataType:"html",
                data:{date:date,fund_code:fund_code},
                url:site_url+'dashboard/generate_graph2_dashboard_bond',
                success:function(response) {
                    $('#graph2').html(response);
                },
                error:function(){
                    img2 = '<div align="center" class="alert alert-error">No Data to Show...</div>';
                    $('#graph2').html(img2);
                }
            })

            $.ajax({
                type:"POST",dataType:"json",
                data:{date:date,fund:fund_code},
                url:site_url+'dashboard/get_sectors',
                success:function(response) {
                    var val = '';
                    html = '';
                    for ( i in response ) {
                        sector_name = response[i].sector_name;
                        count = response[i].count;
                        total = response[i].total;
                        percentage = count/total*100;
                        html += '<div><i class="dot-box-'+parseFloat(i+1)+'"></i> '+sector_name+'</div>';
                        val+= '&val%5B%5D='+percentage;
                    }
                    $('.dash_sector').html(html);
                    if (val=="") {
                        img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
                        $('#graph').html(img);
                    } else {
                        d = new Date();
                        img = '<img src="'+site_url+'dashboard/generate_graph_dashboard_bond?'+d.getTime()+val+'" width="100%">';
                        $('#graph').html(img);
                    }
                }
            })

    	}
    }
}

$(function(){
    var date = $('#date');
    var fund = $('#fund');

    Dashboard.reload_dashboard_bond_data(date.val(),fund.val());

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
	    	Dashboard.reload_dashboard_bond_data(date.val(),fund.val());
    		// Dashboard.generate_graph_dashboard_bond(date.val(),fund.val());
	    }
    });

})