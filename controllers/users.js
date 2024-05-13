const User = require('../models/user.js');
const Task = require('../models/task.js');
const express = require('express');
const router = express.Router();

//Index
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id).populate('account')
    if (currentUser.account) {
        const allUsers = await User.find()
        res.render('users/index', {users: allUsers,user: currentUser})
    }else{
        res.render('accounts/new', {users: currentUser})
    }
 });
 //Show
 router.get("/:userid", async (req, res) => {
    const otherUser = await User.findById(req.params.userid);
    const allTask = await Task.find({ owner: otherUser.id}).populate('owner')
    res.render("users/show", { user: otherUser, task: allTask});
  });

module.exports = router;