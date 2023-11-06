const STATE = require("../Models/state");

module.exports = async(candidate) => {
    for(let i=1; i<candidate.preferences.length; i++) {
        const state = await STATE.findOne({name: candidate.preferences[i]});
        if(state.ur > 0) {
            candidate.allottedState = state.name;
            state.ur = state.ur - 1;
            state.totalSeats = state.totalSeats - 1;
            await candidate.save();
            await state.save();
            return;
        }
    }
};