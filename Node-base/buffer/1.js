const fs = require('fs')
const path = require('path')

// const r = fs.readFileSync(path.resolve(__dirname, 'note.md'))

// console.log(r)

// const text = Buffer.from('巴福') // <Buffer e5 b7 b4 e7 a6 8f>
// console.log(text.toString('base64'));
// console.log(0xe5.toString(2));
// console.log(0xb7.toString(2));
// console.log(0xb4.toString(2));
// console.log(0xe7.toString(2));
// console.log(0xa6.toString(2));
// console.log(0x8f.toString(2));
// /*
// 11100101
// 10110111
// 10110100
// 11100111
// 10100110
// 10001111
// */
// const str = 'abcdefghijklmnopqrstuvwxyz0123456789+',
//     base64 = [11100101, 10110111, 10110100, 11100111, 10100110, 10001111].reduce((a, b) => {
//         console.log(str[parseInt(`0o${b}`)]);
//         return a + str[parseInt(`0o${b}`)]
//     }, '')

// console.log(base64);

// const buf = Buffer.alloc(6)

// console.log(buf);

// const buf = Buffer.from('你'),
//     sliceBuf = buf.slice(0, 1)

// console.log(buf, sliceBuf); // <Buffer e4 bd a0> <Buffer e4>

// sliceBuf[0] = 100

// console.log(buf, sliceBuf); // <Buffer 64 bd a0> <Buffer 64>

// const buf = Buffer.from('我'),
//     str = '我'

// console.log(Buffer.isBuffer(buf), Buffer.isBuffer(str)); //true false

// const buf1 = Buffer.from('我'),
//     buf2 = Buffer.from('的'),
//     buf3 = Buffer.alloc(6)

// /*
// copy(目标buffer，目标开始位置，源buffer开始位置，源buffer结束位置)
// */

// buf1.copy(buf3, 0, 0, 3) // 或者buf1.copy(buf3, 0, 0)
// buf2.copy(buf3, 3, 0, 3) // 或者buf2.copy(buf3, 3, 0)

// console.log(buf3.toString());

// const buf1 = Buffer.from('我'),
//     buf2 = Buffer.from('的'),
//     buf3 = Buffer.concat([buf1, buf2])


// console.log(buf3, buf3.toString()); //<Buffer e6 88 91 e7 9a 84> 我的;

// const fillBuffer = Buffer.from('我的')

// console.log(fillBuffer);
// fillBuffer.fill(22)

// console.log(fillBuffer);

const fillBuffer = Buffer.alloc(3)

fillBuffer.fill('的')

console.log(fillBuffer, fillBuffer.toString());