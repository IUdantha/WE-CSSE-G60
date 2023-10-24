const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const scheduleSchema = new mongoose.Schema({
  scheduleBusId: {
    type: String,
    required: true,
    unique: true,
  },

  scheduleRouteId: {
    type: String,
    required: true,
  },

  scheduleDriver: {
    type: String,
    required: true,
  },

  scheduleInspector: {
    type: String,
    required: true,
  },

  scheduleDepart: {
    type: String,
    required: true,
  },

  scheduleArrive: {
    type: String,
    required: true,
  },

  scheduleLoad: {
    type: String,
    required: true,
  },
});

scheduleSchema.plugin(uniqueValidator, {
  message: "Schedule already exists",
});

const Schedule = mongoose.model("schedule", scheduleSchema);

module.exports = Schedule;
