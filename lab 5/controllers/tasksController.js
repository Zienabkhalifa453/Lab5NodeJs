
const Task = require("../models/Task");
const APIErrors = require("../utilities/APIErrors");
const asyncHandler = require("../utilities/validators/AsyncHandler");
exports.getTasks = asyncHandler(async (req, res, next) => {
  

  
  const tasks = await Task.find({});
    res.status(200).json({
      status: "Tasks retrived successfully!",
      data: tasks,
    });
});

exports.createTask = async (req, res, next) => {
  const newTask = { ...req.body };   
     try {
    const task = new Task(newTask);
    await task.save();
    res.status(201).json({
      status: "created successfully!",
      data: task,
    });
  } catch (error) {
    
    const err = new APIErrors(error.message, 400);
    next(err);
  }
};

exports.getOneTask = async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(new APIErrors("Not Found", 404));
    }
    res.status(200).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(new APIErrors(error.message, 500));
  }
};

exports.deleteTask = async (req, res, next) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(new APIErrors("Not Found", 404));
    }
    await Task.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    next(new APIErrors(error.message, 500));
  }
};

exports.updateTask = async (req, res, next) => {
  const updatedTask = { ...req.body };
  const id = req.params.id;

  const task = await Task.findByIdAndUpdate(id, updatedTask, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: task,
  });
};
