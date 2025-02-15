const Todo = require("../model/Todo");


//get all todo items
const getTodo = async (req, res) =>{

}

//get a particular item
const getAllTodos = async(req, res) =>{
    try {
        const todos = await Todo.find({});
        if(!todos){
            return res.status(401).json({
                message: "No todo Items",
                data: []
            })
        }
        res.status(201).json({
            success: true,
            message: "items loaded succesfully",
            data: todos
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
    
}

//add to the todo list
const addTodo = async (req, res) => {
    try {
        const {title, description} = req.body;
        const newTodo = new Todo({title, description});


        await newTodo.save();
        res.status(200).json({
            success: true,
            message: "Todo created successfully",
            data: newTodo
        })
    } catch (error) {
        res.staus(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

//update a todo item
const updateTodo = async(req, res) =>{

}

//delete a todo item
const deleteTodo = async(req, res) =>{

}


module.exports = {getAllTodos, getTodo, addTodo, updateTodo, deleteTodo}