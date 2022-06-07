const express = require('express');
const uuid = require('uuid');
const { check, validationResult } = require('express-validator');

let Todo = require('../models/Todo');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//route Get api/todos
//desc Get all todos
//access public
router.get('/', authMiddleware, async (req, res) => {
  try {
    //const todoDB = await Todo.find();
    const todoDB = await Todo.find({ user: req.user.id });
    res.send(todoDB);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Get api/todos/:id
//desc Get todo by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send('todo not found');
    }
    res.send(todo);
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route Post api/todos
//desc Add a todo
//access public
router.post(
  '/',
  authMiddleware,
  [
    check('title', 'title is required').not().isEmpty(),
    check('description', 'description need to be at least 12 char').isLength({
      min: 12,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if (!req.body.title) {
    //   return res.status(400).json({ error: 'Missing Title' });
    // }

    try {
      const newTodo = await Todo.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        status: false,
      });
      res.send(newTodo);
    } catch (err) {
      return res.status(500).json({ error: 'Server erroe' });
    }
  }
);

//route Delete api/todos/
//desc delete todo by id
//access public
router.delete('/', async (req, res) => {
  //find the element
  try {
    const todo = await Todo.findOneAndRemove({ _id: req.body.id });
    if (!todo) {
      return res.status(404).send('todo not found');
    }
    res.send('todo deleted');
  } catch (err) {
    res.status(500).send('server error');
  }
});

//route PUT api/todos/
//desc update todo by id
//access public
router.put('/', async (req, res) => {
  try {
    const todo = await Todo.findById(req.body.id);
    if (!todo) {
      return res.status(404).send('todo not found');
    }

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.status = false;

    await todo.save();
    res.send(todo);
  } catch (err) {
    return res.status(500).json({ error: 'Server erroe' });
  }
});

module.exports = router;
