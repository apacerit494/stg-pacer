$(function(){

    $("#jqgrid_data").jqGrid({
        url: site_url+'/inhouse/jqgrid_deposit_break_maturity_verify',
        mtype: "GET",
        postData:{
            key: function(){ return $('#key').val() },
            word: function(){ return $('#word').val() }
        },
        datatype: "json",
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Fund Group' , name: 'fund_group_name', width: 100, align:'left' }
            ,{ label: 'Bank Name' , name: 'bank_name', width: 150, align:'left' }
            ,{ label: 'Account Number' , name: 'account_number', width: 150, align:'left' }
            ,{ label: 'Open Date' , name: 'open_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Last Due Date' , name: 'last_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Next Due Date' , name: 'next_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Profit Return Rasio' , name: 'profit_return_rasio', width: 100, align:'left', hidden:true }
            ,{ label: 'Last Yield' , name: 'last_yield', width: 100, align:'left', hidden:true }
            ,{ label: 'Return Last Due Date' , name: 'return_last_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Return Next Due Date' , name: 'return_next_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Amount' , name: 'amount', width: 100, align:'right',formatter:'currency', formatoptions: {decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:0,defaultValue:'0' } }
            ,{ label: 'Bilyet' , name: 'bilyet_number', width: 100, align:'left' }
            ,{ label: 'Deposit Term' , name: 'deposit_term', width: 80, align:'center'}
            ,{ label: 'Payment Return Mode' , name: 'payment_return_mode', width: 100, align:'left', hidden:true }
            ,{ label: 'Checking Account Number' , name: 'checking_account_number', width: 100, align:'left', hidden:true }
            ,{ label: 'Flag ARO' , name: 'aro_flag', width: 100, align:'center', formatter: function(cellvalue){
                switch(cellvalue){
                    case "0":
                    return 'Non ARO';
                    break;
                    case "1":
                    return 'ARO';
                    break;
                    default:
                    return '-';
                    break;
                }
            } }
            ,{ label: 'Flag Profile Sharing' , name: 'profit_sharing_flag', width: 100, align:'left', hidden:true }
            ,{ label: 'Created Stamp' , name: 'created_stamp', width: 100, align:'left', hidden:true }
            ,{ label: 'Status' , name: 'status', width: 100, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case"1":
                    return "<label class='label label-sm label-danger'>Verified</label>";
                    break;
                    case"2":
                    return "<label class='label label-sm label-warning'>UnVerified Break</label>";
                    break;
                    case"3":
                    return "<label class='label label-sm label-warning'>UnVerified Maturity</label>";
                    break;
                    case"4":
                    return "<label class='label label-sm label-info'>Break</label>";
                    break;
                    case"5":
                    return "<label class='label label-sm label-info'>Maturity</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ name: 'v_status', hidden:true }
        ],
        viewrecords: true,
        autowidth: true,
        height: 250,
        rowNum: 20,
        rownumbers: true,
        // 'cellEdit':true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "id",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager"
    });

    // $('#t_jqgrid_data').append('\
    // <div style="position:absolute;"> \
    // <a class="btn btn-success btn-sm2" id="btn_verify_break"><i class="fa fa-check"></i> Verify Break</a> \
    // <a class="btn btn-success btn-sm2" id="btn_verify_maturity"><i class="fa fa-check"></i> Verify Maturity</a> \
    // </div> \
    // ');
    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-success btn-sm2" id="btn_verify_break"><i class="fa fa-check"></i> Verify Break</a> \
    </div> \
    ');
    // search data
    $('#btn-search').click(function(e){
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
    })
    $('#word').keypress(function(e){
        if (e.keyCode==13) {
            $('#jqgrid_data').trigger('reloadGrid');
            e.preventDefault();
        }
    })
    // grid button
    var grid_verify_break = $('#btn_verify_break',jqgrid);
    // var grid_verify_maturity = $('#btn_verify_maturity',jqgrid);

    grid_verify_break.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='2') {
                $.confirm({
                    title:"Verify",icon:'fa fa-check',backgroundDismiss:false,
                    content:'Verify Status Break? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/do_verify_deposit_break',
                            success:function(response){
                                if(response.success==true){
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Verify Success.',
                                        confirmButtonClass:'btn-success',
                                        confirm:function(){
                                            $('#jqgrid_data').trigger('reloadGrid')
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
            } else if (status=='3') {
                Template.WarningAlert('Akun sudah diverifikasi');
            } else {
                Template.WarningAlert('Status belum diubah');
            }
        } else {
            Template.WarningAlert('Please select a row.');
        }
    })

    // grid_verify_maturity.click(function(){
    //     selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    //     if (selrow) {
    //         var id = selrow;
    //         var data = $('#jqgrid_data').jqGrid('getRowData',id);
    //         var status = data.v_status;
    //         if (status=='3') {
    //             $.confirm({
    //                 title:"Verify",icon:'fa fa-check',backgroundDismiss:false,
    //                 content:'Verify Status Maturity? Are You Sure?',
    //                 confirmButtonClass:'btn green',
    //                 cancelButtonClass:'btn red',
    //                 confirm:function(){
    //                     $.ajax({
    //                         type:"POST",dataType:"json",data:{id:id},
    //                         url:site_url+'inhouse/do_verify_deposit_maturity',
    //                         success:function(response){
    //                             if(response.success==true){
    //                                 $.alert({
    //                                     title:'Success',icon:'fa fa-check',backgroundDismiss:false,
    //                                     content:'Verify Success.',
    //                                     confirmButtonClass:'btn-success',
    //                                     confirm:function(){
    //                                         $('#jqgrid_data').trigger('reloadGrid')
    //                                     }
    //                                 })
    //                             }else{
    //                                 Template.WarningAlert(response.error);
    //                             }
    //                         },
    //                         error:function(){
    //                             Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
    //                         }
    //                     })
    //                 }
    //             });
    //         } else if (status=='4') {
    //             Template.WarningAlert('Akun sudah diverifikasi');
    //         } else {
    //             Template.WarningAlert('Status belum diubah');
    //         }
    //     } else {
    //         Template.WarningAlert('Please select a row.');
    //     }
    // })


});