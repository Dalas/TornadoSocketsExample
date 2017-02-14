from tornado.web import RequestHandler


class BaseHandler(RequestHandler):

    def initialize(self, template):
        self.template = template
        self.db = self.settings['db']

    def get(self):
        self.render(self.template)
