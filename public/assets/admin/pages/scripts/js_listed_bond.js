$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormUpload = $("#FormUpload");

$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_listed_bond',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Bond Code', name: 'bond_code', align: 'center', width: 100 },
        { label: 'Bond Name', name: 'bond_name', align: 'left', width: 200 },
        { label: 'Coupon', name: 'coupon', align: 'center', width: 50 },
        { label: 'Coupon Payment Method', name: 'coupon_payment_method', align: 'center', width: 100, formatter: function(cellvalue){
            switch(cellvalue) {
                case "M":
                return "Monthly";
                break;
                case "Q":
                return "Quartly";
                break;
                case "S":
                return "Semi Annually";
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Coupon Frequency', name: 'coupon_frequency', align: 'center', width: 50 },
        { label: 'Rating', name: 'rating', align: 'center', width: 50 },
        { label: 'Rating Issuer', name: 'rating_issuer', align: 'center', width: 100 },
        { label: 'Maturity Date', name: 'maturity_date', align: 'center', width: 100 },
        { label: 'Sector', name: 'sector_name', align: 'center', width: 80 },
        { label: 'Subsector', name: 'subsector_name', align: 'center', width: 80 },
        { label: 'Issuer', name: 'issuer', align: 'center', width: 60 },
        { label: 'Issuer Flag', name: 'issuer_flag', align: 'center', width: 50 },
        { label: 'Scheme Type', name: 'akad_type', align: 'center', width: 100, formatter: function(cellvalue) {
            switch(cellvalue) {
                case "I":
                return "IJAROH / Fix Rate";
                break;
                case "M":
                return "MUDHARABAH / Floating Rate";
                break;
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Currency', name: 'currency', align: 'center', width: 50, }
        /*    
        { label: 'Currency', name: 'currency', align: 'center', width: 100, formatter: function(cellvalue) {
            switch(cellvalue) {
                case "IDR":
                return "Indonesian Rupiah";
                break;
                case "USD":
                return "US Dollar";
                break;
                default:
                return cellvalue;
                break;
            }
        }  }
        */
    ],
    viewrecords: true,
    width: 1098,
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

$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button>');

/* 
| BEGIN ADD
*/
$('select#sector',FormAdd).livequery('change',function(){
    var sector_code = $(this).val();
    subsector = $('#subsector',FormAdd);
    if (sector_code=='') {
        html = '<option value=""></option>';
        subsector.html(html);
    } else {
        $.ajax({
            type:"POST",dataType:"json",data:{sector_code:sector_code},
            url:site_url+'master/get_subsector_ajax',
            success:function(response) {
                html = '<option value="">SILAHKAN PILIH</option>';
                for (i in response) {
                    html += '<option value="'+response[i].subsector_code+'">'+response[i].subsector_name+'</option>';
                }
                subsector.html(html);
            }
        })
    }
})
$('#coupon_payment_method',FormAdd).change(function(){
    coupon_payment_method = $(this).val();
    switch(coupon_payment_method) {
        case "M":
        $('#coupon_frequency',FormAdd).val(12);
        break;
        case "Q":
        $('#coupon_frequency',FormAdd).val(4);
        break;
        case "S":
        $('#coupon_frequency',FormAdd).val(2);
        break;
    }
})

$('#btn_add').click(function(){
    $('#jqgrid').hide();
    $('#add').show();
    FormAdd.trigger('reset');
})

$('#btn_cancel',FormAdd).click(function(){
    $('#add').hide();
    $('#jqgrid').show();
    $('.alert-error',FormAdd).hide();
    FormAdd.trigger('reset');
    $('.error',FormAdd).removeClass('error');
})

FormAdd.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
         bond_code:{required:true}
        ,bond_name:{required:true}
        ,coupon:{required:true}
        ,coupon_payment_method:{required:true}
        ,coupon_frequency:{required:true}
        ,rating:{required:true}
        ,rating_issuer:{required:true}
        ,maturity_date:{required:true}
        ,sector:{required:true}
        ,subsector:{required:true}
        ,issuer:{required:true}
        ,issuer:{required:true}
        ,akad_type:{required:true}
        ,currency:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormAdd).show();
        Template.scrollTo($('.alert-error',FormAdd), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormAdd.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Add Bond Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormAdd).hide();
                            $('#jqgrid_data').trigger('reloadGrid');
                            $('#btn_cancel',FormAdd).trigger('click');
                        }
                    })
                }else{
                    Template.WarningAlert(response.error);
                }
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        });
    }
});

