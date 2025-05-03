// Script para asegurar animación suave y efectos al pasar el cursor
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.tech-icons-track');
    const iconWrappers = document.querySelectorAll('.icon-wrapper');

    // Asegurar que la animación se reinicie suavemente
    track.addEventListener('animationiteration', function () {
        // Pequeño ajuste para asegurar transición suave
        requestAnimationFrame(function () {
            track.style.animationPlayState = 'running';
        });
    });

    // Pausar animación al pasar el cursor sobre cualquier icono
    iconWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function () {
            track.style.animationPlayState = 'paused';
        });

        wrapper.addEventListener('mouseleave', function () {
            // Solo reanudar si no hay otro icono con el cursor encima
            if (!document.querySelector('.icon-wrapper:hover')) {
                track.style.animationPlayState = 'running';
            }
        });

        // Para dispositivos táctiles - activar etiqueta en toque
        wrapper.addEventListener('touchstart', function (e) {
            // Prevenir el comportamiento predeterminado
            e.preventDefault();
            // Pausar la animación
            track.style.animationPlayState = 'paused';
            // Asegurar que todas las etiquetas estén ocultas primero
            document.querySelectorAll('.icon-label').forEach(label => {
                label.style.opacity = '0';
                label.style.visibility = 'hidden';
            });
            // Mostrar esta etiqueta
            const label = this.querySelector('.icon-label');
            label.style.opacity = '1';
            label.style.visibility = 'visible';
            label.style.transform = 'translateX(-50%) translateY(-5px)';
        });
    });

    // Para dispositivos táctiles - ocultar etiqueta al tocar fuera
    document.addEventListener('touchstart', function (e) {
        if (!e.target.closest('.icon-wrapper')) {
            document.querySelectorAll('.icon-label').forEach(label => {
                label.style.opacity = '0';
                label.style.visibility = 'hidden';
            });
            track.style.animationPlayState = 'running';
        }
    }, { passive: true});
});
