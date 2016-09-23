'use strict';

class User {
    
    constructor() {
        this.info = null;
    }        
    
    getInfo() {
        if(!this.info) {
            this.info = JSON.parse(localStorage.getItem('qm')) || {};
        }
        
        return this.info;
    }
    
    save() {
        const info = this.getInfo();
        localStorage.setItem('qm', JSON.stringify(info));
    }
    
    setToken(token) {
        const info = this.getInfo();
        info.token = token;
        this.save();
    }
    
    getToken() {
        return this.getInfo().token;
    }
    
    erase() {
        this.info = {};
        this.save();
    }
    
}


export default new User();