/*
| BEGIN EDIT
*/
$('select#sector',FormEdit).livequery('change',function(){
    var sector_code = $(this).val();
    subsector = $('#subsector',FormEdit);
    if (sector_code=='') {
        html = '<option value=""></option>';
        subsector.html(html);
    } else {
        $.ajax({
            type:"POST",dataType:"json",data:{sector_code:sector_code},
            url:site_url+'master/get_subsector_ajax',async:false,
            success:function(response) {
                html = '<option value="">SILAHKAN PILIH</option>';
                for (i in response) {
                    html += '<option value="'+response[i].subsector_code+'">'+response[i].subsector_name+'</option>';
                }
                subsector.html(html);
            }
        })
    }
})

$('#coupon_payment_method',FormEdit).change(function(){
    coupon_payment_method = $(this).val();
    switch(coupon_payment_method) {
        case "M":
        $('#coupon_frequency',FormEdit).val(12);
        break;
        case "Q":
        $('#coupon_frequency',FormEdit).val(4);
        break;
        case "S":
        $('#coupon_frequency',FormEdit).val(2);
        break;
    }
})

$('#btn_edit').click(function(e){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        $.ajax({
            type:"POST",dataType:"json",data:{id:selrow},
            url:site_url+'/inhouse/get_master_bond',
            success:function(response){
                $('#jqgrid').hide();
                $('#edit').show();
                $('#id',FormEdit).val(response.id);
                $('#bond_code',FormEdit).val(response.bond_code);
                $('#bond_name',FormEdit).val(response.bond_name);
                $('#coupon',FormEdit).val(response.coupon);
                $('#coupon_payment_method',FormEdit).val(response.coupon_payment_method);
                $('#coupon_frequency',FormEdit).val(response.coupon_frequency);
                $('#rating',FormEdit).val(response.rating);
                $('#maturity_date',FormEdit).val(Template.ToDatePicker(response.maturity_date));
                $('#sector',FormEdit).val(response.sector);
                $('#sector',FormEdit).trigger('change');
                $('#subsector',FormEdit).val(response.subsector);
                $('#issuer',FormEdit).val(response.issuer);
                if (response.issuer_flag=='G') {
                    $('#issuer1',FormEdit).attr('checked',true);
                    $('#issuer2',FormEdit).removeAttr('checked');
                } else if (response.issuer_flag=='C') {
                    $('#issuer1',FormEdit).removeAttr('checked');
                    $('#issuer2',FormEdit).attr('checked',true);
                } else {
                    $('#issuer1',FormEdit).removeAttr('checked');
                    $('#issuer2',FormEdit).removeAttr('checked');
                }
                // $('#issuer',FormEdit).val(response.issuer);
                // $('#issuer',FormEdit).val(response.issuer);
                $('#akad_type',FormEdit).val(response.akad_type);
                $('#currency',FormEdit).val(response.currency);
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        })
    } else {
        Template.WarningAlert("Please select a row");
    }
})
$('#btn_cancel',FormEdit).click(function(){
    $('#edit').hide();
    $('#jqgrid').show();
    $('.alert-error',FormEdit).hide();
    FormEdit.trigger('reset');
    $('.error',FormEdit).removeClass('error');
})

FormEdit.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function(a,b){},
    // ignore: "",
    rules: {
         bond_code:{required:true}
        ,bond_name:{required:true}
        ,coupon:{required:true}
        ,coupon_payment_method:{required:true}
        ,coupon_frequency:{required:true}
        ,rating:{required:true}
        ,rating_issuer:{required:true}
        ,maturity_date:{required:true}
        ,sector:{required:true}
        ,subsector:{required:true}
        ,issuer:{required:true}
        ,issuer_flag:{required:true}
        ,akad_type:{required:true}
        ,currency:{required:true}
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
        $('.alert-error',FormEdit).show();
        Template.scrollTo($('.alert-error',FormEdit), -200);
    },
    highlight: function (element) { // hightlight error inputs
        $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
        $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
        
        FormEdit.ajaxSubmit({
            dataType: 'json', 
            success: function(response) {
                if(response.success==true){
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        content:'Edit Bond Success.',
                        confirmButtonClass:'btn-success',
                        confirm:function(){
                            $('.alert-error',FormEdit).hide();
                            $('#jqgrid_data').trigger('reloadGrid');
                            $('#btn_cancel',FormEdit).trigger('click');
                        }
                    })
                }else{
                    Template.WarningAlert(response.error);
                }
            },
            error: function(){
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
            }
        });
    }
});

$('#btn_delete').click(function(){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        $.confirm({
            title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
            content:'Delete Bond? Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{id:selrow},
                    url:site_url+'/inhouse/delete_master_bond',
                    success:function(response) {
                        if (response.success===true) {
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Delete Bond Success.',
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

});