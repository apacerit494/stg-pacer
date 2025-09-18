<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<link rel="stylesheet" href="/plugins/summernote/summernote-bs4.min.css">
<script src="<?= base_url(); ?>/assets/myjs/Front_end_news.js"></script>
<div class="page-content">
    <div class="container">
        <?= $this->include('Settings/Front_end/News/Jqgrid'); ?>
        <?= $this->include('Settings/Front_end/News/Add'); ?>
    </div>
</div>

<script src="/plugins/summernote/summernote-bs4.min.js"></script>
<script>
    $(function() {
        // Summernote
        $('#news_content').summernote()
        $('#news_content2').summernote()


    })
</script>
<?= $this->endSection(); ?>