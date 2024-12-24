// const num1 = "110";

// const level = Math.floor(parseInt(num1)/20);
// console.log(level)

// var a = 0;
// var b = 3;
// a += b;
// console.log(a);

console.log("==========================================")

let a = ["a1", "a2", "a3"]
let b = []
let c = []
let d = []
let e = {}
let qid1 = '23w'
let ans1 = {id:'5ad', text:'bhim', isCorrect:true}
let ansid1 = '5ad'
let qid2 = '78a'
let ans2 = {id:'7gb', text:'uiod', isCorrect:false}
let ansid2 = '7gb'
b.push(qid1, ans1, ansid1)
b.push(qid2, ans2, ansid2)
c.push({qid1:{ans1, ansid1}})
c.push({qid2:{ans2, ansid2}})
d.push({qid:qid1, ans1, ansid1})
d.push({qid:qid2, ans2, ansid2})
e[qid1] = ans1, ansid1
e[qid2] = ans2, ansid2
// console.log("b")
// console.log(b)
// console.log("c")
// console.log(c)
// console.log("d")
// console.log(d)
console.log("e")
console.log(e)
console.log("===========s")
// let d1 = d.find(x => x.qid = qid1)
// console.log(d1) 
const e1 = () => {
    if (qid1 in e){
        return true 
    }
    return  false
}
console.log(e1())
