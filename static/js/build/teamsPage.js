webpackJsonp([1],{

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _loader = __webpack_require__(63);

var _loader2 = _interopRequireDefault(_loader);

var _TeamsListComponent = __webpack_require__(122);

var _TeamsListComponent2 = _interopRequireDefault(_TeamsListComponent);

var _reactRedux = __webpack_require__(13);

var _redux = __webpack_require__(15);

var _TeamsActions = __webpack_require__(120);

var teamsActions = _interopRequireWildcard(_TeamsActions);

var _UsersActions = __webpack_require__(266);

var usersActions = _interopRequireWildcard(_UsersActions);

var _TeamActions = __webpack_require__(119);

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
        fetching: state.teamsState.fetching || state.usersState.fetching || state.teamState.fetching,
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

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(15);

var _reduxThunk = __webpack_require__(62);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _teamsReducer = __webpack_require__(124);

var _teamsReducer2 = _interopRequireDefault(_teamsReducer);

var _teamReducer = __webpack_require__(123);

var _teamReducer2 = _interopRequireDefault(_teamReducer);

var _usersReducer = __webpack_require__(125);

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

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectTeam = selectTeam;
exports.createTeam = createTeam;

var _ActionTypes = __webpack_require__(23);

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

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchTeams = fetchTeams;

var _ActionTypes = __webpack_require__(23);

var _isomorphicFetch = __webpack_require__(20);

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

/***/ 122:
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

/***/ 123:
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

var _ActionTypes = __webpack_require__(23);

var initialState = {
    teams: [],
    index: -1,
    current_team: { _id: -1 },
    fetching: false,
    error: ''
};

/***/ }),

/***/ 124:
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

var _ActionTypes = __webpack_require__(23);

var initialState = {
    teams: [],
    fetching: false,
    error: '',
    current_team: {}
};

/***/ }),

/***/ 125:
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

        case _ActionTypes.START_SEARCHING_MEMBERS:
            return _extends({}, state, { fetching_members: true, error: '' });

        case _ActionTypes.FINISH_SEARCHING_MEMBERS:
            return _extends({}, state, { fetching_members: false, members: action.members });

        case _ActionTypes.FINISH_SEARCHING_MEMBERS_WITH_ERROR:
            return _extends({}, state, { fetching_members: false, error: 'Something went wrong!' });

        default:
            return _extends({}, state);
    }
};

var _ActionTypes = __webpack_require__(23);

var initialState = {
    current_user: {},
    members: [],
    fetching: false,
    fetching_members: false,
    error: ''
};

/***/ }),

/***/ 23:
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
var START_SEARCHING_MEMBERS = exports.START_SEARCHING_MEMBERS = "START_FETCHING_MEMBERS";
var FINISH_SEARCHING_MEMBERS = exports.FINISH_SEARCHING_MEMBERS = "FINISH_FETCHING_MEMBERS";
var FINISH_SEARCHING_MEMBERS_WITH_ERROR = exports.FINISH_SEARCHING_MEMBERS_WITH_ERROR = "FINISH_FETCHING_MEMBERS_WITH_ERROR";

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

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(13);

var _store = __webpack_require__(109);

var _store2 = _interopRequireDefault(_store);

var _Teams = __webpack_require__(108);

var _Teams2 = _interopRequireDefault(_Teams);

var _EditableTeam = __webpack_require__(265);

var _EditableTeam2 = _interopRequireDefault(_EditableTeam);

var _loader = __webpack_require__(63);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 21.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import TeamComponent from '../components/teams/containers/TeamComponent';


var TeamsPage = function (_React$Component) {
    _inherits(TeamsPage, _React$Component);

    function TeamsPage(props) {
        _classCallCheck(this, TeamsPage);

        return _possibleConstructorReturn(this, (TeamsPage.__proto__ || Object.getPrototypeOf(TeamsPage)).call(this, props));
    }

    _createClass(TeamsPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: _store2.default },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    _react2.default.createElement(_loader2.default, { display: this.props.fetching }),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-3' },
                        _react2.default.createElement(_Teams2.default, null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm-8' },
                        _react2.default.createElement(_EditableTeam2.default, null)
                    )
                )
            );
        }
    }]);

    return TeamsPage;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(TeamsPage, null), document.getElementById('container'));

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(111);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = _lodash2.default.runInContext();

