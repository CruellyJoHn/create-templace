const { DEFAULT_CONFIG, DEFAULT_TPL_PATH } = require('./const');
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// todo 监听配置文件的变化并重新变更配置

let init = () => {
  let rootPath = vscode.workspace?.workspaceFolders?.[0].uri.fsPath,
    tplPath = '',
    configJson = DEFAULT_CONFIG;
  if (!rootPath) {
    vscode.window.showErrorMessage('请在文件夹中激活插件');
    return {};
  }

  // 生成默认配置
  let configPath = path.join(rootPath, 'createTplConfig.json');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(configJson, null, 4));
    tplPath = path.join(rootPath, DEFAULT_TPL_PATH);
  } else {
    // 若有配置文件则直接读取
    configJson = fs.readFileSync(configPath, { encoding: 'utf8' });
    try {
      configJson = JSON.parse(configJson);
      tplPath = path.join(rootPath, configJson?.tplPath || DEFAULT_TPL_PATH);
    } catch (e) {
      vscode.window.showErrorMessage('解析配置文件失败');
      return {};
    }
  }

  // 判断存放模板路径是否有文件夹，无则创建
  if (!fs.existsSync(tplPath)) {
    fs.mkdirSync(tplPath);
  }

  return {
    rootPath,
    tplPath,
  };
};

module.exports = init;
