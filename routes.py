from tornado.web import StaticFileHandler
from controllers import *


routes = [
    # static handler
    ("/static/(.*)", StaticFileHandler),

    # authentication
    ("/login", LoginHandler, {"template": "Login.html"}),
    ("/github-oauth", GithubOAuthHandler),
    ("/github-oauth-callback", GithubOAuthCallbackHandler),
    ("/logout", LogoutHandler),
    ("/registration", RegistrationHandler, {"template": "Registration.html"}),

    # handlers
    ("/", BaseHandler, {"template": "Main.html"}),
    ("/teams", BaseHandler, {"template": "Teams.html"}),
    ("/chat", ChatHandler, {"template": "Chat.html"}),
    ("/profile/(?P<user_id>[A-Za-z0-9-]+)", ProfileHandler, {"template": "Profile.html"}),
    ("/profile", ProfileHandler, {"template": "Profile.html"}),

    # Api
    ("/api/v1/users", UsersApi),
    ("/api/v1/user/(?P<user_id>[A-Za-z0-9-]+)", UserApi),
    ("/api/v1/user", UserApi),
    ("/api/v1/search-users", SearchUsersApi),
    ("/api/v1/chats", ChatsApi),
    ("/api/v1/teams", TeamsApi),
    ("/api/v1/conversations", ConversationsApi),

    # websockets
    ("/ws", WebSocketsHandler)
]