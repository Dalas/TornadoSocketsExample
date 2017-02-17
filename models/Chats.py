from tornado.gen import coroutine
from bson import ObjectId
from prepare_db import db


class Chats:

    @staticmethod
    @coroutine
    def insert(data):
        data['_id'] = ObjectId()
        yield db.Chats.insert(data)

        return data

    @staticmethod
    @coroutine
    def get_chat_by_id(chat_id):
        chat = yield db.Chats.get(chat_id)

        return chat

    @staticmethod
    @coroutine
    def get_chat_by_members(members):
        chat = yield db.Chats.find_one({'conversation': False, 'members': {'$all': members}})

        return chat

    @staticmethod
    @coroutine
    def get_all_users_conversations(user_id):
        result = []
        cursor = db.Chats.find(
            {
                'conversation': True,
                '$or': [
                    {'owner': user_id, },
                    {'members': {'$elemMatch': {'$eq': user_id}}}
                ]
            }
        )

        while (yield cursor.fetch_next):
            chat = cursor.next_object()
            chat['_id'] = str(chat['_id'])
            result.append(chat)

        return result
