from flask import Flask,jsonify,request
# imports

from keras.applications import vgg16
from keras.preprocessing.image import load_img,img_to_array
from keras.models import Model
from keras.applications.imagenet_utils import preprocess_input
from PIL import Image
import os
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from app.config.connect_db import connectDB
from app.functions.select import selectBike
from app.functions.writeFileCsv import writeFileCsv


app = Flask(__name__)
db = connectDB()
@app.route("/")
def hello_world():
    img_param = {
    'url' : "https://firebasestorage.googleapis.com/v0/b/gowheels-b0d13.appspot.com/o/files%2Fxe3-1.jpg_6043?alt=media&token=6a950be9-1b1d-41f3-8d44-3e3f615aac7d",
    'bike_namme' : "BMW 320i 2013"
    }
    sql = 'select bikes.bike_name, bikes_images.bike_bike_id, images.url from bikes join bikes_images join images on bikes.bike_id = bikes_images.bike_bike_id and bikes_images.images_img_id = images.img_id'
    cursor = db.cursor(dictionary=True)
    cursor.execute(sql)
    rows = cursor.fetchall()
    json_data = jsonify(rows)

    writeFileCsv(rows)

    df = pd.read_csv('data.csv')
    # similar_matrix = cosine_similarity(df.drop('data',axis=1))

    # print(similar_matrix)
    param = pd.DataFrame([img_param])
    print(param)
    similarities = cosine_similarity(df.drop(['bike_name'],axis=1),param)
    print(similarities)
    # similarImages = df[similarities.flatten() >= 0.9]['data']

    # print(jsonify(similarImages.tolist()))

    # json = selectBike()
    return json_data


@app.route("/bike/similar/<bikeId>")
def similarBike(bikeId):
    return {
        "bike" : bikeId
    }


# parameters setup

imgs_path = "datas"
imgs_model_width, imgs_model_height = 224, 224

nb_closest_images = 5 # number of most similar images to retrieve

# load the model
vgg_model = vgg16.VGG16(weights='imagenet')

# remove the last layers in order to get features instead of predictions
feat_extractor = Model(inputs=vgg_model.input, outputs=vgg_model.get_layer("fc2").output)

# print the layers of the CNN
feat_extractor.summary()

files = [imgs_path + x for x in os.listdir(imgs_path) if "png" in x]

print("number of images:",len(files))


# def calculate_similarity(image_path):
   







@app.route('/search', methods=['POST'])
def search_similar_images():
    if request.method == 'POST':
        # Nhận đường dẫn đến ảnh cần tìm kiếm từ request POST
        image_path = request.form.get('image_path')
        
        # Tính toán độ tương đồng với các ảnh và trả về kết quả
        similarities = calculate_similarity(image_path)
        
        # Trả về JSON chứa các ảnh gần giống nhất
        return jsonify({'similar_images': similarities})

if __name__ == "__main__":
    app.run(debug=False)