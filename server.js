const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// importing user defined files / functions
const protected = require("./protected");

// setting up mongoDB
mongoose.set("strictQuery",false);
mongoose.connect(protected.mongoDB_url);

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.set("view engine","ejs");

// Adding routes
app.use("/", require("./Routes/index"));
app.use("/admin", require("./Routes/admin"));
app.use("/candidate", require("./Routes/candidate"));

app.listen(3000, () => {
    console.log("http://localhost:3000");
});