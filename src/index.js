const vscode = require('vscode');
const { window } = vscode;
const path = require('path');

const { copyFiles, getDirChildren } = require('./util');

let createTemplate = (opt) => {
  let { tplPath, filePath } = opt;
  copyFiles(tplPath, filePath);
};

module.exports = async function (uri, opt) {
  let { tplPath } = opt,
    filePath = uri?.fsPath;

  // 获取模板列表
  let tplList = getDirChildren(tplPath);

  // 弹出模板选择框
  let pickRes = await window.showQuickPick(tplList, {
    placeHolder: '请输入模板',
  });

  // 将输入的结果与已存在的模板进行匹配；
  let tpl = tplList.find((tpl) => tpl === pickRes);
  if (!tpl) {
    window.showErrorMessage('该模板不存在');
    return;
  }
  // 匹配中，则获取模板路径
  let tplAbsolutePath = path.join(tplPath, tpl);

  // 命名模板名称
  let templateName = await window.showInputBox({
    prompt: '请输入模板名称',
    placeHolder: '如：form或form.vue',
  });
  // todo 对用户输入的模板名称进行判空处理(undefined以及空字符串)
  if (!templateName) {
    window.showErrorMessage('请输入正确的名称');
    return;
  }

  // 生成模板
  createTemplate({
    tplPath: tplAbsolutePath,
    filePath: path.join(filePath, templateName),
  });
};
