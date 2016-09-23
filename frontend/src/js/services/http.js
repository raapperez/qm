'use strict';

function isJson(input) {
    return /application\/json/.test(input);
}

function json(response) {
    if (isJson(response.headers.get('content-type'))) {
        return response.json();
    }

    return null;
}


function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.rejected(json(response));
    }
}

function Http(fetch) {

    function get(path, query = {}, options = {}) {

        let queryString = Object.entries(query).map(entry => {

            if (entry[1] instanceof Array) {
                return entry[1].map(v => `${entry[0]}=${encodeURIComponent(v)}`).join('&');
            }

            return `${entry[0]}=${encodeURIComponent(entry[1])}`;
        }).join('&');

        if (queryString) {
            queryString = `?${queryString}`;
        }

        return fetch(`${path}${queryString}`, Object.assign({}, options, { method: 'GET' })).then(status).then(json);
    }

    function post(path, body = {}, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'POST', body: JSON.stringify(body) })).then(status).then(json);
    }

    function put(path, body = {}, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'PUT', body: JSON.stringify(body) })).then(status).then(json);
    }

    function del(path, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'DELETE' })).then(status).then(json);
    }

    return {
        get,
        post,
        put,
        del
    };
}


export default Http;