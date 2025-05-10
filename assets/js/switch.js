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
  const darkImagePath = "assets/img/ronald_portafolio.png";
  const lightImagePath = "assets/img/ronald_portafolio_light.png";
  
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
    
    // Cambiar la imagen a la versión oscura
    const profileImage = document.querySelector(".banner-images img");
    if (profileImage) {
      // Añadimos un timestamp para evitar el caché
      const timestamp = new Date().getTime();
      profileImage.src = `${darkImagePath}?t=${timestamp}`;
      console.log("Imagen cambiada a tema oscuro:", profileImage.src);
    } else {
      console.error(
        "No se encontró la imagen de perfil para cambiar al tema oscuro"
      );
    }
    
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
    
    // Cambiar la imagen a la versión clara
    const profileImage = document.querySelector(".banner-images img");
    if (profileImage) {
      // Añadimos un timestamp para evitar el caché
      const timestamp = new Date().getTime();
      profileImage.src = `${lightImagePath}?t=${timestamp}`;
      console.log("Imagen cambiada a tema claro:", profileImage.src);
    } else {
      console.error(
        "No se encontró la imagen de perfil para cambiar al tema claro"
      );
    }
    
    // Guardar preferencia
    localStorage.setItem("darkMode", "false");
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
      
      // Forzar un reflow/repaint
      setTimeout(() => {
        // Verificar si el cambio de imagen se aplicó correctamente
        const currentImage = document.querySelector(".banner-images img");
        if (currentImage) {
          console.log("Imagen actual después del cambio:", currentImage.src);
        }
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
  
  // Depuración
  console.log("Estado inicial:", localStorage.getItem("darkMode"));
});



