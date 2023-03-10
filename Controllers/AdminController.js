const BannerModel = require("../Models/BannerModel");

const fs = require("fs");

const url = require("url");

const path = require("path");
const UserModel = require("../Models/UserModel");

module.exports.image = async (req, res) => {

    // Parsing the URL
    var request = url.parse(req.url, true);

    // console.log(request.query);

    // Extracting the path of file
    var action = request.pathname;
    // console.log(action);

    var filePath = path.join(__dirname,
        action).split("%20").join(" ");

    // console.log(filePath);
    fs.exists(filePath, function (exists) {
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });
            res.end("404 Not Found");
            return;
        }

        // Extracting file extension
        var ext = path.extname(action);

        // Setting default Content-Type
        var contentType = "text/plain";

        // Checking if the extension of
        // image is '.png'
        if (ext === ".png") {
            contentType = "image/png";
        }

        // Setting the headers
        res.writeHead(200, {
            "Content-Type": contentType
        });

        // Reading the file
        fs.readFile("" + request.query.q,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });
}

module.exports.postBanner = async (req, res) => {
    try {
        new BannerModel({ image: req.file.path }).save().then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}

module.exports.getBanner = async (req, res) => {
    try {
        await BannerModel.find().then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}

module.exports.deleteBanner = async (req, res) => {
    try {
        await BannerModel.findByIdAndRemove(req.body.id).then(() => res.status(201).json({ data: "Deleted" })).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}

module.exports.getSalaryDetails = async (req, res) => {
    try {
        let basic = []
        let insurance = []
        let CTC = []
        let timeStamps = []
        let employee = []
        const users = await UserModel.find();
        users.map((user) => {
            user.salaryStructure.map((slip) => {
                basic.push(slip.basic);
                insurance.push(slip.insurance);
                CTC.push(slip.CTC);
                let date = slip.timeStamps.setDate(slip.timeStamps.getDate())
                let ts = new Date(date).toISOString().split('T')[0]
                timeStamps.push(ts);
                employee.push(user.email);
            })
        });
        res.status(201).json({ basic, insurance, CTC, timeStamps, employee })
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}

module.exports.accessControll = async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.id)
        await UserModel.findByIdAndUpdate(req.body.id, {
            $set: {
                access: !user.access
            }
        }).then((data) => res.status(201).json(data)).catch(err => res.json(err))
    } catch (err) {
        res.json({ errMessage: err.message });
    }
}