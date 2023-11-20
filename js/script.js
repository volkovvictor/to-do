'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todoData'));

const setToStorage = function() {
   localStorage.setItem('todoData', JSON.stringify(todoData));
};

const render = function() {
   todoList.innerHTML = "";
   todoCompleted.innerHTML = "";

   todoData.forEach(function(item, index) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

      item.complete ? todoCompleted.append(li) : todoList.append(li);

      li.querySelector('.todo-complete').addEventListener('click', function() {
         item.complete = !item.complete;
         render();
      });

      li.querySelector('.todo-remove').addEventListener('click', function() {
         todoData.splice(index, 1);
         render();
      });
   });

   setToStorage();
};

todoControl.addEventListener('submit', function(e) {
   e.preventDefault();

   if (headerInput.value.trim() !== "") {
      const obj = {
         text: headerInput.value,
         complete: false
      };

      todoData.push(obj);

      headerInput.value = "";

      render();
   }
});

render();