from api import API
from event_point_scaling import EventPointScaling
from utils.mongo import Mongo
from utils.auth import Auth

import threading

mongo = Mongo()
auth = Auth(mongo)
api = API(mongo, auth)
eps = EventPointScaling(mongo)

def start_webserver():
    api.start_server()

threading.Thread(target=start_webserver).start()