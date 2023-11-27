import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("./key.json")
firebase_admin.initialize_app(cred , {'storageBucket' : 'gowheels-b0d13.appspot.com'})
