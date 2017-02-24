webpackJsonp([1],{

/***/ 107:
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 17.02.17.
                                                                                                                                                                                                                                                                   */

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactRedux = __webpack_require__(10);

var _redux = __webpack_require__(12);

var _ChatActions = __webpack_require__(66);

var chatActions = _interopRequireWildcard(_ChatActions);

var _MessageInput = __webpack_require__(121);

var _MessageInput2 = _interopRequireDefault(_MessageInput);

var _Message = __webpack_require__(120);

var _Message2 = _interopRequireDefault(_Message);

var _uuid = __webpack_require__(257);

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
    return {
        fetching: state.chatState.fetching,
        is_chat: state.chatState.is_chat,
        id: state.chatState.companion,
        messages: state.chatState.messages,
        current_user: state.chatState.current_user
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, chatActions), dispatch)
    };
};

var ChatComponent = function (_React$Component) {
    _inherits(ChatComponent, _React$Component);

    function ChatComponent(props) {
        _classCallCheck(this, ChatComponent);

        var _this = _possibleConstructorReturn(this, (ChatComponent.__proto__ || Object.getPrototypeOf(ChatComponent)).call(this, props));

        _this.sendMessage = _this.sendMessage.bind(_this);
        _this.openConnection = _this.openConnection.bind(_this);
        _this.updateScroll = _this.updateScroll.bind(_this);

        _this.openConnection();
        return _this;
    }

    _createClass(ChatComponent, [{
        key: 'openConnection',
        value: function openConnection() {
            this.socket = new WebSocket('ws://' + location.host + '/ws');

            this.socket.onopen = this.handleConnectionOpen.bind(this);
            this.socket.onclose = this.handleConnectionClose.bind(this);
            this.socket.onerror = this.handleConnectionError.bind(this);
            this.socket.onmessage = this.receiveMessage.bind(this);
        }
    }, {
        key: 'handleConnectionOpen',
        value: function handleConnectionOpen(event) {
            console.log(event);
        }
    }, {
        key: 'handleConnectionClose',
        value: function handleConnectionClose() {
            this.openConnection();
        }
    }, {
        key: 'handleConnectionError',
        value: function handleConnectionError(event) {
            console.log(event);
        }
    }, {
        key: 'receiveMessage',
        value: function receiveMessage(event) {
            var message = JSON.parse(event.data);
            console.log(message);

            this.props.actions.receiveMessage(message);
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(message) {
            message = {
                text: message,
                temporary_id: _uuid2.default.v4(),
                chat_id: this.props.id,
                author: _extends({}, this.props.current_user)
            };

            this.socket.send(JSON.stringify(message));
            this.props.actions.sendMessage(message);
        }
    }, {
        key: 'updateScroll',
        value: function updateScroll() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var messages = [];

            if (this.props.fetching) {
                messages = _react2.default.createElement(
                    'p',
                    null,
                    'Fetching'
                );
            } else if (this.props.messages.length == 0) {
                messages = _react2.default.createElement(
                    'p',
                    null,
                    'Nothing to show!'
                );
            } else {
                messages = this.props.messages.map(function (message, index) {
                    return _react2.default.createElement(_Message2.default, { key: index, message: message, current_user: _this2.props.current_user });
                });
            }

            return _react2.default.createElement(
                'div',
                { className: this.props.id ? "col-sm-6 chat-container" : "col-sm-6 chat-container hidden" },
                _react2.default.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-heading' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'panel-title' },
                            'Panel title'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { ref: 'messages-container', className: 'panel-body messages-container' },
                        messages
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'panel-footer' },
                        _react2.default.createElement(_MessageInput2.default, { sendMessage: this.sendMessage })
                    )
                )
            );
        }
    }]);

    return ChatComponent;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ChatComponent);

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 16.02.17.
                                                                                                                                                                                                                                                                   */

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(10);

var _redux = __webpack_require__(12);

var _ConversationActions = __webpack_require__(118);

var conversationActions = _interopRequireWildcard(_ConversationActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
    return _extends({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, conversationActions), dispatch)
    };
};

