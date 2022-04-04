const toDoForm = document.querySelector('.inputField');
const toDoInput = document.querySelector('.inputField input');
const toDoList = document.querySelector('.todoList');
const clearAll = document.querySelector('.footer button');
const message = document.querySelector('.footer span');

const TODOS_KEY = 'todos'
let toDos = [];

toDoForm.addEventListener('submit', handleToDoSubmit);
clearAll.addEventListener('click', deleteAll);

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function addToDo(newTodo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('span');

  li.id = newTodo.id;
  span.innerText = newTodo.text;
  button.className = 'icon';
  button.innerHTML = '<i class="fas fa-trash"></i>';

  button.addEventListener('click', deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
  reloadMsg()
}

function deleteToDo(event) {
  let li =''
  if (event.target.className == 'icon') {
    li = event.target.parentElement;  
  } else {
    li = event.target.parentElement.parentElement; 
  }  
  li.remove();
  toDos = toDos.filter(e => e.id !== parseInt(li.id));
  saveToDos();
  reloadMsg()
}

function deleteAll() {
  toDoList.innerHTML = '';
  toDos = [];
  saveToDos();
  message.innerText = '오늘 할 일을 적어주세요 :)'
}

function completedToDo(event) {
  console.log(event.target)
  const li = event.target.parentElement;
  if (event.target.checked) {
    li.className = "completed";
  } else {
    li.className = "";
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  addToDo(newTodoObj);
  saveToDos();
  reloadMsg()
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(addToDo);
}

message.innerText = '오늘 할 일을 적어주세요 :)'

function reloadMsg() {
  message.innerText = `오늘 할일 ${toDoList.childElementCount}개 중 0개 완료`;
}