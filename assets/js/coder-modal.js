// Modal completo actualizado
document.addEventListener("DOMContentLoaded", function () {
  // 1. ESTRUCTURA HTML DEL MODAL
  const modalHTML = `
    <div class="coder-modal-container">
      <div id="coderModal" class="coder-modal">
        <div class="coder-modal-content">
          <div class="coder-profile">
            <img src="assets/img/ronald_portafolio.png" alt="Ronald Urbano Chávez" class="profile-img">
            <h3 class="profile-name">Ronald Urbano Chávez</h3>
          </div>
          
          <div class="code-window">
            <div class="code-titlebar">
              <div class="window-buttons">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
            </div>
            <div class="code-content">
              <pre><code><span class="const">const</span> <span class="var-name">coder</span> = {
  <span class="property">name</span>: <span class="string">'Ronald Urbano Chávez'</span>,
  <span class="property">skills</span>: [<span class="string">'Html'</span>, <span class="string">'CSS'</span>, <span class="string">'Javascript'</span>,
            <span class="string">'Java'</span>, <span class="string">'Python'</span>, <span class="string">'SQL Server'</span>,
            <span class="string">'Power BI'</span>, <span class="string">'Excel'</span>, <span class="string">'MySql'</span>, 
            <span class="string">'Bootstrap',</span> <span class="string">'Azure'</span>],
  <span class="property">hardWorker</span>: <span class="boolean">true</span>,
  <span class="property">quickLearner</span>: <span class="boolean">true</span>,
  <span class="property">problemSolver</span>: <span class="boolean">true</span>,
  <span class="property">hireable</span>: <span class="keyword">function</span>() {
    <span class="keyword">return</span> (
      <span class="this">this</span>.<span class="property">hardWorker</span> &&
      <span class="this">this</span>.<span class="property">problemSolver</span> &&
      <span class="this">this</span>.<span class="property">skills</span>.<span class="property">length</span> >= 5
    );
  }
};</code></pre>
            </div>
          </div>
          
          <div class="close-btn-container">
            <button class="close-btn" id="closeCoderModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 2. ESTILOS CSS DEL MODAL
  const modalStyles = `
    .coder-modal-container {
      display: none;
    }
    
    @media (max-width: 991px) {
      .coder-modal-container {
        display: block;
      }
    }
    
    .coder-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 9999;
      overflow-y: auto;
    }
    
    /* Animación de entrada del modal */
    .modal-open {
      animation: fadeIn 0.5s ease forwards;
    }
    
    /* Animación de salida del modal */
    .modal-close {
      animation: fadeOut 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
      from { 
        opacity: 0; 
        transform: translateY(-20px);
      }
      to { 
        opacity: 1; 
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOut {
      from { 
        opacity: 1; 
        transform: translateY(0);
      }
      to { 
        opacity: 0; 
        transform: translateY(-20px);
      }
    }.coder-modal-content {
      position: relative;
      width: 90%;
      max-width: 500px;
      margin: 60px auto 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: slideIn 0.6s ease;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .coder-profile {
      text-align: center;
      margin-bottom: 15px; 
    }
    
    .profile-img {
      width: 90px; 
      height: 90px; 
      border-radius: 50%;
      border: 2px solid #00bfff;
      object-fit: cover;
      box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
    }
    
    .profile-name {
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-top: 15px;
      text-shadow: 0 2px 10px rgba(0, 191, 255, 0.3);
      position: relative;
      padding-bottom: 8px;
      font-family: 'Poppins', 'Segoe UI', sans-serif;
    }
    
    .profile-name::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 240px;
      height: 2px;
      background: linear-gradient(90deg, rgba(0,132,255,0.2) 0%, rgba(0,191,255,0.8) 50%, rgba(0,132,255,0.2) 100%);
      border-radius: 2px;
    }
    
    .code-window {
      width: 100%;
      background: #000a1f;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
      transform-origin: center top;
      animation: scaleIn 0.4s ease 0.2s both;
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .code-titlebar {
      background: #292a3a;
      height: 25px; 
      padding: 0 12px; 
      display: flex;
      align-items: center;
    }
    
    .window-buttons {
      display: flex;
      gap: 6px; 
    }.dot {
      width: 10px; 
      height: 10px; 
      border-radius: 50%;
    }
    
    .red { background-color: #ff5f56; }
    .yellow { background-color: #ffbd2e; }
    .green { background-color: #27c93f; }
    
    .code-content {
      padding: 15px; 
      overflow-x: auto;
    }
    
    .code-content code {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
      font-size: 12px; 
      line-height: 1.4;
      color: #e4e4e4;
    }
    
    .code-content pre {
      margin: 0;
    }
    
    /* Colores de sintaxis para el código */
    .const { color: #ff79c6; }
    .var-name { color: #8be9fd; }
    .property { color: #50fa7b; }
    .string { color: #f1fa8c; }
    .boolean { color: #bd93f9; }
    .keyword { color: #ff79c6; }
    .this { color: #bd93f9; }

    .close-btn-container {
      display: flex;
      justify-content: center;
      margin-top: -20px; 
      position: relative;
      z-index: 10;
      animation: fadeInBtn 0.4s ease 0.4s both;
    }
    
    @keyframes fadeInBtn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .close-btn {
      width: 40px; 
      height: 40px; 
      border-radius: 50%;
      background: #0056b3;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 1.2rem; 
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }
    
    .close-btn:hover {
      background: #1a75d1;
      transform: scale(1.1);
    }
    
    
    @media (max-width: 991px) {
      .nav-disabled {
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
    }
    
    
    @media (max-width: 375px) {
      .profile-img {
        width: 70px;
        height: 70px;
      }
      
      .profile-name {
        font-size: 1rem;
      }
      
      .code-content code {
        font-size: 11px;
      }
      
      .coder-modal-content {
        margin-top: 60px;
      }
    }
  `; // 3. INSERTAR HTML Y CSS EN EL DOCUMENTO
  // Crear e insertar el contenedor del modal
  const modalContainer = document.createElement("div");
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer.firstElementChild);

  // Crear e insertar los estilos
  const styleElement = document.createElement("style");
  styleElement.textContent = modalStyles;
  document.head.appendChild(styleElement);

  // 4. AGREGAR LA FUNCIONALIDAD JAVASCRIPT
  const laptopCodeIcon = document.querySelector(".fa-laptop-code");
  const coderModal = document.getElementById("coderModal");
  const closeBtn = document.getElementById("closeCoderModal");
  const mainNav = document.querySelector(".navbar");

  // Crear el objeto de audio
  const switchSound = new Audio("assets/sound/resume.mp3");
  switchSound.volume = 0.2;

  if (laptopCodeIcon && coderModal && closeBtn) {
    // Función para desactivar la navegación (solo en móvil y tablet)
    const disableNavigation = () => {
      if (mainNav && window.innerWidth <= 991) {
        mainNav.classList.add("nav-disabled");
      }
    };

    // Función para activar la navegación (solo en móvil y tablet)
    const enableNavigation = () => {
      if (mainNav && window.innerWidth <= 991) {
        mainNav.classList.remove("nav-disabled");
      }
    };

    // Evento para abrir el modal al hacer clic en el icono
    laptopCodeIcon.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // Reproducir sonido al abrir el modal
      switchSound.play();
      coderModal.style.display = "block";
      // Agregar clase para animación de apertura
      setTimeout(() => {
        coderModal.classList.add("modal-open");
      }, 10);
      document.body.style.overflow = "hidden"; // Evitar scroll del body
      disableNavigation(); // Desactivar la navegación
    });

    // Evento para cerrar el modal al hacer clic en el botón X
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // Reproducir sonido al cerrar el modal
      switchSound.play();

      // Agregar clase para animación de cierre
      coderModal.classList.remove("modal-open");
      coderModal.classList.add("modal-close"); // Esperar a que termine
      setTimeout(() => {
        coderModal.style.display = "none";
        coderModal.classList.remove("modal-close");
        document.body.style.overflow = ""; // Restaurar scroll del body
        enableNavigation(); // Activar la navegación
      }, 500); // Igual al tiempo de la animación fadeOut
    });

    // Cerrar el modal al hacer clic fuera de él
    coderModal.addEventListener("click", function (event) {
      // Verificar que el clic fue directamente en el fondo del modal y no en su contenido
      if (event.target === coderModal) {
        // Reproducir sonido al cerrar el modal
        switchSound.play();

        // Agregar clase para animación de cierre
        coderModal.classList.remove("modal-open");
        coderModal.classList.add("modal-close");

        // Esperar a que termine la animación
        setTimeout(() => {
          coderModal.style.display = "none";
          coderModal.classList.remove("modal-close");
          document.body.style.overflow = ""; // Restaurar scroll del body
          enableNavigation(); // Activar la navegación
        }, 500); // Igual al tiempo de la animación fadeOut
      }
    });

    // Mejorar el cierre táctil para dispositivos móviles
    coderModal.addEventListener("touchstart", function (event) {
      if (event.target === coderModal) {
        // Reproducir sonido al cerrar el modal con toque táctil
        switchSound.play();

        // Agregar clase para animación de cierre
        coderModal.classList.remove("modal-open");
        coderModal.classList.add("modal-close");

        // Esperar a que termine la animación antes de ocultar completamente
        setTimeout(() => {
          coderModal.style.display = "none";
          coderModal.classList.remove("modal-close");
          document.body.style.overflow = "";
          enableNavigation(); // Activar la navegación
        }, 500); // Igual al tiempo de la animación fadeOut
      }
    });
  }
});
