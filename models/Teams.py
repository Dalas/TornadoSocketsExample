from prepare_db import db
from tornado.gen import coroutine
from bson import ObjectId


class Teams:

    @staticmethod
    @coroutine
    def insert(data):
        data['_id'] = ObjectId()

        yield db.Teams.insert(data)

        data['_id'] = str(data['_id'])
        return data

    @staticmethod
    @coroutine
    def get_users_teams(user_id):
        result = []
        cursor = db.Teams.find({
            '$or': [
                {'owner': user_id, },
                {'members': {'$elemMatch': {'$eq': user_id}}}
            ]
        })

        while (yield cursor.fetch_next):
            team = cursor.next_object()
            team['_id'] = str(team['_id'])

            result.append(team)

        return result
