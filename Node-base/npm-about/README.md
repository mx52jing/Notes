## 初始化包

```bash
npm init -y
yarn init -y
```

## 初始化带有作用域的包

🌰：`@babel/core`

```bash
yarn/npm init --scop=xxx
```
## 下载

全局安装，在命令行随处使用该命令

```bash
npm i xxx -g
yarn add xxx -g
```
## 开发环境调试

链接到全局node_modules

```bash
yarn link/npm link

# 取消链接
yarn unlink/npm unlink
```

## 在项目在安装

```bash
npm i --save/ npm i -S # 安装到当前的dependencies，表示开发和上线时都需要
npm i --save-dev/ npmi -D # 表示安装到devDependencies，开发依赖，上线的时候需要
```
> 比如我发布了一个`npm`模块，别人安装了我的模块，会自动安装我的模块中的`dependencies`中的包，`devDependencies`中的模块不会安装

### peerDependencies

### scripts

scripts可以配置命令

- 执行scripts中的命令，就是执行node_modules下的.bin下的文件

- 当执行`npm run xxx`的时候，会把当前目录的`node_modules`下的`.bin`下的文件拷贝到当前系统的`env的path`中，所以`npm run`可以执行`node_modules/.bin`下的文件

## npx

可以帮我们直接执行`node_modules/.bin`下的文件，和`scripts`原理一样，但是不用去配置`scripts`

**优点：**

- 如果模块不存在，会自动去安装，执行完毕后自动删除模块，可以避免我们安装全局模块

