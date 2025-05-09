// Cambio de tema
document.addEventListener('DOMContentLoaded', function() {
   // Seleccionar el botón de cambio de tema
   const themeSwitch = document.getElementById('switch');
   
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
   const darkBgElements = document.querySelectorAll('.dark_bg');
   const darkBgMenuElements = document.querySelectorAll('.dark_bg_menu');
   
   // Rutas COMPLETAS de imágenes (ajustar según tu repositorio de GitHub)
   // Obtener la URL base del sitio
   const baseUrl = window.location.origin;
   // Definir las rutas completas
   const darkImagePath = baseUrl + "/assets/img/ronald_portafolio.png";
   const lightImagePath = baseUrl + "/assets/img/ronald_portafolio_light.png";
   
   console.log('URL base:', baseUrl);
   console.log('Ruta imagen oscura:', darkImagePath);
   console.log('Ruta imagen clara:', lightImagePath);
   
   // Estado inicial - verificar si ya hay una preferencia guardada
   const isDarkMode = localStorage.getItem('darkMode') === 'true';
   
   // Aplicar tema inicial antes de que se complete la carga de la página
   window.addEventListener('load', function() {
       console.log('Página completamente cargada, verificando imágenes');
       
       // Verificar las URL de las imágenes
       const profileImage = document.querySelector('.banner-images img');
       if (profileImage) {
           console.log('Imagen actual al cargar:', profileImage.src);
           
           // Comprobar si la imagen se cargó correctamente
           if (!profileImage.complete || profileImage.naturalHeight === 0) {
               console.warn('La imagen no se cargó correctamente, intentando recargar');
               
               // Forzar la recarga de la imagen correspondiente al tema actual
               const isDark = localStorage.getItem('darkMode') === 'true';
               if (isDark) {
                   setTimeout(applyDarkTheme, 200);
               } else {
                   setTimeout(applyLightTheme, 200);
               }
           }
       }
   });
   
   // Aplicar tema inicial
   if (isDarkMode) {
       applyDarkTheme();
       // Si hay un checkbox, actualizarlo
       if (themeSwitch.type === 'checkbox') {
           themeSwitch.checked = true;
       }
   } else {
       applyLightTheme();
       // Si hay un checkbox, actualizarlo
       if (themeSwitch.type === 'checkbox') {
           themeSwitch.checked = false;
       }
   }
   
   // Función para aplicar tema oscuro
   function applyDarkTheme() {
       console.log('Aplicando tema oscuro');
       
       // Remover clase light del body si existe
       body.classList.remove('light');
       
       // Aplicar directamente el color de fondo al body
       body.style.backgroundColor = '#1e213d';
       document.documentElement.style.backgroundColor = '#1e213d';
       
       // Actualizar todas las áreas con dark_bg
       darkBgElements.forEach(element => {
           element.style.backgroundColor = '#000a1f';
       });
       
       // Actualizar todas las áreas con dark_bg_menu
       darkBgMenuElements.forEach(element => {
           element.classList.remove('light_bg_menu');
           element.classList.add('dark_bg_menu');
       });
       
       // Cambiar la imagen a la versión oscura usando enfoque más agresivo
       try {
           const profileImage = document.querySelector('.banner-images img');
           if (profileImage) {
               // Crear una nueva imagen para evitar problemas de caché
               const newImage = new Image();
               newImage.onload = function() {
                   console.log('Nueva imagen oscura cargada correctamente');
                   
                   // Reemplazar atributos de la imagen existente
                   profileImage.src = newImage.src;
                   profileImage.alt = "Ronald Urbano Chávez - Tema Oscuro";
                   
                   // Forzar repintado
                   profileImage.style.display = 'none';
                   setTimeout(() => {
                       profileImage.style.display = '';
                       console.log('Imagen oscura aplicada y visible');
                   }, 50);
               };
               
               // Manejar errores de carga
               newImage.onerror = function() {
                   console.error('Error al cargar la imagen oscura:', darkImagePath);
               };
               
               // Iniciar carga con timestamp para evitar caché
               const timestamp = new Date().getTime();
               newImage.src = `${darkImagePath}?t=${timestamp}`;
               console.log('Intentando cargar imagen oscura:', newImage.src);
           } else {
               console.error('No se encontró la imagen de perfil para cambiar al tema oscuro');
           }
       } catch (error) {
           console.error('Error al cambiar imagen a tema oscuro:', error);
       }
       
       // Guardar preferencia
       localStorage.setItem('darkMode', 'true');
   }
   
   // Función para aplicar tema claro
   function applyLightTheme() {
       console.log('Aplicando tema claro');
       
       // Añadir clase light al body
       body.classList.add('light');
       
       // Aplicar directamente el color de fondo al body
       body.style.backgroundColor = '#fef6e4';
       document.documentElement.style.backgroundColor = '#fef6e4';
       
       // Actualizar todas las áreas con dark_bg
       darkBgElements.forEach(element => {
           element.style.backgroundColor = '#fef6e4';
       });
       
       // Actualizar todas las áreas con dark_bg_menu
       darkBgMenuElements.forEach(element => {
           element.classList.remove('dark_bg_menu');
           element.classList.add('light_bg_menu');
       });
       
       // Cambiar la imagen a la versión clara usando enfoque más agresivo
       try {
           const profileImage = document.querySelector('.banner-images img');
           if (profileImage) {
               // Crear una nueva imagen para evitar problemas de caché
               const newImage = new Image();
               newImage.onload = function() {
                   console.log('Nueva imagen clara cargada correctamente');
                   
                   // Reemplazar atributos de la imagen existente
                   profileImage.src = newImage.src;
                   profileImage.alt = "Ronald Urbano Chávez - Tema Claro";
                   
                   // Forzar repintado
                   profileImage.style.display = 'none';
                   setTimeout(() => {
                       profileImage.style.display = '';
                       console.log('Imagen clara aplicada y visible');
                   }, 50);
               };
               
               // Manejar errores de carga
               newImage.onerror = function() {
                   console.error('Error al cargar la imagen clara:', lightImagePath);
               };
               
               // Iniciar carga con timestamp para evitar caché
               const timestamp = new Date().getTime();
               newImage.src = `${lightImagePath}?t=${timestamp}`;
               console.log('Intentando cargar imagen clara:', newImage.src);
           } else {
               console.error('No se encontró la imagen de perfil para cambiar al tema claro');
           }
       } catch (error) {
           console.error('Error al cambiar imagen a tema claro:', error);
       }
       
       // Guardar preferencia
       localStorage.setItem('darkMode', 'false');
   }
   
   // Función para reproducir el sonido
   function playSound() {
       switchSound.currentTime = 0;
       switchSound.play().catch(error => {
           console.error('Error al reproducir el sonido:', error);
       });
   }
   
   // Función para alternar el tema
   function toggleTheme() {
       console.log('Alternando tema');
       
       const isDark = localStorage.getItem('darkMode') === 'true';
       
       try {
           if (isDark) {
               applyLightTheme();
           } else {
               applyDarkTheme();
           }
           
           // Reproducir sonido
           playSound();
           
           // Forzar un reflow/repaint para asegurarnos de que los cambios se apliquen
           setTimeout(() => {
               // Verificar si el cambio de imagen se aplicó correctamente
               const currentImage = document.querySelector('.banner-images img');
               if (currentImage) {
                   console.log('Imagen actual después del cambio:', currentImage.src);
               }
           }, 100);
       } catch (error) {
           console.error('Error al cambiar el tema:', error);
       }
   }
   
   // Eventos para el interruptor
   themeSwitch.addEventListener('change', toggleTheme);
   themeSwitch.addEventListener('click', function() {
       console.log('Botón clicado - estado:', themeSwitch.checked);
   });
   
   // Depuración
   console.log('Estado inicial:', localStorage.getItem('darkMode'));
});


