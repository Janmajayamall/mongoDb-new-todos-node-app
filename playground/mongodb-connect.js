// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if (err){
    return console.log('Unable to connect to Mongodb Server');
  }
  console.log('Connected to the mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err, result)=>{
  //   if(err){
  //     return console.log('Unable to connect', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  db.collection('Users').insertOne({
    name: 'Janmajaya Mall',
    age: 18
  }, (err, result)=>{
    if (err){
      console.log(err);
    }
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});
