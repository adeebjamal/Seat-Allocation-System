const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

// importing user defined files / functions
const protected = require("./protected");

// setting up mongoDB
mongoose.set("strictQuery",false);
mongoose.connect(protected.mongoDB_url);

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine","ejs");

// Adding routes
app.use("/", require("./Routes/index"));
app.use("/candidate", require("./Routes/candidate"));

app.listen(3000, () => {
    console.log("http://localhost:3000");
});