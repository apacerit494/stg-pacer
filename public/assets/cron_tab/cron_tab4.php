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
$nineMonthsAgo = date('Y-m-d', strtotime('-9 months'));

$sql_select = "SELECT c.user_id,c.certification_number,c.certification_id,c.start_date,c.scope_id,u.full_name, u.email FROM certification c
              INNER JOIN users u ON c.user_id = u.id
              WHERE c.end_date = '$nineMonthsAgo' and c.status in ('3','4')";

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
              WHERE user_id='$user_id' and start_date > '$start_date' and certification_id<>'$certification_id' and scope_id='$scope_id'";

        $result2 = $conn->query($sql_select);
        
        if ($result2->num_rows == 0) {
            
            // $sql = "UPDATE users SET user_name = REPLACE(user_name, 'block', '')";
             $sql_update = "UPDATE users SET active = 0, updated_at=NOW(),username=CONCAT(username, 'blockduluah'),email=CONCAT(email, 'blockduluah') WHERE id =$user_id ";
           
            if ($conn->query($sql_update) === TRUE) {
                echo "Status berhasil diupdate untuk user dengan ID: " . $user_id . "<br>";
               
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
