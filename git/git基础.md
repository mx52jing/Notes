### 配置user

```bash
git config --global user.name 'name'
git config --global user.email 'example@163.com'
```
**`config`作用域**

```bash
# local只对某个仓库有效
git config --local
# global对当前用户所有仓库都有效
git config --global
# system对系统登录的用户有效
git config --system
```

**显示相应的`config`配置**

```bash
git config --list --local
git config --list --global
git config --list --system
```

**清除配置**

```bash
git config --unset --local user.name
git config --unset --global user.name
git config --unset --system user.name
```

### `git`重命名文件

```bash
git mv 变更文件名 要变成的名字
```

### 查看提交历史

```bash
# 查看所有log
git log
# 美化版
git log --oneline
# 查看最近n条提交log
git log -n n
# 带图形化的
git log --graph
# 查看所有分支
git log --all
```

### 查看某个id的类型

类型可能为`commit`/`tag`/`tree`/`blob`

```bash
git cat-file -t id
```
### 查看某个提交id的内容

```bash
git cat-file -p id
```

## `.git`目录

### `HEAD`文件

指向目前的分支名称，下面代表当前在`master`分支上

```bash
cat HEAD
ref: refs/heads/master
```

### `config`文件

`config`文件存放的是`本地仓库`的相关配置信息，可通过`git config --list --local`查看，或者通过`git config --lcoal user.name xxx`来设置本仓库一些信息

### refs文件夹

`refs/heads`展示了该仓库下的所有分支
`refs/tags`展示了该仓库下的所有tag

### `commit`、`tree`、`blob`关系

每一个`commit`对应一颗`tree`，每棵`tree`里面有可能会包含多个`blob`文件，也有可能包含另一颗`tree`

## 图形化界面查看提交信息

```bash
gitk --all
```