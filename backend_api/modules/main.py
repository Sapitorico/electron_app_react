from fastapi import FastAPI
from starlette.websockets import WebSocket
from aux_functions import processLetter, processNumber
import json
import numpy as np
import cv2
import urllib.request
from model_loader import ModelLoader


Lmodel = ModelLoader(0.8)
Wmodel = ModelLoader(0.8, "../models/Words.onnx")

app = FastAPI()

@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    checker = "checker"
    currentmode = "Letter"
    await websocket.accept()
    while True:
        json_data = await websocket.receive_text()

        data = json.loads(json_data)
        req = urllib.request.urlopen(data[0])
        arr_img = np.asarray(bytearray(req.read()), dtype=np.uint8)
        image = cv2.imdecode(arr_img, -1)    
        image = cv2.flip(image, 1) 

        if currentmode == "Letter":
            result = processLetter(image, data[1], currentmode)

        elif currentmode == "Number":
            result = processNumber(image, currentmode)

        elif currentmode == "Word":
            result = processLetter(image, data[1], currentmode)


        if np.all(result == "Error, not a hand"):
                if checker != "checker":
                    checker = "checker"
                    await websocket.send_text("")
        elif np.any(result == np.array(["Number", "Word", "Letter"])):
                currentmode = result
                await websocket.send_text("Changeing mode")
        else:
            if currentmode == "Letter":
                result = Lmodel.predict(result)
            elif currentmode == "Word":
                result = Wmodel.predict(result)

            if result != checker and result != "":
                checker = result
                await websocket.send_text(result)
