const { request, response } = require('express');
const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(express.json());

const costumers = [];

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const costumersAlredyExist = costumers.some((costumer) => costumer.cpf === cpf);

  if (costumersAlredyExist) {
    return response.status(400).json({
      error: 'Custemer alredy exist!' 
    })
  }

  costumers.push({
    id: uuidV4(),
    cpf,
    name,
    statement: []
  });

  return response.status(201).send();
});

app.get('/statement/:cpf', (request, response) => {
  const { cpf } = request.params;

  const custumer = costumers.find((costumer) => costumer.cpf === cpf);

  return response.status(200).json(custumer.statement);
});


app.listen(3333, () => {
  console.log('🚀 Server is running')
});

