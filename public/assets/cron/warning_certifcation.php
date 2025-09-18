// Import modul yang diperlukan
const mysql = require('mysql');

// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'nama_database'
});

// Koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
  
  // Lakukan query untuk memperbarui status sertifikasi yang sudah kedaluwarsa
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 3); // Tambah 3 bulan dari tanggal hari ini
  const formattedDate = currentDate.toISOString().slice(0, 10); // Format tanggal (YYYY-MM-DD)
  
  const updateQuery = `
    UPDATE certification 
    SET status = 'warning' 
    WHERE tanggal_expired <= '${formattedDate}'
  `;

  connection.query(updateQuery, (error, results, fields) => {
    if (error) {
      console.error('Error updating certification status:', error);
    } else {
      console.log('Certification status updated successfully');
    }
    
    // Tutup koneksi database setelah selesai
    connection.end();
  });
});