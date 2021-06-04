const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { Octokit } = require('@octokit/rest');

const { lowDB } = require('./util');

const login = (token) => {
  const octokit = new Octokit({
    auth: token,
  });

  octokit
    .request('/user')
    .then(async ({ data }) => {
      console.log();
      console.log(chalk.blue(logSymbols.success, data.login), chalk.green('登录成功'));

      const db = await lowDB();
      db.set('token', token).set('userInfo', data).write();
    })
    .catch((err) => {
      if (err.message === 'Bad credentials') {
        console.log();
        console.log(chalk.red(logSymbols.error, '登录失败，检查 token 是否给予 gists 权限'));
      }
    });
};

module.exports = login;
