from flask import Flask, jsonify, request, abort, session
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
from datetime import timedelta

class API:
    def __init__(self, mongo, points):
        self.mongo = mongo
        self.points = points

        self.app = Flask(__name__)
        self.app.config['SECRET_KEY'] = '05c305798441e57c5d599f7f2a0b0bf1'
        self.app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=30)
        CORS(
            self.app,
            supports_credentials=True
        )
        self.app.wsgi_app = ProxyFix(self.app.wsgi_app)

        self.app.route('/')(self.index)

        self.app.route('/api/v1/user/check_username_availability', methods=['POST'])(self.user_check_username_availability)
        self.app.route('/api/v1/user/create_account', methods=['POST'])(self.user_create_account)
        self.app.route('/api/v1/user/login', methods=['POST'])(self.user_login)

        self.app.route('/api/v1/user/login_dummy', methods=['POST'])(self.user_login_dummy)

        self.app.route('/api/v1/user/get_data', methods=['GET'])(self.user_get_data)
        self.app.route('/api/v1/user/add_friend', methods=['POST'])(self.user_add_friend)
        self.app.route('/api/v1/user/remove_friend', methods=['POST'])(self.user_remove_friend)

        self.app.route('/api/v1/event/get_nearby', methods=['POST'])(self.event_get_nearby)
        self.app.route('/api/v1/event/get_info', methods=['POST'])(self.event_get_info)
        self.app.route('/api/v1/event/join', methods=['POST'])(self.event_join)
        self.app.route('/api/v1/event/leave', methods=['POST'])(self.event_leave)

        self.app.route('/api/v1/stats/leaderboard', methods=['GET'])(self.stats_leaderboard)
        self.app.route('/api/v1/stats/ranks', methods=['GET'])(self.stats_rank_cutoffs)


    def index(self):
        return 'Hi'

    def user_check_username_availability(self):
        username = request.json.get('username')
        is_available = self.mongo.is_username_available(username)
        return jsonify({'availability': is_available})

    def user_create_account(self):
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get('email')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')
        success, error = self.mongo.create_account(username, password, email, first_name, last_name)
        if success:
            session['username'] = username
        return jsonify({'success': success, 'error': error})

    def user_login(self):
        username = request.json.get('username')
        password = request.json.get('password')
        success, error = self.mongo.login(username, password)
        if success:
            session['username'] = username
        return jsonify({'success': success, 'error': error})

    def user_login_dummy(self):
        session['username'] = 'User2'
        return jsonify({'success': True, 'error': ''})

    def user_get_data(self):
        if 'username' not in session:
            abort(401)
        username = session['username']
        data = self.mongo.get_user_data(username)
        returned_data = {
            'username': username,
            'points': data['points'],
            'user_data': data['user_data'],
            'event_data': data['event_data'],
            'friends': data['friends']
        }
        return jsonify(returned_data)

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
        data = self.mongo.get_events(username, latitude, longitude)
        return jsonify(data)

    def event_get_info(self):
        event_id = request.json.get('event_id')
        if 'username' not in session:
            abort(401)
        username = session['username']
        data = self.mongo.get_event_info(event_id)
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

    def stats_leaderboard(self):
        data = self.points.get_point_leaderboard()
        return jsonify(data)

    def stats_rank_cutoffs(self):
        data = self.points.get_rank_cutoffs()
        return jsonify(data)

    def start_server(self):
        self.app.run(host='0.0.0.0', port=8999, debug=False, threaded=True)