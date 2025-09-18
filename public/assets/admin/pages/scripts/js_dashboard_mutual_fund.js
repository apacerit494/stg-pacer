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
	reload_dashboard_mutual_fund_data : function (date,fund) {
    	Metronic.blockUI({
            target: '#wrapper-asset',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
    			date:date,fund:fund
    		},
    		url:site_url+'dashboard/mutual_fund_data',
    		success:function(response) {
                datasecurity = response.datasecurity;
                datarekapsecurity = response.datarekapsecurity;
                // BEGIN Security DATA
                $('#security tbody').html(datasecurity);
                if (datasecurity=="") {
                    $('#security tbody').html('<tr><td colspan="14" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                $('#rekap-security').html('Data Kosong');
                if (datarekapsecurity!="") {
                    $('#rekap-security').html(datarekapsecurity);
                }
                // END Security DATA
    			Metronic.unblockUI('#wrapper-asset');
    		},
    		error: function(){
    			$('#security tbody').html('<tr><td colspan="14" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			$('#security').show();
                Metronic.unblockUI('#wrapper-asset');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    // generate_graph_dashboard_mutual_fund:function(){
        
    //     mftype1=v_n_mftype1;
    //     mftype2=v_n_mftype2;
    //     mftype3=v_n_mftype3;
    //     mftype4=v_n_mftype4;
    //     mftype5=v_n_mftype5;
    //     mftype6=v_n_mftype6;

	   //  if (mftype1==0 && mftype2==0 && mftype3==0 && mftype4==0 && mftype5==0 && mftype6==0) {
	   //  	img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
	   //  } else {
    //         // $.ajax({
    //         //     type:"POST",dataType:"html",
    //         //     // data:{bigcap:bigcap,midcap:midcap,smallcap:smallcap},
    //         //     url:site_url+'dashboard/generate_graph_dashboard_mutual_fund',
    //         //     success:function(response) {
    //         //         $('#graph').html(response);
    //         //     },
    //         //     error:function(){
    //         //         img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
    //         //         $('#graph').html(img);
    //         //     }
    //         // })
    //         d = new Date();
    // 		img = '<img src="'+site_url+'dashboard/generate_graph_dashboard_mutual_fund?'+d.getTime()+'&mftype1='+mftype1+'&mftype2='+mftype2+'&mftype3='+mftype3+'&mftype4='+mftype4+'&mftype5='+mftype5+'&mftype6='+mftype6+'" width="100%">';
    // 	}
    // 	$('#graph').html(img);
    // }
}

$(function(){
    var date = $('#date');
    var fund = $('#fund');

    Dashboard.reload_dashboard_mutual_fund_data(date.val(),fund.val());

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
	    	Dashboard.reload_dashboard_mutual_fund_data(date.val(),fund.val());
    		// Dashboard.generate_graph_dashboard_mutual_fund();
	    }
    });

})