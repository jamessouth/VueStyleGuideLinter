import getScript from './getScript';
import getComponentProperties from './getComponentProperties';
import getComponentName from './getComponentName';
import getComponentPropNames from './getComponentPropNames';
import pipe from './pipe';
import getComponentOptionsOrder from '../styleModules/VueStyleGuide_C';

const fsProm = require('fs').promises;
const { parse } = require('abstract-syntax-tree');




async function lintFile(file) {
  try {
    const myFile = await fsProm.readFile(file, 'utf8');
    return [
      getScript,
      parse,
      getComponentProperties,
      getComponentName,
      getComponentPropNames,
      getComponentOptionsOrder,
    ].reduce((res, nextFn) => nextFn(res), myFile);
  } catch (err) {
    console.log(err.message);
  }
}

async function lintDirectory(dir) {
  const myDirName = /\/$/.test(dir) ? dir : `${dir}/`;
  function buildFullPath(file) {
    return myDirName + file;
  }
  try {
    const myDir = await fsProm.readdir(dir);
    return Promise.all(myDir.map(pipe(buildFullPath, lintFile)));
  } catch (err) {
    console.log(err.message);
  }
}

async function vueStyleLint(arg) {
  let result = null;
  try {
    if (!arg) throw new Error('A path is required.  It can be a file or a directory.');
    const statObj = await fsProm.stat(arg);
    if (statObj.isFile()) {
      result = await lintFile(arg);
      console.log(`\n${result}`);
    } else if (statObj.isDirectory()) {
      result = await lintDirectory(arg);
      console.log('\n');
      result.forEach(res => console.log(res));
    } else {
      throw new Error('File or directory not found.  Please supply a valid path.');
    }
  } catch (err) {
    console.log(err.message);
  }
}

export default vueStyleLint;
