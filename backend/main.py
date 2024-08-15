from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn
from routes.chat_queries import router as chat_router
from routes.user_queries import router as user_router
DB_URL = config('DB_URL', str)
DB_NAME= config('DB_NAME', str)

origins = [
    "http://localhost",
    "http://localhost:5174"
]
def lifespan(app: FastAPI):
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]
    yield
    app.mongodb.client.close()

app = FastAPI(lifespan=lifespan)
app.include_router(chat_router, prefix="/chats", tags=["chats"])
app.include_router(user_router, prefix="/users", tags=["users"])
app.add_middleware(
    CORSMiddleware, 
    allow_origins = origins, 
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
if __name__=="__main__":
    uvicorn.run(
        "main:app",
        reload=True,
        port=8002
    )