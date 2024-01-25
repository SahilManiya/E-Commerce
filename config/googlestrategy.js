const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '299093683043-fro66h1so01ud91er2hn6eb05ovo9tnm.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://localhost:8007/admin/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    console.log(profile);
  }
))