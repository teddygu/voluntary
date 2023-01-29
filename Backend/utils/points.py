import numpy as np

class Points:
    def __init__(self, mongo):
        self.mongo = mongo
        self.db = self.mongo.get_db()

    def get_percentile(self, percentile):
        point_data = self.db.users.find({'points': {'$gt': 0}}, {'points': 1})
        points = np.array([user['points'] for user in point_data])
        return np.percentile(points, percentile)

    def get_rank_cutoffs(self, num_ranks):
        cutoffs = [
            self.get_percentile(30),
            self.get_percentile(60),
            self.get_percentile(90)
        ]
        return cutoffs

    def get_point_leaderboard(self):
        point_data = self.db.users.find({'points': {'$gt': 0}}, {'points': 1})
        point_data = sorted(point_data, key=lambda x: x['points'], reverse=True)
        point_data = point_data[:10]
        return point_data