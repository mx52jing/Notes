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