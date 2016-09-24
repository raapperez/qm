'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = function Pagination(_ref) {
    var page = _ref.page;
    var totalPages = _ref.totalPages;
    var goToPage = _ref.goToPage;


    var showPages = 5;
    var halfPages = Math.floor(showPages / 2);

    var minPage = Math.max(1, page - halfPages);
    var maxPage = showPages + minPage - 1;

    if (maxPage > totalPages) {
        maxPage = totalPages;
        minPage = Math.max(1, maxPage - showPages + 1);
    }

    var pages = [];

    for (var i = minPage; i <= maxPage; i++) {
        pages.push(i);
    }

    return _react2.default.createElement(
        'ul',
        { className: 'pagination' },
        _react2.default.createElement(
            'li',
            { className: (0, _classnames2.default)({ disabled: page === 1 }), title: 'First' },
            _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                        e.preventDefault();
                        goToPage(1);
                    } },
                _react2.default.createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '« '
                )
            )
        ),
        pages.map(function (p) {
            return _react2.default.createElement(
                'li',
                { className: (0, _classnames2.default)({ active: page === p }), key: p },
                _react2.default.createElement(
                    'a',
                    { onClick: function onClick(e) {
                            e.preventDefault();
                            goToPage(p);
                        } },
                    p
                )
            );
        }),
        _react2.default.createElement(
            'li',
            { className: (0, _classnames2.default)({ disabled: page === totalPages }), title: 'Last' },
            _react2.default.createElement(
                'a',
                { onClick: function onClick(e) {
                        e.preventDefault();
                        goToPage(totalPages);
                    } },
                _react2.default.createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '» '
                )
            )
        )
    );
};

Pagination.propTypes = {
    page: _react.PropTypes.number.isRequired,
    totalPages: _react.PropTypes.number.isRequired,
    goToPage: _react.PropTypes.func.isRequired
};

exports.default = Pagination;