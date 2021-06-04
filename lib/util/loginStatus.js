const path = require('path');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

const lowDB = require('./lowDB');

const loginStatus = async () => {
  const db = await lowDB();

  if (!db.get('token').value()) {
    console.log();
    console.log(chalk.red(logSymbols.error, '需要登录'));

    return false;
  }
  return true;
};

module.exports = loginStatus;
