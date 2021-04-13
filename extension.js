const path = require('path');
const vscode = require('vscode');

const startExtension = require('./src/index');
const init = require('./src/init');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "create-template" is now active!'
  );
  let opt = init();
  if (JSON.stringify(opt) === '{}') {
    return;
  }

  let disposable = vscode.commands.registerCommand(
    'create-template.start',
    function (uri) {
      startExtension(uri, { ...opt });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
