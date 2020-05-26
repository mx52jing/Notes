const PENDING = 'pending',
	RESOLVED= 'resolved',
	REJECTED = 'rejected'

class Promise {
	constructor(executor) {
		this.status = PENDING
		this.value = null
		this.reason = null
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
		}catch (e) {
			reject(e)
		}
	}
}



