$(function () {

  /*DECLARE VARIABLE*/
  var form_add = $("#form_add");
  var form_edit = $("#form_edit");
  var add_alert_error = $(".alert-error", "#add");
  var edit_alert_error = $(".alert-error", "#edit");

  $("#jqGrid_role").jqGrid({
    url: site_url + '/settings/jqgrid_data_role',
    mtype: "GET",
    datatype: "json",
    postData: {
      tipe_keyword: function () { return $("#tipe_keyword").val() },
      keyword: function () { return $("#keyword").val() }
    },
    colModel: [
      { label: 'ROLE ID', name: 'role_id', key: true, width: 100 },
      { label: 'Role Name', name: 'role_name', width: 150 },
      { label: 'Description', name: 'role_desc', width: 150 }
    ],
    viewrecords: true,
    autowidth: true,
    height: 250,
    rowNum: 100,
    rowList: [100, 200, 300],
    rownumbers: true,
    shrinkToFit: false,
    toolbar: [true, "top"],
    sortname: "role_id",
    sortorder: "asc",
    multiselect: false,
    pager: "#jqGridPager_role",
    ondblClickRow: function () {
      $('#btn_edit').click();
    }
  });

  $("#t_jqGrid_role").append('<button class="jqGrid_add" id="btn_add"></button> <button class="jqGrid_edit" id="btn_edit"></button> <button class="jqGrid_delete" id="btn_delete"></button> <button class="jqGrid_makeactive" id="btn_edit_priviledge"></button>');

  /*BEGIN SEARCH*/
  $("#btn_search").click(function (e) {
    e.preventDefault();
    $("#jqGrid_role").trigger('reloadGrid');
  });
  $("#keyword").keydown(function (e) {
    if (e.keyCode == 13) {
      $("#jqGrid_role").trigger('reloadGrid');
    }
  });
  /*END SEARCH*/

  /*SETUP BUTTON ACTIONS*/
  $("#btn_add").click(function () {
    form_add.trigger('reset');
    $("#setup").hide();
    $("#add").show();
    add_alert_error.hide();
    form_add.find('.error,.success').removeClass('error').removeClass('success');
  });
  $("#btn_edit").click(function () {
    selrow = $("#jqGrid_role").jqGrid('getGridParam', 'selrow');
    data = $("#jqGrid_role").jqGrid('getRowData', selrow);
    role_id = data.role_id;
    if (selrow) {

      /*SHOW EDIT FORM & HIDE DATA GRID*/
      $("#setup").hide();
      $("#edit").show();
      edit_alert_error.hide();
      form_edit.find('.error,.success').removeClass('error').removeClass('success');

      /* LOAD DATA FOR EDIT FORM */
      $.ajax({
        type: "POST",
        dataType: "json",
        data: { role_id: role_id },
        url: site_url + '/settings/get_data_role_by_id',
        success: function (response) {
          $("#role_id", form_edit).val(response.role_id);
          $("#role_name", form_edit).val(response.role_name);
          $("#role_desc", form_edit).val(response.role_desc);
        }
      })

    } else {
      alert("Please select a Row");
    }

  });
  $("#btn_delete").click(function () {
    selrow = $("#jqGrid_role").jqGrid('getGridParam', 'selrow');
    data = $("#jqGrid_role").jqGrid('getRowData', selrow);
    role_id = data.role_id;
    if (selrow) {
      var conf = confirm("Apakah anda Yakin akan menghapus role ini?");
      if (conf) {
        $.ajax({
          type: "POST",
          dataType: "json",
          data: { role_id: role_id },
          url: site_url + '/settings/delete_role',
          success: function (response) {
            if (response.success === true) {
              alert("Successfuly Delete Role!");
              $("#jqGrid_role").trigger('reloadGrid');
            } else {
              alert("Failed to Connect into Database, Please Contact Your Administrator!")
            }
          },
          error: function () {
            alert("Failed to Connect into Database, Please Contact Your Administrator!")
          }
        })
      }
    } else {
      alert("Please select a Row");
    }
  });
  /*FORM ACTIONS*/
  /*BEGIN ADD*/
  form_add.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function (a, b) { },
    // ignore: "",
    rules: {
      role_name: { required: true }
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
      add_alert_error.show();
      Template.scrollTo(add_alert_error, -200);
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
      $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
      console.log(form);
      $.ajax({
        type: "POST",
        dataType: "json",
        data: $(form).serialize(),
        url: site_url + "/settings/add_role",
        success: function (response) {
          if (response.success === true) {
            alert("Successfuly Add Role!");
            add_alert_error.hide();
            $(form).trigger('reset');
            $("#setup").show();
            $("#add").hide();
            $("#jqGrid_role").trigger('reloadGrid');
          } else {
            alert("Failed to Connect into Database, Please Contact Your Administrator!")
          }
        },
        error: function () {
          alert("Failed to Connect into Database, Please Contact Your Administrator!")
        }
      })
    }
  });
  $("#btn_cancel", "#add").click(function (e) {
    e.preventDefault();
    form_add.trigger('reset');
    $("#setup").show();
    $("#add").hide();
  });
  /*END ADD*/

  /*BEGIN EDIT*/
  form_edit.validate({
    errorElement: 'span', //default input error message container
    errorClass: 'help-inline', // default input error message class
    focusInvalid: false, // do not focus the last invalid input
    errorPlacement: function (a, b) { },
    // ignore: "",
    rules: {
      role_name: { required: true }
    },
    invalidHandler: function (event, validator) { //display error alert on form submit              
      edit_alert_error.show();
      Template.scrollTo(edit_alert_error, -200);
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').removeClass('success').addClass('error'); // set error class to the control group
    },
    unhighlight: function (element) { // revert the change dony by hightlight
      $(element).closest('.form-group').removeClass('error'); // set error class to the control group
    },
    submitHandler: function (form) {
      console.log(form);
      $.ajax({
        type: "POST",
        dataType: "json",
        data: $(form).serialize(),
        url: site_url + "/settings/edit_role",
        success: function (response) {
          if (response.success === true) {
            alert("Successfuly Edit Role!");
            edit_alert_error.hide();
            $(form).trigger('reset');
            $("#setup").show();
            $("#edit").hide();
            $("#jqGrid_role").trigger('reloadGrid');
          } else {
            alert("Failed to Connect into Database, Please Contact Your Administrator!")
          }
        },
        error: function () {
          alert("Failed to Connect into Database, Please Contact Your Administrator!")
        }
      })
    }
  });
  $("#btn_cancel", "#edit").click(function (e) {
    e.preventDefault();
    form_add.trigger('reset');
    $("#setup").show();
    $("#edit").hide();
  });
  /*END EDIT*/

  /*BEGIN EDIT ROLE PRIVILEDGE*/

  var form3 = $('#form_edit_role_priviledge');
  var error3 = $('.alert-error', form3);

  // event button Edit Priviledge ketika di tekan
  $("#btn_edit_priviledge").click(function () {
    $("#setup").hide();
    $("#edit_role_priviledge").show();
    selrow = $("#jqGrid_role").jqGrid('getGridParam', 'selrow');
    data = $("#jqGrid_role").jqGrid('getRowData', selrow);
    role_id = data.role_id;
    if (selrow) {
      $.ajax({
        type: "POST",
        dataType: "html",
        data: { role_id: role_id },
        url: site_url + "/settings/get_menu_by_role",
        success: function (response) {
          $("input[name='role_id']", form3).val(role_id);
          $("#menu-role", form3).html(response);
        }
      });
    } else {
      alert("Please select a Row!");
    }
  });

  // event untuk kembali ke tampilan data table (EDIT FORM)
  $("#cancel", form3).livequery('click', function () {
    $("#edit_role_priviledge").hide();
    $("#setup").show();
  });

  $("#menu-role input#parent", form3).livequery('click', function () {
    if ($(this).is(':checked') == true) {
      $(this).parent().find('input[type="checkbox"]').prop('checked', true);
    } else {
      $(this).parent().find('input[type="checkbox"]').prop('checked', false);
    }
  });

  $("#menu-role input#child", form3).livequery('click', function () {
    if ($(this).is(':checked') == true) {
      $(this).parent().find('input#grandchild').prop('checked', true);
    } else {
      $(this).parent().find('input#grandchild').prop('checked', false);
    }
  });

  $("#menu-role input#grandchild", form3).livequery('click', function () {
    if ($(this).is(':checked') == true) {
      $(this).parent().parent().parent().find('input#child').prop('checked', true);
      $(this).parent().parent().parent().parent().parent().find('input#parent').prop('checked', true);
    } else {
      if ($(this).parent().parent().find('input#grandchild:checked').length == 0) {
        $(this).parent().parent().parent().find('input#child').prop('checked', false);
        $(this).parent().parent().parent().parent().parent().find('input#parent').prop('checked', false);
      }
    }
  });

  $("#menu-role input#child", form3).livequery('click', function () {
    if ($(this).is(':checked') == true) {
      $(this).parent().parent().parent().find('input#parent').prop('checked', true);
    } else {
      if ($(this).parent().parent().find('input#child:checked').length == 0) {
        $(this).parent().parent().parent().find('input#parent').prop('checked', false);
      }
    }
  });

  $(form3).submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: site_url + "/settings/edit_role_priviledge",
      dataType: "json",
      data: form3.serialize(),
      success: function (response) {
        if (response.success == true) {
          error3.hide();
          alert("Save Successfuly!");
          $("#setup").show();
          $("#edit_role_priviledge").hide();
          $("#jqGrid_role").trigger('reloadGrid');
        } else {
          error3.show();
        }
      },
      error: function () {
        error3.show();
      }
    })
  });

  //select all
  $("#select_all").livequery('click', function () {
    if ($(this).is(':checked') == true) {
      $("#menu-role input[type='checkbox']").prop('checked', true);
    }
    else {
      $("#menu-role input[type='checkbox']").prop('checked', false);
    }
  })
  /*END EDIT ROLE PRIVILEDGE*/

});