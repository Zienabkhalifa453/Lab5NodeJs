
const User = require("../models/User");
const APIErrors = require("../utilities/APIErrors");
const userSchema = require("../utilities/validators/userValidation");
const asyncHandler = require("../utilities/validators/AsyncHandler");
const bcryptjs = require("bcryptjs");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "Users retrieved successfully!",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.register = asyncHandler(async (req, res, next) => {
  const newUser = { ...req.body };
  const user = new User(newUser);

  await user.save();

  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new APIErrors("Not found", 404));
  }
  const isMatch = await bcryptjs.compare(req.body.password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    next(new APIErrors("one of credtial is not valid", 400));
  }
  const secretKey = "ITI";
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    secretKey,
    {
      expiresIn: "5D",
    }
  );
  res.status(200).json({
    status: "success",
    token: token,
  });
});

exports.getOneUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new APIErrors("User not found", 404));
    }
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    next(new APIErrors(error.message, 500));
  }
};

exports.updateUser = async (req, res, next) => {
  const updatedUser = { ...req.body };
  const id = req.params.id;

  try {
    await userSchema.validateAsync(updatedUser);
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!user) {
      return next(new APIErrors("User not found", 404));
    }
    res.status(200).json({
      status: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    next(new APIErrors(error.message, 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(new APIErrors("User not found", 404));
    }
    res.status(204).json();
  } catch (error) {
    next(new APIErrors(error.message, 500));
  }
};
