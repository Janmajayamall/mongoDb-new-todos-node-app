// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if (err){
    return console.log('Unable to connect to Mongodb Server');
  }
  console.log('Connected to the mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b60e0236f58bc4890b8a616')}).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log(err);
  // });
  //
  // db.collection('Todos').find({completed: false}).count().then((count)=>{
  //   console.log('Todos count: ',count);
  // }, (err)=>{
  //   console.log(err);
  // });

  db.collection('Users').find({name: 'Janmajaya Mall'}).toArray().then((docs)=>{
    console.log(docs);
  }, (err)=>{
    console.log(err);
  });

});
