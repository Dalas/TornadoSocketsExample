from models import Users
import functools


def is_authenticated(method):

    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        token = self.get_secure_cookie('token')

        if not token:
            return self.redirect('/login')

        self.user = yield Users.find_by_session(token.decode('utf-8'))

        if not self.user:
            return self.redirect('/login')

        return method(self, *args, **kwargs)

    return wrapper