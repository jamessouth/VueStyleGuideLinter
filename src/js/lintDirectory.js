import pipe from './util/pipe';
import errorHandler from './util/errorHandler';

const fsProm = require('fs').promises;

export default async function lintDirectory(arg, lintFunc) {
  try {
    const myDirName = /\/$/.test(arg) ? arg : `${arg}/`;
    const buildFullPath = file => myDirName + file;
    const myDir = await fsProm.readdir(arg);
    return Promise.all(myDir.map(pipe(buildFullPath, lintFunc)));
  } catch (err) {
    return errorHandler(err.message, 'directory');
  }
}
