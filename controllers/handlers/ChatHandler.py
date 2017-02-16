from .BaseHandler import BaseHandler
from tornado.gen import coroutine
from controllers.decorators import is_authenticated


class ChatHandler(BaseHandler):

    @is_authenticated
    @coroutine
    def get(self):
        self.render(self.template)