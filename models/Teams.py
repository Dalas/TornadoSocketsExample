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
    @coroutine
    def invite_member(team, member):
        new_member = {
            "status": "INVITED",
            "_id": ObjectId(member["_id"]),
            "username": member["username"],
            "email": member["email"]
        }

        yield db.Teams.update({"_id": ObjectId(team["_id"])}, {
            "$addToSet": {
                "members": new_member
            }
        })

        new_member['_id'] = str(new_member['_id'])
        team['members'].append(new_member)

        return team

    @staticmethod
    @coroutine
    def check_member(team, member):
        team = yield db.Teams.find_one({
            '$and': [
                {"_id": ObjectId(team['_id'])},
                {"members._id": ObjectId(member['_id'])}
            ]
        })

        return team

    @staticmethod
    @coroutine
    def check_owner(team, current_user):
        team = yield db.Teams.find_one({
            '$and': [
                {"_id": ObjectId(team['_id'])},
                {"owner": current_user['_id']}
            ]
        })

        return team

    @staticmethod
    def serialize(team):
        team["_id"] = str(team["_id"])
        for member in team['members']:
            member["_id"] = str(member["_id"])

        return team
