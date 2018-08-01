// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if (err){
    return console.log('Unable to connect to Mongodb Server');
  }
  console.log('Connected to the mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Janmajaya Mall'}).then((result)=>{
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id : new ObjectID('5b61eecde5774b17115c842d')}).then((result)=>{
    console.log(result);
  });
  // client.close();
});
