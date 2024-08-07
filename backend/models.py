from bson import ObjectId
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
        user_avatar: str=Field(...)
        user_previlage: str=Field(...)
class UserDB(UserBase):
        pass
class ChatBase(MongoBaseModel):
        chat_text: str=Field(...)
        sender_username: str=Field(...)
        sent_time: str=Field(...)
class ChatDB(ChatBase):
        pass

