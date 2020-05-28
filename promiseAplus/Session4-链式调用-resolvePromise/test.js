const Promise = require('./Promise')

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(100)
    }, 1000)
    // resolve(100)
})

p1.then().then(res => {
    console.log(res,  '2success');
}, err => {
    console.log(err, '2 error');
    return 8
}).then(res => {
    console.log(res,  '3success');
}, err => {
    console.log(err, '3error');
})

// p1.then(res => {
//     console.log(res);
// }, err => {
//     console.log(err);
// })
