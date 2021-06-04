const fs = require('fs-extra');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const lowDB = async () => {
  const projectPath = path.join(process.cwd(), '.vscode');
  await fs.ensureDir(projectPath);
  const adapter = new FileSync(path.join(projectPath, '.gist2snippetDB.conf.json'));
  const db = low(adapter);

  return db;
};

module.exports = lowDB;
