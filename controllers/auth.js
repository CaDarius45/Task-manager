const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

/*---------------------Sign-up---------------------------*/
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up');
  });
/*---------------------Sign-in---------------------------*/
  router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in');
  });
/*---------------------Sign-out---------------------------*/
  router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
/*---------------------create-user---------------------------*/
  router.post('/sign-up', async (req, res) => {
    try {
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        return res.send('Username already taken.');
      }
      if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm Password must match');
      }
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
      await User.create(req.body);
      res.redirect('/auth/sign-in');
    } catch (error) {
      console.log(`Create user: ${error}`);
      res.redirect('/');
    }
  });
 /*---------------------check-user---------------------------*/
  router.post('/sign-in', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {return res.send('Login failed. Please try again.')};
        const validPassword = bcrypt.compareSync(req.body.password,userInDatabase.password);
        if (!validPassword) {
        return res.send('Login failed. Please try again.');
        }
        req.session.user = {username: userInDatabase.username, _id: userInDatabase._id};
        res.redirect('/');
    } catch (error) {
      console.log(`Check user: ${error}`);
      res.redirect('/');
    }
  });
  
  module.exports = router;