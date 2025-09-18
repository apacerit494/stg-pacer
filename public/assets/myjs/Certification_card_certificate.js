$(document).ready(function () {


    /*DECLARE VARIABLE*/
    var FormUpload = $('#FormUpload');


    $("#jqgrid_data").jqGrid({
        url: site_url + '/DownloadBerkas/jqgrid_certification_card_certificate',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [
            { label: 'ID', name: 'certification_id', key: true, width: 100, align: 'center', hidden: true },
            { label: 'User Id', name: 'user_id', width: 150, align: 'center', search: true, searchoptions: { sopt: ['cn'] }, hidden: true },
            { label: 'Full Name', name: 'full_name', width: 150, align: 'left' },
            { label: 'Certification Number', name: 'certification_number', width: 150, align: 'center' },
            { label: 'SK Number', name: 'sk_number', width: 120, align: 'center' },
            { label: 'Card', name: 'certification_card_path', width: 120, align: 'left', hidden: true },
            { label: 'Certificate', name: 'certification_certificate_path', width: 120, align: 'left', hidden: true },
            {
                label: 'Action', name: 'status_id', width: 280, align: 'left', formatter: function (cellvalue, rowObj, rowArray) {
                    var row_id = rowObj.rowId;

                    var testing = cellvalue.split(";");
                    var certification_id = testing[0];
                    var certification_card_path = testing[1];
                    var certification_certificate_path = testing[2];
                    //var user_type_id = testing[3];

                    download_card_button = '<a href="' + site_url + '/pdf/print_card/' + row_id + '" \
                                    id="btn_download_card" \
                                    target="_blank" \
                                    title="Download Certification Card" \
                                    class="btn btn-success btn-sm2" \
                                    style="margin: 5px 0; " \
                            ><i class="fa fa-download"></i>  Download Card</a>';

                    if (certification_certificate_path !== '') {
                        download_certificate_button = '<a href="' + site_url + "/" + certification_certificate_path + '" \
                                    id="btn_download_card" \
                                    target="_blank" \
                                    title="Download Certification Certificate" \
                                    class="btn btn-warning btn-sm2" \
                                    style="margin:5px 0;" \
                            ><i class="fa fa-download"></i>  Download Certificate</a>';
                            
                            
                    } else {
                       download_certificate_button=''; 
                    }

                    var actions = download_card_button + ' ' + download_certificate_button;
                    return actions;
                }
            },
            {
                label: 'Action', name: 'upload', width: 200, align: 'center', hidden: user_type=='5' ? true : false, formatter: function (cellvalue, rowObj, rowArray) {
                    var row_id = rowObj.rowId;

                    var testing = cellvalue.split(";");
                    var certification_id = testing[0];
                    var certification_card_path = testing[1];
                    var certification_certificate_path = testing[2];
                    //var user_type_id = testing[3];
                    
                    if ( user_type !== '5' ) {
                            upload_certificate_button = '<a class="btn btn-danger btn-sm2" \
                                                    id="btn_upload" \
                                                    style = "margin:5px 0;" \
                                                    data-certification_id="'+ certification_id + '" \
                                                > <i class="fa fa-upload"></i>  &nbspUpload Certificate</a > ';
                                
                    } else {
                        upload_certificate_button='';
                    }

                    var actions =  upload_certificate_button;
                    return actions;
                }
            }

        ],
        viewrecords: true,
        autowidth: true,
        //width: 1068,
        height: 250,
        rowNum: 100,
        rowList: [100, 200, 300],
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "id",
        sortorder: "asc",
        caption: " &nbsp&nbsp&nbsp Certification Card & Certificate",
        multiselect: false,
        gridview: true,
        // loadonce: true,
        pager: "#jqgrid_data_pager",

        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    /*BEGIN SEARCH*/
    $('#btn_search', '#jqgrid').click(function (e) {
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
    })

    $("#keyword").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#jqGrid_data").trigger('reloadGrid');
        }
    });


    $('a#btn_upload').livequery('click', function (e) {
        e.preventDefault();

        //alert("halo");
        var certification_id = $(this).data('certification_id');
        //var certification_card_path = $(this).data('certification_card_path');
        //var certification_certificate_path = $(this).data('certification_certificate_path');

        $('#certification_id', FormUpload).val(certification_id);
        $('#modal_upload').modal('show');
    })


     
        
    /*FORM ACTIONS*/
    /*BEGIN ADD*/
    FormUpload.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        errorPlacement: function (error, element) {
            if (element.prop('class') === 'form-control single-select') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },

        ignore: "",
        rules: {
            fieldcode_code: { required: true },
            fieldcode_description: { required: true }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormUpload).show();
            Template.scrollTo($('.alert-error', FormUpload), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set error class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormUpload.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: response.msg,
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('#jqgrid_data').trigger('reloadGrid')
                                $('.grid-alert').html('');
                                FormUpload.trigger('reset');
                                $('#modal_upload').modal('hide');
                            }
                        })
                    } else {
                        Template.WarningAlert(response.msg);
                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    });




    $('#btn_export').click(function () {
        window.open(site_url + '/excel/export_report_gl_account_setup');
    });

    $('#btn_pdf').click(function () {
        window.open(site_url + '/pdf/pdf_gl_account_setup')
    });
    /*END EDIT*/



















}); //end of $(function(){});