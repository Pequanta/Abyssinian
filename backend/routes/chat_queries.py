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
#the next route will return the list of dm contacts --name and --avatar(for now just the name)
@router.get("/access/groups/all/dms")
async def return_all_dms(request: Request):
    try:
        current_user = "quantap" #this field will be updated with current user finding methods from authentication part
        cont_returned = request.app.mongodb["groups"].find({"group_type":"DM", "members": {"$in": [current_user]}}, {"_id": 0, "chats": 0})
        contain_results = []
        async for item in cont_returned:
             contain_results.append(item)
        return contain_results
    except:
        return HTTPException(status_code=401)
#the next route will return the list of groups --name and --avatar(for now just the name)
@router.get("/access/groups/all/groups")
async def return_all_groups(request: Request):
    try:
        current_user = "quantap" #this field will be updated with current user finding methods from authentication part
        cont_returned = request.app.mongodb.groups.find({"group_type": "GROUP", "members": {"$in": [current_user]}}, {"_id": 0})
        contain_results = []
        async for item in cont_returned:
             contain_results.append(item)
        return contain_results
    except:
        return HTTPException(status_code=401)
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




# @router.post("/create-new-chat/groups/dm/")
# async def create_new_chat(request: Request, chat: str, user_name)