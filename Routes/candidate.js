const router = require("express").Router();

// Importing user defined files / functions
const CANDIDATE = require("../Models/candidate");

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
        return res.status(200).json(req.body);
    }
    catch(error) {
        console.log(error);
        return res.status(500).render(homepage, {
            message: "Internal server error."
        });
    }
});

module.exports = router;