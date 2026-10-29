//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addTaskButton = document.getElementsByTagName('button')[0]; //first button
const todoList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  //input (taskCheckbox)
  const taskCheckbox = document.createElement('input'); //taskCheckbox
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImg = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  taskCheckbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  //Append taskItem to todoList
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditing = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(taskItem);
};

//Mark task completed
const taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const taskItem = this.parentNode;
  completedList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

const taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskItem = this.parentNode;
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (tasktaskItem, checkBoxEventHandler) {
  //select taskItems children
  const taskCheckbox = tasktaskItem.querySelector('input[type=checkbox]');
  const editButton = tasktaskItem.querySelector('button.edit');
  const deleteButton = tasktaskItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  taskCheckbox.onchange = checkBoxEventHandler;
};

//cycle over todoList ul list items
//for each list item
for (let i = 0; i < todoList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoList.children[i], taskCompleted);
}

//cycle over completedList ul list items
for (let i = 0; i < completedList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedList.children[i], taskIncomplete);
}
