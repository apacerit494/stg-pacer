<!-- JQGRID -->
<div class="card card-info" id="jqgrid">
    <div class="card-header">
        <h3 class="card-title">ASSIGNMENT</h3>
    </div>
    <div class="container portlet light">

        <!-- <div class="portlet-body"> -->
        <hr>
        <form class="form-horizontal" id="formSearch">

            <div class="row">
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    <select class="form-control" id="status" name="status">
                                        <option value="1">Has Not Assignment</option>
                                        <option value="2">Has Assignment</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-control" id="tipe_keyword" name="tipe_keyword">
                                        <option value="f.full_name">Full Name</option>
                                        <option value="a.certification_number">Certification Number</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
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
                                <h3 class="card-title">PROCCESS ASSIGNMENT</h3>
                            </div>
                            <form class="form-horizontal" role="form" id="FormAssignment">
                                <input type="hidden" id="id" name="id">
                                <input type="hidden" id="url" name="url">
                                <br>
                                <div class="form-body">

                                    <input type="hidden" id="status1" name="status1">

                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Committe 1</label>
                                        <div class="col-md-7">
                                            <select class="form-control" id="committee1" name="committee1">
                                                <option value="">Please Select</option>
                                                <?php foreach ($committees as $committee) : ?>
                                                    <option value="<?php echo $committee['id'] ?>" data-nama="<?php echo $committee['full_name']  ?>"><?php echo $committee['full_name']  ?></option>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Committe 2</label>
                                        <div class="col-md-7">
                                            <select class="form-control" id="committee2" name="committee2">
                                                <option value="">Please Select</option>
                                                <?php foreach ($committees as $committee) : ?>
                                                    <option value="<?php echo $committee['id'] ?>" data-nama="<?php echo $committee['full_name']  ?>"><?php echo $committee['full_name']  ?></option>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Committe Certification</label>
                                        <div class="col-md-7">
                                            <select class="form-control" id="committee3" name="committee3">
                                                <option value="">Please Select</option>
                                                <?php foreach ($committee_certifications as $committee_certification) : ?>
                                                    <option value="<?php echo $committee_certification['id'] ?>" data-nama="<?php echo $committee_certification['full_name']  ?>"><?php echo $committee_certification['full_name']  ?></option>
                                                    
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Penguji Ujian tertulis, Praktek dan Observasi</label>
                                        <div class="col-md-7">
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="radio_penguji" id="radio_penguji1" value="1" checked> 
                                              <label class="form-check-label" for="radio_penguji1" id="radio_label1">
                                                Komite 1
                                              </label>
                                            </div>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="radio_penguji" id="radio_penguji2" value="2">
                                              <label class="form-check-label" for="radio_penguji2" id="radio_label2">
                                                Komite 2
                                              </label>
                                            </div>
                                            <div class="form-check">
                                              <input class="form-check-input" type="radio" name="radio_penguji" id="radio_penguji3" value="3">
                                              <label class="form-check-label" for="radio_penguji3" id="radio_label3">
                                                Komite Sertifikasi
                                              </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 control-label" style="text-align:right">Start Date</label>
                                        <div class="col-md-7">
                                            <input type="date" name="start_date" id="start_date" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row" style="text-align:right">
                                        <label class="col-md-4 control-label">End Date</label>
                                        <div class="col-md-7">
                                            <input type="date" name="end_date" id="end_date" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-group row" style="text-align:right">
                                        <label class="col-md-4 control-label">Note</label>
                                        <div class="col-md-7">
                                            <textarea class="form-control " id="note" name="note"></textarea>
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