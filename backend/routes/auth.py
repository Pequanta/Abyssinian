from fastapi import HTTPException, Depends, status, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Annotated
from models import Token, TokenData, UserDB
from datetime import datetime, timezone, timedelta
from jose import jwt ,exceptions
from decouple import config

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
##The following code is based on the documentation from Fastapi about tokens with slight modification
##for the application

class Authentication:
    def __init__(self):
        self.SECRET_KEY = config('SECRET_KEY', str)
        self.ALGORITHM = config('ALGORITHM', str)
        self.ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES', str)
    def get_password_hash(self, password):
        return pwd_context.hash(password)
    def verify_password(self ,plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
    def create_access_token(self, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt
    def decode_token(self, token: str):
        print(token, self.SECRET_KEY, self.ALGORITHM)
        return jwt.decode(token, self.SECRET_KEY, algorithms=self.ALGORITHM)
