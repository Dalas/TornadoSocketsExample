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
        members = [
            str(self.current_user['_id']),
            self.get_argument('member')
        ]

        chat = yield Chats.get_chat_by_members(members)

        if not chat:
            chat = yield Chats.insert({
                'conversation': False,
                'members': members,
                'title': ''
            })

        chat['_id'] = str(chat['_id'])

        self.write(dumps({'chat': chat, 'messages': []}))
