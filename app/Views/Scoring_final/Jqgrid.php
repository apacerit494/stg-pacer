<!-- JQGRID -->
<div class="card card-info" id="jqgrid">
    <div class="card-header">
        <h3 class="card-title">FINAL ASSESSMENT</h3>
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

        <div id="modal_secretariat_verified" class="modal fade" role="dialog" aria-hidden="false">
            <div class="modal-dialog" style="width:400px;">
                <div class="modal-content">
                    <!-- <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title"><i class="fa fa-check"></i> SECRETARIAT VERIFICATION</h4>
                    </div> -->
                    <div class="modal-body">
                        <!--  -->
                        <div class="card card-info">

                            <div class="card-header">
                                <h3 class="card-title">PROCCESS VERIFICATION</h3>
                            </div>
                            <form class="form-horizontal" role="form" id="FormAssignment">
                                <input type="hidden" id="assignment_id" name="assignment_id">
                                <input type="hidden" id="committee_id" name="committee_id">
                                <br>
                                <div class="form-body">
                                    <div class="form-group row">
                                        <label class="col-md-5 control-label" style="text-align:right">Remarks</label>
                                        <div class="col-md-6">
                                            <select name="remarks" id="remarks" class="form-control">
                                                <option value="Y">OK</option>
                                                <option value="N">Mohon direvisi</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <!--  -->
                    </div>
                    <!--  -->
                    <div class="modal-footer">
                        <button class="btn btn-success" id="btn_proses"><i class="fa fa-check"></i> Proccess</button>
                        <button class="btn btn-warning" id="btn_close"><i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="modal fade" id="modal_secretariat_verified" role="dialog" aria-hidden="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">SECRETARIAT VERIFICATION</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="assignment_id" name="assignment_id">
                        <input type="hidden" id="committee_id" name="committee_id">
                        <div class="form-group row">
                            <label class="col-md-3 control-label" style="text-align:right">Remarks</label>
                            <div class="col-md-6">
                                <select name="remarks" id="remarks" class="form-control">
                                    <option value="Y">OK</option>
                                    <option value="N">Mohon direvisi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                 
                    <div class="modal-footer">
                        <button class="btn btn-success" id="btn_proses"><i class="fa fa-check"></i> Proccess</button>
                        <button class="btn btn-warning" id="btn_close"><i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            
            </div>
        
        </div> -->

        <!-- END FORM SEARCH -->
        <!-- <div class="container-fluid"> -->
        <div id="tr_grid" class="wrapper-jqGrid">
            <table id="jqgrid_data"></table>
            <div id="jqgrid_data_pager"></div>
        </div>
        <!-- </div> -->
        <!-- </div> -->
    </div>
    <!-- AKHIR JQGRID -->
</div>