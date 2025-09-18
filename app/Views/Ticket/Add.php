<!-- form ADD -->
<div class="card card-info" id="add" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">Add Complain / Appeal</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('Ticket/add_ticket') ?>">

            <?= csrf_field() ?>
            <div class="alert alert-error" style="display:none;">
                <!-- <button class="btn btn-success" data-dismiss="alert">X</button> -->
                <button class="close" data-dismiss="alert"></button>
                You have some form errors. Please check below.
            </div>
            <div class="form-body">
                <!-- Isi Data -->

                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Ticket Number</label>
                    <div class="col-sm-3">
                        <input type="text" name="ticket_num" id="ticket_num" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-group row" style="<?= (user()->user_type_id == '5' || user()->user_type_id == '4' || user()->user_type_id == '3') ? "display:none" : ""; ?>">
                    <label class=" col-sm-2 control-label" style="text-align:right">Certificant</label>
                    <div class="col-sm-3">
                        <select name="user_id" id="user_id" class="form-control chosen">
                            <option value="">Please Select</option>
                            <?php foreach ($users as $user) : ?>
                                <option value="<?= $user['id']; ?>"><?= $user['full_name']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Subject</label>
                    <div class="col-sm-3">
                        <input type="text" name="ticket_subject" id="ticket_subject" class="form-control">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Description</label>
                    <div class="col-sm-3">
                        <textarea name="description" id="description" class="form-control"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Priority</label>
                    <div class="col-sm-3">
                        <select name="priority" id="priority" class="form-control">
                            <?php foreach ($priorities as $priority) : ?>
                                <option value="<?= $priority['code_value']; ?>"><?= $priority['code_description']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Attachment</label>
                    <div class="col-sm-3">
                        <input type="file" name="attachment" id="attachment" class="form-control" accept=".pdf,image/*">
                    </div>
                    <div class="com-sm-2">
                        <a id="btn_preview" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                </div>
                <div class="form-group row" style="display:none ;">
                    <label class="col-sm-2 control-label" style="text-align:right">Status</label>
                    <div class="col-sm-3">
                        <select name="status" id="status" class="form-control">
                            <?php foreach ($statuss as $status) : ?>
                                <option value="<?= $status['code_value']; ?>"><?= $status['code_description']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <hr>
                <div class="form-actions">
                    <div class="form-group row">
                        <label class="col-md-2 control-label"></label>
                        <div class="col-md-4">
                            <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Submit</button>
                            <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- End of Data  -->
            </div>
        </form>


    </div>
    <!-- /.card-body -->

    <!-- /.card-footer -->

</div>
<!-- akhir form add -->