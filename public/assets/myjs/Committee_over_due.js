$(function () {

    var FormAdd = $('#FormAdd'), FormEdit = $('#FormEdit'), FormReas = $('#modal_assignment');

    /*
    | BEGIN GRID
    */
    $("#jqgrid_data").jqGrid({
        url: site_url + '/Assignment/jqgrid_committee_over_due',
        mtype: "GET",
        datatype: "json",
        postData: {
            tipe_keyword: function () { return $("#tipe_keyword").val() },
            keyword: function () { return $("#keyword").val() }
        },
        colModel: [

            { label: 'ID', name: 'id', key: true, width: 80, align: 'center', hidden: true },
            { label: 'Assignment ID', name: 'assignment_id', align: "center", width: 100, hidden: true },
            { label: 'Committe ID', name: 'committee_id', width: 250, hidden: true },
            { label: 'Committe', name: 'committee_name', width: 250 },
            { label: 'Certificant', name: 'certificant_name', width: 250 },
            { label: 'Assignment Date', name: 'assignment_date', width: 150, align: 'center' },
            { label: 'Due Date', name: 'fisnish_date', width: 150, align: 'center' },
            { label: 'Balance', name: 'balance', width: 150, align: 'center', hidden: true }

        ],
        viewrecords: true,
        width: 1098,
        height: 250,
        rowNum: 50,
        rownumbers: true,
        shrinkToFit: false,
        toolbar: [true, "top"],
        sortname: "x.id",
        sortorder: "asc",
        multiselect: false,
        pager: "#jqgrid_data_pager",
        altRows: true,
        altclass: "ui - priority - secondary",

        gridComplete: function () {

            var rows = $("#jqgrid_data").getDataIDs();
            for (var i = 0; i < rows.length; i++) {
                var balance = $("#jqgrid_data").getCell(rows[i], "balance");
                if (balance > 3) {
                    $("#jqgrid_data").jqGrid('setRowData', rows[i], false, { color: 'black', weightfont: 'bold', background: 'lightgreen' });
                    //$("#jqgrid_data").jqGrid('setRowData', rows[i], false, { color: 'red', weightfont: 'bold' });
                } else if (balance < 0) {
                    $("#jqgrid_data").jqGrid('setRowData', rows[i], false, { color: 'black', weightfont: 'bold', background: 'red' });
                } else if (balance == 0) {
                    $("#jqgrid_data").jqGrid('setRowData', rows[i], false, { color: 'black', weightfont: 'bold', background: 'orange' });
                } else if (balance > 0 && balance <= 3) {
                    $("#jqgrid_data").jqGrid('setRowData', rows[i], false, { color: 'black', weightfont: 'bold', background: 'yellow' });
                }
            }
        },

        ondblClickRow: function () {
            $('#btn_reassignment').click();
        }
    });

    $('#t_jqgrid_data').append('\
        <div style="position:absolute;"> \
            <a class="btn btn-warning btn-sm2" id="btn_reassignment"  title="Re-Assignmnent"><i class="fa fa-undo"></i> &nbspRe-Assignment</a> \
        </div> \
    ');

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

    $('#btn_reassignment').click(function () {
        selrow = $('#jqgrid_data').jqGrid('getGridParam', 'selrow');
        if (selrow) {
            var id = selrow;
            var data = $('#jqgrid_data').jqGrid('getRowData', id);
            var status = data.status2;
            var total_Score = data.total_Score;
            var assignment_id = data.assignment_id;
            var committee = data.committee_id;
            var start_date = data.assignment_date;
            var end_date = data.fisnish_date;
            var note = data.note;
            if (status != '1') {
                $('#id', FormReas).val(id);
                $('#assignment_id', FormReas).val(assignment_id);

                $('#committee_lama', FormReas).val(committee);
                $('#committee', FormReas).val(committee);
                $('#start_date', FormReas).val(start_date);
                $('#end_date', FormReas).val(end_date);
                $('#note', FormReas).val(note);
                $('#modal_assignment').modal('show');
            } else {
                Template.WarningAlert("Score sudah diverifikasi tidak bisa dire-assignment");
            }
        } else {
            Template.WarningAlert("Please select a row.");
        }
    });

    $('#btn_close', FormReas).click(function (e) {
        e.preventDefault();
        $('#FormAssignment').trigger('reset');
        $('#modal_assignment').modal('hide');
    });

    $('#btn_proses').click(function (e) {
        e.preventDefault();
        id = $('#id').val();
        committee = $('#committee').val();
        assignment_id = $('#assignment_id').val();
        committee_lama = $('#committee_lama').val();
        start_date = $('#start_date').val();
        end_date = $('#end_date').val();
        note = $('#note').val();

        $('#btn_proses').html('<i class="fa fa-spinner fa-spin"></i> &nbsp;Proccessing.....');
        $('#btn_proses').attr('disabled', true);
        $('#btn_close').attr('disabled', true);
        $('#alert_result').hide();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                id: id,
                assignment_id: assignment_id,
                committee_lama: committee_lama,
                committee: committee,
                start_date: start_date,
                end_date: end_date,
                note: note
            },
            url: site_url + '/Scoring/re_assignment',
            success: function (response) {
                if (response.success == true) {
                    $.alert({
                        title: 'Success', icon: 'fa fa-check', backgroundDismiss: false,
                        content: 'Proccess Re-Assignment Success.',
                        confirmButtonClass: 'btn green',
                        confirm: function () {
                            $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                            $('#btn_proses').removeAttr('disabled');
                            $('#btn_close').removeAttr('disabled');
                            $('#jqgrid_data').trigger('reloadGrid')
                            $('#modal_assignment').modal('hide');
                            FormReas.trigger('reset');
                            // window.location.reload();
                        }
                    });

                } else {
                    Template.WarningAlert(response.error);
                    $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                    $('#btn_proses').removeAttr('disabled');
                    $('#btn_close').removeAttr('disabled');
                    $('#modal_assignment').modal('hide');
                }
            },
            error: function () {
                Template.WarningAlert("Failed to Connect into Databases, Please Contact Your Administrator.")
                $('#btn_proses').html('<i class="fa fa-check"></i> &nbsp;Proccess');
                $('#btn_proses').removeAttr('disabled');
                $('#btn_close').removeAttr('disabled');
                $('#modal_assignment').modal('hide');

            }
        });


    });


})