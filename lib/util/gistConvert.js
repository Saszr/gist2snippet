const _ = require('lodash');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const strSplit = (targetAttrArr, targetKey) => {
  const targetStr = targetAttrArr.filter((val) => {
    return val.includes(`${targetKey}:`);
  })[0];

  const splitArr = _.split(targetStr, `: `, 2);

  return splitArr[1];
};

const gistConvert = (files) => {
  const snippets = {};
  Object.keys(files).forEach((filename) => {
    if (files[filename].content) {
      const dataArr = files[filename].content.split('\n');

      if (filename === 'readme.md') {
        console.log();
        console.log(chalk.yellow(logSymbols.info, `请阅读相关 gist 的 readme.md`));
        return;
      }

      if (dataArr.indexOf('---') !== 0 || dataArr.indexOf('---', 2) === -1) {
        console.log();
        console.log(chalk.red(logSymbols.error, `${filename} yaml头属性格式错误`));
        return;
      }

      if (dataArr.indexOf('```') === -1) {
        console.log();
        console.log(chalk.red(logSymbols.error, `${filename} markdown 请使用代码块`));
        return;
      }

      snippets[filename] = {};

      const targetAttrArr = _.slice(dataArr, dataArr.indexOf('---') + 1, dataArr.indexOf('---', 2));
      ['prefix', 'description', 'scope'].forEach((val) => {
        snippets[filename][val] = strSplit(targetAttrArr, val);
      });

      const codeBlockArea = [];
      dataArr.forEach((val, i) => {
        if (val.includes('```')) codeBlockArea.push(i);
      });

      const targetBodyArr = _.slice(dataArr, codeBlockArea[0] + 1, codeBlockArea[1]);

      snippets[filename].body = targetBodyArr;
    }
  });

  console.log();
  console.log(
    chalk.yellow(logSymbols.info, `特定的格式才能正确转化，目前只适用 vscode 的模板代码，详见示例`),
  );
  return snippets;
};

module.exports = gistConvert;
