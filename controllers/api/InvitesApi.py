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

        self.write('ASD')
