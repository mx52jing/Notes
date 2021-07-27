const { program, Option } = require('commander')

/**
 * ==================================
 * boolean类型参数
 * ==================================
 */
// program
//     .option('-p, --port', '你的端口号')
//     .option('-l, --lang-opt', '我是多个单词的选项')
//     .parse()

// const opts = program.opts()

// console.log(opts);

/**
 * ==================================
 * 可以设置参数
 * ==================================
 */

// program
//     .version('0.0.1')
//     .option('-p, --port <port>', '你的端口号', 8000/* 默认值 */)
//     .option('-o, --optional [optional]', '可选参数', 'optional'/* 默认值 */)
//     .option('-m, --many <many...>', '必填的变长选项参数')
//     .option('-t, --tree [tree...]', '可选的变长参数')
//     .option('-l, --lang-opt ', '我是多个单词的选项')
//     .addOption(new Option('-c, --choose <choose>', '选择').default('1').choices(['1', '2', '3'])) // 该选项只能是'1', '2', '3'中的一个
//     .parse()
// const opts = program.opts()
// console.log(opts);

/**
 * ==================================
 * 自定义选项参数
 * ==================================
 */
const handleNum = (curVal, prevVal) => {
    console.log(`handleNum => 命令行传入的值是${curVal}，上个处理函数返回的值是${prevVal}`);
    return +curVal + 1
}
const handleAdd = (curVal, prevVal) => {
    console.log(`handleAdd => 命令行传入的值是${curVal}，上个处理函数返回的值是${prevVal}`);
    return +curVal + (prevVal ? +prevVal : 0)
}
const handleDecrease = (curVal, prevVal) => {
    console.log(`handleDecrease => 命令行传入的值是${curVal}，上个处理函数返回的值是${prevVal}`);
    return +prevVal - +curVal
}

program
    .option('-n, --number <number>', '输入的数字', handleNum)
    .option('-a, --add <add>', '增加几', handleAdd)
    .option('-d, --decrease <decrease>', '减少数值', handleDecrease)
    .parse()

/**
 * node example2.js -n 1 -n 2 -n 3
 * handleNum => 命令行传入的值是1，上个处理函数返回的值是undefined
 * handleNum => 命令行传入的值是2，上个处理函数返回的值是2
 * handleNum => 命令行传入的值是3，上个处理函数返回的值是3
 * node example2.js -a 2 -a 3 -a 5
 * handleAdd => 命令行传入的值是2，上个处理函数返回的值是undefined
 * handleAdd => 命令行传入的值是3，上个处理函数返回的值是2
 * handleAdd => 命令行传入的值是5，上个处理函数返回的值是5
 */