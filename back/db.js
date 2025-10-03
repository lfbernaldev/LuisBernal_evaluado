const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ujsd#hfQ@s_15',
    database: 'evaluacion_luisbernal_evaluado'
});

conexion.connect((err) => {
    if (err) {
        console.log('Error al conectar a la base de datos', err);
        return;
    }
    console.log('Conexión establecida');
});

module.exports = conexion;