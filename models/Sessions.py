from tornado.gen import coroutine
from bson import ObjectId
from prepare_db import db
from uuid import uuid4


class Sessions:

    @staticmethod
    @coroutine
    def insert(data):
        data['_id'] = ObjectId()
        session_id = yield db.Sessions.insert(data)
        return session_id

    @staticmethod
    @coroutine
    def update_or_create(user_id):
        session = {
            'token': str(uuid4()),
            'user_id': user_id
        }

        yield db.Sessions.update({'user_id': user_id}, session, upsert=True)
        return session

    @staticmethod
    @coroutine
    def find(query):
        data = yield db.Sessions.find(query)
        return data

    @staticmethod
    @coroutine
    def find_by_token(token):
        data = yield db.Sessions.find_one({'token': token})
        return data
