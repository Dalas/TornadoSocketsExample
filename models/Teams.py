from prepare_db import db
from tornado.gen import coroutine
from bson import ObjectId


class Teams:

    @classmethod
    @coroutine
    def insert(cls, data):
        data['_id'] = ObjectId()

        yield db.Teams.insert(data)

        return cls.serialize(data)

    @classmethod
    @coroutine
    def get_users_teams(cls, user_id):
        result = []
        cursor = db.Teams.find({
            '$or': [
                {'owner': user_id, },
                {"members._id": ObjectId(user_id)}
            ]
        })

        while (yield cursor.fetch_next):
            team = cursor.next_object()

            result.append(cls.serialize(team))

        return result

    @staticmethod
    def serialize(team):
        team["_id"] = str(team["_id"])
        for member in team['members']:
            member["_id"] = str(member["_id"])

        return team
