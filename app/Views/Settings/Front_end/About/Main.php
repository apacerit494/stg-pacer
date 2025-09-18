<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<link rel="stylesheet" href="/plugins/summernote/summernote-bs4.min.css">
<script src="<?= base_url(); ?>/assets/myjs/Front_end_about.js"></script>
<div class="page-content">
    <div class="container">
        <?= $this->include('Settings/Front_end/About/Edit'); ?>
    </div>
</div>

<script src="/plugins/summernote/summernote-bs4.min.js"></script>
<script>
    $(function() {
        // Summernote
        $('#about_content').summernote()
    })
</script>
<?= $this->endSection(); ?>