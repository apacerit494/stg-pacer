$(function(){
	if (!jQuery().daterangepicker) {
        return;
    }

    // $('#dashboard-report-range').daterangepicker({
    //         opens: (Metronic.isRTL() ? 'right' : 'left'),
    //         startDate: moment(),
    //         endDate: moment(),
    //         minDate: '01/01/2015',
    //         maxDate: window.max_date,
    //         dateLimit: {
    //             days: 60
    //         },
    //         showDropdowns: false,
    //         showWeekNumbers: true,
    //         timePicker: false,
    //         timePickerIncrement: 1,
    //         timePicker12Hour: true,
    //         ranges: {
    //             'Today': [moment(), moment()],
    //             'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
    //             'Last 7 Days': [moment().subtract('days', 6), moment()],
    //             'Last 30 Days': [moment().subtract('days', 29), moment()],
    //             'This Month': [moment().startOf('month'), moment().endOf('month')],
    //             'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
    //         },
    //         buttonClasses: ['btn btn-sm'],
    //         applyClass: ' blue',
    //         cancelClass: 'default',
    //         format: 'MM/DD/YYYY',
    //         separator: ' to ',
    //         locale: {
    //             applyLabel: 'Apply',
    //             fromLabel: 'From',
    //             toLabel: 'To',
    //             customRangeLabel: 'Custom Range',
    //             daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    //             monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //             firstDay: 1
    //         }
    //     },
    //     function (start, end) {
    //         $('#dashboard-report-range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    //         reload_dashboard_stock(start.format('YYYY-MM-DD'),end.format('YYYY-MM-DD'))
    //     }
    // );


    // $('#dashboard-report-range span').html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
    // $('#dashboard-report-range').show();
    // reload_dashboard_stock(moment().format('YYYY-MM-DD'),moment().format('YYYY-MM-DD'));

    trade_date = Template.ToDateDefault($('#trade_date').val());
    portofolio = $('#portofolio').val();
    fund = $('#fund').val();
    reload_dashboard_stock(trade_date,trade_date,fund,portofolio);


    function reload_dashboard_stock(start,end,fund,portofolio)
    {
    	Metronic.blockUI({
            target: '#wrapper-stock',
            boxed:true
        });
    	$.ajax({
    		type:"POST",dataType:"html",data:{
    			start:start,end:end,fund:fund,portofolio:portofolio
    		},
    		url:site_url+'dashboard/stock_data',
    		success:function(response) {
    			$('#stock tbody').html(response);
    			if (response=="") {
    				$('#stock tbody').html('<tr><td colspan="18" style="font-size:13px;font-weight:bold;border:0;text-align:center;vertical-align:middle;height:50px;">No Data to Show...</td></tr>')
    			}
    			Metronic.unblockUI('#wrapper-stock');
    		},
    		error: function(){
    			Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
    			$('#stock').show();
                Metronic.unblockUI('#wrapper-stock');
    		}
    	})
    }

    $('#search').click(function(e){
    	e.preventDefault();
    	var trade_date=Template.ToDateDefault($('#trade_date').val());
        var portofolio = $('#portofolio').val();
        var fund = $('#fund').val();
    	reload_dashboard_stock(trade_date,trade_date,fund,portofolio);
    })

    // $("#update").click(function(e){
    // 	e.preventDefault();
    // 	var trade_date=Template.ToDateDefault($('#trade_date').val());
    //     var fund = $('#fund').val();
    //     var portofolio = $('#portofolio').val();

    // 	Metronic.blockUI({
    //         target: '#wrapper-stock',
    //         boxed:true
    //     });
    //     $.ajax({
    //     	type:"POST",dataType:"json",data:{trade_date:trade_date,fund:fund,portofolio:portofolio},
    //     	url:site_url+'dashboard/update_stock_data',
    //     	success:function(response) {
    //     		if (response.success===true) {
    //     			reload_dashboard_stock(trade_date,trade_date,fund,portofolio)
    //     		} else {
				// 	Template.WarningAlert("Internal Server Error, Please contact your administrator.")
				// 	Metronic.unblockUI('#wrapper-stock');
    //     		}
    //     	},
    //     	error: function(){
				// Template.WarningAlert("Failed to connect into Databases, Please Check Your Connection")
				// Metronic.unblockUI('#wrapper-stock');
    //     	}
    //     })
    // })
})