document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    // Function to fetch all todos
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      displayTodos(todos);
    };
  
    // Function to display todos
    const displayTodos = todos => {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''}>
          <span>${todo.title}</span>
          <button class="delete-btn">Delete</button>
        `;
        li.querySelector('input').addEventListener('change', async () => {
          await fetch(`/api/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !todo.completed })
          });
          fetchTodos();
        });
        li.querySelector('.delete-btn').addEventListener('click', async () => {
          await fetch(`/api/todos/${todo.id}`, {
            method: 'DELETE'
          });
          fetchTodos();
        });
        todoList.appendChild(li);
      });
    };
  
    // Event listener for form submission
    todoForm.addEventListener('submit', async event => {
      event.preventDefault();
      const title = todoInput.value.trim();
      if (title !== '') {
        await fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title })
        });
        fetchTodos();
        todoInput.value = '';
      }
    });
  
    // Initial fetch of todos
    fetchTodos();
  });
  