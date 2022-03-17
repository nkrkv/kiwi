import records
from fastapi import FastAPI
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
    return {"doors_url": "/doors/{?skip,limit}"}

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
