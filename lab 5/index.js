const express = require("express");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const User = require("./models/User");
const protect = require("./middleware/protect");
const checkRole = require("./middleware/checkRole");
const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const connectDB = require("./db");
dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

connectDB(process.env.MONGO_URI);

function errorHandlerMiddleware(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    status: "error",
    error: err.message,
  });
}

async function createDefaultUser() {
  try {
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      const hashedPassword = await bcryptjs.hash('adminpassword', 12);
      const defaultUser = new User({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@gmail.com',
        role: 'admin',
        fullName: 'Admin User'
      });
      await defaultUser.save();
      console.log('Default user added successfully');
    } else {
      console.log('Default user already exists');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
}

createDefaultUser().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});
