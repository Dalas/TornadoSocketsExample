from tornado.web import RequestHandler, asynchronous
from tornado.gen import coroutine
from controllers.decorators import is_authenticated
from models import Users
from json import dumps
from bson import ObjectId


class UserApi(RequestHandler):


    @is_authenticated
    @asynchronous
    @coroutine
    def get(self, user_id=None):
        if not user_id:
            user = self.current_user
        else:
            user = yield Users.find_one({'_id': ObjectId(user_id)})

        self.write(dumps(user))
