from fastapi import APIRouter, Request, HTTPException, Path
from models import GroupDB, ChatDB, GroupBase

router = APIRouter()

@router.get("/chats" , description = "access level notification")
def notify_access():
    return {"message": "chat functionality is accessed"}
#access operations

#group
@router.get("/chats/group/{group_name}")
async def return_group_chat(group_name: str, request: Request):
    if not (group_ := await request.app.mongodb["groupChats"].find_one({"group_name": group_name}, {"_id": 0})):
        raise HTTPException(status_code=401, detail="group not found")
    else:
        return group_
#dm
@router.get("/chats/dm/{user_name}")
async def return_dm_chat(request: Request, user_name: str=Path(...)):
    if not (user_chat_ := await request.app.mongodb["dmChats"].find_one({"user_name": user_name}, {"_id": 0})):
        raise HTTPException(status_code=401, detail= "user not found")
    else:
        return user_chat_


#create operations

#group
@router.post("/chats/group/", description="adds a chat to a specified group")
async def add_chat(request: Request, chat: ChatDB, group_name: str=Path(...)):
        try:
             added_chat = request.app.mongodb["chats.groupChats"].find_one({"group_name": group_name}, {"_id": 0})
             return  added_chat
        except:
             raise HTTPException(status_code=401, detail="group is not found")