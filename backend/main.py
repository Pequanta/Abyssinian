from fastapi import FastAPI
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn

DB_URL = config('DB_URL', str)
DB_NAME= config('DB_NAME', str)


def lifespan(app: FastAPI):
    app.mongodb.client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb.client[DB_NAME]
    yield
    app.mongodb.client.close()

app = FastAPI(lifespan=lifespan)
if __name__=="__main__":
    uvicorn.run(
        "main:app",
        reload=True,
        port=8002
    )