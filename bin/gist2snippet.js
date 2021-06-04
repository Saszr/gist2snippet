#!/usr/bin/env node

const program = require('commander');
const { login, show, sync } = require('../lib');

program
  .version(require('../package').version, '-v, --version', '脚手架版本号')
  .helpOption('-h, --help', '显示帮助');

program
  .command('show [username]')
  .description('显示用户公开的`Gists`；如果`username`为空，则显示登录用户的`Gists`')
  .action((username) => {
    show(username);
  });

program
  .command('sync <id>')
  .description('同步目标`Gists`为`vscode`本地项目代码块')
  .action((id) => {
    sync(id);
  });

program
  .command('login <token>')
  .description('通过`github token`登录，可以访问私人`Gists`')
  .action((token) => {
    login(token);
  });

program.parse(process.argv);
