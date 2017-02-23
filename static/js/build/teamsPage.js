webpackJsonp([1],{

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(20);

var _store = __webpack_require__(263);

var _store2 = _interopRequireDefault(_store);

var _Teams = __webpack_require__(266);

var _Teams2 = _interopRequireDefault(_Teams);

var _loader = __webpack_require__(62);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 21.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import TeamComponent from '../components/teams/containers/TeamComponent';
//import EditableTeamComponent from '../components/teams/containers/EditableTeamComponent';


var TeamsPage = function (_React$Component) {
    _inherits(TeamsPage, _React$Component);

    function TeamsPage(props) {
        _classCallCheck(this, TeamsPage);

        var _this = _possibleConstructorReturn(this, (TeamsPage.__proto__ || Object.getPrototypeOf(TeamsPage)).call(this, props));

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
        key: 'handleCurrentTeamChange',
        value: function handleCurrentTeamChange(team) {
            this.setState({
                current_team: team
            });
        }
    }, {
        key: 'handleTeamChange',
        value: function handleTeamChange() {
            this.setState({});
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: _store2.default },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    _react2.default.createElement(_loader2.default, { display: this.state.fetching }),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3' },
                        _react2.default.createElement(_Teams2.default, null)
                    )
                )
            );
        }
    }]);

    return TeamsPage;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(TeamsPage, null), document.getElementById('container'));

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var clickHandler = _ref.clickHandler,
        team = _ref.team,
        currentUserId = _ref.currentUserId;

    var getMyStatus = function getMyStatus() {
        var status = "";
        team.members.find(function (member, index, callback) {
            if (member._id == currentUserId) status = member.status;
        });

        return status;
    };

    return _react2.default.createElement(
        "li",
        { onClick: clickHandler, className: "list-group-item" },
        team.title,
        team.owner == currentUserId ? _react2.default.createElement(
            "span",
            { className: "label label-success my-label" },
            getMyStatus()
        ) : ''
    );
}; /**
    * Created by yura on 22.02.17.
    */

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(19);

var _reduxThunk = __webpack_require__(243);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _teamsReducer = __webpack_require__(265);

var _teamsReducer2 = _interopRequireDefault(_teamsReducer);

var _teamReducer = __webpack_require__(270);

var _teamReducer2 = _interopRequireDefault(_teamReducer);

var _usersReducer = __webpack_require__(268);

var _usersReducer2 = _interopRequireDefault(_usersReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.createStore)((0, _redux.combineReducers)({
    teamsState: _teamsReducer2.default,
    usersState: _usersReducer2.default,
    teamState: _teamReducer2.default
}), (0, _redux.applyMiddleware)(_reduxThunk2.default)); /**
                                                         * Created by yura on 23.02.17.
                                                         */

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by yura on 23.02.17.
 */

// Current user
var START_FETCHING_CURRENT_USER = exports.START_FETCHING_CURRENT_USER = "START_FETCHING_CURRENT_USER";
var FINISH_FETCHING_CURRENT_USER = exports.FINISH_FETCHING_CURRENT_USER = "FINISH_FETCHING_CURRENT_USER";
var FINISH_FETCHING_CURRENT_USER_WITH_ERROR = exports.FINISH_FETCHING_CURRENT_USER_WITH_ERROR = "FINISH_FETCHING_CURRENT_USER_WITH_ERROR";

// Members
var START_FETCHING_MEMBERS = exports.START_FETCHING_MEMBERS = "START_FETCHING_MEMBERS";
var FINISH_FETCHING_MEMBERS = exports.FINISH_FETCHING_MEMBERS = "FINISH_FETCHING_MEMBERS";
var FINISH_FETCHING_MEMBERS_WITH_ERROR = exports.FINISH_FETCHING_MEMBERS_WITH_ERROR = "FINISH_FETCHING_MEMBERS_WITH_ERROR";

// Teams
var START_FETCHING_TEAMS = exports.START_FETCHING_TEAMS = "START_FETCHING_TEAMS";
var FINISH_FETCHING_TEAMS = exports.FINISH_FETCHING_TEAMS = "FINISH_FETCHING_TEAMS";
var FINISH_FETCHING_TEAMS_WITH_ERROR = exports.FINISH_FETCHING_TEAMS_WITH_ERROR = "FINISH_FETCHING_TEAMS_WITH_ERROR";

