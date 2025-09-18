$(function(){

var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit')

$("#jqgrid_data").jqGrid({
    url: site_url+'/report/jqgrid_report_current_account_transaction',
    mtype: "GET",
    datatype: "json",
    postData:{
        account_number:function(){ return $('#account_number').val() },
        transactiondatefrom:function(){ return $('#transactiondatefrom').val() },
        transactiondateto:function(){ return $('#transactiondateto').val() }
    },
    colModel: [
          { label: 'ID' , name: 'id', key:true, width: 80, align:'center',hidden:true }
        ,{ label: 'Account Number' , name: 'account_number', key:true, width: 80, align:'center' }
        ,{ label: 'Transaction Date' , name: 'transaction_date', width: 150, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
        ,{ label: 'Transaction Code' , name: 'transaction_code', width: 100, align:'left' }
        ,{ label: 'Reference' , name: 'reference', width: 100, align:'left' }
        ,{ label: 'Description' , name: 'description', width: 100, align:'left' }
         , { label: 'Debit Credit Flag', name: 'debit_credit_flag', width: 200, align:'center', formatter:function(cellvalue) {
            switch(cellvalue) {
                case "D":
                return 'Debet';
                break;
                case "C":
                return 'Credit';
                break;
                
                default:
                return cellvalue;
                break;
            }
        } }
        ,{ label: 'Amount' , name: 'amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'balance' , name: 'balance', width: 100, align:'right' ,formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
        ,{ label: 'Status' , name: 'status', width: 100, align:'left' }
        
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
    transactiondate = $('#transactiondate').val();
    if (transactiondate=='') {
       Template.WarningAlert('Please Select a Transaction date');
    } else {
       
        $('#jqgrid_data').setGridParam({postData:{transaction_date:transactiondate}}).trigger('reloadGrid',[{page:1}]);
    
    }
})


    
$('#btn_export').click(function(){
    account_number=($('#account_number').val()=="")?'-':$('#account_number').val();
    transactiondatefrom = $('#transactiondatefrom').val().replace(/\//g,'');
    transactiondateto = $('#transactiondateto').val().replace(/\//g,'');
    transactiondatefrom=(transactiondatefrom=="")?"-":transactiondatefrom;
    transactiondateto=(transactiondateto=="")?"-":transactiondateto;

    window.open(site_url+'excel/report_current_account_transaction/'+account_number+'/'+transactiondatefrom+'/'+transactiondateto);
})


$('#btn_pdf').click(function(){
    account_number=($('#account_number').val()=="")?'-':$('#account_number').val();
    transactiondatefrom = $('#transactiondatefrom').val().replace(/\//g,'');
    transactiondateto = $('#transactiondateto').val().replace(/\//g,'');
    transactiondatefrom=(transactiondatefrom=="")?"-":transactiondatefrom;
    transactiondateto=(transactiondateto=="")?"-":transactiondateto;

    window.open(site_url+'pdf/report_current_account_transaction/'+account_number+'/'+transactiondatefrom+'/'+transactiondateto);
});

$('#fund_group_code').change(function(){
    fund_group_code=$(this).val();
    $.ajax({
        type:"POST",dataType:"json",data:{
            fund_group_code:fund_group_code
        },
        url:site_url+'report/get_account_number_by_fund_group_code',
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