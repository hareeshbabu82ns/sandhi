var sandhi = require('./index')

let word = 'श्रीमद्भगवद्गीता'
let first = 'श्रीमत्'
let second = 'भगवद्गीता'
let result = sandhi.sandhi.add(first, second)

console.log('Sandhi:', result)

word = 'श्रीमद्भगवद्गीता'
first = 'श्रीमत्'
second = 'भगवद्गीता'
result = sandhi.sandhi.del(word, second)

console.log('Samasam:', result)