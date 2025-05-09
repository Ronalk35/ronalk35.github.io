// Esperar a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Crear el objeto una sola vez
  const clickSound = new Audio("assets/sound/nav.mp3");
  clickSound.volume = 0.1;

  // Obtener el botón del navbar
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Verificar si el dispositivo es móvil o tablet
  const isMobileOrTablet = window.matchMedia("(max-width: 768px)").matches;

  // Función para reproducir el sonido
  function playClickSound() {
    // Resetear el audio en caso de clics rápidos
    clickSound.currentTime = 0;

    // Reproducir el sonido
    clickSound.play().catch((error) => {
      // Manejar posibles errores
      console.log("Error al reproducir el sonido:", error);
    });
  }

  // Añadir el evento de clic al botón del navbar
  if (navbarToggler && isMobileOrTablet) {
    navbarToggler.addEventListener("click", playClickSound);
  }

  // Actualizar el listener si cambia el tamaño de la ventana
  window.addEventListener("resize", function () {
    const isMobileOrTabletNow = window.matchMedia("(max-width: 768px)").matches;

    // Solo añadir/quitar el listener si el estado ha cambiado
    if (isMobileOrTabletNow && !isMobileOrTablet) {
      navbarToggler.addEventListener("click", playClickSound);
    } else if (!isMobileOrTabletNow && isMobileOrTablet) {
      navbarToggler.removeEventListener("click", playClickSound);
    }
  });
});
