module.exports = (javaScriptObject) => {
    let hash = {};
    for(let key in javaScriptObject) {
        for(let i=0; i<javaScriptObject[key].length; i++) {
            if(!(javaScriptObject[key][i] >= '0' && javaScriptObject[key][i] <= '9')) {
                return true
            }
            if(javaScriptObject[key] < 1 || javaScriptObject[key] > 23) {
                return true;
            }
        }
        if(javaScriptObject[key] === '') {
            return true;
        }
        if(hash[javaScriptObject[key]]) {
            return true;
        }
        else if(key !== "rollNumber" && key !== "rank") {
            hash[javaScriptObject[key]] = 1;
        }
    }
    return false;
};