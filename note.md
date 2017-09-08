# Node.js 学习笔记

## Buffer对象

1. Node.js中的全局变量，不需要require。

2. Buffer对象的实例类似于一个整形数组，大小在创建时指定，并且不能被调整，在V8堆外分配物理内存。

3. 默认是 UTF-8 编码，数组中的每位对应 1 字节十六进制数。

## 子进程

1. Node.js 的父进程与衍生的子进程之间会建立标准输入、输出和错误通道。

2. 有些程序会在内部使用行缓冲 I/O，可能导致发送到子过程的数据可能无法被立即使用。

3. 衍生子进程的功能主要由 `child_process.spawn()` 函数提供，该方法是异步的，`child_process.spawnSync()` 则是同步的。

4. 在 Windows 上 `.bat` 和 `.cmd` 文件在没有终端的情况下是不可执行的，需要先衍生一个 `cmd.exe`。

5. ChildProcess 类的实例是 EventEmitter，代表衍生的子进程，所以可以监听和触发事件，通过事件通讯。

6. 在错误发生后，`exit` 事件可能会也可能不会触发。

7. 当 `exit` 事件被触发时，子进程的 stdio 流可能依然是打开的。

## events

1. 所有能触发事件的对象都是 EventEmitter 类的实例。

2. `eventEmitter.on()` 方法用于注册监听器，`eventEmitter.emit()` 方法用于触发事件。

3. `eventEmitter.once()` 只处理事件一次。

4. 出错时触发 `error` 事件，如果此事件没有被监听会抛出错误、退出进程。
