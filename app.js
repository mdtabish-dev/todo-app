// DOM elements
let input = document.getElementById("input");
let todoList = document.getElementById("list");
let completedCountSpan = document.getElementById("completedCount");
let pendingCountSpan = document.getElementById("pendingCount");
let todaySpan = document.getElementById("today");

// =====================
// Update UI with todos
// =====================
function updateUI(snapshot) {
    let data = snapshot.val();
    todoList.innerHTML = ""; // clear list

    let completedCount = 0;
    let pendingCount = 0;

    for (let key in data) {
        let todo = data[key];

        // Count completed/pending
        if (todo.done) completedCount++;
        else pendingCount++;

        // Create list item
        let li = document.createElement("li");
        li.className = "todo-item " + (todo.done ? "completed" : "");

        li.innerHTML = `
            <input type="checkbox" ${todo.done ? "checked" : ""} onclick="toggleTodo('${key}')">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" onclick="dltTodo('${key}')">🗑️</button>
        `;

        todoList.appendChild(li);
    }

    // Update counts
    completedCountSpan.innerText = "Completed: " + completedCount;
    pendingCountSpan.innerText = "Pending: " + pendingCount;

    // Update today's date and day
    updateTodayDate();
}

// =====================
// Update today's date and day
// =====================
function updateTodayDate() {
    let now = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    todaySpan.innerText = "Date: " + now.toLocaleDateString('en-US', options);
}

// Attach real-time listener
todosRef.on("value", updateUI);

// =====================
// Add Todo
// =====================
function addTodo() {
    let value = input.value.trim();
    if (value === "") {
        alert("Please! Enter a task");
        return;
    }

    let newTodo = {
        text: value,
        done: false,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    };

    todosRef.push(newTodo);
    input.value = "";
}

// =====================
// Toggle Todo
// =====================
function toggleTodo(id) {
    let todoRef = todosRef.child(id);

    function handleSnapshot(snapshot) {
        let current = snapshot.val();
        todoRef.update({ done: !current.done });
    }

    todoRef.once("value", handleSnapshot);
}

// =====================
// Delete Todo
// =====================
function dltTodo(id) {
    todosRef.child(id).remove();
}
