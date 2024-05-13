const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

//index
router.get('/', async (req, res) => {
    const currentUser = await User.findById(req.session.user._id)
    try {
        res.render('accounts/index', {users: currentUser})
      } catch (error) {
        console.log(`Account index :${error}`); 
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
//EDIT
router.get('/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(res.locals.user._id).populate('account');
        const curAco = currentUser.account
        const name = curAco.name.split(" ")
        res.render('accounts/edit',{user: curAco, use: name})
    } catch (error) {
        console.log(`Account Edit:${error}`);
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
      console.log(`Account update:${error}`);
      res.redirect('/')
    }
  });
//DELETE
router.delete('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.locals.user._id).populate('account');
      currentUser.account.deleteOne();
      await currentUser.save();
      res.redirect('/auth/sign-out');
    } catch (error) {
      console.log(`delete Account:${error}`);
      res.redirect('/accounts')
    }
});


module.exports = router;