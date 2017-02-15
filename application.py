from tornado.web import Application
from tornado.ioloop import IOLoop
from routes import routes
from prepare_db import db
from controllers.sockets import WebSocketsPool
import os


def create_application():
    settings = {
        'template_path': os.path.join(os.path.dirname(__file__), "templates"),
        'static_path': os.path.join(os.path.dirname(__file__), "static"),
        'debug': True,
        'autoreload': True,
        'compiled_template_cache': False,
        'static_hash_cache': False,
        'db': db,
        'wsp': WebSocketsPool(),
        'cookie_secret': "8fb911c9-0885-4dbf-bedd-921a2b67af08-23a801ee-8556-4f97-8a2b-20916fa92caa"
    }
    return Application(routes, **settings)


if __name__ == '__main__':

    application = create_application()
    application.listen(8888)

    IOLoop.current().start()
