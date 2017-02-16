from tornado.web import RequestHandler, asynchronous
from tornado.gen import coroutine
from controllers.decorators import is_authenticated
from models import Chats
from json import dumps


class ChatsApi(RequestHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def get(self):
        chats = yield Chats.get_all_users_chats(str(self.current_user['_id']))

        self.write(dumps(chats))
