document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const $nombre = document.getElementById("nombre").value;
    const $fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const $telefono = document.getElementById("telefono").value;
    const $email = document.getElementById("email").value;

    if (!$nombre || !$fechaNacimiento || !$telefono || !$email) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test($nombre)) {
        alert("El nombre solo debe contener letras y espacios.");
        return;
    }

    if (!/^\d+$/.test($telefono)) {
        alert("El teléfono solo debe contener números.");
        return;
    }

    if (!/^\d{2}-\d{2}-\d{4}$/.test($fechaNacimiento)) {
        alert("La fecha de nacimiento debe tener el formato dd-mm-aaaa.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    alert("Formulario enviado con éxito.");

});

function calcularEdad(fechaNacimiento) {

    const [dia, mes, anio] = fechaNacimiento.split("-").map(Number);

    console.log(dia, mes, anio);

    const fechaNac = new Date(anio, mes - 1, dia);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    let mesDiff = fechaActual.getMonth() - fechaNac.getMonth();

    if (mesDiff < 0 || (mesDiff === 0 && fechaActual.getDate() < fechaNac.getDate())) edad--;

    return edad;

}

document.getElementById("fechaNacimiento").addEventListener("input", function () {

    const fechaNacimiento = this.value;
    const $spanEdad = document.getElementById("spanEdad");


    if (/^\d{2}-\d{2}-\d{4}$/.test(fechaNacimiento)) {

        const edad = calcularEdad(fechaNacimiento);

        $spanEdad.innerHTML = edad + " años";

    } else {
        $spanEdad.innerHTML = "0 años";
    }
});