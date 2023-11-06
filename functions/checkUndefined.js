module.exports = (body) => {
    hash = {};
    for(const key in body) {
        if (body.hasOwnProperty(key) && body[key] === undefined) {
            return true;
        }
        hash[Number(body[key])] = 1;
    }
    for(let num=1; num<=23; num++) {
        if(!hash[num]) {
            return true;
        }
    }
    return false;
};