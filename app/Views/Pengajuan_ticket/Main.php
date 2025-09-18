<!-- form ADD -->

<?= $this->extend('Container'); ?>
<?= $this->section('content'); ?>
<!-- Awal form edit -->
<br>
<script src="<?= base_url(); ?>/assets/myjs/Pengajuan_ticket.js"></script>
<div class="page-content">
    <div class="container">
        <div class="card card-info" id="edit">

            <div class="card-header">
                <h3 class="card-title">PENGAJUAN TICKET</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->

            <div class="card-body">
                <div class="form-body">
                    <nav class="w-100">
                        <div class="nav nav-tabs" id="product-tab" role="tablist">
                            <a class="nav-item nav-link active" id="Add-Ticket-tab" data-toggle="tab" href="#Add-Ticket" role="tab" aria-controls="Add-Ticket" aria-selected="true">Pengajuan Ticket</a>
                            <a class="nav-item nav-link" id="comments-tab" data-toggle="tab" href="#comments" role="tab" aria-controls="comments" aria-selected="false">Comments</a>
                        </div>
                    </nav>
                    <div class="tab-content p-3" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="Add-Ticket" role="tabpanel" aria-labelledby="Add-Ticket-tab">
                            <form class="form-horizontal" role="form" method="post" id="FormAdd" action="<?php echo site_url('Ticket/add_pengajuan_ticket') ?>">
                                <?= csrf_field() ?>
                                <?php if (count($tickets) < 1) { ?>
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
                                    <hr>
                                    <div class="form-actions">
                                        <div class="form-group row">
                                            <label class="col-md-2 control-label"></label>
                                            <div class="col-md-4">
                                                <button class="btn btn-circle blue" id="btn_save"><i class="fa fa-save"></i> Save</button>
                                                <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-undo"></i> Cancel</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- End of Data  -->
                                <?php } else { ?>
                                    <?php foreach ($tickets as $ticket) : ?>
                                        <input type="hidden" id="id" name="id" value="<?= $ticket['ticket_id']; ?>">
                                        <input type="hidden" id="full_name" name="full_name" value="<?= session('full_name'); ?>">
                                        <div class="alert alert-error" style="display:none;">
                                            <button class="close" data-dismiss="alert"></button>
                                            You have some form errors. Please check below.
                                        </div>

                                        <!-- Isi Data -->
                                        <div class="form-group row">
                                            <label class="col-sm-2 control-label" style="text-align:right">Ticket Number</label>
                                            <div class="col-sm-3">
                                                <input type="text" name="ticket_num" id="ticket_num" class="form-control" value="<?= $ticket['ticket_num']; ?>" readonly>
                                            </div>
                                        </div>

                                        <div class="form-group row">
                                            <label class="col-sm-2 control-label" style="text-align:right">Subject</label>
                                            <div class="col-sm-3">
                                                <input type="text" name="ticket_subject" id="ticket_subject" class="form-control" value="<?= $ticket['ticket_subject']; ?>" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 control-label" style="text-align:right">Description</label>
                                            <div class="col-sm-3">
                                                <textarea name="description" id="description" class="form-control" disabled><?= $ticket['description']; ?></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 control-label" style="text-align:right">Priority</label>
                                            <div class="col-sm-3">
                                                <select name="priority" id="priority" class="form-control" disabled>
                                                    <?php foreach ($priorities as $priority) : ?>
                                                        <option value="<?= $priority['code_value']; ?>" <?= ($priority['code_value'] == $ticket['priority']) ? " selected" : ""; ?>><?= $priority['code_description']; ?></option>
                                                    <?php endforeach; ?>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-2 control-label" style="text-align:right">Attachment</label>
                                            <div class="col-sm-3">
                                                <input type="file" name="attachment" id="attachment" class="form-control" accept=".pdf,image/*" disabled>
                                            </div>
                                            <div class="com-sm-2">
                                                <a id="btn_preview" class="btn btn-primary" href="<?= $ticket['attachment'] == '' || $ticket['attachment'] == null ? 'javascript:' : base_url() . $ticket['attachment'] ?>" target="_blank">Preview</a>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="form-actions">
                                            <div class="form-group row">
                                                <label class="col-md-2 control-label"></label>
                                                <div class="col-md-4">
                                                    <button class="btn btn-circle blue" id="btn_save" disabled><i class="fa fa-save"></i> Save</button>
                                                    <button type="reset" class="btn btn-circle red" id="btn_cancel"><i class="fa fa-edit"></i> Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                <?php } ?>
                            </form>
                        </div>
                        <div class="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                            <div class="card card-primary card-outline direct-chat direct-chat-primary">
                                <form class="form-horizontal" role="form" method="post" id="FormComment" action="<?php echo site_url('Ticket/add_comment') ?>">
                                    <div class="card-body">
                                        <!-- Conversations are loaded here -->
                                        <div class="direct-chat-messages">
                                            <!-- Message. Default to the left -->


                                            <div class="tambahan">
                                                <?php if (count($tickets) > 0) { ?>
                                                    <input type="hidden" id="ticket_id" name="ticket_id" value="<?= $ticket['ticket_id']; ?>">
                                                    <?php foreach ($comments as $comment) : ?>
                                                        <?php if ($comment['user_type_id'] == '5') { ?>
                                                            <div class="direct-chat-msg right">
                                                                <div class="direct-chat-msg ">
                                                                    <div class="direct-chat-infos clearfix">
                                                                        <span class="direct-chat-name float-right"><?= $comment['full_name'] ?></span>
                                                                        <span class="direct-chat-timestamp float-left"><?= $comment['comment_date'] ?></span>
                                                                    </div>
                                                                    <img class="direct-chat-img" src="<?= base_url(); ?>/assets/global/img/avatar.png" alt="Message User Image">
                                                                    <div class="direct-chat-text">
                                                                        <?= $comment['comment'] ?>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        <?php } else {  ?>
                                                            <div class="direct-chat-msg">
                                                                <div class="direct-chat-msg ">
                                                                    <div class="direct-chat-infos clearfix">
                                                                        <span class="direct-chat-name float-left"><?= $comment['full_name'] ?></span>
                                                                        <span class="direct-chat-timestamp float-right"><?= $comment['comment_date'] ?></span>
                                                                    </div>
                                                                    <img class="direct-chat-img" src="<?= base_url(); ?>/assets/global/img/avatar.png" alt="Message User Image">
                                                                    <div class="direct-chat-text">
                                                                        <?= $comment['comment'] ?>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        <?php } ?>

                                                    <?php endforeach; ?>
                                                <?php } ?>
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
                                </form>
                            </div>

                        </div>
                    </div>
                    <!-- END BODY -->

                </div>

            </div>
        </div>
    </div>
    <!-- akhir form edit -->
    <?= $this->endSection(); ?>
    <!-- akhir form add -->