// Crear elementos del modal
function createModalElements() {
    // Contenedor principal del modal
    const modalContainer = document.createElement('div');
    modalContainer.id = 'imageModal';
    modalContainer.className = 'modal-container';
    
    // Contenido del modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content rotate-scale-down';
    
    // Botón de cierre
    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    
    // Imagen dentro del modal
    const modalImage = document.createElement('img');
    modalImage.id = 'modalImage';
    modalImage.className = 'modal-image';
    
    // Información del proyecto
    const projectInfo = document.createElement('div');
    projectInfo.className = 'project-info';
    
    // Título del proyecto
    const projectTitle = document.createElement('h3');
    projectTitle.id = 'modalTitle';
    
    // Descripción del proyecto
    const projectDescription = document.createElement('p');
    projectDescription.id = 'modalDescription';
    
    // Enlace al proyecto
    const projectLink = document.createElement('a');
    projectLink.id = 'modalLink';
    projectLink.className = 'btn blog_btn btn-secondary';
    projectLink.target = '_blank';
    projectLink.textContent = 'Revisar Proyecto';
    
    // Armar estructura del modal
    projectInfo.appendChild(projectTitle);
    projectInfo.appendChild(projectDescription);
    projectInfo.appendChild(projectLink);
    
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(projectInfo);
    
    modalContainer.appendChild(modalContent);
    
    return modalContainer;
  }
  
  // Agregar estilos CSS
  function addModalStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
      .modal-container {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.9);
        padding: 20px;
        box-sizing: border-box;
      }
      
      .modal-content {
        position: relative;
        background-color: #1e293b;
        margin: auto;
        padding: 20px;
        border-radius: 8px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow: auto;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
      
      .close-button {
        position: absolute;
        top: 1px;
        right: 3px;
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10;
        transition: color 0.3s;
      }
      
      .close-button:hover {
        color: red;
      }
      
      .modal-image {
        width: 100%;
        max-height: 60vh;
        object-fit: contain;
        margin-bottom: 15px;
        border-radius: 4px;
      }
      
      .project-info {
        margin-top: 15px;
      }
      
      .project-info h3 {
        margin-top: 0;
        color: #fff;
        margin-bottom: 10px;
      }
      
      .project-info p {
        margin-bottom: 15px;
        color: #fff;
      }
      
      /* Animación rotate-scale-down */
      @keyframes rotate-scale-down {
        0% {
          transform: scale(0) rotateZ(-180deg);
          opacity: 0;
        }
        100% {
          transform: scale(1) rotateZ(0);
          opacity: 1;
        }
      }
      
      .rotate-scale-down {
        animation: rotate-scale-down 0.4s ease-out;
      }
      
      /* Estilos responsivos */
      @media screen and (max-width: 768px) {
        .modal-content {
          width: 95%;
          padding: 15px;
        }
        
        .modal-image {
          max-height: 50vh;
        }
      }
      
      @media screen and (max-width: 480px) {
        .modal-content {
          padding: 10px;
        }
        
        .close-button {
          top: 7px;
          right: 10px;
          font-size: 24px;
        }

        .project-info h3 {
    font-size: 18px; 
  }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Función principal para inicializar el modal
  function initImageModal() {
    // Agregar elementos del modal al DOM
    const modalElement = createModalElements();
    document.body.appendChild(modalElement);
    
    // Agregar estilos CSS
    addModalStyles();
    
    // Obtener todos los contenedores de imágenes de proyectos
    const projectImages = document.querySelectorAll('.blog-image a');
    
    // Modal y elementos relacionados
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    
    // Agregar event listeners a cada imagen
    projectImages.forEach(imageLink => {
      imageLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtener la imagen y su información
        const img = this.querySelector('img');
        const blogInfo = this.closest('.blog-thumb').querySelector('.blog-info');
        const title = blogInfo.querySelector('h4').textContent;
        const description = blogInfo.querySelector('p').textContent;
        const projectLink = blogInfo.querySelector('.btn').getAttribute('href');
        
        // Actualizar el modal con la información del proyecto
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = projectLink;
        
        // Mostrar el modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
      });
    });
    
    // Cerrar modal al hacer clic en el botón X
    closeBtn.addEventListener('click', function() {
      closeModal();
    });
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
    
    // Función para cerrar el modal
    function closeModal() {
      document.getElementById('imageModal').style.display = 'none';
      document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
    
    // Observer para detectar nuevos proyectos agregados dinámicamente
    const observerConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Verificar si se agregaron nuevos proyectos
          const newProjectImages = document.querySelectorAll('.blog-image a:not([data-modal-initialized])');
          
          if (newProjectImages.length > 0) {
            // Agregar event listeners a las nuevas imágenes
            newProjectImages.forEach(imageLink => {
              imageLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                const img = this.querySelector('img');
                const blogInfo = this.closest('.blog-thumb').querySelector('.blog-info');
                const title = blogInfo.querySelector('h4').textContent;
                const description = blogInfo.querySelector('p').textContent;
                const projectLink = blogInfo.querySelector('.btn').getAttribute('href');
                
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modalLink.href = projectLink;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
              });
              
              // Marcar como inicializado
              imageLink.setAttribute('data-modal-initialized', 'true');
            });
          }
        }
      });
    });
    
    // Iniciar observación del contenedor de proyectos
    observer.observe(document.querySelector('.blog-area'), observerConfig);
  }
  
  // Inicializar el modal cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', initImageModal);
