const fs = require('fs');
const path = require('path');
const { REPLACE_MAP } = require('./const');

// 获取文件夹下面的一级子文件或子文件夹
let getDirChildren = (path) => {
  return fs.readdirSync(path);
};

// 复制文件
let copyFile = (fromPath, toPath, replaceMap = REPLACE_MAP) => {
  let json = fs.readFileSync(fromPath, { encoding: 'utf8' });

  // todo 将配置参数传进
  Object.entries(replaceMap).forEach(([key, func]) => {
    json.replace(new RegExp(`\\{\\s${key}\\s\\}`), func);
  });
  fs.writeFileSync(toPath, json);
};

// 复制文件夹内的所有文件
let copyFiles = (fromPath, toPath) => {
  if (!fs.existsSync(fromPath)) {
    return;
  }

  // 非文件夹时
  if (!fs.statSync(fromPath).isDirectory()) {
    copyFile(fromPath, toPath);
    return;
  }

  // 文件夹时
  if (!fs.existsSync(toPath)) {
    fs.mkdirSync(toPath);
  }
  let children = getDirChildren(fromPath);
  children.forEach((child) => {
    let childToPath = path.join(toPath, child),
      childFromPath = path.join(fromPath, child);
    copyFiles(childFromPath, childToPath);
  });
};

module.exports = { getDirChildren, copyFiles };
