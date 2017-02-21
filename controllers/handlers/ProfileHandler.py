from .BaseHandler import BaseHandler
from controllers.decorators import is_authenticated
from tornado.web import asynchronous
from tornado.gen import coroutine
from models import Users


class ProfileHandler(BaseHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def get(self, user_id=None):
        if self.current_user['_id'] == user_id:
            pass

        if not user_id:
            user_id = self.current_user['_id']

        user = yield Users.get(user_id)
        self.render(self.template, user=user)