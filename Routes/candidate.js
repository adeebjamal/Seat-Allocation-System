const router = require("express").Router();
const md5 = require("md5");
const jwt = require("jsonwebtoken");

// Importing user defined files / functions
const CANDIDATE = require("../Models/candidate");
const OTPgenerator = require("../functions/OTPgenerator");
const protected = require("../protected");
const sendOTP = require("../functions/send_otp");

router.post("/register", async(req,res) => {
    try {
        // console.log(req.body);
        if(!req.body.newName || !req.body.newEmail || !req.body.newPassword || !req.body.confirmPassword) {
            return res.status(400).render("homepage", {
                message: "Please fill all the required fields."
            });
        }
        if(req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).render("homepage", {
                message: "Passwords doesn't match."
            });
        }
        if(req.body.newPassword.length < 6) {
            return res.status(400).render("homepage", {
                message: "Password is too weak."
            });
        }
        const foundUser = await CANDIDATE.findOne({email: req.body.newEmail});
        if(foundUser) {
            return res.status(400).render("homepage", {
                message: "User with entered email already exists."
            });
        }
        const OTP = OTPgenerator();
        console.log(OTP);
        const encodedJWT = jwt.sign({userDetails: req.body, otp: OTP}, protected.secret_key);
        res.cookie("userDetails_and_OTP", encodedJWT);
        await sendOTP(req.body.newEmail, OTP);
        return res.status(200).render("OTP", {
            message: ""
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).render(homepage, {
            message: "Internal server error."
        });
    }
});

router.post("/OTP", async(req,res) => {
    try {
        const receivedToken = req.cookies.userDetails_and_OTP;
        if(!receivedToken) {
            return res.status(401).render("homepage", {
                message: "Something went wrong."
            });
        }
        const decodedJWT = jwt.verify(receivedToken, protected.secret_key);
        console.log(decodedJWT);
        if(req.body.newOTP == decodedJWT.otp) {
            const newUser = new CANDIDATE({
                name: decodedJWT.userDetails.newName,
                email: decodedJWT.userDetails.newEmail,
                password: md5(decodedJWT.userDetails.newPassword),
                roll_no: -1,
                rank: -1,
                preferences: []
            });
            await newUser.save();
            res.clearCookie("userDetails_and_OTP");
            return res.status(201).render("homepage", {
                message: "Registration successful. You can  login now."
            });
        }
        else {
            return res.status(400).render("OTP", {
                message: "Incorrect OTP."
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

router.post("/login", async(req,res) => {
    try {
        if(!req.body.userEmail || !req.body.userPassword) {
            return res.status(400).render("homepage", {
                message: "Please fill all the required details."
            });
        }
        const tempCandidate = await CANDIDATE.findOne({email: req.body.userEmail});
        if(!tempCandidate) {
            return res.status(400).render("homepage", {
                message: "User with entered details doesn't exists."
            });
        }
        if(tempCandidate.password !== md5(req.body.userPassword)) {
            return res.status(400).render("homepage", {
                message: "Incorrect password."
            });
        }
        const jwtToken = jwt.sign({ID: tempCandidate._id}, protected.secret_key);
        res.cookie("JWT", jwtToken);
        return res.status(200).render("dashboard", {
            Name: tempCandidate.name
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "internal server error."
        });
    }
});

module.exports = router;