const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true,
  },

  routeBusId: {
    type: String,
    required: true,
  },

  routeInspector: {
    type: String,
    required: true,
  },

  routeDepart: {
    type: String,
    required: true,
  },

  routeArrive: {
    type: String,
    required: true,
  },

  routeDistance: {
    type: String,
    required: true,
  },

  routeTime: {
    type: String,
    required: true,
  },
});

routeSchema.plugin(uniqueValidator, {
  message: "Route already exists",
});

const Route = mongoose.model("route", routeSchema);

module.exports = Route;
