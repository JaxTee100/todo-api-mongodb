const express = require('express');
const { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todo-controller');

const router = express.Router();


router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/add-post', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);


module.exports = router