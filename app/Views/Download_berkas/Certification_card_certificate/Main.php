<?= $this->extend('Container.php'); ?>
<?= $this->section('content'); ?>

<script src="<?= base_url(); ?>/assets/myjs/Certification_card_certificate.js"></script>
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
        <?= $this->include('Download_berkas/Certification_card_certificate/Jqgrid'); ?>
    </div>
</div>


<?= $this->endSection(); ?>