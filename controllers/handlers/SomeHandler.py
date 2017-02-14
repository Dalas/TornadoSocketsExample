from .BaseHandler import BaseHandler
from tornado.gen import coroutine
from controllers.decorators import is_authenticated


class SomeHandler(BaseHandler):

    @coroutine
    @is_authenticated
    def get(self):
        print('here')