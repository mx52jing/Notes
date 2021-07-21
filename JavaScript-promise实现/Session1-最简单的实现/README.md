### Session1-最简单的实现

源代码

```javascript
const PENDING = 'pending',
	RESOLVED= 'resolved',
	REJECTED = 'rejected'

class Promise {
    constructor(executor) {
        this.status = PENDING // 当前promise的状态
        this.value = undefined // 成功态对应的value
        this.reason = undefined // 失败态对应的reason
        /*
        * 只有当状态为pending的时候才能够转换状态
        */
        const resolve = value => {
            if(this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
            }
        }
        const reject = reason => {
            if(this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
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
    }
}

module.exports = Promise

```

