from fastapi import APIRouter, Request, HTTPException, Path
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models import TrendDataModel, TrendBase, FollowUpBase, FollowUpDataModel
from .helper_tools import formated_time
from datetime import datetime
router = APIRouter()

@router.get("/get-trend/", description="returns a trend with all of its information")
async def return_trend(request: Request, trend_id: str):
    if not (cont_trend:= await request.app.mongodb["trends"].find_one({"_id": trend_id})):
        raise HTTPException(status_code=404, detail="Trend not find")
    return cont_trend
@router.post("/new-trend" , description="it adds a new trend to the database")
async def add_new_trend(request:Request, trend: TrendDataModel):
    new_trend = jsonable_encoder(trend)
    new_trend["followup_trends"] = []
    new_trend["reactions"] = {"likes": 0, "share": 0, "comments": 0}
    new_trend["sent_time"]= formated_time(datetime.now())
    #in the following task the new_trend dictionary is made to pass through TrendDataModel just to enforce
    #the model schema
    try:
        added_ = await request.app.mongodb["trends"].insert_one(new_trend)
        return {"message":added_.inserted_id}
    except:
        raise HTTPException(status_code=401, detail="could not add the trend")
@router.get("/return-all-trends")
async def return_all_trends(request: Request):
    try:
        cursor = request.app.mongodb["trends"].find()
        contain_results = []
        async for item in cursor:
            contain_results.append(item)
        return {"message": contain_results}
    except:
        raise HTTPException(status_code=401, detail="could not retrive trends")
@router.post("/add/followup-trend"  , description="this will add a follow up on the given trend")
async def followup_trend(request: Request, trend: FollowUpDataModel, root_trend_id: str):
    if not (cont_returned:= await request.app.mongodb["trends"].find_one({"_id": root_trend_id})):
        raise HTTPException(status_code=401, detail="trend not found")
    new_followup = jsonable_encoder(trend)
    new_followup["reactions"] = {"likes": 0, "share": 0, "comments": 0}
    new_followup["sent_time"] = formated_time(datetime.now())
    new_followup["root_trend_id"] = root_trend_id
    print(root_trend_id, new_followup)
    try:
        await request.app.mongodb["trends"].update_one(
            {"_id":root_trend_id}, 
            {"$push" : {"followup_trends": new_followup}}
        
        )
        print("hello")
        return {"message":"successful"}  
    except:
        raise HTTPException(status_code=401, detail="could not add the folloup to the trend")
@router.post("/access/followup-trend" , description="this will add a follow up on the given trend")
async def followup_trend(request: Request, trend_id: str):
    if not (cont_returned:= await request.app.mongodb["trends"].find_one({"_id": trend_id})):
        raise HTTPException(status_code=401, detail="trend not found")
    return cont_returned["followup_trends"]    
@router.post("/update-reaction/likes")

### The following three operations need to be authenticated 
### For now it would be a simple request response feature
async def update_reaction_likes(request: Request, trend_id: str, root_id: str, type: str):
    try:
        if type=="ROOT":
            get_trend_info = await request.app.mongodb["trends"].find_one({"_id": trend_id})
            await request.app.mongodb["trends"].update_one({"_id": trend_id}, {
                "$set": {"reactions.likes": get_trend_info["reactions"]["likes"] + 1}
            })
        elif type=="FOLLOWUP":
            get_trend_info = await request.app.mongodb["trends"].find_one({"_id": root_id})
            get_existing_likes = list(filter(lambda x: x["_id"] == trend_id, get_trend_info["followup_trends"]))[0]["reactions"]["likes"]
            print(get_existing_likes)
            await request.app.mongodb["trends"].update_one({"_id": root_id, "followup_trends._id": trend_id}, {
                "$set": {"followup_trends.$.reactions.likes": get_existing_likes + 1}
            })

    except:
        raise HTTPException(status_code=401, detail="could not add the like")
@router.post("/update-reaction/share")
async def update_reaction_likes(request: Request, trend_id: str , root_id: str, type: str):
    try:
        if type=="ROOT":
            get_trend_info = await request.app.mongodb["trends"].find_one({"_id": trend_id})
            await request.app.mongodb["trends"].update_one({"_id": trend_id}, {
                "$set": {"reactions.share": get_trend_info["reactions"]["share"] + 1}
            })
        elif type=="FOLLOWUP":
            get_trend_info = await request.app.mongodb["trends"].find_one({"_id": root_id})
            get_existing_share = list(filter(lambda x: x["_id"] == trend_id, get_trend_info["followup_trends"]))[0]["reactions"]["share"]
            print(get_existing_share)
            await request.app.mongodb["trends"].update_one({"_id": root_id, "followup_trends._id": trend_id}, {
                "$set": {"followup_trends.$.reactions.likes": get_existing_share + 1}
            })
    except:
        raise HTTPException(status_code=401, detail="could not add the share")
@router.post("/update-reaction/comments")
async def update_reaction_likes(request: Request, trend_id: str, root_id: str,type: str):
    try:
        if type=="ROOT":
            get_trend_info = await request.app.mongodb["trends"].find_one({"_id": trend_id})
            await request.app.mongodb["trends"].update_one({"_id": trend_id}, {
                "$set": {"reactions.comments": get_trend_info["reactions"]["comments"] + 1}
            })
        elif type=="FOLLOWUP":
            get_trend_info = await request.app.mongodb["trends"].find_one({"_id": root_id})
            get_existing_comments = list(filter(lambda x: x["_id"] == trend_id, get_trend_info["followup_trends"]))[0]["reactions"]["comments"]
            await request.app.mongodb["trends"].update_one({"_id": root_id, "followup_trends._id": trend_id}, {
                "$set": {"followup_trends.$.reactions.comments": get_existing_comments + 1}
            })
            
    except:
        raise HTTPException(status_code=401, detail="could not add the comments")
