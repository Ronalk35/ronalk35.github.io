// Importar Firebase app y Firestore con versiones compatibles
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Tu configuración de Firebase
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

// Inicializar Firestore
const db = getFirestore(app);

// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function() {
  console.log("DOM cargado, iniciando contador...");
  
  // Referencia al documento del contador
  const counterRef = doc(db, "counters", "visitorCount");
  
  // Elemento donde mostraremos el contador
  const visitorCountElement = document.getElementById('visitas-numero');
  
  if (!visitorCountElement) {
    console.error("No se encontró el elemento con ID 'visitas-numero'");
    return;
  }
  
  // Obtener y actualizar el contador
  getDoc(counterRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        // El documento existe, incrementar el contador
        const currentCount = docSnap.data().count;
        console.log("Conteo actual:", currentCount);
        
        // Mostrar el conteo actual
        visitorCountElement.innerText = currentCount;
        
        // Incrementar el contador
        return updateDoc(counterRef, {
          count: increment(1)
        });
      } else {
        // El documento no existe, crearlo con conteo inicial de 1
        console.log("Inicializando contador en 1");
        visitorCountElement.innerText = "1";
        return setDoc(counterRef, { count: 1 });
      }
    })
    .then(() => {
      console.log("Contador actualizado correctamente");
    })
    .catch((error) => {
      console.error("Error con el contador:", error);
      visitorCountElement.innerText = "Error";
    });
});