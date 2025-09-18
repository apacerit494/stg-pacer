global_maxstock = 0;
v_broker_fee = 0;
v_account_for_return='';
v_ref_no='';
v_id='';

$(function(){

var FormAdd = $('#FormAdd');

$("#jqgrid_data").jqGrid({
    url: site_url+'inhouse/jqgrid_realisasi_coupon',
    mtype: "GET",
    datatype: "json",
    colModel: [
        { label: 'id', name:'id', hidden:true, key:true }
        ,{ label: 'Fund Group Code' , name: 'fund_group_code', hidden:true }
        ,{ label: 'Fund Group Name', name:'fund_group_name', width: 100 }
        ,{ label: 'Bond Code', name:'bond_code', hidden:true }
        ,{ label: 'Bond Name', name:'bond_name', width: 100 }
        ,{ label: 'Ref No', name:'ref_no', align:'center', width: 110 }
        ,{ label: 'Due Date', name:'coupon_due_date', align:'center', width: 80 ,formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Expected Return', name:'expected_return', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ label: 'Paid Return', name:'paid_return', width: 100, align:'right', formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:2,defaultValue:'0' } }
        ,{ label: 'Payment Date', name:'payment_date', align:'center', width: 100 , formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Account Number Return', name:'account_for_return', width: 150, align:'center' }
        ,{ label: 'Status', name:'status', align:'center', width:100, formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return '<span class="label label-sm label-danger">Belum Bayar</span>';
                break;
                case "1":
                return '<span class="label label-sm label-info">Sudah Bayar</span>';
                break;
                default:
                return cellvalue;
                break;
            }
        } }
        ,{ label: 'Payment', width: 120, align:'right', align:'center', sortable:false, formatter: function(cellvalue,rowObj,rowArray) {
                
                var row_id=rowObj.rowId;
                var ref_no=rowArray[5];
                var account_for_return=rowArray[10];
                var status=rowArray[13];
                var coupon_due_date=rowArray[6];

                var data = ' data-id="'+row_id+'" data-account_for_return="'+account_for_return+'" data-ref_no="'+ref_no+'"';
                data += ' data-coupon_due_date="'+coupon_due_date+'"';
                
                var Payment_button = '<a href="javascript:void(0);" id="ButtonPayment" class="btn btn-success btn-sm2" '+data+' style="margin:3px 0;"><i class="fa fa-money"></i> &nbsp;Payment</a>';
                var actions = '<div class="btn-group" role="group" style="margin:0px;">'+Payment_button+'</div>';
                if (status==1) {
                    actions = '-';
                }
                
                return actions;

            }
        }
        ,{ name: 'status', hidden:true }
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
    url: site_url+'inhouse/get_history_transaction_bank_bond',
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
    var ref_no = $(this).data('ref_no');
    var account_for_return = $(this).data('account_for_return');
    var coupon_due_date = $(this).data('coupon_due_date');
    var id = $(this).data('id');

    jqgrid.hide();
    payment.show();
    $('#jqgrid_data_payment').setGridParam(
        {
            postData:{
                account_number:account_for_return,
                coupon_due_date:coupon_due_date
            }
        }
    ).trigger('reloadGrid',[{page:1}]);

    v_ref_no=ref_no;
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
        var ref_no = v_ref_no;
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
                        ,ref_no:ref_no
                    },
                    url:site_url+'inhouse/do_realisasi_coupon',
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