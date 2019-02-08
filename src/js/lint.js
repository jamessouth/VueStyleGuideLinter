import pipe from './util/pipe';
import errorHandler from './util/errorHandler';
import isFilePath from './util/isFilePath';
import lintFile from './lintFile';

const fsProm = require('fs').promises;

export default async function lint(arg) {
  try {
    if (await isFilePath(arg)) {
      return lintFile(arg);
    }
    const myDirName = /\/$/.test(arg) ? arg : `${arg}/`;
    const buildFullPath = file => myDirName + file;
    const myDir = await fsProm.readdir(arg);
    return Promise.all(myDir.map(pipe(buildFullPath, lintFile)));
  } catch (err) {
    return errorHandler(err.message, 'directory');
  }
}
