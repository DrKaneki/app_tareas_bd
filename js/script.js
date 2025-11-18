//base de datos simulada
//esta variable simula una respuesta de tipo json desde el servidor 
let tasks=[]

//funcion para renderizar (accion de crear elememntos en mi navegador)tareas existenres en mi respuesta de api
const renderTasks=()=>{
    const containerTasks=document.querySelector("#tasks")
    containerTasks.innerHTML=""

    tasks.forEach((el)=>{
        const div=document.createElement("div")
        div.className="task" + (el.done? "task-done":"")
        //<div class="task task-done"><>
        div.innerHTML=`
            <span>${el.text}</span>
            <div>
                <button onclick="toggleDone(${el.id})">✅</button>
                <button onclick="editTask(${el.id})">✏️</button>
                <button onclick="deleteTask(${el.id})">🗑️</button>
            </div>
        `
        containerTasks.appendChild(div)
    })
}

// creando funcion para agregar una tarea
const addTask=()=>{
    const input=document.querySelector("#taskInput")
    //validacion para evitar espacios
    const cleanText=input.value.trim()
    //valdacion apra evitar tareas vacias    
    if (cleanText=="") return alert("escribe una tarea delincuente")
    //crear nuestro objeto
    const newTask={
      id: Date.now(),//simular id de base de datos
      text: cleanText,
      done:false
}
//agregar a mi base datos (variable de tipo lista tasks)
//tasks.push(newTask) //USANDO METODOS
tasks = [...tasks,newTask] //CON ESOS DESTRUCTURAN
//limpiar input
input.value=""
//renderizar
renderTasks()
}

//marca tareas como completado
const toggleDone=id=>{
    tasks=tasks.map(el=>
        el.id == id?{...el,done:!el.donde}:el
    )
    renderTasks()

 }
// editar una tarea
const editTask=(id)=>{
    const task=tasks.find(t=>t.id===id)
    const newText=prompt("Editar la tarea:",task.text)
    //validacion
    if (newText === null || newText.trim() ==="") return 

    //recorrer las tareas una vez encontrado la tarea con el id indicado setear de nuevo el texto
    tasks=tasks.map(el=>
        el.id === id ? {...el,text:newText}:el
    )
    renderTasks()
} 

//eliminar tarea
const deleteTask=(id)=>{
    alert("Eliminando tarea")
}
