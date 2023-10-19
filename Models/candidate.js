const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll_no: {
        type: String,
        required: true,
        unique: true
    },
    rank: {
        type: Number,
        required: true,
        unique: true
    },
    preferences: {
        type: [String],
        required: true
    }
});

module.exports = new mongoose.model("Candidate",candidateSchema);