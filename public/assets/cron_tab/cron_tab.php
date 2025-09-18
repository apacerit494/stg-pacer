<?php
// Koneksi ke database
$servername = "localhost";
$username = "pacerco2_root";
$password = "B1$31ll4h1";
$dbname = "pacerco2_lsppacer";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$current_month = date("m");
$current_day = date("d");

$sql_select = "SELECT c.user_id,c.certification_number,u.full_name, u.email FROM certification c
              INNER JOIN users u ON c.user_id = u.id
              WHERE MONTH(c.start_date) = '$current_month' AND DAY(c.start_date) = '$current_day' and c.status='3'";

$result = $conn->query($sql_select);

if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        $user_id = $row["user_id"];
        $email = $row["email"];
        $full_name = $row["full_name"];
        $certification_number = $row["certification_number"];
        
        
        $to = $email;
        $subject = "Pemberitahuan LSP PACER!";
        $message = "<html>
                    <body>
                      <p>Selamat Pagi Bapak/Ibu Auditor,</p>
                      <p>Nama: $full_name</p>
                      <p>Nomor registrasi: $certification_number</p>
                      <p>Sesuai skema sertifikasi yang dijadikan acuan dalam evaluasi kompetensi profesi di LSP PACER, maka kepada Bapak/Ibu Auditor agar menambahkan pengalaman audit, pengalaman kerja, atau pelatihan terbaru dalam rangka pemeliharaan kompetensi dan mengupload buktinya dalam biodata masing-masing.</p>
                      <br>
                      <p>Informasi lebih lanjut dapat menghubungi sekretariat di infor@pacer.co.id atau WA 0818 233 244.</p>
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
    echo "Tidak ada yang berulang tahun hari ini.";
}

$conn->close();
?>
