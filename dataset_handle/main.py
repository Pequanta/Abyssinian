from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from motor.motor_asyncio import AsyncIOMotorClient
from github import Github
import uvicorn
from github import Auth
from route.handle_operations import router as route_h


DB_URL = config('DB_URL', str)
DB_NAME= config('DB_NAME', str)
token = config('GITHUB_API_TOKEN', str)

def lifespan(app: FastAPI):
    app.mongodb_client = AsyncIOMotorClient(DB_URL)
    app.mongodb = app.mongodb_client[DB_NAME]


    auth = Auth.Token(token)
    github_api = Github(auth=auth)
    repo = github_api.get_repo("penielQ/AbyssinianDataset")
    app.repo = repo
    yield
    github_api.close()
    app.mongodb.client.close()

app = FastAPI(lifespan=lifespan)
app.include_router(route_h, prefix="/handle", tags=["handle"])


if __name__=="__main__":
    uvicorn.run(
        "main:app",
        reload=True,
        port=8080
    )