document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("main_contact_form");
  const notificationContainer = document.createElement("div");
  notificationContainer.id = "notification-container";
  form.insertAdjacentElement("afterend", notificationContainer);

  // Estilos para las notificaciones
  const styles = `
        #notification-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 300px;
            width: 100%;
        }
        .notification {
            background-color: #333;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease-in-out;
            font-family: 'Arial', sans-serif;
        }
        .notification.success {
            background-color: #4CAF50;
        }
        .notification.error {
            background-color: #F44336;
        }
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;

  // Inyectar estilos
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Función para mostrar notificación
  function showNotification(message, type = "error") {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.textContent = message;

    notificationContainer.appendChild(notification);

    // Mostrar notificación
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Ocultar notificación
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notificationContainer.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Validar email
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

  // Validación del formulario
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener campos
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Validar campos vacíos
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        showNotification("Por favor, completa todos los campos");
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    // Validar correo electrónico
    if (!validateEmail(emailInput.value)) {
      showNotification(
        "Por favor, ingresa un correo electrónico válido",
        "error"
      );
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    // Si todo es válido, enviar formulario
    if (isValid) {
      form.submit();
    }
  });
});
