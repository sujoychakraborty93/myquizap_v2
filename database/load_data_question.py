import csv
import json
import random
import string
from pymongo import MongoClient


# def fetch_answers_from_db():
#     # mongo_uri = 'mongodb+srv://mongodbadmin:mongodbadmin@cluster0.cb0mw.mongodb.net/MyQuizAp?retryWrites=true&w=majority&appName=Cluster0'
#     mongo_uri = 'mongodb+srv://mongodbadmin:mongodbadmin@cluster0.cb0mw.mongodb.net'
#     # Connection to the MongoDB Server
#     # mongoClient = MongoClient('Your_IP: Your_Port')
#     mongoClient = MongoClient(mongo_uri)
#     # Connection to the database
#     db = mongoClient.MyQuizAp
#     # Collection
#     collection = db.Answers_Collection
#     ansData = collection.find()
#     print(ansData)
#     mongoClient.close()


idArr = []  # store all ids here. This will check each id generated is unique


def random_id_gen():
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
    if id not in idArr:
        idArr.append(id)
        return id
    else:
        random_id_gen()


def convert_csv_to_json(csv_file_path, json_file_path, answers_list_json_file_path, answers_dict_json_file_path):
    # Read the CSV file
    with open(csv_file_path, mode='r', encoding='utf-8-sig') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # List to hold all the questions
        questions_list = []
        answers_list = []
        answers_dict = {}

        # Process each row in the CSV
        for row in csv_reader:
            # Extract relevant data
            question_id = int(row['question_id'])
            question_title = row['question_title']
            region = row['region']
            topics = row['topic'].split(';')
            while "" in topics:
                topics.remove("")
            difficulty = row['difficulty']

            # Create answers list with text and is_correct keys
            answers = [
                {"id": random_id_gen(),
                 "text": row['answer'], "is_correct": True},
                {"id": random_id_gen(),
                 "text": row['answer.1'], "is_correct": False},
                {"id": random_id_gen(),
                 "text": row['answer.2'], "is_correct": False},
                {"id": random_id_gen(),
                 "text": row['answer.3'], "is_correct": False}
            ]

            random.shuffle(answers)

            # Create the question dictionary
            question = {
                "question_id": question_id,
                "question_title": question_title,
                "answers": answers,
                "region": region,
                "topic": topics,
                "difficulty": difficulty
            }

            # Append the question to the list
            questions_list.append(question)
            answers_list = answers_list + answers  # add all answers in a list
            for a in answers:
                answers_dict[a['id']] = {
                    'text': a['text'], 'is_correct': a['is_correct']}

    # Write the question list to a JSON file
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(questions_list, json_file, indent=4)

    # Write the answers list to a JSON file
    with open(answers_list_json_file_path, mode='w', encoding='utf-8') as ans_json_file:
        json.dump(answers_list, ans_json_file, indent=4)

    # Write the answers dict to a JSON file
    with open(answers_dict_json_file_path, mode='w', encoding='utf-8') as ans_dict_json_file:
        json.dump(answers_dict, ans_dict_json_file, indent=4)

    print(f"CSV data has been successfully converted to JSON and saved ",
          "to {json_file_path}")


if __name__ == "__main__":
    csv_file_path = 'questions.csv'  # Path to your CSV file
    json_file_path = 'questions.json'  # Path where you want to save the JSON file
    # Path where you want to save the JSON file
    answers_list_json_file_path = 'answers_list.json'
    answers_dict_json_file_path = 'answers_dict.json'
    convert_csv_to_json(csv_file_path, json_file_path,
                        answers_list_json_file_path, answers_dict_json_file_path)
