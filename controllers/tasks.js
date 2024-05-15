const Task = require('../models/task.js');
const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

//index
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({owner: res.locals.user._id}).populate('owner')
        res.render('tasks/index', {task: tasks})
    } catch (error) {
        console.log(`Task index: ${error}`);
        res.redirect(`/users/${res.locals.user._id}/task`);
    }
});
// New 
router.get('/new', (req, res) => {
    res.render('tasks/new')
})
  // create
router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Task.create(req.body);
    res.redirect(`/users/${req.session.user._id}/task`);
});
  //show
router.get('/:taskId', async (req, res) => {
    try {
      const tasks = await Task.findById(req.params.taskId).populate('owner')
      res.render('tasks/show', {task: tasks});
    } catch (error) {
      console.log(error);
      res.redirect(`/users/${res.locals.user._id}/task`);
    }
});
  //edit
router.get('/:taskId/edit', async (req, res) => {
    try {
      const tasks = await Task.findById(req.params.taskId);
      res.render('tasks/edit', {task: tasks,});
    } catch (error) {
      console.log(error);
      res.redirect(`/users/${res.locals.user._id}/task`);
    }
});
  //update
router.put('/:taskId', async (req, res) => {
    try {
      const tasks = await Task.findById(req.params.taskId);
      await tasks.updateOne(req.body)
      await tasks.save()
      res.redirect(`/users/${res.locals.user._id}/task`);
    } catch (error) {
      console.log(error);
      res.redirect(`/users/${res.locals.user._id}/task`);
    }
});
  //delete task
router.delete('/:taskId', async (req, res) => {
    try {
      const tasks = await Task.findById(req.params.taskId).populate('owner');
      if (tasks.owner.equals(req.session.user._id)) {
        await tasks.deleteOne(req.body);
        res.redirect(`/users/${res.locals.user._id}/task`);
      } else {
        res.send("You don't have permission to do that.");
      }
    } catch (error) {
      console.log(error);
      res.redirect(`/users/${res.locals.user._id}/task`);
    }
});


module.exports = router;