var ConversationsComponent = function (_React$Component) {
    _inherits(ConversationsComponent, _React$Component);

    function ConversationsComponent(props) {
        _classCallCheck(this, ConversationsComponent);

        var _this = _possibleConstructorReturn(this, (ConversationsComponent.__proto__ || Object.getPrototypeOf(ConversationsComponent)).call(this, props));

        _this.props.actions.fetchConversations();
        return _this;
    }

    _createClass(ConversationsComponent, [{
        key: 'render',
        value: function render() {
            var listContent = [];

            if (this.props.conversationsState.fetching) {
                listContent = _react2.default.createElement(
                    'li',
                    { className: 'list-group-item' },
                    'Fetching'
                );
            } else if (this.props.conversationsState.conversations.length == 0) {
                listContent = _react2.default.createElement(
                    'li',
                    { className: 'list-group-item' },
                    'Nothing to show!'
                );
            } else {
                listContent = this.props.conversationsState.conversations.map(function (conversation, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'list-group-item' },
                        conversation.title
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'col-sm-2' },
                _react2.default.createElement(
                    'p',
                    null,
                    this.props.conversationsState.error
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'list-group' },
                    listContent
                )
            );
        }
    }]);

    return ConversationsComponent;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConversationsComponent);

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 15.02.17.
                                                                                                                                                                                                                                                                   */

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(10);

var _redux = __webpack_require__(12);

var _UsersActions = __webpack_require__(119);

var usersActions = _interopRequireWildcard(_UsersActions);

var _ChatActions = __webpack_require__(66);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
    return _extends({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(_extends({}, usersActions, { fetchChat: _ChatActions.fetchChat }), dispatch)
    };
};

var UsersComponent = function (_React$Component) {
    _inherits(UsersComponent, _React$Component);

    function UsersComponent(props) {
        _classCallCheck(this, UsersComponent);

        var _this = _possibleConstructorReturn(this, (UsersComponent.__proto__ || Object.getPrototypeOf(UsersComponent)).call(this, props));

        _this.props.actions.fetchUsers();
        return _this;
    }

    _createClass(UsersComponent, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var listContent = [];

            if (this.props.usersState.fetching) {
                listContent = _react2.default.createElement(
                    'li',
                    { className: 'list-group-item' },
                    'Fetching'
                );
            } else if (this.props.usersState.users.length == 0) {
                listContent = _react2.default.createElement(
                    'li',
                    { className: 'list-group-item' },
                    'Nothing to show!'
                );
            } else {
                listContent = this.props.usersState.users.map(function (user, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'list-group-item flex-center' },
                        _react2.default.createElement(
                            'span',
                            null,
                            user.username
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default',
                                onClick: function onClick() {
                                    _this2.props.actions.fetchChat(user._id);
                                } },
                            'Open Chat'
                        )
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'col-sm-3' },
                _react2.default.createElement(
                    'p',
                    null,
                    this.props.usersState.error
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'list-group' },
                    listContent
                )
            );
        }
    }]);

    return UsersComponent;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UsersComponent);

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(12);

var _reduxThunk = __webpack_require__(64);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _usersReducer = __webpack_require__(124);

var _usersReducer2 = _interopRequireDefault(_usersReducer);

var _conversationsReducer = __webpack_require__(123);

var _conversationsReducer2 = _interopRequireDefault(_conversationsReducer);

var _chatReducer = __webpack_require__(122);

var _chatReducer2 = _interopRequireDefault(_chatReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.createStore)((0, _redux.combineReducers)({
    usersState: _usersReducer2.default,
    conversationsState: _conversationsReducer2.default,
    chatState: _chatReducer2.default
}), (0, _redux.applyMiddleware)(_reduxThunk2.default)); /**
                                                         * Created by yura on 16.02.17.
                                                         */

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startFetchingConversations = startFetchingConversations;
exports.finishFetchingConversations = finishFetchingConversations;
exports.finishFetchingConversationsWithError = finishFetchingConversationsWithError;
exports.fetchConversations = fetchConversations;
exports.startFetchingConversation = startFetchingConversation;
exports.finishFetchingConversation = finishFetchingConversation;
exports.finishFetchingConversationWithError = finishFetchingConversationWithError;
exports.fetchConversation = fetchConversation;

var _ActionTypes = __webpack_require__(22);

var _isomorphicFetch = __webpack_require__(21);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Conversations

/**
 * Created by yura on 16.02.17.
 */

function startFetchingConversations() {
    return {
        type: _ActionTypes.START_FETCHING_CONVERSATIONS
    };
}

function finishFetchingConversations(conversations) {
    return {
        type: _ActionTypes.FINISH_FETCHING_CONVERSATIONS,
        conversations: conversations
    };
}

function finishFetchingConversationsWithError() {
    return {
        type: _ActionTypes.FINISH_FETCHING_CONVERSATIONS_WITH_ERROR
    };
}

