// Local storage wrapper
module.exports = {
    set: (key,token)=>{
        localStorage.setItem(key,JSON.stringify(token));
    },
    remove:()=>{
        localStorage.removeItem('token');
    },
    get: (key,token)=>{
        return JSON.parse(localStorage.getItem(key,token));
    }
}