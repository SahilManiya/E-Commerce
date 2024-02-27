const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: '796522805764-0g1s6apcn9ha59qal8vh537g8pn5kntp.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8007/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
  console.log(profile);
    let checkMail = await User.findOne({email:profile.emails[0].value});
    if(checkMail){
        done(null,checkMail);
    }
    else{
        var pass = 123;
        let userDetails = {
            name : profile.displayName,
            email : profile.emails[0].value,
            isActive : true,
            password : pass,
            currentDate : new Date().toLocaleString() ,
            updateDate : new Date().toLocaleString(),
            role : 'user'
        }
        let insertUser = await User.create(userDetails);
        if(insertUser){
            return done(null,insertUser);
        }
        else{
            return done(null,false); 
        }
    }
}))
module.exports = GoogleStrategy;