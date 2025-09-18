<!-- JQGRID -->
<div class="card card-info" id="jqgrid">
    <div class="card-header">
        <h3 class="card-title">ASSESSMENT</h3>
    </div>
    <div class="container portlet light">

        <!-- <div class="portlet-body"> -->
        <hr>
        <form class="form-horizontal" id="formSearch">

            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-4">
                                    <select class="form-control" id="tipe_keyword" name="tipe_keyword">
                                        <option value="d.full_name">Certificant</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" id="keyword" nama="keyword" placeholder="Masukan Keyword...">
                                </div>
                                <div class="col-md-2">
                                    <button class="btn btn-info" id="btn_search">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <hr size="1">


        <!-- END FORM SEARCH -->
        <!-- <div class="container-fluid"> -->
        <div id="tr_grid" class="wrapper-jqGrid">
            <table id="jqgrid_data"></table>
            <div id="jqgrid_data_pager"></div>
        </div>
        <!-- </div> -->
        <!-- </div> -->

        <div id="modal_assignment" class="modal fade" role="dialog" aria-hidden="false">
            <div class="modal-dialog" style="width:800px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title"><i class="fa fa-print"></i> Assignment</h4>
                    </div>
                    <div class="modal-body">
                        <!--  -->
                        <div class="card card-info">

                            <div class="card-header">
                                <h3 class="card-title">RE - ASSIGNMENT</h3>
                            </div>
                            <form class="form-horizontal" role="form" id="FormAssignment">
                                <input type="hidden" id="id" name="id">
                                <input type="hidden" id="committee_lama" name="committee_lama">
                                <input type="hidden" id="assignment_id" name="assignment_id">
                                <br>
                                <div class="form-body">


                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Committe</label>
                                        <div class="col-md-7">
                                            <select class="form-control" id="committee" name="committee">
                                                <option value="">Please Select</option>
                                                <?php foreach ($committees as $committee) : ?>
                                                    <option value="<?php echo $committee->id ?>"><?php echo $committee->full_name  ?></option>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Start Date</label>
                                        <div class="col-md-7">
                                            <input type="date" name="start_date" id="start_date" class="form-control" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row" style="text-align:right">
                                        <label class="col-md-4 control-label">End Date</label>
                                        <div class="col-md-7">
                                            <input type="date" name="end_date" id="end_date" class="form-control" >
                                        </div>
                                    </div>
                                    <div class="form-group row" style="text-align:right">
                                        <label class="col-md-4 control-label">Note</label>
                                        <div class="col-md-7">
                                            <textarea class="form-control " id="note" name="note" ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!--  -->
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" id="btn_proses"><i class="fa fa-check"></i> Proccess</button>
                        <button class="btn btn-warning" id="btn_close"><i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- AKHIR JQGRID -->
</div>