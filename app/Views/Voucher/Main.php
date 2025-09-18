<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Voucher.js"></script>
<div class="page-content">
    <div class="container">
        <?= $this->include('Voucher/Jqgrid'); ?>
        <?= $this->include('Voucher/Add'); ?>
        <?= $this->include('Voucher/Edit'); ?>
    </div>
</div>


<?= $this->endSection(); ?>