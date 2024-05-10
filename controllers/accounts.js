const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

//index
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    try {
        res.render('index', {users: currentUser})
      } catch (error) {
        console.log(`HEllO here is your error:${error}`); 
        res.redirect(`/users/${res.locals.user._id}/recipes`);
      }
});
//CREATE
router.post('/', async (req, res) => {
    const currentUser = await User.findById(res.locals.user._id);
    try {
        req.body.name = req.body.name.join(' ')
        currentUser.account = req.body
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/account`)
    } catch (error) {
        console.log(`Account create:${error}`);
        res.redirect(`/users/${currentUser._id}/users`)
    }
});

module.exports = router;