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

                /* show data panel */
                datapanel = response.datapanel;
                $('#display-duration').html(datapanel.duration);
                $('#display-maturity').html(datapanel.maturity);

                $('#gross','#display-corp-yield').html(datapanel.corp_yield_gross);
                $('#nett','#display-corp-yield').html(datapanel.corp_yield_nett);
                $('#gross','#display-corp-coupon').html(datapanel.corp_coupon_gross);
                $('#nett','#display-corp-coupon').html(datapanel.corp_coupon_nett);

                $('#gross','#display-government-yield').html(datapanel.government_yield_gross);
                $('#nett','#display-government-yield').html(datapanel.government_yield_nett);
                $('#gross','#display-government-coupon').html(datapanel.government_coupon_gross);
                $('#nett','#display-government-coupon').html(datapanel.government_coupon_nett);

                $('#gross','#display-total-yield').html(datapanel.total_yield_gross);
                $('#nett','#display-total-yield').html(datapanel.total_yield_nett);
                $('#gross','#display-total-coupon').html(datapanel.total_coupon_gross);
                $('#nett','#display-total-coupon').html(datapanel.total_coupon_nett);

                $('#display1-htm').html(datapanel.htm);
                $('#display1-afs').html(datapanel.afs);
                $('#display1-trd').html(datapanel.trd);
                $('#display1-sbsn').html(datapanel.sbsn);
                $('#display1-corp').html(datapanel.corp);

                /* BAR CHART */
                databar = response.databar;
                $('#graph2').html(databar);

                /* PIE CHART */
                // datapie = response.datapie;
                // var val = '';
                // html = '';
                // for ( i in datapie ) {
                //     sector_name = datapie[i].subsector_name;
                //     percentage = datapie[i].bobot;
                //     html += '<div><i class="dot-box-'+(parseFloat(i)+1)+'"></i> '+sector_name+'</div>';
                //     val+= '&val%5B%5D='+percentage;
                // }
                // $('.dash_sector').html(html);
                // if (val=="") {
                //     img = '<div align="center" class="alert alert-error">No Data to Show</div>';
                //     $('#graph').html(img);
                // } else {
                //     d = new Date();
                //     img = '<img src="'+site_url+'dashboard/generate_graph_dashboard_bond?'+d.getTime()+val+'" width="90%">';
                //     $('#graph').html(img);
                // }
                var category_barhor = response.databarhor.category;
                var data_barhor = response.databarhor.data;
                Dashboard.loadChartBarHor(category_barhor,data_barhor);

                /* BOND DATA */
                databond = response.databond;
                $('#bond tbody').html(databond);
                if (databond=="") {
                    $('#bond tbody').html('<tr><td colspan="17" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show</td></tr>')
                }

    			Metronic.unblockUI('#wrapper-asset');
    		},
    		error: function(){
                img = '<div align="center" class="alert alert-error">No Data to Show</div>';
                $('#graph').html(img);
    			$('#bond tbody').html('<tr><td colspan="9" style="font-size:13px;font-weight:bold;text-align:center;vertical-align:middle;height:50px;">No Data to Show</td></tr>')
    			$('#bond').show();
                Metronic.unblockUI('#wrapper-asset');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    loadChartBarHor: function(category,data){
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: category,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' %'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            legend: {
                enabled:false,
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Value ',
                colorByPoint: true,
                data: data
            }]
        });
    }
    // generate_graph_dashboard_bond:function(date,fund_code){
	   //  if (false) {
    //         img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
    //         $('#graph').html(img);
	    	
    //         img2 = '<div align="center" class="alert alert-error">No Data to Show...</div>';
    //         $('#graph2').html(img2);
	   //  } else {
    //         $.ajax({
    //             type:"POST",dataType:"html",
    //             data:{date:date,fund_code:fund_code},
    //             url:site_url+'dashboard/generate_graph2_dashboard_bond',
    //             success:function(response) {
    //                 $('#graph2').html(response);
    //             },
    //             error:function(){
    //                 img2 = '<div align="center" class="alert alert-error">No Data to Show...</div>';
    //                 $('#graph2').html(img2);
    //             }
    //         })

    //         // $.ajax({
    //         //     type:"POST",dataType:"json",
    //         //     data:{date:date,fund:fund_code},
    //         //     url:site_url+'dashboard/get_sectors',
    //         //     success:function(response) {
                    
    //         //     }
    //         // })

    // 	}
    // }
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
	    }
    });

})