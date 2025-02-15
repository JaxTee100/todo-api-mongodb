require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const cors = require('cors');
const todoRoutes = require('./routes/todo-routes')



//run the connect to db function
connectToDB();

const app = express();

//Middlewares
app.use(express.json());


app.use('/api/v1',todoRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
});

