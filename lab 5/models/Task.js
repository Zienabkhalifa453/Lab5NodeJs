const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  todotitle: {
    type: String,
    required: true,
    minLength: [3, "min length must be 3"],
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

 

});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
