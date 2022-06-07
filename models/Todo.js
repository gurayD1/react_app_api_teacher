const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: [true, 'Please add description'],
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Todo', todoSchema);
