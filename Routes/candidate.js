const router = require("express").Router();
const md5 = require("md5");
const jwt = require("jsonwebtoken");

// Importing user defined files / functions
const CANDIDATE = require("../Models/candidate");
const OTPgenerator = require("../functions/OTPgenerator");
const protected = require("../protected");

router.post("/register", async(req,res) => {
    try {
        console.log(req.body);
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
        return res.status(200).render("OTP");
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
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

module.exports = router;