
import { asyncHandler } from './../../../utils/asyncHandelar.js';
import userModel from '../../../DB/models/user.model.js';
import { generteToken, verifyToken } from '../../../utils/generateAndVerfiyToken.js';
import sendEmail from '../../../utils/email.js';
import { compare, hash } from '../../../utils/hashAndComparePassword.js';
import { customAlphabet } from 'nanoid'
import session from 'express-session';


// display signUp
export const displaySignUp = async (req, res, next) => {
    if (req.session?.user?._id) {
        return res.redirect("/user/profile")
    }
    return res.render("signUp", {
        css: "./shared/css/signup.css",
        js: "./shared//js/signup.js",
        emailError: req.flash("emailError")[0],
        data: req.flash("data")[0]
    })
}
//signUp action 
export const signUpAction = async (req, res, next) => {
    const { email } = req.body
    if (await userModel.findOne({ email })) {
        req.flash('emailError', "email aleary exist");
        req.flash('data', req.body);
        return res.redirect("/auth")
    }
    const token = generteToken({
        payload: { email },
        signature: process.env.SIGNUP_SIGNETURE,
        expiresIn: 60 * 30
    })
    const re_token = generteToken({
        payload: { email },
        signature: process.env.SIGNUP_SIGNETURE,
        expiresIn: 60 * 60 * 30
    })
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const re_link = `${req.protocol}://${req.headers.host}/auth/refrishToken/${re_token}`
    const html = `
    <a href="${link}">confirm email</a>
    <br/><br/>
    <a href="${re_link}">refrish email</a>
    `
    if (!sendEmail({ to: email, subject: "confirm email", html })) {
        req.flash('emailError', "invalid email");
        req.flash('data', req.body);
        return res.redirect("/auth")
    }
    req.body.password = hash({ plaintext: req.body.password })
    const newUser = await userModel.create(req.body)
    return res.redirect("/auth/logIn")
}
//dispaly login 
export const displayLogIn = (req, res, next) => {
    if (req.session?.user?._id) {
        return res.redirect("/user/profile")
    }
    return res.render("logIn", {
        css: "../shared/css/signup.css",
        js: "../shared//js/signup.js",
        emailError: req.flash("emailError")[0],
        validation: req.flash("emailError"),
        data: req.flash("data")[0]
    })
}
//login action
export const loginAction = async (req, res, next) => {
    const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            req.flash('emailError', 'Email or password not valid');
            req.flash('data', req.body);
            return res.redirect('/auth/logIn');
        }

        // If user's email is not confirmed
        if (!user.confirmEmail) {
            req.flash('emailError', 'Please confirm email first');
            req.flash('data', req.body);
            return res.redirect('/auth/logIn');
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await compare({ plaintext: password, hashValue: user.password });

        // If the provided password is invalid
        if (!isPasswordValid) {
            req.flash('emailError', 'Invalid password');
            req.flash('data', req.body);
            return res.redirect('/auth/logIn');
        }

        // Update user status to "online" and save changes
        if (user.isDeleted) {
            user.isDeleted = false;
        }
        user.status = 'online';
        await user.save();

        // Store user information in the session
        req.session.user = {
            _id: user._id,
            role: user.role,
            email: user.email
        };
        return res.redirect('/user/profile');
};

