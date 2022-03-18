from pydantic import BaseModel


class UserBatch(BaseModel):
    user_ids: list[int]
