webpackJsonp([1],{

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = __webpack_require__(23);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _loader = __webpack_require__(61);

var _loader2 = _interopRequireDefault(_loader);

var _TeamsListComponent = __webpack_require__(245);

var _TeamsListComponent2 = _interopRequireDefault(_TeamsListComponent);

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
        _this.handleCreateTeamClick = _this.handleCreateTeamClick.bind(_this);

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
        key: 'handleCreateTeamClick',
        value: function handleCreateTeamClick() {
            var _this2 = this;

            (0, _isomorphicFetch2.default)('/api/v1/teams', {
                method: 'POST',
                credentials: 'same-origin'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw true;
                } else {
                    response.json().then(function (data) {
                        _this2.state.teams.unshift(data);
                        _this2.setState({ fetching: false });
                    });
                }
            }).catch(function (error) {
                return _this2.setState({ fetching: false });
            });
        }
    }, {
        key: 'fetchTeams',
        value: function fetchTeams() {
            var _this3 = this;

            this.setState({ fetching: true });

            (0, _isomorphicFetch2.default)('/api/v1/teams', {
                method: 'GET',
                credentials: 'same-origin'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw true;
                } else {
                    response.json().then(function (data) {
                        _this3.setState({ fetching: false, teams: data });
                    });
                }
            }).catch(function (error) {
                return _this3.setState({ fetching: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var listContent = [];

            if (!this.state.fetching && this.state.teams.length > 0) listContent = this.state.teams.map(function (team, index) {
                return _react2.default.createElement(_TeamsListComponent2.default, {
                    clickHandler: function clickHandler() {
                        return _this4.props.select_team(team);
                    },
                    key: index,
                    team: team,
                    currentUserId: _this4.props.user_id
                });
            });else listContent = _react2.default.createElement(
                'li',
                { className: 'list-group-item' },
                'nothing to show'
            );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { onClick: this.handleCreateTeamClick, className: 'btn btn-primary create-team-button ' + (this.state.fetching ? "disabled" : "") },
                    'Create team'
                ),
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

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TeamsComponent = __webpack_require__(105);

var _TeamsComponent2 = _interopRequireDefault(_TeamsComponent);

var _TeamComponent = __webpack_require__(244);

var _TeamComponent2 = _interopRequireDefault(_TeamComponent);

var _EditableTeamComponent = __webpack_require__(246);

var _EditableTeamComponent2 = _interopRequireDefault(_EditableTeamComponent);

var _loader = __webpack_require__(61);

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
        _this.handleCurrentTeamChange = _this.handleCurrentTeamChange.bind(_this);

        _this.state = {
            fetching: false,
            current_user: {
                _id: -1
            },
            current_team: {
                _id: -1,
                owner: -1
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
        key: 'handleCurrentTeamChange',
        value: function handleCurrentTeamChange(team) {
            this.setState({
                current_team: team
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
                    _react2.default.createElement(_TeamsComponent2.default, { select_team: this.handleCurrentTeamChange, user_id: this.state.current_user._id })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    this.state.current_user._id == this.state.current_team.owner ? _react2.default.createElement(_EditableTeamComponent2.default, { current_team: this.state.current_team }) : _react2.default.createElement(_TeamComponent2.default, { current_team: this.state.current_team })
                )
            );
        }
    }]);

    return TeamsPage;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(TeamsPage, null), document.getElementById('container'));

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 22.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
            team: props.current_team
        };
        return _this;
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var component = void 0;

            if (this.state.team._id == -1) {
                component = _react2.default.createElement(
                    "div",
                    null,
                    "Nothing to show!"
                );
            } else {
                component = _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Information:"
                    ),
                    _react2.default.createElement(
                        "table",
                        { className: "table" },
                        _react2.default.createElement(
                            "tbody",
                            null,
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "ID:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team._id
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "Title:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team.title
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "Owner:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team.github_url
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "GitHub:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team.github_url
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Members:"
                    ),
                    _react2.default.createElement(
                        "table",
                        { className: "table" },
                        _react2.default.createElement(
                            "thead",
                            null,
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    "ID"
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    "E-mail"
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    "Username"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "tbody",
                            null,
                            this.state.members ? this.state.members.map(function (member, index) {
                                return _react2.default.createElement(
                                    "tr",
                                    { key: index },
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        member._id
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        member.email
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { target: "_blank", href: "/profile/" + member._id },
                                            member.username
                                        )
                                    )
                                );
                            }) : _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    { colSpan: "3" },
                                    "Nothing to show!"
                                )
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                null,
                component
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var clickHandler = _ref.clickHandler,
        team = _ref.team,
        currentUserId = _ref.currentUserId;

    return _react2.default.createElement(
        "li",
        { onClick: clickHandler, className: "list-group-item" },
        team.title,
        team.owner == currentUserId ? _react2.default.createElement(
            "span",
            { className: "label label-success my-label" },
            "My"
        ) : ''
    );
}; /**
    * Created by yura on 22.02.17.
    */

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 22.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
            team: props.current_team
        };
        return _this;
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var component = void 0;

            if (this.state.team._id == -1) {
                component = _react2.default.createElement(
                    "div",
                    null,
                    "Nothing to show!"
                );
            } else {
                component = _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Information:"
                    ),
                    _react2.default.createElement(
                        "table",
                        { className: "table" },
                        _react2.default.createElement(
                            "tbody",
                            null,
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "ID:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team._id
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "Title:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team.title
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "Owner:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team.github_url
                                )
                            ),
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    "GitHub:"
                                ),
                                _react2.default.createElement(
                                    "td",
                                    null,
                                    this.state.team.github_url
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "h3",
                        null,
                        "Members:"
                    ),
                    _react2.default.createElement(
                        "table",
                        { className: "table" },
                        _react2.default.createElement(
                            "thead",
                            null,
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    "ID"
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    "E-mail"
                                ),
                                _react2.default.createElement(
                                    "th",
                                    null,
                                    "Username"
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "tbody",
                            null,
                            this.props.current_team.members ? this.props.current_team.members.map(function (member, index) {
                                return _react2.default.createElement(
                                    "tr",
                                    { key: index },
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        member._id
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        member.email
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        null,
                                        _react2.default.createElement(
                                            "a",
                                            { target: "_blank", href: "/profile/" + member._id },
                                            member.username
                                        )
                                    )
                                );
                            }) : _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    { colSpan: "3" },
                                    "Nothing to show!"
                                )
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                null,
                component
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;

/***/ }),

/***/ 61:
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

/***/ })

},[241]);