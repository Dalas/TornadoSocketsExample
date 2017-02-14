from tornado.web import StaticFileHandler
from controllers import *


routes = [
    ("/", BaseHandler, {"template": "Main.html"}),
    ("/login", LoginHandler, {"template": "Login.html"}),
    ("/registration", RegistrationHandler, {"template": "Registration.html"}),
    ("/some", SomeHandler, {"template": "Registration.html"}),
    ("/ws/connection", ConnectionHandler),
    ("/static/(.*)", StaticFileHandler)
]