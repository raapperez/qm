'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../constants/config');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
    function Api(http) {
        _classCallCheck(this, Api);

        this.http = http;
    }

    _createClass(Api, [{
        key: 'getDefaultOptions',
        value: function getDefaultOptions() {
            var headers = {};
            headers['Content-Type'] = 'application/json;charset=UTF-8';

            var token = _user2.default.getToken();
            if (token) {
                headers.authorization = 'JWT ' + token;
            }

            return { headers: headers };
        }
    }, {
        key: 'get',
        value: function get(path, id) {
            return this.http.get(path + '/' + id, undefined, this.getDefaultOptions());
        }
    }, {
        key: 'login',
        value: function login(email, password) {
            return this.http.post(_config.apiHost + '/auth/login', { email: email, password: password }, { headers: { 'content-type': 'application/json;charset=UTF-8', accept: 'application/json' } });
        }
    }]);

    return Api;
}();

exports.default = Api;