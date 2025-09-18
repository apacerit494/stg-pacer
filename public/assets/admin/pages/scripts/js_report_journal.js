$(function(){
    
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit')
    
    $("#jqgrid_data").jqGrid({
        url: site_url+'/report/jqgrid_report_journal',
        mtype: "GET",
        datatype: "json",
        postData:{
            fund_code:function(){ return $('#fund_code').val() },
            date1:function(){ return $('#date1').val() },
            date2:function(){ return $('#date2').val() }
        },
        colModel: [
             { label: 'ID' , name: 'id', key:true, width: 80, align:'center',hidden:true }
            ,{ label: 'Voucher Date' , name: 'voucher_date', width: 150, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Voucher No' , name: 'voucher_no', key:true, width: 80, align:'center' }
            ,{ label: 'Description' , name: 'description', width: 200, align:'left' }
            ,{ label: 'Voucher Ref' , name: 'voucher_ref', width: 100, align:'left' }
            ,{ label: 'GL Account No' , name: 'gl_account_no', width: 100, align:'left' }
            ,{ label: 'Amount' , name: 'amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
            ,{ label: 'Currency Code' , name: 'currency_code', width: 100, align:'center' }
            ,{ label: 'Orig Amount' , name: 'orig_amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:',',thousandsSeparator:'.',decimalPlaces:0,defaultValue:'0' } }
            ,{ label: 'Debit Credit Flag', name: 'debit_credit_flag', width: 100, align:'center', formatter:function(cellvalue) {
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
            
          ],
        viewrecords: true,
        autowidth: true,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        // sortname: "id",
        // sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager"
    });
    
    $("#t_jqgrid_data").append('<button class="jqGrid_export" id="btn_export"></button>');
    
    $('#btn_search').click(function(e){
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
    });
        
    $('#btn_export').click(function(){
        fund_code=($('#fund_code').val()=="")?'-':$('#fund_code').val();
        date1 = $('#date1').val().replace(/\//g,'');
        date2 = $('#date2').val().replace(/\//g,'');
        date1=(date1=="")?"-":date1;
        date2=(date2=="")?"-":date2;
        window.open(site_url+'excel/report_journal/'+fund_code+'/'+date1+'/'+date2);
    });
    
    
});