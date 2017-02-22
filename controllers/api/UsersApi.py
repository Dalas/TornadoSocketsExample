from tornado.web import RequestHandler, asynchronous
from tornado.gen import coroutine
from controllers.decorators import is_authenticated
from models import Users
from json import dumps, loads


class UsersApi(RequestHandler):


    @is_authenticated
    @asynchronous
    @coroutine
    def get(self):
        users = yield Users.get_users(10, 0, self.current_user['_id'])
        self.write(dumps(users))

    @is_authenticated
    @asynchronous
    @coroutine
    def post(self):
        users_ids = loads(self.request.body.decode('utf-8'))['users_ids']

        users = yield Users.get_users_by_id(users_ids)
        self.write(dumps(users))
