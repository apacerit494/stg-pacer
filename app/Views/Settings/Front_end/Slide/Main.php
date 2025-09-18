<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Front_end_slide.js"></script>

<div class="page-content">
    <div class="container">
        <?= $this->include('Settings/Front_end/Slide/Jqgrid'); ?>
        <?= $this->include('Settings/Front_end/Slide/Add'); ?>
        <?= $this->include('Settings/Front_end/Slide/Edit'); ?>
    </div>
</div>


<?= $this->endSection(); ?>