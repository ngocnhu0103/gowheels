from flask import Flask
from app.config.connect_db import connectDB
from app.functions.select import selectBike
app = Flask(__name__)
# connectDB()

@app.route("/")
def hello_world():
    json = selectBike()
    return {
        "data" : json
    }


@app.route("/bike/similar/<bikeId>")
def similarBike(bikeId):
    return {
        "bike" : bikeId
    }

