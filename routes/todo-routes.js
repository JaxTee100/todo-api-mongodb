const express = require('express');
const { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todo-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const Todo = require('../model/Todo');

const router = express.Router();






router.get('/', authMiddleware, getAllTodos);
router.get('/:id', authMiddleware,  getTodo);
router.post('/add-post', authMiddleware, addTodo);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);


module.exports = router