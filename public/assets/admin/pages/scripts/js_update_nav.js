$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

/*
| BEGIN GRID
*/
$("#jqgrid_data").jqGrid({
    url: site_url+'/inhouse/jqgrid_update_nav',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund Group', name: 'fund_code', align: "center", width: 80 },
        // { label: 'FM Code', name: 'fm_code', width: 100 },
        { label: 'Fund Manager', name: 'fm_name', width: 250 , hidden:true},
        //{ label: 'MF Code', name: 'mf_code', align:'center', width, hidden:true: 100 },
        { label: 'Mutual Fund', name: 'mf_code', width: 300},
        { label: 'Sell Buy Flag', name: 'sell_buy_flag', width: 80, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "S":
                return 'Sell';
                break;
                case "B":
                return 'Buy';
                break;
                return cellvalue;
                break;
            }
        } },
        { label: 'Amount', name: 'amount', width: 100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' }},
        { label: 'NAV Date', name:'nav_date',width:100,align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}},
        { label: 'NAV', name: 'nav', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:4,defaultValue:'0.0000' }},
        { label: 'Unit', name: 'quantity_unit', width: 100 ,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:4,defaultValue:'0.0000' } },
        { name:'status', hidden:true} 
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

//$("#t_jqgrid_data").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');
$("#t_jqgrid_data").append('<button class="btn btn-success btn-sm2" id="btn_edit"><i class="fa fa-edit"></i> Update NAV</button>');
/*
| END GRID
*/


/*
| BEGIN EDIT
*/

$('#btn_edit').click(function(e){
    selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    if (selrow) {
        data = $('#jqgrid_data').jqGrid('getRowData',selrow);
        status = data.status;
        if (status==0)
        {
            Template.WarningAlert('Data ini Belum diVerifikasi!');
        }
        else
        {
            $.ajax({
                type:"POST",dataType:"json",data:{id:selrow},
                url:site_url+'/inhouse/get_update_nav',
                success:function(response){
                    $('#jqgrid').hide();
                    $('#edit').show();
                    $('#id',FormEdit).val(response.id);
                    $('#sell_buy_flag',FormEdit).val(response.sell_buy_flag);
                    $('#fund_code',FormEdit).val(response.fund_code);
                    $('#fm_name',FormEdit).val(response.fm_name);
                    //$('#mf_name',FormEdit).val(response.mf_name);
                    $('#mf_name',FormEdit).val(response.mf_code+' - '+response.mf_name);
                    $('#nav_date',FormEdit).val(response.nav_date);
                    $('#nav',FormEdit).val('0');
                    $('#sell_flag',FormEdit).val(response.sell_flag);
                    if (response.sell_flag=='U') {
                        $('#quantity_unit',FormEdit).closest('.form-group').show();
                        $('#amount',FormEdit).closest('.form-group').hide();
                    } else {
                        $('#quantity_unit',FormEdit).closest('.form-group').hide();
                        $('#amount',FormEdit).closest('.form-group').show();
                    }
                    $('#quantity_unit',FormEdit).val(Template.NumberFormat(response.quantity_unit,4,'.',','));
                    $('#amount',FormEdit).val(Template.NumberFormat(response.amount,2,'.',','));
                },
                error: function(){
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
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
        nav:{required:true},
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
                    var message = 'Update NAV Success.';
                    message += '<br>Unit : '+response.data.quantity_unit;
                    message += '<br>Nominal : '+response.data.amount;
                    message += '<br>NAV : '+response.data.nav;
                    $.alert({
                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                        //content:'Update NAV Success.',
                        content:message,
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


})