from fastapi import APIRouter, Request, HTTPException
from typing import List, Dict
import pandas as pd
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer
router = APIRouter()

class SimpleDataset:
    def __init__(self, tokenized_texts):
        self.tokenized_texts = tokenized_texts
    
    def __len__(self):
        return len(self.tokenized_texts["input_ids"])
    
    def __getitem__(self, idx):
        return {k: v[idx] for k, v in self.tokenized_texts.items()}
model_name = "j-hartmann/emotion-english-distilroberta-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
trainer = Trainer(model=model)

resulted_data = {}
chats = []
@router.get("/fetch-database")
async def get_database_data(request: Request):
    global chats
    try:
        groups_list = request.app.mongodb["groups"].find()
        cont_list = []
        async for group in groups_list:
            cont_list.append(group["chats"])
        chats = [cont["chat_text"] for cont in cont_list[0]]
        return chats
    except:
        return HTTPException(status_code=404)
    
@router.post("/prepare-dataset")
async def prepare_dataset(request: Request):
    ##Based on the example provided for the model implementation
    global chats
    global resulted_data
    pred_texts =chats
    tokenized_texts = tokenizer(pred_texts,truncation=True,padding=True)
    pred_dataset = SimpleDataset(tokenized_texts)
    predictions = trainer.predict(pred_dataset)
    preds = predictions.predictions.argmax(-1)
    labels = pd.Series(preds).map(model.config.id2label)
    scores = (np.exp(predictions[0])/np.exp(predictions[0]).sum(-1,keepdims=True)).max(1)
    temp = (np.exp(predictions[0])/np.exp(predictions[0]).sum(-1,keepdims=True))
    anger = []
    disgust = []
    fear = []
    joy = []
    neutral = []
    sadness = []
    surprise = []

    for i in range(len(pred_texts)):
        anger.append(temp[i][0])
        disgust.append(temp[i][1])
        fear.append(temp[i][2])
        joy.append(temp[i][3])
        neutral.append(temp[i][4])
        sadness.append(temp[i][5])
        surprise.append(temp[i][6])
    df = pd.DataFrame(list(zip(pred_texts,preds,labels,scores,  anger, disgust, fear, joy, neutral, sadness, surprise)), columns=['text','pred','label','score', 'anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise'])
    resulted_data = df.to_dict()
    return resulted_data
@router.post("/push-to-dataset")
async def push_to_dataset(request: Request):
    contents = request.app.repo.get_contents("AbyssinianChats.csv", ref="test")
    request.app.repo.update_file(contents.path, "New Dataset", resulted_data, contents.sha, branch="test")
