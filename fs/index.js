const path = require('path');
const fs = require('fs');

/**
 * 判断文件或者文件夹是否存在
 *
 * @params {String} dir 路径
 */
function isExist(dir) {
  dir = path.normalize(dir);
  try {
    fs.accessSync(dir, fs.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const dir = process.env.DIR
const msg = isExist(dir) ? '存在' : '不存在';

console.log(dir + msg);
