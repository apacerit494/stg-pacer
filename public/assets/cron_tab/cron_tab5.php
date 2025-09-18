<?php

$servername = "localhost";
$username = "pacerco2_root";
$password = "B1$31ll4h1";
$dbname = "pacerco2_lsppacer";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$currentDate = date('Y-m-d');
$tenMonthsAgo = date('Y-m-d', strtotime('-10 months'));
setlocale(LC_TIME, 'id_ID');
$twoMonthsLater = date('Y-m-d', strtotime('+2 months'));
//$tanggal_baru = date("d F Y", strtotime($twoMonthsLater));
$tanggal_baru = strftime("%e %B %Y", strtotime($twoMonthsLater));

$sql_select = "SELECT c.user_id,c.certification_number,c.certification_id,c.start_date,c.scope_id,u.full_name, u.email FROM certification c
              INNER JOIN users u ON c.user_id = u.id
              WHERE c.end_date = '$tenMonthsAgo' and c.status in ('3','4')";

$result = $conn->query($sql_select);

if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        $user_id = $row["user_id"];
        $start_date = $row["start_date"];
        $certification_id = $row["certification_id"];
        $scope_id= $row["scope_id"];
        $email = $row["email"];
        $full_name = $row["full_name"];
        $certification_number = $row["certification_number"];
        
       $sql_select = "SELECT * FROM certification 
              WHERE user_id='$user_id' and start_date > '$start_date' and certification_id<>'$certification_id' and scope_id='$scope_id' and status in ('1','2','3')";

        $result2 = $conn->query($sql_select);
        
        if ($result2->num_rows == 0) {
                echo "Status berhasil diupdate untuk user dengan ID: " . $user_id . "<br>";
    
                $to = $email;
                $subject = "Pemberitahuan LSP PACER!";
                $message = "<html>
                            <body>
                              <p>Selamat Pagi Bapak/Ibu Auditor,</p>
                              <p>Nama: $full_name</p>
                              <p>Nomor registrasi: $certification_number</p>
                              <p>Sesuai skema sertifikasi yang dijadikan acuan dalam evaluasi kompetensi profesi di LSP PACER maka sertifikasi Bapak/Ibu akan kami lakukan pencabutan pada tanggal $tanggal_baru (12 bulan setelah masa sertifkasi terakhir). Setelah pencabutan sertifikasi maka biodata Bapak/Ibu akan kami hapuskan dari sistem dan jika ingin menggunakan layanan LSP PACER maka diharuskan mendaftar ulang. </p>
                              <br>
                              <p>Guna menghindari pencabutan sertifikasi diharapkan Bapak/Ibu dapat menghubungi sekretariat LSP PACER di info@pacer.co.id atau WA 0818 233 244</p>
                              <br>
                              <p>NB : </p>
                              <p>Setelah pencabutan sertifikasi maka jika mendaftar kembali akan memperoleh nomor sertifikat dan tanggal sertifikasi awal yang mengikuti tanggal pendaftaran baru.</p>
                              <br>
                              <br>
                              <p>Manajer Sertifikasi,</p>
                              <p>LSP PACER</p>
                              <p>www.pacer.co.id</p>
                              <p>Jl. Gereja No. 9, Paledang, Bogor Tengah</p>
                              <p>Kota Bogor</p>
                            </body>
                            </html>";
                
                $headers = 'From: info@pacer.co.id' . "\r\n" .
                            'CC: risnandar@pacer.co.id' . "\r\n" .
                            'MIME-Version: 1.0' . "\r\n" .
                            'Content-Type: text/html; charset=UTF-8' . "\r\n" .
                            'X-Mailer: PHP/' . phpversion();
    
                mail($to, $subject, $message, $headers);
                echo "Email berhasil dikirim ke: " . $email . "<br>";
            
        } else {
            echo "Error: " . $sql_update . "<br>" . $conn->error;
        }
    }
} else {
    echo "Tidak ada yang berulang tahun hari ini.";
}

$conn->close();
?>
