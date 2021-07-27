# CommanderJS

完整的nodejs命令行解决方案

- 声明
- 选项
- 命令
- 自动化帮助信息


### 安装

```bash
# yarn
yarn add commander
# npm
npm i commander
```
### 声明

```js
// 全局对象
const { program } = require('commander)

// 本地创建
const { Command } = require('commander')
const program = new Command()
progran.version('0.0.1')
```

#### version(版本号)

> 版本选项

```js
const { program } = require('commander')

program.version('0.0.1')
```

#### description(描述)

> 描述

```js
const { program } = require('commander')
program.description('这里是描述')
```

#### parse(解析)

> 解析选项

三种方式，默认是 `progress.argv`

## 选项

**定义选项**

使用`.option('别名和长名称', '描述', '默认值')`来定义选项


- 选项可以定义一个别名（-后面接一个别名），例如`-v`，和一个长名称`（--后面接一个或多个单词）`，例如`--version`，别名和长名称中间可以用`逗号`、`空格`、`｜`分隔

**获取选项**

- 选项可以通过在`Command`对象上调用`.opts()`方法来获取，多个单词，使用驼峰法获取，例如`--version-base`通过`program.opts().versionBase`获取

- 多个短选项可以合并简写，其中`最后一个选项`可以附加参数，`-p -l`可以简写为`-pl`，如果给`-l`传参数`a`，可以`-pl a`或者`-pla`
- 默认情况下，选项在命令行中的顺序不固定

### 选项类型

demo在[example2.js](./src/example2.js)

1. 选项无需设置参数，`boolean`型选项

无需设置参数

```js
const { program } = require('commander')

program
    .option('-p, --port', '你的端口号')
    .option('-l, --lang-opt', '我是多个单词的选项')
    .parse()

const opts = program.opts()

console.log(opts);

/**
 * node example2.js -p
 * { port: true }
 * node example2.js -l
 * { langOpt: true }
 * node example2.js -pl
 * { port: true, langOpt: true }
 */
```
2. 选项可设置参数

- 必选参数使用`<>`，例如`-v, --version <version>`,（version是必须的）

- 变长必选参数，可以传多个参数`-v, --version <version...>`

- 可选参数使用`[]`，例如`-o, --optional [optional]`

- 变长可选参数，`-o, --optional [optional...]`

```js
program
    .option('-p, --port <port>', '你的端口号', '8000'/* 默认值 */)
    .option('-o, --optional [optional]', '可选参数', 'optional'/* 默认值 */)
    .option('-m, --many <many...>', '必填的变长选项参数')
    .option('-t, --tree [tree...]', '可选的变长参数')
    .parse()

const opts = program.opts()
console.log(opts);

/**
 * node example2.js
 * { port: 8000, optional: 'optional' }
 * node example2.js -p 9000
 * { port: 9000, optional: 'optional' }
 * node example2.js -m 1 2 3
 * { port: 8000, optional: 'optional', many: [ '1', '2', '3' ] }
 * node example2.js -m 1 2 -t 3
 * { port: 8000, optional: 'optional', many: [ '1', '2' ], tree: [ '3' ] }
 * /
```

3. 取反选项

4. 版本选项version

`version`方法可以设置版本，其默认选项为`-V`和`--version`，设置了版本后，命令行会输出当前的版本号

```js
/**
 * node example2.js -V
 * 0.0.1
 * node example2.js --version
 * 0.0.1
 * /
```

5. addOption

