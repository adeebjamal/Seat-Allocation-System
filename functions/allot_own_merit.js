const STATE = require("../Models/state");

module.exports = async(candidate) => {
    if(candidate.category === "EWS") {
        for(let i=1; i<candidate.preferences.length; i++) {
            const state = await STATE.findOne({name: candidate.preferences[i]});
            if(state.ews > 0) {
                candidate.allottedState = state.name;
                state.ews = state.ews - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
            else if(state.ur > 0) {
                candidate.allottedState = state.name;
                state.ur = state.ur - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
        }
    }
    if(candidate.category === "OBC") {
        for(let i=1; i<candidate.preferences.length; i++) {
            const state = await STATE.findOne({name: candidate.preferences[i]});
            if(state.ews > 0) {
                candidate.allottedState = state.name;
                state.obc = state.obc - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
            else if(state.ur > 0) {
                candidate.allottedState = state.name;
                state.ur = state.ur - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
        }
    }
    if(candidate.category === "SC") {
        for(let i=1; i<candidate.preferences.length; i++) {
            const state = await STATE.findOne({name: candidate.preferences[i]});
            if(state.ews > 0) {
                candidate.allottedState = state.name;
                state.sc = state.sc - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
            else if(state.ur > 0) {
                candidate.allottedState = state.name;
                state.ur = state.ur - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
        }
    }
    if(candidate.category === "ST") {
        for(let i=1; i<candidate.preferences.length; i++) {
            const state = await STATE.findOne({name: candidate.preferences[i]});
            if(state.ews > 0) {
                candidate.allottedState = state.name;
                state.st = state.st - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
            else if(state.ur > 0) {
                candidate.allottedState = state.name;
                state.ur = state.ur - 1;
                state.totalSeats = state.totalSeats - 1;
                await candidate.save();
                await state.save();
                return;
            }
        }
    }
}