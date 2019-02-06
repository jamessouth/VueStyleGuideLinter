const ComponentOptionsOrder = [
  'el',
  'name',
  'parent',
  'functional',
  'delimiters',
  'comments',
  'components',
  'directives',
  'filters',
  'extends',
  'mixins',
  'inheritAttrs',
  'model',
  'props',
  'propsData',
  'data',
  'computed',
  'watch',
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'beforeDestroy',
  'destroyed',
  'methods',
  'template',
  'render',
  'renderError',
];

function getProperOrder(arr = []) {
  const optArray = [...arr];
  return optArray.sort((a, b) => ComponentOptionsOrder.indexOf(a) - ComponentOptionsOrder.indexOf(b));
}

function prettifyArray(arr = []) {
  return arr.map((el, i) => (i === 0 ? el : ` ${el}`));
}

function getComponentOptionsOrder(obj = { componentName: '', componentProps: [] }) {
  const optArray = [...obj.componentProps];
  for (let i = 0; i < ComponentOptionsOrder.length; i += 1) {
    if (ComponentOptionsOrder[i] === optArray[0]) optArray.shift();
  }
  if (optArray.length === 0) {
    return `\x1b[1m\x1b[32mThe \x1b[4m${obj.componentName}\x1b[0m\x1b[1m\x1b[32m component's options are already in the recommended order.\x1b[0m\n`;
  }
  return `\x1b[1m\x1b[31mThe recommended order for the \x1b[4m${obj.componentName}\x1b[0m\x1b[1m\x1b[31m component's options is: \x1b[7m${prettifyArray(getProperOrder(obj.componentProps))}.\x1b[0m\n`;
}

export default getComponentOptionsOrder;
