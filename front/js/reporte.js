document.querySelectorAll(".btn-report").forEach(btn => {
    btn.addEventListener("click", async (event) => {
        const reportType = event.target.value;

        try {
            const response = await fetch(`http://localhost:3000/ejecutar_reporte/${reportType}`);
            const data = await response.json();
            const $reportSection = document.getElementById("reportSection");
            $reportSection.innerHTML = "";
            data.forEach(user => {
                const $user = document.createElement("div");
                $user.innerHTML = `<h2>${user.nombre}</h2><p>Telefono: ${user.telefono}</p>`;
                $reportSection.appendChild($user);
            });
        } catch (error) {
            console.error("❌ Error de red o servidor:", error);
            alert("❌ Error al ejecutar el reporte. Intenta más tarde.");
        }

    });
});