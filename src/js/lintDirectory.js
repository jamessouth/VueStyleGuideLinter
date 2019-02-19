import pipe from './util/pipe';
import lintFile from './lintFile';

const fsProm = require('fs').promises;

export default async function lintDirectory(arg) {
  try {
    const myDirName = /\/$/.test(arg) ? arg : `${arg}/`;
    const buildFullPath = file => myDirName + file;
    const myDir = await fsProm.readdir(arg);
    return Promise.all(myDir.map(pipe(buildFullPath, lintFile)));
  } catch (err) {
    return errorHandler(err.message, 'directory');
  }
}
