document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');
  
    // Function to create a new list item
    function createListItem(todoText) {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex align-items-center';
      listItem.innerHTML = `
        <span class="bullet-point">•</span>
        <span class="todo-text">${todoText}</span>
        <button class="btn btn-danger btn-sm remove-button">x</button>
      `;
  
      // Add remove button event listener
      const removeButton = listItem.querySelector('.remove-button');
      removeButton.addEventListener('click', function() {
        listItem.remove();
        saveTodoList();
      });

      // Add click event listener to toggle strikethrough
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        saveTodoList();
      });
  
      return listItem;
    }

    // Function to save the todo list to local storage
  function saveTodoList() {
    const todoItems = [...todoList.children].map(item => ({
      text: item.querySelector('.todo-text').innerText,
      completed: item.classList.contains('completed'),
    }));
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  // Function to load the todo list from local storage
  function loadTodoList() {
    const savedTodoItems = JSON.parse(localStorage.getItem('todoItems'));
    if (savedTodoItems) {
      savedTodoItems.forEach(todoItem => {
        const listItem = createListItem(todoItem.text);
        if (todoItem.completed) {
          listItem.classList.add('completed');
          saveTodoList();
        }
        todoList.appendChild(listItem);
      });
    }
  }
  
    // Add button event listener
    addButton.addEventListener('click', function() {
      const todoText = todoInput.value.trim();
  
      if (todoText !== '') {
        // Create new list item
        const listItem = createListItem(todoText);
  
        // Append list item to todoList
        todoList.appendChild(listItem);
  
        // Clear input field
        todoInput.value = '';

        // Save the updated todo list
        saveTodoList();
      }
    });
    loadTodoList();
  });
  