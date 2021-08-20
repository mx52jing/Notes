import fs from 'fs';

const rs = fs.createReadStream('./app.txt', {
    flags: 'r', // 当前要做什么操作
    encoding: null, // 默认是buffer
    highWaterMark: 64 * 1024, // 每次读取的大小，默认64k
    mode: 0O666, // 打开文件读 操作权限 读取权限 写入全县 执行权限
    autoClose: true, // 读完后是否自动关闭
    start: 0, //从哪个位置开始读
    //end: 100, // 读到哪个位置 (包前有包后)
})

rs.on('open', () => {
    console.log('打开文件');
})

rs.on('data', data => {
    console.log(`每次读取到的数据为${data}`);
})

rs.on('end', () => {
    console.log('文件读取完毕');
})

rs.on('close', () => {
    console.log('文件关闭close');
})

rs.on('error', () => {
    console.log('文件读取发生错误');
})