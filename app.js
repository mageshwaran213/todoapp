const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: Date.now(), title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], title, completed };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
