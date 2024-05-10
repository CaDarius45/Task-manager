const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

//Index
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id).populate('account')
    if (currentUser.account) {
        const allUsers = await User.find()
        res.render('users/index', {users: allUsers})
    }else{
        res.render('accounts/new', {users: currentUser})
    }
 });

module.exports = router;