## Buffer

- 默认文件读取操作，读取出来的都是buffer

- 内存的表示方式就是buffer，内存是二进制的，buffer是十六进制的

- 整数进制转化是基于编码的

- ASCII码就是一个字节来表示一个字母或者符号

- gb2312用两个字节来表示中文，第一位大于127的，认为加上第二位就是一个中文

- unicode => utf-8，node默认支持utf-8

- 16进制0x开头，8进制0b开头，2进制0o开头

### base64

- 二进制的值不能超过64，base64加密核心就是进制的转化，可以反转，所以不靠谱

- 在浏览器的header中，任意的url中都可采用base64，前端文件预览也使用base64，用FileReader

- 转码后的结果比原来的内容大

- base64转化后去特定的字符串取值，base64就是编码转化，不需要发送http请求，大小会比以前大

- buffer就是吧二进制表现成了10进制，还可以和字符串进行转化

### buffer声明方式

- 固定大小

```javascript
const buf = Buffer.alloc(8) // 固定大小

const str = Buffer.from('阿法')
```


### buffer常见方法

> buffer存放的都是内存地址，如果截取了某一段，改变的时候也是改变了这个内存地址
 
- slice 

和数组的slice方法效果一样

```javascript
const buf = Buffer.from('你'),
    sliceBuf = buf.slice(0, 1)

console.log(buf, sliceBuf); // <Buffer e4 bd a0> <Buffer e4>

sliceBuf[0] = 100

console.log(buf, sliceBuf); // <Buffer 64 bd a0> <Buffer 64>
```

- Buffer.isBuffer

判断一个值是不是buffer

```javascript
const buf = Buffer.from('我'),
    str = '我'

console.log(Buffer.isBuffer(buf), Buffer.isBuffer(str)); //true false
```

- copy

```javascript
const buf1 = Buffer.from('我'),
    buf2 = Buffer.from('的'),
    buf3 = Buffer.alloc(6)

/*
copy(目标buffer，目标开始位置，源buffer开始位置，源buffer结束位置)
*/

buf1.copy(buf3, 0, 0, 3) // 或者buf1.copy(buf3, 0, 0)
buf2.copy(buf3, 3, 0, 3) // 或者buf2.copy(buf3, 3, 0)

console.log(buf3.toString()); // 我的
```

- Buffer.concat

拼接，比copy更方便


```javascript
/*
Buffer.concat(BufferArray: Array, length: number)
length不传就默认是所有buffer加起来的长度
*/
const buf1 = Buffer.from('我'),
    buf2 = Buffer.from('的'),
    buf3 = Buffer.concat([buf1, buf2])

console.log(buf3, buf3.toString()); //<Buffer e6 88 91 e7 9a 84> 我的
```

- fill

填充buffer

```javascript
const fillBuffer = Buffer.from('我的')

console.log(fillBuffer); // <Buffer e6 88 91 e7 9a 84>
fillBuffer.fill(22)

console.log(fillBuffer); // <Buffer 16 16 16 16 16 16>


const fillBuffer = Buffer.alloc(3)

fillBuffer.fill('的')

console.log(fillBuffer, fillBuffer.toString()); // <Buffer e7 9a 84> 的
```

### 扩展buffer的方法

```javascript
Buffer.prototype.xxx = function(){}
```