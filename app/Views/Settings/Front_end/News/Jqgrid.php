<!-- JQGRID -->
<div class="card card-info" id="jqgrid">
    <div class="card-header">
        <h3 class="card-title">NEWS</h3>
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
                                        <option value="news_title">News Title</option>
                                        <option value="news_content">News Content</option>
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
        <?php if ($pesan != '' && $success == false) { ?>
            <div id="msgerror1">
                <div class="alert alert-error">
                    <button class="close"></button>
                    <?= $pesan; ?>

                </div>
                <hr>
            </div>

        <?php } else if ($pesan != '' && $success == true) { ?>
            <div id="msgerror2">
                <div class="alert alert-success">
                    <button class="close"></button>
                    <?= $pesan; ?>

                </div>
                <hr>
            </div>
        <?php } ?>

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