const {Todo} = require('./../../todo.js');
const {ObjectID} = require('mongodb');
const {Users} = require('./../../user.js');
const jwt = require('jsonwebtoken');
const userIdOne = new ObjectID();
const userIdTwo = new ObjectID();

const users = [{
    _id: userIdOne,
    email: 'mala@gh.com',
    password: '12345678910',
    tokens:[{
      access: 'auth',
      token: jwt.sign({_id: userIdOne, access: 'auth'}, '123').toString()
    }]
},
{
    _id: userIdTwo,
    email: 'lala@gh.com',
    password: '123456789'
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test',
  complete: true,
  completeAt: 444
},
{
  _id: new ObjectID(),
  text: 'Second test',
  completed: false,
  completedAt: 222
}]


const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(()=> done());

};

const populateUsers = (done)=>{
  Users.remove({}).then(()=>{
      var userOne = new Users(users[0]).save();
      var userTwo = new Users(users[1]).save();

      return Promise.all([userOne, userTwo]);
  }).then(()=> done());
};

module.exports = {todos, populateTodos, users, populateUsers};
