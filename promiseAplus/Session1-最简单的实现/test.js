const Promise = require('./Promise')

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 1000)
})

p1.then(res => {
    console.log(res, 'success');
}, err => {
    console.log(err, 'error');
})
