import getProperOrder from './getProperOrder';
import prettifyArray from './prettifyArray';
import COMP_INST_OPTS_ORDER from './COMP_INST_OPTS_ORDER';

export default function getComponentOptionsOrder(obj = { componentName: '', componentProps: [] }) {
  console.log(obj);
  const optArray = [...obj.componentProps];
  for (let i = 0; i < COMP_INST_OPTS_ORDER.length; i += 1) {
    if (COMP_INST_OPTS_ORDER[i] === optArray[0]) optArray.shift();
  }
  if (optArray.length === 0) {
    return `\x1b[1m\x1b[32mThe \x1b[4m${obj.componentName}\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n`;
  }
  return `\x1b[1m\x1b[31mThe recommended order for the \x1b[4m${obj.componentName}\x1b[0m\x1b[1m\x1b[31m component's options is: \x1b[7m${prettifyArray(getProperOrder(obj.componentProps))}.\x1b[0m\n`;
}
