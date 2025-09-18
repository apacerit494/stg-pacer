<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Scoring.js"></script>
<!-- <section class="content-header">
    <div class="container">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>User</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">User</a></li>
                   
                </ol>
            </div>
        </div>
    </div>
</section> -->
<div class="page-content">
    <div class="container">
        <?= $this->include('Scoring/Jqgrid'); ?>
        <?= $this->include('Scoring/Edit'); ?>
        <?= $this->include('Scoring/Detail'); ?>
    </div>
</div>


<?= $this->endSection(); ?>