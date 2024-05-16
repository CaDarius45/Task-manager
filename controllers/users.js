const User = require('../models/user.js');
const Task = require('../models/task.js');
const express = require('express');
const router = express.Router();

//Index
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id).populate('account')
    if (currentUser.account) {
        const allUsers = await User.find()
        const users = allUsers.filter(xuser => (xuser.id !== currentUser.id && xuser.account))
        res.render('users/index', {use: users,user: currentUser})
    }else{
        res.redirect(`/users/${currentUser._id}/account/new`)
    }
 });
 //Show
 router.get("/:userid", async (req, res) => {
    const otherUser = await User.findById(req.params.userid);
    const allTask = await Task.find({ owner: otherUser.id}).populate('owner')
    res.render("users/show", { user: otherUser, task: allTask});
  });

module.exports = router;