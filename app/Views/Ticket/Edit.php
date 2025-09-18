<!-- Awal form edit -->
<div class="card card-info" id="edit" style="display: none;">
    <div class="card-header">
        <h3 class="card-title">Edit Complain / Appeal</h3>
    </div>
    <!-- /.card-header -->
    <!-- form start -->

    <div class="card-body">
        <div class="form-body">
            <form class="form-horizontal" role="form" method="post" id="FormEdit" action="<?php echo site_url('Ticket/edit_ticket') ?>">
                <?= csrf_field() ?>
                <input type="hidden" id="id" name="id">
                <input type="hidden" id="full_name" name="full_name" value="<?= session('full_name'); ?>">
                <input type="hidden" id="account_name_parent" name="account_name_parent">
                <div class="alert alert-error" style="display:none;">
                    <button class="close" data-dismiss="alert"></button>
                    You have some form errors. Please check below.
                </div>

                <!-- Isi Data -->
                <div class="form-group row">
                    <label class="col-sm-2 control-label" style="text-align:right">Ticket Number</label>
                    <div class="col-sm-3">
                        <input type="text" name="ticket_num" id="ticket_num" class="form-control" readonly>
                    </div>
                </div>
                <div class="form-group row" style="<?= (user()->user_type_id == '5' || user()->user_type_id == '4' || user()->user_type_id == '3') ? "display:none" : ""; ?>">
                    <label class="col-sm-2 control-label" style="text-align:right">Certificant</label>
                    <div class="col-sm-3">
                        <select name="user_id2" id="user_id2" class="form-control chosen">
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
                        <a id="btn_preview2" class="btn btn-primary" href="javascript:" target="_blank">Preview</a>
                    </div>
                </div>

                <div class="form-group row" style="<?= (user()->user_type_id == '5' || user()->user_type_id == '4' || user()->user_type_id == '3') ? "display:none" : "" ?>">
                    <label class="col-sm-2 control-label" style="text-align:right">Status</label>
                    <div class="col-sm-3">
                        <select name="status" id="status" class="form-control">
                            <?php foreach ($statuss as $status) : ?>
                                <option value="<?= $status['code_value']; ?>"><?= $status['code_description']; ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-group row" style="display:none">
                    <label class="col-sm-2 control-label" style="text-align:right">Closed Date Ticket</label>
                    <div class="col-sm-3">
                        <input type="date" name="ticket_closeddate" id="ticket_closeddate" class="form-control">
                    </div>
                </div>
                <hr>
                <div class="form-actions">
                    <div class="form-group row">
                        <label class="col-md-2 control-label"></label>
                        <div class="col-md-4">
                            <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                            <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-remove"></i> Cancel</button>
                        </div>
                    </div>
                </div>
                <!-- End of Data  -->
            </form>
            <form class="form-horizontal" role="form" method="post" id="FormComment" action="<?php echo site_url('Ticket/add_comment') ?>">
                <div class="card card-primary card-outline direct-chat direct-chat-primary">
                    <div class="card-body">
                        <!-- Conversations are loaded here -->
                        <div class="direct-chat-messages" id="posisi" style="overflow:auto">
                            <!-- Message. Default to the left -->

                            <input type="hidden" id="ticket_id" name="ticket_id">

                            <div class="tambahan">
                            </div>

                            <div class="akhir">

                            </div>

                        </div>


                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                        <!-- <form method="post"> -->
                        <div class="input-group">
                            <input type="text" id="comment" name="comment" placeholder="Type Message ..." class="form-control">
                            <span class="input-group-append">
                                <button type="submit" class="btn btn-primary">Send</button>
                            </span>
                        </div>
                        <!-- </form> -->
                    </div>

                    <input type="hidden" name="apasih" id="apasih">
                    <!-- /.card-footer-->
                </div>
            </form>

            <!-- END BODY -->

        </div>
        <script>
            var full_name2 = <?= session('full_name'); ?>;
        </script>
    </div>
    <!-- akhir form edit -->
</div>