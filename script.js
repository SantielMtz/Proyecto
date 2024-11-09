// Variables para login de usuario usé las claves por defecto
const validUsername = "admin";
const validPassword = "password";

// Función para poder iniciar sesión
function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const errorElement = document.getElementById("login-error");

    if (usernameInput === validUsername && passwordInput === validPassword) {
        // Muestra las secciones ocultas al validar el login
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("user-section").classList.remove("hidden");
        document.getElementById("task-form-section").classList.remove("hidden");
        document.getElementById("task-table-section").classList.remove("hidden");
        document.getElementById("display-username").textContent = validUsername;
    } else {
        errorElement.textContent = "Error de autenticación. Usuario o contraseña incorrectos.";
    }
}

// Función para añadir tareas a la tabla que está creando el usuario
function addTask(event) {
    event.preventDefault();

    const taskId = document.getElementById("task-id").value;
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const startDate = document.getElementById("start-date").value;
    const clientName = document.getElementById("client-name").value;
    const projectId = document.getElementById("project-id").value;
    const comments = document.getElementById("comments").value;
    const status = document.getElementById("status").value;

    // Validación de campos vacíos
    if (!taskId || !taskTitle || !taskDescription || !startDate || !clientName || !projectId) {
        alert("Todos los campos deben ser completados.");
        return;
    }

    const taskTable = document.getElementById("task-table").querySelector("tbody");
    const newRow = document.createElement("tr");

    // En este apartado el usario puede insertar la tarea en la tabla
    newRow.innerHTML = `
        <td>${taskId}</td>
        <td>${taskTitle}</td>
        <td>${taskDescription}</td>
        <td>${startDate}</td>
        <td>${clientName}</td>
        <td>${projectId}</td>
        <td>${comments}</td>
        <td>${status}</td>
    `;

    // Añade evento de doble clic en la fila para editar
    newRow.ondblclick = () => editTask(taskId);

    taskTable.appendChild(newRow);
    clearForm();
}

//  Esta función le permite al usario limpiar el formulario después de añadir una tarea
function clearForm() {
    document.getElementById("task-form").reset();
}

// Función para mostrar la tarea en la sección de edición al hacer doble clic
function editTask(id) {
    const taskTable = document.getElementById("task-table").querySelector("tbody").rows;
    for (let i = 0; i < taskTable.length; i++) {
        const row = taskTable[i];
        if (row.cells[0].innerText === id) {
            document.getElementById("edit-task-id").value = id;
            document.getElementById("edit-status").value = row.cells[7].innerText;
            document.getElementById("task-edit-section").classList.remove("hidden");
        }
    }
}

// Función para actualizar los datos de la tarea seleccionada
function updateTask(event) {
    event.preventDefault();

    const taskId = document.getElementById("edit-task-id").value;
    const newStatus = document.getElementById("edit-status").value;
    const newComment = document.getElementById("new-comment").value;
    const date = new Date().toLocaleDateString();

    const taskTable = document.getElementById("task-table").querySelector("tbody").rows;
    for (let i = 0; i < taskTable.length; i++) {
        const row = taskTable[i];
        if (row.cells[0].innerText === taskId) {
            row.cells[7].innerText = newStatus;
            if (newComment) {
                row.cells[6].innerText += `\n[${date}] ${newComment}`;
            }
        }
    }
    clearEditForm();
}

// Función para limpiar los campos de la sección de edición de tareas
function clearEditForm() {
    document.getElementById("edit-task-id").value = "";
    document.getElementById("edit-status").value = "Por hacer";
    document.getElementById("new-comment").value = "";
    document.getElementById("task-edit-section").classList.add("hidden");
}

// Por ultimo esta función es para filtrar las tareas por estado
function filterTasks() {
    const filter = document.getElementById("status-filter").value;
    const taskTable = document.getElementById("task-table").querySelector("tbody").rows;

    for (let i = 0; i < taskTable.length; i++) {
        const row = taskTable[i];
        const taskStatus = row.cells[7].innerText;

        if (filter === "Todos" || taskStatus === filter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}
