require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const cors = require('cors');
const todoRoutes = require('./routes/todo-routes');
const authRoutes = require('./routes/auth-routes');
const errorHandler = require('./middlewares/errorHandler');



//run the connect to db function
connectToDB();

const app = express();

//Middlewares
app.use(cors())
app.use(express.json());


//routes
app.use('/api/v1', authRoutes)
app.use('/api/v1',todoRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
});

