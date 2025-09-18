var Template = function(){

	var handleMainMenu = function(){
		/* handle classic dropdown menu */
		$(".dropdown-submenu > a").on("click", function(e){
			if( $(this).next().hasClass('dropdown-menu') ) {
				e.stopPropagation();
				if( $(this).parent().hasClass('open') ) {
					$(this).parent().removeClass('open');
				} else {
					$(this).parent().addClass('open');
					$(this).next().show();
				}
			}
		});

		$('[data-hover="megamenu-dropdown"]').not('.hover-initialized').each(function(){
			$(this).dropdownHover();
			$(this).addClass('hover-initialized');
		});
	};

	var handleChoosenSelect = function () {
        if (!jQuery().chosen) {
            return;
        }

        $("select.chosen").livequery(function () {
            $(this).chosen({
                allow_single_deselect: $(this).attr("data-with-diselect") === "1" ? true : false,
                width: '100%'
            });
        });
    }

	return {
		init: function(){
			handleMainMenu();
			handleChoosenSelect();

			$('.upper').livequery('keyup',function(){
				$(this).val($(this).val().toUpperCase())
			})

			// masking for currency of rupiah
			$(".maskmoney").livequery(function(){
				$(this).inputmask('decimal',{
		            placeholder:" ", 
		            numericInput: true, 
		            radixPoint: ",", 
		            autoGroup: true, 
		            groupSeparator: ".", 
		            groupSize: 3,
		            repeat: 15,
		            greedy: false,
		            clearMaskOnLostFocus: false
		        });
	        });
			$(".decimal").livequery(function(){
				$(this).inputmask('decimal',{
		            placeholder:"", 
		            numericInput: true, 
		            radixPoint: ".", 
		            autoGroup: true, 
		            groupSeparator: ",", 
		            groupSize: 3,
		            repeat: 15,
		            greedy: false,
		            clearMaskOnLostFocus: false
		        });
	        });

			// masking for currency of rupiah
			$(".maskdate").livequery(function(){
				$(this).inputmask('d/m/y');
	        });
			$(".masktime").livequery(function(){
				$(this).inputmask('h:s');
	        });

	        // datepicker for general date
			$('.datepicker').livequery(function(){
				$(this).datepicker({
					changeMonth: true,
					changeYear: true,
					dateFormat: 'dd/mm/yy',
					yearRange: "-50:+40",
					onSelect: function(date){
						$(this).focus();
					}
				});
			});
		},
		ToDatePicker: function(date){
            var Sdate = date.split('-');
            var date =  Sdate[2]+'/'+Sdate[1]+'/'+Sdate[0];
            return date;
		},
		ToDateDefault: function(date){
            var Sdate = date.replace(/\//g,'');
            var date = Sdate.substring(4,8)+'-'+Sdate.substring(2,4)+'-'+Sdate.substring(0,2);
            return date;
		},
		ConvertNumeric: function(number){
			number = number.replace(/\./g, '');
			return number;
		},
		ConvertDecimal: function(number){
			number = number.replace(/\,/g, '');
			return number;
		},
		NumberFormat: function( number, decimals, dec_point, thousands_sep ){	
		    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
		    var n = !isFinite(+number) ? 0 : +number,
		        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		        s = '',
		        toFixedFix = function (n, prec) {
		            var k = Math.pow(10, prec);
		            return '' + Math.round(n * k) / k;
		        };
		    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
		    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
		    if (s[0].length > 3) {
		        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		    }
		    if ((s[1] || '').length < prec) {
		        s[1] = s[1] || '';
		        s[1] += new Array(prec - s[1].length + 1).join('0');
		    }
		    // Add this number to the element as text.
		    return s.join(dec);
		},
		scrollTo: function(el, offset){
			pos = el ? el.offset().top : 0;
			$('html,body').animate({
				scrollTop: pos + (offset ? offset : 0)
			}, 'slow');
		},
		initChart: function(){
			new Morris.Area({
			  element: 'myfirstchart',
			  behaveLikeLine: false,
			  gridEnabled: false,
			  gridLineColor: false,
			  axes: false,
			  fillOpacity: 1,
			  data: [
			    { year: '2011', sales: 1400, profit: 400 },
			    { year: '2012', sales: 1000, profit: 600 },
			    { year: '2013', sales: 2000, profit: 500 },
			    { year: '2014', sales: 1100, profit: 400 },
			    { year: '2015', sales: 1000, profit: 700 }
			  ],
			  xkey: 'year',
			  ykeys: ['sales','profit'],
			  labels: ['Sales','Profit'],
			  pointSize: 0,
			  lineWidth: 0,
			  hideHover: 'auto',
			  resize: true
			});
		},
		initMiniChart: function(){
			$("#sparkline_bar").sparkline([8,9,10,11,10,10,12,10,10,11,9,12,11], {
				type:'bar',
				width:'100',
				barWidth:6,
				height:'45',
				barColor:'#F36A5B',
				negBarColor:'#e02222'
			});
			$("#sparkline_bar2").sparkline([8,9,10,11,10,10,12,10,10,11,9,12,11], {
				type:'bar',
				width:'100',
				barWidth:6,
				height:'45',
				barColor:'#5C9BD1',
				negBarColor:'#e02222'
			});
		},
		WarningAlert: function(content){
			$.alert({
				title:'Warning',icon:'fa fa-warning',content:content,
				confirmButtonClass:'btn-warning',animation:'zoom',
				confirmButton:'OK'
			})
		},

        SuccessAlert: function(content,callback){
            $.alert({
                title:'Success',icon:'fa fa-check',content:content,
                confirmButtonClass:'btn green',backgroundDismiss:false,
                confirm: callback,
                keyboardEnabled: true,
                columnClass: 'col-md-4 col-md-offset-4'
            })
        },

        ErrorAlert: function(content,callback){
            $.alert({
                title:'Error',icon:'fa fa-warning',content:content,
                confirmButtonClass:'btn red',backgroundDismiss:false,
                confirm: callback,
                keyboardEnabled: true,
                columnClass: 'col-md-6 col-md-offset-3'
            })
        },

        ConfirmAlert: function(content,callback){
            $.confirm({
                title:'Message',icon:'fa fa-warning',content:content,
                confirmButtonClass:'btn-warning', cancelButtonClass:'btn red',
                keyboardEnabled: true,
                backgroundDismiss:false,
                confirm: callback,
                columnClass: 'col-md-6 col-md-offset-3'
            })
        },

	}
}();