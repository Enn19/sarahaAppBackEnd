import userModel from '../../../DB/models/user.model.js';
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import session from 'express-session';
import cloudinary from './../../../utils/cloudinary.js';
import messageModel from '../../../DB/models/message.model.js';

//dispaly profile
export const profileDisplay = async (req, res, next) => {
    const user = await userModel.findById({ _id: req.session.user._id })
    const messages = await messageModel.find({ recevideId: req.session.user._id })
    return res.render("profile", {
        css: "../shared/css/signup.css",
        js: "../shared//js/signup.js",
        user,
        link: `/user/shareProfile/${user._id}`,
        messages
    })
}
//display not autherized
export const notAuthorizedDisplay = (req, res, next) => {
    return res.render("notAuthorized", {
        css: "../shared/css/signup.css",
        js: "../shared//js/signup.js",
        user: req.session.user
    })
}
//profile 
export const profileUser = async (req, res, next) => {
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, { folder: "user" });
    await userModel.updateOne({ _id: req.session.user._id }, { image: secure_url }, { new: true });
    return res.redirect("/user/profile");
}
//display oneprofile 
export const profileOneDisplay = async (req, res, next) => {
    const user = await userModel.findById({ _id: req.params.id });
    return res.render("shareProfile", {
        css: "../../shared/css/signup.css",
        js: "../../shared/js/signup.js",
        user,
        status: req.flash("status")[0]
    });
};
//logOut

export const logOut = async (req, res, next) => {
    const users = await userModel.updateOne({ _id: req.session?.user?._id }, {status:"offline"})
    req.session.destroy()
    return res.redirect("/auth/logIn");
}
