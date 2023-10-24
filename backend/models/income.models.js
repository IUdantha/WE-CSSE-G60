const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const incomeSchema = new mongoose.Schema({
  incomeRouteID: {
    type: String,
    required: true,
    unique: true,
  },

  incomeBusID: {
    type: String,
    unique: true,
    required: true,
  },

  incomeLoad: {
    type: String,
    required: true,
  },

  incomeDate: {
    type: String,
    required: true,
  },

  incomeIncome: {
    type: String,
    required: true,
  },

  incomeExpenses: {
    type: String,
    required: true,
  },

  incomeProfit: {
    type: String,
    required: true,
  },
});

incomeSchema.plugin(uniqueValidator, {
  message: "Income already exists",
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
