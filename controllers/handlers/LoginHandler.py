from tornado.gen import coroutine
from .BaseHandler import BaseHandler
from models import Users, Sessions
import hashlib


class LoginHandler(BaseHandler):

    def get(self):
        self.render(self.template, error='')

    @coroutine
    def post(self):
        user = yield Users.find_one({'username':self.get_argument('username')})

        if not user:
            return self.render(self.template, error='Invalid email or password!')

        if user['password'] != hashlib.sha1(self.get_argument('password').encode('utf-8')).hexdigest():
            return self.render(self.template, error='Invalid email or password!')

        session = yield Sessions.update_or_create(user['_id'])
        self.set_secure_cookie('token', session['token'])
        self.redirect('/chat')
