window.defensive_bigcap = 0;
window.defensive_midcap = 0;
window.defensive_smallcap = 0;
window.cyclical_bigcap = 0;
window.cyclical_midcap = 0;
window.cyclical_smallcap = 0;

var Dashboard = {
	reload_dashboard_stock2_data1 : function (date,fund,portofolio) {
    	Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
    			date:date,fund:fund,portofolio:portofolio
    		},
    		url:site_url+'dashboard/stock2_data1',
    		success:function(response) {
                row = response.row;
    			// $('#stock tbody').html(response.html);
    			// if (response.html=="") {
    			// 	$('#stock tbody').html('<tr><td colspan="18" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			// }


                $('.idx_1','.fund-availability').html(row.indicies.idx_1);
                $('.idx_2','.fund-availability').html(row.indicies.idx_2);
                $('.idx_3','.fund-availability').html(row.indicies.idx_3);
                $('.idx_4','.fund-availability').html(row.indicies.idx_4);
                $('.idx_5','.fund-availability').html(row.indicies.idx_5);
                $('.idx_6','.fund-availability').html(row.indicies.idx_6);
                if (row.exists==1) {
                    over_perfom = eval(row.portofolio_yield-row.benchmark_yield);
                    if (over_perfom>0) {
                        $('.over-perfom-label','.performance-ytd').html('Over Perfom :');
                    } else if (over_perfom<0) {
                        $('.over-perfom-label','.performance-ytd').html('Under Perfom :');
                    } else {
                        $('.over-perfom-label','.performance-ytd').html('Perfom :');
                    }
                    realized_gl = row.realized_gl;
                    if (realized_gl<0) {
                        realized_gl = '('+Template.NumberFormat((row.realized_gl*-1)/1000000,0,',','.')+')';
                    } else {
                        realized_gl = Template.NumberFormat(row.realized_gl/1000000,0,',','.');
                    }
                    unrealized_gl = row.unrealized_gl;
                    if (unrealized_gl<0) {
                        unrealized_gl = '('+Template.NumberFormat((row.unrealized_gl*-1)/1000000,0,',','.')+')';
                    } else {
                        unrealized_gl = Template.NumberFormat(row.unrealized_gl/1000000,0,',','.');
                    }
                    $('.benchmark','.performance-ytd').html(Template.NumberFormat(row.benchmark_yield,2,',','.')+'%')
                    $('.portofolio','.performance-ytd').html(Template.NumberFormat(row.portofolio_yield,2,',','.')+'%')
                    $('.over-perfom','.performance-ytd').html(Template.NumberFormat(over_perfom,2,',','.')+'%')
                    $('.realized','.performance-ytd').html(realized_gl)
                    $('.unrealized','.performance-ytd').html(unrealized_gl)


                    // -- BEGIN INDICIES
                    // cash = eval(row.subscribe_fund-row.redemption_fund);
                    // net_cash = parseFloat(cash)+parseFloat(row.receivable_fund)-parseFloat(row.payable_fund);
                    // if (cash<0) {
                    //     cash = '('+Template.NumberFormat((cash*-1)/1000000,0,',','.')+')';
                    // } else {
                    //     cash = Template.NumberFormat(cash/1000000,0,',','.');
                    // }
                    // if (net_cash<0) {
                    //     net_cash = '('+Template.NumberFormat((net_cash*-1)/1000000,0,',','.')+')';
                    // } else {
                    //     net_cash = Template.NumberFormat(net_cash/1000000,0,',','.');
                    // }
                    // $('.subscription','.fund-availability').html(Template.NumberFormat(row.subscribe_fund/1000000,0,',','.'))
                    // $('.redemption','.fund-availability').html(Template.NumberFormat(row.redemption_fund/1000000,0,',','.'))

                    // $('.cash','.fund-availability').html(cash);
                    // $('.receivable','.fund-availability').html(Template.NumberFormat(row.receivable_fund/1000000,0,',','.'))
                    // $('.payable','.fund-availability').html(Template.NumberFormat(row.payable_fund/1000000,0,',','.'))
                    // $('.net-cash','.fund-availability').html(net_cash)

                    // -- END INDICIES
                    
                    strategy = '';
                    if (row.active_share>80) {
                        strategy = 'Agressive';
                    } else if (row.active_share>60 && row.active_share<=80) {
                        strategy = 'Moderate';
                    } else if (row.active_share<60) {
                        strategy = 'Conservative';
                    }
                    $('.coverage','.strategy').html(Template.NumberFormat(row.coverage,2,',','.')+'%')
                    $('.active-share-r','.strategy').html(Template.NumberFormat(row.active_share,2,',','.')+'%')
                    $('.strategy','.strategy').html(strategy)
                    $('.beta','.strategy').html(Template.NumberFormat(row.beta,2,',','.'))
                    $('.difensive','.strategy').html(Template.NumberFormat(row.defensive,2,',','.')+'%')
                    $('.cyclical','.strategy').html(Template.NumberFormat(row.cyclical,2,',','.')+'%')

                    actual_costval_total = eval(row.act_costvalue_nominal-row.allocation_budget_nominal);
                    actual_faival_total = eval(row.act_fairvalue_nominal-row.allocation_budget_nominal)
                    actual_costval_desc = '-';
                    if (actual_costval_total<0) {
                        actual_costval_desc = 'Under';
                    } else if (actual_costval_total>0) {
                        actual_costval_desc = 'Over';
                    }
                    actual_faival_desc = '-';
                    if (actual_faival_total<0) {
                        actual_faival_desc = 'Under';
                    } else if (actual_faival_total>0) {
                        actual_faival_desc = 'Over';
                    }

                    allocation_budget_nominal = row.allocation_budget_nominal;
                    if (allocation_budget_nominal<0) {
                        allocation_budget_nominal = '('+Template.NumberFormat((row.allocation_budget_nominal*-1)/1000000,0,',','.')+')';
                    } else {
                        allocation_budget_nominal = Template.NumberFormat(row.allocation_budget_nominal/1000000,0,',','.');
                    }

                    act_costvalue_nominal = row.act_costvalue_nominal;
                    if (act_costvalue_nominal<0) {
                        act_costvalue_nominal = '('+Template.NumberFormat((row.act_costvalue_nominal*-1)/1000000,0,',','.')+')';
                    } else {
                        act_costvalue_nominal = Template.NumberFormat(row.act_costvalue_nominal/1000000,0,',','.');
                    }

                    act_fairvalue_nominal = row.act_fairvalue_nominal;
                    if (act_fairvalue_nominal<0) {
                        act_fairvalue_nominal = '('+Template.NumberFormat((row.act_fairvalue_nominal*-1)/1000000,0,',','.')+')';
                    } else {
                        act_fairvalue_nominal = Template.NumberFormat(row.act_fairvalue_nominal/1000000,0,',','.');
                    }

                    if (actual_costval_total<0) {
                        actual_costval_total = '('+Template.NumberFormat((actual_costval_total*-1)/1000000,0,',','.')+')';
                    } else {
                        actual_costval_total = Template.NumberFormat(actual_costval_total/1000000,0,',','.');
                    }

                    if (actual_faival_total<0) {
                        actual_faival_total = '('+Template.NumberFormat((actual_faival_total*-1)/1000000,0,',','.')+')';
                    } else {
                        actual_faival_total = Template.NumberFormat(actual_faival_total/1000000,0,',','.');
                    }
                    $('.allocation-plan-persen','.stock-allocation').html(Template.NumberFormat(row.allocation_budget_percent,2,',','.')+'%')
                    $('.actual-costval-persen','.stock-allocation').html(Template.NumberFormat(row.act_costvalue_percent,2,',','.')+'%')
                    $('.actual-faival-persen','.stock-allocation').html(Template.NumberFormat(row.act_fairvalue_percent,2,',','.')+'%')
                    $('.allocation-plan-amount','.stock-allocation').html(allocation_budget_nominal)
                    $('.actual-costval-amount','.stock-allocation').html(act_costvalue_nominal)
                    $('.actual-faival-amount','.stock-allocation').html(act_fairvalue_nominal)
                    $('.actual-costval-total','.stock-allocation').html(actual_costval_total)
                    $('.actual-faival-total','.stock-allocation').html(actual_faival_total)
                    $('.actual-costval-desc','.stock-allocation').html(actual_costval_desc)
                    $('.actual-faival-desc','.stock-allocation').html(actual_faival_desc)
                } else {

                    $('.over-perfom-label','.performance-ytd').html('Perfom :');
                    $('.benchmark','.performance-ytd').html('-')
                    $('.portofolio','.performance-ytd').html('-')
                    $('.over-perfom','.performance-ytd').html('-')
                    $('.realized','.performance-ytd').html('-')
                    $('.unrealized','.performance-ytd').html('-')

                    $('.subscription','.fund-availability').html('-')
                    $('.redemption','.fund-availability').html('-')
                    $('.cash','.fund-availability').html('-')
                    $('.receivable','.fund-availability').html('-')
                    $('.payable','.fund-availability').html('-')
                    $('.net-cash','.fund-availability').html('-')

                    $('.coverage','.strategy').html('-')
                    $('.active-share-r','.strategy').html('-')
                    $('.strategy','.strategy').html('-')
                    $('.beta','.strategy').html('-')
                    $('.difensive','.strategy').html('-')
                    $('.cyclical','.strategy').html('-')

                    $('.allocation-plan-persen','.stock-allocation').html('-')
                    $('.actual-costval-persen','.stock-allocation').html('-')
                    $('.actual-faival-persen','.stock-allocation').html('-')
                    $('.allocation-plan-amount','.stock-allocation').html('-')
                    $('.actual-costval-amount','.stock-allocation').html('-')
                    $('.actual-faival-amount','.stock-allocation').html('-')
                    $('.actual-costval-total','.stock-allocation').html('-')
                    $('.actual-faival-total','.stock-allocation').html('-')
                    $('.actual-costval-desc','.stock-allocation').html('-')
                    $('.actual-faival-desc','.stock-allocation').html('-')
                }
    			Metronic.unblockUI('#wrapper-stock');
    		},
    		error: function(){
    			// $('#stock tbody').html('<tr><td colspan="18" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			// $('#stock').show();
                Metronic.unblockUI('#wrapper-stock');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    reload_dashboard_stock2_data2 : function(fund,date) {
    	Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"html",data:{
                fund:fund,
    			date:date
    		},
    		url:site_url+'dashboard/stock2_data2',
    		success:function(response) {
    			$('#defensive tbody').html(response);
    			if (response=="") {
    				$('#defensive tbody').html('<tr><td colspan="7" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			}
    			Metronic.unblockUI('#wrapper-stock');
    		},
    		error: function(){
    			$('#defensive tbody').html('<tr><td colspan="7" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			$('#defensive').show();
                Metronic.unblockUI('#wrapper-stock');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    reload_dashboard_stock2_data3 : function(fund,date) {
        Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
        $.ajax({
            type:"POST",dataType:"html",data:{
                fund:fund,
                date:date
            },
            url:site_url+'dashboard/stock2_data3',
            success:function(response) {
                $('#cyclical tbody').html(response);
                if (response=="") {
                    $('#cyclical tbody').html('<tr><td colspan="7" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                Metronic.unblockUI('#wrapper-stock');
            },
            error: function(){
                $('#cyclical tbody').html('<tr><td colspan="7" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                $('#cyclical').show();
                Metronic.unblockUI('#wrapper-stock');
                Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
            }
        })
    },
    reload_dashboard_stock2_data4 : function(fund,date) {
    	Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"html",data:{
                fund:fund,
    			date:date
    		},
    		url:site_url+'dashboard/stock2_data4',
    		success:function(response) {
    			$('#sector-allocation tbody').html(response);
    			if (response=="") {
    				$('#sector-allocation tbody').html('<tr><td colspan="5" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			}
    			Metronic.unblockUI('#wrapper-stock');
    		},
    		error: function(){
    			$('#sector-allocation tbody').html('<tr><td colspan="5" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                Metronic.unblockUI('#wrapper-stock');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    reload_defensive_stock_cap:function(fund,date){
    	Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
                fund:fund,
    			date:date
    		},
    		url:site_url+'dashboard/stock2_defensive_stockcap',
    		success:function(response) {
                data = response['data'];
                highest_num = response['highest_num'];
    			if (data.length==1) {
                    $("#defensive-bigcap").html('-');
    				$("#defensive-bigcap-amount").html('-');
					window.defensive_bigcap = 0;
                    $("#defensive-midcap").html('-');
					$("#defensive-midcap-amount").html('-');
					window.defensive_midcap = 0;
                    $("#defensive-smallcap").html('-');
					$("#defensive-smallcap-amount").html('-');
					window.defensive_smallcap = 0;
    			}
				for ( i in data ) {
					if (data[i].xquartil=='BigCap') {
                        $("#defensive-bigcap").html(data[i].act_bobot_market_cap);
                        $('#defensive-bigcap').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#defensive-bigcap-amount").html('RP '+data[i].amount);
						window.defensive_bigcap = data[i].act_bobot_market_cap_num;
					}
					if (data[i].xquartil=='MiddleCap') {
                        $("#defensive-midcap").html(data[i].act_bobot_market_cap);
                        $('#defensive-midcap').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#defensive-midcap-amount").html('RP '+data[i].amount);
						window.defensive_midcap = data[i].act_bobot_market_cap_num;
					} 
					if (data[i].xquartil=='SmallCap') {
                        $("#defensive-smallcap").html(data[i].act_bobot_market_cap);
                        $('#defensive-smallcap').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#defensive-smallcap-amount").html('RP '+data[i].amount);
						window.defensive_smallcap = data[i].act_bobot_market_cap_num;
					} 
					if (data[i].xquartil=='total') {
                        $("#defensive-total").html(data[i].act_bobot_market_cap);
                        $('#defensive-total').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#defensive-total-amount").html('RP '+data[i].amount);
					}
				}
    			Metronic.unblockUI('#wrapper-stock');
    			Dashboard.generate_graph_dashboard_stock2();
    		},
    		error: function(){
                Metronic.unblockUI('#wrapper-stock');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    reload_cyclical_stock_cap:function(fund,date){
		Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"json",data:{
                fund:fund,
    			date:date
    		},
    		url:site_url+'dashboard/stock2_cyclical_stockcap',
    		success:function(response) {
                data = response['data'];
                highest_num = response['highest_num'];

    			if (data.length==1) {
                    $("#cyclical-bigcap").html('-');
    				$("#cyclical-bigcap-amount").html('-');
					window.cyclical_bigcap = 0;
                    $("#cyclical-midcap").html('-');
					$("#cyclical-midcap-amount").html('-');
					window.cyclical_midcap = 0;
                    $("#cyclical-smallcap").html('-');
					$("#cyclical-smallcap-amount").html('-');
					window.cyclical_smallcap = 0;
    			}
				for ( i in data ) {
					if (data[i].xquartil=='BigCap') {
                        $("#cyclical-bigcap").html(data[i].act_bobot_market_cap);
                        $('#cyclical-bigcap').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#cyclical-bigcap-amount").html('RP '+data[i].amount);
						window.cyclical_bigcap = data[i].act_bobot_market_cap_num;
					}
					if (data[i].xquartil=='MiddleCap') {
                        $("#cyclical-midcap").html(data[i].act_bobot_market_cap);
                        $('#cyclical-midcap').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#cyclical-midcap-amount").html('RP '+data[i].amount);
						window.cyclical_midcap = data[i].act_bobot_market_cap_num;
					} 
					if (data[i].xquartil=='SmallCap') {
                        $("#cyclical-smallcap").html(data[i].act_bobot_market_cap);
                        $('#cyclical-smallcap').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#cyclical-smallcap-amount").html('RP '+data[i].amount);
						window.cyclical_smallcap = data[i].act_bobot_market_cap_num;
					} 
					if (data[i].xquartil=='total') {
                        $("#cyclical-total").html(data[i].act_bobot_market_cap);
                        $('#cyclical-total').closest('.persen-bar').find('.xbar').attr('style','width:'+(parseFloat(data[i].act_bobot_market_cap_num/highest_num)*100)+'%')
						$("#cyclical-total-amount").html('RP '+data[i].amount);
					}
				}
    			Metronic.unblockUI('#wrapper-stock');
    			Dashboard.generate_graph_dashboard_stock2();
    		},
    		error: function(){
                Metronic.unblockUI('#wrapper-stock');
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    		}
    	})
    },
    generate_graph_dashboard_stock2:function(){
    	bigcap = parseFloat(window.defensive_bigcap)+parseFloat(window.cyclical_bigcap);
	    midcap = parseFloat(window.defensive_midcap)+parseFloat(window.cyclical_midcap);
	    smallcap = parseFloat(window.defensive_smallcap)+parseFloat(window.cyclical_smallcap);
	    if (bigcap==0 && midcap==0 && smallcap==0) {
	    	img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
	    } else {
            $.ajax({
                type:"POST",dataType:"html",
                data:{bigcap:bigcap,midcap:midcap,smallcap:smallcap},
                url:site_url+'dashboard/generate_graph_dashboard_stock2v2',
                success:function(response) {
                    $('#graph').html(response);
                },
                error:function(){
                    img = '<div align="center" class="alert alert-error">No Data to Show...</div>';
                    $('#graph').html(img);
                }
            })
    		// img = '<img src="'+site_url+'dashboard/generate_graph_dashboard_stock2?bigcap='+bigcap+'&midcap='+midcap+'&smallcap='+smallcap+'">';
    	}
    	$('#graph').html(img);
    },
    reload_dashboard_stock: function(start,end,fund,portofolio)
    {
        Metronic.blockUI({
            target: '#wrapper-stock-1',
            boxed:true
        });
        $.ajax({
            type:"POST",dataType:"html",data:{
                start:start,end:end,fund:fund,portofolio:portofolio
            },
            url:site_url+'dashboard/stock_data',
            success:function(response) {
                $('#stock-1 tbody').html(response);
                if (response=="") {
                    $('#stock-1 tbody').html('<tr><td colspan="18" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
                }
                Metronic.unblockUI('#wrapper-stock-1');
            },
            error: function(){
                Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
                $('#stock-1').show();
                Metronic.unblockUI('#wrapper-stock-1');
            }
        })
    }
}

$(function(){
    var date = $('#date');
    var fund = $('#fund');
    var portofolio = $('#portofolio');

    Dashboard.reload_dashboard_stock2_data1(date.val(),fund.val(),portofolio.val());
    Dashboard.reload_dashboard_stock2_data2(fund.val(),date.val());
    Dashboard.reload_dashboard_stock2_data3(fund.val(),date.val());
    Dashboard.reload_dashboard_stock2_data4(fund.val(),date.val());
    Dashboard.reload_defensive_stock_cap(fund.val(),date.val());
    Dashboard.reload_cyclical_stock_cap(fund.val(),date.val());

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
    	if (portofolio.val()=="") {
    		portofolio.addClass('error');
    		bValid=false;
    	} else {
    		portofolio.removeClass('error');
    	}

    	if (bValid===true) {
	    	Dashboard.reload_dashboard_stock2_data1(date.val(),fund.val(),portofolio.val());
	    	Dashboard.reload_dashboard_stock2_data2(fund.val(),date.val());
            Dashboard.reload_dashboard_stock2_data3(fund.val(),date.val());
    		Dashboard.reload_dashboard_stock2_data4(fund.val(),date.val());
    		Dashboard.reload_defensive_stock_cap(fund.val(),date.val());
    		Dashboard.reload_cyclical_stock_cap(fund.val(),date.val());
    		Dashboard.generate_graph_dashboard_stock2();
            Dashboard.reload_dashboard_stock(Template.ToDateDefault(date.val()),Template.ToDateDefault(date.val()),fund.val(),portofolio.val());
	    }
    });

})

function viewGraph(){
$('.column').css('height','0');
$('table.chart tr').each(function(index) {
var ha = $(this).children('td').eq(1).text();
$('#col'+index).animate({height: ha}, 1500).html("<div>"+ha+"</div>");
});
}
$(document).ready(function(){
viewGraph();
});