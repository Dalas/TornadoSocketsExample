from tornado.web import RequestHandler
from tornado.gen import coroutine
from models import Users


class BaseHandler(RequestHandler):

    def initialize(self, template):
        self.template = template
        self.db = self.settings['db']

    @coroutine
    def get(self):
        token = self.get_secure_cookie('token')
        if token:
            self.current_user = yield Users.find_by_session_token(token.decode('utf-8'))

        self.render(self.template)
