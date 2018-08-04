const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {Users} = require('./../server/models/user.js');

var id = '5b621b71c2fa92d0277341d9';

// Todo.find({
//   _id : id
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo)=>{
//   console.log('Todo by ID', todo);
// }).catch((e)=>console.log(e));


Users.findById(id).then((user)=>{
  if (!user){
    return console.log('Such ID does not exists');
  }

  console.log('User by ID', JSON.stringify(user, undefined, 2));
}).catch((e)=>console.log(e));
