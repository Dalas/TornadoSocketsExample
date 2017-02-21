from tornado.gen import coroutine
from controllers.decorators import is_authenticated
from tornado.web import RequestHandler, asynchronous
from models import Sessions


class LogoutHandler(RequestHandler):

    @is_authenticated
    @asynchronous
    @coroutine
    def get(self):
        yield Sessions.update_or_create(self.current_user['_id'])
        self.clear_cookie('token')

        self.redirect('/')
