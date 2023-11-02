const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    totalSeats: {
        type: Number,
        required: true,
        default: 0
    },
    ur: {
        type: Number,
        required: true,
        default: 0
    },
    ews: {
        type: Number,
        required: true,
        default: 0
    },
    obc: {
        type: Number,
        required: true,
        default: 0
    },
    sc: {
        type: Number,
        required: true,
        default: 0
    },
    st: {
        type: Number,
        required: true,
        default: 0
    },
    pwbd: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = new mongoose.model("State", stateSchema);