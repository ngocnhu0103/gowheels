import mysql.connector
from mysql.connector import errorcode
from app.config.config import CONFIG
def connectDB():
    try:
        cnx = mysql.connector.connect(
            user=CONFIG.get('user'),
            password=CONFIG.get('password'),
            host=CONFIG.get('host'),
            database=CONFIG.get('database'))
        print("Database Connected")
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    
    

