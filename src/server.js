const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username', // Ganti dengan username MySQL
  password: 'password', // Ganti dengan password MySQL
  database: 'dbname', // Ganti dengan nama database
});

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  // Tambahkan koneksi ke database sebelum menjalankan server
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database:', error);
      process.exit(1);
    }
    console.log('Connected to database');
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
