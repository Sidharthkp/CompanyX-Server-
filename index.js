const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' })
const cors = require('cors')
const authRoutes = require("./Routes/AuthRoutes")
const app = express();
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT || 4111;

app.listen(PORT, console.log("Server has started on port number: " + PORT))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connected Successfully");
    }).catch(error => console.log(error.message));

app.use(cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
    credentials: "true"
}))

app.use(cookieParser())
app.use(express.json());
app.use("/", authRoutes)