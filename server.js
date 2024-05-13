require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs')

const port = process.env.PORT ? process.env.PORT : '3000';

const authController = require('./controllers/auth.js')
const usersController = require('./controllers/users.js')
const accountController = require('./controllers/accounts.js')
const taskController = require('./controllers/tasks.js')

/*----------------Middleware------------------- */
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static('public'))
app.use(methodOverride('_method'));
/*---------------------server---------------------------*/
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')
/*----------------MongoDB Connection------------------- */
mongoose.connect(process.env.MONGODBURI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB --📡 ${mongoose.connection.name}.`);
});

app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true,}));

app.use(passUserToView)

app.get('/', (req,res) => {if (req.session.user) {res.redirect(`/users/${req.session.user.id}/users`)} else {res.render('index')}})

app.use('/auth', authController)
app.use(isSignedIn)
app.use('/users/:userId/users',usersController)
app.use('/users/:userId/account',accountController)
app.use('/users/:userId/task',taskController)
/*----------------Port connection------------------- */
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});