<?= $this->extend('Container'); ?>
<?= $this->section('content'); ?>
<br>
<link href="<?= base_url(); ?>/assets/plugins/smart-wizard/css/smart_wizard_all.min.css" rel="stylesheet" type="text/css" />
<style>
    table tr{
        vertical-align:top;
        font-size:16px;
    }
</style>
<div class="row">
    <div class="col-xl-12 mx-auto">
        <div class="card">
            <div class="card-body">
                <br />
                <div class="mandar" style="display: none">
                    <p>
                        <label>Theme:</label>
                        <select id="theme_selector">
                            <option value="default">Default</option>
                            <option value="arrows">Arrows</option>
                            <option value="dots" selected>Dots</option>
                            <option value="dark">Dark</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="checkbox" id="is_justified" value="1" checked />
                        <label for="is_justified">Justified</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Animation:</label>
                        <select id="animation">
                            <option value="none">None</option>
                            <option value="fade">Fade</option>
                            <option value="slide-horizontal" selected>Slide Horizontal</option>
                            <option value="slide-vertical">Slide Vertical</option>
                            <option value="slide-swing">Slide Swing</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Go To:</label>
                        <select id="got_to_step">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>External Buttons:</label>
                        <button class="btn btn-secondary" id="prev-btn" type="button">Go Previous</button>
                        <button class="btn btn-secondary" id="next-btn" type="button">Go Next</button>
                        <button class="btn btn-danger" id="reset-btn" type="button">Reset Wizard</button>
                    </p>
                </div>


                <h1>
                    Timeline Pengajuan Sertifikasi 234007
                </h1>
                <br>
                <!-- SmartWizard html -->
                <div id="smartwizard">
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#step-1"> <strong>Langkah 1</strong>
                                <br></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-2"> <strong>Langkah 2</strong>
                                <br></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-3"> <strong>Langkah 3</strong>
                                <br></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#step-4"> <strong>Langkah 4</strong>
                                <br></a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="step-1" class="tab-pane" role="tabpanel" aria-labelledby="step-1">
                            <h3>Langkah 1</h3>
                            <table>
                                    <tr>
                                        <td>a.</td>
                                        <td>  </td>
                                        <td>Pelajari Persyaratan Sertifikasi dengan mendownload skema sertifikasi pada menu “Download berkas”</td>
                                    </tr>
                                         <tr>
                                        <td>b.</td>
                                        <td>  </td>
                                        <td>Isi bioda melalui menu “Biodata” dan upload dokumen yang diperlukan untuk sertifikasi lalu disubmit jika sudah lengkap. Jika belum cukup klik “Save”</td>
                                    </tr>
                                    <tr >
                                        <td>c.</td>
                                        <td>  </td>
                                        <td>Setelah Persyaratan dilengkapi, pilih lingkup sertifikasi pada menu “Pengajuan Sertifikasi”</td>
                                    </tr>
                                         <tr>
                                        <td>d.</td>
                                        <td>  </td>
                                        <td>Akan muncul Tagihan biaya pendaftaran sertifikasi pada Menu “Personal Invoice”</td>
                                    </tr>
                                    </tr>
                                         <tr>
                                        <td>e.</td>
                                        <td>  </td>
                                        <td>Setelah dilakukan Pelunasan maka upload bukti pelunasan di menu “Personal Invoice”</td>
                                    </tr>
                                </table>
                          
                        </div>
                        <div id="step-2" class="tab-pane" role="tabpanel" aria-labelledby="step-2">
                            <h3>Langkah 2</h3>
                            <div>
                                <table>
                                    <tr>
                                        <td>a.</td>
                                        <td>  </td>
                                        <td>Menunggu proses pemeriksaan berkas oleh sekretariat maksimum 2x24 jam, jika belum lengkap sekretariat akan memberi informasi melalui WA, email dan atau di menu “Pengajuan Sertifikasi (Comment)” </td>
                                    </tr>
                                         <tr>
                                        <td>b.</td>
                                        <td>  </td>
                                        <td>Jika berkas sudah lengkap maka akan dilakukan penilaian oleh Komite Penguji dan Komite Sertifikasi maksimum 14 hari kerja.</td>
                                    </tr>
                                </table>
                               
                            </div>
                        </div>
                        <div id="step-3" class="tab-pane" role="tabpanel" aria-labelledby="step-3">
                            <h3>Langkah 3</h3>
                                <table>
                                    <tr>
                                        <td>a.</td>
                                        <td>  </td>
                                        <td>Setelah Proses penilaian selesai maka akan muncul biaya Iuran Sertifikasi di menu “Personal Invoice”  </td>
                                    </tr>
                                    <tr>
                                        <td>b.</td>
                                        <td>  </td>
                                        <td>Setelah melakukan pembayaran biaya Iuran Sertifikasi, upload bukti pelunasan di menu “Personal Invoice” sehingga bisa diterbitkan Surat Keputusan Sertifikasi melalui email</td>
                                    </tr>
                                    <tr>
                                        <td>C.</td>
                                        <td>  </td>
                                        <td>Sekretariat akan mencetak kartu dan sertifikat lalu mengirimkannya ke alamat yang terdapat dalam biodata</td>
                                    </tr>
                                </table>
                        </div>
                        <div id="step-4" class="tab-pane" role="tabpanel" aria-labelledby="step-4">
                            <h3>Langkah 4 </h3>
                            <table>
                                    <tr>
                                        <td>a.</td>
                                        <td>  </td>
                                        <td>Sertifikan dapat mendowload kartu anggota, Sertifikat dan CV professional di menu “Download Berkas (Card and Certificate / CV Professional)</td>
                                    </tr>
                                    <tr>
                                        <td>b.</td>
                                        <td>  </td>
                                        <td>Sertifikan dapat menggunakan kartu tersebut sesuai persyaratan skema sertfikasi</td>
                                    </tr>
                                    <tr>
                                        <td>C.</td>
                                        <td>  </td>
                                        <td>Sertifikan akan diberikan informasi secara berkala baik melalui WA, email maupun aplikasi ini guna meningkatkan atau memelihara kompetensinya</td>
                                    </tr>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="<?= base_url() ?>/assets/plugins/smart-wizard/js/jquery.smartWizard.min.js"></script>
