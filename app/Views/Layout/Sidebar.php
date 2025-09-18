 <!-- Main Sidebar Container -->
 <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
 <aside class="main-sidebar sidebar-light-success elevation-4">
     <!-- Brand Logo -->
     <a href="#" class="brand-link">
         <img src="<?= base_url(); ?>/dist/img/logo2.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
         <span class="brand-text" style="color:darkblue;font-weight:bold">LSP</span><span>PACER</span>
     </a>

     <!-- Sidebar -->
     <div class="sidebar">
         <!-- Sidebar user (optional) -->
         <!-- <div class="user-panel mt-3 pb-3 mb-3 d-flex">
             <div class="image">
                 <img src="/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
             </div>
             <div class="info">
                 <a href="#" class="d-block"><?= session('full_name'); ?></a>
             </div>
         </div> -->
         <br>

         <!-- SidebarSearch Form -->
         <div class="form-inline">
             <div class="input-group" data-widget="sidebar-search">
                 <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
                 <div class="input-group-append">
                     <button class="btn btn-sidebar">
                         <i class="fas fa-search fa-fw"></i>
                     </button>
                 </div>
             </div>
         </div>

         <!-- Sidebar Menu -->
         <?= $menu; ?>
         <!-- /.sidebar-menu -->
         <br>
         <br>
         <br>




         <?php if (user()->user_type_id == '5') { ?> 
             <hr>
             <img style="width:220px;bg-color:green" src="<?= base_url() ?>/assets/images/informasi2.png">
             <hr>
         <?php } ?> 
     </div>
     <!-- /.sidebar -->
 </aside>