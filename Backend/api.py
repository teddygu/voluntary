from flask import Flask, jsonify, request, abort, session
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
from datetime import timedelta

class API:
    def __init__(self, mongo, auth):
        self.mongo = mongo
        self.auth = auth

        self.app = Flask(__name__)
        self.app.config['SECRET_KEY'] = '05c305798441e57c5d599f7f2a0b0bf1'
        self.app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)
        CORS(
            self.app,
            supports_credentials=True
        )
        self.app.wsgi_app = ProxyFix(self.app.wsgi_app)

        self.app.route('/api/v1/some_endpoint')(self.some_endpoint)

    def some_endpoint(self):
        return jsonify({'some': 'data'})

    def start_server(self):
        self.app.run(host='0.0.0.0', port=80, debug=False, threaded=True)