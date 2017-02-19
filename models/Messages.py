from tornado.gen import coroutine
from prepare_db import db
from bson import ObjectId


class Messages:

    @staticmethod
    @coroutine
    def insert(data):
        data['_id'] = ObjectId()

        yield db.Messages.insert(data)

        data['_id'] = str(data['_id'])
        return data

    @staticmethod
    @coroutine
    def get_chat_messages(count, offset, chat_id):
        result = []
        cursor = db.Messages.find({"chat_id": chat_id}).limit(count)

        while (yield cursor.fetch_next):
            message = cursor.next_object()
            message['_id'] = str(message['_id'])
            result.append(message)

        return result
