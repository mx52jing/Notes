const { program, Command } = require('commander')
/**
 * 使用全局声明
 */
// program
//     .version('0.0.1')
//     .description('全局声明')
//     .parse() // 一定要加parse来解析命令行

/**
 * 使用本地创建对象
 */
const program1 = new Command()

program1
    .version('0.1.1')
    .description('本地对象')
    .parse()