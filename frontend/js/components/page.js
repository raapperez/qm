'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(_ref) {
    var children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: 'page-component container' },
        _react2.default.createElement(
            'div',
            { className: 'page-box' },
            children
        )
    );
};

exports.default = Page;