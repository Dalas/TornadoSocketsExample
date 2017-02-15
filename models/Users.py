from tornado.gen import coroutine
from bson import ObjectId
from prepare_db import db
from .Sessions import Sessions


class Users:

    @staticmethod
    @coroutine
    def insert(data):
        data['_id'] = ObjectId()

        user_id = yield db.Users.insert_one(data)
        return user_id

    @staticmethod
    @coroutine
    def find(query):
        users = db.Users.find(query)
        return users

    @staticmethod
    @coroutine
    def find_one(query):
        users = yield db.Users.find_one(query)
        return users

    @staticmethod
    @coroutine
    def find_by_session_token(token):
        session = yield Sessions.find_by_token(token)

        if not session:
            return None

        user = yield db.Users.find_one({'_id': session['user_id']})
        return user
