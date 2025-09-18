$(function () {

    /*DECLARE VARIABLE*/
    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit');

    $("#jqgrid_data").jqGrid({
        url: site_url + '/Settings/jqgrid_news_front_end',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },

        colModel: [
            { label: 'ID', name: 'id', key: true, width: 100, hidden: true },
            { label: 'News Title', name: 'news_title', width: 350 },
            //  { label: 'News Content', name: 'news_content', width: 350 },
            { label: 'News Date', name: 'news_date', width: 250 ,align:'center'},
            {
                label: 'Showed', name: 'showed', width: 100, align: 'center', formatter: function (cellvalue) {
                    switch (cellvalue) {
                        case "1":
                            return 'Yes';
                            break;
                        case "0":
                            return 'No';
                            break;
                        default:
                            return cellvalue;
                            break;
                    }
                }
            },
            {
                label: 'Action', align: 'center', width: 150, formatter: function (cellvalue, rowObj, rowArray) {
                    var row_id = rowObj.rowId;
                    var url = site_url + '/Settings/edit_front_end_news_form/' + row_id;
                    edit_button = '<a href="' + url + '" \
                    class="btn btn-warning btn-sm2" \
                    style="margin:5px 0;" \
                   ><i class="fa fa-edit"></i> Edit</a>';

                    delete_button = '<a href="' + url + '" \
                    id="btn_delete" \
                   class="btn btn-danger btn-sm2" \
                   style="margin:5px 0;" \
                   data-id="'+ row_id + '" \
                  ><i class="fa fa-trash"></i> Delete</a>';


                    return edit_button + ' ' + delete_button;
                }
            }

        ],
        viewrecords: true,
        autowidth: true,
        //width: 1098,
        height: 250,
        rowNum: 100,
        rowList: [100, 200, 300],
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "news_title",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager",
        ondblClickRow: function () {
            $('#btn_edit').click();
        }
    });


    $('#t_jqgrid_data').append('\
    <div style="position:absolute;"> \
    <a class="btn btn-info btn-sm2" id="btn_add"><i class="fa fa-plus"></i> Add</a> \
    </div> \
    ');
    /*BEGIN SEARCH*/
    $('#btn_search', '#jqgrid').click(function (e) {
        e.preventDefault();
        $('#jqgrid_data').trigger('reloadGrid');
        $('#msgerror1', '#jqgrid').hide();
        $('#msgerror2', '#jqgrid').hide();

    })

    $("#keyword").keydown(function (e) {
        if (e.keyCode == 13) {
            $("#jqGrid_data").trigger('reloadGrid');
            $('#msgerror1', '#jqgrid').hide();
            $('#msgerror2', '#jqgrid').hide();

        }
    });


    /*SETUP BUTTON ACTIONS*/
    $("#btn_add").click(function () {
        $('#jqgrid').hide();
        $('#add').show();
        FormAdd.trigger('reset');
        $('#msgerror1', '#jqgrid').hide();
        $('#msgerror2', '#jqgrid').hide();

    });

    $('a#btn_delete').livequery('click', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.confirm({
            title: "Delete", icon: 'fa fa-trash', backgroundDismiss: false,
            content: 'Delete News ? Are You Sure?',
            confirmButtonClass: 'btn green',
            cancelButtonClass: 'btn red',
            confirm: function () {
                $.ajax({
                    type: "POST", dataType: "json", data: { id: id },
                    url: site_url + '/Settings/delete_news_front_end',
                    success: function (response) {
                        if (response.success === true) {
                            $.alert({
                                title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                                content: 'Delete News Success.',
                                confirmButtonClass: 'btn green',
                                confirm: function () {
                                    $('#userfile').val('');
                                    $('#jqgrid_data').trigger('reloadGrid');
                                    $('#msgerror1', '#jqgrid').hide();
                                    $('#msgerror2', '#jqgrid').hide();

                                }
                            })
                        } else {
                            Template.WarningAlert(response.msg);
                        }
                    },
                    error: function () {
                        Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                    }
                })
            }
        })
    });



    /*FORM ACTIONS*/
    /*BEGIN ADD*/
    FormAdd.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'invalid-feedback', // default input error message class
        focusInvalid: true, // do not focus the last invalid input
        errorPlacement: function (error, element) {
            if (element.prop('class') === 'form-control single-select') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        ignore: "",
        rules: {
            news_title: { required: true },
            news_content: { required: true },
            showed: { required: true }

        },

        invalidHandler: function (event, validator) { //display error alert on form submit              
            $('.alert-error', FormAdd).show();
            Template.scrollTo($('.alert-error', FormAdd), -200);
        },
        highlight: function (element) { // hightlight error inputs
            $(element).removeClass('is-valid').addClass('is-invalid'); // set is-invalid class to the control group
        },
        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).removeClass('is-invalid').addClass('is-valid'); // set error class to the control group
        },
        submitHandler: function (form) {

            FormAdd.ajaxSubmit({
                dataType: 'json',
                success: function (response) {
                    if (response.success == true) {
                        $.alert({
                            title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                            content: 'Add News Success.',
                            confirmButtonClass: 'btn-success',
                            confirm: function () {
                                $('.alert-error', FormAdd).hide();
                                $('#jqgrid_data').trigger('reloadGrid');
                                $('#btn_cancel', FormAdd).trigger('click');
                                var class_a = $(".form-control");
                                for (var i = 0; i < class_a.length; i++) {
                                    class_a[i].classList.remove("is-valid");
                                }
                            }
                        })
                    } else {
                        Template.WarningAlert(response.error);
                    }
                },
                error: function () {
                    Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator!");
                }
            });
        }
    });

    $('#btn_cancel', FormAdd).click(function () {
        $('#add').hide();
        $('#jqgrid').show();
        $('.alert-error', FormAdd).hide();
        FormAdd.trigger('reset');
        $('.error', FormAdd).removeClass('error');
        var class_a = $(".form-control");
        for (var i = 0; i < class_a.length; i++) {
            class_a[i].classList.remove("is-valid");
        }
    })

    $('#news_image', FormAdd).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview');

            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    $('#news_image3', FormEdit).change(function (e) {
        e.preventDefault();
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById('btn_preview');

            output.href = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });






}); //end of $(function(){});