'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function isJson(input) {
    return (/application\/json/.test(input)
    );
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

    function get(path) {
        var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


        var queryString = Object.entries(query).map(function (entry) {

            if (entry[1] instanceof Array) {
                return entry[1].map(function (v) {
                    return entry[0] + '=' + encodeURIComponent(v);
                }).join('&');
            }

            return entry[0] + '=' + encodeURIComponent(entry[1]);
        }).join('&');

        if (queryString) {
            queryString = '?' + queryString;
        }

        return fetch('' + path + queryString, Object.assign({}, options, { method: 'GET' })).then(status).then(json);
    }

    function post(path) {
        var body = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        return fetch('' + path, Object.assign({}, options, { method: 'POST', body: JSON.stringify(body) })).then(status).then(json);
    }

    function put(path) {
        var body = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        return fetch('' + path, Object.assign({}, options, { method: 'PUT', body: JSON.stringify(body) })).then(status).then(json);
    }

    function del(path) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return fetch('' + path, Object.assign({}, options, { method: 'DELETE' })).then(status).then(json);
    }

    return {
        get: get,
        post: post,
        put: put,
        del: del
    };
}

exports.default = Http;