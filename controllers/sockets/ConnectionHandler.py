from tornado.websocket import WebSocketHandler


class ConnectionHandler(WebSocketHandler):

    def open(self):
        print('open')