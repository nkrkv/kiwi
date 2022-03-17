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
            "last_communication_ts": values[0],
            "last_opening_ts": values[1],
        }

    def bulk_read_last_communication(self, sensor_uuids):
        return self.db.mget([
            "last_communication_ts:" + uuid for uuid in sensor_uuids
        ])
