

class WebSocketsPool:

    def __init__(self):
        self.connections = {}

    def open_connection(self, user_id, connection):
        self.connections[user_id] = connection

    def close_connection(self, user_id):
        if user_id in self.connections:
            del self.connections[user_id]

    def get_connection(self, user_id):
        return self.connections[user_id]

    def new_message(self, members, message):
        for member in members:
            if member in self.connections:
                self.connections[member].write_message(message)

