$(function(){

	var get_closing_status = function(date_closing,date_now,status)
	{
		$.ajax({
			type:"POST",dataType:"json",data:{
				date_closing:date_closing,
				date_now:date_now
			},
			async:false,
			url:site_url+'closing/get_closing_status',
			success:function(response) {

				html = '<ul>';
				for ( i in response )
				{
					html += '<li><strong>'+response[i].function_name+'</strong> : '+response[i].error_value+' ('+response[i].description+')</li>';
				}
				html += '</ul>';


				var FormClosing = $('#FormClosing');
				var error_message = $('#error_message');
				var success_message = $('#success_message');

				if ( status==1 ) {
					error_message.hide();
					success_message.show();
					FormClosing.hide();
					success_message.find('#msg').html(html)
				} else {
					error_message.show();
					success_message.hide();
					FormClosing.hide();
					error_message.find('#msg').html(html)
				}

			},
			error: function(){
			    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
			}
		})
	}

	var reset_view = function(){

		var FormClosing = $('#FormClosing');
		var error_message = $('#error_message');
		var success_message = $('#success_message');

		error_message.hide();
		success_message.hide();
		FormClosing.show();
		success_message.find('#msg').html('')
		error_message.find('#msg').html('')
	}

	$('.alert .back').click(function(e){
		reset_view();
	})

	var btn_closing = $('#btn_closing');
	btn_closing.click(function(e){
		e.preventDefault();
		var closing_date = $('#closing_date');

		if (closing_date.val()=="")
		{
			Metronic.WarningAlert('Please Choose Closing Date!');
		}
		else
		{
	        $.confirm({
	            title:'Closing Harian!',icon:'fa fa-warning',backgroundDismiss:false,
	            content:'Apakah anda yakin akan melakukan Closing?',
	            confirmButtonClass:'btn-warning',cancelButtonClass:'btn-danger',
	            confirm: function(){
	            	$('#btn_closing').html('<i class="fa fa-spinner fa-spin"></i> Closing... Please wait').attr('disabled',true);
	                $('#FormClosing').ajaxSubmit({
			            dataType: 'json', 
			            success: function(response) {
			                if(response.success==true){
			                    get_closing_status(response.date.closing,response.date.now,response.status);
			                }else{
			                    Template.WarningAlert(response.message);
			                }
							$('#btn_closing').html('<i class="fa fa-refresh"></i> Process Closing').removeAttr('disabled');
			            },
			            error: function(){
			                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
			                $('#btn_closing').html('<i class="fa fa-refresh"></i> Process Closing').removeAttr('disabled');
			            }
			        });
	            }
        	});
		}
	})

})