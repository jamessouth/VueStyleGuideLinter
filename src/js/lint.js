import isFilePath from './util/isFilePath';
import lintFile from './lintFile';
import lintDirectory from './lintDirectory';

export default async function lint(arg) {
  if (!await isFilePath(arg)) {
    return lintDirectory(arg, lintFile);
  }
  return lintFile(arg);
}
