const { program } = require('commander')

// program
//     .command('build <path>')
//     .description('build description')
//     .action((path) => {
//         console.log('------------------', path);
//     })

// program
//     .command('test <test>')
//     .description('test')
//     .action((test) => {
//         console.log(test)
//     })

// program
//     .arguments('<username> [password...]')
//     .description('show your info')
//     .action((username, password, opts) => {
//         console.log('username', username, password, opts)
//     })

// program
//     .arguments('<phone>')
//     .description('show your phone')
//     .action((phone, opts) => {
//         console.log('phone', phone, opts)
//     })

program
    .version('0.0.6')
    .description('测试action')
    .command('action <actionName>')
    .option('-p, --port <port>', 'port')
    .option('-d, --debug', 'is debug open')
    .action((actionName, opt, command) => {
        console.log(actionName, opt, command.name());
    })

program.parse()