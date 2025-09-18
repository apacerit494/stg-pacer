<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Committee_over_due.js"></script>
<div class="page-content">
    <div class="container">
        <?= $this->include('Committee_over_due/Jqgrid'); ?>
    </div>
</div>


<?= $this->endSection(); ?>