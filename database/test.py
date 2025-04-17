# a = ["ab", "bb", ""]
# print(a)
# print(type(a))

# while "" in a:
#     a.remove("")

# # a = a[-1]
# print(a)
# ==================
import csv
import json
import random
import string
from pymongo import MongoClient


def fetch_answers_from_db():
    print('a')
    mongo_uri = 'mongodb+srv://userid:psw@cluster0.cb0mw.mongodb.net/MyQuizAp?retryWrites=true&w=majority&appName=Cluster0'
    # mongo_uri = 'mongodb+srv://userid:psw@cluster0.cb0mw.mongodb.net/MyQuizAp?retryWrites=true&w=majority'
    # mongo_uri = 'mongodb+srv://userid:psw@cluster0.cb0mw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    # mongo_uri = 'mongodb+srv://userid:psw@cluster0.cb0mw.mongodb.net/?retryWrites=true&w=majority'
    # mongo_uri = 'mongodb+srv://userid:psw@cluster0.cb0mw.mongodb.net'
    print('b')
    # Connection to the MongoDB Server
    # mongoClient = MongoClient('Your_IP: Your_Port')
    mongoClient = MongoClient(mongo_uri)
    print('c')
    # Connection to the database
    # db = mongoClient.MyQuizAp
    mydb = mongoClient["MyQuizAp"]
    print('d')
    # Collection
    mycollection = mydb["User_Collection"]
    print('e')
    # List databases to check connection
    databases = mongoClient.list_database_names()
    for db in databases:
        print(f" - {db}")
    # ansData = mycollection.find_one({'name': 'a11'})
    print('f')
    # ansData = collection.find_one()
    # ansData = collection.find()
    # for a in ansData:
    #     print(a)
    print(ansData)
    mongoClient.close()


if __name__ == "__main__":
    fetch_answers_from_db()
