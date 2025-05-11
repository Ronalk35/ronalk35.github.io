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
  
  // Imprime la estructura HTML para depuración
  console.log("Estructura del banner de imágenes:", document.querySelector(".banner-images").innerHTML);
  
  // Estado inicial - verificar si ya hay una preferencia guardada
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  
  // Aplicar tema inicial
  if (isDarkMode) {
    applyDarkTheme();
    // Si hay un checkbox, actualizarlo
    if (themeSwitch.type === "checkbox") {
      themeSwitch.checked = true;
    }
  } else {
    applyLightTheme();
    // Si hay un checkbox, actualizarlo
    if (themeSwitch.type === "checkbox") {
      themeSwitch.checked = false;
    }
  }
  
  // Función para aplicar tema oscuro
  function applyDarkTheme() {
    console.log("Aplicando tema oscuro");
    
    // Remover clase light del body si existe
    body.classList.remove("light");
    
    // Aplicar directamente el color de fondo al body
    body.style.backgroundColor = "#1e213d";
    document.documentElement.style.backgroundColor = "#1e213d";
    
    // Actualizar todas las áreas con dark_bg
    darkBgElements.forEach((element) => {
      element.style.backgroundColor = "#000a1f";
    });
    
    // Actualizar todas las áreas con dark_bg_menu
    darkBgMenuElements.forEach((element) => {
      element.classList.remove("light_bg_menu");
      element.classList.add("dark_bg_menu");
    });
    
    // Enfoque radical: reemplazar toda la estructura de la imagen
    cambiarImagen(false);
    
    // Guardar preferencia
    localStorage.setItem("darkMode", "true");
  }

  // Función para aplicar tema claro
  function applyLightTheme() {
    console.log("Aplicando tema claro");
    
    // Añadir clase light al body
    body.classList.add("light");
    
    // Aplicar directamente el color de fondo al body
    body.style.backgroundColor = "#fef6e4";
    document.documentElement.style.backgroundColor = "#fef6e4";
    
    // Actualizar todas las áreas con dark_bg
    darkBgElements.forEach((element) => {
      element.style.backgroundColor = "#fef6e4";
    });
    
    // Actualizar todas las áreas con dark_bg_menu
    darkBgMenuElements.forEach((element) => {
      element.classList.remove("dark_bg_menu");
      element.classList.add("light_bg_menu");
    });
    
    // Enfoque radical: reemplazar toda la estructura de la imagen
    cambiarImagen(true);
    
    // Guardar preferencia
    localStorage.setItem("darkMode", "false");
  }
  
  // Función para cambiar radicalmente la imagen
  function cambiarImagen(modoClaro) {
    const bannerContainer = document.querySelector(".banner-images");
    if (!bannerContainer) {
      console.error("No se encontró el contenedor de la imagen");
      return;
    }
    
    console.log("Contenedor de banner encontrado, cambiando a modo:", modoClaro ? "claro" : "oscuro");
    
    // Timestamp para evitar caché
    const timestamp = new Date().getTime();
    
    // Rutas de imagen según el modo
    const pngSrc = modoClaro ? lightImagePng : darkImagePng;
    const webpSrc = modoClaro ? lightImageWebp : darkImageWebp;
    
    // Verificar si hay elementos dentro antes de intentar manipularlos
    const pictureElement = bannerContainer.querySelector("picture");
    
    if (pictureElement) {
      console.log("Elemento picture encontrado, actualizando su contenido");
      
      // Crear nueva estructura HTML
      const nuevoHTML = `
        <source srcset="${webpSrc}?t=${timestamp}" type="image/webp">
        <source srcset="${pngSrc}?t=${timestamp}" type="image/png">
        <img src="${webpSrc}?t=${timestamp}" alt="Ronald Urbano Chávez" width="400" height="400" loading="lazy" />
      `;
      
      // Reemplazar el contenido interno del elemento picture
      pictureElement.innerHTML = nuevoHTML;
      console.log("Contenido actualizado de picture:", pictureElement.innerHTML);
    } else {
      console.log("No se encontró elemento picture, creando uno nuevo");
      
      // Crear completamente nuevo elemento
      const nuevoHTML = `
        <picture>
          <source srcset="${webpSrc}?t=${timestamp}" type="image/webp">
          <source srcset="${pngSrc}?t=${timestamp}" type="image/png">
          <img src="${webpSrc}?t=${timestamp}" alt="Ronald Urbano Chávez" width="400" height="400" loading="lazy" />
        </picture>
      `;
      
      // Reemplazar todo el contenido del banner
      bannerContainer.innerHTML = nuevoHTML;
      console.log("Nuevo contenido del banner:", bannerContainer.innerHTML);
    }
  }
  
  // Función para reproducir el sonido
  function playSound() {
    switchSound.currentTime = 0;
    switchSound.play().catch((error) => {
      console.error("Error al reproducir el sonido:", error);
    });
  }
  
  // Función para alternar el tema
  function toggleTheme() {
    console.log("Alternando tema");
    
    const isDark = localStorage.getItem("darkMode") === "true";
    
    try {
      if (isDark) {
        applyLightTheme();
      } else {
        applyDarkTheme();
      }
      
      // Reproducir sonido
      playSound();
      
      // Forzar un reflow/repaint y verificar el resultado
      setTimeout(() => {
        const webpSrc = document.querySelector(".banner-images picture source[type='image/webp']");
        const pngSrc = document.querySelector(".banner-images picture source[type='image/png']");
        const imgElem = document.querySelector(".banner-images picture img");
        
        console.log("Después del cambio - WebP source:", webpSrc ? webpSrc.srcset : "no encontrado");
        console.log("Después del cambio - PNG source:", pngSrc ? pngSrc.srcset : "no encontrado");
        console.log("Después del cambio - IMG src:", imgElem ? imgElem.src : "no encontrado");
      }, 100);
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
  const webpSrc = document.querySelector(".banner-images picture source[type='image/webp']");
  const pngSrc = document.querySelector(".banner-images picture source[type='image/png']");
  const imgElem = document.querySelector(".banner-images picture img");
  
  console.log("Estado inicial - WebP source:", webpSrc ? webpSrc.srcset : "no encontrado");
  console.log("Estado inicial - PNG source:", pngSrc ? pngSrc.srcset : "no encontrado");
  console.log("Estado inicial - IMG src:", imgElem ? imgElem.src : "no encontrado");
});




