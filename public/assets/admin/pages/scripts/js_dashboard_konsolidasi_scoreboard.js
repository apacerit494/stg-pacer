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
	reload_dashboard_konsolidasi_scoreboard_data : function (date,portofolio,fund) {
    	Metronic.blockUI({
            target: '#wrapper-asset',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
    			date:date,portofolio:portofolio,fund:fund
    		},
    		url:site_url+'dashboard/konsolidasi_scoreboard_data',
    		success:function(response) {
                dataasset = response.dataasset;
                databar = response.databar;
                datafundgroup = response.datafundgroup;
                datatd = response.datatd;
                datasukuk = response.datasukuk;
                datare = response.datare;
                datastock = response.datastock;
                datachartcolumn = response.datachartcolumn;
                // BEGIN ASSETs DATA
                $('#asset tbody').html(dataasset);
                if (dataasset=="") {
                    $('#asset tbody').html('<tr><td colspan="19" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                // END ASSETs DATA

                // BEGIN BAR
                $('#graph2').html(databar);
                // END BAR

                // BEGIN DATA FUND GROUP
                $('#display-NoF').html(datafundgroup.name_of_fund);
                $('#display-RP').html(datafundgroup.report_periode);
                $('#display-AUM').html('Rp ' + Template.NumberFormat(datafundgroup.asset_under_mamangement,0,',','.'));
                $('#display-NPU').html('Rp ' + Template.NumberFormat(datafundgroup.nav,4,',','.'));
                $('#display-R-P').html(Template.NumberFormat(datafundgroup.retrun_portofolio,2,',','.') + '% YTD');
                $('#display-R-T').html(Template.NumberFormat(datafundgroup.retrun_target,2,',','.') + '% p.a');
                // $('#display-R-A').html(Template.NumberFormat(datafundgroup.retrun_achievement,2,',','.') + '% YTD');
                $('#display-R-F12M').html(Template.NumberFormat(datafundgroup.retrun_forecasting12months,2,',','.') + '% p.a');
                $('#display-R-R').html('Rp ' + Template.NumberFormat(datafundgroup.retrun_realized,0,',','.') + ' YTD');
                $('#display-R-UR').html('Rp ' + Template.NumberFormat(datafundgroup.retrun_unrealized,0,',','.') + ' YTD');
                // END DATA FUND GROUP

                // BEGIN DATA FOOT

                /* TIME DEPOSIT */
                $('#display-TD-1').html(datatd.realized_gros);
                $('#display-TD-2').html(datatd.realized_net);
                $('#display-TD-3').html(datatd.eq_rate_gros);
                $('#display-TD-4').html(datatd.eq_rate_net);
                $('#display-TD-5').html(datatd.m_1);
                $('#display-TD-6').html(datatd.m_2);
                $('#display-TD-7').html(datatd.m_6);
                $('#display-TD-8').html(datatd.m_12);
                $('#display-TD-9').html(datatd.private_1);
                $('#display-TD-10').html(datatd.private_2);
                $('#display-TD-11').html(datatd.bumn_1);
                $('#display-TD-12').html(datatd.bumn_2);
                $('#display-TD-13').html(datatd.bumd_1);
                $('#display-TD-14').html(datatd.bumd_2);

                /* SUKUK */
                $('#display-SUKUK-1').html(datasukuk.ytm_corp_gros);
                $('#display-SUKUK-2').html(datasukuk.ytm_corp_net);
                $('#display-SUKUK-3').html(datasukuk.ytm_sbsn_gros);
                $('#display-SUKUK-4').html(datasukuk.ytm_sbsn_net);
                $('#display-SUKUK-5').html(datasukuk.ytm_total_gros);
                $('#display-SUKUK-6').html(datasukuk.ytm_total_net);
                $('#display-SUKUK-7').html(datasukuk.duration);
                $('#display-SUKUK-8').html(datasukuk.maturity);
                $('#display-SUKUK-9').html(datasukuk.sbsn);
                $('#display-SUKUK-10').html(datasukuk.sukuk_corp);
                $('#display-SUKUK-11').html(datasukuk.realized_gl_1);
                $('#display-SUKUK-12').html(datasukuk.realized_gl_2);
                $('#display-SUKUK-13').html(datasukuk.unrealized_gl_1);
                $('#display-SUKUK-14').html(datasukuk.unrealized_gl_2);

                /* REKSADANA & EFT */
                $('#display-RE-1').html(datare.rd_pend_tetap_1);
                $('#display-RE-2').html(datare.rd_pend_tetap_2);
                $('#display-RE-3').html(datare.rd_pend_tetap_3);
                $('#display-RE-4').html(datare.rd_proteksi_1);
                $('#display-RE-5').html(datare.rd_proteksi_2);
                $('#display-RE-6').html(datare.rd_proteksi_3);
                $('#display-RE-7').html(datare.rdpt_1);
                $('#display-RE-8').html(datare.rdpt_2);
                $('#display-RE-9').html(datare.rdpt_3);
                $('#display-RE-10').html(datare.rd_camp_1);
                $('#display-RE-11').html(datare.rd_camp_2);
                $('#display-RE-12').html(datare.rd_camp_3);
                $('#display-RE-13').html(datare.rd_saham_1);
                $('#display-RE-14').html(datare.rd_saham_2);
                $('#display-RE-15').html(datare.rd_saham_3);
                $('#display-RE-16').html(datare.eft_1);
                $('#display-RE-17').html(datare.eft_2);
                $('#display-RE-18').html(datare.eft_3);
                $('#display-RE-19').html(datare.kikeba_1);
                $('#display-RE-20').html(datare.kikeba_2);
                $('#display-RE-21').html(datare.kikeba_3);
                $('#display-RE-21').html(datare.total_1);
                $('#display-RE-22').html(datare.total_2);

                /* STOCK */
                $('#display-STOCK-1').html(datastock.benchmark);
                $('#display-STOCK-2').html(datastock.coverage_rat);
                $('#display-STOCK-3').html(datastock.portofolio);
                $('#display-STOCK-4').html(datastock.active_share_rat);
                $('#display-STOCK-5').html(datastock.over_perform);
                $('#display-STOCK-6').html(datastock.strategy);
                $('#display-STOCK-7').html(datastock.beta_1);
                $('#display-STOCK-8').html(datastock.realized_gl);
                $('#display-STOCK-9').html(datastock.beta_2);
                $('#display-STOCK-10').html(datastock.unrealized_gl);
                $('#display-STOCK-11').html(datastock.cyclical);
                $('#display-STOCK-12').html(datastock.bigcap);
                $('#display-STOCK-13').html(datastock.midcap);
                $('#display-STOCK-14').html(datastock.smallcap);

                // END DATA FOOT

                // Dashboard.generate_graph_dashboard_konsolidasi_scoreboard();

                // Generate Chart
                var category_green = datachartcolumn.green.category;
                var data_green = datachartcolumn.green.data;
                var category_yellow = datachartcolumn.yellow.category;
                var data_yellow = datachartcolumn.yellow.data;
                var category_red = datachartcolumn.red.category;
                var data_red = datachartcolumn.red.data;
                Dashboard.generate_column_chart_green(category_green, data_green);
                Dashboard.generate_column_chart_yellow(category_yellow, data_yellow);
                Dashboard.generate_column_chart_red(category_red, data_red);

    			Metronic.unblockUI('#wrapper-asset');
    		},
    		error: function(){
                $('#asset tbody').html('<tr><td colspan="19" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                $('#asset').show();
                Metronic.unblockUI('#wrapper-asset');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    generate_graph_dashboard_konsolidasi_scoreboard:function(){
        
        etftype1=v_n_etftype1;
        etftype2=v_n_etftype2;
        etftype3=v_n_etftype3;
        etftype4=v_n_etftype4;
        etftype5=v_n_etftype5;
        etftype6=v_n_etftype6;

	    if (etftype1==0 && etftype2==0 && etftype3==0 && etftype4==0 && etftype5==0 && etftype6==0) {
	    	img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
	    } else {
            d = new Date();
    		img = '<img src="'+site_url+'dashboard/generate_graph_dashboard_konsolidasi_scoreboard?'+d.getTime()+'&etftype1='+etftype1+'&etftype2='+etftype2+'&etftype3='+etftype3+'&etftype4='+etftype4+'&etftype5='+etftype5+'&etftype6='+etftype6+'" width="100%">';
    	}
    	$('#graph').html(img);
    },
    generate_column_chart_green: function(category,data){
        Highcharts.chart('column_chart_green', {
            chart: {
                type: 'column'
            },
            title: {
                text: ' '
            },
            subtitle: {
                enabled: false
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
                    enabled: false
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: { enabled: false },
            series: [{
                name: 'Value',
                // colorByPoint:true,
                color: 'green',
                data: data
            }]
        });
    },
    generate_column_chart_yellow: function(category,data){
        Highcharts.chart('column_chart_yellow', {
            chart: {
                type: 'column'
            },
            title: {
                text: ' '
            },
            subtitle: {
                enabled: false
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
                    enabled: false
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: { enabled: false },
            series: [{
                name: 'Value',
                // colorByPoint:true,
                color: 'yellow',
                data: data
            }]
        });
    },
    generate_column_chart_red: function(category,data){
        Highcharts.chart('column_chart_red', {
            chart: {
                type: 'column'
            },
            title: {
                text: ' '
            },
            subtitle: {
                enabled: false
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
                    enabled: false
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: { enabled: false },
            series: [{
                name: 'Value',
                // colorByPoint:true,
                color: 'red',
                data: data
            }]
        });
    }
}

$(function(){
    var date = $('#date');
    var portofolio = $('#portofolio');
    var fund = $('#fund');

    $('#search').click(function(e){
    	e.preventDefault();
    	bValid = true;
        if (date.val()=="") {
            date.addClass('error');
            bValid=false;
        } else {
            date.removeClass('error');
        }
    	if (portofolio.val()=="") {
    		portofolio.addClass('error');
    		bValid=false;
    	} else {
    		portofolio.removeClass('error');
    	}
    	if (fund.val()=="") {
    		fund.addClass('error');
    		bValid=false;
    	} else {
    		fund.removeClass('error');
    	}

    	if (bValid===true) {
	    	Dashboard.reload_dashboard_konsolidasi_scoreboard_data(date.val(),portofolio.val(),fund.val());
    		// Dashboard.generate_graph_dashboard_konsolidasi_scoreboard();
	    }
    });

})