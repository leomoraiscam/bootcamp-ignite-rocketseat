const { request, response } = require('express');
const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();
app.use(express.json());

const costumers = [];

function veryIfExistAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = costumers.find((costomer) => costomer.cpf === cpf);

  if(!customer) {
    return response.status(400).json({
      error: 'Customer not exist'
    });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

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

app.get('/statement', veryIfExistAccountCPF ,(request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

app.post('/deposit', veryIfExistAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post('/withdraw', veryIfExistAccountCPF ,(request, response) => {
  const { amount } = request.body; 
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if(balance < amount) {
    return response.status(400).json({
      error: 'Insufficient funds!'
    })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  };  

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.get('/statement/date', veryIfExistAccountCPF ,(request, response) => {
  const { date } = request.query;
  const { customer } = request;

  const dateFormat = new Date(date + ' 00:00');

  const statement = customer.statement.filter(
    (statement) =>  
      statement.created_at.toDateString() === 
      new Date(dateFormat.toDateString())
  );

  return response.status(200).json(statement);
});

app.put('/account', veryIfExistAccountCPF ,(request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  response.status(201).send();
});

app.get('/account', veryIfExistAccountCPF, (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer);
});

app.delete('/account', veryIfExistAccountCPF, (request, response) => {
  const { customer } = request;

  costumers.splice(customer, 1);

  return response.status(200).json(customer);
});

app.get('/balance', veryIfExistAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.status(200).json(balance);
});

app.listen(3333, () => {
  console.log('🚀 Server is running')
});

