const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const User = require('../models/User');
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

passport.use('user',new passportlocal({
    usernameField : 'email'
}, async function(email,password,done){
    let userdata = await User.findOne({email : email});
    if(userdata){
        if(userdata.password == password){
            return done(null,userdata)
        }
        else{
            return done(null,false)
        }
    }
    else{
        return done(null,false);
    }
}));

passport.serializeUser(async(Admin,done)=>{
    return done(null,Admin.id);
})

passport.deserializeUser(async(id,done)=>{
    let adminRecord = await Admin.findById(id);
    let userdata = await User.findById(id);
    if(adminRecord){
        return done(null,adminRecord);
    }
    else if(userdata){
        return done(null,userdata);
    }
    else{
        return done(null,false);
    }
})

passport.setAuthentic = (req,res,next)=>{
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            res.locals.user = req.user;
        }
        else{
            res.locals.userdata = req.user;
        }
    }
    return next();
}

passport.cheAuth = (function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role =='user'){
            console.log('You have no Authorizastion');
            return res.redirect('/')
        }
        next();
    }
    else{
        res.redirect('/admin/')
    }
})

passport.checkUserAthuntication = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/');
    }
}

module.exports = passport;