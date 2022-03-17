import records
import kiwi.primary_storage

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

primary_storage = kiwi.primary_storage.Storage()
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
    return primary_storage.read_doors(skip=skip, limit=limit)


@app.get("/doors/{door_id}/")
async def doors(door_id: int):
    door = primary_storage.read_door(door_id)

    if not door:
        raise HTTPException(status_code=404, detail="Door not found")

    # Assuming a particular door is accessed by at most 100-200 people,
    # it is OK to just list them all in the response without the need
    # for a separate API call, pagination, etc.
    users = primary_storage.read_authorized_users(door_id)
    return door | {"authorized_users": users}
