// Cargar Firebase de forma asíncrona y sin bloquear la renderización de la página
async function initVisitorCounter() {
  try {
    // Verificar si los contadores están presentes antes de cargar Firebase
    const visitorCountElement = document.getElementById("visitas-numero");
    const mobileVisitorCountElement = document.getElementById(
      "mobile-visitas-numero"
    );
    if (!visitorCountElement && !mobileVisitorCountElement) return;

    // Cargar Firebase dinámicamente
    const { initializeApp } = await import(
      "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
    );
    const { getFirestore, doc, runTransaction } = await import(
      "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js"
    );

    // Configuración de Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyDQ9VBIYN0XnC15v7XIWYQtlGYVXKzVsiI",
      authDomain: "visitor-counter-6c9d9.firebaseapp.com",
      projectId: "visitor-counter-6c9d9",
      storageBucket: "visitor-counter-6c9d9.firebasestorage.app",
      messagingSenderId: "383757764246",
      appId: "1:383757764246:web:c7ddb697dd57fa26b624b7",
    };

    // Inicializar Firebase y Firestore
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Referencia al documento del contador
    const counterRef = doc(db, "counters", "visitorCount");

    // Usar transacciones para leer y actualizar el contador
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(counterRef);
      let newCount = 1; // Valor inicial si no existe el documento

      if (docSnap.exists()) {
        newCount = docSnap.data().count + 1; // Incrementar si existe
      }

      transaction.set(counterRef, { count: newCount });

      // Actualizar los elementos en el DOM
      if (visitorCountElement) visitorCountElement.innerText = newCount;
      if (mobileVisitorCountElement)
        mobileVisitorCountElement.innerText = newCount;
    });
  } catch (error) {
    console.error("Error con el contador de visitas:", error);

    // Mostrar un valor predeterminado en caso de error
    const visitorCountElement = document.getElementById("visitas-numero");
    const mobileVisitorCountElement = document.getElementById(
      "mobile-visitas-numero"
    );
    if (visitorCountElement) visitorCountElement.innerText = "-";
    if (mobileVisitorCountElement) mobileVisitorCountElement.innerText = "-";
  }
}

// Utilizar requestIdleCallback para ejecutar el contador cuando el navegador esté inactivo
if ("requestIdleCallback" in window) {
  window.requestIdleCallback(() => initVisitorCounter(), { timeout: 3000 });
} else {
  // Fallback para navegadores sin soporte de requestIdleCallback
  window.addEventListener("load", () => {
    setTimeout(initVisitorCounter, 100); // Priorizar la renderización de la página
  });
}
