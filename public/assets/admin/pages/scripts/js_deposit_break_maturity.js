$(function(){

    $("#jqgrid_data").jqGrid({
        url: site_url+'/inhouse/jqgrid_deposit_break_maturity',
        mtype: "POST",
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
            ,{ label: 'Current Account Number' , name: 'account_for_principal', width: 100, align:'left', hidden:true }
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
            ,{ label: 'Created Stamp' , name: 'created_stamp', width: 80, align:'left', hidden:true }
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
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ name: 'v_status', hidden:true }
            ,{ label: 'Action', align:'center', width:80, formatter:function(cellvalue,rowObj,rowArray) {
                var row_id=rowObj.rowId;
                var status=rowArray[20];
                var no_surat=rowArray[22];
                var tgl_surat=rowArray[23];

                var url = site_url+'pdf/surat_deposit_break/'+row_id;

                switch(status){
                    case "4":
                    process_button = '<a href="'+url+'" \
                                            id="btn_print" \
                                            target="_blank" \
                                            class="btn btn-success btn-sm2" \
                                            style="margin:5px 0;" \
                                            data-id="'+row_id+'" \
                                            data-no_surat="'+no_surat+'" \
                                            data-tgl_surat="'+tgl_surat+'" \
                                        ><i class="fa fa-print"></i> Print</a>';
                    break;
                    default:
                    process_button = '-';
                    break;
                }
                var actions = process_button;
                return actions;
            }}
            ,{ name: 'no_surat_break', hidden:true }
            ,{ name: 'tgl_surat_break', hidden:true }
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
    // search data
    $('#btn-search').click(function(e){
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
    });
    $('#word').keypress(function(e){
        if (e.keyCode==13) {
            $('#jqgrid_data').trigger('reloadGrid');
            e.preventDefault();
        }
    });

    // print surat placement
    $('a#btn_print').livequery('click',function(e){
        e.preventDefault();

        // get data from element
        var url = $(this).attr('href');
        var id = $(this).data('id');
        var no_surat = $(this).data('no_surat');
        var tgl_surat = $(this).data('tgl_surat');

        // set data to dialog
        $('#id','#modal_print').val(id);
        $('#url','#modal_print').val(url);
        $('#no_surat','#modal_print').val(no_surat);
        if (tgl_surat=="" || tgl_surat==null) {
            $('#tgl_surat','#modal_print').val('');
        } else {
            $('#tgl_surat','#modal_print').val(Template.ToDatePicker(tgl_surat));
        }

        $('#modal_print').modal('show');
    });
    $('#print_do').click(function(){
        var id = $('#id','#modal_print').val();
        var no_surat = $('#no_surat','#modal_print').val();
        var tgl_surat = $('#tgl_surat','#modal_print').val();
        var url = $('#url','#modal_print').val();
        var bValid=true;

        if (no_surat=="") {
            bValid=false;
            $('#no_surat','#modal_print').addClass('error')
        } else {
            $('#no_surat','#modal_print').removeClass('error')
        }
        if (tgl_surat=="") {
            bValid=false;
            $('#tgl_surat','#modal_print').addClass('error')
        } else {
            $('#tgl_surat','#modal_print').removeClass('error')
        }
        if (bValid==true) {
            $.ajax({
                type:"POST",dataType:"json",data:{
                    id:id
                    ,no_surat:no_surat
                    ,tgl_surat:tgl_surat
                },url:site_url+'inhouse/update_deposit_account_print_break',
                success:function(response){
                    if (response.success===true) {
                        $("#jqgrid_data").trigger('reloadGrid');
                        $('#modal_print').modal('hide');
                        window.open(url,'_blank');
                    } else {
                        Template.WarningAlert('Failed to connect into databases. please check your connection!')
                    }
                },
                error: function(){
                    Template.WarningAlert('Failed to connect into databases. please check your connection!')
                }
            })
        } else {
           Template.WarningAlert('You have some form error. please fix it!');
        }
    });

    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a href="#modal_change_status" data-toggle="modal" class="btn btn-success btn-sm2" id="btn_change_status" title="Change Status"><i class="fa fa-check"></i> Break</a> \
    </div> \
    ');
    // grid button
    // var grid_verify_break = $('#btn_verify_break',jqgrid);
    // var grid_verify_maturity = $('#btn_verify_maturity',jqgrid);

    // grid_verify_break.click(function(){
    //     selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
    //     if (selrow) {
    //         var id = selrow;
    //         var data = $('#jqgrid_data').jqGrid('getRowData',id);
    //         var status = data.v_status;
    //         if (status=='2') {
    //             $.confirm({
    //                 title:"Verify",icon:'fa fa-check',backgroundDismiss:false,
    //                 content:'Verify Status Break? Are You Sure?',
    //                 confirmButtonClass:'btn green',
    //                 cancelButtonClass:'btn red',
    //                 confirm:function(){
    //                     $.ajax({
    //                         type:"POST",dataType:"json",data:{id:id},
    //                         url:site_url+'inhouse/do_verify_deposit_break',
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
    //         } else if (status=='3') {
    //             Template.WarningAlert('Akun sudah diverifikasi');
    //         } else {
    //             Template.WarningAlert('Status belum diubah');
    //         }
    //     } else {
    //         Template.WarningAlert('Please select a row.');
    //     }
    // })

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

    $('#btn_change_status').click(function(e){
        id = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (id) {
            $('#id','#modal_change_status').val(id);
            $('#date','#modal_change_status').val('');
        } else {
            Template.WarningAlert('Please select a Row!');
            return false;
        }
    })

    $('#change_status').click(function(){
        var id = $('#id','#modal_change_status').val();
        var date = $('#date','#modal_change_status').val();
        var bValid = true;

        if (date=="") {
            bValid=false;
            $('#date','#modal_change_status').addClass('error');
        } else {
            $('#date','#modal_change_status').removeClass('error');
        }

        if (bValid==true) {
            $.ajax({
                type:"POST",dataType:"json",data:{
                    id:id,
                    date:date
                },
                url:site_url+'inhouse/deposit_break_change_status',
                success: function(response) {
                    if (response.success==true) {
                        $.alert({
                            title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                            content:'Status Successfuly Changed.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#modal_change_status').modal('hide')
                            }
                        })
                    } else {
                        Template.WarningAlert('Failed to connect into databases. please check your internet or contact your administrator.');
                    }
                },
                error: function() {
                    Template.WarningAlert('Internal Server Error!');
                }
            })
        } else {
            Template.WarningAlert('You have some form errors. Please check again.');
        }
    });

});