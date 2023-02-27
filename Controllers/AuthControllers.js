const UserModel = require("../Models/UserModel");
// const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: maxAge
//     });
// }

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "Incorrect Email") errors.email = "That email is not registered"

    if (err.message === "Incorrect Password") errors.password = "That password is incorrect"

    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.create({ email, password });
        const token = createToken(user._id);

        // res.cookie("jwt", token, {
        //     withCredentials: true,
        //     httpOnly: false,
        //     maxAge: maxAge * 1000,
        // });
        res.status(201).json({ user: user._id, created: true })
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password, secretCode } = req.body;
        if (secretCode) {
            if (secretCode === "empty") {
                let errMessage = "Secret key is mandatory"
                res.json({ errMessage, created: false });
            } else if (secretCode === process.env.ADMIN_CODE) {
                const user = await UserModel.login(email, password);
                if (!user.roles) {
                    await UserModel.findOneAndUpdate({ email }, {
                        $set: {
                            roles: "admin"
                        }
                    })
                    if (!user.access) {
                        let errMessage = "Admin has blocked you"
                        res.json({ errMessage, created: false });
                    } else {
                        // const token = createToken(user._id);

                        // res.cookie("jwt", token, {
                        //     withCredentials: true,
                        //     httpOnly: false,
                        //     maxAge: maxAge * 1000,
                        // });
                        res.status(201).json({ user: user._id, role: user.roles, created: true })
                    }
                } else {
                    if (user.roles != "admin") {
                        let errMessage = "You dont have permission to access the admin account"
                        res.json({ errMessage, created: false });
                    } else {

                        if (!user.access) {
                            let errMessage = "Admin has blocked you"
                            res.json({ errMessage, created: false });
                        } else {
                            // const token = createToken(user._id);

                            // res.cookie("jwt", token, {
                            //     withCredentials: true,
                            //     httpOnly: false,
                            //     maxAge: maxAge * 1000,
                            // });
                            res.status(201).json({ user: user._id, role: user.roles, created: true })
                        }
                    }
                }
            } else if (secretCode === process.env.HR_CODE) {
                const user = await UserModel.login(email, password);
                if (!user.roles) {
                    await UserModel.findOneAndUpdate({ email }, {
                        $set: {
                            roles: "hr"
                        }
                    })
                    if (!user.access) {
                        let errMessage = "Admin has blocked you"
                        res.json({ errMessage, created: false });
                    } else {
                        // const token = createToken(user._id);

                        // res.cookie("jwt", token, {
                        //     withCredentials: true,
                        //     httpOnly: false,
                        //     maxAge: maxAge * 1000,
                        // });
                        res.status(201).json({ user: user._id, role: user.roles, created: true })
                    }
                } else {
                    if (user.roles != "hr") {
                        let errMessage = "You dont have permission to access the HR account"
                        res.json({ errMessage, created: false });
                    } else {

                        if (!user.access) {
                            let errMessage = "Admin has blocked you"
                            res.json({ errMessage, created: false });
                        } else {
                            // const token = createToken(user._id);

                            // res.cookie("jwt", token, {
                            //     withCredentials: true,
                            //     httpOnly: false,
                            //     maxAge: maxAge * 1000,
                            // });
                            res.status(201).json({ user: user._id, role: user.roles, created: true })
                        }
                    }
                }
            } else {
                let errMessage = "Wrong  secret code"
                res.json({ errMessage, created: false });
            }
        } else {
            const check = await UserModel.findOne({ email })
            if (!check.roles) {
                const user = await UserModel.login(email, password);
                if (!user.access) {
                    let errMessage = "Admin has blocked you"
                    res.json({ errMessage, created: false });
                } else {
                    // const token = createToken(user._id);

                    // res.cookie("jwt", token, {
                    //     withCredentials: true,
                    //     httpOnly: false,
                    //     maxAge: maxAge * 1000,
                    // });
                    res.status(200).json({ user: user._id, created: true })
                }

            } else {
                let errMessage = "Please login with HR/Admin login portal"
                res.json({ errMessage, created: false });
            }
        }
    } catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
};

// module.exports.google = async (req, res, next) => {
//     try {
//         const user = await UserModel.findOne({ email: req.body.email })
//         if (user) {
//             if (!user.access) {
//                 let errMessage = "Admin has blocked you"
//                 res.json({ errMessage, created: false });
//             } else {
//                 const token = createToken(user._id);

//                 res.cookie("jwt", token, {
//                     withCredentials: true,
//                     httpOnly: false,
//                     maxAge: maxAge * 1000,
//                 });
//                 res.status(200).json({ user: user._id, created: true })
//             }
//         } else {
//             const user = new UserModel({
//                 email: req.body.email
//             })

//             user.save().then(() => {
//                 const token = createToken(user._id);

//                 res.cookie("jwt", token, {
//                     withCredentials: true,
//                     httpOnly: false,
//                     maxAge: maxAge * 1000,
//                 });
//                 res.status(201).json({ user: user._id, created: true })
//             }).catch((err) => {
//                 const errors = handleErrors(err);
//                 res.json({ errors, created: false });
//             })
//         }
//     } catch (err) {
//         const errors = handleErrors(err);
//         res.json({ errors, created: false });
//     }
// }

module.exports.checkRole = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) res.json({ status: true, email: user.email, role: user.roles })
        else res.json({ status: false });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
}