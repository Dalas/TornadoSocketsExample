from tornado.web import StaticFileHandler
from controllers import *


routes = [
    ("/", BaseHandler, {"template": "Main.html"}),
    ("/login", LoginHandler, {"template": "Login.html"}),
    ("/registration", RegistrationHandler, {"template": "Registration.html"}),
    ("/chat", ChatHandler, {"template": "Chat.html"}),
    ("/ws", WebSocketsHandler),
    ("/static/(.*)", StaticFileHandler)
]