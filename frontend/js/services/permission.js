'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _permissions = require('../constants/permissions');

var _permissions2 = _interopRequireDefault(_permissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Permission = function () {
    function Permission() {
        _classCallCheck(this, Permission);
    }

    _createClass(Permission, [{
        key: 'has',
        value: function has(user, action, resource, ownerAttribute) {
            if (!_permissions2.default[action]) {
                console.log('Missing permission definition for action ' + action);
                return false;
            }

            var permissionList = _permissions2.default[action];

            if (permissionList.indexOf(user.role) !== -1) {
                return true;
            }

            if (permissionList.indexOf('owner') !== -1 && user.id === resource[ownerAttribute]) {
                return true;
            }

            return false;
        }
    }]);

    return Permission;
}();

exports.default = new Permission();