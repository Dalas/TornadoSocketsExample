from .BaseHandler import BaseHandler
from tornado.gen import coroutine
from controllers.decorators import is_authenticated


class ChatHandler(BaseHandler):

    @coroutine
    @is_authenticated
    def get(self):
        self.render(self.template)