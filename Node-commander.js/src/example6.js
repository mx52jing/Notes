const { program, Command } = require('commander')

const addCommand = () => {
    const yyds = new Command('yyds')
    yyds
        .command('aaa')
        .action(() => {
            console.log('action => aaa');
        })
    yyds
        .command('bbb')
        .action(() => {
            console.log('action => bbb');
        })
    return yyds
}

program.addCommand(addCommand())

program.parse()