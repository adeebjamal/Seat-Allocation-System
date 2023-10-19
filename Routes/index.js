const router = require("express").Router();

router.get("/", async(req,res) => {
    try {
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