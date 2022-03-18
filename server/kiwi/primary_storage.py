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
              addresses.country_code,
              addresses.geolocation[1] as longitude,
              addresses.geolocation[0] as latitude
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

    def read_users(self, skip: int, limit: int, query: str):
        if not query:
            where_clause = ""
        else:
            where_clause = """
                WHERE
                  users.first_name ILIKE :pattern OR
                  users.last_name ILIKE :pattern
                """

        sql = "\n".join(
            [
                """
                SELECT
                  users.id,
                  users.first_name,
                  users.last_name
                FROM users
                """,
                where_clause,
                """
                LIMIT :limit
                OFFSET :offset
                """,
            ]
        )

        return self.db.query(
            sql, offset=skip, limit=limit, pattern=query + "%"
        ).as_dict()
