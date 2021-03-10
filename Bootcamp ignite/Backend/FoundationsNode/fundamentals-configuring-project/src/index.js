const express = require('express');
const app = express();

app.use(express.json());

app.get('/courses', (request, response) => {
  const query = request.query;

  return response.json([
    'course 01',
    'course 02',
    'course 03',
  ]);
});

app.post('/courses', (request, response) => {
  const { name } = request.body;

  return response.json([
    'course 01',
    'course 02',
    'course 03',
    'course 04',
  ]);
});

app.put('/courses/:id', (request, response) => {
  const { id } = request.params;

  return response.json([
    'course 06',
    'course 02',
    'course 03',
    'course 04',
  ]);
});

app.delete('/courses/:id', (request, response) => {
  return response.json([
    'course 06',
    'course 02',
    'course 04',
  ]);
});

app.listen(3333, () => {
  console.log('🚀 Server is running')
});