// Processes a ReactElement by iterating over its props, looking for
// props which are specified by `handlersToWrap`. Matching props will
// be passed to the derived class to be wrapped in a throttling function

var Base = function () {
  function Base(el, handlersToWrap, time) {
    var _this = this;

    _classCallCheck(this, Base);

    this.element = function () {
      return _this._el || (_this._el = _this._processElement());
    };

    this._processElement = function () {
      _this.handlers = _this._wrapHandlers();
      return _react2.default.cloneElement(_this.el, _this.handlers);
    };

    this._extractHandlers = function () {
      return _.pickBy(_this.el.props, _this._shouldWrapHandler);
    };

    this._wrapHandlers = function () {
      return _.mapValues(_this._extractHandlers(), _this._wrapHandler);
    };

    this._shouldWrapHandler = function (handler, handlerName) {
      return _.isFunction(handler) && _this.time > 0 && _this.handlersToWrap.includes(handlerName);
    };

    if (this.constructor === Base) {
      throw new Error('Can\'t instantiate abstract class!');
    }

    // Array of handler names which we should wrap
    this.handlersToWrap = handlersToWrap;

    // Throttle interval/delay
    this.time = time;

    // Element that we are processing
    this.el = el;

    // Array of handlers which we have wrapped (so we can unwrap them)
    this.handlers = [];
  }

  // How the processed element is made public, memoized


  // Clone the element, overwriting unwrapped handlers with their wrapped versions


  // Find the handlers which should be wrapped by the throttling function


  // Pass each handler to the derived class to be wrapped


  _createClass(Base, [{
    key: 'destroy',


    // Cancel timers related to throttling
    value: function destroy() {
      _.values(this.handlers).forEach(this._cancelThrottle);
    }

    // Lodash provides cancel methods on throttle/debounce wrappers

  }, {
    key: '_cancelThrottle',
    value: function _cancelThrottle(handler) {
      handler.cancel && handler.cancel();
    }
  }]);

  return Base;
}();

exports.default = Base;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

var _lodash = __webpack_require__(111);

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      result,
      timerId,
      lastCallTime = 0,
      lastInvokeTime = 0,
      leading = false,
      maxWait = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = (0, _lodash.toNumber)(wait) || 0;
  if ((0, _lodash.isObject)(options)) {
    leading = !!options.leading;
    maxWait = 'maxWait' in options && Math.max((0, _lodash.toNumber)(options.maxWait) || 0, wait);
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxWait === false ? result : nativeMin(result, maxWait - timeSinceLastInvoke);
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return !lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxWait !== false && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = (0, _lodash.now)();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    clearTimeout(timerId);
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastCallTime = lastInvokeTime = 0;
    lastArgs = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge((0, _lodash.now)());
  }

  function debounced() {
    var time = (0, _lodash.now)(),
        isInvoking = shouldInvoke(time);

    lastArgs = (0, _lodash.cloneDeep)(Array.prototype.slice.call(arguments));
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      // Handle invocations in a tight loop.
      clearTimeout(timerId);
      timerId = setTimeout(timerExpired, wait);
      return invokeFunc(lastCallTime);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/***/ }),

/***/ 256:
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = function (_Component) {
  _inherits(Base, _Component);

  function Base(props) {
    _classCallCheck(this, Base);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Base).call(this, props));

    _this.render = function () {
      return _this._throttler.element();
    };

    _this.el = _react2.default.Children.only(props.children);
    _this.handlersToWrap = props.handler.length ? [props.handler] : props.handlers;
    return _this;
  }

  _createClass(Base, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._throttler.destroy();
    }
  }]);

  return Base;
}(_react.Component);

exports.default = Base;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Base2 = __webpack_require__(254);

var _Base3 = _interopRequireDefault(_Base2);

