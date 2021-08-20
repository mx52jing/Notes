## fs

### 文件操作

- `fs.readFile(path[, options], callback)`读取文件

- `fs.existsSync(path)`判断文件是否存在

- `fs.access(path[, mode], callback)`判断文件/目录是否存在

- `fs.writeFile(file, data[, options], callback)`写文件

- `fs.copyFile(源文件路径, 要复制到的路径, 复制操作的修饰符, cb)`复制文件

 - `fs.rename(oldPath, newPath, callback)`重命名文件

 - `fs.unlink(path, callback)`删除文件

### 文件夹操作

- `fs.mkdir(path[, options], callback)`创建文件夹

- `fs.rmdir(path[, options], callback)`删除文件夹

- `fs.readdir(path[, options], callback)`读取文件夹

- `fs.stat(path[, options], callback)` 一般用来判断是文件还是文件夹