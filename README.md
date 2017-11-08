# Node.js 基础知识

在平时学习、工作中，某些知识点或者特性会想要通过一个小的例子进行验证。这个仓库中记录下了这些例子以及相应的笔记，随着时间的推移，我相信内容一定会越来越丰富的。

## 目录

- [Buffer 对象](#Buffer 对象)
- [子进程](#子进程)
- [events](#events)
- [异常处理](#异常处理)
- [类型判断](#类型判断)

## 笔记

### Buffer对象

1. Node.js中的全局变量，不需要require。

2. Buffer对象的实例类似于一个整形数组，大小在创建时指定，并且不能被调整，在V8堆外分配物理内存。

3. 默认是 UTF-8 编码，数组中的每位对应 1 字节十六进制数。

### 子进程

1. Node.js 的父进程与衍生的子进程之间会建立标准输入、输出和错误通道。

2. 有些程序会在内部使用行缓冲 I/O，可能导致发送到子过程的数据可能无法被立即使用。

3. 衍生子进程的功能主要由 `child_process.spawn()` 函数提供，该方法是异步的，`child_process.spawnSync()` 则是同步的。

4. 在 Windows 上 `.bat` 和 `.cmd` 文件在没有终端的情况下是不可执行的，需要先衍生一个 `cmd.exe`。

5. ChildProcess 类的实例是 EventEmitter，代表衍生的子进程，所以可以监听和触发事件，通过事件通讯。

6. 在错误发生后，`exit` 事件可能会也可能不会触发。

7. 当 `exit` 事件被触发时，子进程的 stdio 流可能依然是打开的。

### events

1. 所有能触发事件的对象都是 EventEmitter 类的实例。

2. `eventEmitter.on()` 方法用于注册监听器，`eventEmitter.emit()` 方法用于触发事件。

3. `eventEmitter.once()` 只处理事件一次。

4. 出错时触发 `error` 事件，如果此事件没有被监听会抛出错误、退出进程。

### 异常处理

1. 回调中的异常是无法被 catch 住的。
2. 使用 generator 或者 async 来代替 callback 进行异步编程，可以 catch 住 yield 和 await 操作时的异常。

### 类型判断

类型判断是 JavaScript 中一个比较麻烦的问题，通过阅读 loadsh 源码学习到了一些类型判断的方法，现将 js 类型判断相关的知识点记录下来。

JavaScript 中的数据类型包括：null、undefined、number、string、boolean、object、function，其中 null、undefined、number、string、boolean 为原始类型，object 为复合类型，包括：Function Array Date等。

#### == 和 === 的区别

主要的区别在于 `==` 运算符在比较不同类型的数据时，会先将数据进行类型转换，然后再通过 `===` 进行比较。类型转换规则如下：

- 原始类型（String/Number/Boolean/null/undefined）的数据会转换成数值类型再进行比较。
- 对象与原始类型的数据进行比较时，对象会被转化为原始类型的值。

```js
undefined == null; // true
undefined === null; //false
```

#### 常用类型判断方法

1. 内置的一些判断方法，如判断是否是数组：`Array.isArray`。
2. `typeof value` 方法可以返回对象的类型，可能的取值为：undefined、boolean、string、number、object、function。由于历史原因导致 `typeof null` 返回 `object`。
3. `obj instanceof Object` 判断一个对象的原型链上是否存在一个某个构造函数的 prototype 属性，左边的操作数是对象实例，不是则返回 false；右边的操作数必须是对象或者构造器，否则会抛出异常。具体的原理参考[这篇博客](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/)。
3. `Object.prorotype.toString.call(value)` 可以输出对象的类型。

在使用时需要的是: **typeof** 适合判断原始类型和 function，判断 null 和复杂类型时不准确，会都返回 object；在 IE6/7/8 上使用 `Object.prorotype.toString` 判断 null 或者 undefined 时会返回 `[object Object]`；**instanceof** 适合用来判断自定义对象。
