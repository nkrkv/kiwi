import records
from fastapi import FastAPI

db = records.Database()
app = FastAPI()

@app.get("/")
async def root():
    rows = db.query("SELECT * FROM doors")
    return rows.as_dict()
