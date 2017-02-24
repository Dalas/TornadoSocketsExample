from tornado.gen import coroutine
from tornado.web import RequestHandler, asynchronous
from controllers.decorators import is_authenticated
from models import Teams
from json import loads, dumps


class InvitesApi(RequestHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def post(self):
        data = loads(self.request.body.decode('utf-8'))

        team = yield Teams.check_member(data['team'], data['member'])

        if not team:
            team = yield Teams.invite_member(data['team'], data['member'])
            self.write(dumps(team))
        else:
            self.set_status(400, "You can add user to team only one time!")
