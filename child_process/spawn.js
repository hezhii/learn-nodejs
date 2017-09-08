'use strict';

const {spawn} = require('child_process');

// 创建一个子进程去执行 ls 命令，参数是 -lh /usr
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`标准输出：${data}`);
});

ls.stderr.on('data', (data) => {
  consoloe.log(`标准错误：${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程关闭退出码：${code}`);
});
