let todos = []

let initTask = document.querySelector('#initTask')
let addTaskContainer = document.querySelector('#addTaskContainer')
let addTaskBtn = document.querySelector('#addTaskBtn')
let title_input = document.querySelector('#title-input')
let desc_input = document.querySelector('#desc-input')
let dueDate_input = document.querySelector('#dueDate-input')
let taskContainer = document.querySelector('#taskContainer')

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

initTask.addEventListener('click', ()=>{
    addTaskContainer.classList.remove('hidden')
})

function renderTodos(){
    // Clearing the Input Fields of AddTask
    title_input.value = ""
    desc_input.value = ""
    dueDate_input.value = ""

    todos.forEach((todo, index)=>{

        // For MarkAsDone
        if(todo.status === 'done'){
            statusClass = 'bg-green-100 border-green-400'
        }
        else{
            statusClass = 'border-neutral-300'
        }

        let date = new Date(todo.dueDate)
        let fDate = date.toLocaleDateString('en', options)
        let div = document.createElement('div')
        div.innerHTML = `<div class="border  mt-2 p-3 rounded-lg hover:shadow-lg ${statusClass}">
            <p id="title" class="font-bold text-lg">${todo.title}</p>
            <p id="desc" class="text-sm">${todo.desc}</p>
            <p class="text-sm mt-3">Due Data: <span class="font-bold" id="dueDate">${fDate}</span></p>
            <div class="flex gap-4 mt-3">
                <div id="markDone" data-id="${index}" class="flex gap-1 items-center hover:text-green-500 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                      </svg>
                      <p>Mark as done</p>
                </div>
                <div id="deleteTask" data-id="${index}" class="flex gap-1 items-center hover:text-red-500 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    <p>Delete</p>
                </div>
            </div>
        </div>`
        taskContainer.appendChild(div)
    })
    let markasDone = document.querySelectorAll('#markDone')
    let deleteTask = document.querySelectorAll('#deleteTask')
    let notDone = document.querySelectorAll('#notDone')

    markasDone.forEach((done)=>{
        done.addEventListener('click', (e)=>{
            let index = e.currentTarget.getAttribute('data-id')
            let todo = todos[index]
            todo.status = 'done'
            taskContainer.innerHTML = ""
            renderTodos()
        })
    })

    deleteTask.forEach((deleting)=>{
        deleting.addEventListener('click', (e)=>{
            let index = e.currentTarget.getAttribute('data-id')
            todos.splice(index, 1)
            taskContainer.innerHTML = ""
            renderTodos()
        })
    })

    notDone.forEach((notDone)=>{
        notDone.addEventListener('click', (e)=>{
            let index = e.currentTarget.getAttribute('data-id')
            let todo = todos[index]
            todo.markAs = 'notDone'
            taskContainer.innerHTML = ""
            renderTodos()
        })
    })

}

addTaskBtn.addEventListener('click', ()=>{
    let task = {
        title : title_input.value,
        desc : desc_input.value,
        dueDate : dueDate_input.value,
    }
    todos.push(task)
    addTaskContainer.classList.add('hidden')
    taskContainer.innerHTML = ""
    renderTodos()
})