var _debounce = __webpack_require__(255);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debouncer = function (_Base) {
  _inherits(Debouncer, _Base);

  function Debouncer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Debouncer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Debouncer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._wrapHandler = function (fn) {
      return (0, _debounce2.default)(fn, _this.time);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Debouncer;
}(_Base3.default);

exports.default = Debouncer;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Base2 = __webpack_require__(254);

var _Base3 = _interopRequireDefault(_Base2);

var _throttle = __webpack_require__(261);

var _throttle2 = _interopRequireDefault(_throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Throttler = function (_Base) {
  _inherits(Throttler, _Base);

  function Throttler() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Throttler);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Throttler)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._wrapHandler = function (fn) {
      return (0, _throttle2.default)(fn, _this.time);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Throttler;
}(_Base3.default);

exports.default = Throttler;

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

var _lodash = __webpack_require__(111);

var _debounce = __webpack_require__(255);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if ((0, _lodash.isObject)(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return (0, _debounce2.default)(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _Debouncer = __webpack_require__(259);

var _Debouncer2 = _interopRequireDefault(_Debouncer);

var _Base2 = __webpack_require__(256);

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Debounce = function (_Base) {
  _inherits(Debounce, _Base);

  function Debounce(props) {
    _classCallCheck(this, Debounce);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Debounce).call(this, props));

    _this._throttler = new _Debouncer2.default(_this.el, _this.handlersToWrap, props.time);
    return _this;
  }

  return Debounce;
}(_Base3.default);

Debounce.defaultProps = {
  handler: '',
  handlers: [],
  time: 400
};
exports.default = Debounce;

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _Throttler = __webpack_require__(260);

var _Throttler2 = _interopRequireDefault(_Throttler);

var _Base2 = __webpack_require__(256);

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Throttle = function (_Base) {
  _inherits(Throttle, _Base);

  function Throttle(props) {
    _classCallCheck(this, Throttle);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Throttle).call(this, props));

    _this._throttler = new _Throttler2.default(props.children, _this.handlersToWrap, props.time);
    return _this;
  }

  return Throttle;
}(_Base3.default);

Throttle.defaultProps = {
  handler: '',
  handlers: [],
  time: 100
};
exports.default = Throttle;

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Throttle = exports.Debounce = undefined;

var _Debounce = __webpack_require__(262);

var _Debounce2 = _interopRequireDefault(_Debounce);

var _Throttle = __webpack_require__(263);

var _Throttle2 = _interopRequireDefault(_Throttle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Debounce = _Debounce2.default;
exports.Throttle = _Throttle2.default;

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _InviteUser = __webpack_require__(268);

var _InviteUser2 = _interopRequireDefault(_InviteUser);

var _reactRedux = __webpack_require__(13);

var _redux = __webpack_require__(15);

var _UsersActions = __webpack_require__(266);

var usersActions = _interopRequireWildcard(_UsersActions);

var _TeamActions = __webpack_require__(119);

var teamActions = _interopRequireWildcard(_TeamActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 22.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var TeamComponent = function (_React$Component) {
    _inherits(TeamComponent, _React$Component);

    function TeamComponent(props) {
        _classCallCheck(this, TeamComponent);

        console.log(props);
        return _possibleConstructorReturn(this, (TeamComponent.__proto__ || Object.getPrototypeOf(TeamComponent)).call(this, props));
    }

    _createClass(TeamComponent, [{
        key: 'render',
        value: function render() {
            var component = void 0;

            if (this.props.team._id == -1) {
                component = _react2.default.createElement(
                    'div',
                    null,
                    'Nothing to show!'
                );
            } else {
                component = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Information:'
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'table' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'ID:'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    this.props.team._id
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { className: 'align-middle' },
                                    'Title:'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('input', { id: 'team-title', className: 'form-control border-box', defaultValue: this.props.team.title })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Owner:'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    this.props.team.github_url
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'GitHub:'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    this.props.team.github_url
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Members:'
                    ),
                    _react2.default.createElement(
                        'table',
                        { className: 'table' },
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'ID'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'E-mail'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Status'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Username'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            this.props.team.members ? this.props.team.members.map(function (member, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        member._id
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        member.email
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        member.status
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { target: '_blank', href: '/profile/' + member._id },
                                            member.username
                                        )
                                    )
                                );
                            }) : _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { colSpan: '4' },
                                    'Nothing to show!'
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    { colSpan: '4' },
                                    _react2.default.createElement(_InviteUser2.default, null)
                                )
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                null,
                component
            );
        }
    }]);

    return TeamComponent;
}(_react2.default.Component);

/**
* ************************************ *
**/

var mapStateToProps = function mapStateToProps(state) {
    return {
        fetching: state.teamsState.fetching || state.usersState.fetching || state.teamState.fetching,
        team: state.teamState.current_team,
        current_user: state.usersState.current_user
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, usersActions, teamActions), dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TeamComponent);

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchCurrentUser = fetchCurrentUser;
exports.searchMembers = searchMembers;

var _ActionTypes = __webpack_require__(23);

