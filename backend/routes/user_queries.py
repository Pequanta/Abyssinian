from fastapi import HTTPException, APIRouter, Request
from models import UserDB, GroupBase


router = APIRouter()
#queries regarding users

#--> single user data


@router.get("/{user_name}" , description="single user information using username")
async def return_user_data(user_name: str, request: Request):
    if (user_ := await request.app.mongodb["users"].find_one({"username":user_name}, {"_id":0})) is not None:
        return UserDB(**user_)
    raise HTTPException(status_code=404, details=f"User name {user_name} was not found")


#--> group users list
@router.post("/{room_number}", description="returns information about the given group")
@router.get("/{room_number}/members", description="returns the list of users in a given group")
async def return_group_members(room_number: str, request: Request):
    if(cont_room := await request.app.mongodb["users"].find({"groups": {"$in": room_number}})):
        return {UserDB(**user) for user in cont_room}
#--> all users list
@router.post("/allusers", description="returns the list of users in the website")
async def return_group_list(request: Request):
    return {"message": "all_users_data"}

#