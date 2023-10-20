require("dotenv").config();

module.exports = {
    mongoDB_url: process.env.mongoDB_url,
    secret_key: process.env.secret_key
};