对于一些不常见的选项，可以使用`addOption`方法添加，要使用`Option`类，[Option类的源码](https://github.com/tj/commander.js/blob/master/lib/option.js)

Option类，接受两个参数`(flags, description)`,`flags`和`description`对应`program.option`方法的前两个参数

调用：

`new Option('-v, --version', '我是描述哦')`，几个常用的方法

- `default(value, description)` 设置默认值和默认值的描述

- `hideHelp(hide = true)`在`-h`或者`--help`是不展示这条选项

- `choices(values)`设置该选项可选择的值，`values`是个数组

```js
// 该选项默认值是'1'， 命令行传参数的时候，参数只能是'1', '2', '3'中的一个
 .addOption(new Option('-c, --choose <choose>', '选择').default('1').choices(['1', '2', '3'])) 
 /**
  * node example2.js
  * { port: 8000, optional: 'optional', choose: '1' }
  * /
```

6. 自定义选项处理

选项的参数可以通过`自定义函数`来处理，关于`option`方法传参在[这里](https://github.com/tj/commander.js/blob/master/lib/command.js#L630)，自定义函数接受`2个参数`

`handle('用户新输入的参数值', '当前已有的参数值,即上一次调用该自定义处理函数后的返回值')`

```js
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
```

## 命令`command`

demo代码在[example3.js](./src/example3.js)

通过`.command()`或`.addCommand()`可以配置命令

- `.command()`的第一个参数可以配置`命令名称及命令参数`，参数支持`必选（尖括号表示）`、`可选（方括号表示）`及`变长参数（点号表示，如果使用，只能是最后一个参数）`

- `.addCommand()`向`program`增加配置好的子命令

### 设置命令参数

使用`.arguments()`设置命令参数，`<必填>`、`[选填]`、`可变长参数<x...>/[x...]`，**可变长参数只支持给`最后一个参数`设置**

```js
program
    .arguments('<username> [password...]')
    .description('show your info')
    .action((username, password, opts) => {
        console.log('username', username, password, opts)
    })
```

### 处理函数`action`

命令处理函数的参数，为该命令声明的所有参数，除此之外还会附加`两个`额外参数：一个是`解析出的选项`，另一个则是`该命令对象自身`

example3.js
```js
program
    .version('0.0.6')
    .description('测试action')
    .command('action <actionName>')
    .option('-p, --port <port>', 'port')
    .option('-d, --debug', 'is debug open')
    .action((actionName, opt, command) => {
        console.log(actionName, opt, command.name());
    })
/**
 * node example3.js action 11 -p 9090
 * 11 { port: '9090' } action
 * node example3.js action 11 -p 8000 -d
 * 11 { port: '8000', debug: true } action
 * /
```

### 独立可执行子命令

`.command('命令名称', '命令描述')`，如果传入了`命令描述`参数，就会去执行对应子文件

example4.js

```js
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

/**
 * 我们执行 node example4.js create
 * 会去找和example4.js同级的example4-create.js，然后运行example4-create.js
 * 如果不想让它执行example4-create.js，可以自己指定一个文件，在command()第三个参数传入 { executableFile: '你想要的名字' }，别忘记创建你所设置的名字的文件
 * 
 * node example4.js update
 * 执行了update.js文件
 * 
 * 执行 node node example4.js install
 * 打印 action {} install
 * /
```

### 子命令支持嵌套

[example5.js](./src/example5.js)

```js
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
/*
node example5.js -h
Usage: example5 [options] [command]

Options:
  -h, --help      display help for command

Commands:
  yyds
  help [command]  display help for command

===========================================

node example5.js yyds -h
Usage: example5 yyds [options] [command]

Options:
  -h, --help      display help for command

Commands:
  drj
  lyf
  help [command]  display help for command

==========================================
node example5.js yyds drj
------------ {} drj
==========================================

node example5.js yyds lyf
============== {} lyf
*/
```

### 使用`.addCommand()`向`program`增加配置好的子命令

[example6.js](./src/example6.js)

```js
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

/*
node example6.js -h
Usage: example6 [options] [command]

Options:
  -h, --help      display help for command

Commands:
  yyds
  help [command]  display help for command

===========================================

node example6.js yyds -h
Usage: example6 yyds [options] [command]

Options:
  -h, --help      display help for command

Commands:
  aaa
  bbb
  help [command]  display help for command

===========================================

node example6.js yyds aaa
action => aaa

===========================================

node example6.js yyds bbb
action => bbb
*/
```