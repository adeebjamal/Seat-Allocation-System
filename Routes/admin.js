const router = require("express").Router();
const md5 = require("md5");

// Importing user defined files and functions
const protected = require("../protected");
const CANDIDATE = require("../Models/candidate");
const STATE = require("../Models/state");
const allot_PwBD = require("../functions/allot_PwBD");

router.get("/states", async(req,res) => {
    try {
        const foundStates = await STATE.find();
        return res.status(200).render("states", {
            states: foundStates
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

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
        // console.log(req.body);
        const foundCandidate = await CANDIDATE.findOne({_id: req.params.ID});
        if(!foundCandidate) {
            return res.status(400).json({message: "Candidate doesn't exists."});
        }
        if(req.body.rank) {
            foundCandidate.rank = Number(req.body.rank);
        }
        if(req.body.category) {
            foundCandidate.category = req.body.category;
        }
        if(req.body.ownMerit) {
            foundCandidate.ownMerit = req.body.ownMerit
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
        const foundCandidates = await CANDIDATE.find({}).sort({rank: 1}).exec();
        for(let i=0; i<foundCandidates.length; i++) {
            if(foundCandidates[i].category === "PwBD") {
                allot_PwBD(foundCandidates[i]);
            }
        }
        return res.status(200).redirect("/admin/qwertyuiop");   
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

router.post("/states", async(req,res) => {
    try {
        const foundState = await STATE.findOne({name: req.body.name});
        if(foundState) {
            foundState.ur = Number(req.body.ur);
            foundState.ews = Number(req.body.ews);
            foundState.obc = Number(req.body.obc);
            foundState.sc = Number(req.body.sc);
            foundState.st = Number(req.body.st);
            foundState.pwbd = Number(req.body.pwbd);
            foundState.totalSeats = Number(req.body.ur)+Number(req.body.ews)+Number(req.body.obc)+Number(req.body.sc)+Number(req.body.st)+Number(req.body.pwbd);
            await foundState.save();
            return res.status(200).redirect("/admin/states");
        }
        const newState = new STATE({
            name: req.body.name,
            ur: Number(req.body.ur),
            ews: Number(req.body.ews),
            obc: Number(req.body.obc),
            sc: Number(req.body.sc),
            st: Number(req.body.st),
            pwbd: Number(req.body.pwbd),
            totalSeats: Number(req.body.ur)+Number(req.body.ews)+Number(req.body.obc)+Number(req.body.sc)+Number(req.body.st)+Number(req.body.pwbd)
        });
        await newState.save();
        return res.status(201).redirect("/admin/states");
    }
    catch(error) {
        console.log(error);
        return res.status(500).render("homepage", {
            message: "Internal server error."
        });
    }
});

module.exports = router;