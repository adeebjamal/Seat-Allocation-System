const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Importing user defined files and functions
const protected = require("../protected");
const CANDIDATE = require("../Models/candidate");

router.get("/", async(req,res) => {
    try {
        const receivedToken = req.cookies.JWT;
        if(receivedToken) {
            const decodedJWT = jwt.verify(receivedToken, protected.secret_key);
            const foundUser = await CANDIDATE.findOne({_id: decodedJWT.ID});
            return res.status(200).render("dashboard", {
                Name: foundUser.name,
                states: protected.states,
                message: ""
            });
        }
        return res.status(200).render("homepage", {
            message: ""
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error"
        });
    }
});

module.exports = router;