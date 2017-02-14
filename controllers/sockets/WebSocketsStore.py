

class WebSocketsStore():

    def __init__(self):
        self.connections = {}

    def open_connection(self, user_id, connection):
        self.connections[user_id] = connection

    def close_connection(self, user_id):
        del self.connections[user_id]