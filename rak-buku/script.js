const todos = [];
const RENDER_EVENT = "render-todo";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

function addTodo() {
  const textTodo = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const year = document.getElementById("year").value.trim();
  const checkbox = document.getElementById("myCheckBox").checked;

  if (!textTodo || !author || !year) {
    alert("Mohon lengkapi judul penulis dan tahun buku!");
    return;
  }

  const generatedID = generateId();
  const isComplete = checkbox; // Tidak perlu memanggil .checked lagi

  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    author,
    year,
    isComplete
  );

  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();
}


function generateId() {
  return +new Date();
}

function generateTodoObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";

  const completedTODOList = document.getElementById("completed-todos");
  completedTODOList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) uncompletedTODOList.append(todoElement);
    else completedTODOList.append(todoElement);
  }
});



function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.classList.add("text-xl", "font-medium");
  textTitle.innerText = todoObject.title;
  
  const textAuthor = document.createElement("p");
  textAuthor.classList.add("text-[14px]", "-mt-[2px]");
  textAuthor.innerText = todoObject.author;

  const textYear = document.createElement("p");
  textYear.classList.add("text-[12px]", "-mt-[2px]", "mb-2");
  textYear.innerText = todoObject.year;



  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("mb-4");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("bg-green-500", "mr-2", "text-white", "px-2", "py-1", "font-medium", "rounded-sm");
    undoButton.textContent = "Tandai Belum Selesai Dibaca";

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "font-medium", "rounded-sm");
    trashButton.textContent = "Hapus";

    trashButton.addEventListener("click", function () {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("bg-blue-500", "mr-2", "text-white", "px-2", "py-1", "font-medium", "rounded-sm");
    checkButton.textContent = "Tandai Sudah Selesai Dibaca";

    checkButton.addEventListener("click", function () {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

function addTaskToCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
}

function removeTaskFromCompleted(todoId) {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  alert("Data berhasil di hapus");
}

function undoTaskFromCompleted(todoId) {
  const todoTarget = findTodo(todoId);

  if (todoTarget == null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findTodoIndex(todoId) {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }

  return -1;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = 'saved-todo';
const STORAGE_KEY = 'TODO_APPS';
 
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});


function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const todo of data) {
      todos.push(todo);
    }
  }
 
  document.dispatchEvent(new Event(RENDER_EVENT));
}