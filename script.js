const myTodos = [];
const toDoSection = document.querySelector('.todos');
const inputButton = document.querySelector('.input-button');

function Todo(task, category) {
  this.task = task;
  this.category = category;
}

inputButton.addEventListener('click', addToDoToList);

function addToDoToList() {
  let task = document.querySelector('.todo-input').value;
  let personalCategory = document.getElementById('personal');
  let category;

  if (personalCategory.checked == true) {
    category = 'personal';
  } else {
    category = 'business';
  }

  myTodos.push(new Todo(task, category));
  displayToDos();
}

function displayToDos() {
  const toDos = document.querySelectorAll('.todo-item');
  toDos.forEach((todo) => todo.remove());

  for (let i = 0; i < myTodos.length; i++) {
    createToDos(myTodos[i], i);
  }
}



function createToDos(toDoItem, order) {
  const toDo = document.createElement('div');
  const toDoTask = document.createElement('div');
  const buttonsDiv = document.createElement('div');
  const label = document.createElement('label');
  const checkButton = document.createElement('input');
  const editableInput = document.createElement('input');
  const span = document.createElement('span');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  toDo.setAttribute('class', 'todo-item');
  toDoTask.setAttribute('class', 'todo-task');

  checkButton.setAttribute('type', 'checkbox');
  checkButton.setAttribute('name', 'category');
  checkButton.setAttribute('id', `${toDoItem.category}${order}`);
  checkButton.setAttribute('value', `${toDoItem.category}`);

  label.setAttribute('for', `${toDoItem.category}${order}`);

  toDoTask.appendChild(checkButton);

  span.setAttribute('class', 'checkmark');

  label.appendChild(span);

  editableInput.setAttribute('type', 'text');
  editableInput.setAttribute('id', 'editable-input');
  editableInput.setAttribute('value', `${toDoItem.task}`);
  editableInput.setAttribute('readonly', true);

  label.appendChild(editableInput);

  toDoTask.appendChild(label);

  toDo.appendChild(toDoTask);

  buttonsDiv.setAttribute('class', 'buttons');

  editButton.setAttribute('class', 'edit');
  editButton.textContent = 'Edit';

  deleteButton.setAttribute('class', 'delete');
  deleteButton.textContent = 'Delete';

  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(deleteButton);

  toDo.appendChild(buttonsDiv);

  toDoSection.appendChild(toDo);

  editButton.addEventListener('click', () => {
    editableInput.removeAttribute('readonly');
    editableInput.focus();
  });

  editableInput.addEventListener('focusout', () => {
    editableInput.setAttribute('readonly', true);
  });

  deleteButton.addEventListener('click', () => {
    myTodos.splice(myTodos.indexOf(toDoItem), 1);
    toDo.remove();
  });

 span.addEventListener('click' , () => {
   if (checkButton.checked) {
     editableInput.style.textDecoration = 'none';
     editableInput.style.color = 'black';
   }
   else {
     editableInput.style.textDecoration = 'line-through';
     editableInput.style.color = 'gray';
   }
 })
}
