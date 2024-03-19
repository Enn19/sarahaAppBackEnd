import { Types } from "mongoose";
import  flash  from 'express-flash';

export const validation = (schema,url) => {
    return (req, res, next) => {
        try {
            let methods;
            if (req.headers.authorization) {
                methods = { ...req.body, ...req.query, ...req.params, authorization: req.headers.authorization }
            } else {
                methods = { ...req.body, ...req.query, ...req.params };
            }

            if (req.file) {
                methods = { ...methods, file: req.file };
            }

            if (req.files) {
                methods = { ...methods, files: req.files };
            }

            const validationResult = schema.validate(methods, { abortEarly: false });
            const validationError = []

            if (validationResult?.error) {
                for (const errorElement of validationResult?.error.details) {
                    validationError.push(errorElement.path[0])
                }
                req.flash("validationError", validationError)
                return res.redirect(url)
            }

            return next();
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                stack: error.stack,
            });
        }
    };
};


export const idValidation = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message('invalid id');
}