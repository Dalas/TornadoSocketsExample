

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

    def new_message(self, members, message, author_id, temporary_id):
        for member in members:
            if member in self.connections:
                if member == author_id:
                    message['temporary_id'] = temporary_id

                self.connections[member].write_message(message)

