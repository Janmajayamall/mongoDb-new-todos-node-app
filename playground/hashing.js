const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data={
  id: 10
};

var token = jwt.sign(data, "somesalt");
console.log(token);

var decoded = jwt.verify(token, 'somesalt');
console.log('decoded', decoded);

// var message = "I like";
// var hash = SHA256(message).toString();
//
// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);
//
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "saltadded").toString()
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString()
//
// var resultHash = SHA256(JSON.stringify(data) + "saltadded").toString();
//
// if (resultHash === token.hash){
//   console.log('Data was not changed');
// }else{
//   console.log('Data was tempered');
// }
