const express = require('express');
const server = express();
server.use(express.json());

const db = [
  {
    id: 1,
    name: 'Boeing 4015',
    from: 'NH',
    to: 'MN',
    duration: '5h',
    departed: '2019-08-28T12:15:33',
    arrived: '2019-08-28T18:42:01',
    completed: true
  },
  {
    id: 2,
    name: 'Boeing 4016',
    from: 'TX',
    to: 'CA',
    duration: '1h',
    departed: '2019-10-16T00:43:73',
    arrived: null,
    completed: false
  },
  {
    id: 3,
    name: 'Boeing 4025',
    from: 'NV',
    to: 'TN',
    duration: '4h',
    departed: '2019-10-20T18:36:08',
    arrived: null,
    completed: false
  },
  {
    id: 4,
    name: 'Boeing 4033',
    from: 'NH',
    to: 'WA',
    duration: '2H',
    departed: '2019-10-26T13:24:12',
    arrived: '2019-10-26T15:04:53',
    completed: true
  },
  {
    id: 5,
    name: 'Boeing 4087',
    from: 'NY',
    to: 'CA',
    duration: '6h',
    departed: '2019-11-18T05:18:83',
    arrived: '2019-11-18T11:44:33',
    completed: true
  }
];
server.get('/', (req, res) => {
  res.status(200).json({
    id: -1,
    name: '',
    from: '',
    to: '',
    duration: '',
    departed: '',
    arrived: null,
    completed: false
  });
});

//GET
server.get('/api/planes', (req, res) => {
  res.status(200).json(db);
});
server.get('/api/planes/:id', (req, res) => {
  const id = req.params.id;
  if (id > db.length) {
    res.status(404).json({ message: 'invalid id' });
  }
  res.status(200).json(db[id - 1]);
});
//POST
server.post('/api/planes', (req, res) => {
  const keys = Object.keys(req.body);
  if(!keys.includes('name') || !keys.includes('from') || !keys.includes('to') || !keys.includes('duration')){
    res.status(400).json({message: 'body invalid'})
  }
  db.push({
    id: db.length,
    ...req.body, 
    departed: null,
    arrived: null,
    completed: false
  })
  res.status(201).json(db[db.length - 1]);
});
//PUT
server.put('/api/planes/:id', (req, res) => {
  const id = req.params.id;
  if (id > db.length) {
    res.status(404).json({ message: 'invalid id' });
  }
  Object.keys(req.body).forEach(key => {
    db[id - 1][key] = req.body[key]
  })
  res.status(200).json(db[id - 1]);
});
//DELETE
server.delete('/api/planes/:id', (req, res) => {
  const id = req.params.id;
  if (id > db.length) {
    res.status(404).json({ message: 'invalid id' });
  } 
  db.splice(id - 1, 1)
  res.status(200).json({ message: 'Success' });
});

// server.listen(9000, () => { console.log('Running on port 9000.') })
module.exports = server;
