const toDoForm = document.querySelector('.inputField');
const toDoInput = document.querySelector('.inputField input');
const toDoList = document.querySelector('.todoList');
const clearAll = document.querySelector('.footer button');
const message = document.querySelector('.footer span');

const TODOS_KEY = 'todos';
const savedToDos = localStorage.getItem(TODOS_KEY);
let toDos = [];

toDoForm.addEventListener('submit', handleToDoSubmit);
clearAll.addEventListener('click', deleteAll);
reloadMsg()

// 로컬 스토리지 데이터 파싱 & 저장 & 출력
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(addToDo);
}

// 수정된 데이터를 로컬 스토리지에 저장
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// Todo 추가 및 출력
function addToDo(newTodo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('span');

  li.id = newTodo.id;
  li.className = newTodo.status;
  span.innerText = newTodo.text;
  button.className = 'icon';
  button.innerHTML = '<i class="fas fa-trash"></i>';

  li.addEventListener('click', changeStatus);
  button.addEventListener('click', deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);

  reloadMsg();
}

// Todo 완료 여부 업데이트
function changeStatus(event) {
  if (event.target.tagName === 'SPAN') {
    li = event.target.parentElement;
  } else {
    li = event.target;
  }
  const idx = toDos.findIndex(e => e.id === Number(li.id));

  if (li.className === 'completed') {
    li.className = 'ongoing';
    toDos[idx]['status'] = 'ongoing';
  } else {
    li.className = 'completed';
    toDos[idx]['status'] = 'completed';
  }

  saveToDos();
  reloadMsg();
}

// Todo 삭제
function deleteToDo(event) {
  let li =''

  if (event.target.className == 'icon') {
    li = event.target.parentElement;  
  } else {
    li = event.target.parentElement.parentElement; 
  }  

  toDos = toDos.filter(e => e.id !== parseInt(li.id));
  
  li.remove();
  saveToDos();
  reloadMsg();
}

// 모든 Todo 삭제
function deleteAll() {
  toDoList.innerHTML = '';
  toDos = [];

  saveToDos();
  reloadMsg()
}

// 텍스트 전송 시 실행
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;

  if (!newTodo) {
    alert('내용을 적어주세요!')
    return
  }

  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    status: 'ongoing',
  };
  toDos.push(newTodoObj);
  addToDo(newTodoObj);
  saveToDos();
  reloadMsg()
}

// 현황판 업데이트
function reloadMsg() {
  const count = toDos.filter(e => e.status === 'completed').length;
  if (toDos.length > 0) {
    message.innerText = 
    `오늘 할일 ${toDos.length}개 중 ${count}개 완료`;
  } else {
    message.innerText = '오늘 할 일을 적어주세요 :)';
  }
}