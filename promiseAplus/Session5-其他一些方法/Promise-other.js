const PENDING = 'pending',
	RESOLVED = 'resolved',
	REJECTED = 'rejected'

const resolvePromise = (promise2, x, resolve, reject) => {
	if (promise2 === x) {
		return reject(new TypeError('Chaining cycle detected for promise'))
	}
	/*
	* 先判断x否是对象或者函数，如果不是，说明x是原始值，直接resolve掉，是的话再进一步判断
	* 获取x.then赋值给then，判断then是否是一个函数，如果不是说明x就是一个普通对象，也直接resolve掉
	* 在获取x.then的时候，有可能会报错，比如这样写
	* Object.defineProperty(x, 'then', {
	*	get() {
	*   	throw new Error('故意刁难你')
	*	}
	*  })
	* 这样在执行x.then的时候就会报错，所以要用try catch捕获错误
	* 如果then是一个函数，我们认为x是一个promise，然后执行then并把x作为this传进去
	* 如果不指定this，那么promise内部获取this.value/this.reason/this.status就获取不到
	* 执行的then其实和平常使用.then一样 p.then(res => {}, err => {}),只不过使用call指定了this而已
	*/
	let called;
	if ((typeof x === 'object' || typeof x === 'function') && x !== null) {
		try {
			const then = x.then
			if (typeof then === 'function') {
				then.call(x, y => {
					if (called) return
					called = true
					resolvePromise(promise2, y, resolve, reject)
				}, r => {
					if (called) return
					called = true
					reject(r)
				})
			} else {
				resolve(x)
			}
		} catch (e) {
			if (called) return
			called = true
			reject(e)
		}
	} else {
		resolve(x)
	}
}

const isPromise = value => {
	if (value !== null && (typeof value === 'function' || typeof value === 'object')) {
		if (typeof value.then === 'function') {
			return true
		}
	}
	return false
}

class Promise {
	constructor(executor) {
		this.status = PENDING // 当前promise的状态
		this.value = undefined // 成功态对应的value
		this.reason = undefined // 失败态对应的reason
		this.onResolvedCallbacks = [] // 存储then函数的成功回调
		this.onRejectedCallbacks = []  // 存储then函数的失败回调
		/*
		* 只有当状态为pending的时候才能够转换状态
		*/
		const resolve = value => {
            if(value instanceof Promise) {
                return value.then(resolve, reject)
            }
			if (this.status === PENDING) {
				this.status = RESOLVED
				this.value = value
				/*
				* 状态变为resolved之后，依次执行保存的成功回调
				* */
				this.onResolvedCallbacks.forEach(fn => fn())
			}
		}
		const reject = reason => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				/*
				* 状态变为rejected之后，依次执行保存的失败回调
				* */
				this.onRejectedCallbacks.forEach(fn => fn())
			}
		}
		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}
	}

	/*
	* onFulfilled: 一定是在promise是resolved状态后调用，并且接受一个参数 value
	* onRejected:  一定在 promise是rejected状态后调用，并且接受一个参数 reason
	* */
	then(onFulfilled, onRejected) {
		/*
		* 兼容一下没有传onFulfilled/onRejected的情况
		* 注意一下：
		*  onRejected如果没有传，
		*  默认返回reason => { throw reason }而不是 reason => reason
		*  因为要将错误传递到下一个then的onRejected，所以要抛出错误，才能走到下一个then的onRejected
		*  不然就将错误当作value传递个下一个then的onFulfilled了，这是不对的
		* */
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		onRejected = typeof onRejected === 'function' ? onRejected : reason => {
			throw reason
		}
		let promise2
		/*
		* 我们需要在then方法中返回一个新的promise
		* 另外：
		* 1、要获取onFulfilled的返回值，传递到返回的promise中
		* 2、在执行onFulfilled函数时，可能会报错，所以要加上try catch捕获错误
		* */
		promise2 = new Promise((resolve, reject) => {
			if (this.status === RESOLVED) {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						/*
						* 注意：
						* 这里是resolve(x)而不是reject(x)
						* */
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}
			/*
			* 状态为pending时，将成功和失败的回调存起来
			* */
			if (this.status === PENDING) {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				})
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				})
			}
		})
		return promise2
	}
	catch(errCallback) {
		return this.then(null, errCallback)
	}

    finally(cb) {
		return this.then(
			value => Promise.resolve(cb()).then(() => value),
			reason => Promise.resolve(cb()).then(() => { throw reason })
		)
    }
	static resolve(value) {
		return new Promise((resolve, reject) => {
			resolve(value)
		})
	}
	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}
	static all(fns) {
		return new Promise((resolve, reject) => {
			if (!fns.length) {
				return resolve([])
			}
			let result = [],
				index = 0
			const next = (res, i) => {
				result[i] = res
				if (++index === fns.length) {
					resolve(result)
				}
			}
			for (let i = 0; i < fns.length; i++) {
				const fn = fns[i]
				if (isPromise(fn)) {
					fn.then(res => {
						next(res, i)
					}, reject)
				} else {
					next(fn, i)
				}
			}
		})
	}
	static race(fns) {
		return new Promise((resolve, reject) => {
			for(let i = 0; i < fns.length; i++) {
				const fn = fns[i]
				if(isPromise(fn)) {
					fn.then(resolve, reject)
				}else {
					resolve(fn)
				}
			}
		})
	}
}

module.exports = Promise
