const Promise = require('./Promise-other')
// const p1 = new Promise((resolve, reject) => {
// 	reject(1)
// })
//
// p1.then(res => {
// 	console.log(res, 'res');
// }, err => {
// 	console.log(err, 'then err');
// }).catch(err => {
// 	console.log(err, 'catch');
// }).then(res => {
// 	console.log(res, 'catch 后面的 then');
// })
/*
* 打印：
* 1 then er
* r
* */
const f1 = () => (
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('f1')
		}, 2000)
	})
)

const f2 = () => (
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('f2')
		}, 800)
	})
)


const f3 = () => (
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('f3')
		}, 1000)
	})
)

const f5 = () => (
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('f5')
		}, 3000)
	})
)

Promise.all([f5(), f2(), f3(), f1(), 8, function(){}])
.then(res => {
	console.log(res, 'res');
}, err => {
	console.log(err, 'err');
})

/*
* 3秒后打印： [ 'f5', 'f2', 'f3', 'f1' ] res
* */
