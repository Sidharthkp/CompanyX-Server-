const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' })
const cors = require('cors')
const authRoutes = require("./Routes/AuthRoutes")
const hrRoutes = require("./Routes/HRRoutes")
const employeeRoutes = require("./Routes/EmployeeRoutes")
const adminRoutes = require("./Routes/AdminRoutes")
const app = express();
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const http = require("http");

const server = http.createServer(app)

app.use(cors({
    origin: ["https://companyxweb.netlify.app"],
    method: ["GET", "POST"],
    credentials: true
}))

mongoose
    .connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        mongoose.set("strictQuery", false);

        const db = mongoose.connection;

        db.on("connected", function () {
            console.log("Success: MongDB Connected");
        });
        db.on(
            "error",
            console.error.bind(console, "Error: MongoDB connection error:")
        );
    })
    .then(() =>
        server.listen(config.PORT, () => {
            console.log(`App listening on PORT ${config.PORT}`);
        })
    );


app.use(cookieParser())
app.use(express.json());
app.use("/", authRoutes)
app.use("/hr", hrRoutes)
app.use("/employee", employeeRoutes)
app.use("/admin", adminRoutes)