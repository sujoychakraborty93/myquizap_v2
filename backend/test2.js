// let a = Math.random().toString(36).slice(2)
// // let a = Math.random().toString(36)
// console.log(a)
// =========================================

let answers_dict = {}
const answers = [
    {"id": 'a',
     "text": 'answer', "is_correct": true},
    {"id": 'b',
     "text": 'answer.1', "is_correct": false},
    {"id": 'c',
     "text": 'answer.2', "is_correct": true},
    {"id": 'a',
     "text": 'answer.3', "is_correct": false}
]

// for a in answers:
//     answers_dict[a['id']] = {
//         'text': a['text'], 'is_correct': a['is_correct']}
answers.map(a => answers_dict[a.id] = {'text': a.text, 'is_correct': a.is_correct}) // this works 
answers.map(a => answers_dict[a['id']] = {'text': a['text'], 'is_correct': a['is_correct']}) // this also works

console.log(answers_dict)