// Team
var SELECT_TEAM = exports.SELECT_TEAM = "SELECT_TEAM";

var START_TEAM_CREATION = exports.START_TEAM_CREATION = "START_TEAM_CREATION";
var FINISH_TEAM_CREATION = exports.FINISH_TEAM_CREATION = "FINISH_TEAM_CREATION";
var FINISH_TEAM_CREATION_WITH_ERROR = exports.FINISH_TEAM_CREATION_WITH_ERROR = "FINISH_TEAM_CREATION_WITH_ERROR";

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 23.02.17.
                                                                                                                                                                                                                                                                   */

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _ActionTypes.START_FETCHING_TEAMS:
            return _extends({}, state, { fetching: true, error: '' });

        case _ActionTypes.FINISH_FETCHING_TEAMS:
            return _extends({}, state, { teams: action.teams, fetching: false });

        case _ActionTypes.FINISH_FETCHING_TEAMS_WITH_ERROR:
            return _extends({}, state, { fetching: false, error: 'Something went wrong!' });

        case _ActionTypes.FINISH_TEAM_CREATION:
            var teams = state.teams.slice();
            teams.unshift(action.team);

            return _extends({}, state, { teams: teams, fetching: false });

        default:
            return _extends({}, state);
    }
};

var _ActionTypes = __webpack_require__(264);

var initialState = {
    teams: [],
    fetching: false,
    error: '',
    current_team: {}
};

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _loader = __webpack_require__(62);

var _loader2 = _interopRequireDefault(_loader);

var _TeamsListComponent = __webpack_require__(262);

var _TeamsListComponent2 = _interopRequireDefault(_TeamsListComponent);

var _reactRedux = __webpack_require__(20);

var _redux = __webpack_require__(19);

var _TeamsActions = __webpack_require__(267);

var teamsActions = _interopRequireWildcard(_TeamsActions);

var _UsersAcions = __webpack_require__(269);

var usersActions = _interopRequireWildcard(_UsersAcions);

var _TeamActions = __webpack_require__(271);

var teamActions = _interopRequireWildcard(_TeamActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 21.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TeamsComponent = function (_React$Component) {
    _inherits(TeamsComponent, _React$Component);

    function TeamsComponent(props) {
        _classCallCheck(this, TeamsComponent);

        var _this = _possibleConstructorReturn(this, (TeamsComponent.__proto__ || Object.getPrototypeOf(TeamsComponent)).call(this, props));

        _this.props.actions.fetchTeams();
        _this.props.actions.fetchCurrentUser();
        return _this;
    }

    _createClass(TeamsComponent, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { onClick: this.props.actions.createTeam, className: 'btn btn-primary create-team-button ' + (this.props.fetching ? "disabled" : "") },
                    'Create team'
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'list-group teams-list' },
                    _react2.default.createElement(_loader2.default, { display: this.props.fetching }),
                    this.props.teams.map(function (team, index) {
                        return _react2.default.createElement(_TeamsListComponent2.default, {
                            clickHandler: function clickHandler() {
                                return _this2.props.actions.selectTeam(index);
                            },
                            key: index,
                            team: team,
                            currentUserId: _this2.props.current_user._id
                        });
                    })
                )
            );
        }
    }]);

    return TeamsComponent;
}(_react2.default.Component);

/**
* ************************************ *
**/

var mapStateToProps = function mapStateToProps(state) {
    return {
        fetching: state.teamsState.fetching && state.usersState.fetching,
        teams: state.teamsState.teams,
        current_user: state.usersState.current_user
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, teamsActions, usersActions, teamActions), dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TeamsComponent);

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchTeams = fetchTeams;

var _ActionTypes = __webpack_require__(264);

var _isomorphicFetch = __webpack_require__(25);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Fetching teams
* */

/**
 * Created by yura on 23.02.17.
 */

function startFetchingTeams() {
    return {
        type: _ActionTypes.START_FETCHING_TEAMS
    };
}

function finishFetchingTeams(teams) {
    return {
        type: _ActionTypes.FINISH_FETCHING_TEAMS,
        teams: teams
    };
}

function finishFetchingTeamsWithError() {
    return {
        type: _ActionTypes.FINISH_FETCHING_TEAMS_WITH_ERROR
    };
}

