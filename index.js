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

const PORT = process.env.PORT || 4111;

app.use(cors({
    origin: ["http://localhost:5173"],
    method: ["GET", "POST"],
    credentials: true
}))

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        mongoose.set("strictQuery", true);

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
        server.listen(PORT, () => {
            console.log(`App listening on PORT ${PORT}`);
        })
    );


app.use(cookieParser())
app.use(express.json());
app.use("/", authRoutes)
app.use("/hr", hrRoutes)
app.use("/employee", employeeRoutes)
app.use("/admin", adminRoutes)