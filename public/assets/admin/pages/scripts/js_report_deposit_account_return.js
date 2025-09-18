$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit')

$("#jqgrid_data").jqGrid({
    url: site_url+'/report/jqgrid_report_deposit_account_return',
    mtype: "GET",
    datatype: "json",
    postData:{
        fund_group_code:function(){ return $('#fund_group_code').val() },
        account_number:function(){ return $('#account_number').val() },
        duedatefrom:function(){ return $('#duedatefrom').val() },
        duedateto:function(){ return $('#duedateto').val() },
        paymentdatefrom:function(){ return $('#paymentdatefrom').val() },
        paymentdateto:function(){ return $('#paymentdateto').val() }
    },
    colModel: [
          { label: 'ID' , name: 'id', key:true, width: 80, align:'center',hidden:true }
        ,{ label: 'Fund Group' , name: 'fund_group_code', key:true, width: 80, align:'center' }
        ,{ label: 'Account Number' , name: 'account_number', key:true, width: 150, align:'center' }
        ,{ label: 'Bank' , name: 'bank_name', key:true, width: 250, align:'center' }
        ,{ label: 'Bilyet Number' , name: 'bilyet_number', key:true, width: 150, align:'center' }
        ,{ label: 'Due Date' , name: 'due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Amount' , name: 'paid_return', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Payment Date' , name: 'payment_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Current Account Number' , name: 'account_for_return', key:true, width: 150, align:'center' }
       , { label: 'Status', name: 'status', width: 100, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "0":
                return 'Belum Bayar';
                break;
                case "1":
                return 'Sudah Bayar';
                break;
                
                default:
                return cellvalue;
                break;
            }
        } }
      ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 20,
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "account_number",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqgrid_data_pager"
});

$("#t_jqgrid_data").append('<button class="jqGrid_export" id="btn_export"></button><button class="jqGrid_print" id="btn_pdf"></button>');

$('#btn_search').click(function(e){
    e.preventDefault();
    duedate = $('#duedate').val();
    if (duedate=='') {
       Template.WarningAlert('Please Select a Due date');
    } else {
       
        $('#jqgrid_data').setGridParam({postData:{due_date:duedate}}).trigger('reloadGrid',[{page:1}]);
    
    }
})


    
$('#btn_export').click(function(){
    fund_group_code=($('#fund_group_code').val()=="")?'-':$('#fund_group_code').val();
    account_number=($('#account_number').val()=="")?'-':$('#account_number').val();
    duedatefrom = $('#duedatefrom').val().replace(/\//g,'');
    duedateto = $('#duedateto').val().replace(/\//g,'');
    duedatefrom=(duedatefrom=="")?"-":duedatefrom;
    duedateto=(duedateto=="")?"-":duedateto;

    paymentdatefrom = $('#paymentdatefrom').val().replace(/\//g,'');
    paymentdateto = $('#paymentdateto').val().replace(/\//g,'');
    paymentdatefrom=(paymentdatefrom=="")?"-":paymentdatefrom;
    paymentdateto=(paymentdateto=="")?"-":paymentdateto;
    window.open(site_url+'excel/report_deposit_account_return/'+fund_group_code+'/'+account_number+'/'+duedatefrom+'/'+duedateto+'/'+paymentdatefrom+'/'+paymentdateto);
})


$('#btn_pdf').click(function(){
    fund_group_code=($('#fund_group_code').val()=="")?'-':$('#fund_group_code').val();
    account_number=($('#account_number').val()=="")?'-':$('#account_number').val();
    duedatefrom = $('#duedatefrom').val().replace(/\//g,'');
    duedateto = $('#duedateto').val().replace(/\//g,'');
    duedatefrom=(duedatefrom=="")?"-":duedatefrom;
    duedateto=(duedateto=="")?"-":duedateto;

    paymentdatefrom = $('#paymentdatefrom').val().replace(/\//g,'');
    paymentdateto = $('#paymentdateto').val().replace(/\//g,'');
    paymentdatefrom=(paymentdatefrom=="")?"-":paymentdatefrom;
    paymentdateto=(paymentdateto=="")?"-":paymentdateto;

    window.open(site_url+'pdf/report_deposit_account_return/'+fund_group_code+'/'+account_number+'/'+duedatefrom+'/'+duedateto+'/'+paymentdatefrom+'/'+paymentdateto);
});

$('#fund_group_code').change(function(){
    fund_group_code=$(this).val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            fund_group_code:fund_group_code
        },
        url:site_url+'report/get_account_number_by_fund_group_code2',
        success:function(response){
            html = '<option value="">-ALL-</option>';
            for ( i in response ) {
                html += '<option value="'+response[i].account_number+'">'+response[i].account_number+'</option>';
            }
            $('#account_number').html(html).trigger('chosen:updated')
        }
    })
})

})