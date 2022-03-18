import os
import records
import kiwi.primary_storage
import kiwi.activity_storage

from kiwi import models
from fastapi import FastAPI, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware

primary_storage = kiwi.primary_storage.Storage()
activity_storage = kiwi.activity_storage.Storage.from_url(
    os.environ.get("REDIS_URL") or "redis://localhost:6379/0"
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Total-Count"],
)


@app.get("/")
async def root():
    return {
        "doors_url": "/doors/{?skip,limit}",
        "door_url": "/doors/{door_id}/",
        "door_permissions_url": "/doors/{door_id}/permissions/",
        "users_url": "/users/{?skip,limit,q}/",
    }


@app.get("/doors/")
async def doors(response: Response, skip: int = 0, limit: int = 10):
    doors = primary_storage.read_doors(skip=skip, limit=limit)
    sensor_uuids = [door["sensor_uuid"] for door in doors]
    last_comms = activity_storage.bulk_read_last_communication(sensor_uuids)
    # There’s no clear consensus on how the total record count should be
    # reported. Using a custom header is one possible way to solve the problem
    response.headers["X-Total-Count"] = str(primary_storage.read_door_count())
    return [
        door | {"activity": {"last_communication_ts": last_comm}}
        for (door, last_comm) in zip(doors, last_comms)
    ]


@app.get("/doors/{door_id}/")
async def door(door_id: int):
    door = primary_storage.read_door(door_id)

    if not door:
        raise HTTPException(status_code=404, detail="Door not found")

    # Assuming a particular door is accessed by at most 100-200 people,
    # it is OK to just list them all in the response without the need
    # for a separate API call, pagination, etc.
    users = primary_storage.read_authorized_users(door_id)
    activity = activity_storage.read(door["sensor_uuid"])
    return door | {
        "activity": activity,
        "authorized_users": users,
    }


@app.put("/doors/{door_id}/permissions/")
async def grant_door_permissions(door_id: int, user_batch: models.UserBatch):
    primary_storage.grant_door_permissions(door_id, [id for id in user_batch.user_ids])
    return primary_storage.read_authorized_users(door_id)


@app.get("/users/")
async def users(response: Response, skip: int = 0, limit: int = 10, q: str = ""):
    return primary_storage.read_users(skip=skip, limit=limit, query=q)
