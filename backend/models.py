from bson import ObjectId
from enum import Enum
from pydantic import BaseModel, Field
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
class ChatDB(ChatBase):
        pass
class DirectMBase(MongoBaseModel):
        dm_user: UserDB=Field(...)
class GroupBase(MongoBaseModel):
        group_name: str=Field(...)
        group_size: int=Field(...)
        created_time: int=Field(...)
        creator: UserDB=Field(...)
        chats: ChatDB=Field(...)

class GroupDB(GroupBase):
        pass
class Token(BaseModel):
    access_token: str
    token_type: str
class TokenData(BaseModel):
    username: str | None = None