function fetchConversations() {
    return function (dispatch) {
        dispatch(startFetchingConversations());

        (0, _isomorphicFetch2.default)('/api/v1/conversations', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(function (response) {
            if (response.status >= 400) {
                dispatch(finishFetchingConversationsWithError());
            } else {
                response.json().then(function (conversations) {
                    dispatch(finishFetchingConversations(conversations));
                });
            }
        }).catch(function (error) {
            return dispatch(finishFetchingConversationsWithError());
        });
    };
}

// Conversation

function startFetchingConversation(conversation_id) {
    return {
        type: _ActionTypes.START_FETCHING_CONVERSATION,
        conversation_id: conversation_id
    };
}

function finishFetchingConversation(messages) {
    return {
        type: _ActionTypes.FINISH_FETCHING_CONVERSATION,
        messages: messages
    };
}

function finishFetchingConversationWithError() {
    return {
        type: _ActionTypes.FINISH_FETCHING_CONVERSATION_WITH_ERROR
    };
}

function fetchConversation(conversation_id) {
    return function (dispatch) {
        dispatch(startFetchingConversation());

        (0, _isomorphicFetch2.default)('/api/v1/conversations', {
            method: 'GET',
            credentials: 'same-origin',
            body: JSON.stringify({ conversation_id: conversation_id })
        }).then(function (response) {
            if (response.status >= 400) {
                dispatch(finishFetchingConversationWithError(conversation_id));
            } else {
                response.json().then(function (messages) {
                    dispatch(finishFetchingConversation(messages));
                });
            }
        }).catch(function (error) {
            return dispatch(finishFetchingConversationWithError());
        });
    };
}

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startFetchingUsers = startFetchingUsers;
exports.finishFetchingUsersWithError = finishFetchingUsersWithError;
exports.finishFetchingUsers = finishFetchingUsers;
exports.fetchUsers = fetchUsers;

var _ActionTypes = __webpack_require__(22);

var _isomorphicFetch = __webpack_require__(21);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yura on 15.02.17.
 */

function startFetchingUsers() {
    return {
        type: _ActionTypes.START_FETCHING_USERS
    };
}

function finishFetchingUsersWithError() {
    return {
        type: _ActionTypes.FINISH_FETCHING_USERS_WITH_ERROR
    };
}

function finishFetchingUsers(users) {
    return {
        type: _ActionTypes.FINISH_FETCHING_USERS,
        users: users
    };
}

function fetchUsers() {
    return function (dispatch) {
        dispatch(startFetchingUsers());

        (0, _isomorphicFetch2.default)('/api/v1/users', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(function (response) {
            if (response.status >= 400) {
                dispatch(finishFetchingUsersWithError());
            } else {
                response.json().then(function (users) {
                    dispatch(finishFetchingUsers(users));
                });
            }
        }).catch(function (error) {
            return dispatch(finishFetchingUsersWithError());
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

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var message = _ref.message,
        current_user = _ref.current_user;

    return _react2.default.createElement(
        "li",
        { className: message.author._id == current_user._id ? "my-message" : "message" },
        _react2.default.createElement(
            "p",
            null,
            message.author.username
        ),
        _react2.default.createElement(
            "p",
            null,
            message.text
        ),
        _react2.default.createElement(
            "p",
            null,
            message.datetime
        )
    );
}; /**
    * Created by yura on 20.02.17.
    */

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 17.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.handleMessageChange = _this.handleMessageChange.bind(_this);
        _this.sendWithKeyboard = _this.sendWithKeyboard.bind(_this);
        _this.sendMessage = _this.sendMessage.bind(_this);

        _this.state = {
            message: ''
        };

        document.addEventListener('keypress', _this.sendWithKeyboard);
        return _this;
    }

    _createClass(_class, [{
        key: 'handleMessageChange',
        value: function handleMessageChange(event) {
            this.setState({
                message: event.target.value
            });
        }
    }, {
        key: 'sendWithKeyboard',
        value: function sendWithKeyboard(event) {
            if (event.ctrlKey && event.keyCode == 10) {
                this.sendMessage();
            }
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage() {
            if (!this.state.message) return;

            this.props.sendMessage(this.state.message);
            this.setState({
                prevMessage: this.state.message,
                message: ''
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'new-message-container' },
                _react2.default.createElement('textarea', { onChange: this.handleMessageChange, className: 'form-control', cols: '25', rows: '10', value: this.state.message }),
                _react2.default.createElement(
                    'button',
                    { onClick: this.sendMessage, className: 'btn btn-default' },
                    'Send message'
                )
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

exports.default = _class;

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 16.02.17.
                                                                                                                                                                                                                                                                   */

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var messages = [];

    switch (action.type) {
        case _ActionTypes.START_FETCHING_CHAT:
            return _extends({}, state, { fetching: true, error: '', is_chat: true });

        case _ActionTypes.FINISH_FETCHING_CHAT:
            return _extends({}, state, { fetching: false, messages: action.messages, companion: action.chat_id, current_user: action.current_user });

        case _ActionTypes.FINISH_FETCHING_CHAT_WITH_ERROR:
            return _extends({}, state, { fetching: false, messages: [], error: 'Something went wrong!', companion: '' });

        case _ActionTypes.START_FETCHING_CONVERSATION:
            return _extends({}, state, { fetching: true, error: '', companion: action.conversation_id, is_chat: false });

        case _ActionTypes.FINISH_FETCHING_CONVERSATION:
            return _extends({}, state, { fetching: false, messages: action.messages });

        case _ActionTypes.FINISH_FETCHING_CONVERSATION_WITH_ERROR:
            return _extends({}, state, { fetching: false, messages: [], error: 'Something went wrong!', companion: '' });

        case _ActionTypes.SEND_MESSAGE:
            messages = state.messages.slice();
            action.message.status = 'SENDING';
            messages.push(action.message);

            return _extends({}, state, { messages: messages });

        case _ActionTypes.RECEIVE_MESSAGE:
            messages = state.messages.slice();
            if (action.message.author._id == state.current_user._id) {
                messages.find(function (element, index, arr) {
                    if (element.temporary_id == action.message.temporary_id) {
                        delete action.message.temporary_id;
                        arr[index] = action.message;
                    }
                });
            } else {
                delete action.message.temporary_id;
                messages.push(action.message);
            }

            return _extends({}, state, { messages: messages });

        default:
            return _extends({}, state);
    }
};

var _ActionTypes = __webpack_require__(22);

var initialState = {
    messages: [],
    fetching: false,
    error: '',
    companion: '',
    is_chat: true
};

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 16.02.17.
                                                                                                                                                                                                                                                                   */

var _ActionTypes = __webpack_require__(22);

var initialState = {
    conversations: [],
    fetching: false,
    error: '',
    currentChat: ''
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _ActionTypes.START_FETCHING_CONVERSATIONS:
            return _extends({}, state, { fetching: true, error: '' });

        case _ActionTypes.FINISH_FETCHING_CONVERSATIONS:
            return _extends({}, state, { fetching: false, conversations: action.conversations });

        case _ActionTypes.FINISH_FETCHING_CONVERSATIONS_WITH_ERROR:
            return _extends({}, state, { fetching: false, error: 'Something went wrong!' });

        default:
            return state;
    }
};

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by yura on 15.02.17.
                                                                                                                                                                                                                                                                   */

var _ActionTypes = __webpack_require__(22);

var initialState = {
    users: [],
    fetching: false,
    error: ''
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _ActionTypes.START_FETCHING_USERS:
            return _extends({}, state, { fetching: true, error: '' });

        case _ActionTypes.FINISH_FETCHING_USERS:
            return _extends({}, state, { fetching: false, users: action.users });

        case _ActionTypes.FINISH_FETCHING_USERS_WITH_ERROR:
            return _extends({}, state, { fetching: false, error: 'Something went wrong!' });

        default:
            return state;
    }
};

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by yura on 15.02.17.
 */

var START_FETCHING_USERS = exports.START_FETCHING_USERS = "START_FETCHING_USERS";
var FINISH_FETCHING_USERS = exports.FINISH_FETCHING_USERS = "FINISH_FETCHING_USERS";
var FINISH_FETCHING_USERS_WITH_ERROR = exports.FINISH_FETCHING_USERS_WITH_ERROR = "FINISH_FETCHING_USERS_WITH_ERROR";

var START_FETCHING_CHAT = exports.START_FETCHING_CHAT = "START_FETCHING_CHAT";
var FINISH_FETCHING_CHAT = exports.FINISH_FETCHING_CHAT = "FINISH_FETCHING_CHAT";
var FINISH_FETCHING_CHAT_WITH_ERROR = exports.FINISH_FETCHING_CHAT_WITH_ERROR = "FINISH_FETCHING_CHAT_WITH_ERROR";

var START_FETCHING_CONVERSATION = exports.START_FETCHING_CONVERSATION = "START_FETCHING_CONVERSATION";
var FINISH_FETCHING_CONVERSATION = exports.FINISH_FETCHING_CONVERSATION = "FINISH_FETCHING_CONVERSATION";
var FINISH_FETCHING_CONVERSATION_WITH_ERROR = exports.FINISH_FETCHING_CONVERSATION_WITH_ERROR = "FINISH_FETCHING_CONVERSATION_WITH_ERROR";

var START_FETCHING_CONVERSATIONS = exports.START_FETCHING_CONVERSATIONS = "START_FETCHING_CONVERSATIONS";
var FINISH_FETCHING_CONVERSATIONS = exports.FINISH_FETCHING_CONVERSATIONS = "FINISH_FETCHING_CONVERSATIONS";
var FINISH_FETCHING_CONVERSATIONS_WITH_ERROR = exports.FINISH_FETCHING_CONVERSATIONS_WITH_ERROR = "FINISH_FETCHING_CONVERSATIONS_WITH_ERROR";

var RECEIVE_MESSAGE = exports.RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
var SEND_MESSAGE = exports.SEND_MESSAGE = "SEND_MESSAGE";

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(258);
var v4 = __webpack_require__(259);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var rng = __webpack_require__(108);
var bytesToUuid = __webpack_require__(107);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(108);
var bytesToUuid = __webpack_require__(107);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(17);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(10);

var _store = __webpack_require__(113);

var _store2 = _interopRequireDefault(_store);

var _Users = __webpack_require__(112);

var _Users2 = _interopRequireDefault(_Users);

var _Conversations = __webpack_require__(111);

var _Conversations2 = _interopRequireDefault(_Conversations);

var _Chat = __webpack_require__(110);

var _Chat2 = _interopRequireDefault(_Chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yura on 15.02.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MainChatPageComponent = function (_React$Component) {
    _inherits(MainChatPageComponent, _React$Component);

    function MainChatPageComponent(props) {
        _classCallCheck(this, MainChatPageComponent);

        var _this = _possibleConstructorReturn(this, (MainChatPageComponent.__proto__ || Object.getPrototypeOf(MainChatPageComponent)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(MainChatPageComponent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactRedux.Provider,
                    { store: _store2.default },
                    _react2.default.createElement(_Users2.default, null)
                ),
                _react2.default.createElement(
                    _reactRedux.Provider,
                    { store: _store2.default },
                    _react2.default.createElement(_Conversations2.default, null)
                ),
                _react2.default.createElement(
                    _reactRedux.Provider,
                    { store: _store2.default },
                    _react2.default.createElement(_Chat2.default, null)
                )
            );
        }
    }]);

    return MainChatPageComponent;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(MainChatPageComponent, null), document.getElementById('container'));

/***/ }),

/***/ 64:
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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMessage = sendMessage;
exports.receiveMessage = receiveMessage;
exports.startFetchingChat = startFetchingChat;
exports.finishFetchingChat = finishFetchingChat;
exports.finishFetchingChatWithError = finishFetchingChatWithError;
exports.fetchChat = fetchChat;

var _ActionTypes = __webpack_require__(22);

var _isomorphicFetch = __webpack_require__(21);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yura on 16.02.17.
 */

function sendMessage(message) {
    return {
        type: _ActionTypes.SEND_MESSAGE,
        message: message
    };
}

function receiveMessage(message) {
    return {
        type: _ActionTypes.RECEIVE_MESSAGE,
        message: message
    };
}

function startFetchingChat(member_id) {
    return {
        type: _ActionTypes.START_FETCHING_CHAT,
        member_id: member_id
    };
}

function finishFetchingChat(chat_id, messages, current_user) {
    return {
        type: _ActionTypes.FINISH_FETCHING_CHAT,
        chat_id: chat_id,
        messages: messages,
        current_user: current_user
    };
}

function finishFetchingChatWithError() {
    return {
        type: _ActionTypes.FINISH_FETCHING_CHAT_WITH_ERROR
    };
}

function fetchChat(member_id) {
    return function (dispatch) {
        dispatch(startFetchingChat(member_id));
        (0, _isomorphicFetch2.default)('/api/v1/chats', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({ member_id: member_id })
        }).then(function (response) {
            if (response.status >= 400) {
                dispatch(finishFetchingChatWithError());
            } else {
                response.json().then(function (data) {

                    dispatch(finishFetchingChat(data.chat_id, data.messages, data.current_user));
                });
            }
        }).catch(function (error) {
            return dispatch(finishFetchingChatWithError());
        });
    };
}

/***/ })

},[261]);