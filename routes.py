from tornado.web import StaticFileHandler
from controllers import *


routes = [
    # static handler
    ("/static/(.*)", StaticFileHandler),

    # authentication
    ("/login", LoginHandler, {"template": "Login.html"}),
    ("/registration", RegistrationHandler, {"template": "Registration.html"}),

    # handlers
    ("/", BaseHandler, {"template": "Main.html"}),
    ("/chat", ChatHandler, {"template": "Chat.html"}),

    # Api
    ("/api/v1/users", UsersApi),
    ("/api/v1/chats", ChatsApi),
    ("/api/v1/conversations", ConversationsApi),

    # websockets
    ("/ws", WebSocketsHandler)
]