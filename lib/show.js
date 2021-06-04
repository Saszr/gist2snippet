const chalk = require('chalk');
const { Octokit } = require('@octokit/rest');

const { loginStatus, lowDB } = require('./util');

const show = async (username) => {
  let data = [];

  if (username) {
    const octokit = new Octokit();
    const gistsInfo = await octokit.gists.listForUser({
      username,
    });

    data = gistsInfo.data;
  } else {
    if (!(await loginStatus())) return;

    const db = await lowDB();

    const octokit = new Octokit({
      auth: db.get('token').value(),
    });
    const gistsInfo = await octokit.gists.list();

    data = gistsInfo.data;
  }

  data.forEach((item) => {
    console.log();
    console.log(
      chalk.yellow(item.description),
      chalk.gray(item.id),
      chalk.gray(item.updated_at),
      chalk.gray(item.public ? '' : 'secret'),
    );
    Object.keys(item.files).forEach((key) => {
      console.log(
        chalk.yellowBright('-'),
        chalk.blue(item.files[key].filename),
        chalk.gray(item.files[key].size),
      );
    });
  });
};

module.exports = show;
