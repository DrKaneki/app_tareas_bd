// base de datos simulada
let tasks = [];

// Función auxiliar para mostrar mensajes temporales
const showMessage = (message, type = "info") => {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  const body = document.querySelector("body");
  body.appendChild(messageDiv);
  
  // Forzar un reflow para asegurar la animación de entrada
  void messageDiv.offsetWidth; 
  messageDiv.classList.add("show");

  // Eliminar el mensaje después de un tiempo (2 segundos visible + 0.5s de salida)
  setTimeout(() => {
    messageDiv.classList.remove("show");
    messageDiv.classList.add("hide"); // Animación de salida (necesita CSS)
    setTimeout(() => {
      body.removeChild(messageDiv);
    }, 500); // Coincide con la duración de la animación de salida en CSS
  }, 2000); 
};

// funcion para renderizar (accion de crear elememntos en mi navegador)tareas existenres en mi respuesta de api
const renderTasks = () => {
  const containerTasks = document.querySelector("#tasks");
  containerTasks.innerHTML = "";

  tasks.forEach((el) => {
    const div = document.createElement("div");
    // Añadimos un ID para fácil selección al animar
    div.id = `task-${el.id}`; 
    div.className = "task" + (el.done ? " task-done" : "");
    div.innerHTML = `
            <span>${el.text}</span>
            <div>
                <button onclick="toggleDone(${el.id})">✅</button>
                <button onclick="editTask(${el.id})">✏️</button>
                <button onclick="deleteTask(${el.id})">🗑️</button>
            </div>
        `;
    containerTasks.appendChild(div);
  });
};

// creando funcion para agregar una tarea
const addTask = () => {
  const input = document.querySelector("#taskInput");
  //validacion para evitar espacios
  const cleanText = input.value.trim();
  //valdacion apra evitar tareas vacias
  if (cleanText == "") return alert("escribe una tarea delincuente");
  //crear nuestro objeto
  const newTask = {
    id: Date.now(), //simular id de base de datos
    text: cleanText,
    done: false,
  };
  //agregar a mi base datos (variable de tipo lista tasks)
  tasks = [...tasks, newTask]; 
  //limpiar input
  input.value = "";
  renderTasks();

  // Add animation
  const containerTasks = document.querySelector("#tasks");
  const div = containerTasks.lastElementChild;
  if (div) {
    div.classList.add("task-added");
    // MOSTRAR MENSAJE DE AGREGAR
    showMessage("✅ Tarea agregada con éxito.", "success");
    setTimeout(() => {
      div.classList.remove("task-added");
    }, 500); 
  }
};

//marca tareas como completado
const toggleDone = (id) => {
  // Encontramos el estado antes del cambio
  const task = tasks.find(el => el.id === id);
  const wasDone = task ? task.done : false;

  tasks = tasks.map((el) => (el.id == id ? { ...el, done: !el.done } : el));
  renderTasks();

  // Añadir mensaje
  if (!wasDone) {
    showMessage("🎉 Tarea completada.", "info");
  } else {
    showMessage("🔄 Tarea marcada como pendiente.", "info");
  }

  // Animación adicional para el toggle (usando el ID que añadimos en renderTasks)
  const taskDiv = document.querySelector(`#task-${id}`);
  if (taskDiv) {
    taskDiv.classList.add("task-toggled");
    setTimeout(() => {
      taskDiv.classList.remove("task-toggled");
    }, 300);
  }
};

// editar una tarea
const editTask = (id) => {
  const task = tasks.find((t) => t.id === id);
  const newText = prompt("Editar la tarea:", task.text);
  
  //validacion
  if (newText === null || newText.trim() == "") return;

  //recorrer las tareas una vez encontrado la tarea con el id indicado setear de nuevo el texto
  tasks = tasks.map((el) => (el.id === id ? { ...el, text: newText.trim() } : el));
  renderTasks();

  // Add animation
  const taskDiv = document.querySelector(`#task-${id}`);
  
  if (taskDiv) {
    taskDiv.classList.add("task-edited");
    // MOSTRAR MENSAJE DE EDITAR
    showMessage("✏️ Tarea editada con éxito.", "warning");
    setTimeout(() => {
      taskDiv.classList.remove("task-edited");
    }, 500);
  }
};

//eliminar tarea
const deleteTask = (id) => {
  // Find the task element before deleting it (usando el ID que añadimos en renderTasks)
  const taskDiv = document.querySelector(`#task-${id}`);

  // Add animation BEFORE removing from the array
  if (taskDiv) {
    taskDiv.classList.add("task-deleted");
    // MOSTRAR MENSAJE DE ELIMINAR
    showMessage("🗑️ Tarea eliminada.", "error");

    setTimeout(() => {
      tasks = tasks.filter((t) => t.id !== id); // Only filter AFTER animation
      renderTasks();
    }, 300); // Ensure this matches the CSS animation duration
  } else {
    // If the element isn't found, proceed with deletion immediately
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
  }
};

// Asegúrate de llamar a renderTasks al inicio si tienes tareas iniciales, o si la página ya cargó.
document.addEventListener('DOMContentLoaded', renderTasks);