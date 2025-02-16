const Todo = require("../model/Todo");
const { validateCreatePost } = require("../utils/validation");


//get all todo items
const getAllTodos = async(req, res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const startIndex = (page - 1) * limit;


        const todos = await Todo.find({ })
        .sort({ createdAt: 1 })
        .skip(startIndex)
        .limit(limit);

        const totalNoOfTodos = await Todo.countDocuments();

        if(!todos){
            return res.status(401).json({
                message: "No todo Items",
                data: []
            })
        }
        const result = {
            todos,
            currentpage: page,
            totalPages: Math.ceil(totalNoOfTodos / limit),
            totalTodos: totalNoOfTodos,
          };

          res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error at GetAllPost ${error.message}`
        })
    }
    
}

//get a particular item
const getTodo = async (req, res) =>{
    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);
        if(!todo){
             res.status(400).json({
                success: false,
                message: "Todo not found"
            })
            return
        }
        res.status(200).json({
            success: true,
            message: "Todo item found succesfully",
            data: todo
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error ${error.message}`
        })
    }
}



//add to the todo list
const addTodo = async (req, res) => {
    try {
        const {error} = validateCreatePost(req.body);
        if(error){
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
                
            });
        }

        const {title, description} = req.body;
        const newTodo = new Todo({title, description});


        await newTodo.save();
        res.status(200).json({
            success: true,
            message: "Todo created successfully",
            data: newTodo
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error ${error.message}`
        })
    }
}

//update a todo item
const updateTodo = async(req, res) =>{
    try {
        const newItems = req.body;
        const newId = req.params.id;
        const updatedTodo = await Todo.findByIdAndUpdate(newId, newItems, {
            new: true
        });


        if(!updatedTodo){
            return res.status(404).json({
                success: false,
                message: `Todo item not found`
            })
        }

        res.status(200).json({
            success: true,
            message: `Item updated successfully`,
            data: updatedTodo
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }
}

//delete a todo item
const deleteTodo = async(req, res) =>{
    try {
        const deleteId = req.params.id;
        const deletedTodo = await Todo.findOneAndDelete(deleteId);
        if(!deletedTodo){
            return res.status(401).json({
                success: false,
                message: `Todo Item not found`
            })
        }
        res.status(200).json({
            success: true,
            message: `Item deleted succesfully`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }
}


module.exports = {getAllTodos, getTodo, addTodo, updateTodo, deleteTodo}