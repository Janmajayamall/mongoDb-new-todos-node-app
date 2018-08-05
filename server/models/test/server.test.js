const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../../server.js');
const {Todo} = require('./../todo.js');
const {Users} = require('./../user.js');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not add invalid data', (done)=>{

      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
          if (err){
            return done(err);
          }

          Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            done();
          }).catch((e)=> done(e));
        });
  });
});


describe('GET /todos', ()=>{
  it('shoud return 2 data entries', (done)=>{
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
      });
});


describe('GET /todos/:id', ()=>{
  it('should return todo doc', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 code', (done)=>{
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 code', (done)=>{
    var id = '123'
    request(app)
      .get(`/todos/${id}`)
      .expect(400)
      .end(done);
  });
});

describe('DELETE /todos/:id', ()=>{
  it('should return 200 and delete the matching id document', (done)=>{
    var hexID = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }

        Todo.findById(hexID).then((todo)=>{
          expect(todo).toNotExist();
          done();
        }).catch((e)=>done(e));
      });
  });

  it('should return 404 code', (done)=>{
    var id = new ObjectID();
    request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 code', (done)=>{
    var id = '123'
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});


describe('PATCH /todos/:id', ()=>{
  it('should update todo', (done)=>{
    var hexID = todos[1]._id.toHexString();
    var text = 'new text';

    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when complete is set to false', (done)=>{
    var id = todos[0]._id.toHexString();
    var text = 'new text';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.completedAt).toNotExist();
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.text).toBe(text);


      })
      .end(done);
  });

  });


  describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
      request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({});
        })
        .end(done);
    });
  });


  describe('POST /users', ()=>{
    it('should creare a user', (done)=>{
      var email = 'ajaja@gmail.com';
      var password = '12345678qwerty';

      request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res)=>{
          expect(res.headers['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.email).toBe(email);
        })
        .end((err)=>{
          if(err){
            return done(err);
          }

          Users.findOne({email}).then((user)=>{
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();
          });
        });
    });

    it('should send 400 when invalid email and password', (done)=>{
      request(app)
        .post('/users')
        .send({email: 'daiuwdn', password: 'dawdwa'})
        .expect(400)
        .end(done);
    });

    it('should send 400 when invalid email and password', (done)=>{
      request(app)
        .post('/users')
        .send({email: 'mala@gh.com', password: 'dawdwa'})
        .expect(400)
        .end(done);
    });

  });
