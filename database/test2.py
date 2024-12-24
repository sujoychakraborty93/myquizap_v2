
answers_dict = {}
answers = [
    {"id": 'a',
     "text": 'answer', "is_correct": True},
    {"id": 'b',
     "text": 'answer.1', "is_correct": False},
    {"id": 'c',
     "text": 'answer.2', "is_correct": False},
    {"id": 'a',
     "text": 'answer.3', "is_correct": False}
]

for a in answers:
    answers_dict[a['id']] = {
        'text': a['text'], 'is_correct': a['is_correct']}

print(answers_dict)
