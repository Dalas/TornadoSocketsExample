from tornado.web import RequestHandler, asynchronous
from tornado.gen import coroutine
from controllers.decorators import is_authenticated
from models import Users
from json import dumps


class UsersApi(RequestHandler):


    @is_authenticated
    @asynchronous
    @coroutine
    def get(self):
        users = yield Users.get_users(10, 1, self.current_user['_id'])
        self.write(dumps(users))
