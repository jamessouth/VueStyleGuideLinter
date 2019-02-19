import errorHandler from './util/errorHandler';
import isFilePath from './util/isFilePath';
import lintFile from './lintFile';
import lintDirectory from './lintDirectory';

const fsProm = require('fs').promises;

export default async function lint(arg) {
  if (!await isFilePath(arg)) {
    return lintDirectory(arg);
  }
  return lintFile(arg);
}
