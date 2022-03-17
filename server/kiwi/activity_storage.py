import redis

class Storage:
    def __init__(self, db=None):
        self.db = db or redis.Redis()

    def read(self, sensor_uuid):
        values = self.db.mget([
            "last_communication_ts:" + sensor_uuid,
            "last_opening_ts:" + sensor_uuid,
        ])

        return {
            "last_communication": values[0],
            "last_opening_ts": values[1],
        }
