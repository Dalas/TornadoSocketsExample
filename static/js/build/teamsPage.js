webpackJsonp([1],{

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = __webpack_require__(29);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _loader = __webpack_require__(113);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 21.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.fetchTeams = _this.fetchTeams.bind(_this);

        _this.state = {
            fetching: false,
            teams: []
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchTeams();
        }
    }, {
        key: 'fetchTeams',
        value: function fetchTeams() {
            var _this2 = this;

            this.setState({ fetching: true });

            (0, _isomorphicFetch2.default)('/api/v1/user', {
                method: 'GET',
                credentials: 'same-origin'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw true;
                } else {
                    response.json().then(function (data) {
                        _this2.setState({ fetching: false, teams: data });
                    });
                }
            }).catch(function (error) {
                return _this2.setState({ fetching: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var listContent = [];

            if (!this.state.fetching && this.state.teams.length > 0) listContent = this.state.teams.map(function (team, index) {
                return _react2.default.createElement(
                    'li',
                    { key: index, className: 'list-group-item' },
                    'team'
                );
            });else listContent = _react2.default.createElement(
                'li',
                { className: 'list-group-item' },
                'nothing to show'
            );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'list-group teams-list' },
                    _react2.default.createElement(_loader2.default, { display: this.state.fetching }),
                    listContent
                )
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var display = _ref.display;

    return _react2.default.createElement(
        "div",
        { className: display ? "loader" : "hidden" },
        _react2.default.createElement("img", { src: "/static/img/loader.gif" })
    );
}; /**
    * Created by yura on 21.02.17.
    */

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TeamsComponent = __webpack_require__(104);

var _TeamsComponent2 = _interopRequireDefault(_TeamsComponent);

var _loader = __webpack_require__(113);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 21.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TeamsPage = function (_React$Component) {
    _inherits(TeamsPage, _React$Component);

    function TeamsPage(props) {
        _classCallCheck(this, TeamsPage);

        var _this = _possibleConstructorReturn(this, (TeamsPage.__proto__ || Object.getPrototypeOf(TeamsPage)).call(this, props));

        _this.fetchCurrentUser = _this.fetchCurrentUser.bind(_this);

        _this.state = {
            fetching: false,
            current_user: {
                _id: -1
            }
        };
        return _this;
    }

    _createClass(TeamsPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchCurrentUser();
        }
    }, {
        key: 'fetchCurrentUser',
        value: function fetchCurrentUser() {
            var _this2 = this;

            this.setState({ fetching: true });

            fetch('/api/v1/user', {
                method: 'GET',
                credentials: 'same-origin'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw true;
                } else {
                    response.json().then(function (data) {
                        _this2.setState({ fetching: false, current_user: data });
                    });
                }
            }).catch(function (error) {
                return _this2.setState({ fetching: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'col-sm-12' },
                _react2.default.createElement(_loader2.default, { display: this.state.fetching }),
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-3' },
                    _react2.default.createElement(_TeamsComponent2.default, { user_id: this.state.current_user._id })
                )
            );
        }
    }]);

    return TeamsPage;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(TeamsPage, null), document.getElementById('container'));

/***/ })

},[241]);