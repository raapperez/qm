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
        headers.accept = 'application/json';

        const token = user.getToken();
        if (token) {
            headers.authorization = `JWT ${token}`;
        }

        return { headers };
    }

    verifyAuthorization (err) {
        if (err.status === 401) {
            window.location.href = '/login';
        }

        throw err;
    }

    get(resource, id) {
        return this.http.get(`${apiHost}${resource}/${id}`, undefined, this.getDefaultOptions()).catch(this.verifyAuthorization);
    }

    list(resource, page, pageSize, where, order) {        
        where = where ? `&where=${encodeURIComponent(JSON.stringify(where))}` : '';
        order = order ? `&order=${encodeURIComponent(JSON.stringify(order))}` : '';

        return this.http.get(`${apiHost}/${resource}?page=${page}&pageSize=${pageSize}${where}${order}`, {}, this.getDefaultOptions()).catch(this.verifyAuthorization);
    }

    post(resource, body) {
        return this.http.post(`${apiHost}${resource}`, body, this.getDefaultOptions()).catch(this.verifyAuthorization);        
    }

    login(email, password) {
        return this.http.post(`${apiHost}/auth/login`, { email, password }, { headers: { 'content-type': 'application/json;charset=UTF-8', accept: 'application/json' } });
    }

    signup(data) {
        return this.http.post(`${apiHost}/users`, data, { headers: { 'content-type': 'application/json;charset=UTF-8', accept: 'application/json' } });
    }
}

export default Api;