const PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected'

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
            if(this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                /*
                * 状态变为resolved之后，依次执行保存的成功回调
                * */
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason => {
            if(this.status === PENDING) {
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
        }catch(e) {
            reject(e)
        }
    }

    /*
    * onFulfilled: 一定是在promise是resolved状态后调用，并且接受一个参数 value
    * onRejected:  一定在 promise是rejected状态后调用，并且接受一个参数 reason
    * */
    then(onFulfilled, onRejected) {
        if(this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if(this.status === REJECTED) {
            onRejected(this.reason)
        }
        /*
        * 状态为pending时，将成功和失败的回调存起来
        * */
        if(this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise
