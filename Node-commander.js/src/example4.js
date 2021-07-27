const { program } = require('commander')

program
    .version('0.0.6')
    .description('独立可执行子命令')
    .command('create', 'create file')
    .command('update', 'update file',  { executableFile: 'update' })
    .command('install').alias('i')
    .action((opt, command) => {
        console.log('action', opt, command.name());
    })

program.parse()