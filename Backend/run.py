from api import API
from event_point_scaling import EventPointScaling
from utils.mongo import Mongo
from utils.points import Points

import threading

mongo = Mongo()
points = Points(mongo)
api = API(mongo, points)
eps = EventPointScaling(mongo)

def start_webserver():
    api.start_server()

threading.Thread(target=start_webserver).start()