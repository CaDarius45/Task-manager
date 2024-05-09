require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs')

const port = process.env.PORT ? process.env.PORT : '3000';

/*----------------Middleware------------------- */
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static('public'))
/*----------------MongoDB Connection------------------- */
mongoose.connect(process.env.MONGODBURI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB --📡 ${mongoose.connection.name}.`);
});

app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true,}));

app.get('/', (req,res) => {res.render('index')})
/*----------------Port connection------------------- */
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});