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
    def get(user_id):
        user = yield db.Users.find_one({'_id': ObjectId(user_id)})
        return user

    @staticmethod
    @coroutine
    def find(query):
        users = db.Users.find(query)
        return users

    @staticmethod
    @coroutine
    def find_one(query):
        user = yield db.Users.find_one(query)
        user['_id'] = str(user['_id'])
        return user

    @staticmethod
    @coroutine
    def find_by_session_token(token):
        session = yield Sessions.find_by_token(token)

        if not session:
            return None

        user = yield db.Users.find_one({'_id': ObjectId(session['user_id'])})

        if not user:
            return None

        user['_id'] = str(user['_id'])
        return user

    @staticmethod
    @coroutine
    def get_users(count, offset, currentUserId):
        result = []
        cursor = db.Users.find({'_id': {'$ne': ObjectId(currentUserId)}}).limit(count)
        while (yield cursor.fetch_next):
            user = cursor.next_object()
            user['_id'] = str(user['_id'])
            result.append(user)

        return result

    @staticmethod
    @coroutine
    def get_users_by_id(users_ids):
        result = []
        ids = []

        for identifier in users_ids:
            ids.append(ObjectId(identifier))

        cursor = db.Users.find({'_id': {'$in': ids}})

        while (yield cursor.fetch_next):
            user = cursor.next_object()
            user['_id'] = str(user['_id'])
            result.append(user)

        return result

    @staticmethod
    @coroutine
    def get_or_create_github_user(data):
        user = yield db.Users.find_one({"github.id": data['github']['id']})

        if not user:
            data['_id'] = ObjectId()

            yield db.Users.insert(data)

            data['_id'] = str(data['_id'])
            return data

        user['_id'] = str(user['_id'])
        return user
