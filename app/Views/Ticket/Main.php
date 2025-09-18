<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Ticket.js"></script>
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
        <?= $this->include('Ticket/Jqgrid'); ?>
        <?= $this->include('Ticket/Add'); ?>
        <?= $this->include('Ticket/Edit'); ?>
    </div>
</div>



<?= $this->endSection(); ?>