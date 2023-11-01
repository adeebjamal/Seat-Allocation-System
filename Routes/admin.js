const router = require("express").Router();
const md5 = require("md5");

// Importing user defined files and functions
const protected = require("../protected");
const CANDIDATE = require("../Models/candidate");

router.get("/candidate/:ID", async(req,res) => {
    try {
        const foundCandicate = await CANDIDATE.findOne({_id: req.params.ID});
        if(!foundCandicate) {
            return res.status(400).json({message: "Candidate doesn't exists."});
        }
        return res.status(200).json({preferences: foundCandicate.preferences});
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

router.get("/:password", async(req,res) => {
    try {
        if(md5(req.params.password) == "6eea9b7ef19179a06954edd0f6c05ceb") {        // qwertyuiop
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
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

router.post("/candidate/:ID", async(req,res) => {
    try {
        console.log(req.body);
        const foundCandidate = await CANDIDATE.findOne({_id: req.params.ID});
        if(!foundCandidate) {
            return res.status(400).json({message: "Candidate doesn't exists."});
        }
        if(req.body.rank) {
            foundCandidate.rank = req.body.rank;
        }
        if(req.body.category) {
            foundCandidate.category = req.body.category;
        }
        await foundCandidate.save();
        const foundCandidates = await CANDIDATE.find();
        return res.status(200).render("admin-dashboard", {
            candidates: foundCandidates
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

router.post("/allocate", async(req,res) => {
    try {
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

module.exports = router;