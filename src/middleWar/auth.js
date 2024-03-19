import jwt from "jsonwebtoken";
import userModel from './../DB/models/user.model.js';
import flash from 'express-flash';

export const roles = {
    Admin: "Admin",
    User: "User"
};

const auth = (role = Object.values(roles)) => {
    return async (req, res, next) => {
        if (req.session?.user?._id) {
            const user = await userModel.findById({ _id: req.session?.user?._id })
            if (!user) {
                req.flash("emailError", "invalid email ")
                req.session.destroy()
                return res.redirect("/auth")
            }
            if (!role.includes(user.role)) { // Move this block inside the if statement
                return res.redirect("/user/notAuthorized")
            }
            return next()
        }
        req.flash("emailError", "invalid session ")
        return res.redirect("/auth/logIn")
    }
};



export default auth;
