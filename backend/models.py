from bson import ObjectId
from enum import Enum
from pydantic import BaseModel, Field
from typing import List
class PyObjectId(ObjectId):
        @classmethod
        def __get_validators__(cls):
                yield cls.validate
        @classmethod
        def validate(cls, v):
                if not ObjectId.is_valid(v):
                        raise ValueError("Invalid objectid")
                return ObjectId(v)
        @classmethod
        def __modify_schema(cls, field_schema):
                field_schema.update(type="string")
class MongoBaseModel(BaseModel):
        id: PyObjectId = Field(default_factory=PyObjectId , alias="_id")
        class Config:
                json_encoders = {ObjectId: str}
class UserBase(MongoBaseModel):
        user_name: str=Field(...)
class UserDB(UserBase):
        password: str
class LogInBase(BaseModel):
        user_name: str = Field(...)
        password: str = Field(...)
class ChatBase(MongoBaseModel):
        chat_text: str=Field(...)
        sender_username: str=Field(...)
        sent_time: str=Field(...)
class ChatDataModel(ChatBase):
        pass
class DirectMBase(MongoBaseModel):
        dm_user: UserDB=Field(...)
class GroupBase(MongoBaseModel):
        group_type: str=Field(...)
        group_name: str=Field(...)
        group_size: int=Field(...)
        created_time: str=Field(...)
        creator: str=Field(...)
        admins: List[str]
        members: List[str]
        chats: List[str]
        tags: List[str]
class GroupDataModel(GroupBase):
        pass
class DMBase(MongoBaseModel):
        group_type: str=Field(...)
        created_time : str=Field(...)
        members: List[str]
        chats: List[str]
        tags: List[str]

class DMDataModel(DMBase):
        pass
class Token(BaseModel):
    access_token: str
    token_type: str
class TokenData(BaseModel):
    username: str | None = None
