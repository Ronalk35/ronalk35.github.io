// Cambio de tema
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar el botón de cambio de tema
  const themeSwitch = document.getElementById("switch");

  // Verificar que el botón existe
  if (!themeSwitch) {
    console.error('No se encontró el elemento con ID "switch"');
    return;
  }

  // Crear el objeto de audio
  const switchSound = new Audio("assets/sound/switch.mp3");
  switchSound.volume = 0.2;

  // Elementos que necesitamos modificar
  const body = document.body;
  const darkBgElements = document.querySelectorAll(".dark_bg");
  const darkBgMenuElements = document.querySelectorAll(".dark_bg_menu");

  // Definir rutas de imagen (sin barra inicial para rutas relativas)
  const darkImagePng = "assets/img/ronald_portafolio.png";
  const darkImageWebp = "assets/img/ronald_portafolio.webp";
  const lightImagePng = "assets/img/ronald_portafolio_light.png";
  const lightImageWebp = "assets/img/ronald_portafolio_light.webp";

  // Definir colores para los temas
  const DARK_BG_COLOR = "#1e213d";
  const DARK_CONTENT_COLOR = "#000a1f";
  const LIGHT_BG_COLOR = "#fef6e4";

  // Duración de la transición en milisegundos
  const TRANSITION_DURATION = 1200;

  // Imprime la estructura HTML para depuración
  console.log(
    "Estructura del banner de imágenes:",
    document.querySelector(".banner-images").innerHTML
  );

  // Estado inicial - verificar si ya hay una preferencia guardada
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Agregar estilos CSS para la transición
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    body, .dark_bg, .dark_bg_menu, .light_bg_menu {
      transition: background-color ${TRANSITION_DURATION}ms ease;
    }
    .banner-images {
      transition: filter ${TRANSITION_DURATION}ms ease;
    }
  `;
  document.head.appendChild(styleElement);

  // Aplicar tema inicial
  if (isDarkMode) {
    applyDarkTheme(false); // Sin transición inicial
    // Si hay un checkbox, actualizarlo
    if (themeSwitch.type === "checkbox") {
      themeSwitch.checked = true;
    }
  } else {
    applyLightTheme(false); // Sin transición inicial
    // Si hay un checkbox, actualizarlo
    if (themeSwitch.type === "checkbox") {
      themeSwitch.checked = false;
    }
  }

  // Función para aplicar tema oscuro
  function applyDarkTheme(withTransition = true) {
    console.log("Aplicando tema oscuro");

    // Remover clase light del body si existe
    body.classList.remove("light");

    // Aplicar directamente el color de fondo al body
    body.style.backgroundColor = DARK_BG_COLOR;
    document.documentElement.style.backgroundColor = DARK_BG_COLOR;

    // Actualizar todas las áreas con dark_bg
    darkBgElements.forEach((element) => {
      element.style.backgroundColor = DARK_CONTENT_COLOR;
    });

    // Actualizar todas las áreas con dark_bg_menu
    darkBgMenuElements.forEach((element) => {
      element.classList.remove("light_bg_menu");
      element.classList.add("dark_bg_menu");
    });

    // Cambiar la imagen al mismo tiempo que los colores
    // para una transición simultánea
    cambiarImagen(false);

    // Guardar preferencia
    localStorage.setItem("darkMode", "true");
  }

  // Función para aplicar tema claro
  function applyLightTheme(withTransition = true) {
    console.log("Aplicando tema claro");

    // Añadir clase light al body
    body.classList.add("light");

    // Aplicar directamente el color de fondo al body
    body.style.backgroundColor = LIGHT_BG_COLOR;
    document.documentElement.style.backgroundColor = LIGHT_BG_COLOR;

    // Actualizar todas las áreas con dark_bg
    darkBgElements.forEach((element) => {
      element.style.backgroundColor = LIGHT_BG_COLOR;
    });

    // Actualizar todas las áreas con dark_bg_menu
    darkBgMenuElements.forEach((element) => {
      element.classList.remove("dark_bg_menu");
      element.classList.add("light_bg_menu");
    });

    // Cambiar la imagen al mismo tiempo que los colores
    // para una transición simultánea
    cambiarImagen(true);

    // Guardar preferencia
    localStorage.setItem("darkMode", "false");
  }

  // Función simplificada para cambiar la imagen con transición suave
  function cambiarImagen(modoClaro) {
    const bannerContainer = document.querySelector(".banner-images");
    if (!bannerContainer) {
      console.error("No se encontró el contenedor de la imagen");
      return;
    }

    console.log("Cambiando imagen a modo:", modoClaro ? "claro" : "oscuro");

    // Timestamp para evitar caché
    const timestamp = new Date().getTime();

    // Rutas de imagen según el modo
    const pngSrc = modoClaro ? lightImagePng : darkImagePng;
    const webpSrc = modoClaro ? lightImageWebp : darkImageWebp;

    // Método simple y confiable: solo reemplazar el HTML
    // sin intentar hacer efectos complicados de transición
    const nuevoHTML = `
      <picture>
        <source srcset="${webpSrc}?t=${timestamp}" type="image/webp">
        <source srcset="${pngSrc}?t=${timestamp}" type="image/png">
        <img src="${webpSrc}?t=${timestamp}" alt="Ronald Urbano Chávez" width="400" height="400" loading="lazy" />
      </picture>
    `;

    bannerContainer.innerHTML = nuevoHTML;

    console.log("Imagen actualizada correctamente");
  }

  // Función para reproducir el sonido
  function playSound() {
    switchSound.currentTime = 0;
    switchSound.play().catch((error) => {
      console.error("Error al reproducir el sonido:", error);
    });
  }

  // Función para alternar el tema con un pequeño retraso para el cambio de imagen
  function toggleTheme() {
    console.log("Alternando tema");

    const isDark = localStorage.getItem("darkMode") === "true";

    try {
      // Reproducir sonido
      playSound();

      // Guardar el estado del tema inmediatamente para evitar clics múltiples
      localStorage.setItem("darkMode", isDark ? "false" : "true");

      // Aplicar los cambios de color de fondo con una pequeña diferencia temporal
      if (isDark) {
        // Primero cambiar los colores
        body.classList.add("light");
        body.style.backgroundColor = LIGHT_BG_COLOR;
        document.documentElement.style.backgroundColor = LIGHT_BG_COLOR;

        darkBgElements.forEach((element) => {
          element.style.backgroundColor = LIGHT_BG_COLOR;
        });

        darkBgMenuElements.forEach((element) => {
          element.classList.remove("dark_bg_menu");
          element.classList.add("light_bg_menu");
        });

        // Pequeño retraso antes de cambiar la imagen
        setTimeout(() => {
          cambiarImagen(true);
        }, 100);
      } else {
        // Primero cambiar los colores
        body.classList.remove("light");
        body.style.backgroundColor = DARK_BG_COLOR;
        document.documentElement.style.backgroundColor = DARK_BG_COLOR;

        darkBgElements.forEach((element) => {
          element.style.backgroundColor = DARK_CONTENT_COLOR;
        });

        darkBgMenuElements.forEach((element) => {
          element.classList.remove("light_bg_menu");
          element.classList.add("dark_bg_menu");
        });

        // Pequeño retraso antes de cambiar la imagen
        setTimeout(() => {
          cambiarImagen(false);
        }, 100);
      }

      // Verificar el resultado después de la transición
      setTimeout(() => {
        const webpSrc = document.querySelector(
          ".banner-images picture source[type='image/webp']"
        );
        const pngSrc = document.querySelector(
          ".banner-images picture source[type='image/png']"
        );
        const imgElem = document.querySelector(".banner-images picture img");

        console.log(
          "Después del cambio - WebP source:",
          webpSrc ? webpSrc.srcset : "no encontrado"
        );
        console.log(
          "Después del cambio - PNG source:",
          pngSrc ? pngSrc.srcset : "no encontrado"
        );
        console.log(
          "Después del cambio - IMG src:",
          imgElem ? imgElem.src : "no encontrado"
        );
      }, TRANSITION_DURATION + 100);
    } catch (error) {
      console.error("Error al cambiar el tema:", error);
    }
  }

  // Eventos para el interruptor
  themeSwitch.addEventListener("change", toggleTheme);
  themeSwitch.addEventListener("click", function () {
    console.log("Botón clicado - estado:", themeSwitch.checked);
  });

  // Depuración inicial
  console.log("Estado inicial del tema:", localStorage.getItem("darkMode"));

  // Verificar elementos iniciales
  const webpSrc = document.querySelector(
    ".banner-images picture source[type='image/webp']"
  );
  const pngSrc = document.querySelector(
    ".banner-images picture source[type='image/png']"
  );
  const imgElem = document.querySelector(".banner-images picture img");

  console.log(
    "Estado inicial - WebP source:",
    webpSrc ? webpSrc.srcset : "no encontrado"
  );
  console.log(
    "Estado inicial - PNG source:",
    pngSrc ? pngSrc.srcset : "no encontrado"
  );
  console.log(
    "Estado inicial - IMG src:",
    imgElem ? imgElem.src : "no encontrado"
  );
});



