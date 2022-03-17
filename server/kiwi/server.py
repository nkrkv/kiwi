import records
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

db = records.Database()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "doors_url": "/doors/{?skip,limit}",
        "door_url": "/doors/{door_id}/",
    }


@app.get("/doors/")
async def doors(skip: int = 0, limit: int = 10):
    rows = db.query(
        """
        SELECT
          doors.id,
          doors.name,
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
    )

    return rows.as_dict()


@app.get("/doors/{door_id}/")
async def doors(door_id: int):
    door_row = db.query(
        """
        SELECT
          doors.id,
          doors.name,
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

    if not door_row:
        raise HTTPException(status_code=404, detail="Door not found")

    # Assuming a particular door is accessed by at most 100-200 people,
    # it is OK to just list them all in the response without the need
    # for a separate API call, pagination, etc.
    user_rows = db.query(
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
    )

    return door_row.as_dict() | {"authorized_users": user_rows.as_dict()}
