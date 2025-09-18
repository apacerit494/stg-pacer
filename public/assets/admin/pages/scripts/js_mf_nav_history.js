$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormUpload = $("#FormUpload");

$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_mf_nav_history',
    mtype: "GET",
    datatype: "json",
    colModel: [
         { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true }
        ,{ label: 'NAV Date' , name: 'nav_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} }
        ,{ label: 'Mutual Fund Code' , name: 'mf_code', width: 150, align:'left' }
        ,{ label: 'Mutual Fund Name' , name: 'mf_name', width: 300, align:'left' }
        //,{ label: 'NAV' , name: 'nav', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'NAV' , name: 'nav', width: 100, align:'right' }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$("#t_jqgrid_data").append('<button class="jqGrid_delete" id="btn_delete"></button> ');

$('#btn_search').click(function(e){
    e.preventDefault();
    navdate = $('#navdate').val();
    if (navdate=='') {
        Template.WarningAlert('Please Select a NAV Date');
    } else {
        $('#jqgrid_data').setGridParam({postData:{nav_date:navdate}}).trigger('reloadGrid',[{page:1}]);
    }
})

/*UPLOAD*/
FormUpload.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
        userfile:{required:true},
        nav_date:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormUpload).show();
        Template.scrollTo($('.alert-error',FormUpload), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        $('#btn_upload').attr('disabled',true);
        
        FormUpload.ajaxSubmit({
            dataType: 'json', 
            beforeSend: function() {
                $('#btn_upload').html('<i class="icon-spinner icon-spin"></i> <span>0%</span>');
            },
            uploadProgress: function(event, position, total, percentComplete) {
                if (percentComplete>99) {
                    percentComplete=99;
                }
                $('#btn_upload span').html(''+percentComplete+'%');
            },
            cache:false,
            success: function(response) {
                $('#btn_upload').html('<i class="icon-upload"></i> Upload');
                $('#btn_upload').attr('disabled',false);
                if (response.success==true) {
                    $.alert({
                        title:'Upload Success',icon:'icon-check',backgroundDismiss:false,
                        content:'Upload Data Mutual Fund NAV History Success.',
                        confirmButtonClass:'btn green',
                        confirm:function(){
                            $('#userfile').val('');
                            $('#jqgrid_data').trigger('reloadGrid');
                        }
                    })
                } else {
                    Template.WarningAlert(response.error);
                }

            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                // var percentVal = '100%';
                // percent.html(percentVal);
                $('#btn_upload').html('<i class="icon-upload"></i> Upload');
                $('#btn_upload').attr('disabled',false);
            }
        });
    }
});

// $('#btn_delete').click(function(){
//     navdate = $('#navdate').val();
//     if (navdate!='') {
//         $.confirm({
//             title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
//             content:'Delete Mutual Fund Nav History? Are You Sure?',
//             confirmButtonClass:'btn green',
//             cancelButtonClass:'btn red',
//             confirm:function(){
//                 $.ajax({
//                     type:"POST",dataType:"json",data:{nav_date:navdate},
//                     url:site_url+'/inhouse/delete_mf_nav_history',
//                     success:function(response) {
//                         if (response.success===true) {
//                             $.alert({
//                                 title:'Success',icon:'icon-check',backgroundDismiss:false,
//                                 content:'Delete Mutual Fund NAV History Success.',
//                                 confirmButtonClass:'btn green',
//                                 confirm:function(){
//                                     $('#userfile').val('');
//                                     $('#jqgrid_data').trigger('reloadGrid');
//                                 }
//                             })
//                         } else {
//                             Template.WarningAlert(response.error);
//                         }
//                     },
//                     error: function(){
//                         Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
//                     }
//                 })
//             }
//         })
//     } else {
//         Template.WarningAlert("Please select a NAV Date.");
//     }
// })

$('#btn_delete').click(function(){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Mutual Fund NAV History? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/inhouse/delete_mf_nav_history',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Mutual Fund NAV History Success.',
                                confirmButtonClass:'btn green',
                                confirm:function(){
                                    $('#userfile').val('');
                                    $('#jqgrid_data').trigger('reloadGrid');
                                }
                            })
                        } else {
                            Template.WarningAlert(response.error);
                        }
                    },
                    error: function(){
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                })
            }
        })
    } else {
        Template.WarningAlert("Please select a row.");
    }
})

$("#version").click(function(){
    $('#btn_long').show();
    $('#btn_short').hide();
})

$("#version2").click(function(){
    $('#btn_short').show();
    $('#btn_long').hide();
})

})