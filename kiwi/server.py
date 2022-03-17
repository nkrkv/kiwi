import records
from fastapi import FastAPI

db = records.Database()
app = FastAPI()

@app.get("/")
async def root():
    return {"doors_url": "/doors/{?skip,limit}"}

@app.get("/doors/")
async def doors(skip: int = 0, limit: int = 10):
    rows = db.query(
        """
        SELECT
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
