var express     = require('express'),
    mongoose    = require('mongoose'),
    session     = require('express-session'),
    passport    = require('passport'),
    UserController = require('./controllers/UserController.js');


// App definition
var app = express();

// Require middleware
require('./middleware/middleware')(app);

// require passport config
require('./config/passport')(passport);

// Setup passport middleware and sessions


//express session
app.use(session({
    secret: 'devMountainIsFullOFsecrets',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// -> Auth
app.post('/api/auth', passport.authenticate('local-signup', {
   successRedirect : '/',
   failureRedirect : '/signup'
}));

app.get('/api/get-user', UserController.getUser);


// Mongoose connection

var mongooseUri = 'mongodb://localhost/auth';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('Mongoose uri:', mongooseUri);
});

app.listen(3000, function () {
    console.log('Aliens are watching on port: ' + 3000);
});
