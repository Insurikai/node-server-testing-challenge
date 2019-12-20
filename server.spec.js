const server = require('./server.js');
const request = require('supertest');

describe('GET /', () => {
  it('Returns 200 by default', () => {
    return request(server)
      .get('/')
      .expect(200);
  });
  it('Returns an empty plane object by default', () => {
    return request(server)
      .get('/')
      .then(res => {
        expect(res.body.name).toBe('');
        expect(res.body.arrived).toBe(null);
        expect(res.body.completed).toBe(false);
      });
  });
});
describe('GET /api/planes', () => {
  it('Returns a list of planes', () => {
    return request(server)
      .get('/api/planes')
      .expect(200)
      .then(res => {
        expect(res.body instanceof Array).toBeTruthy();
        expect(typeof(res.body[0].id) === 'number').toBeTruthy();
        expect(typeof(res.body[0].name) === 'string').toBeTruthy();
      });
  });
});
describe('GET /api/planes/:id', () => {
  it('Returns 404 if the id is invalid', () => {
    return request(server)
      .get('/api/planes/700')
      .expect(404)
      .then(res => {
        expect(res.body.message === 'invalid id').toBeTruthy()
      });
  });
  it('Returns a plane', () => {
    return request(server)
      .get('/api/planes/1')
      .expect(200)
      .then(res => {
        expect(res.body.id === 1).toBeTruthy();
        expect(!!res.body.name).toBeTruthy();
      });
  });
});
describe('POST /api/planes', () => {
  it('Returns 400 if the body is invalid', () => {
    return request(server)
      .post('/api/planes')
      .send({})
      .expect(400)
      .then(res => {
        expect(res.body.message === 'body invalid').toBeTruthy();
      });
  });
  it('Returns the new plane object if successful', () => {
    return request(server)
      .post('/api/planes')
      .send({
        name: 'Boeing 4003',
        from: 'Ontario',
        to: 'San Francisco',
        duration: '6h'
      })
      .expect(201)
      .then(res => {
        expect(res.body.id && typeof(res.body.id) === 'number').toBeTruthy();
        expect(
          Object.keys(res.body).includes('departed') &&
          Object.keys(res.body).includes('arrived') &&
          Object.keys(res.body).includes('completed')
        ).toBeTruthy();
      });
  });
});
describe('PUT /api/planes/:id', () => {
  it('Returns 404 if the id is invalid', () => {
    return request(server)
      .get('/api/planes/700')
      .expect(404)
      .then(res => {
        expect(res.body.message === 'invalid id').toBeTruthy()
      });
  });
  it('Returns the updated plane object if successful', () => {
    return request(server)
      .put('/api/planes/1')
      .send({
        name: 'Boeing 403'
      })
      .expect(200)
      .then(res => {
        expect(res.body.id && typeof(res.body.id) === 'number').toBeTruthy();
        expect(
          Object.keys(res.body).includes('departed') &&
            Object.keys(res.body).includes('arrived') &&
            Object.keys(res.body).includes('completed')
        ).toBeTruthy();
        expect(res.body.name === 'Boeing 403').toBeTruthy();
      });
  });
});
describe('DELETE /api/planes/:id', () => {
  it('Returns 404 if the id is invalid', () => {
    return request(server)
      .get('/api/planes/700')
      .expect(404)
      .then(res => {
        expect(res.body.message === 'invalid id').toBeTruthy()
      });
  });
  it('Returns a success message if deleted', () => {
    return request(server)
      .del('/api/planes/1')
      .expect(200)
      .then(res => {
        expect(res.body.message === 'Success').toBeTruthy();
      });
  });
});

/*
planes = [
  {
    id: 1,
    name: '',
    from: '',
    to: '',
    duration: 3h,
    departed: '2012-01-01-01:35:46'
    arrived: null,
    completed: false
  }
]
*/
