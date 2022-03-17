import records

class Storage:
    def __init__(self, db=None):
        self.db = db or records.Database()

    def read_doors(self, skip: int, limit: int):
        return self.db.query(
            """
            SELECT
              doors.id,
              doors.name,
              doors.sensor_uuid,
              addresses.street,
              addresses.postal_code,
              addresses.city,
              addresses.state,
              addresses.country_code
            FROM doors
            LEFT JOIN addresses
            ON doors.address_id = addresses.id
            ORDER BY doors.id
            LIMIT :limit
            OFFSET :offset
            """,
            offset=skip,
            limit=limit,
        ).as_dict()

    def read_door_count(self):
        return self.db.query("""SELECT COUNT(doors.id) FROM doors""").first()[0]

    def read_door(self, door_id: int):
        row = self.db.query(
            """
            SELECT
              doors.id,
              doors.name,
              doors.sensor_uuid,
              addresses.street,
              addresses.postal_code,
              addresses.city,
              addresses.state,
              addresses.country_code
            FROM doors
            LEFT JOIN addresses
            ON doors.address_id = addresses.id
            WHERE doors.id = :door_id
            """,
            door_id=door_id,
        ).first()

        if row:
            return row.as_dict()
        else:
            return None

    def read_authorized_users(self, door_id: int):
        return self.db.query(
            """
            SELECT
              user_door_permissions.user_id,
              users.email,
              users.first_name,
              users.last_name
            FROM user_door_permissions
            LEFT JOIN users
            ON user_door_permissions.user_id = users.id
            WHERE user_door_permissions.door_id = :door_id
            ORDER BY users.last_name
            """,
            door_id=door_id,
        ).as_dict()
