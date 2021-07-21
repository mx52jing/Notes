### Session3-链式调用

源代码

```javascript
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
        /*
        * 兼容一下没有传onFulfilled/onRejected的情况
        * 注意一下：
        *  onRejected如果没有传，
        *  默认返回reason => { throw reason }而不是 reason => reason
        *  因为要将错误传递到下一个then的onRejected，所以要抛出错误，才能走到下一个then的onRejected
        *  不然就将错误当作value传递个下一个then的onFulfilled了，这是不对的
        * */
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        let promise2
        /*
        * 我们需要在then方法中返回一个新的promise
        * 另外：
        * 1、要获取onFulfilled的返回值，传递到返回的promise中
        * 2、在执行onFulfilled函数时，可能会报错，所以要加上try catch捕获错误
        * */
        promise2 = new Promise((resolve, reject) => {
            if(this.status === RESOLVED) {
                try {
                    let x = onFulfilled(this.value)
                    resolve(x)
                }catch(e) {
                    reject(e)
                }
            }
            if(this.status === REJECTED) {
                try {
                    /*
                    * 注意：
                    * 这里是resolve(x)而不是reject(x)
                    * */
                    let x = onRejected(this.reason)
                    resolve(x)
                }catch(e) {
                    reject(e)
                }
            }
            /*
            * 状态为pending时，将成功和失败的回调存起来
            * */
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    }catch(e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolve(x)
                    }catch(e) {
                        reject(e)
                    }
                    onRejected(this.reason)
                })
            }
        })
        return promise2
    }
}

module.exports = Promise
```

