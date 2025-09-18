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
$threeMonthsAgo = date('Y-m-d', strtotime('-3 months'));

$sql_select = "SELECT c.user_id,c.certification_number,c.certification_id,c.start_date,c.scope_id,u.full_name, u.email FROM certification c
              INNER JOIN users u ON c.user_id = u.id
              WHERE c.end_date = '$threeMonthsAgo' and c.status='3'";

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
    
            $sql_update = "UPDATE certification SET status = 4, updatedAt=NOW() WHERE user_id = '$user_id' and end_date = '$threeMonthsAgo' ";
            if ($conn->query($sql_update) === TRUE) {
                echo "Status berhasil diupdate untuk user dengan ID: " . $user_id . "<br>";
    
                $to = $email;
                $subject = "Pemberitahuan LSP PACER!";
                $message = "<html>
                            <body>
                              <p>Selamat Pagi Bapak/Ibu Auditor,</p>
                              <p>Nama: $full_name</p>
                              <p>Nomor registrasi: $certification_number</p>
                              <p>Sesuai skema sertifikasi yang dijadikan acuan dalam evaluasi kompetensi profesi di LSP PACER maka sertifikasi Bapak/Ibu kami lakukan pembekuan. Selama masa pembekuan maka akun Bapak/Ibu tidak bisa menambahkan data terkait pengalaman audit, pengalaman kerja dan pelatihan. 
Untuk dapat membuka pembekuan tersebut silahkan menghubungi sekretariat LSP PACER di info@pacer.co.id atau WA 0818 233 244</p>
                              <br>
                              <p>Informasi lebih lanjut dapat menghubungi sekretariat di infor@pacer.co.id atau WA 0818 233 244.</p>
                              <br>
                              <p>NB : </p>
                              <p>Jika dalam waktu lebih dari 6 bulan setelah sertifikat dibekukan belum dilakukan penambahan bukti kompetensi dan penyelesaian administrasi maka akan dilakukan pencabutan sertifikat.</p>
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
            }
        } else {
            echo "Error: " . $sql_update . "<br>" . $conn->error;
        }
    }
} else {
    echo "Tidak ada yang berulang tahun hari ini.";
}

$conn->close();
?>
