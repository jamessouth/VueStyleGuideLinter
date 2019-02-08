import getScript from './util/getScript';
import removeBuggyKeywords from './util/removeBuggyKeywords';
import getComponentProperties from './util/getComponentProperties';
import getComponentName from './util/getComponentName';
import getComponentPropNames from './util/getComponentPropNames';
import errorHandler from './util/errorHandler';
import getComponentOptionsOrder from '../Priority_C/Comp_inst_opts_order/getComponentOptionsOrder';

const fsProm = require('fs').promises;
const { parse } = require('abstract-syntax-tree');

export default async function lintFile(file) {
  try {
    const myFile = await fsProm.readFile(file, 'utf8');
    return [
      getScript,
      removeBuggyKeywords,
      parse,
      getComponentProperties,
      getComponentName,
      getComponentPropNames,
      getComponentOptionsOrder,
    ].reduce((res, nextFn) => nextFn(res), myFile);
  } catch (err) {
    return errorHandler(err.message);
  }
}
