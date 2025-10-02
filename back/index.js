const express = require('express');
const cors = require('cors');
const conexion = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

function calcularEdad(fecha) {

    const [dia, mes, anio] = fecha.split('-').map(Number);
    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let mesDiferencia = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (mesDiferencia < 0 || (mesDiferencia === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) edad--;

    return edad;

}

function formatoFecha(fecha) {
    const [dia, mes, anio] = fecha.split('-').map(Number);
    return `${anio}-${mes}-${dia}`;
}

app.post('/guardar_usuario', (req, res) => {

    try {

        // Validar datos
        const { nombre, fecha_nacimiento, telefono, correo } = req.body;

        if (!nombre || !fecha_nacimiento || !telefono || !correo) {
            res.status(400).send({ error: 'Datos incompletos' });
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            res.status(400).send({ error: 'Nombre no válido, solo letras y espacios' });
            return;
        }

        if (!/^\d{2}-\d{2}-\d{4}$/.test(fecha_nacimiento)) {
            res.status(400).send({ error: 'Fecha de nacimiento no válida, formato dd-mm-aaaa' });
            return;
        }

        if (!/^\d+$/.test(telefono)) {
            res.status(400).send({ error: 'Telefono no válido, solo números' });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            res.status(400).send({ error: 'Correo no válido, solo letras, números y @' });
            return;
        }

        if (calcularEdad(fecha_nacimiento) < 18) {
            res.status(400).send({ error: 'Debes ser mayor de edad' });
            return;
        }

        // Guardar en la base de datos
        const usuario = {
            nombre,
            fecha_nacimiento: formatoFecha(fecha_nacimiento),
            telefono,
            correo,
            fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
            estadousuarioid: 1
        };

        conexion.query('INSERT INTO usuario SET ?', usuario, (err, result) => {
            if (err) {
                res.status(500).send({ error: err.message });
                return;
            }
            res.status(201).send({ id_usuario: result.insertId });
        });


    } catch (err) {
        res.status(500).send({ error: err.message });
        return;
    }

});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});  