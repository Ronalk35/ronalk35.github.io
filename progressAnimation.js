window.addEventListener('scroll', () => {
    const progressBars = document.querySelectorAll('.progress__bar');

    progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect();
        
        // Verifica si la barra está visible en el viewport
        if (barPosition.top < window.innerHeight && barPosition.bottom >= 0) {
            const span = bar.querySelector('span');
            const point = bar.querySelector('.progress__point');
            let targetWidth;

            // Define el ancho objetivo basado en la clase de la barra
            if (bar.classList.contains('progress__wordpress')) {
                targetWidth = '100%';
            } else if (bar.classList.contains('progress__html')) {
                targetWidth = '85%';
            } else if (bar.classList.contains('progress__angular')) {
                targetWidth = '80%';
            } else if (bar.classList.contains('progress__reactJs')) {
                targetWidth = '95%';
            }

            // Establece el ancho correspondiente
            span.style.width = targetWidth;
            point.style.left = targetWidth; // Mueve el punto al ancho de la barra
            bar.classList.add('active'); // Activa la animación
        }
    });
});




modalImage.style.animation = 'rotate-scale-down 0.4s linear both'; // Directamente al abrir












