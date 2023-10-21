const router = require("express").Router();
const md5 = require("md5");

// Importing user defined files and functions
const protected = require("../protected");
const CANDIDATE = require("../Models/candidate");

router.get("/:password", async(req,res) => {
    try {
        if(md5(req.params.password) == "6eea9b7ef19179a06954edd0f6c05ceb") {
            const foundCandidates = await CANDIDATE.find();
            // return res.status(200).json(foundCandidates);
            return res.status(200).render("admin-dashboard", {
                candidates: foundCandidates
            });
        }
        return res.status(400).json({"message": "Access denied !"});
    }
    catch(error) {
        console.log(error);
    }
});

module.exports = router;