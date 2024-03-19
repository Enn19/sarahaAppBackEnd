import session from "express-session"
import { connection } from "./DB/connection.js"
import authRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import messageRouter from "./modules/message/message.router.js"
import { globalError } from "./utils/asyncHandelar.js"
import mongoDBStore from 'connect-mongodb-session';

import flash from "express-flash"

const bootstrap = (app, express) => {
    app.use(express.json())
    app.set("view engine", "ejs")
    app.set("views", "./src/views")
    app.use("/shared", express.static("./src/views/shared"))
    app.use(express.urlencoded({ extends: false }))
    const MongoDBStore = mongoDBStore(session)
    var store = new MongoDBStore({
        uri: process.env.URI,
        collection: 'sessions'
    });

    // Catch errors
    store.on('error', function (error) {
        console.log(error);
    });
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store
    }))
    app.use(flash())
    app.use("/uploads", express.static("uploads"))
    app.use("/user", userRouter)
    app.use("/message", messageRouter)
    app.use("/auth", authRouter)
    connection()
    app.use(globalError)
}

export default bootstrap
