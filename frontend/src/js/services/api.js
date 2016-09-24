'use strict';

import {apiHost} from '../constants/config';
import user from './user';

class Api {

    constructor(http) {
        this.http = http;
    }

    getDefaultOptions() {
        let headers = {};
        headers['Content-Type'] = 'application/json;charset=UTF-8';

        const token = user.getToken();
        if (token) {
            headers.authorization = `JWT ${token}`;
        }

        return { headers };
    }

    get(path, id) {
        return this.http.get(`${apiHost}${path}/${id}`, undefined, this.getDefaultOptions());
    }

    login(email, password) {
        return this.http.post(`${apiHost}/auth/login`, { email, password }, { headers: { 'content-type': 'application/json;charset=UTF-8', accept: 'application/json' } });
    }

    signup(data) {
        return this.http.post(`${apiHost}/users`, data, { headers: { 'content-type': 'application/json;charset=UTF-8', accept: 'application/json' } });
    }
}

export default Api;