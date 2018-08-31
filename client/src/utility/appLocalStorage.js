// Local storage wrapper
module.exports = {
    set: (key,token)=>{
        localStorage.setItem(key,JSON.stringify(token));
    },
    remove:(key)=>{
        localStorage.removeItem(key);
    },
    get: (key,token)=>{
        return JSON.parse(localStorage.getItem(key,token));
    }
}