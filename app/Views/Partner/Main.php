<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Partner.js"></script>
<div class="page-content">
    <div class="container">
        <?= $this->include('Partner/Jqgrid'); ?>
        <?= $this->include('Partner/Add'); ?>
        <?= $this->include('Partner/Edit'); ?>
    </div>
</div>


<?= $this->endSection(); ?>