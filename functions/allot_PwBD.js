const STATE = require("../Models/state");
// const CANDIDATE = require("../Models/candidate");

module.exports = async(candidate) => {
    for(let i=1; i<candidate.preferences.length; i++) {
        const state = await STATE.findOne({name: candidate.preferences[i]});
        if(state.pwbd > 0) {
            candidate.allottedState = state.name;
            state.pwbd = state.pwbd - 1;
            state.totalSeats = state.totalSeats - 1;
            await candidate.save();
            await state.save();
            return;
        }
    }
};