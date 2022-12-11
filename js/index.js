import { Todo } from "./classes/Todo.js";

//find elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todoInput");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");

//showMessage
const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setInterval(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};

//create todo
const createTodo = (newTodo) => {
  const todoElement = document.createElement("li");
  todoElement.id = newTodo.todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
  <span>${newTodo.todoValue} </span>
  <span><button class="btn" id="deleteButton"><i class="fa fa-trash"></i></button></span>
  `;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

//deleteTodo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;

  todoLists.removeChild(selectedTodo);
  showMessage("Todo is deleted", "danger");

  const todoId = selectedTodo.id;
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== todoId);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

//getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

//addTodo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  //unique id
  const todoId = Date.now().toString();

  const newTodo = new Todo(todoId, todoValue);

  createTodo(newTodo);
  showMessage("Todo is created", "success");

  //add todo to localStorage
  const todos = getTodosFromLocalStorage();
  todos.push(newTodo);
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};

//loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo));
};

//add listeners
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
