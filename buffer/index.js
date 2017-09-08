'use strict';

// 创建一个长度为10、且用0填充的 Buffer
const buf1 = Buffer.alloc(10);
console.log(buf1);

// 创建一个长度为10、且用‘𠮷’填充的 Buffer
const buf2 = Buffer.alloc(10, '𠮷');
console.log(buf2);

const buf3 = Buffer.from('汉');
console.log(buf3);
