v_id='';
v_mf_code='';
v_nav_date='';
v_amount='';

$(function(){

var FormAdd = $('#FormAdd');

$("#jqgrid_data").jqGrid({
    url: site_url+'inhouse/jqgrid_mutual_fund_transaction_settlement',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'ID', name: 'id', key: true, width: 80, align:'center', hidden:true },
        { label: 'Fund Group', name: 'fund_code', width: 150 },
        { label: 'Fund Manager', name: 'fm_code', width: 200 },
        { label: 'Mutual Fund', name: 'mf_code', width: 200 },
        { label: 'NAV Date', name: 'nav_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d/m/Y"} },
        { label: 'Settelment Date', name: 'settlement_date', width: 100, align:'center', formatter: "date", formatoptions: { newformat: "d-m-Y"} },
        { label: 'NAV', name: 'nav', width: 100, hidden:true },
        { label: 'Amount', name: 'amount', width: 100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' } },
        { label: 'Settlement Amount', name: 'settlement_amount', width: 100,align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:2,defaultValue:'0' } },
        { label: 'Quantity Unit', name: 'quantity_unit', width: 100, hidden:true },
         { label: 'Sell/Buy', name: 'sell_buy_flag', width: 150, align:'Center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "S":
                return 'Sell';
                break;
                case "B":
                return 'Buy';
                default:
                return cellvalue;
                break;
            }
        } },
        { label: 'Settlement', width: 120, align:'right', align:'center', sortable:false, formatter: function(cellvalue,rowObj,rowArray) {
                
                var row_id=rowObj.rowId;
                var mf_code=rowArray[11];
                var nav_date=rowArray[4];
                var amount=rowArray[7];
                var data = ' data-id="'+row_id+'"';
                data += ' data-mf_code="'+mf_code+'"';
                data += ' data-nav_date="'+nav_date+'"';
                data += ' data-amount="'+amount+'"';
                
                var settlement_button = '<a href="javascript:void(0);" id="ButtonSettlement" class="btn btn-success btn-sm2" '+data+' style="margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Settlement</a>';
                var actions = '<div class="btn-group" role="group" style="margin:0px;">'+settlement_button+'</div>';
                
                return actions;

            }
        },
        { label: 'mf_code', name: 'mf_code_', hidden:true }
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
    url: site_url+'inhouse/get_history_transaction_mutual_fund',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { name:'cat_id', hidden:true, key:true }
        // ,{ name:'dar_id', hidden:true }
        ,{ label: 'Transaction Date', name:'transaction_date', align:'center', width: 100 ,formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Amount', name:'amount', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ label: 'Account Number', name:'account_number', width: 100, align:'center'}
        
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

var ButtonSettlement = $('a#ButtonSettlement');
var jqgrid = $('#jqgrid');
var payment = $('#payment');
var ButtonPay = $('#ButtonPay');
var jqgrid_data_payment = $("#jqgrid_data_payment");

payment.hide();

ButtonSettlement.livequery('click',function(){
    var account_number_deposito = $(this).data('account_number_deposito');
    var id = $(this).data('id');
    var mf_code = $(this).data('mf_code');
    var nav_date = $(this).data('nav_date');
    var amount = $(this).data('amount');

    jqgrid.hide();
    payment.show();
    $('#jqgrid_data_payment').setGridParam(
        {
            postData:{
                id:id
            }
        }
    ).trigger('reloadGrid',[{page:1}]);

    v_id = id;
    v_mf_code = mf_code;
    v_nav_date = nav_date;
    v_amount = amount;
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
        var mf_code = v_mf_code;
        var account_number=data.account_number;

        $.confirm({
            title:"Settlement",icon:'fa fa-money',backgroundDismiss:false,
            content:'Settlement This Transaction. Are You Sure?',
            confirmButtonClass:'btn green',
            cancelButtonClass:'btn red',
            confirm:function(){
                $.ajax({
                    type:"POST",dataType:"json",data:{
                        cat_id:cat_id
                        ,dar_id:dar_id
                        ,paid_return:paid_return
                        ,transaction_date:transaction_date
                        ,mf_code:mf_code
                        ,account_number
                    },
                    url:site_url+'inhouse/do_mutual_fund_transaction_settlement',
                    success:function(response){
                        if(response.success==true){

                            // v_nav_date = v_nav_date
                            v_settlement_date = transaction_date;
                            // v_amount = v_amount
                            v_settlement_amount = paid_return;

                            msg = '<div class="alert alert-success" style="text-align:center">';
                            msg += '<i class="fa fa-check"></i> Settlement Amount Success.';
                            msg += '<br><br><strong>Nav Date : '+Template.ToDatePicker(v_nav_date)+'</strong>';
                            msg += '<br><strong>Settlement Date : '+Template.ToDatePicker(v_settlement_date)+'</strong>';
                            msg += '<br><strong>Amount : '+Template.NumberFormat(v_amount,2,'.',',')+'</strong>';
                            msg += '<br><strong>Settlement Amount : '+Template.NumberFormat(v_settlement_amount,2,'.',',')+'</strong>';
                            msg += '</div>';
                            $.alert({
                                title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                content:msg,
                                confirmButtonClass:'btn-success',
                                confirm:function(){
                                    $('#jqgrid_data').trigger('reloadGrid');
                                    $('#jqgrid_data_payment').trigger('reloadGrid');
                                    $('#back').trigger('click');
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
    payment.fadeOut('normal',function(){
        jqgrid.fadeIn('normal');
    });
})

});