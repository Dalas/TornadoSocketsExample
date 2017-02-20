from tornado.websocket import WebSocketHandler
from controllers.decorators import is_authenticated
from tornado.gen import coroutine
from models import Messages, Chats
from json import loads, dumps


class WebSocketsHandler(WebSocketHandler):

    @is_authenticated
    @coroutine
    def open(self):
        self.settings['wsp'].open_connection(self.current_user['_id'], self)

    @is_authenticated
    @coroutine
    def on_close(self):
        self.settings['wsp'].close_connection(self.current_user['_id'])

    @is_authenticated
    @coroutine
    def on_message(self, message):
        message = loads(message)

        temporary_id = message['temporary_id']
        del message['temporary_id']

        message = yield Messages.insert(message)
        chat = yield Chats.get_chat_by_id(message['chat_id'])

        self.settings['wsp'].new_message(chat['members'], message, self.current_user['_id'], temporary_id)
