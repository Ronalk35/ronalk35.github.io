// Cargar Firebase de forma asíncrona y sin bloquear la renderización de la página
async function initVisitorCounter() {
  try {
    // Solo intentar cargar Firebase después de que el contenido principal esté disponible
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js");
    const { getFirestore, doc, getDoc, setDoc, updateDoc, increment } = 
      await import("https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js");
    
    // Configuración de Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDQ9VBIYN0XnC15v7XIWYQtlGYVXKzVsiI",
      authDomain: "visitor-counter-6c9d9.firebaseapp.com",
      projectId: "visitor-counter-6c9d9",
      storageBucket: "visitor-counter-6c9d9.firebasestorage.app",
      messagingSenderId: "383757764246",
      appId: "1:383757764246:web:c7ddb697dd57fa26b624b7"
    };
    
    // Inicializar Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    // Obtener el elemento del contador
    const visitorCountElement = document.getElementById('visitas-numero');
    if (!visitorCountElement) return;
    
    // Referencia al documento del contador
    const counterRef = doc(db, "counters", "visitorCount");
    
    // Obtener y actualizar el contador
    const docSnap = await getDoc(counterRef);
    
    if (docSnap.exists()) {
      const currentCount = docSnap.data().count;
      visitorCountElement.innerText = currentCount;
      await updateDoc(counterRef, { count: increment(1) });
    } else {
      visitorCountElement.innerText = "1";
      await setDoc(counterRef, { count: 1 });
    }
  } catch (error) {
    console.error("Error con el contador de visitas:", error);
    const visitorCountElement = document.getElementById('visitas-numero');
    if (visitorCountElement) visitorCountElement.innerText = "-";
  }
}

// Utilizar requestIdleCallback para ejecutar el contador cuando el navegador esté inactivo
if ('requestIdleCallback' in window) {
  // Ejecutar cuando el navegador esté inactivo, con un timeout máximo de 3 segundos
  window.requestIdleCallback(() => initVisitorCounter(), { timeout: 3000 });
} else {
  // Fallback para navegadores que no soportan requestIdleCallback
  // Esperar a que la página esté completamente cargada
  window.addEventListener('load', () => {
    // Agregar un pequeño retraso para priorizar la renderización de la página
    setTimeout(initVisitorCounter, 100);
  });
}
