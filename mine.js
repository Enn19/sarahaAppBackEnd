import express from "express"
import bootstrap from './src/bootStrab.js';
import { config } from "dotenv"
import cors from "cors"
const app = express()
config()

const port = +process.env.PORT
bootstrap(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))