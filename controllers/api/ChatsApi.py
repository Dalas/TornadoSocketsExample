from tornado.web import RequestHandler, asynchronous
from tornado.gen import coroutine
from controllers.decorators import is_authenticated
from models import Chats, Messages
from json import dumps, loads


class ChatsApi(RequestHandler):


    @is_authenticated
    @asynchronous
    @coroutine
    def post(self):
        body = loads(self.request.body.decode('utf-8'))
        members = [
            str(self.current_user['_id']),
            body['member_id']
        ]

        chat = yield Chats.get_chat_by_members(members)

        if not chat:
            chat = yield Chats.insert({
                'conversation': False,
                'members': members,
                'title': ''
            })

        chat['_id'] = str(chat['_id'])

        messages = yield Messages.get_chat_messages(10, 1, chat['_id'])

        current_user = self.current_user
        current_user['_id'] = str(current_user['_id'])

        self.write(dumps({'chat_id': chat['_id'], 'messages': messages, 'current_user': current_user}))
