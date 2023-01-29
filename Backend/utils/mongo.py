from pymongo import MongoClient
from passlib.hash import argon2
from haversine import haversine
import time

class Mongo:
    def __init__(self):
        mongo_url = 'mongodb+srv://minnehack2023:<password>@cluster0.jacnljd.mongodb.net/?retryWrites=true&w=majority'
        client = MongoClient(mongo_url)
        self.db = client.minnehack2023

    def get_user_data(self, username):
        return self.db.users.find_one({'_id': username})

    def is_username_available(self, username):
        return self.get_user_data(username) is None

    def create_account(self, username, password):
        if self.is_username_available(username):
            success = self.db.users.update({'_id': username}, {'$set': {
                'password_hash': argon2.hash(password + username),
                'points': 0,
                'event_data': {
                    'current_event_data': {},
                    'event_history': [],
                    'last_event_ts': 0
                },
                'friends': [],
                'organization_id': None,
                'role': 'user',
                'join_ts': int(time.time())
            }}, upsert=True)
            if success:
                return True, None
            return False, 'An unknown error occurred, try again later'
        else:
            return False, 'Username taken'

    def login(self, username, password):
        user_data = self.get_user_data(username)
        if user_data is None:
            return False, 'Incorrect username or password'
        if not argon2.verify(password + username, user_data['password_hash']):
            return False, 'Incorrect username or password'
        return True, None

    def add_friend(self, username, friend_username):
        user_data = self.get_user_data(username)
        friend_data = self.get_user_data(friend_username)
        if user_data is None or friend_data is None:
            return False, 'User not found'
        if friend_username not in user_data['friends']:
            success = self.db.users.update({'_id': username}, {'$push': {'friends': friend_username}})
            if success:
                return True, None
        else:
            return False, 'User is already a friend'
        return False, 'An unknown error occurred, try again later'

    def remove_friend(self, username, friend_username):
        user_data = self.get_user_data(username)
        friend_data = self.get_user_data(friend_username)
        if user_data is None or friend_data is None:
            return False, 'User not found'
        if friend_username in user_data['friends']:
            success = self.db.users.update({'_id': username}, {'$pull': {'friends': friend_username}})
            if success:
                return True, None
        else:
            return False, 'User is not a friend'
        return False, 'An unknown error occurred, try again later'

    def get_organization_data(self, organization_id):
        return self.db.organizations.find_one({'_id': organization_id})

    def create_organization(self, name, description):
        success = self.db.events.insert_one({
            'events': [],
            'members': [],
            'organization_details': {
                'name': name,
                'description': description
            }
        })
        if success:
            return True, None
        return False, 'An unknown error occurred, try again later'

    def join_organization(self, username, organization_id):
        user_data = self.get_user_data(username)
        organization_data = self.get_organization_data(organization_id)
        if user_data is None or organization_data is None:
            return False, 'User or organization not found'
        if user_data['organization_id'] is None:
            user_success = self.db.users.update({'_id': username}, {'$set': {'organization_id': organization_id}})
            organization_success = self.db.organizations.update({'_id': organization_id}, {'$push': {'members': username}})
            if user_success and organization_success:
                return True, None
        else:
            return False, 'User is already in an organization'
        return False, 'An unknown error occurred, try again later'

    def leave_organization(self, username, organization_id):
        user_data = self.get_user_data(username)
        organization_data = self.get_organization_data(organization_id)
        if user_data is None or organization_data is None:
            return False, 'User or organization not found'
        if user_data['organization_id'] == organization_id:
            user_success = self.db.users.update({'_id': username}, {'$set': {'organization_id': organization_id}})
            organization_success = self.db.organizations.update({'_id': organization_id}, {'$pull': {'members': username}})
            if user_success and organization_success:
                return True, None
        else:
            return False, 'User is not in the organization'
        return False, 'An unknown error occurred, try again later'

    def delete_organization(self, organization_id):
        organization_data = self.get_organization_data(organization_id)
        if organization_data is None:
            return False, 'Organization not found'
        success = self.db.organizations.delete_one({'_id': organization_id})
        if success:
            return True, None
        return False, 'An unknown error occurred, try again later'

    def get_event_data(self, event_id):
        return self.db.events.find_one({'_id': event_id})

    def get_events(self, latitude, longitude, radius=10):
        pass

    def create_event(self, latitude, longitude, organization_id, name, description, category, start_time_ts=None, end_time_ts=None):
        success = self.db.events.insert_one({
            'latitude': latitude,
            'longitude': longitude,
            'organization_id': organization_id,
            'event_details': {
                'name': name,
                'description': description,
                'category': category,
                'start_time_ts': start_time_ts,
                'end_time_ts': end_time_ts
            },
            'current_participants': []
        })
        if success:
            return True, None
        return False, 'An unknown error occurred, try again later'

    def join_event(self, username, event_id, latitude, longitude):
        user_data = self.get_user_data(username)
        event_data = self.get_event_data(event_id)
        if user_data is None or event_data is None:
            return False, 'User or event not found'
        if haversine((latitude, longitude), (event_data['latitude'], event_data['longitude'])) > 1:
            return False, 'Get closer to the event'
        if len(user_data['event_data']['current_event_data']) == 0:
            user_success = self.db.users.update({'_id': username}, {'$set': {'event_data.current_event_data': {
                'event_id': event_id, 
                'start_ts': int(time.time())
            }}})
            event_success = self.db.events.update({'_id': event_id}, {'$push': {'current_participants': username}})
            if user_success and event_success:
                return True, None
        else:
            return False, 'You are already in an event'
        return False, 'An unknown error occurred, try again later'

    def leave_event(self, username, event_id):
        user_data = self.get_user_data(username)
        event_data = self.get_event_data(event_id)
        if user_data is None or event_data is None:
            return False, 'User or event not found'
        if user_data['event_data']['current_event_data'].get('event_id') == event_id:
            user_success = self.db.users.update({'_id': username}, {'$set': {'event_data.current_event_data': {}}})
            event_success = self.db.events.update({'_id': event_id}, {'$pull': {'current_participants': username}})
            if user_success and event_success:
                return True, None
        else:
            return False, 'You are not in any event'
        return False, 'An unknown error occurred, try again later'

    def delete_event(self, event_id):
        event_data = self.get_event_data(event_id)
        if event_data is None:
            return False, 'Event not found'
        success = self.db.events.remove({'_id': event_id})