from tornado.gen import coroutine
from prepare_db import db
from bson import ObjectId
from datetime import datetime


class Messages:

    @classmethod
    @coroutine
    def insert(cls, data):
        data['_id'] = ObjectId()

        yield db.Messages.insert(data)

        data = cls.to_string(data)

        return data

    @classmethod
    @coroutine
    def get_chat_messages(cls, count, offset, chat_id):
        result = []
        cursor = db.Messages.find({"chat_id": chat_id}).skip(offset).sort([('$natural', -1)]).limit(count)

        while (yield cursor.fetch_next):
            message = cursor.next_object()
            message = cls.to_string(message)
            result.append(message)

        result.reverse()
        return result

    @staticmethod
    def to_string(message):

        message['_id'] = str(message['_id'])
        message['datetime'] = message['datetime'].strftime("%Y-%m-%d %H:%M:%S")

        return message
