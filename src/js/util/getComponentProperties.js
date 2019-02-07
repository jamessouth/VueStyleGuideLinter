const { first } = require('abstract-syntax-tree');

export default function getComponentProperties(tree) {
  return first(tree, 'ObjectExpression').properties;
}
