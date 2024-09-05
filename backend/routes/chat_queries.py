from fastapi import APIRouter, Request, HTTPException, Path, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import GroupDataModel, ChatDataModel, GroupBase, DMDataModel
from .helper_tools import formated_time
from datetime import datetime
router = APIRouter()

class SocketRooms:
    def __init__(self):
        self.chat_rooms :  Dict[int, Set(WebSocket)] = {}
    def add_new_room(self, room_id: str, websocket: WebSocket):
        self.chat_rooms[room_id] = {websocket}
    def add_connection_to_room(self, room_id: str, websocket: WebSocket):
        self.chat_rooms[room_id].add(websocket)
    def remove_room(self, room_id):
        self.chat_rooms.pop(room_id)
    def remove_connection(self, room_id, connection):
        if connection in self.chat_rooms[room_id]: self.chat_rooms[room_id].remove(connection)
    def clear_rooms(self):
        self.chat_rooms.clear()
    def get_all_rooms(self):
        return self.chat_rooms
    def get_room(self, room_id: str):
        return self.chat_rooms.get(room_id  )


socketrooms = SocketRooms()

class SocketRoomConnection:
    def __init__(self, websocket:WebSocket , connection_type: str , room_id: str):
        self.connection_type: str = connection_type
        self.room_id: str = room_id
        self.websocket: WebSocket = websocket
    async def add_connection_to_rooms(self):

        if self.room_id not in socketrooms.get_all_rooms():
            await self.websocket.accept()
            socketrooms.add_new_room(self.room_id, self.websocket)
        else: 
            if self.websocket not in socketrooms.get_all_rooms()[self.room_id]: await self.websocket.accept()
            socketrooms.add_connection_to_room(self.room_id, self.websocket)
        print(socketrooms.chat_rooms)
    async def broadcast_new_message(self, message):
        cont_active = socketrooms.get_room(self.room_id).copy()
        for connection in cont_active:
            try:
                await connection.send_json({"message":message})
            except:
                socketrooms.remove_connection(self.room_id, connection) 

@router.websocket("/dm/chat")
async def establish_connection(websocket: WebSocket, room_id: str):
    socket_inst = SocketRoomConnection(websocket, "DM", room_id)
    try:
        while True:
            await socket_inst.add_connection_to_rooms()
            sent_data = await websocket.receive_json()
            new_chat = {"chat_text": sent_data["sent_chat"], "sender_username": sent_data["sender_username"], "sent_time": formated_time(datetime.now())}
            new_chat_db = jsonable_encoder(ChatDataModel(**new_chat))
            if not (await websocket.app.mongodb["groups"].update_one(
                {"_id": room_id}, 
                {"$push" : {"chats": new_chat_db}})):
                    raise HTTPException(status_code=401, detail="task not found")
            return {"message": "inserted successfully"}
            print(sent_data)
            await socket_inst.broadcast_new_message(sent_data)

        print(socketrooms.chat_rooms)
    except WebSocketDisconnect:
        socketrooms.remove_connection(room_id, websocket)

@router.websocket("/group/chat")
async def establish_connection(websocket: WebSocket, room_id: str):
    socket_inst = SocketRoomConnection(websocket, "GROUP", room_id)
    print("hello")
    try:
        while True:
            await socket_inst.add_connection_to_rooms()
            sent_data = await websocket.receive_json()
            print(sent_data)
            new_chat = {"chat_text": sent_data["sent_chat"], "sender_username": sent_data["sender_username"], "sent_time": formated_time(datetime.now())}
            new_chat_db = jsonable_encoder(ChatDataModel(**new_chat))
            if not (await websocket.app.mongodb["groups"].update_one(
                {"_id": room_id}, 
                {"$push" : {"chats": new_chat_db}})):
                    raise HTTPException(status_code=401, detail="task not found")
            return {"message": "inserted successfully"}
            await socket_inst.broadcast_new_message(sent_data)

        print(socketrooms.chat_rooms)
    except WebSocketDisconnect:
        socketrooms.remove_connection(room_id, websocket)
################### only for the debugging purpose #################
@router.get("/access" , description = "access level notification")
async def notify_access():
    return {"message": "chat functionality is accessed"}
@router.post("/create", description="create level notification")
async def notify_create():
     return {"message": "create functionality is accessed"}
####################################################################
#group
@router.get("/access/groups/group/{group_name}")
async def return_group_chat( request: Request, group_name: str):
    if not (group_ := await request.app.mongodb["groups"].find_one({"group_name": group_name})):
        raise HTTPException(status_code=401, detail="group not found")
    return group_["chats"]
