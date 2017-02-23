from tornado.gen import coroutine
from tornado.web import RequestHandler, asynchronous
from controllers.decorators import is_authenticated
from models import Users
from json import dumps, loads
from bson import ObjectId


class SearchUsersApi(RequestHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def post(self):
        search_string = loads(self.request.body.decode("utf-8"))['search_string']

        # refactor search. It's really bad!
        users = yield Users.find({
            "username": {"$regex": ".*({0}).*".format(search_string)}
        })

        self.write(dumps(users))
