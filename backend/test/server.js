const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON data in requests
app.use(bodyParser.json());

// Sample array to store income data (you should use a database in a real application)
const incomes = [];

// Define your routes and controller functions
app.get('/incomes', (req, res) => {
  res.json(incomes);
});

app.post('/incomes', (req, res) => {
  const newIncome = req.body;
  incomes.push(newIncome);
  res.status(201).json(newIncome);
});

app.get('/incomes/:id', (req, res) => {
  const id = req.params.id;
  const income = incomes.find((income) => income.id === id);

  if (!income) {
    res.status(404).json({ message: 'Income not found' });
  } else {
    res.json(income);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the Express app for testing
