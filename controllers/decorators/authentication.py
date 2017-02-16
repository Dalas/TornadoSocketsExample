from models import Users
from tornado.gen import coroutine


def is_authenticated(method):

    @coroutine
    def wrapper(self, *args, **kwargs):
        token = self.get_secure_cookie('token')

        if not token:
            return self.redirect('/login')

        self.current_user = yield Users.find_by_session_token(token.decode('utf-8'))

        if not self.current_user:
            return self.redirect('/login')
        return method(self, *args, **kwargs)

    return wrapper
