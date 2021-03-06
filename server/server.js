require('./config/config.js');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {authenticate} = require('./middleware/authenticate.js');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {Users} = require('./models/user.js');

var app = express();

  const port = process.env.PORT;


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
  });
});


app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
      return res.status(400).send();
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{res.status(404).send()});
});


app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
      res.status(200).send({todo});
  }).catch((e )=>{ res.status(400).send();});
});

app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID(id)){
    res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch((e)=>{res.status(400).send();})

});

//Users

app.post('/users', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var newUsers = new Users (body);

  newUsers.save().then(()=>{
    return newUsers.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth', token).send(newUsers);
  }).catch ((e)=>{
    res.status(400).send(e);
  });

});


app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.users);
});

app.post('/users/login', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);

    Users.findCredentials(body.email, body.password).then((user)=>{
      return user.generateAuthToken().then((token)=>{
        res.header('x-auth', token).send(user);
      });

    }).catch((e)=>{
      res.status(400).send();
    });
});

app.listen(port, ()=>{
  console.log(`Using port ${port}`);
});

module.exports = {app};
