<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/User_setup.js"></script>

<div class="page-content">
    <div class="container">
        <?= $this->include('Settings/User_setup/Jqgrid'); ?>
        <?= $this->include('Settings/User_setup/Add'); ?>
        <?= $this->include('Settings/User_setup/Edit'); ?>
    </div>
</div>


<?= $this->endSection(); ?>