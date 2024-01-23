const express = require('express');
const port = 8007;
const path = require('path');
const app = express();
const db = require('./config/mongodb');
const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'User_Assets')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(session({
    name : 'RNW',
    secret : 'RNW',
    resave : false,
    saveUnitialized : false,
    cookie : {
        maxAge : 1000*60*100
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentic);

app.use('/',require('./router/user'));
app.use('/admin',require('./router/admin'));

app.listen(port,function(err){
    if(err){
        console.log("Server not Connect");
        return false;
    }
    console.log("Server Connected =",port);
})