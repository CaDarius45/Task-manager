const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

//profile picture array
const backgrounds = [ 
  "flying",
  "cat",
  "corgi",
  "joy", 
  "boy", 
  "flower", 
  "girl"
]

//index
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    try {
        res.render('accounts/index', {users: currentUser})
      } catch (error) {
        res.redirect(`/users/${res.locals.user._id}/recipes`);
      }
});
//New 
router.get("/new", (req, res) => {
  res.render('accounts/new', {pic: backgrounds})
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
        res.redirect(`/users/${currentUser._id}/users`)
    }
});
//EDIT
router.get('/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(res.locals.user._id).populate('account');
        const curAco = currentUser.account
        const name = curAco.name.split(" ")
        res.render('accounts/edit',{user: curAco, use: name,pic: backgrounds})
    } catch (error) {
        res.redirect('/account')
    }
  });
//update
router.put('/', async (req, res) => {
    try {
        const currentUser = await User.findById(res.locals.user._id).populate('account');
        req.body.name = req.body.name.join(' ')
        await currentUser.account.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/account`)
    } catch (error) {
      res.redirect('/')
    }
  });
//DELETE
router.delete('/', async (req, res) => {
    try {
      await User.findByIdAndDelete(res.locals.user._id);
      res.redirect('/auth/sign-out');
    } catch (error) {
      res.redirect(`/`)
    }
});

module.exports = router;