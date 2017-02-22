from tornado.gen import coroutine
from tornado.web import RequestHandler, asynchronous
from controllers.decorators import is_authenticated
from models import Teams
from json import dumps
from bson import ObjectId


class TeamsApi(RequestHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def get(self, team_id=None):
        teams = yield Teams.get_users_teams(self.current_user['_id'])
        print(teams)
        self.write(dumps(teams))

    @is_authenticated
    @asynchronous
    @coroutine
    def post(self):
        team = yield Teams.insert({
            "owner": self.current_user['_id'],
            "members": [
                {
                    "_id": ObjectId(self.current_user['_id']),
                    "username": self.current_user['username'],
                    "email": self.current_user['email'],
                    "status": "OWNER"
                }
            ],
            "title": "My New Team"
        })
        self.write(dumps(team))
