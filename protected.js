require("dotenv").config();

module.exports = {
    mongoDB_url: process.env.mongoDB_url,
    secret_key: process.env.secret_key,
    emailAddress: process.env.emailAddress,
    password: process.env.password,
    states: ["Delhi","Uttrakhand","JammuAndKashmir","Haryana","Rajasthan","Punjab","HimachalPradesh","UttarPradesh","Bihar","Jharkhand","Orissa","AndhraPradesh","Telangana","Karnataka","Goa","TamilNadu","Kerala","WestBengal","NorthEast","Maharashtra","MadhyaPradesh","Chattisgarh","Gujrat"]
};