import pipe from './util/pipe';
import lintFile from './lintFile';
import isFilePath from './util/isFilePath';

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
    if (/ENOENT/.test(err.message)) {
      console.log('File or directory not found.  Please supply a valid path.');
    } else {
      console.log(err.message);
    }
  }
}
