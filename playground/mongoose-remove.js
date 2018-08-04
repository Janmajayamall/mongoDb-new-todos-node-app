const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {Users} = require('./../server/models/user.js');


// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

Todo.findByIdAndRemove({_id:'5b649de4f784c24f4e3a1760'}).then((todo)=>{
  console.log(todo);
});

Todo.findOneAndRemove('5b649de4f784c24f4e3a1760').then((todo)=>{
  console.log(todo);
});
