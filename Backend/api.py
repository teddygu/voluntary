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

        self
        self.app.route('/api/v1/user/create_account')(self.user_create_account)
        self.app.route('/api/v1/user/login')(self.user_login)

        self.app.route('/api/v1/user/get_data')(self.user_get_data)
        self.app.route('/api/v1/user/add_friend')(self.user_add_friend)
        self.app.route('/api/v1/user/remove_friend')(self.user_remove_friend)

        self.app.route('/api/v1/event/get_nearby')(self.event_get_nearby)
        self.app.route('/api/v1/event/join')(self.event_join)
        self.app.route('/api/v1/event/leave')(self.event_leave)
        
    def user_check_username_availability(self):
        username = request.json.get('username')
        is_available = self.mongo.is_username_available(username)
        return jsonify({'availability': is_available})

    def user_create_account(self):
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')
        success, error = self.mongo.create_account(username, email, password)
        return jsonify({'success': success, 'error': error})

    def user_login(self):
        username = request.json.get('username')
        password = request.json.get('password')
        success, error = self.mongo.login(username, password)
        if success:
            session['username'] = username
        return jsonify({'success': success, 'error': error})

    def user_get_data(self):
        if 'username' not in session:
            abort(401)
        username = session['username']
        data = self.mongo.get_user_data(username)
        returned_data = {
            'username': data['username'],
            'email': data['email'],
            'points': data['points'],
            'event_data': data['event_data'],
            'friends': data['friends']
        }
        return jsonify(data)

    def user_add_friend(self):
        friend_username = request.json.get('friend_username')
        if 'username' not in session:
            abort(401)
        username = session['username']
        success, error = self.mongo.add_friend(username, friend_username)
        return jsonify({'success': success, 'error': error})

    def user_remove_friend(self):
        friend_username = request.json.get('friend_username')
        if 'username' not in session:
            abort(401)
        username = session['username']
        success, error = self.mongo.remove_friend(username, friend_username)
        return jsonify({'success': success, 'error': error})

    def event_get_nearby(self):
        latitude = request.json.get('latitude')
        longitude = request.json.get('longitude')
        if 'username' not in session:
            abort(401)
        username = session['username']
        data = self.mongo.get_events(latitude, longitude)
        return jsonify(data)

    def event_join(self):
        latitude = float(request.json.get('latitude'))
        longitude = float(request.json.get('longitude'))
        event_id = request.json.get('event_id')
        if 'username' not in session:
            abort(401)
        username = session['username']
        success, error = self.mongo.join_event(username, event_id, latitude, longitude)
        return jsonify({'success': success, 'error': error})

    def event_leave(self):
        event_id = request.json.get('event_id')
        if 'username' not in session:
            abort(401)
        username = session['username']
        success, error = self.mongo.leave_event(username, event_id)
        return jsonify({'success': success, 'error': error})

    def start_server(self):
        self.app.run(host='0.0.0.0', port=80, debug=False, threaded=True)