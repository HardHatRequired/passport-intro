var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/UserModel.js');

// Require local strategy

// Require user model

// module.exports fucntion(passport)

module.exports = function(passport) {
  //  serialize the user for the session
  passport.serializeUser(function(user, done) {
         console.log("USER", user);
         done(null, user.id);
     });

  //  deserialize the user for the session
  passport.deserializeUser(function(id, done) {
      console.log("ID", id);
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
             // by default, local strategy uses username and password, we will override with email
             usernameField : 'email',
             passwordField : 'password',
             passReqToCallback : true // allows us to pass back the entire request to the callback
         },
         function(req, email, password, done) {
             // asynchronous
             // User.findOne wont fire unless data is sent back
             process.nextTick(function() {
                 // find a user whose email is the same as the forms email
                 // we are checking to see if the user trying to login already exists
                 User.findOne({ 'email' :  email }, function(err, user) {
                     // if there are any errors, return the error
                     if (err) return done(err);
                     // check to see if theres already a user with that email
                     if (user) {
                         if (user.validPassword(password)) {
                             return done(null, user);
                         } else {
                             return done(null, false);
                         }
                     } else {
                         // if there is no user with that email
                         // create the user
                         var newUser = new User();
                         // set the user's local credentials
                         newUser.email    = email;
                         newUser.password = newUser.generateHash(password);
                         // save the user
                         newUser.save(function(err) {
                             if (err) throw err;
                             return done(null, newUser);
                         });
                     }
                 });
             });
         }));

};
