const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const inspectorSchema = new mongoose.Schema({
  inspectorId: {
    type: String,
    required: true,
    unique: true,
  },

  inspectorName: {
    type: String,
    required: true,
  },

  inspectorContact: {
    type: String,
    required: true,
  },

  busID: {
    type: String,
    required: true,
  },

  busRoute: {
    type: String,
    required: true,
  },

  inspectorSalary: {
    type: String,
    required: true,
  },

  inspectorStatus: {
    type: String,
    required: true,
  },
});

inspectorSchema.plugin(uniqueValidator, {
  message: "Insepector already exists",
});

const Inspector = mongoose.model("inspector", inspectorSchema);

module.exports = Inspector;
