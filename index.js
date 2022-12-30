var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var app = express();
app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//For Image Uploading
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));
app.use("/public", express.static(path.join(__dirname, "public")));

//Route Connection
app.use("/user",require('./routes/customerRoutes'));
app.use("/admin",require('./routes/adminRoutes'));


//Login With Google

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    userProfile=profile;
    return done(null, userProfile);
}
));

app.get('/auth/google', 
passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/error' }),
function(req, res) {
  // Successful authentication, redirect success.
  res.redirect('/success');
});


//Login with facebook


//Database connection with mongodb
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017",
    {
      dbName: "nightBazar",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log({err : err}) : console.log(
        "Connected to demo-name database")
  );


  //Running Server Port
  app.listen(8000, function () {
    console.log('Listening to Port 8000');
  });
