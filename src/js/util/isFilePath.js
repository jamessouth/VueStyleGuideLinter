const fsProm = require('fs').promises;

export default async function isFilePath(arg) {
  try {
    const statObj = await fsProm.stat(arg);
    return statObj.isFile();
  } catch (err) {
    if (/ENOENT/.test(err.message)) {
      return true;
    }
  }
}
