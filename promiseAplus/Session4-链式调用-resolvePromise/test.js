const Promise = require('./Promise')

// const p1 = new Promise((resolve, reject) => {
//     // setTimeout(() => {
//     //     reject(100)
//     // }, 1000)
//     resolve(100)
// })
//
// const p2 = p1.then(res => {
//     console.log(res,  '2success');
//     return p2
// }, err => {
//     console.log(err, '2 error');
//     return p2
// })
// p2.then(res => {
//     console.log(res,  '3success');
// }, err => {
//     console.log(err, '3error');
// })

// p1.then(res => {
//     console.log(res);
// }, err => {
//     console.log(err);
// })

// const p = new Promise((resolve, reject) => {
// 	resolve(1)
// })
//
// const p2 = p.then(res => {
// 	return new Promise((resolve, reject) => {
// 		resolve(new Promise((resolve, reject) => {
// 			resolve(new Promise((resolve, reject) => {
// 				resolve(res)
// 			}))
// 		}))
// 	})
// })
//
// p2.then(res => {
// 	console.log(res)
// })
const p1 = new Promise((resolve, reject) => {
	resolve(new Promise((resolve, reject) => {
		resolve(new Promise((resolve, reject) => {
			resolve(2)
		}))
	}))
})
p1.then(res => {
	console.log(res, 'res')
}, err => {
	console.log(err, 'err')
})