<script>
    $(document).ready(function() {
        // Toolbar extra buttons
        var btnFinish = $('<button></button>').text('Finish').addClass('btn btn-info').attr('style', 'display:none').on('click', function() {
            // alert('Finish Clicked');
        });
        var btnCancel = $('<button></button>').text('Cancel').addClass('btn btn-danger').attr('style', 'display:none').on('click', function() {
            //$('#smartwizard').smartWizard("reset");
        });
        // Step show event
        $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
            $("#prev-btn").removeClass('disabled');
            $("#next-btn").removeClass('disabled');
            if (stepPosition === 'first') {
                $("#prev-btn").addClass('disabled');
            } else if (stepPosition === 'last') {
                $("#next-btn").addClass('disabled');
            } else {
                $("#prev-btn").removeClass('disabled');
                $("#next-btn").removeClass('disabled');
            }
        });
        // Smart Wizard
        $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'dots',
            transition: {
                animation: 'slide-horizontal', // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing
            },
            toolbarSettings: {
                toolbarPosition: 'both', // both bottom
                toolbarExtraButtons: [btnFinish, btnCancel]
            }
        });
        // External Button Events
        $("#reset-btn").on("click", function() {
            // Reset wizard
            $('#smartwizard').smartWizard("reset");
            return true;
        });
        $("#prev-btn").on("click", function() {
            // Navigate previous
            $('#smartwizard').smartWizard("prev");
            return true;
        });
        $("#next-btn").on("click", function() {
            // Navigate next
            $('#smartwizard').smartWizard("next");
            return true;
        });
        // Demo Button Events
        $("#got_to_step").on("change", function() {
            // Go to step
            var step_index = $(this).val() - 1;
            $('#smartwizard').smartWizard("goToStep", step_index);
            return true;
        });
        $("#is_justified").on("click", function() {
            // Change Justify
            var options = {
                justified: $(this).prop("checked")
            };
            $('#smartwizard').smartWizard("setOptions", options);
            return true;
        });
        $("#animation").on("change", function() {
            // Change theme
            var options = {
                transition: {
                    animation: $(this).val()
                },
            };
            $('#smartwizard').smartWizard("setOptions", options);
            return true;
        });
        $("#theme_selector").on("change", function() {
            // Change theme
            var options = {
                theme: $(this).val()
            };
            $('#smartwizard').smartWizard("setOptions", options);
            return true;
        });
    });
</script>
<?= $this->endSection(); ?>