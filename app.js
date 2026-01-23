let input = document.getElementById("input");
let addBtn = document.getElementById("add");
let todoList = document.getElementById("list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

showTodos();

function addTodo(){
     let value = input.value.trim();
    if (value === "") {
        alert("Please! Enter a task");
        return;
    }
    let newTodo = {
        text: value,
        done: false
    };
    todos.push(newTodo);
    saveTodos();
    showTodos();
    input.value = "";
}


function showTodos() {
    todoList.innerHTML = "";

function addTodo(todo, index) {
        todoList.innerHTML += "<li class='todo-item " 
            + (todo.done ? "completed" : "") + "'>"
            + "<input type='checkbox' " 
            + (todo.done ? "checked" : "") 
            + " onclick='toggleTodo(" + index + ")'>"
            + "<span class='todo-text'>"+todo.text+"</span>"
            + "<button class='delete-btn' onclick='dltTodo(" + index + ")'>🗑️</button></li>";
    }

    for (var i = 0; i < todos.length; i++) {
        addTodo(todos[i], i);
    }
}


function dltTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    showTodos();
};
    
function toggleTodo(index) {
    todos[index].done = !todos[index].done;
    saveTodos();
    showTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


