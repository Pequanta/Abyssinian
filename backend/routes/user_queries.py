from fastapi import HTTPException, APIRouter, Request
from models import UserDB, GroupBase


router = APIRouter()
#access queries

#--> single user data

@router.get("/access/single_user/{user_name}" , description="single user information using username")
async def return_user_data(user_name: str, request: Request):
    if not (user_ := await request.app.mongodb["users"].find_one({"username":user_name}, {"_id":0})):
        raise HTTPException(status_code=404, details=f"User name {user_name} was not found")
    return user_

#--> All users data
@router.get("/access/all_users", description="returns all users data")
async def return_all_users(request: Request, group_name: str):
    try:
        users_collection = {}
        cont_returned = await request.app.mongodb["users"].find()
        async for item in cont_returned:
            users_collection.append(item)
        return users_collection
    except:
        raise HTTPException(status_code=401)
#--> group data
@router.get("/access/group_data", description="returns the group data")
async def return_group_information(request: Request, group_name: str):
    try:
        cont_information = await request.app.mongodb["groups"].find_one({"group_name": group_name}, {"chats": 0 ,"_id": 0})
        return cont_information
    except:
        raise HTTPException(status_code=404)

#create queries 
#group
@router.post("/create/group/")
async def create_new_group(request: Request, group_name: str, ):
    try:
        group_data = {
            "group_type": "GROUP", 
            "group_name": group_name,
            "created_time": "13:01:01",
            "admins": ["quantap"],
            "members": ["quantap"],
            "chats": []
        }
        await request.app.mongodb["groups"].insert_one(group_data)
    except: 
        raise HTTPException(status_code=501)
#new user joining a group
@router.post("/create/group/new_user")
async def joining_user(request: Request, group_name: str, user_name: str):
    try:
        await request.app.mongodb["groups"].update_one({"group_name": group_name},
                                                       {"$push": {"members": user_name}}
                                                       )
    except:
        raise HTTPException(status_code=501)
#assigning new admin to a group
async def admin_granting(request: Request, group_name: str, user_name: str):
    try:
        await request.app.mongodb["groups"].update_one({"group_name": group_name}, 
                                                       {"$push": {"admins": user_name}}
                                                       )
    except:
        raise HTTPException(status_code=501)

#single user
@router.post("/create/user")

async def create_new_user(request: Request, user_name: str, password: str):
    try:
        user_data = {
            "user_name": user_name,
            "password":password,
            "role": "user"
        }
        await request.app.mongodb["users"].insert_one(user_data)
    except: 
        raise HTTPException(status_code=501)


