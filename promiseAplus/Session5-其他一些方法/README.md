### Promise其他一些方法

Promise相关方法

- resolve

`resolve`是`Promise`类上的静态方法

```javascript
	static resolve(value) {
		return new Promise((resolve, reject) => {
			resolve(value)
		})
	}
```

- reject

`reject`是`Promise`类上的静态方法

```javascript
	static reject(reason) {
		return new Promise((resolve, reject) => {
			reject(reason)
		})
	}
```

- catch

`catch`是`promise`原型上的方法

```javascript
	catch(errCallback) {
		return this.then(null, errCallback)
	}
```

- all

```javascript
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
```

- race

```javascript
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
```

- finally

```javascript
    finally(cb) {
        return this.then(
            value => Promise.resolve(cb()).then(() => value),
            reason => Promise.resolve(cb()).then(() => { throw reason })
        )
    }
```




