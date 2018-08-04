var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://janmajayamall:youaremad18@ds111192.mlab.com:11192/todoapp' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
