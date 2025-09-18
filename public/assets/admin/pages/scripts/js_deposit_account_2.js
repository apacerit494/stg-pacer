global_maxstock = 0;
v_broker_fee = 0;
v_account_number='';
v_account_number_deposito='';
v_id='';
v_break_maturity_status='';

$(function(){

var FormAdd = $('#FormAdd');

$("#jqgrid_data").jqGrid({
    url: site_url+'inhouse/jqgrid_deposit_account_2',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'id', name:'id', hidden:true, key:true }
        ,{ label: 'Fund Group Code' , name: 'fund_group_code', hidden:true }
        ,{ label: 'Fund Group Name', name:'fund_group_name', width: 100 }
        ,{ label: 'Bank Code', name:'bank_code', hidden:true }
        ,{ label: 'Bank Name', name:'bank_name', width: 100 }
        ,{ label: 'Account Number Deposito', name:'account_number', align:'center', width: 110 }
        ,{ label: 'Bilyet Number', name:'bilyet_number', align:'center', width: 100 }
        ,{ label: 'Break Maturity Date', name:'break_maturity_date', align:'center', width: 150  }
        ,{ label: 'Amount', name:'amount', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        //,{ label: 'Paid Return', name:'paid_return', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ label: 'Payment Date', name:'break_payment_date', align:'center', width: 100 , formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d-m-Y'} }
        ,{ label: 'Account Number Principal', name:'account_for_principal', width: 150, align:'center' }
        ,{ label: 'Status', name:'status', width: 80, align:'center', formatter: function(v){
            if (v=='PAID') {
                return '<label class="label label-xs label-success">PAID</label>';
            } else {
                return '<label class="label label-xs label-danger">UNPAID</label>';
            }
        } }
        //,{ label: 'Status', name:'status', align:'center', width:100, formatter:function(cellvalue) {
          //  switch(cellvalue) {
            //    case "0":
              //  return '<span class="label label-sm label-danger">UNPAID</span>';
                //break;
                //case "1":
                //return '<span class="label label-sm label-info">PAID</span>';
                //break;
                //default:
                //return cellvalue;
                //break;
            //}
        //} }
        ,{ label: 'Payment', width: 120, align:'right', align:'center', sortable:false, formatter: function(cellvalue,rowObj,rowArray) {
                
                var row_id=rowObj.rowId;
                var account_number_deposito=rowArray[5];
                var account_for_principal=rowArray[10];
                var status=rowArray[13];
                var break_maturity_date=rowArray[7];
                var amount=rowArray[8];

                var data = ' data-break_maturity_date="'+break_maturity_date+'" data-id="'+row_id+'" data-account_for_principal="'+account_for_principal+'" data-account_number_deposito="'+account_number_deposito+'"';
                data += ' data-amount="'+amount+'"';
                
                var Payment_button = '<a href="javascript:void(0);" id="ButtonPayment" class="btn btn-success btn-sm2" '+data+' style="margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Payment</a>';
                var actions = '<div class="btn-group" role="group" style="margin:0px;">'+Payment_button+'</div>';
                //if (status==1) {
                  //  actions = '-';
                //}
                if (status=="PAID") {
                    actions = '-';
                }
                
                return actions;

            }
        }
        ,{ name: 'status', hidden:true }
        ,{ name: 'break_maturity_status', hidden:true }
        ,{ name: '_break_maturity_date', index:'_break_maturity_date', hidden:true }
    ],
    viewrecords: true,
    autowidth: true,
    // width: '100%',
    shrinkToFit:true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    // 'cellEdit':true,
    // shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "fund_group_name",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$('#btn_search').click(function(e){
    e.preventDefault();

    keyword = $('#keyword').val();
    date1 = $('#date1').val();
    date2 = $('#date2').val();

    if (date1!="") date1 = Template.ToDateDefault(date1)
    if (date2!="") date2 = Template.ToDateDefault(date2)
    $('#jqgrid_data').setGridParam(
        {
            postData:{
                keyword:keyword,
                date1:date1,
                date2:date2
            }
        }
    ).trigger('reloadGrid',[{page:1}]);
})

/*------------------------------------------------------------------*/


$("#jqgrid_data_payment").jqGrid({
    url: site_url+'inhouse/get_history_transaction_deposito_2',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { name:'cat_id', hidden:true, key:true }
        // ,{ name:'dar_id', hidden:true }
        ,{ label: 'Transaction Date', name:'transaction_date', align:'center', width: 100 ,formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Amount', name:'amount', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ label: 'Description', name:'description', width: 500 }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    // 'cellEdit':true,
    shrinkToFit: true,
    toolbar: [true, "top"],
    sortname: "transaction_date",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_payment_pager"
});
$('#t_jqgrid_data_payment').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-success btn-sm2" id="ButtonPay"><i class="fa fa-money"></i> Save</a> \
    </div> \
    ');

var ButtonPayment = $('a#ButtonPayment');
var jqgrid = $('#jqgrid');
var payment = $('#payment');
var ButtonPay = $('#ButtonPay');
var jqgrid_data_payment = $("#jqgrid_data_payment");

payment.hide();

ButtonPayment.livequery('click',function(){
    var id = $(this).data('id');
    var dataGrid = $('#jqgrid_data').jqGrid('getRowData',id);
    var account_number_deposito = $(this).data('account_number_deposito');
    var account_for_principal = $(this).data('account_for_principal');
    var amount = $(this).data('amount');
    // var break_maturity_date = $(this).data('break_maturity_date');
    var break_maturity_date = dataGrid._break_maturity_date;

    // Set to Global Data
    v_break_maturity_status = dataGrid.break_maturity_status;

    jqgrid.hide();
    payment.show();
    $('#jqgrid_data_payment').setGridParam(
        {
            postData:{
                account_number:account_for_principal,
                amount:amount,
                break_maturity_date:break_maturity_date
            }
        }
    ).trigger('reloadGrid',[{page:1}]);

    v_account_number_deposito=account_number_deposito;
    v_id=id;
})

ButtonPay.livequery('click',function(){
    var selrow = jqgrid_data_payment.jqGrid('getGridParam','selrow');

    if (selrow) {
        var data = jqgrid_data_payment.jqGrid('getRowData',selrow);
        // id
        var cat_id = data.cat_id;
        var dar_id = v_id;
        var paid_return = data.amount;
        var transaction_date = Template.ToDateDefault(data.transaction_date);
        var account_number_deposito = v_account_number_deposito;
        $.confirm({
            title:"Pay",icon:'fa fa-money',backgroundDismiss:false,
            content:'Pay to This Transaction. Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        cat_id:cat_id
                        ,dar_id:dar_id
                        ,paid_return:paid_return
                        ,transaction_date:transaction_date
                        ,account_number_deposito:account_number_deposito
                        ,break_maturity_status:v_break_maturity_status
                    },
                    url:site_url+'inhouse/do_deposit_account_2',
                    success:function(response){
                        if(response.success==true){
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:'Success.',
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    $('#jqgrid_data').trigger('reloadGrid');
                                    $('#jqgrid_data_payment').trigger('reloadGrid');
                                }
                            })
                        }else{
                            Template.WarningAlert(response.error);
                        }
                    },
                    error:function(){
                        Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
                    }
                })
            }
        });
    } else {
        Template.WarningAlert('Please select a row.');
    }
})

var back = $('#back');
back.click(function(){
    payment.hide();
    jqgrid.show();
})

});