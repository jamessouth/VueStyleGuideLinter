import getComponentOptionsOrder from '../modules/VueStyleGuide_C';

const fsProm = require('fs').promises;
const { parse, first } = require('abstract-syntax-tree');

function getScript(str) {
  return str.split(/<\/?script>/)[1].replace(/[\s\S]+(?=export)/, '').trim();
}

function getComponentProperties(tree) {
  return first(tree, 'ObjectExpression').properties;
}

function getComponentName(arr) {
  const name = arr.find(prop => prop.key.name === 'name').value.value;
  return {
    componentName: name,
    componentProps: arr,
  };
}

function getComponentPropNames(obj) {
  const propNames = obj.componentProps.map(propName => propName.key.name);
  return {
    componentName: obj.componentName,
    componentProps: propNames,
  };
}

function pipe(...fns) {
  return function inner(start) {
    return fns.reduce((val, fn) => fn(val), start);
  };
}

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
// eslint-disable-next-line
export { vueStyleLint };
// export default vueStyleLint;
