const mongoose = require("mongoose");

const bmwSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  hp: { type: Number, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Bmw", bmwSchema);