var _isomorphicFetch = __webpack_require__(20);

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

/*
* Available members
* */

function startSearchingMembers() {
    return {
        type: _ActionTypes.START_SEARCHING_MEMBERS
    };
}

function finishSearchingMembers(members) {
    return {
        type: _ActionTypes.FINISH_SEARCHING_MEMBERS,
        members: members
    };
}

function finishSearchingMembersWithError() {
    return {
        type: _ActionTypes.FINISH_SEARCHING_MEMBERS_WITH_ERROR
    };
}

function searchMembers(search_string) {
    return function (dispatch) {
        dispatch(startSearchingMembers());

        (0, _isomorphicFetch2.default)('/api/v1/search-users', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({ search_string: search_string })
        }).then(function (response) {
            if (response.status >= 400) {
                throw true;
            } else {
                response.json().then(function (data) {
                    finishSearchingMembers(data);
                });
            }
        }).catch(function (error) {
            return dispatch(finishSearchingMembersWithError());
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(21);

var _reactThrottle = __webpack_require__(264);

var _reactRedux = __webpack_require__(13);

var _redux = __webpack_require__(15);

var _UsersActions = __webpack_require__(266);

var usersActions = _interopRequireWildcard(_UsersActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 23.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var InviteMembersComponent = function (_React$Component) {
    _inherits(InviteMembersComponent, _React$Component);

    function InviteMembersComponent(props) {
        _classCallCheck(this, InviteMembersComponent);

        var _this = _possibleConstructorReturn(this, (InviteMembersComponent.__proto__ || Object.getPrototypeOf(InviteMembersComponent)).call(this, props));

        _this.handleUserInputChange = _this.handleUserInputChange.bind(_this);
        _this.handleSelectUser = _this.handleSelectUser.bind(_this);
        _this.setInputValue = _this.setInputValue.bind(_this);
        _this.showUsers = _this.showUsers.bind(_this);
        _this.hideUsers = _this.hideUsers.bind(_this);

        _this.state = {
            username: '',
            show: false,
            users: [],
            selected_user: ''
        };

        document.addEventListener("click", _this.hideUsers);
        return _this;
    }

    _createClass(InviteMembersComponent, [{
        key: 'handleUserInputChange',
        value: function handleUserInputChange(event) {
            this.setState({
                username: event.target.value,
                selected_user: ''
            });

            this.setInputValue(event.target.value);

            if (event.target.value) this.fetchAvailableUsers(event.target.value);
        }
    }, {
        key: 'showUsers',
        value: function showUsers(event) {
            event.nativeEvent.stopImmediatePropagation();

            this.setState({
                show: true
            });
        }
    }, {
        key: 'hideUsers',
        value: function hideUsers() {
            this.setState({
                show: false
            });
        }
    }, {
        key: 'handleSelectUser',
        value: function handleSelectUser(event, user) {
            this.setState({
                selected_user: user._id,
                username: user.username
            });

            this.setInputValue(user.username);
        }
    }, {
        key: 'setInputValue',
        value: function setInputValue(value) {
            (0, _reactDom.findDOMNode)(this.refs.searchInput).value = value;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'form-group row' },
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-8' },
                    _react2.default.createElement(
                        _reactThrottle.Debounce,
                        { time: '500', handler: 'onChange' },
                        _react2.default.createElement('input', { ref: 'searchInput', onClick: this.showUsers, className: 'form-control border-box', type: 'text', defaultValue: this.state.username, onChange: this.handleUserInputChange })
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'list-group users-preview-list ' + (this.state.show ? "" : "hidden") },
                        this.state.users.map(function (user, index) {
                            return _react2.default.createElement(
                                'li',
                                { key: index, onClick: function onClick(event) {
                                        _this2.handleSelectUser(event, user);
                                    }, className: 'list-group-item' },
                                user.username
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'button',
                    { disabled: !this.state.selected_user, className: 'btn btn-primary col-sm-3' },
                    'Invite User'
                )
            );
        }
    }]);

    return InviteMembersComponent;
}(_react2.default.Component);

/**
* ************************************ *
**/

var mapStateToProps = function mapStateToProps(state) {
    return {
        fetching: state.usersState.fetching_members,
        users: state.usersState.members,
        current_user: state.usersState.current_user
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, usersActions), dispatch)
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InviteMembersComponent);

/***/ }),

/***/ 62:
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

/***/ 63:
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

},[251]);