const Admin = require('../models/Admin');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
module.exports.add_admin = async(req,res)=>{
    return res.render('add_admin');
}

module.exports.insertAdminData = async(req,res)=>{
    try {
        req.body.name = req.body.fname+' '+req.body.lname;
        let adminImagePath = '';
        if(req.file){
            adminImagePath = Admin.imageModel+'/'+req.file.filename;
            if(adminImagePath){
                req.body.adminImage = adminImagePath;
            }
            else{
                console.log("Image Path not FOund");
                return res.redirect('back');
            }
        }
        req.body.isActive = true;
        req.body.currentdate = new Date().toLocaleString();
        req.body.updatedate = new Date().toLocaleString();
        req.body.role = "admin";
        await Admin.create(req.body);
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.registerData = async(req,res)=>{
    try {
        req.body.name = req.body.fname+' '+req.body.lname;
        req.body.isActive = true;
        req.body.currentdate = new Date().toLocaleString();
        req.body.updatedate = new Date().toLocaleString();
        req.body.role = "admin";
        await Admin.create(req.body);
        return res.redirect('/admin');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.dashboard = async(req,res)=>{
    return res.render('dashboard');
}

module.exports.view_admin = async(req,res)=>{
    try {
        let search = '';
        if(req.query.search){
            search = req.query.search;
        }
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0; 
        }
        var perPage = 6;
        let data = await Admin.find({
            $or : [
                {"name" : {$regex:".*"+search+".*",$options:"i"}},
                {"email" : {$regex:".*"+search+".*",$options:"i"}},
            ]
        })
        .limit(perPage)
        .skip(perPage*page);
        let totalAdminData = await Admin.find({
            $or : [
                {"name" : {$regex:".*"+search+".*",$options:"i"}},
                {"email" : {$regex:".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('view_admin',{
            AdminData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalAdminData/perPage),
            curentPage : page
        });    
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.isactive = async(req,res)=>{
    try {
        if(req.params.id){
            let data = await Admin.findByIdAndUpdate(req.params.id,{isActive:false});
            if(data){
                console.log("Record Deactive Successfully");
                return res.redirect('back');
            }
            else{
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.deactive = async(req,res)=>{
    try {
        if(req.params.id){
            let data = await Admin.findByIdAndUpdate(req.params.id,{isActive:true});
            if(data){
                console.log("Record Active Successfully");
                return res.redirect('back');
            }
            else{
                console.log("Record Not Active");
                return res.redirect('back');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.delete = async(req,res)=>{
    try {
        let data = await Admin.findById(req.params.id);
        if(data.adminImage){
            fullPath = path.join(__dirname,"..",data.adminImage);
            fs.unlinkSync(fullPath);
            let deleteData = await Admin.findByIdAndDelete(req.params.id);
            if(deleteData){
                console.log("Record And Image Delete Successfully");
                return res.redirect('back');
            }
            else{
                console.log("Image Delete Successfully");
                return res.redirect('back');
            }
        }
        else{
            let deleteData = await Admin.findByIdAndDelete(req.params.id);
            if(deleteData){
                console.log("Record Delete Successfully");
                return res.redirect('back');
            }
            else{
                console.log("Record And Image not Delete");
                return res.redirect('back');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.update = async(req,res)=>{
    try {
        let data = await Admin.findById(req.params.id); 
        let splitName = await data.name.split(' ');
        return res.render('update_admin',{
            AdminData : data,
            splitName : splitName
        });
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editAdminData = async(req,res)=>{
    try {
        if(req.file){
            let data = await Admin.findById(req.body.EditId);
            if(data){
                if(data.adminImage){
                    let fullPath = path.join(__dirname,"..",data.adminImage);
                    await fs.unlinkSync(fullPath);
                }
                let adminImagePath = await Admin.imageModel+'/'+req.file.filename;
                req.body.adminImage = adminImagePath;
                req.body.name = req.body.fname+' '+req.body.lname;
                if(req.body.city=='- - Select City - -'){
                    req.body.city = '';
                }
                let updateData = await Admin.findByIdAndUpdate(req.body.EditId,req.body);
                if(updateData){
                    console.log("Record And Image Update Successfully");
                    return res.redirect('/admin/logout');
                }
                else{
                    console.log("Image Update Successfully");
                    return res.redirect('/admin/logout')
                }
            }
        }
        else{
            req.body.name = req.body.fname+' '+req.body.lname;
            if(req.body.city=='- - Select City - -'){
                req.body.city = '';
            }
            let updateData = await Admin.findByIdAndUpdate(req.body.EditId,req.body);
            if(updateData){
                console.log("Record Update Successfully");
                return res.redirect('/admin/logout');
            }
            else{
                console.log("Record And Image Not Update");
                return res.redirect('back')
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.loginCheck = async(req,res)=>{
    return res.redirect('/admin/dashboard');
}

module.exports.logout = async(req,res)=>{
    try {
        res.clearCookie('RNW');
        return res.redirect('/admin/');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back'); 
    }
}

module.exports.checkMail = async(req,res)=>{
    try {
        return res.render('ForgotPassword/checkMail');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.mailCheck = async(req,res)=>{
    try {
        let chekemaildata = await Admin.findOne({ email: req.body.email });
        if (chekemaildata) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "sahilmaniya76@gmail.com",
                    pass: "ajmkqqnndvxjwmos",
                },
            });
            var otp = Math.floor(100000+Math.random()*900000);
            var stringotp = otp.toString();
            var bcryptotp = await bcrypt.hash(stringotp,10);
            res.cookie('otp',bcryptotp);
            res.cookie('email',chekemaildata.email);
            const info = await transporter.sendMail({
                from: 'sahilmaniya76@gmail.com', // sender address
                to: chekemaildata.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello its your otp", // plain text body
                html: `<h3>OTP = ${otp}</h3>`, // html body
            });
            if(info){
                console.log("OTP Send");
                return res.redirect('/admin/send_otp');
            }
        }
        else {
            console.log("email not match");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back'); 
    }
}

module.exports.send_otp = async(req,res)=>{
    try {
        return res.render('ForgotPassword/send_otp');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back'); 
    }
}

module.exports.profile = async(req,res)=>{
    try {
        return res.render('profile');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.update_profile = async(req,res)=>{
    try {
        if (req.user == undefined) {
            return res.redirect('/admin/');
        }
        let splitName = req.user.name.split(' ');
        return res.render('update_profile', {
            splitName: splitName,
        });
    } 
    catch (error) {
        console.log(error);;
        return res.redirect('back');    
    }
}

module.exports.changepassword = async(req,res) =>{
    try {
        return res.render('changepassword');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editPassword = async(req,res) =>{
    try {
        let oldData = req.user;
        if (oldData.password == req.body.Cupass) {
            if (req.body.Nepass != req.body.Cupass) {
                if (req.body.Nepass == req.body.Copass) {
                    let oldadmin = await Admin.findById(oldData._id);
                    if (oldadmin) {
                        let editpassword = await Admin.findByIdAndUpdate(oldadmin._id, { 'password': req.body.Nepass });
                        if (editpassword) {
                            return res.redirect('/admin/logout');
                        }
                        else {
                            console.log('password not chenge');
                        }
                    }
                }
                else {
                    console.log('Password Does not match');
                }
            }
            else {
                console.log('new password and confirm password are not match');
                // return res.redirect('back');
            }
        }
        else {
            console.log('current password are not match');
            // return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.verify_otp = async(req,res)=>{
    try {
        if(await bcrypt.compare(req.body.otp,req.cookies.otp)){
            return res.render('ForgotPassword/new_password');
        }
        else{
            console.log("Otp Not Match");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.check_newpassword = async(req,res)=>{
    try {
        if(req.body.Nepass == req.body.Copass){
            let email = req.cookies.email;
            let checkEmail = await Admin.findOne({email:email});
            if(checkEmail){
                let resetPassword = await Admin.findByIdAndUpdate(checkEmail.id,{password:req.body.Nepass});
                if(resetPassword){
                    res.clearCookie('otp');
                    res.clearCookie('email');
                    return res.redirect('/admin/');
                }
                else{
                    console.log("Password Not Changed");
                    return res.redirect('back');
                }
            }
            else{
                console.log("Email Not Found");
                return res.redirect('back');
            }
        }
        else{
            console.log("Password Not Matched");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');   
    }
}