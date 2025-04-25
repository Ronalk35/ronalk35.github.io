// Importar DotLottie
import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

// Variables globales
let animationInstance = null;
let isScrolling = false;
let scrollTimeout = null;
let frameCapture = null;
let originalCanvas = null;

// Función para inicializar la animación
function initializeAnimation() {
  const canvasContainer = document.querySelector(".canvas-wrapper");
  if (!canvasContainer) return;

  // Remover canvas anterior si existe
  const existingCanvas = document.getElementById("laptop-canvas");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // Crear nuevo canvas
  originalCanvas = document.createElement("canvas");
  originalCanvas.id = "laptop-canvas";

  // Configurar tamaño según el dispositivo
  if (window.innerWidth <= 767) {
    // Móviles
    originalCanvas.width = 200;
    originalCanvas.height = 200;
  } else if (window.innerWidth <= 991) {
    // Tablets
    originalCanvas.width = 250;
    originalCanvas.height = 250;
  } else {
    // Desktop
    originalCanvas.width = 300;
    originalCanvas.height = 300;
  }

  // Aplicar estilos
  originalCanvas.style.maxWidth = "100%";
  originalCanvas.style.margin = "0 auto";
  originalCanvas.style.borderRadius = "20px";

  // Agregar al DOM
  canvasContainer.appendChild(originalCanvas);

  // Limpiar instancia anterior
  if (animationInstance) {
    try {
      animationInstance.destroy();
    } catch (err) {
      console.warn("Error al destruir la animación:", err);
    }
    animationInstance = null;
  }

  // Crear nueva instancia
  animationInstance = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: originalCanvas,
    src: "https://lottie.host/41c9a497-0582-4e09-99d4-0cc8bdc2f940/IA0GH0ClMj.lottie",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      clearCanvas: false,
    },
  });
}

// Capturar un fotograma de la animación
function captureFrame() {
  if (!originalCanvas) return;

  // Crear una imagen estática basada en el canvas actual
  frameCapture = document.createElement("img");
  frameCapture.src = originalCanvas.toDataURL("image/png");
  frameCapture.style.position = "absolute";
  frameCapture.style.top = "0";
  frameCapture.style.left = "0";
  frameCapture.style.width = "100%";
  frameCapture.style.height = "100%";
  frameCapture.style.borderRadius = "20px";
  frameCapture.style.zIndex = "10";

  // Añadir la imagen capturada sobre el canvas
  originalCanvas.parentElement.style.position = "relative";
  originalCanvas.parentElement.appendChild(frameCapture);
}

// Remover la captura de imagen
function removeCapture() {
  if (frameCapture && frameCapture.parentElement) {
    frameCapture.parentElement.removeChild(frameCapture);
    frameCapture = null;
  }
}

// Función debounce para optimizar los eventos
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

// Inicializar una vez que el documento esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar con un ligero retraso
  setTimeout(initializeAnimation, 100);

  // Manejar evento de redimensionamiento
  window.addEventListener(
    "resize",
    debounce(function () {
      if (!isScrolling) {
        initializeAnimation();
      }
    }, 300)
  );

  // Manejar evento de cambio de visibilidad
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      if (!isScrolling) {
        setTimeout(initializeAnimation, 100);
      }
    }
  });

  // Manejar scroll para dispositivos móviles
  window.addEventListener(
    "scroll",
    function () {
      // Solo aplicar técnica anti-parpadeo en móviles
      if (window.innerWidth <= 767) {
        // Cancelar cualquier temporizador previo
        clearTimeout(scrollTimeout);

        // Si empezamos a hacer scroll y no hay captura, crearla
        if (!isScrolling && !frameCapture) {
          isScrolling = true;
          captureFrame();
        }

        // Configurar temporizador para detectar cuando el scroll se detiene
        scrollTimeout = setTimeout(function () {
          isScrolling = false;
          removeCapture();
        }, 300);
      }
    },
    { passive: true }
  );

  // Detectar toques en pantalla para mejor respuesta en móviles
  document.addEventListener(
    "touchstart",
    function () {
      if (window.innerWidth <= 767 && !frameCapture) {
        captureFrame();
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    function () {
      setTimeout(function () {
        removeCapture();
      }, 300);
    },
    { passive: true }
  );
});
