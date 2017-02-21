from tornado.gen import coroutine
from tornado.web import RequestHandler, asynchronous
from controllers.decorators import is_authenticated
from models import Teams
from json import dumps


class TeamsApi(RequestHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def get(self):
        teams = yield Teams.get_users_teams(self.current_user['_id'])
        self.write(dumps(teams))
