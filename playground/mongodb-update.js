// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if (err){
    return console.log('Unable to connect to Mongodb Server');
  }
  console.log('Connected to the mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b61f4a016253c05892231c5')
  // }, {
  //     $set:{
  //       completed:true
  //     }
  // }, {
  //   returnOriginal: false
  // }).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b620ba1a79bde2286aad3b2')
  }, {
    $set:{
      name: 'Janmajaya Ravindra Mall'
    },
    $inc:{
      age: 1
    }
  }).then((result)=>{
    console.log(result);
  });
  // client.close();
});
