document.getElementById("formulario").addEventListener("submit", function (event) {

    event.preventDefault();

    const $correo = document.getElementById("email").value
    const $punteo = document.getElementById("punteo").value


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($correo)) {
        alert("Correo no válido, solo letras, números y @")
        return
    }

    if (!/^(100|[1-9][0-9]?)$/.test($punteo)) {
        alert("Ingresar solo números del 1 al 100")
        return
    }

    const usuario_punteo = {
        correo: $correo,
        punteo: $punteo
    }

    alert("Punteo Agregado", usuario_punteo)

})