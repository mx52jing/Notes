const { Command } = require('commander')

const program = new Command(),
    yyds = program.command('yyds')

yyds
    .command('drj')
    .action((opts, command) => {
        console.log('------------', opts, command.name());
    })
yyds
    .command('lyf')
    .action((opts, command) => {
        console.log('==============', opts, command.name());
    })

program.parse()