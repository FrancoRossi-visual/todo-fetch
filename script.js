// UI elements:
const formUI = document.querySelector('#todo-form'),
  titleInputUI = document.querySelector('#title'),
  btnInputUI = document.querySelector('button'),
  todoListUI = document.querySelector('#todo-list');

// fetch todos
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

function getTodos() {
  fetch(`${apiUrl}?_limit=5`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo) => addTodoToDom(todo));
    });
}

// add TODO
function onTodoSubmit(e) {
  e.preventDefault();

  fetchPost(createTodo(e));
}

function createTodo(e) {
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  if (!newTodo.title) {
    alert('error');
    return;
  } else {
    return newTodo;
  }
}
function fetchPost(todo) {
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => addTodoToDom(data));
}

function addTodoToDom(todo) {
  const newTodo = document.createElement('div');
  newTodo.appendChild(document.createTextNode(`${todo.title}`));
  newTodo.setAttribute('data-id', todo.id);
  newTodo.classList.add('todo');
  if (todo.completed) {
    newTodo.classList.add('done');
  }
  todoListUI.appendChild(newTodo);
}

function onTodoListClick(e) {
  if (e.target.tagName === 'DIV') {
    console.log('todo clicked');
  }
}
function onTodoListDblClick(e) {
  if (e.target.tagName === 'DIV') {
    console.log('todo dbl clicked');
  }
}
// event listeners:
function init() {
  formUI.addEventListener('submit', onTodoSubmit);
  todoListUI.addEventListener('click', onTodoListClick);
  todoListUI.addEventListener('dblclick', onTodoListDblClick);
  document.addEventListener('DOMContentLoaded', getTodos);
}
init();
