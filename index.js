const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schemas
const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
});

// Models
const Task = mongoose.model('Task', taskSchema);
const User = mongoose.model('User', userSchema);

const main = async () => {
  // Create new task and save it
  const newTask = new Task({ name: 'Task 5', message: 'Create task 5' });
  newTask.save();
  const newUser = new User({
    name: 'TestUser',
    lastname: 'SomeLastName',
    age: '19',
    country: 'Zimbabwe',
    occupation: 'King',
  });
  // newUser.save();
  // Find one Task
  const goFind = await Task.find({ name: 'Task 3' });
  const findUser = await User.find({ name: 'Oliver' });
  console.log(findUser);
  // Delete one task
  const deleteOne = await User.findOneAndDelete({ name: 'TestUser' });
  console.log(deleteOne);
};

mongoose
  .connect('mongodb://localhost:27017/fbw21', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(main)
  .finally(() => {
    //res.send()
    mongoose.connection.close();
  });
