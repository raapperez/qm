'use strict';

require('core-js');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _qm = require('./qm');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render((0, _qm.clientSide)({ history: _reactRouter.browserHistory, children: _qm.routes }), document.getElementById('entry-point'));