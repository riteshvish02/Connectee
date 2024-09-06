const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Mentor = require('../models/mentorModel');
const Mentee = require('../models/menteeModel');

// Configure Passport to use Mentor local strategy
passport.use('mentor-local', new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        Mentor.findOne({ email: email }, function(err, mentor) {
            if (err) return done(err);
            if (!mentor) return done(null, false, { message: 'Incorrect email.' });
            mentor.authenticate(password, function(err, isMatch) {
                if (err) return done(err);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
                return done(null, mentor);
            });
        });
    }
));

// Configure Passport to use Mentee local strategy
passport.use('mentee-local', new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        Mentee.findOne({ email: email }, function(err, mentee) {
            if (err) return done(err);
            if (!mentee) return done(null, false, { message: 'Incorrect email.' });
            mentee.authenticate(password, function(err, isMatch) {
                if (err) return done(err);
                if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
                return done(null, mentee);
            });
        });
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user.constructor.modelName });
});

// Deserialize user
passport.deserializeUser((obj, done) => {
    const { id, type } = obj;
    if (type === 'Mentor') {
        Mentor.findById(id, (err, user) => done(err, user));
    } else if (type === 'Mentee') {
        Mentee.findById(id, (err, user) => done(err, user));
    } else {
        done(new Error("Unknown user type"));
    }
});