#dm
@router.get("/access/groups/dms")   
async def return_dm_chat(request: Request, user_name: str, current_user: str):
    if (cont_returned := await request.app.mongodb["groups"].find_one({"group_type": "DM" , "members": sorted([user_name,current_user])})) != None:
        return cont_returned["chats"]
    raise HTTPException(status_code=404, detail="dm_not_found")
#the next route will return the list of dm contacts --name and --avatar(for now just the name)
@router.get("/access/groups/all/dms")
async def return_all_dms(request: Request, current_user: str):
    try:
        cont_returned = request.app.mongodb["groups"].find({"group_type":"DM", "members": {"$in": [current_user]}}, {"chats": 0})
        contain_results = []
        async for item in cont_returned:
             contain_results.append(item)
        return JSONResponse({"result":contain_results})
    except:
        return HTTPException(status_code=401)
#the next route will return the list of groups --name and --avatar(for now just the name)
@router.get("/access/groups/all/groups")
async def return_all_groups(request: Request, current_user: str):
    try:
        cont_returned = request.app.mongodb.groups.find({"group_type": "GROUP", "members": {"$in": [current_user]}})
        contain_results = []
        async for item in cont_returned:
             contain_results.append(item)
        return contain_results
    except:
        return HTTPException(status_code=401)
#operations to add new data to the existing document elements
#group
@router.post("/add_chat/groups/group/{group_name}" , description="adds a chat to a specified group")
async def add_chat_group(request: Request, chat: str, group_name: str, current_user: str):
    new_chat = {"chat_text": chat, "sender_username": current_user, "sent_time": formated_time(datetime.now())}
    new_chat_db = jsonable_encoder(ChatDataModel(**new_chat))
    if not (await request.app.mongodb["groups"].update_one(
        {"group_name": group_name}, 
        {"$push" : {"chats": new_chat_db}})):
            raise HTTPException(status_code=401, detail="task not found")
    return {"message": "inserted successfully"}
@router.post("/add_chat/groups/dm/{user_name}", description="adds a chat to a dm with a specified user_name")
async def add_chat_dm(request: Request, chat: str, user_name: str, current_user: str):
    new_chat = {"chat_text": chat, "sender_username": user_name, "sent_time": formated_time(datetime.now())}
    new_chat_db = jsonable_encoder(ChatDataModel(**new_chat))
    if not (cont := await request.app.mongodb["groups"].update_one(
        {"members": sorted([user_name, current_user])}, 
        {"$push" : {"chats": new_chat_db}}
        )):
            raise HTTPException(status_code=401, detail="task not found")
    else:
        return {"message": "inserted successfully"}

#creating new document members


#dm
@router.post("/create-new-chat/dm/{user_name}")
async def create_new_chat(request: Request, user_name:str, current_user: str):
    try:
        #checking if the username exists in the database
        if (user_ := await request.app.mongodb["users"].find_one({"user_name":user_name})) is None:
            return {"message":"a user with this user name doesn't exist", "status":"error"}
        #checking if the connection already exists
    
        if (cont_returned := await request.app.mongodb["groups"].find_one({"members": sorted([user_name, current_user])})) == None:
            new_dm = {
                "group_type": "DM",
                "created_time": formated_time(datetime.now()),
                "chats": [],
                "members" : sorted([user_name, current_user]),
                "tags": []
                }
            new_dm_db = jsonable_encoder(DMDataModel(**new_dm))
            await request.app.mongodb["groups"].insert_one(new_dm_db)
            return {"message": "successful", "status": "success"}
        else:
            return {"message": "exists", "status":"error"}

    except:
        raise HTTPException(status_code=401)
    
#group
@router.post("/create-new-chat/group/{group_name}")
async def create_new_chat(request: Request, group_name: str, current_user: str):
    #checking if the group already exists
    try:
        if not (cont_returned := await request.app.mongodb["groups"].find_one({"group_name": group_name})):
            new_group = {
                    "group_type": 'GROUP',
                    "group_name": group_name,
                    "group_size":1,
                    "created_time": formated_time(datetime.now()),
                    "creator": current_user,#This will be updated with the datatype being UserDataModel Rather than str
                    "admins": [current_user],
                    "members": [current_user],
                    "chats": [],
                    "tags": []
            }
            new_group_db = jsonable_encoder(GroupDataModel(**new_group))
            await request.app.mongodb["groups"].insert_one(new_group_db)
            return {"message": "successful", "status": "success"}
        else:
            return {"message": "exists", "status":"error"}
    except:
        raise HTTPException(status_code=401)
@router.get("/access/get-group-id")
async def get_group_id(request: Request , user_name: str, current_user: str):
    try:
        if (cont_returned := await request.app.mongodb["groups"].find_one({"group_type": "DM", "members": sorted([user_name, current_user])})) != None:
            return cont_returned["_id"]
        else:
            return {"message": "exists", "status":"error"}
    except:
        raise HTTPException(status_code=401)