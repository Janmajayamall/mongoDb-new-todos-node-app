var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {Users} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
  var newTodo = new Todo ({
    text: req.body.text
  });

  newTodo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (err) =>{
    res.send(err);
  })
});

app.listen(3000, ()=>{
  console.log('Using port 3000');
});

module.exports = {app};
