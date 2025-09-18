// wrapper
var add = $('#add');
var edit = $('#edit');
var jqgrid = $('#jqgrid');
// form button
var add_submit = $('#btn_save',add);
var add_cancel =  $('#btn_cancel',add);
var edit_submit = $('#btn_save',edit);
var edit_cancel =  $('#btn_cancel',edit);
// form
var FormAdd = $('#FormAdd');
var FormEdit = $('#FormEdit');

var getNextDueDateDepositAccount = function(open_date,month,ele)
{
    if (open_date!="" && month!="") {
        $.ajax({
            type:"POST",dataType:"json",data:{
                open_date:open_date,month:month
            },
            url:site_url+'get/getNextDueDateDepositAccount',
            success:function(response){
                ele.val(Template.ToDatePicker(response.date));
            },
            error:function(){
                Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
            }
        })
    }
}

$(function(){

    $("#jqgrid_data").jqGrid({
        url: site_url+'/inhouse/jqgrid_deposit_account',
        mtype: "GET",
        datatype: "json",
        colModel: [
             { label: 'ID' , name: 'id', hidden:true, key:true, width: 80, align:'center' }
            ,{ label: 'Fund Groupp' , name: 'fund_group_name', width: 100, align:'left' }
            ,{ label: 'Bank Name' , name: 'bank_name', width: 150, align:'left' }
            ,{ label: 'Account Number' , name: 'account_number', width: 150, align:'left' }
            ,{ label: 'Open Date' , name: 'open_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'} }
            ,{ label: 'Last Due Date' , name: 'last_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Next Due Date' , name: 'next_due_date', width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:false }
            ,{ label: 'Profit Return Rasio' , name: 'profit_return_rasio', width: 100, align:'left', hidden:true }
            ,{ label: 'Last Yield' , name: 'last_yield', width: 100, align:'left', hidden:true }
            ,{ label: 'Return Last Due Date' , name: 'return_last_due_date', hidden:true, width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Return Next Due Date' , name: 'return_next_due_date', hidden:false, width: 100, align:'center',formatter:'date', formatoptions: {srcformat:'Y-m-d',newformat:'d/m/Y'}, hidden:true }
            ,{ label: 'Amount' , name: 'amount', width: 100, align:'right', hidden:false, formatter:'currency', formatoptions: { decimalSeparator:'.',thousandsSeparator:',',decimalPlaces:'2',defaultValue:'0' } }
            ,{ label: 'Deposit Term' , name: 'deposit_term', width: 100, align:'left', hidden:true }
            ,{ label: 'Payment Return Mode' , name: 'payment_return_mode', width: 100, align:'left', hidden:true }
            ,{ label: 'Account for Return' , name: 'account_for_return', width: 100, align:'left', hidden:true }
            ,{ label: 'Account for Principal' , name: 'account_for_principal', width: 100, align:'left', hidden:true }
            ,{ label: 'Flag ARO' , name: 'aro_flag', width: 100, align:'center' , formatter:function(cellvalue){
                switch(cellvalue){
                    case"0":
                    return "Non ARO";
                    break;
                    case"1":
                    return "ARO";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            }}
            ,{ label: 'Flag Profile Sharing' , name: 'profit_sharing_flag', width: 100, align:'left', hidden:true }
            ,{ label: 'Created Stamp' , name: 'created_stamp', width: 100, align:'left', hidden:true }
            ,{ label: 'Status' , name: 'status', width: 150, align:'center', formatter:function(cellvalue){
                switch(cellvalue) {
                    case"0":
                    return "<label class='label label-sm label-danger'>Unverified</label>";
                    break;
                    case"1":
                    return "<label class='label label-sm label-info'>Verified</label>";
                    break;
                    default:
                    return cellvalue;
                    break;
                }
            } }
            ,{ name: 'v_status', hidden:true }
            ,{ label: 'Action', align:'center', width:80, formatter:function(cellvalue,rowObj,rowArray) {
                var row_id=rowObj.rowId;
                var status=rowArray[19];
                var no_surat=rowArray[21];
                var tgl_surat=rowArray[22];

                var url = site_url+'pdf/surat_deposit_placement/'+row_id;

                switch(status){
                    case "1":
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
            ,{ name: 'no_surat_placement', hidden:true }
            ,{ name: 'tgl_surat_placement', hidden:true }
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

    })
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
                },url:site_url+'inhouse/update_deposit_account_print_placement',
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
    })

    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-info btn-sm2" id="btn_add"><i class="fa fa-add"></i> Add</a> \
    <a class="btn btn-success btn-sm2" id="btn_edit"><i class="fa fa-edit"></i> Edit</a> \
    <a class="btn btn-danger btn-sm2" id="btn_delete"><i class="fa fa-remove"></i> Hapus</a> \
    </div> \
    ');

    // grid button
    var grid_add = $('#btn_add',jqgrid);
    var grid_edit = $('#btn_edit',jqgrid);
    var grid_delete = $('#btn_delete',jqgrid);
    var grid_verify = $('#btn_verify',jqgrid);

    // begin event button click
    add_cancel.click(function(){
        add.hide();
        jqgrid.show();
        edit.hide();
    })
    edit_cancel.click(function(){
        edit.hide();
        jqgrid.show();
        add.hide();
    })
    grid_add.click(function(){
        add.show();
        jqgrid.hide();
        edit.hide();
    })
    grid_verify.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='0') {
                $.confirm({
                    title:"Verify",icon:'fa fa-check',backgroundDismiss:false,
                    content:'Verify Status? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/verify_deposit_account',
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
            } else {
                Template.WarningAlert('Akun sudah diverifikasi');
            }
        } else {
            Template.WarningAlert('Please select a row.');
        }
    })
    grid_delete.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='0') {
                $.confirm({
                    title:"Delete",icon:'fa fa-trash',backgroundDismiss:false,
                    content:'Delete Deposit Account? Are You Sure?',
                    confirmButtonClass:'btn green',
                    cancelButtonClass:'btn red',
                    confirm:function(){
                        $.ajax({
                            type:"POST",dataType:"json",data:{id:id},
                            url:site_url+'inhouse/delete_deposit_account',
                            success:function(response){
                                if(response.success==true){
                                    $.alert({
                                        title:'Success',icon:'fa fa-check',backgroundDismiss:false,
                                        content:'Delete Success.',
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
            } else {
                Template.WarningAlert('Tidak bisa Menghapus, Status sudah diverifikasi');
            }
        } else {
            Template.WarningAlert('Please select a row.');
        }
    })
    grid_edit.click(function(){
        selrow = $('#jqgrid_data').jqGrid('getGridParam','selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData',id);
            var status = data.v_status;
            if (status=='0') {
                edit.show();
                jqgrid.hide();
                add.hide();
                $.ajax({
                    type:"POST",dataType:"json",data:{id:id},
                    url:site_url+'inhouse/get_deposit_account_by_id',
                    success:function(response){
                        if (response.edit_is_avaible==true) {
                            $('#id',FormEdit).val(response.id);
                            $('#fund_group_code',FormEdit).val(response.fund_group_code).trigger('change');
                            $('#bank_code',FormEdit).val(response.bank_code).trigger('chosen:updated');

                            // condition for sharia_flag
                            sharia_flag = response.sharia_flag;
                            profit_return_rasio=$('#profit_return_rasio',edit).closest('.form-group');
                            profit_return_rasio1=$('#profit_return_rasio',edit);
                            last_yield=$('#last_yield',edit).closest('.form-group');
                            last_yield1=$('#last_yield',edit);        
                            
                            if (sharia_flag==3) { // when conventional
                                profit_return_rasio.hide();
                                profit_return_rasio1.val(0);
                                // last_yield.show();
                                // last_yield1.val(0);
                                last_yield.find('.control-label').html('Interest Rate');
                            } else { // when is syariah
                                profit_return_rasio.show();
                                // last_yield.hide();
                                // last_yield1.val(0);
                                last_yield.find('.control-label').html('Indicative Rate');
                            }
                            // //condition for sharia_flag

                            $('#branch_name',FormEdit).val(response.branch_name);
                            $('#bilyet_number',FormEdit).val(response.bilyet_number);
                            $('#account_number',FormEdit).val(response.account_number);
                            $('#account_name',FormEdit).val(response.account_name);
                            $('#open_date1',FormEdit).val(Template.ToDatePicker(response.open_date));
                            $('#deposit_term',FormEdit).val(response.deposit_term);
                            $('#aro_flag',FormEdit).val(response.aro_flag);
                            $('#next_due_date',FormEdit).val(Template.ToDatePicker(response.next_due_date));
                            $('#profit_return_rasio',FormEdit).val(response.profit_return_rasio);
                            $('#last_yield',FormEdit).val(response.last_yield);
                            // $('#return_last_due_date',FormEdit).val(Template.ToDatePicker(response.return_last_due_date));
                            // $('#return_next_due_date',FormEdit).val(Template.ToDatePicker(response.return_next_due_date));
                            $('#amount',FormEdit).val(response.amount);
                            $('#account_for_return',FormEdit).val(response.account_for_return);
                            $('#account_for_principal',FormEdit).val(response.account_for_principal);
                            $('#currency',FormEdit).val(response.currency);
                            // $('#maturity_date',FormEdit).val(Template.ToDatePicker(response.maturity_date));
                            // $('#break_date',FormEdit).val(Template.ToDatePicker(response.break_date));
                            $('#profit_sharing_flag',FormEdit).val(response.profit_sharing_flag);
                        } else {
                            Template.WarningAlert('Tidak bisa Mengubah data, Status sudah diverifikasi');
                            edit.hide();
                            jqgrid.show();
                            add.hide();
                        }
                    },
                    error:function(){
                        Template.WarningAlert('Failed to connect into Databases. Please Contact Your Administrator!');
                    }
                })
            } else {
                Template.WarningAlert('Tidak bisa Mengubah data, Status sudah diverifikasi');
            }
        } else {
            Template.WarningAlert('Please select a row.');
        }
    });
    
    $('#open_date',add).blur(function(){
        open_date = $('#open_date',add).val();
        deposit_term = $('#deposit_term',add).val();
        getNextDueDateDepositAccount(open_date,deposit_term,$('#next_due_date',add));
    })
    
    $('#open_date,#deposit_term',add).change(function(){
        open_date = $('#open_date',add).val();
        deposit_term = $('#deposit_term',add).val();
        getNextDueDateDepositAccount(open_date,deposit_term,$('#next_due_date',add));
    })
    
    $('#deposit_term',add).change(function(){
        flag=$(this).find('option:selected').data('flag');
        $('#deposit_term_flag',add).val(flag);
    })

    $('#open_date',edit).blur(function(){
        open_date = $('#open_date',edit).val();
        deposit_term = $('#deposit_term',edit).val();
        getNextDueDateDepositAccount(open_date,deposit_term,$('#next_due_date',edit));
    })

    $('#open_date,#deposit_term',edit).change(function(){
        open_date = $('#open_date',edit).val();
        deposit_term = $('#deposit_term',edit).val();
        getNextDueDateDepositAccount(open_date,deposit_term,$('#next_due_date',edit));
    })
    
    $('#deposit_term',edit).change(function(){
        flag=$(this).find('option:selected').data('flag');
        $('#deposit_term_flag',edit).val(flag);
    })

    $('#bank_code',add).change(function(){
        sharia_flag=$(this).find('option:selected').data('sharia_flag');
        profit_return_rasio=$('#profit_return_rasio',add).closest('.form-group');
        profit_return_rasio1=$('#profit_return_rasio',add);
        last_yield=$('#last_yield',add).closest('.form-group');
        last_yield1=$('#last_yield',add);

        // if (sharia_flag!=3) {
        //     profit_return_rasio.hide();
        //     profit_return_rasio1.val(0);
        //     last_yield.show();
        // } else {
        //     profit_return_rasio.show();
        //     last_yield.hide();
        //     last_yield1.val(0);
        // }
        
        if (sharia_flag==3) { // when is konventional
            profit_return_rasio.hide();
            profit_return_rasio1.val(0);
            last_yield1.val(0);
            last_yield.find('.control-label').html('Interest Rate');
        } else { // when is syariah
            profit_return_rasio.show();
            // last_yield.hide();
            last_yield1.val(0);
            last_yield.find('.control-label').html('Indicative Rate');
        }
    })

    $('#bank_code',edit).change(function(){
        sharia_flag=$(this).find('option:selected').data('sharia_flag');
        profit_return_rasio=$('#profit_return_rasio',edit).closest('.form-group');
        profit_return_rasio1=$('#profit_return_rasio',edit);
        last_yield=$('#last_yield',edit).closest('.form-group');
        last_yield1=$('#last_yield',edit);        
        
        if (sharia_flag==3) { // when is konventional
            profit_return_rasio.hide();
            profit_return_rasio1.val(0);
            // last_yield1.val(0);
            last_yield.find('.control-label').html('Interest Rate');
        } else { // when is syariah
            profit_return_rasio.show();
            // last_yield.hide();
            // last_yield1.val(0);
            last_yield.find('.control-label').html('Indicative Rate');
        }
    })


    // end event button click
    FormAdd.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        errorPlacement: function(a,b){},
        // ignore: "",
        rules: {
            fund_group_code: {required:true}
            ,bank_code: {required:true}
            ,branch_name: {required:true}
            ,bilyet_number: {required:true}
            ,account_number: {required:true}
            ,account_name: {required:true}
            ,open_date: {required:true}
            ,last_due_date: {required:true}
            ,next_due_date: {required:true}
            ,profit_return_rasio: {required:true}
            ,last_yield: {required:true}
            // ,return_last_due_date: {required:true}
            // ,return_next_due_date: {required:true}
            ,amount: {required:true}
            ,deposit_term: {required:true}
            ,payment_return_mode: {required:true}
            ,account_for_return: {required:true}
            ,account_for_principal: {required:true}
            ,currency: {required:true}
            // ,maturity_date: {required:true}
            // ,break_date: {required:true}
            ,aro_flag: {required:true}
            ,profit_sharing_flag: {required:true}
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
                            content:'Add Success.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('.alert-error',FormAdd).hide();
                                add_cancel.trigger('click');
                                $('#jqgrid_data').trigger('reloadGrid')
                                $('#bank_code',FormAdd).val('').trigger('chosen:updated');
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

    FormEdit.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        errorPlacement: function(a,b){},
        // ignore: "",
        rules: {
            fund_group_code: {required:true}
            ,bank_code: {required:true}
            ,branch_name: {required:true}
            ,bilyet_number: {required:true}
            ,account_number: {required:true}
            ,account_name: {required:true}
            ,open_date: {required:true}
            ,last_due_date: {required:true}
            ,next_due_date: {required:true}
            ,profit_return_rasio: {required:true}
            ,last_yield: {required:true}
            // ,return_last_due_date: {required:true}
            // ,return_next_due_date: {required:true}
            ,amount: {required:true}
            ,deposit_term: {required:true}
            ,payment_return_mode: {required:true}
            ,account_for_return: {required:true}
            ,account_for_principal: {required:true}
            ,currency: {required:true}
            // ,maturity_date: {required:true}
            // ,break_date: {required:true}
            ,aro_flag: {required:true}
            ,profit_sharing_flag: {required:true}
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
                            content:'Edit Success.',
                            confirmButtonClass:'btn-success',
                            confirm:function(){
                                $('.alert-error',FormEdit).hide();
                                $('#btn_cancel',FormEdit).trigger('click');
                                $('#jqgrid_data').trigger('reloadGrid')
                                $('#bank_code',FormEdit).val('').trigger('chosen:updated');
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
    | even get current account / Current account by fund_code
    | @form : add
    */
    $('#fund_group_code',add).change(function(){
        fund_code=$(this).val();
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code
            },url:site_url+'inhouse/get_current_account_number_by_fund_code',
            success:function(response){
                option = '<option value="">Please Select</option>';
                for ( i in response ) {
                    option += '<option value="'+response[i].account_number+'">'+response[i].account_number+' - '+response[i].bank_name+' - '+response[i].branch_name+'</option>';
                }
                $('#account_for_return',add).html(option)
                $('#account_for_principal',add).html(option)
            }
        })
    })

    /*
    | even get current account / Current account by fund_code
    | @form : edit
    */
    $('#fund_group_code',edit).change(function(){
        fund_code=$(this).val();
        $.ajax({
            type:"POST",dataType:"json",data:{
                fund_code:fund_code
            },url:site_url+'inhouse/get_current_account_number_by_fund_code',
            async:false,
            success:function(response){
                option = '<option value="">Please Select</option>';
                for ( i in response ) {
                    option += '<option value="'+response[i].account_number+'">'+response[i].account_number+' - '+response[i].bank_name+' - '+response[i].branch_name+'</option>';
                }
                $('#account_for_return',edit).html(option)
                $('#account_for_principal',edit).html(option)
            }
        })
    })

})