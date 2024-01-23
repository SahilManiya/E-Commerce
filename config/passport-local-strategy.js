const passport = require('passport');
const passportlocal = require('passport-local').Strategy;

const Admin = require('../models/Admin');

passport.use(new passportlocal({
    usernameField : "email"
},async function(email,password,done){
    let adminData = await Admin.findOne({email:email});
    if(adminData){
        if(password == adminData.password){
            return done(null,adminData);
        }
        else{
            return done(null,false);
        }
    } 
    else{
        return done(null,false);
    }
}))

passport.serializeUser(async(Admin,done)=>{
    return done(null,Admin.id);
})

passport.deserializeUser(async(id,done)=>{
    let adminRecord = await Admin.findById(id);
    if(adminRecord){
        return done(null,adminRecord);
    }
    else{
        return done(null,false);
    }
})

passport.setAuthentic = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

passport.cheAuth = (function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/admin/')
    }
})

module.exports = passport;