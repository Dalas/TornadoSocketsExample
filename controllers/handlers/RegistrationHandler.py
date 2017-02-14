from .BaseHandler import BaseHandler
from tornado.gen import coroutine
from models import Users, Sessions
import hashlib


class RegistrationHandler(BaseHandler):

    @coroutine
    def post(self):
        yield Users.insert({
            'username': self.get_argument('username'),
            'password': hashlib.sha1(self.get_argument('password').encode('utf-8')).hexdigest()
        })

        self.redirect('/login')
