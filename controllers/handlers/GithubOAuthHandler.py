from github import Github
from tornado.gen import coroutine
from tornado.web import RequestHandler
from credentials import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
from models import Users, Sessions
from urllib.request import Request, urlopen
from urllib.parse import urlencode
import json


class GithubOAuthHandler(RequestHandler):

    @coroutine
    def get(self):
        self.redirect("https://github.com/login/oauth/authorize?client_id=" + GITHUB_CLIENT_ID)


class GithubOAuthCallbackHandler(RequestHandler):

    @coroutine
    def get(self):
        url = "https://github.com/login/oauth/access_token"

        data = {
            "client_secret": GITHUB_CLIENT_SECRET,
            "client_id": GITHUB_CLIENT_ID,
            "code": self.get_argument('code')
        }

        headers = {
            "Accept": "application/json",
            "X-OAuth-Scopes": "user",
            "X-Accepted-OAuth-Scopes": "user"
        }

        request = Request(url, urlencode(data).encode('utf-8'), headers)

        with urlopen(request) as response:
            response = json.loads(response.read().decode('utf-8'))

        if 'access_token' not in response:
            self.redirect('/login')

        gh = Github(response['access_token'])
        user = gh.get_user().raw_data

        user = self.prepare_github_data(user)

        user = yield Users.get_or_create_github_user({
            "username": "{0}_{1}".format(user['login'], user['id']),
            "email": user['email'],
            "avatar_url": user['avatar_url'],
            "github": user
        })

        session = yield Sessions.update_or_create(user['_id'])

        self.set_secure_cookie('token', session['token'])
        self.set_secure_cookie('gh_token', response['access_token'])

        self.redirect('/chat')

    def prepare_github_data(self, data):
        return {
            'avatar_url': data['avatar_url'],
            'login': data['login'],
            'full_name': data['name'],
            'email': data['email'],
            'id': data['id'],
            'account_url': data['html_url']
        }
