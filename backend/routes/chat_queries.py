from fastapi import APIRouter, Request, HTTPException, Path
from fastapi.encoders import jsonable_encoder
from models import GroupDB, ChatDB, GroupBase

router = APIRouter()

@router.get("/access" , description = "access level notification")
async def notify_access():
    return {"message": "chat functionality is accessed"}
#access operations

@router.post("/create", description="create level notification")
async def notify_create():
     return {"message": "create functionality is accessed"}

#group
@router.get("/access/groups/group/{group_name}")
async def return_group_chat( request: Request, group_name: str):
    if not (group_ := await request.app.mongodb["groups"].find_one({"group_name": group_name}, {"_id": 0})):
        raise HTTPException(status_code=401, detail="group not found")
    return group_["chats"]
#dm
@router.get("/access/groups/dms/{user_name}")
async def return_dm_chat(request: Request, user_name: str):
    try: 
        cont_returned = await request.app.mongodb["groups"].find_one({"admins": [user_name,'peniel']},{"_id": 0})
        return cont_returned["chats"]
    except:
     raise HTTPException(status_code=404, detail="dm_not_found")
#create operations
#group
@router.post("/add_chat/groups/group/{group_name}" , description="adds a chat to a specified group")
async def add_chat_group(request: Request, chat: str, group_name: str):
        
        if not (await request.app.mongodb["groups"].update_one({"group_name": group_name}, 
                                                            {"$push" : {"chats": jsonable_encoder({
                                                                "sender_user_name":"quantap",
                                                                "content": chat, 
                                                                "sent_time": "08: 20: 01"
                                                                }
                                                                )}})):
             raise HTTPException(status_code=401, detail="task not found")
        return {"message": "inserted successfully"}
@router.post("/add_chat/groups/dm/{user_name}", description="adds a chat to a dm with a specified user_name")
async def add_chat_dm(request: Request, chat: str, user_name: str):
        if not (await request.app.mongodb["groups"].update_one({"members": [user_name, 'peniel']}, 
                                                                {"$push" : {"chats": jsonable_encoder({
                                                                    "sender_user_name":"quantap",
                                                                    "content": chat, 
                                                                    "sent_time": "08: 20: 01"
                                                                    }
                                                                    )}})):
             raise HTTPException(status_code=401, detail="task not found")
        return {"message": "inserted successfully"}


