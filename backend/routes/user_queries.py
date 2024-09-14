from fastapi import HTTPException, APIRouter, Request, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import UserDB, GroupBase, LogInBase
from .auth import Authentication



router = APIRouter()
auth = Authentication()
#access queries

#--> single user data

@router.get("/access/single-user/" , description="single user information using username")
async def return_user_data(user_name: str, request: Request):
    if not (user_ := await request.app.mongodb["users"].find_one({"user_name":user_name}, {"_id":0, "password": 0})):
        raise HTTPException(status_code=404, detail=f"User name {user_name} was not found")
    return user_

#--> All users data
@router.get("/access/all-users", description="returns all users data")
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
@router.get("/access/group-data", description="returns the group data")
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
@router.post("/create/group/new-user")
async def joining_user(request: Request, group_name: str, user_name: str):
    print("here")
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
@router.post("/create/user/")
async def create_new_user(request: Request, new_user: UserDB = Body(...)):
    print('even before entering')
    try:
        user_password = auth.get_password_hash(new_user.password)
        new_user = jsonable_encoder(new_user)
        new_user["password"] = user_password
        if (await request.app.mongodb["users"].find_one({"user_name":new_user["user_name"]})):
                raise HTTPException(status_code=409, detail="username already exists")
        await request.app.mongodb["users"].insert_one(new_user)
    except: 
        raise HTTPException(status_code=501)


#login request
@router.post("/access/user/login")
async def log_in_request(request: Request , user : LogInBase = Body(...)):
    try:
        user = jsonable_encoder(user)
        cont_user = await request.app.mongodb["users"].find_one({"user_name": user["user_name"]}, {"user_previlage": 0})
        if (cont_user != None) and (auth.verify_password(user["password"], cont_user["password"])):
            data_to_encode = {'sub': cont_user["_id"]}
            token = auth.create_access_token(data_to_encode)
            return JSONResponse(content={"token":token, "message": "found"})
        else:
            return {"message":"incorrect credential"}
    except:
        raise HTTPException(status_code=401)


#current_active_user

@router.get("/access/user/current-user")
async def current_active_user(request: Request, token: str):
    cont_data = auth.decode_token(token)
    user_id = cont_data["sub"]
    if (cont_returned := await request.app.mongodb["users"].find_one({"_id": user_id})) != None:
        return cont_returned["user_name"]
    else:
        raise HTTPException(status_code=401, detail="Invalid User")
