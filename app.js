const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  const taskCheckbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  taskCheckbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  this.parentNode.remove();
};

const taskCompleted = function () {
  const taskItem = this.parentNode;
  completedList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

const taskIncomplete = function () {
  const taskItem = this.parentNode;
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (tasktaskItem, checkBoxEventHandler) {
  const taskCheckbox = tasktaskItem.querySelector('input[type=checkbox]');
  const editButton = tasktaskItem.querySelector('button.edit');
  const deleteButton = tasktaskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  taskCheckbox.onchange = checkBoxEventHandler;
};

const bindTasksInList = (taskList, checkboxHandler) => {
  taskList.querySelectorAll('li').forEach((taskItem) => {
    bindTaskEvents(taskItem, checkboxHandler);
  });
};

bindTasksInList(todoList, taskCompleted);
bindTasksInList(completedList, taskIncomplete);
