const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roll_no: {
        type: String,
        required: true,
        unique: true,
        default: -1
    },
    rank: {
        type: Number,
        required: true,
        unique: true,
        default: -1
    },
    category: {
        type: String,
        required: true,
        default: "UR"
    },
    ownMerit: {
        type: String,
        default: "NO"
    },
    preferences: {
        type: [String],
        required: true,
        default: []
    }
});

module.exports = new mongoose.model("Candidate",candidateSchema);