from tornado.websocket import WebSocketHandler
from controllers.decorators import is_authenticated
from tornado.gen import coroutine


class WebSocketsHandler(WebSocketHandler):

    @coroutine
    @is_authenticated
    def open(self):
        self.settings['wsp'].open_connection(self.current_user['_id'], self)

    @coroutine
    @is_authenticated
    def on_close(self):
        self.settings['wsp'].close_connection(self.current_user['_id'])

    @coroutine
    @is_authenticated
    def on_message(self, message):
        print("Client %s received a message : %s" % (self, message))

