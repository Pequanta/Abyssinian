from fastapi import APIRouter, Request, HTTPException, Path
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import GroupDB, ChatDB, GroupBase
from .helper_tools import formated_time
from datetime import datetime
router = APIRouter()
@router.get("/get-trend/", description="returns a trend with all of its information")
async def return_trend(request: Request, trend-id)

