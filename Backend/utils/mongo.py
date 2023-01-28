from pymongo import MongoClient

class Mongo:
    def __init__(self):
        mongo_url = 'mongodb+srv://minnehack2023:<password>@cluster0.jacnljd.mongodb.net/?retryWrites=true&w=majority'
        client = MongoClient(mongo_url)
        self.db = client.minnehack2023