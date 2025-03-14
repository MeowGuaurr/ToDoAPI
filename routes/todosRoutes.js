const express = require('express');
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../todos');

router.get('/', getTodos); // GET /todos to get all todos
router.post('/addtodo', addTodo); // POST /todos/addtodo to create a new todo
router.put('/update/:id', updateTodo); // PUT /todos/update/:id to update a specific todo
router.put('/delete/:id', deleteTodo); // DELETE /todos/delete/:id to delete a specific todo

module.exports = router;
