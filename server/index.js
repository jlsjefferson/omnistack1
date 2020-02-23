const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://<seuUsuárioaqui>:<suasenhaaqui>@cluster0-ufv5o.mongodb.net/<suacolectionAqui>?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
    
}
)



require('./todo');

const Todo = mongoose.model('Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    return res.json(todos);

})

app.post('/todos', async (req, res) => {
    const todo = await Todo.create(req.body);
 
    return res.json(todo);
 });



app.listen(3333);