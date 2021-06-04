const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
const { Octokit } = require('@octokit/rest');

const { gistConvert } = require('./util');

const store = memFs.create();
const memFsEditorFs = memFsEditor.create(store);

const projectPath = path.join(process.cwd(), '.vscode');

const sync = async (id) => {
  const octokit = new Octokit();

  octokit.gists
    .get({
      gist_id: id,
    })
    .then(({ data }) => {
      const content = gistConvert(data.files);

      memFsEditorFs.write(
        path.join(projectPath, `${data.description}.code-snippets`),
        JSON.stringify(content),
      );
      memFsEditorFs.commit(() => {
        console.log();
        console.log(logSymbols.success, `${data.description}.code-snippets 已生成`);
        console.log();
        console.log(chalk.grey(`文件目录: ${projectPath}`));
      });
    });
};

module.exports = sync;
