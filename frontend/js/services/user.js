'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User() {
        _classCallCheck(this, User);

        this.info = null;
    }

    _createClass(User, [{
        key: 'getInfo',
        value: function getInfo() {
            if (!this.info) {
                this.info = JSON.parse(localStorage.getItem('qm')) || {};
            }

            return this.info;
        }
    }, {
        key: 'save',
        value: function save() {
            var info = this.getInfo();
            localStorage.setItem('qm', JSON.stringify(info));
        }
    }, {
        key: 'setToken',
        value: function setToken(token) {
            var info = this.getInfo();
            info.token = token;
            this.save();
        }
    }, {
        key: 'getToken',
        value: function getToken() {
            return this.getInfo().token;
        }
    }, {
        key: 'erase',
        value: function erase() {
            this.info = {};
            this.save();
        }
    }]);

    return User;
}();

exports.default = new User();