function fetchTeams() {
    return function (dispatch) {
        dispatch(startFetchingTeams());

        (0, _isomorphicFetch2.default)('/api/v1/teams', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(function (response) {
            if (response.status >= 400) {
                throw true;
            } else {
                response.json().then(function (data) {
                    dispatch(finishFetchingTeams(data));
                });
            }
        }).catch(function (error) {
            return dispatch(finishFetchingTeamsWithError());
        });
    };
}

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 23.02.17.
                                                                                                                                                                                                                                                                   */

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _ActionTypes.START_FETCHING_CURRENT_USER:
            return _extends({}, state, { fetching: true, error: '' });

        case _ActionTypes.FINISH_FETCHING_CURRENT_USER:
            return _extends({}, state, { fetching: false, current_user: action.current_user });

        case _ActionTypes.FINISH_FETCHING_CURRENT_USER_WITH_ERROR:
            return _extends({}, state, { fetching: false, error: 'Something went wrong!' });

        default:
            return _extends({}, state);
    }
};

var _ActionTypes = __webpack_require__(264);

var initialState = {
    current_user: {},
    members: [],
    fetching: false,
    error: ''
};

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchCurrentUser = fetchCurrentUser;

var _ActionTypes = __webpack_require__(264);

var _isomorphicFetch = __webpack_require__(25);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* Current user
* */

/**
 * Created by yura on 23.02.17.
 */

function startFetchingCurrentUser() {
    return {
        type: _ActionTypes.START_FETCHING_CURRENT_USER
    };
}

function finishFetchingCurrentUser(current_user) {
    return {
        type: _ActionTypes.FINISH_FETCHING_CURRENT_USER,
        current_user: current_user
    };
}

function finishFetchingCurrentUserWithError() {
    return {
        type: _ActionTypes.FINISH_FETCHING_CURRENT_USER_WITH_ERROR
    };
}

function fetchCurrentUser() {
    return function (dispatch) {
        dispatch(startFetchingCurrentUser());

        (0, _isomorphicFetch2.default)('/api/v1/user', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(function (response) {
            if (response.status >= 400) {
                throw true;
            } else {
                response.json().then(function (data) {
                    dispatch(finishFetchingCurrentUser(data));
                });
            }
        }).catch(function (error) {
            return dispatch(finishFetchingCurrentUserWithError());
        });
    };
}

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 23.02.17.
                                                                                                                                                                                                                                                                   */

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _ActionTypes.FINISH_FETCHING_TEAMS:
            return _extends({}, state, { teams: action.teams });

        case _ActionTypes.SELECT_TEAM:
            return _extends({}, state, { index: action.index, current_team: state.teams[action.index] });

        case _ActionTypes.START_TEAM_CREATION:
            return _extends({}, state, { fetching: true, error: '' });

        case _ActionTypes.FINISH_TEAM_CREATION:
            var teams = state.teams;
            teams.unshift(action.team);

            return _extends({}, state, { teams: teams, fetching: false });

        case _ActionTypes.FINISH_TEAM_CREATION_WITH_ERROR:
            return _extends({}, state, { fetching: false, error: 'Something went wrong!' });

        default:
            return _extends({}, state);
    }
};

var _ActionTypes = __webpack_require__(264);

var initialState = {
    teams: [],
    index: -1,
    current_team: {},
    fetching: false,
    error: ''
};

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectTeam = selectTeam;
exports.createTeam = createTeam;

var _ActionTypes = __webpack_require__(264);

/*
* Select team
* */

function selectTeam(index) {
    return {
        type: _ActionTypes.SELECT_TEAM,
        index: index
    };
}

/*
* Team creation
* */

/**
 * Created by yura on 23.02.17.
 */

function startTeamCreation() {
    return {
        type: _ActionTypes.START_TEAM_CREATION
    };
}

function finishTeamCreation(team) {
    return {
        type: _ActionTypes.FINISH_TEAM_CREATION,
        team: team
    };
}

function finishTeamCreationWithError() {
    return {
        type: _ActionTypes.FINISH_TEAM_CREATION_WITH_ERROR
    };
}

function createTeam() {
    return function (dispatch) {
        dispatch(startTeamCreation());

        fetch('/api/v1/teams', {
            method: 'POST',
            credentials: 'same-origin'
        }).then(function (response) {
            if (response.status >= 400) {
                throw true;
            } else {
                response.json().then(function (data) {
                    dispatch(finishTeamCreation(data));
                });
            }
        }).catch(function (error) {
            return dispatch(finishTeamCreationWithError());
        });
    };
}

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(4);

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

},[255]);